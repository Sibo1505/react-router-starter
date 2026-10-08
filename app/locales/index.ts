import type { Resource } from "i18next";

import type { Locale } from "~/lib/i18n";

import de from "./de/translation.json";
import en from "./en/translation.json";

// Translations are plain i18next JSON files so external tools (e.g. Weblate) can edit them.
// German is the source of truth: every other locale must provide at least the same keys.
const resources = {
  de: { translation: de },
  en: { translation: en satisfies typeof de },
} satisfies Record<Locale, Resource[string]>;

export default resources;
