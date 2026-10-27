import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { bandChanges, PositionBandBars } from "./PositionBandBars";

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

  it("counts moves between bands over queries seen in both windows", () => {
    expect(
      bandChanges([
        { position: 2, previousPosition: 5 },
        { position: 8, previousPosition: 25 },
        { position: 3, previousPosition: null },
      ]),
    ).toEqual({ top3: 1, top10: 0, top20: 0, beyond: -1 });
  });
});

it("distinguishes no paired cohort from measured net zero", () => {
  expect(bandChanges([{ position: 3 }])).toEqual({
    top3: null,
    top10: null,
    top20: null,
    beyond: null,
  });
  expect(
    bandChanges([
      { position: 3, previousPosition: 4 },
      { position: 4, previousPosition: 3 },
    ]),
  ).toEqual({ top3: 0, top10: 0, top20: 0, beyond: 0 });
});
