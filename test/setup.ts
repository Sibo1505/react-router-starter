// Adds DOM matchers like `toBeInTheDocument()` and `toHaveAttribute()` to Vitest's `expect`.
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount rendered components after each test so tests stay independent.
afterEach(() => {
  cleanup();
});
