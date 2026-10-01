import { describe, expect, it } from "vitest";
import {
  applyQuickFilter,
  countQuickFilter,
  isFirstPage,
} from "./quickFilters";
import { countrySegments } from "./countryShare";
import { deviceSegments } from "./deviceShare";

const row = (
  position: number,
  impressions: number,
  clicks: number,
  ctr: number,
) => ({
  position,
  impressions,
  clicks,
  ctr,
});

describe("quick filters", () => {
  const rows = [
    row(4, 1000, 10, 0.01), // first page, low CTR
    row(7, 1000, 100, 0.1), // first page, healthy
    row(25, 500, 0, 0), // deep, no clicks
    row(3, 50, 0, 0), // first page, no clicks, too few impressions for CTR
  ];

  it("edge of the first page", () => {
    expect(isFirstPage(10)).toBe(true);
    expect(isFirstPage(10.6)).toBe(false);
    expect(isFirstPage(0)).toBe(false);
  });

  it("counts each chip over all rows", () => {
    expect(countQuickFilter(rows, "top10")).toBe(3);
    expect(countQuickFilter(rows, "noClicks")).toBe(2);
    expect(countQuickFilter(rows, "lowCtr")).toBe(1);
  });

  it("filters rows and leaves them alone with no chip", () => {
    expect(applyQuickFilter(rows, "lowCtr")).toEqual([rows[0]]);
    expect(applyQuickFilter(rows, "noClicks")).toEqual([rows[2], rows[3]]);
    expect(applyQuickFilter(rows, undefined)).toBe(rows);
  });

  it("does not call a row with no impressions 'never clicked'", () => {
    expect(countQuickFilter([row(5, 0, 0, 0)], "noClicks")).toBe(0);
  });
});

describe("band and click-tier filters", () => {
  it("cut on the rounded position, so 10.4 is still first page and 10.5 is not", () => {
    const at = (position: number) => row(position, 10, 1, 0.1);
    expect(applyQuickFilter([at(10.4)], "pos4to10")).toHaveLength(1);
    expect(applyQuickFilter([at(10.5)], "pos4to10")).toHaveLength(0);
    expect(applyQuickFilter([at(10.5)], "pos11to20")).toHaveLength(1);
    expect(applyQuickFilter([at(3.4)], "pos1to3")).toHaveLength(1);
    expect(applyQuickFilter([at(3.5)], "pos1to3")).toHaveLength(0);
    expect(applyQuickFilter([at(4.6)], "pos5to10")).toHaveLength(1);
    expect(applyQuickFilter([at(40)], "pos21plus")).toHaveLength(1);
  });

  it("never lets a row sit in two click tiers", () => {
    for (const clicks of [0, 1, 9, 10, 99, 100, 5000]) {
      const hits = (
        ["noClicks", "clicks1to9", "clicks10to99", "clicks100plus"] as const
      ).filter((id) => countQuickFilter([row(5, 10, clicks, 0)], id) === 1);
      expect(hits).toHaveLength(1);
    }
  });

  it("derives CTR for rows that do not carry one", () => {
    const striking = { position: 7, impressions: 500, clicks: 2 };
    expect(countQuickFilter([striking], "lowCtr")).toBe(1);
  });
});

describe("countrySegments", () => {
  it("keeps the top three and pools the rest", () => {
    const segments = countrySegments([
      { key: "tur", clicks: 50 },
      { key: "deu", clicks: 30 },
      { key: "gbr", clicks: 10 },
      { key: "usa", clicks: 6 },
      { key: "fra", clicks: 4 },
      { key: "esp", clicks: 0 },
    ]);
    expect(segments).toEqual([
      { key: "tur", clicks: 50 },
      { key: "deu", clicks: 30 },
      { key: "gbr", clicks: 10 },
      { key: null, clicks: 10 },
    ]);
  });

  it("has no remainder slice when there is nothing left over", () => {
    expect(countrySegments([{ key: "tur", clicks: 5 }])).toEqual([
      { key: "tur", clicks: 5 },
    ]);
  });
});

describe("deviceSegments", () => {
  it("ranks known devices by clicks and drops empty or unknown ones", () => {
    expect(
      deviceSegments([
        { key: "DESKTOP", clicks: 10 },
        { key: "MOBILE", clicks: 30 },
        { key: "TABLET", clicks: 0 },
        { key: "SMART_TV", clicks: 5 },
      ]),
    ).toEqual([
      { key: "MOBILE", label: "Mobil", value: 30 },
      { key: "DESKTOP", label: "Bilgisayar", value: 10 },
    ]);
  });
});
