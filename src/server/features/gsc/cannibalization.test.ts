import { describe, expect, it } from "vitest";
import type { GscSearchAnalyticsRow } from "@/server/lib/gscClient";
import { findCannibalizedQueries } from "@/server/features/gsc/cannibalization";

function row(
  query: string,
  page: string,
  impressions: number,
  clicks = 0,
  position = 10,
): GscSearchAnalyticsRow {
  return {
    keys: [query, page],
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position,
  };
}

describe("findCannibalizedQueries", () => {
  it("ignores a query served by a single page", () => {
    const result = findCannibalizedQueries([row("ayakkabı", "/a", 500, 50)]);

    expect(result.rows).toEqual([]);
    expect(result.queriesAnalyzed).toBe(1);
  });

  it("reports a query two of your pages are chasing", () => {
    const result = findCannibalizedQueries([
      row("ayakkabı", "/a", 400, 40, 4),
      row("ayakkabı", "/b", 300, 10, 9),
    ]);

    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]).toMatchObject({
      query: "ayakkabı",
      impressions: 700,
      bestPosition: 4,
      primary: { page: "/a" },
    });
    expect(result.rows[0]?.competitors.map((page) => page.page)).toEqual([
      "/b",
    ]);
  });

  // Every site has a long tail of queries with two impressions on two pages.
  // Reporting those would bury the handful that matter.
  it("drops queries below the noise floor", () => {
    const result = findCannibalizedQueries([
      row("nadir", "/a", 5),
      row("nadir", "/b", 4),
    ]);

    expect(result.rows).toEqual([]);
    expect(result.queriesAnalyzed).toBe(0);
  });

  it("does not count a stray impression as a competing page", () => {
    const result = findCannibalizedQueries([
      row("ayakkabı", "/a", 990, 90),
      row("ayakkabı", "/stray", 2),
    ]);

    expect(result.rows).toEqual([]);
  });

  // Clicks decide which page Google actually favours; position only breaks
  // a tie, because a page can rank well and still be ignored.
  it("treats the page with the most clicks as the primary one", () => {
    const result = findCannibalizedQueries([
      row("bot", "/ranks-higher", 400, 5, 3),
      row("bot", "/earns-more", 400, 60, 8),
    ]);

    expect(result.rows[0]?.primary.page).toBe("/earns-more");
  });

  // The tie-break used to jump straight from clicks to position, and position
  // is an average over only the impressions where a page appeared. A page seen
  // once near the top beat a page seen hundreds of times.
  it("prefers the page Google showed more often over one it showed once high", () => {
    const result = findCannibalizedQueries([
      row("bot", "/seen-once-high", 400, 0, 3),
      row("bot", "/seen-often", 400, 0, 9),
    ]);

    expect(result.rows[0]?.primary.page).toBe("/seen-once-high");

    const withImpressions = findCannibalizedQueries([
      row("bot", "/seen-once-high", 250, 0, 3),
      row("bot", "/seen-often", 550, 0, 9),
    ]);

    expect(withImpressions.rows[0]?.primary.page).toBe("/seen-often");
  });

  // A page holding a sliver of a query is not competing with anything.
  it("ignores a page below the share floor even when it clears the count", () => {
    const result = findCannibalizedQueries([
      row("ayakkabı", "/a", 900, 40),
      row("ayakkabı", "/sliver", 40),
    ]);

    expect(result.rows).toEqual([]);
  });

  it("falls back to position when neither page has a click", () => {
    const result = findCannibalizedQueries([
      row("bot", "/lower", 400, 0, 12),
      row("bot", "/higher", 400, 0, 6),
    ]);

    expect(result.rows[0]?.primary.page).toBe("/higher");
  });

  it("measures how much of the query went elsewhere", () => {
    const result = findCannibalizedQueries([
      row("ayakkabı", "/a", 600, 40),
      row("ayakkabı", "/b", 400, 10),
    ]);

    expect(result.rows[0]?.splitShare).toBeCloseTo(0.4);
    expect(result.splitImpressions).toBe(400);
  });

  it("puts the query with the most at stake first", () => {
    const result = findCannibalizedQueries([
      row("küçük", "/a", 60, 5),
      row("küçük", "/b", 40, 1),
      row("büyük", "/c", 900, 50),
      row("büyük", "/d", 600, 10),
    ]);

    expect(result.rows.map((entry) => entry.query)).toEqual(["büyük", "küçük"]);
  });

  it("skips rows the API returned without both dimensions", () => {
    const result = findCannibalizedQueries([
      {
        keys: ["ayakkabı"],
        clicks: 1,
        impressions: 50,
        ctr: 0.02,
        position: 5,
      },
      row("ayakkabı", "/a", 400, 40),
      row("ayakkabı", "/b", 300, 10),
    ]);

    expect(result.rows[0]?.impressions).toBe(700);
  });
});
