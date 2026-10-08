import { describe, expect, it } from "vitest";

import { defaultLocale, locales } from "~/lib/i18n";

import resources from "./index";

/** Flattens nested translations to [key, value] pairs, e.g. ["home.heading", "Welcome"]. */
function flatten(value: unknown, prefix = ""): Array<[string, unknown]> {
  if (typeof value !== "object" || value === null) return [[prefix, value]];

  return Object.entries(value).flatMap(([key, nested]) =>
    flatten(nested, prefix ? `${prefix}.${key}` : key),
  );
}

const keysOf = (value: unknown) =>
  flatten(value)
    .map(([key]) => key)
    .toSorted();

describe("translations", () => {
  // TypeScript already catches missing keys; this test also catches leftover extra keys.
  it.each(locales.filter((locale) => locale !== defaultLocale))(
    "%s has exactly the same keys as the default locale",
    (locale) => {
      expect(keysOf(resources[locale].translation)).toEqual(
        keysOf(resources[defaultLocale].translation),
      );
    },
  );

  it.each(locales)("%s has no empty translations", (locale) => {
    const emptyKeys = flatten(resources[locale].translation)
      .filter(([, text]) => typeof text !== "string" || text.trim() === "")
      .map(([key]) => key);

    expect(emptyKeys).toEqual([]);
  });
});
