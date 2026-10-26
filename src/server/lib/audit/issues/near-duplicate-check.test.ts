import { describe, expect, it } from "vitest";
import {
  analyticsWasCompared,
  findAnalyticsTagProblems,
} from "@/server/lib/audit/issues/analytics-tag-check";
import type { SlimPage } from "@/server/lib/audit/issues/multipage-checks";
import { findNearDuplicates } from "@/server/lib/audit/issues/near-duplicate-check";

function slim(overrides: Partial<SlimPage>): SlimPage {
  return {
    id: overrides.url ?? "page",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    title: null,
    firstH1: null,
    metaDescription: null,
    contentHash: null,
    contentSimhash: null,
    redirectUrl: null,
    wordCount: 300,
    isIndexable: true,
    hasStructuredData: false,
    ogTitle: null,
    ogImage: null,
    canonicalUrl: null,
    headerCanonicalUrl: null,
    robotsMeta: null,
    googlebotMeta: null,
    xRobotsTag: null,
    hreflangAlternates: [],
    ...overrides,
  };
}

const page = (path: string, contentSimhash: string, more = {}) =>
  slim({ url: `https://example.com/${path}`, contentSimhash, ...more });

describe("findNearDuplicates", () => {
  it("groups pages within three bits of the group's first page", () => {
    const issues = findNearDuplicates([
      page("a", "0000000000000000"),
      page("b", "0000000000000007"), // three bits from a
      page("c", "000000000000000f"), // four from a, one from b: not chained in
      page("d", "ffffffffffffffff"),
    ]);
    expect(issues.map((issue) => issue.pageUrl)).toEqual([
      "https://example.com/a",
      "https://example.com/b",
    ]);
    expect(issues[0].details).toEqual({
      groupSize: 2,
      otherUrls: ["https://example.com/b"],
    });
  });

  it("does not report an exact copy of a group member as a near duplicate", () => {
    const issues = findNearDuplicates([
      page("a", "0000000000000000", { contentHash: "x" }),
      page("a-copy", "0000000000000000", { contentHash: "x" }),
      page("b", "0000000000000001", { contentHash: "y" }),
    ]);
    expect(issues.map((issue) => issue.pageUrl)).toEqual([
      "https://example.com/a",
      "https://example.com/b",
    ]);
  });

  it("leaves exact duplicates to duplicate-content", () => {
    expect(
      findNearDuplicates([
        page("a", "0000000000000000", { contentHash: "same" }),
        page("b", "0000000000000001", { contentHash: "same" }),
      ]),
    ).toEqual([]);
  });

  it("skips unfingerprinted, noindexed and canonicalized pages", () => {
    expect(
      findNearDuplicates([
        page("a", "0000000000000000"),
        // Too little main content to fingerprint.
        slim({ url: "https://example.com/b", contentSimhash: null }),
        page("c", "0000000000000000", { isIndexable: false }),
        page("d", "0000000000000000", {
          canonicalUrl: "https://example.com/a",
        }),
      ]),
    ).toEqual([]);
  });
});

describe("findAnalyticsTagProblems", () => {
  const pages = [slim({ id: "p1" }), slim({ id: "p2" })];
  const run = (
    tags: Record<string, string[]>,
    propertyMeasurementIds: string[] | null,
  ) =>
    findAnalyticsTagProblems({
      pages,
      tagIdsByPage: new Map(Object.entries(tags)),
      startUrl: "https://example.com/",
      propertyMeasurementIds,
    }).map((issue) => issue.issueType);

  it("reports a site with no tag on any page", () => {
    expect(run({}, null)).toEqual(["analytics-tag-missing"]);
  });

  it("reports a GA4 id that is not the connected property's", () => {
    expect(run({ p1: ["G-AAAA1111"] }, ["G-BBBB2222"])).toEqual([
      "analytics-id-mismatch",
    ]);
    expect(run({ p1: ["G-BBBB2222"] }, ["G-BBBB2222"])).toEqual([]);
  });

  it("does not judge what it cannot compare", () => {
    // No property connected, or only a Tag Manager container on the pages.
    expect(run({ p1: ["G-AAAA1111"] }, null)).toEqual([]);
    expect(run({ p1: ["GTM-AB12CD"] }, ["G-BBBB2222"])).toEqual([]);
    // And records that it did not, so the check reads "not measured".
    const compared = (tags: Record<string, string[]>, ids: string[] | null) =>
      analyticsWasCompared({
        pages,
        tagIdsByPage: new Map(Object.entries(tags)),
        propertyMeasurementIds: ids,
      });
    expect(compared({ p1: ["G-AAAA1111"] }, null)).toBe(false);
    expect(compared({ p1: ["GTM-AB12CD"] }, ["G-BBBB2222"])).toBe(false);
    expect(compared({ p1: ["G-AAAA1111"] }, ["G-BBBB2222"])).toBe(true);
  });
});
