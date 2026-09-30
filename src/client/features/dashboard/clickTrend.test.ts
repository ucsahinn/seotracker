import { describe, expect, it } from "vitest";
import { describeClickTrend } from "./clickTrend";

const days = (clicks: number[]) =>
  clicks.map((count, index) => ({
    key: `2026-09-${String(index + 1).padStart(2, "0")}`,
    clicks: count,
    impressions: 10,
  }));

describe("describeClickTrend", () => {
  it("compares the later half with the earlier half and finds the peak", () => {
    const trend = describeClickTrend(days([1, 1, 2, 2, 3, 3, 9, 3]));
    expect(trend).toMatchObject({ total: 24, peakDay: "2026-09-07" });
    expect(trend?.change).toBeCloseTo((18 - 6) / 6);
  });

  it("has no change when the earlier half had no clicks", () => {
    expect(describeClickTrend(days([0, 0, 2, 2]))?.change).toBeNull();
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
