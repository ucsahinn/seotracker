import { describe, expect, it } from "vitest";
import {
  applyBandAndChip,
  bandOf,
  countBands,
  countChips,
  matchesChip,
} from "./positionBands";

const row = (position: number, impressions = 10, clicks = 1) => ({
  position,
  impressions,
  clicks,
});

describe("bandOf", () => {
  it.each([
    [1, "top3"],
    [3, "top3"],
    [3.4, "top3"],
    [3.5, "top10"],
    [4, "top10"],
    [10, "top10"],
    [10.4, "top10"],
    [11, "top20"],
    [20, "top20"],
    [21, "beyond"],
    [87, "beyond"],
  ] as const)("puts position %s in %s", (position, band) => {
    expect(bandOf(position)).toBe(band);
  });
});

describe("band and chip filters", () => {
  const rows = [
    row(2, 500, 40),
    row(8, 150, 0),
    row(15, 20, 0),
    row(40, 300, 2),
  ];

  it("counts every row into exactly one band", () => {
    expect(countBands(rows)).toEqual({
      top3: 1,
      top10: 1,
      top20: 1,
      beyond: 1,
    });
  });

  it("first-page chip agrees with the 1-3 and 4-10 bands", () => {
    expect(rows.filter((r) => matchesChip("firstPage", r))).toHaveLength(2);
    expect(matchesChip("firstPage", row(10))).toBe(true);
    expect(matchesChip("firstPage", row(11))).toBe(false);
  });

  it("counts chips", () => {
    expect(countChips(rows)).toEqual({
      firstPage: 2,
      highImpressions: 3,
      noClicks: 2,
    });
  });

  it("combines a band with a chip", () => {
    expect(applyBandAndChip(rows, "top10", "noClicks")).toEqual([
      row(8, 150, 0),
    ]);
    expect(applyBandAndChip(rows, "beyond", "firstPage")).toEqual([]);
    expect(applyBandAndChip(rows, undefined, undefined)).toHaveLength(4);
  });
});
