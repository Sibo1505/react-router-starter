import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { Container } from "~/components/ui/container";
import { getLocaleFromPathname } from "~/lib/i18n";
import { i18nextMiddleware } from "~/middleware/i18next";

import type { Route } from "./+types/root";

import "./app.css";

// Runs before every loader: detects the locale from the URL and prepares i18next.
export const middleware: Route.MiddlewareFunction[] = [i18nextMiddleware];

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  // Read from the URL (not from i18next) so <html lang> is correct in every render,
  // even in the moment before i18next has switched languages after a navigation.
  const locale = getLocaleFromPathname(useLocation().pathname);

  return (
    <html lang={locale} dir={i18n.dir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  // Derive the locale from the URL with the same function the server middleware uses.
  // (A root loader would not work here: React Router does not re-run it on client-side
  // navigation between "/" and "/en", because the root route's params do not change.)
  const locale = getLocaleFromPathname(useLocation().pathname);

  // Keep the client-side i18next instance in sync when navigation switches the locale.
  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return <Outlet />;
}

// Last line of defense for unexpected errors (crashes, failed loaders).
// Regular 404s are handled by routes/not-found.tsx inside the site layout.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();

  let message = t("error.heading");
  let details = t("error.text");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = String(error.status);
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    // Only expose error details during development, never in production.
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container className="pt-16">
      <h1 className="text-3xl font-semibold">{message}</h1>
      <p className="mt-2">{details}</p>
      {stack && (
        <pre className="mt-4 w-full overflow-x-auto p-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </Container>
  );
}
