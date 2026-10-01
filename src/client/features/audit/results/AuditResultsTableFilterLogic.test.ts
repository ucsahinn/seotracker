import { describe, expect, it } from "vitest";
import {
  EMPTY_PAGES_FILTERS,
  filterPages,
  scopeToUrls,
  type PageRow,
} from "./AuditResultsTableFilterLogic";

/**
 * A complete row, because `PageRow` is what `filterPages` takes.
 *
 * The type requires every column and an `as PageRow` on a partial is the
 * assertion the lint rule exists to catch.
 */
function page(overrides: Partial<PageRow>): PageRow {
  return {
    id: "page-1",
    url: "https://example.com/",
    statusCode: 200,
    redirectUrl: null,
    title: null,
    metaDescription: null,
    h1Count: 1,
    wordCount: 100,
    imagesTotal: 0,
    imagesMissingAlt: 0,
    internalLinkCount: 0,
    externalLinkCount: 0,
    isIndexable: true,
    crawlDepth: 1,
    inSitemap: true,
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

describe("scopeToUrls", () => {
  it("keeps only the listed pages; an empty list shows nothing, not everything", () => {
    const rows = [
      page({ url: "https://example.com/a" }),
      page({ url: "https://example.com/b" }),
    ];

    expect(scopeToUrls(rows, ["https://example.com/b"])).toHaveLength(1);
    expect(scopeToUrls(rows, [])).toHaveLength(0);
    expect(scopeToUrls(rows, undefined)).toHaveLength(2);
  });
});

describe("filterPages Turkish search", () => {
  it("matches dotted and dotless I the Turkish way", () => {
    const rows = [
      page({ id: "a", title: "Işık ve gölge" }),
      page({ id: "b", title: "İstanbul rehberi" }),
    ];
    const run = (query: string) =>
      filterPages(rows, { ...EMPTY_PAGES_FILTERS, query }).map((r) => r.id);
    expect(run("Işık")).toEqual(["a"]);
    expect(run("ışık")).toEqual(["a"]);
    expect(run("İstanbul")).toEqual(["b"]);
    expect(run("istanbul")).toEqual(["b"]);
  });
});
