import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PositionBandBars } from "./PositionBandBars";

const rows = [
  { position: 2 },
  { position: 3 },
  { position: 4 },
  { position: 21 },
];

describe("PositionBandBars", () => {
  it("counts each band and filters on click", () => {
    const onChange = vi.fn();
    render(
      <PositionBandBars rows={rows} active={undefined} onChange={onChange} />,
    );
    expect(
      screen.getByRole("button", { name: "Sıra 1-3: 2 sorgu" }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Sıra 4-10: 1 sorgu" }),
    ).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Sıra 21+: 1 sorgu" }));
    expect(onChange).toHaveBeenCalledWith("beyond");
  });

  it("disables an empty band and clears the active one on a second press", () => {
    const onChange = vi.fn();
    render(<PositionBandBars rows={rows} active="top3" onChange={onChange} />);
    expect(
      screen
        .getByRole("button", { name: "Sıra 11-20: 0 sorgu" })
        .hasAttribute("disabled"),
    ).toBe(true);
    const active = screen.getByRole("button", { name: "Sıra 1-3: 2 sorgu" });
    expect(active.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(active);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
