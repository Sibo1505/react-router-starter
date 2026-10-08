import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./container";

describe("Container", () => {
  it("renders its children", () => {
    render(<Container>Hello</Container>);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("merges a custom className with the base layout classes", () => {
    render(<Container className="pt-16">Content</Container>);

    const container = screen.getByText("Content");
    expect(container).toHaveClass("mx-auto", "max-w-5xl", "pt-16");
  });
});
