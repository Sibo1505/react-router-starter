import {
  type RouteConfig,
  type RouteConfigEntry,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

import { defaultLocale, locales, type Locale } from "./lib/i18n";

// All pages, defined once. Each locale gets its own copy of this tree, so the same route
// module is registered multiple times; the `id` keeps every registration unique.
function pages(locale: Locale): RouteConfigEntry[] {
  return [
    layout("routes/site-layout.tsx", { id: `${locale}/layout` }, [
      index("routes/home.tsx", { id: `${locale}/home` }),

      // Catch-all: must stay last so it only matches URLs no other route handles.
      route("*", "routes/not-found.tsx", { id: `${locale}/not-found` }),
    ]),
  ];
}

// Central route config: German lives at "/", other locales under their prefix ("/en/...").
export default [
  ...pages(defaultLocale),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .flatMap((locale) => prefix(locale, pages(locale))),
] satisfies RouteConfig;
