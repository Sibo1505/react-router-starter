import { initReactI18next } from "react-i18next";
import { createI18nextMiddleware } from "remix-i18next";

import { defaultLocale, getLocaleFromPathname, locales } from "~/lib/i18n";
import resources from "~/locales";

// Creates one i18next instance per request on the server. Loaders, meta and SSR all share it.
export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    supportedLanguages: [...locales],
    fallbackLanguage: defaultLocale,
    // The URL is the only source of the language. No cookie or Accept-Language header,
    // so every URL always renders the same language (important for SEO and sharing links).
    order: ["custom"],
    findLocale: async ({ request }) => getLocaleFromPathname(new URL(request.url).pathname),
  },
  i18next: {
    resources,
    // React already escapes rendered values, so i18next must not escape them twice.
    interpolation: { escapeValue: false },
  },
  plugins: [initReactI18next],
});

// Makes `t("...")` type-safe: unknown keys are compile errors.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: (typeof resources)["de"];
  }
}
