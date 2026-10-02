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
