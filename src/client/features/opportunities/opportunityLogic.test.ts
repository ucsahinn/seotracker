import { describe, expect, it } from "vitest";
import {
  applyFilters,
  valueText,
  quickCounts,
  usefulChips,
} from "./opportunityLogic";
import { makeRow } from "./opportunity-test-fixtures";

const ga4 = {
  sessions: 200,
  activeUsers: 180,
  engagedSessions: 120,
  engagementRate: 0.6,
  keyEvents: 10,
  sessionKeyEventRate: 0.05,
  transactions: 0,
  purchaseRevenue: null,
};

describe("usefulChips", () => {
  it("keeps only chips that narrow the list", () => {
    expect(usefulChips({ converts: 3, no_conversions: 0 }, 3)).toEqual([]);
    expect(usefulChips({ converts: 1, no_conversions: 2 }, 5)).toEqual([
      "converts",
      "no_conversions",
    ]);
  });
});

describe("applyFilters", () => {
  /*
   * A bar sums one kind of work over every page that has some of it, so its
   * filter has to show the same pages -- not only those whose largest kind
   * it is, or the bar's count and the table would disagree.
   */
  it("selects every page with a gain from the chosen work", () => {
    const mixed = makeRow({
      page: "https://example.com/mixed",
      work: "page2",
      gainByWork: { snippet: 20, page1: 0, page2: 80, deep: 0 },
    });
    const other = makeRow({ page: "https://example.com/other" });
    expect(applyFilters([mixed, other], "snippet", null)).toEqual([mixed]);
  });

  it("combines a work bar with a quick chip", () => {
    const converts = makeRow({ value: "converts", ga4 });
    const rows = [converts, makeRow({ value: "no_conversions", ga4 })];
    expect(quickCounts(rows)).toEqual({ converts: 1, no_conversions: 1 });
    expect(applyFilters(rows, "page1", "converts")).toEqual([converts]);
  });
});

describe("observed Analytics value", () => {
  it("keeps observed events and the converting-session rate without projecting click gains into events", () => {
    const text = valueText(
      makeRow({ gainPerMonth: 200, value: "converts", ga4 }),
    );
    expect(text).toContain("10");
    expect(text).not.toContain("tahmin");
  });
});
