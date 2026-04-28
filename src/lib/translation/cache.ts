import { createHash } from "crypto";
import fs from "fs";
import path from "path";

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const DEFAULT_TTL = 90 * 24 * 60 * 60 * 1000; // 90 days
const GEN_DIR = path.join(process.cwd(), "src", "lib", "translations", "generated");
const CACHE_FILE = path.join(GEN_DIR, "runtime-cache.json");

const store = new Map<string, CacheEntry>();
let hydrated = false;
let dirty = false;
let flushTimer: NodeJS.Timeout | null = null;

function hashText(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

function hydrate(): void {
  if (hydrated) return;
  hydrated = true;
  try {
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    const data = JSON.parse(raw) as Record<string, string>;
    const farFuture = Date.now() + DEFAULT_TTL;
    for (const [key, value] of Object.entries(data)) {
      store.set(key, { value, expiresAt: farFuture });
    }
  } catch {
    // no cache file yet — fine
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(flush, 300);
}

function flush(): void {
  flushTimer = null;
  if (!dirty) return;
  try {
    fs.mkdirSync(GEN_DIR, { recursive: true });
    const plain: Record<string, string> = {};
    for (const [key, entry] of store) plain[key] = entry.value;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(plain), "utf-8");
    dirty = false;
  } catch {
    // runtime filesystem is read-only on Amplify/Lambda — ignore
  }
}

export function cacheKey(provider: string, sourceLang: string, targetLang: string, text: string): string {
  return `${provider}:${sourceLang}:${targetLang}:${hashText(text)}`;
}

export function getCached(key: string): string | null {
  hydrate();
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    dirty = true;
    scheduleFlush();
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: string, ttl = DEFAULT_TTL): void {
  hydrate();
  store.set(key, { value, expiresAt: Date.now() + ttl });
  dirty = true;
  scheduleFlush();
}
