import { describe, expect, it } from "vitest";
import { parseCruxHistory, rateCrux } from "./cruxHistory";

const period = (day: number) => ({
  firstDate: { year: 2026, month: 8, day: 1 },
  lastDate: { year: 2026, month: 9, day },
});

describe("rateCrux", () => {
  it("uses the Web Vitals boundaries, inclusive at the good edge", () => {
    expect(rateCrux("lcp", 2500)).toBe("good");
    expect(rateCrux("lcp", 2501)).toBe("needs-improvement");
    expect(rateCrux("lcp", 4000)).toBe("needs-improvement");
    expect(rateCrux("lcp", 4001)).toBe("poor");
    expect(rateCrux("cls", 0.1)).toBe("good");
    expect(rateCrux("cls", 0.26)).toBe("poor");
    expect(rateCrux("inp", 200)).toBe("good");
    expect(rateCrux("inp", 500)).toBe("needs-improvement");
    expect(rateCrux("inp", 501)).toBe("poor");
  });
});

describe("parseCruxHistory", () => {
  it("reads p75 series by index, tolerating string CLS and missing periods", () => {
    const series = parseCruxHistory({
      record: {
        key: { origin: "https://example.com" },
        metrics: {
          largest_contentful_paint: {
            percentilesTimeseries: { p75s: [1200, null, 1500] },
          },
          cumulative_layout_shift: {
            percentilesTimeseries: { p75s: ["0.05", "NaN", "0.12"] },
          },
        },
        collectionPeriods: [period(6), period(13), period(20)],
      },
    });

    expect(series).toEqual([
      {
        metric: "lcp",
        points: [
          { date: "2026-09-06", p75: 1200 },
          { date: "2026-09-13", p75: null },
          { date: "2026-09-20", p75: 1500 },
        ],
      },
      {
        metric: "cls",
        points: [
          { date: "2026-09-06", p75: 0.05 },
          { date: "2026-09-13", p75: null },
          { date: "2026-09-20", p75: 0.12 },
        ],
      },
    ]);
  });

  it("drops a metric with no usable value and rejects other bodies", () => {
    const series = parseCruxHistory({
      record: {
        metrics: {
          interaction_to_next_paint: {
            percentilesTimeseries: { p75s: [null, null] },
          },
        },
        collectionPeriods: [period(6), period(13)],
      },
    });
    expect(series).toEqual([]);
    expect(parseCruxHistory({ error: { code: 404 } })).toBeNull();
  });
});
