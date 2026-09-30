import { describe, expect, it } from "vitest";
import { describeCruxSeries, summarizeCruxSeries } from "./cruxHistoryView";

const series = (values: Array<number | null>) => ({
  metric: "lcp" as const,
  points: values.map((p75, index) => ({
    date: `2026-09-${String(index + 1).padStart(2, "0")}`,
    p75,
  })),
});

describe("summarizeCruxSeries", () => {
  it("compares the first and last weeks that have a value", () => {
    const summary = summarizeCruxSeries(series([null, 4200, 3000, null, 2400]));
    expect(summary).toMatchObject({
      first: 4200,
      latest: 2400,
      rating: "good",
      trend: "better",
      weeks: 3,
    });
  });

  it("calls a change under ten percent steady, and an empty series null", () => {
    expect(summarizeCruxSeries(series([2000, 2100]))?.trend).toBe("steady");
    expect(summarizeCruxSeries(series([1000, 1500]))?.trend).toBe("worse");
    expect(summarizeCruxSeries(series([null]))).toBeNull();
  });

  it("writes a plain Turkish sentence", () => {
    const summary = summarizeCruxSeries(series([4200, 2400]));
    expect(summary && describeCruxSeries(summary)).toBe(
      "LCP son 2 haftada 4,2 sn değerinden 2,4 sn değerine geldi, düşüyor, yani iyileşiyor; şu an iyi.",
    );
  });
});
