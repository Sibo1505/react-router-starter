import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import { localizePath, locales } from "~/lib/i18n";
import { useLocale } from "~/lib/use-locale";

// Links to the current page in the other language, e.g. "/en/projects" ↔ "/projects".
export function LanguageSwitcher() {
  const { t } = useTranslation();
  const locale = useLocale();
  const { pathname, search, hash } = useLocation();

  const target = locales.find((candidate) => candidate !== locale) ?? locale;

  return (
    <Link
      to={`${localizePath(target, pathname)}${search}${hash}`}
      hrefLang={target}
      lang={target}
      aria-label={t("languageSwitcher.ariaLabel")}
      className="text-sm underline-offset-4 hover:underline"
    >
      {t("languageSwitcher.label")}
    </Link>
  );
}
