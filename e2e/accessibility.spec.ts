import { AxeBuilder } from "@axe-core/playwright";

import { expect, test } from "./fixtures";

// Automated WCAG checks with axe-core. They catch common issues (contrast, labels, landmarks,
// missing lang), but not everything: manual keyboard and screen reader testing is still needed.
const pages = ["/", "/en", "/gibt-es-nicht"];

for (const path of pages) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${path} has no detectable accessibility violations (${colorScheme})`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
}
