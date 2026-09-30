import { describe, expect, it } from "vitest";
import { describeClickTrend } from "./clickTrend";

const days = (clicks: number[]) =>
  clicks.map((count, index) => ({
    key: `2026-09-${String(index + 1).padStart(2, "0")}`,
    clicks: count,
    impressions: 10,
  }));

describe("describeClickTrend", () => {
  it("totals the clicks and finds the peak day", () => {
    expect(describeClickTrend(days([1, 1, 2, 2, 3, 3, 9, 3]))).toMatchObject({
      total: 24,
      peakDay: "2026-09-07",
      peakClicks: 9,
    });
  });

  it("draws nothing for a window too short or without impressions", () => {
    expect(describeClickTrend(days([1, 2, 3]))).toBeNull();
    expect(
      describeClickTrend(
        days([0, 0, 0, 0]).map((row) => ({ ...row, impressions: 0 })),
      ),
    ).toBeNull();
  });
});
