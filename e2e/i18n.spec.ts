import { expect, test } from "./fixtures";

test.describe("language", () => {
  test("serves German at / even for browsers that prefer English", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();

    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(
      page.getByText("Diese App wurde aus dem react-router-starter erstellt."),
    ).toBeVisible();
    await context.close();
  });

  test("serves English at /en", async ({ page }) => {
    await page.goto("/en");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByText("This app was created from the react-router-starter."),
    ).toBeVisible();
  });

  test("switches language client-side and supports the back button", async ({ page }) => {
    await page.goto("/");
    // A full page reload would remove this marker; client-side navigation keeps it.
    await page.evaluate(() => Object.assign(window, { e2eNoReload: true }));

    await page.getByRole("link", { name: "Seite auf Englisch anzeigen" }).click();
    await expect(page).toHaveURL("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByText("This app was created from the react-router-starter."),
    ).toBeVisible();

    await page.getByRole("link", { name: "View this page in German" }).click();
    await expect(page).toHaveURL("/");
    await expect(
      page.getByText("Diese App wurde aus dem react-router-starter erstellt."),
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    const stayedOnPage = await page.evaluate(() => "e2eNoReload" in window);
    expect(stayedOnPage, "navigation should not reload the page").toBe(true);
  });
});
