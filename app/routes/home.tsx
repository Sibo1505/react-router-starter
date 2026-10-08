import { useTranslation } from "react-i18next";

import { Container } from "~/components/ui/container";
import { getInstance } from "~/middleware/i18next";

import type { Route } from "./+types/home";

// meta() cannot use hooks, so translated meta texts are prepared in the loader.
export function loader({ context }: Pick<Route.LoaderArgs, "context">) {
  const { t } = getInstance(context);
  return { title: t("meta.home.title"), description: t("meta.home.description") };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData.title }, { name: "description", content: loaderData.description }];
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <Container className="pt-16">
      <h1 className="text-3xl font-semibold">{t("home.heading")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{t("home.intro")}</p>
    </Container>
  );
}
