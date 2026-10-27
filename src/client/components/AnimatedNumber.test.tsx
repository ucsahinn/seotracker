import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AnimatedNumber } from "./AnimatedNumber";

function mockReduced(matches: boolean) {
  vi.stubGlobal("matchMedia", () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("AnimatedNumber", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("is instant under reduced motion", () => {
    mockReduced(true);
    const { container } = render(<AnimatedNumber value={12345} />);
    expect(container.querySelector("[aria-hidden]")?.textContent).toBe(
      "12.345",
    );
  });

  it("always exposes the final value to assistive tech", () => {
    mockReduced(false);
    render(
      <AnimatedNumber value={1500} format={(n) => `${Math.round(n)} tık`} />,
    );
    expect(screen.getByText("1500 tık", { selector: ".sr-only" })).toBeTruthy();
  });

  it("exposes a descriptive final value once while the animated copy stays hidden", () => {
    // Before this fix callers could only expose a bare formatted number.
    mockReduced(true);
    const { container } = render(
      <AnimatedNumber value={7} accessibleText="7 Anahtar olay" />,
    );
    const spoken = screen.getByText("7 Anahtar olay");
    expect(spoken.closest("[aria-hidden]")).toBeNull();
    expect(container.querySelectorAll(".sr-only")).toHaveLength(1);
    expect(container.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "7",
    );
  });

  it("counts up and lands on the final value", () => {
    mockReduced(false);
    vi.useFakeTimers();
    const { container } = render(
      <AnimatedNumber value={1000} durationMs={200} />,
    );
    const shown = () => container.querySelector("[aria-hidden]")?.textContent;
    expect(shown()).toBe("0");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(shown()).toBe("1.000");
  });
});
