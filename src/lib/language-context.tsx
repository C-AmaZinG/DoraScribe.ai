"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLanguage = "en" | "fr" | "es" | "pt" | "de";

export type LanguageOption = {
  code: string;
  language: SupportedLanguage;
  name: string;
  region: string;
  country: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "EN", language: "en", name: "English", region: "US", country: "us" },
  { code: "FR", language: "fr", name: "French", region: "FR", country: "fr" },
  { code: "ES", language: "es", name: "Spanish", region: "ES", country: "es" },
  { code: "PT", language: "pt", name: "Portuguese", region: "PT", country: "pt" },
  { code: "DE", language: "de", name: "German", region: "DE", country: "de" },
];

const LANGUAGE_STORAGE_KEY = "dorascribe_language";

type LanguageContextValue = {
  activeLanguage: LanguageOption;
  setActiveLanguageByCode: (code: string) => void;
  languageOptions: LanguageOption[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeLanguage, setActiveLanguage] = useState<LanguageOption>(LANGUAGE_OPTIONS[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCode = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (!storedCode) return;
    const foundLanguage = LANGUAGE_OPTIONS.find((option) => option.code === storedCode);
    if (foundLanguage) {
      setActiveLanguage(foundLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    document.documentElement.lang = activeLanguage.language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage.code);
  }, [activeLanguage]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      activeLanguage,
      setActiveLanguageByCode: (code) => {
        const foundLanguage = LANGUAGE_OPTIONS.find((option) => option.code === code);
        if (foundLanguage) {
          setActiveLanguage(foundLanguage);
        }
      },
      languageOptions: LANGUAGE_OPTIONS,
    }),
    [activeLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

