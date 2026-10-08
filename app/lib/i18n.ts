// Single source of truth for supported languages and locale-aware URLs.
// German is the default and lives at "/", every other locale gets a path prefix ("/en/...").

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Reads the locale from the first path segment, e.g. "/en/projects" → "en", "/" → "de". */
export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/")[1];
  return isLocale(firstSegment) && firstSegment !== defaultLocale ? firstSegment : defaultLocale;
}

/** Removes a locale prefix: "/en/projects" → "/projects", "/en" → "/". */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale === defaultLocale) return pathname;

  const rest = pathname.slice(locale.length + 1);
  return rest === "" ? "/" : rest;
}

/** Builds a URL for the given locale: ("en", "/projects") → "/en/projects", ("de", "/") → "/". */
export function localizePath(locale: Locale, pathname: string): string {
  const path = stripLocale(pathname);
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
