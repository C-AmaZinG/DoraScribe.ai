import type { TranslationProvider, TranslationOptions } from "./types";

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
    for (let i = 0; i < texts.length; i += 50) {
      chunks.push(texts.slice(i, i + 50));
    }

    const results: string[] = [];
    for (const chunk of chunks) {
      const params = new URLSearchParams();
      for (const text of chunk) {
        params.append("text", text);
      }
      params.append("source_lang", DEEPL_LANG_MAP[sourceLang] || sourceLang.toUpperCase());
      params.append("target_lang", DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase());
      if (options?.html) {
        params.append("tag_handling", "html");
      }

      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${this.apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(`DeepL API error: ${res.status}`, error);
        results.push(...chunk);
        continue;
      }

      const data = await res.json();
      results.push(...data.translations.map((t: { text: string }) => t.text));
    }

    return results;
  }
}
