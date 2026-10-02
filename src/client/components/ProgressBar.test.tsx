import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProgressBar, StepProgress } from "./ProgressBar";

function mockReduced(matches: boolean) {
  vi.stubGlobal("matchMedia", () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("ProgressBar", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("exposes aria values and Turkish valuetext", () => {
    render(<ProgressBar label="Tarama" value={30} max={120} showCount />);
    const bar = screen.getByRole("progressbar", { name: "Tarama" });
    expect(bar.getAttribute("aria-valuenow")).toBe("30");
    expect(bar.getAttribute("aria-valuemax")).toBe("120");
    expect(bar.getAttribute("aria-valuetext")).toContain("Sürüyor");
    expect(bar.getAttribute("aria-valuetext")).toContain("30 / 120");
    expect(screen.getByText(/30 \/ 120/)).toBeTruthy();
  });

  it("scales the fill and clamps", () => {
    const { container } = render(
      <ProgressBar label="x" value={500} max={100} />,
    );
    expect(
      container.querySelector<HTMLElement>(".progress-fill")?.style.transform,
    ).toBe("scaleX(1)");
  });

  it("states errors with text, not only colour", () => {
    render(<ProgressBar label="x" value={10} state="error" />);
    expect(screen.getAllByText("Hata").length).toBeGreaterThan(0);
  });

  it("indeterminate has no aria-valuenow", () => {
    render(<ProgressBar label="x" indeterminate />);
    expect(screen.getByRole("progressbar").hasAttribute("aria-valuenow")).toBe(
      false,
    );
  });

  it("adds is-static under reduced motion", () => {
    mockReduced(true);
    render(<ProgressBar label="x" value={1} />);
    expect(
      screen.getByRole("progressbar").classList.contains("is-static"),
    ).toBe(true);
  });

  it("has no is-static with motion allowed", () => {
    mockReduced(false);
    render(<ProgressBar label="x" value={1} />);
    expect(
      screen.getByRole("progressbar").classList.contains("is-static"),
    ).toBe(false);
  });
});

describe("StepProgress", () => {
  it("marks the current step", () => {
    render(<StepProgress steps={["A", "B", "C"]} current={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1].getAttribute("aria-current")).toBe("step");
    expect(items[0].hasAttribute("aria-current")).toBe(false);
    expect(items[2].textContent).toContain("bekliyor");
  });
});
