import fs from "fs"
import path from "path"
import { createHash } from "crypto"

const LOCALES = ["fr", "es", "pt", "de"]
const OUTPUT_DIR = path.join(process.cwd(), "src", "lib", "translations", "generated")

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

async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    console.error("⚠ DEEPL_API_KEY not set — skipping translations")
    return texts
  }

  const results: string[] = []
  for (let i = 0; i < texts.length; i += 50) {
    const chunk = texts.slice(i, i + 50)
    const params = new URLSearchParams()
    for (const text of chunk) {
      params.append("text", text)
    }
    params.append("source_lang", "EN")
    params.append("target_lang", DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase())

    const res = await fetch(getDeepLUrl(), {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error(`DeepL API error for ${targetLang}: ${res.status}`, error)
      results.push(...chunk)
      continue
    }

    const data = await res.json()
    results.push(...data.translations.map((t: { text: string }) => t.text))
    process.stdout.write(`  ${targetLang}: ${Math.min(i + 50, texts.length)}/${texts.length} strings\r`)
  }
  console.log(`  ${targetLang}: ${texts.length}/${texts.length} strings ✓`)
  return results
}

function stringsChecksum(strings: string[]): string {
  return createHash("md5").update(strings.join("\0")).digest("hex")
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

  if (strings.length === 0) {
    console.log("  No strings to translate.\n")
    return
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const checksumFile = path.join(OUTPUT_DIR, "_checksum.json")
  const currentChecksum = stringsChecksum(strings)
  let previousChecksum = ""
  let existingLocales: string[] = []
  try {
    const prev = JSON.parse(fs.readFileSync(checksumFile, "utf-8"))
    previousChecksum = prev.checksum || ""
    existingLocales = prev.locales || []
  } catch {
    // no previous checksum
  }

  const allLocalesExist = LOCALES.every(
    (loc) => existingLocales.includes(loc) && fs.existsSync(path.join(OUTPUT_DIR, `${loc}.json`))
  )

  if (currentChecksum === previousChecksum && allLocalesExist) {
    console.log("  ✓ Strings unchanged — using cached translations\n")
    return
  }

  for (const locale of LOCALES) {
    const translated = await translateBatch(strings, locale)

    const dict: Record<string, string> = {}
    for (let i = 0; i < strings.length; i++) {
      if (translated[i] && translated[i] !== strings[i]) {
        dict[strings[i]] = translated[i]
      }
    }

    const outFile = path.join(OUTPUT_DIR, `${locale}.json`)
    fs.writeFileSync(outFile, JSON.stringify(dict, null, 2), "utf-8")
    console.log(`  → ${outFile} (${Object.keys(dict).length} translations)`)
  }

  fs.writeFileSync(
    checksumFile,
    JSON.stringify({ checksum: currentChecksum, locales: LOCALES, updatedAt: new Date().toISOString() }, null, 2),
    "utf-8"
  )

  console.log("\n✅ Build-time translations complete!\n")
}

main().catch((err) => {
  console.error("Translation build failed:", err)
  process.exit(1)
})
