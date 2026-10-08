import { Link } from "react-router";

import { Container } from "~/components/ui/container";
import { siteName } from "~/config/site";
import { localizePath } from "~/lib/i18n";
import { useLocale } from "~/lib/use-locale";

import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const locale = useLocale();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <Container className="flex h-16 items-center justify-between">
        <Link to={localizePath(locale, "/")} className="font-semibold">
          {siteName}
        </Link>
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
