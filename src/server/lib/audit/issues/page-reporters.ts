/**
 * Per-page issue reporters.
 *
 * Each reporter is a pure function over a single crawled page record —
 * DOM-free by design (HTML parsing runs once in crawlPage), so the engine works
 * over any crawl source that can produce a CrawledPageResult.
 *
 * Cross-page checks (duplicates, broken links, orphans, redirect chains)
 * live in multipage.ts and run over D1 after the crawl.
 */
import type { AuditIssueType } from "@/shared/audit-issues";
import { sameCanonicalTarget } from "@/server/lib/audit/url-utils";
import type { CrawledPageResult } from "@/server/lib/audit/types";

export interface DetectedIssue {
  issueType: AuditIssueType;
  pageId: string | null;
  pageUrl: string;
  details?: Record<string, unknown>;
  /**
   * Distinguishes multiple issues of the same type on the same page
   * (e.g. one broken-internal-link issue per target). Part of the
   * deterministic row id, so step retries don't duplicate issues.
   */
  dedupeKey?: string;
}

const TITLE_MAX_CHARS = 60;
const TITLE_MIN_CHARS = 10;
const META_DESCRIPTION_MAX_CHARS = 160;
const META_DESCRIPTION_MIN_CHARS = 70;
/* 150 was an SEO-tool convention with no Google basis, and `wordCount` counts
   every text node in the body: nav, sidebar, cookie banner, footer. On most
   templates that chrome alone clears 150, so the check never fired on the
   genuinely empty pages it exists to catch, and fired on short minimal ones
   instead. 50 is low enough that only a page with essentially no body text
   trips it - which is the thing this number can actually prove. */
const THIN_CONTENT_WORDS = 50;
/* Matches Lighthouse's own server-response-time audit, which this tool also
   shows. At 1500 a page could pass here and fail there in the same report. */
const SLOW_RESPONSE_MS = 600;
const DEEP_PAGE_DEPTH = 5;

function hasHeadingLevelSkip(headingOrder: number[]): boolean {
  for (let i = 1; i < headingOrder.length; i++) {
    if (headingOrder[i] > headingOrder[i - 1] + 1) return true;
  }
  return false;
}

/**
 * A sitemap entry that does not answer 200.
 *
 * Distinct from the bad status itself: the sitemap is how a site tells
 * Google which pages to crawl, so a dead or redirecting entry sends Google
 * somewhere the site already knows is wrong. `broken-page` fires either way
 * and says nothing about the sitemap, and nothing at all fired for a 3xx.
 */
/*
 * BCP-47 shape, plus the three region codes Google's own "common mistakes"
 * list names. A full ISO 3166-1 table is deliberately not shipped: it is
 * 250 entries with its own maintenance burden, and every wrong-code example
 * Google actually gives is either a bad separator or one of these three.
 * Under-reporting here is the right failure -- a false "invalid" on a legal
 * code would send someone to break working markup.
 */
const HREFLANG_SHAPE = /^[a-z]{2,3}(-[a-z]{4})?(-([a-z]{2}|\d{3}))?$/;
const NOT_ISO_REGIONS = new Set(["uk", "eu", "un"]);

function isValidHreflang(value: string): boolean {
  const code = value.trim().toLowerCase();
  if (code === "x-default") return true;
  if (!HREFLANG_SHAPE.test(code)) return false;
  /*
   * Only when a region subtag actually exists. Taking the last segment of a
   * bare language code reads the language as a region, and two of the three
   * names on the list are also ISO 639-1 languages: `uk` is Ukrainian and
   * `eu` is Basque. So a correct Ukrainian site was told its markup was
   * broken and pointed at advice to change it -- the exact false positive
   * the comment above says must not happen.
   */
  const parts = code.split("-");
  if (parts.length < 2) return true;
  return !NOT_ISO_REGIONS.has(parts[parts.length - 1] ?? "");
}

/**
 * The same URL with its page number removed, or null when there is none
 * worth removing.
 *
 * Null for page one: canonicalising `?page=1` or `?start=0` to the clean
 * URL is correct deduplication, not the mistake Google names. Its guidance
 * is about pages two and after, and the registry copy says so.
 *
 * Parsed rather than spliced. Cutting `[?&]page=\d+` out of the string
 * leaves `?a=1&page=2&b=3` as `…?a=1&b=3` but `?page=2&b=3` as `…b=3` --
 * the separator goes with the match -- so whether a real violation was
 * caught depended on where the page param sorted among the others.
 */
function withoutPageToken(url: string): string | null {
  const pathMatch = /\/page\/(\d+)\/?$/i.exec(url);
  if (pathMatch) {
    if (pathMatch[1] === "1") return null;
    return url.replace(/\/page\/\d+\/?$/i, "");
  }
  try {
    const parsed = new URL(url);
    for (const key of ["page", "p", "start"]) {
      const value = parsed.searchParams.get(key);
      if (value === null || !/^\d+$/.test(value)) continue;
      // `start=0` is the first page the same way `page=1` is.
      if (value === "1" || (key === "start" && value === "0")) return null;
      parsed.searchParams.delete(key);
      return parsed.toString().replace(/\?$/, "");
    }
  } catch {
    return null;
  }
  return null;
}

