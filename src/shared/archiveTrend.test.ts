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
  it("keeps missing current observations as gaps and suppresses comparison", () => {
    const trend = archiveTrend(
      [
        ...days("2026-08-01", 7, 1),
        ...days("2026-08-08", 7, 2).filter((d) => d.date !== "2026-08-10"),
      ],
      7,
    );
    expect(trend).toMatchObject({
      clicks: 12,
      observedDays: 6,
      previousObservedDays: 7,
      previousClicks: null,
    });
    expect(trend?.daily[2]).toBeNull();
  });
  it("distinguishes measured zero from missing observations", () => {
    const trend = archiveTrend(days("2026-08-01", 14, 0), 7);
    expect(trend).toMatchObject({
      clicks: 0,
      previousClicks: 0,
      observedDays: 7,
      previousObservedDays: 7,
    });
    expect(trend?.daily).toEqual(Array(7).fill(0));
  });
  it("prints stale stored spans rather than relabelling them as today", () => {
    expect(archiveTrend([{ date: "2026-03-08", clicks: 1 }], 7)).toMatchObject({
      startDate: "2026-03-02",
      endDate: "2026-03-08",
      previousStartDate: "2026-02-23",
      previousEndDate: "2026-03-01",
      observedDays: 1,
    });
  });
});
