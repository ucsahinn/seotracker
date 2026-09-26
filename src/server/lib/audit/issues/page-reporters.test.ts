import { describe, expect, it } from "vitest";

/** Everything except the deliberately blocked directory. */
const allowAll = (url: string) => !url.includes("/blocked/");
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
    viewport: "width=device-width, initial-scale=1",
    resources: [],
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
    const notInSitemap = { inSitemap: false };
    expect(issueTypes(makePage({ statusCode: 500, ...notInSitemap }))).toEqual([
      "server-error",
    ]);
    expect(issueTypes(makePage({ statusCode: 404, ...notInSitemap }))).toEqual([
      "broken-page",
    ]);
    expect(
      issueTypes(
        makePage({
          statusCode: 301,
          redirectUrl: "https://example.com/b",
          ...notInSitemap,
        }),
      ),
    ).toEqual([]);
  });

  /*
   * A bad status and a bad status *in the sitemap* are different findings:
   * the second says the site is telling Google to crawl something the site
   * already knows is wrong. A 3xx raised nothing at all before.
   */
  it("adds a sitemap finding when the failing URL was submitted to Google", () => {
    expect(issueTypes(makePage({ statusCode: 404, inSitemap: true }))).toEqual([
      "broken-page",
      "sitemap-broken-page",
    ]);
    expect(
      issueTypes(
        makePage({
          statusCode: 301,
          redirectUrl: "https://example.com/b",
          inSitemap: true,
        }),
      ),
    ).toEqual(["sitemap-redirect-page"]);
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

/*
 * The checks added from a pass over Google's own documentation. Each cites
 * the rule it enforces, because the failure mode for an SEO tool is
 * shipping folklore, and the registry copy is what an operator acts on.
 */
describe("checks traced to Google's documentation", () => {
  it("rejects hreflang region codes Google's own mistakes list names", () => {
    const invalid = (hreflang: string) =>
      issueTypes(
        makePage({
          url: "https://example.com/a",
          hreflangAlternates: [
            { hreflang, href: "https://example.com/b" },
            { hreflang: "tr", href: "https://example.com/a" },
          ],
        }),
      ).includes("hreflang-invalid-code");

    // "UK" is not an ISO 3166-1 code; Google names it explicitly.
    expect(invalid("en-UK")).toBe(true);
    /*
     * But two of the three names on that list are also ISO 639-1
     * *languages*: uk is Ukrainian, eu is Basque. Reading the last segment
     * of a bare code treated the language as a region and told a correct
     * Ukrainian site its markup was broken.
     */
    expect(invalid("uk")).toBe(false);
    expect(invalid("eu")).toBe(false);
    expect(invalid("uk-UA")).toBe(false);
    // Underscore is not the BCP-47 separator.
    expect(invalid("en_US")).toBe(true);
    expect(invalid("en-GB")).toBe(false);
    // x-default is legal and must survive.
    expect(invalid("x-default")).toBe(false);
    // Script subtags are legal BCP-47 and must not be rejected.
    expect(invalid("zh-Hant")).toBe(false);
  });

  it("wants the page in its own hreflang set, folded the same way", () => {
    const withSelf = issueTypes(
      makePage({
        url: "https://example.com/a",
        hreflangAlternates: [
          { hreflang: "tr", href: "https://example.com/a" },
          { hreflang: "en", href: "https://example.com/b" },
        ],
      }),
    );
    expect(withSelf).not.toContain("hreflang-missing-self");

    /*
     * The fold this test is named for. Both URLs above are byte-identical,
     * so it never exercised one: the page was crawled as `/a/` and its own
     * alternate written as `/a`, which `canonicalUrlKey` alone calls two
     * different pages.
     */
    const slashDiffers = issueTypes(
      makePage({
        url: "https://example.com/a/",
        hreflangAlternates: [
          { hreflang: "tr", href: "https://www.example.com/a" },
          { hreflang: "en", href: "https://example.com/b" },
        ],
      }),
    );
    expect(slashDiffers).not.toContain("hreflang-missing-self");

    const withoutSelf = issueTypes(
      makePage({
        url: "https://example.com/a",
        hreflangAlternates: [{ hreflang: "en", href: "https://example.com/b" }],
      }),
    );
    expect(withoutSelf).toContain("hreflang-missing-self");
  });

  it("flags nofollow only where Google would otherwise follow the links", () => {
    expect(
      issueTypes(makePage({ robotsMeta: "nofollow", isIndexable: true })),
    ).toContain("nofollow-page");
    // `none` is Google's documented shorthand for noindex, nofollow -- so it
    // is a noindex page, and saying the links are closed adds nothing.
    expect(
      issueTypes(makePage({ robotsMeta: "none", isIndexable: false })),
    ).not.toContain("nofollow-page");
    expect(
      issueTypes(makePage({ robotsMeta: "index, follow", isIndexable: true })),
    ).not.toContain("nofollow-page");
  });

  /*
   * Google: "Google Search won't render JavaScript from blocked files or on
   * blocked pages." A crawlable page whose own script is disallowed renders
   * for Google as whatever the HTML says before that script runs.
   */
  it("flags a script the site's own robots.txt blocks", () => {
    const page = makePage({
      url: "https://example.com/a",
      resources: [
        "https://example.com/app.js",
        "https://example.com/blocked/app.js",
      ],
    });

    expect(runPageReporters(page, allowAll).map((i) => i.issueType)).toContain(
      "blocked-resource",
    );
    expect(
      runPageReporters(page, () => true).map((i) => i.issueType),
    ).not.toContain("blocked-resource");
  });

  it("says nothing about resources when it was given no robots rules", () => {
    // Absent rules mean "not checked". Reporting every resource as blocked,
    // or silently deciding none are, would both be inventing an answer.
    const page = makePage({ resources: ["https://example.com/app.js"] });

    expect(issueTypes(page)).not.toContain("blocked-resource");
  });

  it("flags a paginated page canonicalised to page one", () => {
    expect(
      issueTypes(
        makePage({
          url: "https://example.com/blog?page=2",
          canonicalUrl: "https://example.com/blog",
        }),
      ),
    ).toContain("paginated-canonical-to-first-page");
    // A canonical to somewhere else entirely is the ordinary case and
    // already covered by `canonicalized-page`.
    expect(
      issueTypes(
        makePage({
          url: "https://example.com/blog?page=2",
          canonicalUrl: "https://example.com/other",
        }),
      ),
    ).not.toContain("paginated-canonical-to-first-page");

    /*
     * Page one is not the mistake. Canonicalising `?page=1` to the clean
     * URL is correct deduplication; Google's guidance is about pages two
     * and after, and the registry copy says so.
     */
    expect(
      issueTypes(
        makePage({
          url: "https://example.com/blog?page=1",
          canonicalUrl: "https://example.com/blog",
        }),
      ),
    ).not.toContain("paginated-canonical-to-first-page");

    /*
     * And the token has to come out of the query properly. Splicing
     * `[?&]page=\d+` out of the string took the separator with it, so
     * `?page=2&sort=asc` became `…blog&sort=asc` and a genuine violation
     * went unreported -- which of the two happened depended on where the
     * page param sorted among the others.
     */
    expect(
      issueTypes(
        makePage({
          url: "https://example.com/blog?page=2&sort=asc",
          canonicalUrl: "https://example.com/blog?sort=asc",
        }),
      ),
    ).toContain("paginated-canonical-to-first-page");
  });
});
