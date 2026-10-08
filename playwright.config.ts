import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const isCI = Boolean(process.env["CI"]);

// End-to-end tests run against the real production build in a real browser.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  // Retries hide flaky tests locally, but protect CI from rare infrastructure hiccups.
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Keep a full trace (DOM snapshots, network, console) of failed tests for debugging.
    trace: "retain-on-failure",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    command: "pnpm build && pnpm start",
    url: `http://localhost:${PORT}`,
    env: { PORT: String(PORT) },
    // Locally an already running server is reused; CI always starts a fresh one.
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
