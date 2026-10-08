import { createInstance } from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";

import { defaultLocale, isLocale, locales } from "~/lib/i18n";
import resources from "~/locales";

// Hydrate in the same language the server rendered: it is written to <html lang>.
const htmlLang = document.documentElement.lang;
const lng = isLocale(htmlLang) ? htmlLang : defaultLocale;

// Translations are bundled (two small JSON files), so no request is needed before hydration.
// With `initAsync: false` init completes synchronously, so the returned promise can be ignored.
const i18n = createInstance();
void i18n.use(initReactI18next).init({
  resources,
  lng,
  supportedLngs: [...locales],
  fallbackLng: defaultLocale,
  initAsync: false,
  // React already escapes rendered values, so i18next must not escape them twice.
  interpolation: { escapeValue: false },
});

startTransition(() => {
  hydrateRoot(
    document,
    <I18nextProvider i18n={i18n}>
      <StrictMode>
        <HydratedRouter />
      </StrictMode>
    </I18nextProvider>,
  );
});
