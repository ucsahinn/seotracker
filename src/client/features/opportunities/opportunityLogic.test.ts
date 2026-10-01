import { describe, expect, it } from "vitest";
import {
  applyFilters,
  explainRow,
  quickCounts,
  topOpportunity,
  type OpportunityRow,
} from "./opportunityLogic";

function row(
  page: string,
  overrides: Partial<OpportunityRow> = {},
): OpportunityRow {
  return {
    page,
    normalizedPage: page,
    clicks: 1,
    impressions: 10,
    ctr: 0.1,
    position: 8,
    joinStatus: "gsc_only",
    ga4: null,
    score: 50,
    kind: "near_miss",
    ctrGap: null,
    scoreComponents: null,
    ...overrides,
  };
}

const traffic = {
  sessions: 5,
  activeUsers: 4,
  engagedSessions: 3,
  engagementRate: 0.6,
  keyEvents: 0,
  sessionKeyEventRate: 0,
  transactions: 0,
  purchaseRevenue: null,
};

describe("applyFilters", () => {
  const rows = [
    row("a", { impressions: 500, kind: "deep" }),
    ...Array.from({ length: 11 }, (_, i) => row(`p${i}`, { impressions: i })),
    row("g", { ga4: traffic, kind: "ctr_gap" }),
  ];

  it("keeps only pages with Analytics sessions", () => {
    expect(applyFilters(rows, null, "analytics").map((r) => r.page)).toEqual([
      "g",
    ]);
  });

  it("measures the top ten over the whole set, then applies the kind", () => {
    expect(applyFilters(rows, null, "top_impressions")).toHaveLength(10);
    expect(
      applyFilters(rows, "deep", "top_impressions").map((r) => r.page),
    ).toEqual(["a"]);
  });

  it("counts chips over everything, so an empty one can be disabled", () => {
    expect(quickCounts(rows)).toEqual({
      analytics: 1,
      no_analytics: 12,
      top_impressions: 10,
    });
    expect(quickCounts([row("x")])).toEqual({
      analytics: 0,
      no_analytics: 1,
      top_impressions: 1,
    });
  });

  it("keeps only pages Analytics has no record of", () => {
    const shown = applyFilters(rows, null, "no_analytics").map((r) => r.page);
    expect(shown).toHaveLength(12);
    expect(shown).not.toContain("g");
  });
});

describe("topOpportunity", () => {
  it("returns the highest score, ignoring unscored rows", () => {
    const rows = [
      row("a", { score: 40 }),
      row("b", { score: 90 }),
      row("c", { score: null }),
    ];
    expect(topOpportunity(rows)?.page).toBe("b");
  });

  it("is null when nothing is scored", () => {
    expect(topOpportunity([])).toBeNull();
    expect(topOpportunity([row("c", { score: null })])).toBeNull();
  });
});

describe("explainRow", () => {
  // A top-3 page is never "close to page one"; the copy must not claim it.
  it("does not tell a top-3 page it is near the first page", () => {
    const text = explainRow(row("a", { position: 1.4, kind: "top" }));
    expect(text).toContain("zaten ilk sıralarda");
    expect(text).not.toContain("ilk sayfaya çok yakın");
    expect(explainRow(row("b", { position: 8 }))).toContain(
      "ilk sayfaya çok yakın",
    );
  });
});
