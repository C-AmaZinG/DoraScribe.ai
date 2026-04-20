import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "es", "pt", "de"];
const DEFAULT_LOCALE = "en";

const KNOWN_ROUTES = new Set([
  "",
  "blog",
  "contact",
  "tutorials",
  "api",
]);

function isValidLocale(value: string): boolean {
  return LOCALES.includes(value);
}

function detectLocaleFromHeader(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const parsed = header
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().split("-")[0].toLowerCase(), quality: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { lang } of parsed) {
    if (isValidLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  let locale: string | null = null;
  let remainingSegments = segments;

  if (segments.length > 0 && isValidLocale(segments[0])) {
    locale = segments[0];
    remainingSegments = segments.slice(1);

    // Strip /en/ prefix — default locale has no URL prefix
    if (locale === DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = "/" + remainingSegments.join("/");
      return NextResponse.redirect(url, 301);
    }
  }

  if (!locale) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const detected =
      cookieLocale && isValidLocale(cookieLocale)
        ? cookieLocale
        : detectLocaleFromHeader(request);

    if (detected !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = `/${detected}${pathname}`;
      const response = NextResponse.redirect(url, 307);
      response.cookies.set("NEXT_LOCALE", detected, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
      });
      return response;
    }

    locale = DEFAULT_LOCALE;
  }

  // Rewrite to locale-prefixed path so app/[locale]/ matches
  const url = request.nextUrl.clone();
  if (locale === DEFAULT_LOCALE) {
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  }
  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|images|videos|fonts|favicon|robots|sitemap|api).*)",
  ],
};
