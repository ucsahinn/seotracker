import { describe, expect, it } from "vitest";
import {
  clickTierBuckets,
  hasEnoughGroups,
  positionBuckets,
  strikingBuckets,
  topShareOfClicks,
  worstCannibalized,
} from "./tabBuckets";

const row = (position: number, clicks = 1, impressions = 10) => ({
  position,
  clicks,
  impressions,
});

const make = (query: string, impressions: number, splitShare: number) => ({
  query,
  impressions,
  splitShare,
  competitors: [],
});

describe("tab buckets", () => {
  it("puts every query in exactly one position band", () => {
    const rows = [row(1), row(3.4), row(4), row(10.4), row(11), row(35)];
    const buckets = positionBuckets(rows);
    expect(buckets.map((bucket) => bucket.count)).toEqual([2, 2, 1, 1]);
  });

  it("weighs the 5-20 halves by impressions, not rows", () => {
    const buckets = strikingBuckets([
      row(6, 0, 900),
      row(12, 0, 50),
      row(15, 0, 50),
    ]);
    expect(buckets.map((bucket) => [bucket.count, bucket.size])).toEqual([
      [1, 900],
      [2, 100],
    ]);
  });

  it("splits pages into click tiers without overlap", () => {
    const buckets = clickTierBuckets([
      row(5, 0),
      row(5, 4),
      row(5, 10),
      row(5, 250),
    ]);
    expect(buckets.map((bucket) => bucket.count)).toEqual([1, 1, 1, 1]);
  });

  it("asks for two non-empty groups before a chart is worth drawing", () => {
    expect(hasEnoughGroups(positionBuckets([row(1), row(2)]))).toBe(false);
    expect(hasEnoughGroups(positionBuckets([row(1), row(30)]))).toBe(true);
  });

  it("reports a click concentration only when it says something", () => {
    const pages = [100, 50, 25, 15, 10, 5, 5, 0].map((clicks) => ({ clicks }));
    expect(topShareOfClicks(pages, 5)).toBeCloseTo(200 / 210);
    expect(topShareOfClicks(pages.slice(0, 5), 5)).toBeNull();
    expect(topShareOfClicks([{ clicks: 0 }], 5)).toBeNull();
  });

  it("names the query losing the most impressions to non-primary pages", () => {
    const worst = worstCannibalized([
      make("a", 1000, 0.1),
      make("b", 400, 0.5),
    ]);
    expect(worst?.query).toBe("b");
  });
});
