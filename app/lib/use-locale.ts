import { useTranslation } from "react-i18next";

import { defaultLocale, isLocale, type Locale } from "./i18n";

/** The active locale, typed as `Locale` instead of i18next's plain string. */
export function useLocale(): Locale {
  const { i18n } = useTranslation();
  return isLocale(i18n.language) ? i18n.language : defaultLocale;
}
