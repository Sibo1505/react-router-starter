import { test as base, expect } from "@playwright/test";

// Every test automatically fails if the page logs a console error or throws an uncaught exception,
// so hydration mismatches or missing assets cannot slip through unnoticed.
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        // Expected: the browser logs the intentional 404 response of the not-found page.
        const isExpected404 =
          message.text().includes("status of 404") && message.location().url === page.url();
        if (message.type() === "error" && !isExpected404) errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await use(errors);

      expect(errors, "console errors during the test").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
