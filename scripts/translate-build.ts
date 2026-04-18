import fs from "fs"
import path from "path"

const LOCALES = ["fr", "es", "pt", "de"]
const OUTPUT_DIR = path.join(process.cwd(), "src", "lib", "translations", "generated")
const BATCH_SIZE = 50
const BATCH_CONCURRENCY = 4
const REQUEST_TIMEOUT_MS = 20000
const MAX_RETRIES = 2

const DEEPL_LANG_MAP: Record<string, string> = {
  en: "EN", fr: "FR", es: "ES", pt: "PT-PT", de: "DE",
}

function scanDir(dir: string, regex: RegExp, strings: Set<string>): void {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      scanDir(fullPath, regex, strings)
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8")
        let match: RegExpExecArray | null
        const re = new RegExp(regex.source, regex.flags)
        while ((match = re.exec(content)) !== null) {
          if (match[1]) strings.add(match[1])
          if (match[2]) strings.add(match[2])
        }
      } catch {
        // skip
      }
    }
  }
}

function extractStrings(): string[] {
  const strings = new Set<string>()
  const regex = /\bt\(\s*(?:"([^"]+)"|'([^']+)')\s*\)/g
  const root = process.cwd()
  scanDir(path.join(root, "src", "components"), regex, strings)
  scanDir(path.join(root, "src", "app"), regex, strings)
  return Array.from(strings)
}

function getDeepLUrl(): string {
  if (process.env.DEEPL_API_URL) return process.env.DEEPL_API_URL
  const key = process.env.DEEPL_API_KEY || ""
  return key.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate"
}

async function translateChunk(chunk: string[], targetLang: string, apiKey: string, attempt = 0): Promise<string[]> {
  const params = new URLSearchParams()
  for (const text of chunk) params.append("text", text)
  params.append("source_lang", "EN")
  params.append("target_lang", DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase())

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const res = await fetch(getDeepLUrl(), {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      signal: controller.signal,
    })

    if (!res.ok) {
      const error = await res.text()
      if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
        return translateChunk(chunk, targetLang, apiKey, attempt + 1)
      }
      console.error(`  ✗ DeepL ${res.status} (${targetLang}):`, error.slice(0, 200))
      return chunk
    }

    const data = (await res.json()) as { translations: Array<{ text: string }> }
    return data.translations.map((t) => t.text)
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
      return translateChunk(chunk, targetLang, apiKey, attempt + 1)
    }
    console.error(`  ✗ ${targetLang} chunk failed:`, (err as Error).message)
    return chunk
  } finally {
    clearTimeout(timer)
  }
}

async function translateBatch(texts: string[], targetLang: string, apiKey: string): Promise<string[]> {
  const chunks: string[][] = []
  for (let i = 0; i < texts.length; i += BATCH_SIZE) chunks.push(texts.slice(i, i + BATCH_SIZE))

  const results: string[][] = new Array(chunks.length)
  let nextChunk = 0
  async function worker() {
    while (true) {
      const i = nextChunk++
      if (i >= chunks.length) return
      results[i] = await translateChunk(chunks[i], targetLang, apiKey)
    }
  }
  await Promise.all(Array.from({ length: Math.min(BATCH_CONCURRENCY, chunks.length) }, () => worker()))
  return results.flat()
}

function loadDict(locale: string): Record<string, string> {
  const file = path.join(OUTPUT_DIR, `${locale}.json`)
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return {}
  }
}

async function translateLocale(locale: string, strings: string[], apiKey: string): Promise<void> {
  const existing = loadDict(locale)
  const missing = strings.filter((s) => !(s in existing))

  let updated: Record<string, string>
  if (missing.length === 0) {
    // Prune obsolete keys only
    updated = {}
    for (const s of strings) if (s in existing) updated[s] = existing[s]
    if (Object.keys(updated).length === Object.keys(existing).length) {
      console.log(`  ${locale}: cached (${Object.keys(existing).length} strings)`)
      return
    }
  } else {
    console.log(`  ${locale}: translating ${missing.length} new / ${strings.length} total`)
    const translated = await translateBatch(missing, locale, apiKey)
    updated = {}
    for (const s of strings) {
      if (s in existing) updated[s] = existing[s]
      else {
        const i = missing.indexOf(s)
        if (i >= 0 && translated[i]) updated[s] = translated[i]
      }
    }
  }

  const outFile = path.join(OUTPUT_DIR, `${locale}.json`)
  fs.writeFileSync(outFile, JSON.stringify(updated, null, 2), "utf-8")
  console.log(`  ${locale}: ✓ ${Object.keys(updated).length} strings written`)
}

async function main() {
  console.log("\n🌐 Pre-translating UI strings...\n")

  const envPath = path.join(process.cwd(), ".env.local")
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8")
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eqIdx = trimmed.indexOf("=")
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim()
        if (!process.env[key]) process.env[key] = val
      }
    }
  }

  const strings = extractStrings()
  console.log(`  Found ${strings.length} translatable strings\n`)
  if (strings.length === 0) return

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    console.warn("  ⚠ DEEPL_API_KEY not set — skipping translations (existing dicts preserved)\n")
    return
  }

  const started = Date.now()
  await Promise.all(LOCALES.map((loc) => translateLocale(loc, strings, apiKey)))
  const elapsed = ((Date.now() - started) / 1000).toFixed(1)
  console.log(`\n✅ Build-time translations complete in ${elapsed}s\n`)
}

main().catch((err) => {
  console.error("Translation build failed:", err)
  process.exit(1)
})
