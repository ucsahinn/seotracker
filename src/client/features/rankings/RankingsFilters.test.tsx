import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { RankingsFilters } from "./RankingsFilters";
import type { RankingArchiveData } from "./RankingSourceEvidence";

function mount(comparableCount: number) {
  // Only the filter counts are consumed by this component.
  const data = {
    comparableCount,
    moveCounts: { risers: 0, fallers: 0, lost: 0, top10: 1 },
    chipCounts: { firstPage: 1, highImpressions: 1, noClicks: 1 },
    highImpressions: 1,
    totalMatching: 1,
    totalObserved: 1,
  } satisfies Pick<
    RankingArchiveData,
    | "comparableCount"
    | "moveCounts"
    | "chipCounts"
    | "highImpressions"
    | "totalMatching"
    | "totalObserved"
  >;
  const setMove = vi.fn();
  render(
    <RankingsFilters
      data={data}
      search=""
      setSearch={vi.fn()}
      setChip={vi.fn()}
      setMove={setMove}
      setPage={vi.fn()}
      reset={vi.fn()}
    />,
  );
  return setMove;
}

it("shows unknown movement as a dash while keeping current top ten selectable", () => {
  const setMove = mount(0);
  for (const label of ["Yükselenler", "Düşenler", "İlk 10'dan çıkanlar"]) {
    const button = screen.getByRole("button", { name: new RegExp(label) });
    expect(button.textContent).toContain("—");
    expect(button.hasAttribute("disabled")).toBe(true);
  }
  fireEvent.click(
    screen.getByRole("button", { name: /Dönem ortalaması ilk 10 1/ }),
  );
  expect(setMove).toHaveBeenCalledWith("top10");
});

it("keeps measured zero movement numeric when comparisons exist", () => {
  mount(1);
  expect(screen.getByRole("button", { name: /Yükselenler 0/ })).toBeTruthy();
});

it("describes the upper quartile relative to the archive even for one impression", () => {
  mount(0);
  const chip = screen.getByRole("button", {
    name: /Arşivde en çok gösterim 1/,
  });
  expect(chip.getAttribute("title")).toContain("üst çeyrek");
  expect(chip.getAttribute("title")).toContain("1");
});
