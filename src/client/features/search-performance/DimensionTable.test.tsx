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
        search=""
        onSearchChange={() => {}}
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
        search=""
        onSearchChange={() => {}}
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
        search=""
        onSearchChange={() => {}}
      />,
    );
    expect(screen.getByText(/henüz veri yok/i)).toBeDefined();

    rerender(
      <DimensionTable
        rows={[]}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter
        search=""
        onSearchChange={() => {}}
      />,
    );
    expect(screen.getByText(/filtrelerle eşleşen satır yok/i)).toBeDefined();
  });
});

describe("DimensionTable search", () => {
  const rows = [
    {
      key: "parola yöneticisi",
      clicks: 10,
      impressions: 100,
      ctr: 0.1,
      position: 4,
    },
    {
      key: "şifre yöneticisi",
      clicks: 5,
      impressions: 50,
      ctr: 0.1,
      position: 8,
    },
    {
      key: "windows server",
      clicks: 1,
      impressions: 10,
      ctr: 0.1,
      position: 20,
    },
  ];

  /*
   * The tables run to hundreds of rows and had no way to find one of them.
   * Narrowing happens over the whole fetched set, not the visible page.
   */
  it("keeps only the rows containing the search text", () => {
    render(
      <DimensionTable
        rows={rows}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
        search="yönet"
        onSearchChange={() => {}}
      />,
    );

    expect(screen.getByText("parola yöneticisi")).toBeDefined();
    expect(screen.getByText("şifre yöneticisi")).toBeDefined();
    expect(screen.queryByText("windows server")).toBeNull();
  });

  /*
   * Turkish casing: a plain toLowerCase turns "I" into "i" and leaves "İ"
   * alone, so searching "şi" would miss a row starting "Şifre".
   */
  it("matches regardless of Turkish casing", () => {
    render(
      <DimensionTable
        rows={[{ ...rows[1], key: "ŞİFRE YÖNETİCİSİ" }]}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
        search="şifre"
        onSearchChange={() => {}}
      />,
    );

    expect(screen.getByText("ŞİFRE YÖNETİCİSİ")).toBeDefined();
  });

  it("says what matched nothing, rather than what filters are set", () => {
    render(
      <DimensionTable
        rows={rows}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
        search="bulunamaz"
        onSearchChange={() => {}}
      />,
    );

    expect(screen.getByText(/"bulunamaz" ile eşleşen satır yok/)).toBeDefined();
  });
});
