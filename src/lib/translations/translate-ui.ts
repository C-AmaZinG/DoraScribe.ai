import { defaultLocale } from "../i18n";

import frDict from "./generated/fr.json";
import esDict from "./generated/es.json";
import ptDict from "./generated/pt.json";
import deDict from "./generated/de.json";

const dicts: Record<string, Record<string, string>> = {
  fr: frDict,
  es: esDict,
  pt: ptDict,
  de: deDict,
};

export async function translateUiStrings(
  locale: string
): Promise<Record<string, string>> {
  if (locale === defaultLocale) return {};
  return dicts[locale] || {};
}
