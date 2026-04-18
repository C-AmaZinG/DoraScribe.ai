import { config } from "./config";

export const locales = ["en", "fr", "es", "pt", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMap: Record<Locale, { ogLocale: string; name: string; flag: string; label: string }> = {
  en: { ogLocale: "en_US", name: "English (US)", flag: "us", label: "EN" },
  fr: { ogLocale: "fr_FR", name: "French (FR)", flag: "fr", label: "FR" },
  es: { ogLocale: "es_ES", name: "Spanish (ES)", flag: "es", label: "ES" },
  pt: { ogLocale: "pt_PT", name: "Portuguese (PT)", flag: "pt", label: "PT" },
  de: { ogLocale: "de_DE", name: "German (DE)", flag: "de", label: "DE" },
};

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return cleanPath;
  return `/${locale}${cleanPath}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export function buildAlternates(path: string): { canonical: string; languages: Record<string, string> } {
  const siteUrl = config.siteUrl;
  const cleanPath = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] =
      loc === defaultLocale
        ? `${siteUrl}${cleanPath}`
        : `${siteUrl}/${loc}${cleanPath}`;
  }
  languages["x-default"] = `${siteUrl}${cleanPath}`;
  return { canonical: `${siteUrl}${cleanPath}`, languages };
}
