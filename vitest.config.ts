import { defineConfig } from "vitest/config";

// Separate config for tests: the React Router Vite plugin is built for the dev server
// and production builds, not for running isolated unit/component tests.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    // Fail fast on forgotten `.only` in CI and keep mocks from leaking between tests.
    allowOnly: !process.env["CI"],
    restoreMocks: true,
  },
});
