import { useTranslation } from "react-i18next";
import { data, Link } from "react-router";

import { Container } from "~/components/ui/container";
import { localizePath } from "~/lib/i18n";
import { useLocale } from "~/lib/use-locale";
import { getInstance } from "~/middleware/i18next";

import type { Route } from "./+types/not-found";

// Respond with a real 404 status code (important for SEO), while still rendering
// this page inside the site layout instead of the generic error boundary.
export function loader({ context }: Pick<Route.LoaderArgs, "context">) {
  const { t } = getInstance(context);
  return data({ title: t("meta.notFound.title") }, { status: 404 });
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData.title }];
}

export default function NotFound() {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <Container className="pt-16">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">404</p>
      <h1 className="mt-2 text-3xl font-semibold">{t("notFound.heading")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{t("notFound.text")}</p>
      <Link
        to={localizePath(locale, "/")}
        className="mt-6 inline-block underline underline-offset-4"
      >
        {t("notFound.backHome")}
      </Link>
    </Container>
  );
}