/** The callback each extracted reporter pushes through. */
type ReportIssue = (
  issueType: AuditIssueType,
  details?: Record<string, unknown>,
) => void;

/**
 * Robots directives and canonical signals, which are one subject: together
 * they are everything the page says about whether and where it should be
 * indexed.
 */
function reportIndexability(page: CrawledPageResult, report: ReportIssue) {
  /* Google on `nofollow`: "Do not follow the links on this page. If you
     don't specify this rule, Google may use the links on the page to
     discover those linked pages." Tokenised the same way `isIndexable` is,
     because `includes("nofollow")` would also match a future directive that
     merely contains the word -- and because `none` means noindex+nofollow.
     Only worth saying on a page Google will actually index. */
  const directives = new Set(
    [page.robotsMeta, page.googlebotMeta, page.xRobotsTag]
      .filter(Boolean)
      .join(",")
      .toLowerCase()
      .split(/[,\s]+/)
      .filter(Boolean),
  );
  if (
    page.isIndexable &&
    (directives.has("nofollow") || directives.has("none"))
  ) {
    report("nofollow-page", {
      robotsMeta: page.robotsMeta,
      googlebotMeta: page.googlebotMeta,
      xRobotsTag: page.xRobotsTag,
    });
  }

  // Indexability + canonical signals
  if (!page.isIndexable) {
    report("noindex-page", {
      robotsMeta: page.robotsMeta,
      xRobotsTag: page.xRobotsTag,
    });
  }
  if (
    page.canonicalUrl &&
    page.headerCanonicalUrl &&
    page.canonicalUrl !== page.headerCanonicalUrl
  ) {
    report("canonical-conflict", {
      htmlCanonical: page.canonicalUrl,
      headerCanonical: page.headerCanonicalUrl,
    });
  }
  const effectiveCanonical = page.canonicalUrl ?? page.headerCanonicalUrl;
  if (effectiveCanonical && effectiveCanonical !== page.url) {
    report("canonicalized-page", { canonicalUrl: effectiveCanonical });
  }
  /* Two canonical suggestions for one page: Google treats a sitemap entry as
     a suggestion that the listed URL is the canonical, and this page names a
     different one. Google's own list of canonicalization mistakes has this
     on it. Often deliberate, hence info. */
  if (page.inSitemap && effectiveCanonical && effectiveCanonical !== page.url) {
    report("sitemap-canonicalized-page", { canonicalUrl: effectiveCanonical });
  }
  /* Google's pagination doc: "Don't use the first page of a paginated
     sequence as the canonical page. Instead, give each page its own
     canonical URL." Pages 2..n canonicalised to page 1 leave the index. */
  const firstPage = withoutPageToken(page.url);
  if (
    effectiveCanonical &&
    effectiveCanonical !== page.url &&
    firstPage !== null &&
    sameCanonicalTarget(effectiveCanonical, firstPage)
  ) {
    report("paginated-canonical-to-first-page", {
      canonicalUrl: effectiveCanonical,
    });
  }
  // The sitemap suggests this URL; the page asks not to be indexed at all.
  if (page.inSitemap && !page.isIndexable) {
    report("sitemap-noindex-page", {
      robotsMeta: page.robotsMeta,
      xRobotsTag: page.xRobotsTag,
    });
  }
}

/**
 * The hreflang cluster checks.
 *
 * All three are gated on the page declaring an alternate that is not
 * itself. A single self-referencing `<link rel="alternate" hreflang="tr">`
 * is what several popular plugins emit on a monolingual site: correct
 * markup, no cluster, nothing to be missing. Keying off "declares any
 * alternate" flagged every page on those sites.
 */
function reportHreflang(page: CrawledPageResult, report: ReportIssue) {
  // Google matches the value case-insensitively, so the comparison does too.
  const foreignAlternates = page.hreflangAlternates.filter(
    (alternate) => alternate.href !== page.url,
  );
  const codes = page.hreflangAlternates.map((a) => a.hreflang);

  const invalid = codes.filter((code) => !isValidHreflang(code));
  if (invalid.length > 0)
    report("hreflang-invalid-code", { hreflangs: invalid });

  if (foreignAlternates.length === 0) return;

  if (
    !page.hreflangAlternates.some(
      (alternate) => alternate.hreflang.trim().toLowerCase() === "x-default",
    )
  ) {
    report("hreflang-missing-x-default", { hreflangs: codes });
  }
  /* Google: "Each language version must list itself as well as all other
     language versions." Folded through `sameCanonicalTarget`, so neither a
     www nor a trailing-slash difference fakes a missing self-reference.
     This used to call `canonicalUrlKey` directly, which folds www and
     deliberately does not fold the slash -- so a page crawled as `/a/`
     whose own alternate writes `/a` was reported as leaving itself out. */
  if (
    !page.hreflangAlternates.some((alternate) =>
      sameCanonicalTarget(alternate.href, page.url),
    )
  ) {
    report("hreflang-missing-self", { hreflangs: codes });
  }
}

