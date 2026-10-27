import { describe, expect, it } from "vitest";
import {
  compareMetrics,
  dailyPoints,
  hiddenQueries,
  periodPoints,
  resolveSearchWindow,
  rowsByDate,
  totalsFor,
  withSpan,
} from "@/server/features/gsc/searchPerformanceReport";

const day = (
  date: string,
  clicks: number,
  impressions: number,
  position = 5,
) => ({
  keys: [date],
  clicks,
  impressions,
  ctr: impressions > 0 ? clicks / impressions : 0,
  position,
});

describe("resolveSearchWindow", () => {
  const base = {
    range: "last_28_days" as const,
    today: "2026-10-26",
    floorDate: "2025-06-26",
    lastDataDate: "2026-10-25",
  };

  it("ends the window on the last complete day Google reports and keeps 28 days", () => {
    const window = resolveSearchWindow({
      ...base,
      firstIncompleteDate: "2026-10-24",
    });
    expect(window).toMatchObject({
      startDate: "2026-09-26",
      endDate: "2026-10-23",
      days: 28,
      freshEndDate: "2026-10-25",
      firstIncompleteDate: "2026-10-24",
      incompleteSource: "google",
      previous: { startDate: "2026-08-29", endDate: "2026-09-25" },
      // 364 days back: the same weekdays a year ago.
      yoy: { startDate: "2025-09-27", endDate: "2025-10-24" },
    });
  });

  it("assumes the conventional lag when Google sends no incomplete date", () => {
    const window = resolveSearchWindow({ ...base, firstIncompleteDate: null });
    expect(window.endDate).toBe("2026-10-23");
    expect(window.firstIncompleteDate).toBe("2026-10-24");
    expect(window.incompleteSource).toBe("assumed");
  });

  it("drops the year-ago comparison when it predates what Google serves", () => {
    const window = resolveSearchWindow({
      ...base,
      range: "last_3_months",
      floorDate: "2025-09-01",
      firstIncompleteDate: "2026-10-24",
    });
    expect(window.yoy).toBeNull();
  });

  it("recomputes the comparisons for a span handed back by a view", () => {
    const window = resolveSearchWindow({
      ...base,
      firstIncompleteDate: "2026-10-24",
    });
    const moved = withSpan(window, {
      startDate: "2026-10-17",
      endDate: "2026-10-23",
    });
    expect(moved.days).toBe(7);
    expect(moved.previous).toEqual({
      startDate: "2026-10-10",
      endDate: "2026-10-16",
    });
  });
});

describe("dailyPoints", () => {
  it("separates a finished day with no impressions from one Google is still counting", () => {
    const points = dailyPoints(
      rowsByDate([day("2026-10-01", 3, 30), day("2026-10-04", 1, 9)]),
      { startDate: "2026-10-01", endDate: "2026-10-05" },
      "2026-10-04",
    );
    expect(points.map((p) => p.state)).toEqual([
      "complete",
      "noImpressions",
      "noImpressions",
      "provisional",
      "pending",
    ]);
    // A day without impressions has no CTR or position, not zero.
    expect(points[1]).toMatchObject({ clicks: 0, ctr: null, position: null });
  });

  it("steps across a month boundary without skipping or repeating a day", () => {
    const points = dailyPoints(
      new Map(),
      { startDate: "2026-02-27", endDate: "2026-03-02" },
      null,
    );
    expect(points.map((p) => p.date)).toEqual([
      "2026-02-27",
      "2026-02-28",
      "2026-03-01",
      "2026-03-02",
    ]);
  });
});

describe("totalsFor", () => {
  it("recomputes CTR from the sums and weights position by impressions", () => {
    const totals = totalsFor(
      dailyPoints(
        rowsByDate([
          day("2026-10-01", 10, 100, 2),
          day("2026-10-02", 0, 300, 10),
        ]),
        { startDate: "2026-10-01", endDate: "2026-10-03" },
        null,
      ),
    );
    expect(totals.clicks).toBe(10);
    expect(totals.impressions).toBe(400);
    expect(totals.ctr).toBeCloseTo(0.025);
    expect(totals.position).toBeCloseTo((2 * 100 + 10 * 300) / 400);
  });
});

describe("compareMetrics", () => {
  it("reports position as places gained and CTR as a fraction difference", () => {
    const change = compareMetrics(
      { clicks: 120, impressions: 1000, ctr: 0.12, position: 4 },
      { clicks: 100, impressions: 1000, ctr: 0.1, position: 5.5 },
    );
    expect(change.clicks).toEqual({ change: 20, relative: 0.2 });
    expect(change.ctr.change).toBeCloseTo(0.02);
    expect(change.ctr.relative).toBeNull();
    // Moved up 1.5 places: positive is better.
    expect(change.position.change).toBeCloseTo(1.5);
  });

  it("leaves a change unknown when either side had no impressions", () => {
    const change = compareMetrics(
      { clicks: 0, impressions: 0, ctr: null, position: null },
      { clicks: 0, impressions: 0, ctr: null, position: null },
    );
    expect(change.clicks.relative).toBeNull();
    expect(change.position.change).toBeNull();
  });
});

describe("periodPoints", () => {
  it("marks a week the series does not cover end to end as partial", () => {
    const points = dailyPoints(
      new Map(),
      // Thursday to the next Sunday.
      { startDate: "2026-10-01", endDate: "2026-10-11" },
      "2026-10-11",
    );
    const weeks = periodPoints(points, "week");
    expect(
      weeks.map((w) => [w.startDate, w.days, w.partial, w.provisional]),
    ).toEqual([
      ["2026-09-28", 4, true, false],
      ["2026-10-05", 7, false, true],
    ]);
  });
});

describe("hiddenQueries", () => {
  it("is the share of the site total no query row accounts for", () => {
    // Google's own example: 450 itemized clicks under a 550-click total.
    const hidden = hiddenQueries(
      { clicks: 550, impressions: 10_000, ctr: 0.055, position: 8 },
      {
        rows: 40,
        truncated: false,
        clicks: 450,
        impressions: 8_000,
        aggregation: "byProperty",
      },
    );
    expect(hidden.clicks).toBe(100);
    expect(hidden.clickShare).toBeCloseTo(100 / 550);
    expect(hidden.exact).toBe(true);
  });

  it("is not exact when the query table was cut short", () => {
    const hidden = hiddenQueries(
      { clicks: 550, impressions: 10_000, ctr: 0.055, position: 8 },
      {
        rows: 50_000,
        truncated: true,
        clicks: 450,
        impressions: 8_000,
        aggregation: null,
      },
    );
    expect(hidden.exact).toBe(false);
  });
});
