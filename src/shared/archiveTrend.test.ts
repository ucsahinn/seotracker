import { describe, expect, it } from "vitest";
import { addIsoDays } from "./dataFreshness";
import { archiveTrend } from "./archiveTrend";

const days = (from: string, count: number, clicks: number) =>
  Array.from({ length: count }, (_, i) => ({
    date: addIsoDays(from, i),
    clicks,
  }));

describe("archiveTrend", () => {
  it("compares the newest window with the one before it", () => {
    const trend = archiveTrend(
      [...days("2026-08-01", 7, 1), ...days("2026-08-08", 7, 2)],
      7,
    );
    expect(trend).toMatchObject({
      startDate: "2026-08-08",
      endDate: "2026-08-14",
      clicks: 14,
      previousClicks: 7,
    });
  });

  it("has no previous figure when the archive does not reach back far enough", () => {
    expect(
      archiveTrend(days("2026-08-08", 7, 2), 7)?.previousClicks,
    ).toBeNull();
    expect(archiveTrend([], 7)).toBeNull();
  });
});
