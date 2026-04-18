import type { Metadata } from "next";
import type { TranslationProvider, TranslationOptions } from "./types";
import { cacheKey, getCached, setCached } from "./cache";
import { defaultLocale } from "../i18n";
import { DeepLTranslationProvider } from "./deepl";

let providerInstance: TranslationProvider | null = null;

function getProvider(): TranslationProvider {
  if (providerInstance) return providerInstance;
  console.log("[i18n] Initializing translation provider: deepl");
  try {
    providerInstance = new DeepLTranslationProvider();
  } catch (error) {
    console.error("[i18n] Failed to initialize deepl provider:", error);
    throw error;
  }
  return providerInstance!;
}

export async function translate(
  text: string,
  targetLang: string,
  sourceLang = "en",
  options?: TranslationOptions
): Promise<string> {
  if (!text || targetLang === sourceLang || targetLang === defaultLocale) return text;

  const key = cacheKey("deepl", sourceLang, targetLang, text);
  const cached = getCached(key);
  if (cached !== null) return cached;

  try {
    const result = await getProvider().translate(text, targetLang, sourceLang, options);
    setCached(key, result);
    return result;
  } catch (error) {
    console.error(`[i18n] Translation error (${targetLang}):`, error);
    return text;
  }
}

export async function translateBatch(
  texts: string[],
  targetLang: string,
  sourceLang = "en",
  options?: TranslationOptions
): Promise<string[]> {
  if (targetLang === sourceLang || targetLang === defaultLocale) return texts;

  const results: (string | null)[] = new Array(texts.length).fill(null);
  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    if (!texts[i]) {
      results[i] = texts[i];
      continue;
    }
    const key = cacheKey("deepl", sourceLang, targetLang, texts[i]);
    const cached = getCached(key);
    if (cached !== null) {
      results[i] = cached;
    } else {
      uncachedIndices.push(i);
      uncachedTexts.push(texts[i]);
    }
  }

  if (uncachedTexts.length > 0) {
    try {
      console.log(`[i18n] Translating ${uncachedTexts.length} texts to ${targetLang}`);
      const translated = await getProvider().translateBatch(uncachedTexts, targetLang, sourceLang, options);
      for (let i = 0; i < uncachedIndices.length; i++) {
        const originalIdx = uncachedIndices[i];
        results[originalIdx] = translated[i];
        const key = cacheKey("deepl", sourceLang, targetLang, texts[originalIdx]);
        setCached(key, translated[i]);
      }
    } catch (error) {
      console.error(`[i18n] Batch translation error (${targetLang}):`, error);
      for (const idx of uncachedIndices) {
        results[idx] = texts[idx];
      }
    }
  }

  return results as string[];
}

export async function translateMetadata(metadata: Metadata, targetLang: string): Promise<Metadata> {
  if (targetLang === defaultLocale) return metadata;

  const getTitle = (t: Metadata["title"]): string => {
    if (!t) return "";
    if (typeof t === "string") return t;
    if ("absolute" in t) return t.absolute;
    if ("default" in t) return t.default;
    return "";
  };

  const ogTitle = (metadata.openGraph as Record<string, unknown>)?.title as string | undefined;
  const ogDesc = (metadata.openGraph as Record<string, unknown>)?.description as string | undefined;
  const twTitle = (metadata.twitter as Record<string, unknown>)?.title as string | undefined;
  const twDesc = (metadata.twitter as Record<string, unknown>)?.description as string | undefined;

  const texts = [
    getTitle(metadata.title),
    (metadata.description as string) || "",
    ogTitle || "",
    ogDesc || "",
    twTitle || "",
    twDesc || "",
  ];

  const translated = await translateBatch(texts, targetLang);

  return {
    ...metadata,
    title: translated[0] ? { absolute: translated[0] } : metadata.title,
    description: translated[1] || metadata.description,
    openGraph: {
      ...(metadata.openGraph as Record<string, unknown>),
      ...(translated[2] && { title: translated[2] }),
      ...(translated[3] && { description: translated[3] }),
    },
    twitter: {
      ...(metadata.twitter as Record<string, unknown>),
      ...(translated[4] && { title: translated[4] }),
      ...(translated[5] && { description: translated[5] }),
    },
  } as Metadata;
}
