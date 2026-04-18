import { createHash } from "crypto";

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

const store = new Map<string, CacheEntry>();

function hashText(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

export function cacheKey(provider: string, sourceLang: string, targetLang: string, text: string): string {
  return `${provider}:${sourceLang}:${targetLang}:${hashText(text)}`;
}

export function getCached(key: string): string | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: string, ttl = DEFAULT_TTL): void {
  store.set(key, { value, expiresAt: Date.now() + ttl });
}
