import type { CrawledPageResult, PageLink } from "@/server/lib/audit/types";

/**
 * A crawled page with nothing wrong with it.
 *
 * Shared because two suites now report off the same shape, and a second
 * copy would drift: a field added to `CrawledPageResult` has to reach both
 * or one suite silently stops covering it.
 */
export const HEALTHY_LINK: PageLink = {
  targetUrl: "https://example.com/catalog",
  anchor: "Catalog",
  isInternal: true,
  isNofollow: false,
};

export function makeCrawledPage(
  overrides: Partial<CrawledPageResult>,
): CrawledPageResult {
  return {
    id: "page-1",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    redirectUrl: null,
    title: "A perfectly reasonable page title",
    metaDescription:
      "A reasonable meta description that says something useful about the page.",
    // Self-canonical, as a healthy page has: the tag is what `missing-canonical` looks for.
    canonicalCount: 1,
    canonicalUrl: "https://example.com/a",
    robotsMeta: null,
    googlebotMeta: null,
    htmlLang: "en",
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
    viewport: "width=device-width, initial-scale=1",
    resources: [],
    insecureResources: [],
    hreflangAlternates: [],
    isIndexable: true,
    responseTimeMs: 200,
    crawlDepth: 1,
    inSitemap: true,
    ...overrides,
  };
}
