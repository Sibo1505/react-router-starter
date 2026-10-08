import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("shows the copyright notice with the given year", () => {
    render(<SiteFooter year={2026} />);

    expect(screen.getByRole("contentinfo")).toHaveTextContent("© 2026 My App");
  });
});
