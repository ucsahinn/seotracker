import { describe, expect, it } from "vitest";
import type { TodoItem } from "./searchInsights";
import { combinedGain } from "./searchTodoCopy";

const striking = (query: string, gain: number): TodoItem => ({
  kind: "striking",
  id: `striking:${query}`,
  query,
  page: null,
  clicks: 0,
  impressions: 0,
  position: 8,
  estimatedClicks: gain,
  confidence: "high",
});

describe("combinedGain", () => {
  it("counts two ways of winning the same query's clicks once", () => {
    const snippet: TodoItem = {
      kind: "snippet",
      id: "snippet:a",
      query: "a",
      page: null,
      impressions: 0,
      ctr: 0,
      expectedCtr: 0,
      position: 8,
      estimatedClicks: 30,
      confidence: "high",
    };
    expect(combinedGain([striking("a", 100), snippet, striking("b", 5)])).toBe(
      105,
    );
  });

  it("is unknown when no item has an estimate", () => {
    expect(combinedGain([striking("a", 0)])).toBeNull();
  });
});
