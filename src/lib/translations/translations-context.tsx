"use client";

import { createContext, useContext, useCallback } from "react";

type TranslationDict = Record<string, string>;

const TranslationsContext = createContext<TranslationDict>({});

export function TranslationsProvider({
  translations,
  children,
}: {
  translations: TranslationDict;
  children: React.ReactNode;
}) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations(): (key: string) => string {
  const dict = useContext(TranslationsContext);
  return useCallback((key: string) => dict[key] || key, [dict]);
}
