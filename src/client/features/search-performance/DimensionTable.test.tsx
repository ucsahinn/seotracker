import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DimensionTable } from "./SearchPerformanceParts";
import type { SearchPerformanceTableRow } from "./SearchPerformanceColumns";

function row(
  key: string,
  clicks: number,
  impressions: number,
): SearchPerformanceTableRow {
  return { key, clicks, impressions, ctr: 0.1, position: 10 };
}

/*
 * The table used to hold one page of Google's own clicks-desc order and sort
 * that, so "Gösterim" reordered twenty-five of the top-twenty-five-by-clicks
 * and presented the result as the highest-impression queries. Search Console
 * has no `orderBy`, so the fix was to hold the whole set and sort it here.
 *
 * This is the assertion that would have caught it: the highest-impression
 * row sits outside the first page by clicks, so a sort that only reaches the
 * visible rows can never surface it.
 */
describe("DimensionTable sorting", () => {
  const rows = [
    // Thirty rows, clicks descending -- Google's order, and the default.
    ...Array.from({ length: 30 }, (_, index) =>
      row(`popular-${index}`, 1000 - index, 10),
    ),
    // Few clicks, enormous impressions: the impression tail this table exists
    // to find. Last by clicks, so it is on page two.
    row("buried-giant", 1, 999_999),
  ];

  it("sorts the whole dataset, not the visible page", () => {
    render(
      <DimensionTable
        rows={rows}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
      />,
    );

    // Default order is clicks-desc, and the page holds 25 of 31 rows.
    expect(screen.queryByText("buried-giant")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Gösterim/ }));

    expect(screen.getByText("buried-giant")).toBeDefined();
  });

  it("says so when the fetch hit its ceiling", () => {
    render(
      <DimensionTable
        rows={rows}
        keyLabel="Sorgu"
        truncated
        hasActiveFilter={false}
      />,
    );

    expect(screen.getByText(/bu liste tam değil/i)).toBeDefined();
  });

  /*
   * An empty table means two different things, and the operator can act on
   * only one of them. "No data for this period" sends them away; "your
   * filters match nothing" is one click from fixed.
   */
  it("distinguishes no data from a filter that matches nothing", () => {
    const { rerender } = render(
      <DimensionTable
        rows={[]}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
      />,
    );
    expect(screen.getByText(/henüz veri yok/i)).toBeDefined();

    rerender(
      <DimensionTable
        rows={[]}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter
      />,
    );
    expect(screen.getByText(/filtrelerle eşleşen satır yok/i)).toBeDefined();
  });
});
