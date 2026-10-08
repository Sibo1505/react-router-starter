import { screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import type { Locale } from "~/lib/i18n";

import { renderWithI18n } from "../../../test/i18n";
import { LanguageSwitcher } from "./language-switcher";

function renderAt(url: string, locale: Locale) {
  const Stub = createRoutesStub([{ path: "*", Component: LanguageSwitcher }]);
  renderWithI18n(<Stub initialEntries={[url]} />, locale);
}

describe("LanguageSwitcher", () => {
  it("links from a German page to its English version", async () => {
    renderAt("/projects", "de");

    const link = await screen.findByRole("link", { name: "Seite auf Englisch anzeigen" });
    expect(link).toHaveAttribute("href", "/en/projects");
    expect(link).toHaveAttribute("hreflang", "en");
    expect(link).toHaveTextContent("English");
  });

  it("links from an English page to its German version", async () => {
    renderAt("/en/projects", "en");

    const link = await screen.findByRole("link", { name: "View this page in German" });
    expect(link).toHaveAttribute("href", "/projects");
    expect(link).toHaveTextContent("Deutsch");
  });

  it("keeps query string and hash", async () => {
    renderAt("/?tab=cv#skills", "de");

    const link = await screen.findByRole("link");
    expect(link).toHaveAttribute("href", "/en?tab=cv#skills");
  });
});
