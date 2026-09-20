import { describe, expect, it } from "vitest";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import type { CrawledPageResult, PageLink } from "@/server/lib/audit/types";

const HEALTHY_LINK: PageLink = {
  targetUrl: "https://example.com/catalog",
  anchor: "Catalog",
  isInternal: true,
  isNofollow: false,
};

function alts(...codes: string[]) {
  return codes.map((hreflang) => ({
    hreflang,
    href: `https://example.com/${hreflang}`,
  }));
}

function makePage(overrides: Partial<CrawledPageResult>): CrawledPageResult {
  return {
    id: "page-1",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    redirectUrl: null,
    title: "A perfectly reasonable page title",
    metaDescription:
      "A reasonable meta description that says something useful about the page.",
    canonicalUrl: null,
    robotsMeta: null,
    googlebotMeta: null,
    xRobotsTag: null,
    headerCanonicalUrl: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    h1Count: 1,
    h2Count: 0,
    h3Count: 0,
    h4Count: 0,
    h5Count: 0,
    h6Count: 0,
    headingOrder: [1, 2, 3],
    wordCount: 500,
    contentHash: "abc123",
    isHtml: true,
    htmlBytes: 10_000,
    rateLimited: false,
    imagesTotal: 0,
    imagesMissingAlt: 0,
    images: [],
    links: [HEALTHY_LINK],
    hasStructuredData: false,
    hreflangAlternates: [],
    isIndexable: true,
    responseTimeMs: 200,
    crawlDepth: 1,
    inSitemap: true,
    ...overrides,
  };
}

function issueTypes(page: CrawledPageResult): string[] {
  return runPageReporters(page).map((issue) => issue.issueType);
}

