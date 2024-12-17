import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import { WithSelector } from "./with-selectors";

describe("Test r18gs with selectors", () => {
  beforeEach(() => render(<WithSelector />));
  test("test re-renders", ({ expect }) => {
    const headerRenderCount = screen.getByTestId("header-render-count");
    const couter1Display = screen.getByTestId("counter1-display");
    const incrementBtn = screen.getByTestId("increment-btn");
    fireEvent.click(incrementBtn);
    expect(headerRenderCount.textContent).toContain("1");
    expect(couter1Display.textContent).toContain("2");
  });
});
