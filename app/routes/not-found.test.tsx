import { screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { createI18nContext, renderWithI18n } from "../../test/i18n";
import NotFound, { loader } from "./not-found";

describe("not-found route", () => {
  it("responds with HTTP status 404 and a German title", async () => {
    const context = await createI18nContext("http://localhost/does-not-exist");
    const result = loader({ context });

    expect(result.init?.status).toBe(404);
    expect(result.data.title).toBe("Seite nicht gefunden – My App");
  });

  it("uses the English title under /en", async () => {
    const context = await createI18nContext("http://localhost/en/does-not-exist");

    expect(loader({ context }).data.title).toBe("Page not found – My App");
  });

  it("links back to the German home page", async () => {
    // createRoutesStub provides the router context that <Link> needs.
    const Stub = createRoutesStub([{ path: "/unknown", Component: NotFound }]);
    renderWithI18n(<Stub initialEntries={["/unknown"]} />, "de");

    const link = await screen.findByRole("link", { name: "Zur Startseite" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("links back to the English home page", async () => {
    const Stub = createRoutesStub([{ path: "/en/unknown", Component: NotFound }]);
    renderWithI18n(<Stub initialEntries={["/en/unknown"]} />, "en");

    const link = await screen.findByRole("link", { name: "Back to home" });
    expect(link).toHaveAttribute("href", "/en");
  });
});
