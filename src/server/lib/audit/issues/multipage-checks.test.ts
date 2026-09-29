/**
 * Cross-page checks: duplicates, redirect chains and loops, canonical
 * targets and hreflang return tags. Split from `page-reporters.test.ts`
 * because they test `multipage-checks.ts`, and because the two halves
 * together outgrew the file-length limit.
 */
import { describe, expect, it } from "vitest";
import {
  findCanonicalTargetProblems,
  findDuplicates,
  findHreflangReturnTagProblems,
  findMissingStructuredData,
  findRedirectChainsAndLoops,
  type SlimPage,
} from "@/server/lib/audit/issues/multipage-checks";

const alternate = (href: string, hreflang = "de") => ({ hreflang, href });

function makeSlimPage(overrides: Partial<SlimPage>): SlimPage {
  return {
    id: overrides.url ?? "page",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    title: null,
    metaDescription: null,
    contentHash: null,
    redirectUrl: null,
    wordCount: 100,
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

describe("findDuplicates", () => {
  it("flags duplicate titles across pages and includes the other URLs", () => {
    const issues = findDuplicates([
      makeSlimPage({ url: "https://example.com/a", title: "Same" }),
      makeSlimPage({ url: "https://example.com/b", title: "Same" }),
      makeSlimPage({ url: "https://example.com/c", title: "Different" }),
    ]);
    const duplicateTitles = issues.filter(
      (issue) => issue.issueType === "duplicate-title",
    );
    expect(duplicateTitles).toHaveLength(2);
    expect(duplicateTitles[0].details?.otherUrls).toEqual([
      "https://example.com/b",
    ]);
  });

  it("excludes noindexed and canonicalized pages from duplicate groups", () => {
    const issues = findDuplicates([
      makeSlimPage({ url: "https://example.com/a", title: "Same" }),
      makeSlimPage({
        url: "https://example.com/b",
        title: "Same",
        canonicalUrl: "https://example.com/a",
      }),
      makeSlimPage({
        url: "https://example.com/c",
        title: "Same",
        isIndexable: false,
      }),
    ]);
    expect(issues).toHaveLength(0);
  });

  it("ignores non-2xx and blocked pages", () => {
    const issues = findDuplicates([
      makeSlimPage({ url: "https://example.com/a", title: "Same" }),
      makeSlimPage({
        url: "https://example.com/b",
        title: "Same",
        fetchClass: "blocked",
        statusCode: 403,
      }),
    ]);
    expect(issues).toHaveLength(0);
  });

  it("groups duplicate content by hash only when there is text", () => {
    const issues = findDuplicates([
      makeSlimPage({ url: "https://example.com/a", contentHash: "h1" }),
      makeSlimPage({ url: "https://example.com/b", contentHash: "h1" }),
      makeSlimPage({
        url: "https://example.com/empty-1",
        contentHash: "h2",
        wordCount: 0,
      }),
      makeSlimPage({
        url: "https://example.com/empty-2",
        contentHash: "h2",
        wordCount: 0,
      }),
    ]);
    expect(
      issues.filter((issue) => issue.issueType === "duplicate-content"),
    ).toHaveLength(2);
  });
});

describe("findRedirectChainsAndLoops", () => {
  const redirect = (url: string, target: string) =>
    makeSlimPage({ url, statusCode: 301, redirectUrl: target });

  it("ignores single redirects", () => {
    expect(
      findRedirectChainsAndLoops([
        redirect("https://example.com/a", "https://example.com/b"),
        makeSlimPage({ url: "https://example.com/b" }),
      ]),
    ).toHaveLength(0);
  });

  it("flags a chain once, on its head", () => {
    const issues = findRedirectChainsAndLoops([
      redirect("https://example.com/a", "https://example.com/b"),
      redirect("https://example.com/b", "https://example.com/c"),
      makeSlimPage({ url: "https://example.com/c" }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].issueType).toBe("redirect-chain");
    expect(issues[0].pageUrl).toBe("https://example.com/a");
    expect(issues[0].details?.hops).toEqual([
      "https://example.com/a",
      "https://example.com/b",
      "https://example.com/c",
    ]);
  });

  it("flags loops", () => {
    const issues = findRedirectChainsAndLoops([
      redirect("https://example.com/a", "https://example.com/b"),
      redirect("https://example.com/b", "https://example.com/a"),
    ]);
    expect(
      issues.filter((issue) => issue.issueType === "redirect-loop").length,
    ).toBeGreaterThan(0);
  });

  it("flags self-loops", () => {
    const issues = findRedirectChainsAndLoops([
      redirect("https://example.com/a", "https://example.com/a"),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].issueType).toBe("redirect-loop");
  });
});
describe("findCanonicalTargetProblems", () => {
  const source = {
    url: "https://example.com/a",
    canonicalUrl: "https://example.com/b",
  };

  it("flags a canonical that points at a redirect", () => {
    const issues = findCanonicalTargetProblems([
      makeSlimPage(source),
      makeSlimPage({
        url: "https://example.com/b",
        statusCode: 301,
        redirectUrl: "https://example.com/c",
      }),
    ]);

    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({
      issueType: "canonical-to-redirect",
      pageUrl: "https://example.com/a",
      details: { redirectsTo: "https://example.com/c" },
    });
  });

  it("flags a canonical that points at a page the crawl could not fetch", () => {
    const issues = findCanonicalTargetProblems([
      makeSlimPage(source),
      makeSlimPage({ url: "https://example.com/b", statusCode: 404 }),
    ]);

    expect(issues.map((issue) => issue.issueType)).toEqual([
      "canonical-to-broken",
    ]);
  });

  it("flags a canonical that points at a noindexed page", () => {
    const issues = findCanonicalTargetProblems([
      makeSlimPage(source),
      makeSlimPage({
        url: "https://example.com/b",
        isIndexable: false,
        robotsMeta: "noindex",
      }),
    ]);

    expect(issues.map((issue) => issue.issueType)).toEqual([
      "canonical-to-noindex",
    ]);
  });

  /*
   * `emptyPageResult` stores every non-HTML 200 with `isIndexable: false`,
   * so reading that field alone turned a canonical pointing at a PDF into a
   * critical claim that the target was noindexed. The directive has to be
   * there in writing.
   */
  it("says nothing when the target is merely not HTML", () => {
    expect(
      findCanonicalTargetProblems([
        makeSlimPage(source),
        makeSlimPage({ url: "https://example.com/b", isIndexable: false }),
      ]),
    ).toEqual([]);
  });

  // blocked and rate_limited describe the crawler's trip, not the site.
  it("says nothing when the crawl could not judge the target", () => {
    expect(
      findCanonicalTargetProblems([
        makeSlimPage(source),
        makeSlimPage({
          url: "https://example.com/b",
          statusCode: 403,
          fetchClass: "blocked",
        }),
      ]),
    ).toEqual([]);
  });

  // A canonical to another site, or to a URL outside the crawl's scope, is
  // not evidence of anything. Guessing would make every cross-domain
  // canonical look broken.
  it("says nothing about a target the crawl never visited", () => {
    expect(findCanonicalTargetProblems([makeSlimPage(source)])).toEqual([]);
  });

  it("says nothing when the target is a healthy page", () => {
    expect(
      findCanonicalTargetProblems([
        makeSlimPage(source),
        makeSlimPage({ url: "https://example.com/b" }),
      ]),
    ).toEqual([]);
  });
});

describe("findHreflangReturnTagProblems", () => {
  // The defect exists only in the relationship: read either page on its own
  // and the tags are valid.
  it("flags an alternate that does not name the page back", () => {
    const issues = findHreflangReturnTagProblems([
      makeSlimPage({
        url: "https://example.com/a",
        hreflangAlternates: [alternate("https://example.com/b")],
      }),
      makeSlimPage({
        url: "https://example.com/b",
        hreflangAlternates: [alternate("https://example.com/b")],
      }),
    ]);

    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({
      issueType: "hreflang-no-return-tag",
      pageUrl: "https://example.com/a",
      dedupeKey: "https://example.com/b",
      details: { alternateUrl: "https://example.com/b", hreflang: "de" },
    });
  });

  it("says nothing when both pages name each other", () => {
    expect(
      findHreflangReturnTagProblems([
        makeSlimPage({
          url: "https://example.com/a",
          hreflangAlternates: [alternate("https://example.com/b")],
        }),
        makeSlimPage({
          url: "https://example.com/b",
          hreflangAlternates: [alternate("https://example.com/a", "en")],
        }),
      ]),
    ).toEqual([]);
  });

  // A country-domain setup points at another host, which this crawl never
  // sees. Reporting that as missing would flag every correct setup.
  it("says nothing about an alternate the crawl never visited", () => {
    expect(
      findHreflangReturnTagProblems([
        makeSlimPage({
          url: "https://example.com/a",
          hreflangAlternates: [alternate("https://example.de/a")],
        }),
      ]),
    ).toEqual([]);
  });

  it("reports each unreciprocated alternate separately", () => {
    const issues = findHreflangReturnTagProblems([
      makeSlimPage({
        url: "https://example.com/a",
        hreflangAlternates: [
          alternate("https://example.com/a", "en"),
          alternate("https://example.com/b", "de"),
          alternate("https://example.com/c", "fr"),
        ],
      }),
      makeSlimPage({ url: "https://example.com/b" }),
      makeSlimPage({ url: "https://example.com/c" }),
    ]);

    expect(issues.map((issue) => issue.dedupeKey)).toEqual([
      "https://example.com/b",
      "https://example.com/c",
    ]);
  });
});

const START = "https://example.com/";

describe("findMissingStructuredData", () => {
  const site = (count: number, overrides: Partial<SlimPage> = {}) =>
    Array.from({ length: count }, (_, index) =>
      makeSlimPage({ url: `https://example.com/${index}`, ...overrides }),
    );

  it("raises one finding when no page on the site has any", () => {
    const issues = findMissingStructuredData(site(6), START);

    expect(issues).toHaveLength(1);
    expect(issues[0].issueType).toBe("structured-data-missing-site");
    // Site-level shape: a statement about the crawl, not about a page.
    expect(issues[0].pageId).toBeNull();
    expect(issues[0].pageUrl).toBe(START);
  });

  it("says nothing when even one page has it", () => {
    const pages = site(6);
    pages[3].hasStructuredData = true;

    expect(findMissingStructuredData(pages, START)).toEqual([]);
  });

  /*
   * On a tiny crawl the absence says more about how far the crawler got
   * than about how the site is built.
   */
  it("stays quiet on a crawl too small to generalise from", () => {
    expect(findMissingStructuredData(site(4), START)).toEqual([]);
  });

  it("ignores pages that are not crawled HTML", () => {
    expect(
      findMissingStructuredData(site(6, { fetchClass: "blocked" }), START),
    ).toEqual([]);
  });
});

describe("canonical-to-noindex and the googlebot directive", () => {
  const target = (overrides: Partial<SlimPage>) =>
    makeSlimPage({
      url: "https://example.com/target",
      isIndexable: false,
      ...overrides,
    });

  const source = makeSlimPage({
    url: "https://example.com/source",
    canonicalUrl: "https://example.com/target",
  });

  /*
   * `<meta name="googlebot">` is the directive Google gives precedence to,
   * and it was parsed and then dropped before the write — so a page
   * noindexed only that way was invisible to this check.
   */
  it("reports a canonical pointing at a page noindexed only for Google", () => {
    const issues = findCanonicalTargetProblems([
      source,
      target({ googlebotMeta: "noindex" }),
    ]);

    expect(issues.map((i) => i.issueType)).toContain("canonical-to-noindex");
  });

  /*
   * `isIndexable` is also false for every non-HTML 200, so without a
   * directive in writing this would report a canonical pointing at a PDF
   * as pointing at a noindexed page.
   */
  it("stays quiet when no directive says so in writing", () => {
    const issues = findCanonicalTargetProblems([source, target({})]);

    expect(issues.map((i) => i.issueType)).not.toContain(
      "canonical-to-noindex",
    );
  });
});
