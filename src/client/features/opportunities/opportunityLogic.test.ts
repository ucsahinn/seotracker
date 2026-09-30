import { describe, expect, it } from "vitest";
import {
  applyFilters,
  quickCounts,
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
    expect(quickCounts(rows)).toEqual({ analytics: 1, top_impressions: 10 });
    expect(quickCounts([row("x")])).toEqual({
      analytics: 0,
      top_impressions: 1,
    });
  });
});
