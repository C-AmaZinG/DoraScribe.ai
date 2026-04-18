export interface TranslationOptions {
  html?: boolean;
}

export interface TranslationProvider {
  translate(text: string, targetLang: string, sourceLang?: string, options?: TranslationOptions): Promise<string>;
  translateBatch(texts: string[], targetLang: string, sourceLang?: string, options?: TranslationOptions): Promise<string[]>;
}
