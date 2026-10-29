import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/shared/i18n";
import { bandChanges, PositionBandBars } from "./PositionBandBars";

const rows = [
  { position: 2 },
  { position: 3 },
  { position: 4 },
  { position: 21 },
];

afterEach(() => setLocale("tr"));

describe("PositionBandBars", () => {
  it.each([
    [1, "Average positions in the selected period for 1 query."],
    [4, "Average positions in the selected period for 4 queries."],
  ])(
    "describes period averages for %i observed queries in English",
    (count, caption) => {
      setLocale("en");
      render(
        <PositionBandBars
          rows={rows.slice(0, count)}
          active={undefined}
          onChange={vi.fn()}
        />,
      );
      expect(
        screen.getByText(
          `${caption} No queries can be compared with the previous period.`,
        ),
      ).toBeDefined();
    },
  );
  it("describes selected-period averages without inventing a zero-query net change", () => {
    render(
      <PositionBandBars rows={rows} active={undefined} onChange={vi.fn()} />,
    );
    expect(
      screen.getByText(/Önceki dönemle karşılaştırılabilecek sorgu yok/),
    ).toBeDefined();
    expect(
      screen.getByText(/Seçili dönemdeki ortalama sıralar: 4 sorgu/),
    ).toBeDefined();
    expect(screen.queryByText(/aynı 0 sorguda net değişim/)).toBeNull();
  });

  it("omits unavailable deltas from each band when the whole comparison is missing", () => {
    render(
      <PositionBandBars rows={rows} active={undefined} onChange={vi.fn()} />,
    );
    expect(screen.queryByText("Karşılaştırma yok")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Sıra 1-3: 2 sorgu" }),
    ).toBeDefined();
  });

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
