import type { TranslationProvider, TranslationOptions } from "./types";

const REQUEST_TIMEOUT_MS = 30000;
const MAX_RETRIES = 3;
const CHUNK_SIZE = 50;

function getApiUrl(): string {
  if (process.env.DEEPL_API_URL) return process.env.DEEPL_API_URL;
  const key = process.env.DEEPL_API_KEY || "";
  return key.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
}

const DEEPL_LANG_MAP: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  pt: "PT-PT",
  de: "DE",
};

export class DeepLTranslationProvider implements TranslationProvider {
  private apiKey: string;

  constructor() {
    const key = process.env.DEEPL_API_KEY;
    if (!key) throw new Error("DEEPL_API_KEY env var is required");
    this.apiKey = key;
  }

  async translate(text: string, targetLang: string, sourceLang = "en", options?: TranslationOptions): Promise<string> {
    const results = await this.translateBatch([text], targetLang, sourceLang, options);
    return results[0];
  }

  async translateBatch(texts: string[], targetLang: string, sourceLang = "en", options?: TranslationOptions): Promise<string[]> {
    if (texts.length === 0) return [];

    const chunks: string[][] = [];
    for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
      chunks.push(texts.slice(i, i + CHUNK_SIZE));
    }

    const results: string[] = [];
    for (const chunk of chunks) {
      const translated = await this.translateChunk(chunk, targetLang, sourceLang, options);
      results.push(...translated);
    }
    return results;
  }

  private async translateChunk(
    chunk: string[],
    targetLang: string,
    sourceLang: string,
    options?: TranslationOptions,
    attempt = 0
  ): Promise<string[]> {
    const params = new URLSearchParams();
    for (const text of chunk) params.append("text", text);
    params.append("source_lang", DEEPL_LANG_MAP[sourceLang] || sourceLang.toUpperCase());
    params.append("target_lang", DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase());
    if (options?.html) params.append("tag_handling", "html");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${this.apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        signal: controller.signal,
      });

      if (!res.ok) {
        const error = await res.text();
        if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)));
          return this.translateChunk(chunk, targetLang, sourceLang, options, attempt + 1);
        }
        console.error(`[deepl] ${res.status} (${targetLang}):`, error.slice(0, 200));
        return chunk;
      }

      const data = (await res.json()) as { translations: Array<{ text: string }> };
      return data.translations.map((t) => t.text);
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)));
        return this.translateChunk(chunk, targetLang, sourceLang, options, attempt + 1);
      }
      console.error(`[deepl] ${targetLang} chunk failed after retries:`, (err as Error).message);
      return chunk;
    } finally {
      clearTimeout(timer);
    }
  }
}
