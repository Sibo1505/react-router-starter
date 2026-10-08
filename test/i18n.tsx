import { render, type RenderResult } from "@testing-library/react";
import { createInstance, type i18n } from "i18next";
import type { ReactElement } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { RouterContextProvider } from "react-router";

import { defaultLocale, type Locale } from "~/lib/i18n";
import resources from "~/locales";
import { i18nextMiddleware } from "~/middleware/i18next";

/** Creates an isolated i18next instance with the real translations (no shared global state). */
export function createTestI18n(locale: Locale = defaultLocale): i18n {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: defaultLocale,
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}

/** Renders a component with translations in the given locale. */
export function renderWithI18n(ui: ReactElement, locale: Locale = defaultLocale): RenderResult {
  return render(<I18nextProvider i18n={createTestI18n(locale)}>{ui}</I18nextProvider>);
}

/**
 * Runs the real i18next middleware for a URL and returns the resulting router context,
 * so loaders can be tested exactly as they run on the server.
 */
export async function createI18nContext(url: string): Promise<RouterContextProvider> {
  const context = new RouterContextProvider();
  await i18nextMiddleware(
    { request: new Request(url), url: new URL(url), pattern: "", params: {}, context },
    () => Promise.resolve(new Response()),
  );
  return context;
}
