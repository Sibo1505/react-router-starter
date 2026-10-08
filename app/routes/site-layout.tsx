import { Outlet } from "react-router";

import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";

import type { Route } from "./+types/site-layout";

// Runs on the server: computing the year here (instead of during render) keeps
// server and client output identical and avoids hydration mismatches.
export function loader() {
  return { year: new Date().getFullYear() };
}

// Shared frame for all regular pages. The matched child route renders into <Outlet />.
export default function SiteLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter year={loaderData.year} />
    </div>
  );
}