describe("runPageReporters", () => {
  it("reports nothing for a healthy page", () => {
    expect(issueTypes(makePage({}))).toEqual([]);
  });

  it("reports only blocked-page for a blocked fetch", () => {
    expect(
      issueTypes(makePage({ fetchClass: "blocked", statusCode: 403 })),
    ).toEqual(["blocked-page"]);
  });

  it("reports only rate-limited-page for a fetch the site kept 429ing", () => {
    expect(
      issueTypes(makePage({ fetchClass: "rate_limited", statusCode: 429 })),
    ).toEqual(["rate-limited-page"]);
  });

  it("reports nothing for a fetch error", () => {
    expect(
      issueTypes(makePage({ fetchClass: "error", statusCode: 0 })),
    ).toEqual([]);
  });

  it("classifies error statuses by range", () => {
    expect(issueTypes(makePage({ statusCode: 500 }))).toEqual(["server-error"]);
    expect(issueTypes(makePage({ statusCode: 404 }))).toEqual(["broken-page"]);
    expect(
      issueTypes(
        makePage({
          statusCode: 301,
          redirectUrl: "https://example.com/b",
        }),
      ),
    ).toEqual([]);
  });

  it("checks titles and meta descriptions", () => {
    expect(issueTypes(makePage({ title: "" }))).toContain("missing-title");
    expect(issueTypes(makePage({ title: "x".repeat(70) }))).toContain(
      "title-too-long",
    );
    expect(issueTypes(makePage({ title: "Tiny" }))).toContain(
      "title-too-short",
    );
    expect(issueTypes(makePage({ metaDescription: "" }))).toContain(
      "missing-meta-description",
    );
    expect(
      issueTypes(makePage({ metaDescription: "x".repeat(200) })),
    ).toContain("meta-description-too-long");
    expect(issueTypes(makePage({ metaDescription: "x".repeat(69) }))).toContain(
      "meta-description-too-short",
    );
    expect(
      issueTypes(makePage({ metaDescription: "x".repeat(70) })),
    ).not.toContain("meta-description-too-short");
    expect(
      runPageReporters(makePage({ metaDescription: "x".repeat(69) })).find(
        (issue) => issue.issueType === "meta-description-too-short",
      )?.details,
    ).toEqual({ length: 69 });
  });

  it("checks headings", () => {
    expect(issueTypes(makePage({ h1Count: 0 }))).toContain("missing-h1");
    expect(issueTypes(makePage({ h1Count: 3 }))).toContain("multiple-h1");
    expect(issueTypes(makePage({ headingOrder: [1, 2, 4] }))).toContain(
      "heading-order-skip",
    );
  });

  // The sitemap says index this and the page says do not. One of the two is
  // wrong, and neither the crawler nor Google can tell which.
  it("flags a sitemap entry that is noindexed", () => {
    expect(
      issueTypes(makePage({ inSitemap: true, isIndexable: false })),
    ).toContain("sitemap-noindex-page");
    expect(
      issueTypes(makePage({ inSitemap: false, isIndexable: false })),
    ).not.toContain("sitemap-noindex-page");
  });

  it("flags an hreflang set with no x-default, and only then", () => {
    expect(
      issueTypes(makePage({ hreflangAlternates: alts("en", "de") })),
    ).toContain("hreflang-missing-x-default");
    expect(
      issueTypes(makePage({ hreflangAlternates: alts("en", "X-Default") })),
    ).not.toContain("hreflang-missing-x-default");
    // A single-language site has no x-default to be missing.
    expect(issueTypes(makePage({ hreflangAlternates: [] }))).not.toContain(
      "hreflang-missing-x-default",
    );
  });

  it("skips content checks for non-HTML responses", () => {
    const nonHtml = makePage({
      isHtml: false,
      title: "",
      metaDescription: "",
      h1Count: 0,
      headingOrder: [],
      wordCount: 0,
      contentHash: null,
    });
    expect(issueTypes(nonHtml)).toEqual([]);
  });

  it("still checks empty-shell HTML pages", () => {
    const shell = makePage({
      isHtml: true,
      title: "",
      metaDescription: "",
      h1Count: 0,
      headingOrder: [],
      wordCount: 0,
      contentHash: null,
    });
    const types = issueTypes(shell);
    expect(types).toContain("missing-title");
    expect(types).toContain("missing-h1");
    expect(types).toContain("thin-content");
  });

  it("flags indexability and canonical signals", () => {
    expect(
      issueTypes(makePage({ isIndexable: false, robotsMeta: "noindex" })),
    ).toContain("noindex-page");

    const conflicted = issueTypes(
      makePage({
        canonicalUrl: "https://example.com/canonical-a",
        headerCanonicalUrl: "https://example.com/canonical-b",
      }),
    );
    expect(conflicted).toContain("canonical-conflict");
    expect(conflicted).toContain("canonicalized-page");

    expect(
      issueTypes(makePage({ canonicalUrl: "https://example.com/a" })),
    ).not.toContain("canonicalized-page");
  });

  it("flags an all-but-empty page, only when it is indexable", () => {
    expect(issueTypes(makePage({ wordCount: 12 }))).toContain("thin-content");
    expect(
      issueTypes(
        makePage({ wordCount: 12, isIndexable: false, robotsMeta: "noindex" }),
      ),
    ).not.toContain("thin-content");
  });

  // A short page is not a defect. The check exists to catch a page whose body
  // arrived empty, which on most templates means the content never rendered
  // server-side - and nav plus footer already clear the old 150-word bar.
  it("leaves a merely short page alone", () => {
    expect(issueTypes(makePage({ wordCount: 90 }))).not.toContain(
      "thin-content",
    );
  });

  it("flags slow responses and deep pages", () => {
    expect(issueTypes(makePage({ responseTimeMs: 3000 }))).toContain(
      "slow-response",
    );
    expect(issueTypes(makePage({ crawlDepth: 6 }))).toContain("deep-page");
    expect(issueTypes(makePage({ crawlDepth: null }))).not.toContain(
      "deep-page",
    );
  });

  it("flags indexable pages with no outgoing links", () => {
    expect(issueTypes(makePage({ links: [] }))).toContain("no-outgoing-links");
    expect(
      issueTypes(makePage({ links: [], isIndexable: false })),
    ).not.toContain("no-outgoing-links");
    expect(issueTypes(makePage({ links: [HEALTHY_LINK] }))).not.toContain(
      "no-outgoing-links",
    );
  });
});
