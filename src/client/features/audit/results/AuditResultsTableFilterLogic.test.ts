import { describe, expect, it } from "vitest";
import {
  EMPTY_PAGES_FILTERS,
  filterPages,
  type PageRow,
} from "./AuditResultsTableFilterLogic";

/**
 * A complete row, because `PageRow` is what `filterPages` takes.
 *
 * Long for a fixture, but the type requires every column and an
 * `as PageRow` on a partial is the assertion the lint rule exists to catch:
 * it would let a renamed column slip past the test that guards it.
 */
function page(overrides: Partial<PageRow>): PageRow {
  return {
    id: "page-1",
    auditId: "audit-1",
    url: "https://example.com/",
    statusCode: 200,
    redirectUrl: null,
    title: null,
    metaDescription: null,
    canonicalUrl: null,
    robotsMeta: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    headingOrderJson: null,
    h1Count: 1,
    h2Count: 0,
    h3Count: 0,
    h4Count: 0,
    h5Count: 0,
    h6Count: 0,
    wordCount: 100,
    imagesTotal: 0,
    imagesMissingAlt: 0,
    imagesJson: null,
    internalLinkCount: 0,
    externalLinkCount: 0,
    hasStructuredData: false,
    hreflangTagsJson: null,
    isIndexable: true,
    xRobotsTag: null,
    headerCanonicalUrl: null,
    crawlDepth: 1,
    inSitemap: true,
    contentHash: null,
    fetchClass: "ok",
    responseTimeMs: 100,
    ...overrides,
  };
}

describe("indexability, sitemap and depth filters", () => {
  it("separates noindex pages from indexable ones", () => {
    const rows = [
      page({ url: "https://example.com/a", isIndexable: true }),
      page({ url: "https://example.com/b", isIndexable: false }),
    ];

    const noindex = filterPages(rows, {
      ...EMPTY_PAGES_FILTERS,
      indexable: "no",
    });
    expect(noindex.map((row) => row.url)).toEqual(["https://example.com/b"]);
  });

  it("finds the pages the sitemap forgot", () => {
    const rows = [
      page({ url: "https://example.com/a", inSitemap: true }),
      page({ url: "https://example.com/b", inSitemap: false }),
    ];

    const missing = filterPages(rows, {
      ...EMPTY_PAGES_FILTERS,
      inSitemap: "no",
    });
    expect(missing.map((row) => row.url)).toEqual(["https://example.com/b"]);
  });

  /*
   * Depth is the one nullable field of the three, and a null means nothing
   * ever linked to the page -- not depth zero. A page with no click path
   * has no depth to compare, so a bounded search must not return it as if
   * it sat at the shallow end.
   */
  it("bounds click depth and leaves unlinked pages out of the range", () => {
    const rows = [
      page({ url: "https://example.com/shallow", crawlDepth: 1 }),
      page({ url: "https://example.com/deep", crawlDepth: 6 }),
      page({ url: "https://example.com/orphan", crawlDepth: null }),
    ];

    const deep = filterPages(rows, { ...EMPTY_PAGES_FILTERS, minDepth: "4" });
    expect(deep.map((row) => row.url)).toEqual(["https://example.com/deep"]);
  });
});
