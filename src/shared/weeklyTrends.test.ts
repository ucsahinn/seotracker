import { describe, expect, it } from "vitest";
import { weeklyTrends } from "./weeklyTrends";

describe("weeklyTrends", () => {
  it("aligns every query on the same weeks and leaves missing weeks as gaps", () => {
    const trends = weeklyTrends([
      { query: "a", weekStart: "2026-09-07", position: 5 },
      { query: "a", weekStart: "2026-09-14", position: 4 },
      { query: "b", weekStart: "2026-09-14", position: 9 },
    ]);
    expect(trends.get("a")).toEqual([5, 4]);
    expect(trends.get("b")).toEqual([null, 9]);
  });
});
