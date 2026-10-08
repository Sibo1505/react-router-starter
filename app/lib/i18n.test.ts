import { describe, expect, it } from "vitest";

import { getLocaleFromPathname, isLocale, localizePath, stripLocale } from "./i18n";

describe("isLocale", () => {
  it.each(["de", "en"])("accepts the supported locale %s", (value) => {
    expect(isLocale(value)).toBe(true);
  });

  it.each(["fr", "", "EN", undefined, 42])("rejects %s", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("getLocaleFromPathname", () => {
  it.each([
    ["/", "de"],
    ["/projects", "de"],
    ["/en", "en"],
    ["/en/projects", "en"],
    // A path that only starts with the letters "en" is not the English prefix.
    ["/entwicklung", "de"],
    // Unsupported prefixes fall back to the default locale.
    ["/fr/projects", "de"],
  ])("%s → %s", (pathname, expected) => {
    expect(getLocaleFromPathname(pathname)).toBe(expected);
  });
});

describe("stripLocale", () => {
  it.each([
    ["/en", "/"],
    ["/en/projects", "/projects"],
    ["/projects", "/projects"],
    ["/", "/"],
  ])("%s → %s", (pathname, expected) => {
    expect(stripLocale(pathname)).toBe(expected);
  });
});

describe("localizePath", () => {
  it.each([
    ["de", "/", "/"],
    ["de", "/en/projects", "/projects"],
    ["en", "/", "/en"],
    ["en", "/projects", "/en/projects"],
    // Already localized paths are not prefixed twice.
    ["en", "/en/projects", "/en/projects"],
  ] as const)("(%s, %s) → %s", (locale, pathname, expected) => {
    expect(localizePath(locale, pathname)).toBe(expected);
  });
});
