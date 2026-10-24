import { afterEach, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FloatingTooltip } from "./FloatingTooltip";

afterEach(() => vi.unstubAllGlobals());
it("keeps a tall explanation inside the viewport using its measured size", () => {
  vi.stubGlobal("innerWidth", 400);
  vi.stubGlobal("innerHeight", 300);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
    new DOMRect(180, -90, 256, 240),
  );
  render(
    <FloatingTooltip id="explanation" position={{ left: 308, top: 150 }}>
      A long explanation
    </FloatingTooltip>,
  );
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip.style.left).toBe("264px");
  expect(tooltip.style.top).toBe("248px");
});
