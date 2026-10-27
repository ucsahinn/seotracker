import { describe, expect, it } from "vitest";
import { searchViewFixture } from "./search-view-test-fixtures";
import { toLegacyReport } from "./searchPerformanceView";

describe("toLegacyReport", () => {
  /*
   * The dashboard's CTR tile compares against prevTotals.ctr. Read as 0, a
   * missing previous period showed the whole current rate as a gain.
   */
  it("keeps an unknown previous CTR unknown", () => {
    const noPrevious = toLegacyReport(searchViewFixture());
    expect(noPrevious.prevTotals.ctr).toBeNull();

    const noImpressions = toLegacyReport(
      searchViewFixture({
        totals: {
          ...searchViewFixture().totals,
          previous: { clicks: 0, impressions: 0, ctr: null, position: null },
        },
      }),
    );
    expect(noImpressions.prevTotals).toMatchObject({
      ctr: null,
      position: null,
    });
  });
});
