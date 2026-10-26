import { describe, expect, it } from "vitest";
import {
  findMissingBreadcrumbs,
  findMissingFeed,
  type BreadcrumbPage,
} from "./site-structure-checks";

const START = "https://example.com/";

describe("findMissingFeed", () => {
  const pages = [
    { id: "home", hasFeedLink: false },
    { id: "post", hasFeedLink: false },
  ];

  it("finds a blog that declares no feed", () => {
    const result = findMissingFeed({
      pages,
      articlePageIds: new Set(["post"]),
      startUrl: START,
    });
    expect(result.measured).toBe(true);
    expect(result.issues).toEqual([
      expect.objectContaining({ issueType: "missing-feed", pageId: null }),
    ]);
  });

  it("is silent when a page declares a feed, or the site has no articles", () => {
    expect(
      findMissingFeed({
        pages: [...pages, { id: "x", hasFeedLink: true }],
        articlePageIds: new Set(["post"]),
        startUrl: START,
      }).issues,
    ).toEqual([]);
    expect(
      findMissingFeed({ pages, articlePageIds: new Set(), startUrl: START })
        .issues,
    ).toEqual([]);
  });

  it("is unmeasured when no page was read for feed links", () => {
    expect(
      findMissingFeed({
        pages: [{ id: "post", hasFeedLink: null }],
        articlePageIds: new Set(["post"]),
        startUrl: START,
      }),
    ).toEqual({ issues: [], measured: false });
  });
});

const page = (overrides: Partial<BreadcrumbPage>): BreadcrumbPage => ({
  id: "p",
  url: "https://example.com/a/b/c",
  statusCode: 200,
  fetchClass: "ok",
  isIndexable: true,
  crawlDepth: 3,
  hasBreadcrumbs: false,
  ...overrides,
});

describe("findMissingBreadcrumbs", () => {
  it("finds a deep page without a trail", () => {
    expect(findMissingBreadcrumbs([page({})]).issues).toHaveLength(1);
  });

  it("is silent on shallow pages, pages with a trail, and noindexed pages", () => {
    expect(
      findMissingBreadcrumbs([
        page({ crawlDepth: 2 }),
        page({ hasBreadcrumbs: true }),
        page({ isIndexable: false }),
        page({ crawlDepth: null }),
      ]).issues,
    ).toEqual([]);
  });
});
