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

export function runPageReporters(page: CrawledPageResult): DetectedIssue[] {
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

  if (page.statusCode >= 500) {
    report("server-error", { statusCode: page.statusCode });
    return issues;
  }
  if (page.statusCode >= 400) {
    report("broken-page", { statusCode: page.statusCode });
    return issues;
  }
  // Redirects are normal on their own; chains/loops are flagged in multipage.
  if (page.statusCode >= 300) {
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
  // The sitemap suggests this URL; the page asks not to be indexed at all.
  if (page.inSitemap && !page.isIndexable) {
    report("sitemap-noindex-page", {
      robotsMeta: page.robotsMeta,
      xRobotsTag: page.xRobotsTag,
    });
  }

  // Internationalization
  /* Only meaningful once the page declares an alternate that is not itself.
     A single self-referencing `<link rel="alternate" hreflang="tr">` is what
     several popular plugins emit on a monolingual site: correct markup, no
     cluster, and nothing for an x-default to fall back to. Keying off
     "declares any alternate" flagged every page on those sites. Google
     matches the value case-insensitively, so the comparison does too. */
  const foreignAlternates = page.hreflangAlternates.filter(
    (alternate) => alternate.href !== page.url,
  );
  if (
    foreignAlternates.length > 0 &&
    !page.hreflangAlternates.some(
      (alternate) => alternate.hreflang.trim().toLowerCase() === "x-default",
    )
  ) {
    report("hreflang-missing-x-default", {
      hreflangs: page.hreflangAlternates.map((a) => a.hreflang),
    });
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