function reportSitemapStatus(page: CrawledPageResult, report: ReportIssue) {
  if (!page.inSitemap) return;
  if (page.statusCode >= 400) {
    report("sitemap-broken-page", { statusCode: page.statusCode });
    return;
  }
  report("sitemap-redirect-page", {
    statusCode: page.statusCode,
    redirectUrl: page.redirectUrl,
  });
}

export function runPageReporters(
  page: CrawledPageResult,
  /*
   * The site's own robots rules, when the caller has them. Optional because
   * the badseo harness runs these reporters directly without a workflow --
   * and absent must mean "not checked", never "nothing blocked".
   */
  isAllowed?: (url: string) => boolean,
): DetectedIssue[] {
  const issues: DetectedIssue[] = [];
  const report = (
    issueType: AuditIssueType,
    details?: Record<string, unknown>,
  ) => issues.push({ issueType, pageId: page.id, pageUrl: page.url, details });

  if (page.fetchClass === "blocked") {
    report("blocked-page", { statusCode: page.statusCode });
    return issues;
  }
  if (page.fetchClass === "rate_limited") {
    report("rate-limited-page", { statusCode: page.statusCode });
    return issues;
  }
  if (page.fetchClass === "error") {
    return issues;
  }

  if (page.statusCode >= 300) {
    if (page.statusCode >= 500) {
      report("server-error", { statusCode: page.statusCode });
    } else if (page.statusCode >= 400) {
      report("broken-page", { statusCode: page.statusCode });
    }
    // A redirect on its own is normal; chains and loops are flagged in
    // multipage. Being in the sitemap is what makes one worth reporting.
    reportSitemapStatus(page, report);
    return issues;
  }

  if (page.responseTimeMs > SLOW_RESPONSE_MS) {
    report("slow-response", { responseTimeMs: page.responseTimeMs });
  }

  // Content checks only make sense for analyzed HTML documents (a PDF has no
  // title tag to miss; an empty-shell HTML page very much does).
  if (!page.isHtml) {
    return issues;
  }

  // Titles
  if (!page.title) {
    report("missing-title");
  } else if (page.title.length > TITLE_MAX_CHARS) {
    report("title-too-long", { length: page.title.length });
  } else if (page.title.length < TITLE_MIN_CHARS) {
    report("title-too-short", { length: page.title.length });
  }

  // Meta description
  if (!page.metaDescription) {
    report("missing-meta-description");
  } else if (page.metaDescription.length > META_DESCRIPTION_MAX_CHARS) {
    report("meta-description-too-long", {
      length: page.metaDescription.length,
    });
  } else if (page.metaDescription.length < META_DESCRIPTION_MIN_CHARS) {
    report("meta-description-too-short", {
      length: page.metaDescription.length,
    });
  }

  // Headings
  if (page.h1Count === 0) {
    report("missing-h1");
  } else if (page.h1Count > 1) {
    report("multiple-h1", { h1Count: page.h1Count });
  }
  if (hasHeadingLevelSkip(page.headingOrder)) {
    report("heading-order-skip");
  }

  reportIndexability(page, report);

  // Internationalization
  reportHreflang(page, report);

  /* Google: "Google Search won't render JavaScript from blocked files or
     on blocked pages." So a crawlable page whose own script is disallowed
     renders for Google as whatever the HTML says before that script runs,
     which on a client-rendered site is an empty shell. Same-origin only:
     judging a third-party CDN would need that host's robots.txt. */
  if (isAllowed) {
    const blocked = page.resources.filter((url) => !isAllowed(url));
    if (blocked.length > 0) {
      report("blocked-resource", {
        blocked: blocked.slice(0, 10),
        blockedCount: blocked.length,
      });
    }
  }

  /* Google indexes the mobile version of a page, and without a viewport
     the mobile version is the desktop layout scaled down. Lighthouse
     already audits this, but on at most ten sampled pages -- so one broken
     template can sit outside the sample, which is why a crawl-wide check
     earns its place beside it. `info`, because Search Central recommends
     responsive design rather than mandating the tag. */
  if (page.viewport === null) {
    report("missing-viewport");
  }

  // Content quality
  if (page.isIndexable && page.wordCount < THIN_CONTENT_WORDS) {
    report("thin-content", { wordCount: page.wordCount });
  }
  if (page.imagesMissingAlt > 0) {
    report("images-missing-alt", {
      imagesMissingAlt: page.imagesMissingAlt,
      imagesTotal: page.imagesTotal,
    });
  }

  // Structure
  if (page.isIndexable && page.links.length === 0) {
    report("no-outgoing-links");
  }
  if (page.crawlDepth !== null && page.crawlDepth >= DEEP_PAGE_DEPTH) {
    report("deep-page", { crawlDepth: page.crawlDepth });
  }

  return issues;
}
