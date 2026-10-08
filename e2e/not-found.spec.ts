import { expect, test } from "./fixtures";

test.describe("not found", () => {
  test("returns HTTP 404 with a German page", async ({ page }) => {
    const response = await page.goto("/gibt-es-nicht");

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle("Seite nicht gefunden – My App");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Seite nicht gefunden");
  });

  test("returns HTTP 404 with an English page under /en", async ({ page }) => {
    const response = await page.goto("/en/does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");

    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL("/en");
  });
});
