/**
 * Shared types for the site audit system.
 */

import { z } from "zod";
import type { PageFetchClass } from "@/shared/audit-fetch-class";
import { MIN_AUDIT_PAGES, MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import { jsonCodec } from "@/shared/json";

/** Whether an audit runs Lighthouse at all. */
export type LighthouseMode = "auto" | "none";

/** Which device profile one Lighthouse run measures. */
export type LighthouseStrategy = "mobile" | "desktop";

export interface AuditConfig {
  maxPages: number;
  // The persisted field name is frozen by rows already in `audits.config`.
  lighthouseStrategy: LighthouseMode;
  /**
   * Check outgoing links and measure the site's image files after the crawl.
   * Absent on audits from before the option existed: off.
   */
  externalChecks?: boolean;
}

// Read-side only (writes stringify a typed AuditConfig). Stored rows may hold
// retired modes ("all", "manual") from older audits; map them onto the closest
// surviving mode — and fall back to "auto" on anything unknown — instead of
// failing the whole config parse and making the audit's results unviewable.
const lighthouseModeSchema = z
  .enum(["auto", "all", "manual", "none"])
  .transform(
    (value): LighthouseMode =>
      value === "all" ? "auto" : value === "manual" ? "none" : value,
  )
  .catch("auto");

const auditConfigSchema = z.object({
  maxPages: z.number().int().min(MIN_AUDIT_PAGES).max(MAX_AUDIT_PAGES),
  lighthouseStrategy: lighthouseModeSchema,
  externalChecks: z.boolean().optional().catch(false),
});

const auditConfigCodec = jsonCodec(auditConfigSchema);

export function parseAuditConfig(configRaw: string | null): AuditConfig | null {
  if (!configRaw) return null;
  const result = auditConfigCodec.safeParse(configRaw);
  return result.success ? result.data : null;
}

/** One outgoing link edge, deduped by target URL within a page. */
/** One `<link rel="alternate" hreflang="..">`, with its href resolved. */
export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

/** One `<img>`, as far as the checks need it. */
export interface PageImage {
  src: string | null;
  alt: string | null;
  /**
   * True when a raster image lacks a `width` or `height` attribute. SVG is
   * never flagged: it scales by definition and carries its own viewBox.
   */
  missingDimensions: boolean;
}

export interface PageLink {
  targetUrl: string;
  anchor: string | null;
  isInternal: boolean;
  isNofollow: boolean;
}

/** One schema.org type on a page that lacks properties Google lists for it. */
export interface StructuredDataGap {
  type: string;
  /** Whether Google calls the missing properties required or only recommended. */
  level: "required" | "recommended";
  missing: string[];
}

/** http: subresources on an https page: how many, and a few of them. */
export interface InsecureRefs {
  count: number;
  examples: string[];
}

/**
 * Markup facts for the HTML checks; see `page-markup-signals.ts`. Transient
 * except `hasBreadcrumbs` and `hasFeedLink`, which are persisted for the
 * site-wide checks.
 */
export interface MarkupSignals {
  /** http: images, media, frames and embeds on an https page. */
  insecureMedia: InsecureRefs;
  /** Forms on an https page that post to an http: action. */
  insecureFormActions: InsecureRefs;
  /** Where a `<meta http-equiv="refresh">` sends the visitor; null when none. */
  metaRefreshUrl: string | null;
  /** Seconds before that refresh fires; null when there is none. */
  metaRefreshDelay: number | null;
  /** The first head canonical's href exactly as written. */
  canonicalHref: string | null;
  /** A canonical appears inside <body> and none in the head. */
  canonicalOnlyInBody: boolean;
  /** Every `<meta name="robots">` value, in document order. */
  robotsMeta: string[];
  /** Every `<meta name="googlebot">` value, in document order. */
  googlebotMeta: string[];
  loremIpsum: boolean;
  /** Distinct addresses in visible text and mailto links, capped. */
  emailAddresses: string[];
  /** The title's topic words, and how many appear in the H1 or body. */
  titleWords: { total: number; found: number } | null;
  hasBreadcrumbs: boolean;
  /** A `<link rel="alternate">` to an RSS or Atom feed. */
  hasFeedLink: boolean;
  /** Characters of inline executable script and inline style. */
  inlineCodeChars: number;
}

/**
 * The per-page signals behind the full audit report: page weight, markup
 * hygiene, accessibility basics, social and structured data, and the
 * analytics tags a page carries. Collected in the same tokenizer pass as
 * everything else; see `page-signals.ts`.
 */
export interface PageSignals {
  /** Visible text characters over HTML characters, 0..1. */
  textRatio: number;
  /** Elements in the document (inline SVG included, `<noscript>` not). */
  domNodeCount: number;
  domMaxDepth: number;
  /** `<meta name="twitter:card">`, trimmed; null when absent. */
  twitterCard: string | null;
  metaKeywordsPresent: boolean;
  /** `user-scalable=no` or a `maximum-scale` under 2 (200% zoom, WCAG 1.4.4). */
  viewportZoomDisabled: boolean;
  /** External `target="_blank"` links with neither noopener nor noreferrer. */
  externalBlankWithoutNoopener: number;
  /** `<a href="javascript:...">`: a link no crawler can follow. */
  javascriptLinks: number;
  /** `<a href="#">`. */
  hashOnlyLinks: number;
  /** `loading="lazy"`, or the data-src shape of a script lazy loader. */
  imagesLazyCount: number;
  /** WebP or AVIF, directly or through a `<picture>` source. */
  imagesModernFormatCount: number;
  /** Raster images after the first three that load eagerly. Transient. */
  imagesBelowFoldNotLazy: number;
  /** JPEG, PNG, GIF or BMP with no modern alternative. Transient. */
  imagesLegacyFormatCount: number;
  /** Form controls with no label, aria name, title or placeholder. */
  formInputsWithoutLabel: number;
  /** Distinct `id` values used more than once. */
  duplicateIds: number;
  /** 64-bit SimHash of the visible text as hex; null on a near-empty page. */
  contentSimhash: string | null;
  /** Distinct schema.org types declared in JSON-LD. */
  jsonLdTypes: string[];
  /** Judged types missing properties Google lists. Transient. */
  structuredDataGaps: StructuredDataGap[];
  /** A top-level Organization node without sameAs. Transient. */
  organizationWithoutSameAs: boolean;
  /** GA4 (G-), Tag Manager (GTM-) and Universal Analytics (UA-) ids in scripts. */
  analyticsIds: string[];
  markup: MarkupSignals;
}

/** Data extracted from a single page's HTML. */
export interface PageAnalysis {
  url: string;
  statusCode: number;
  redirectUrl: string | null;
  responseTimeMs: number;

  // Head metadata
  title: string;
  metaDescription: string;
  canonical: string | null;
  /** Distinct canonical targets declared in the head; more than one is a contradiction. */
  canonicalCount: number;
  /** `<title>` elements in the document (outside inline SVG). More than one is malformed. */
  titleCount: number;
  /** Distinct non-empty `<meta name="description">` values in the head. */
  metaDescriptionCount: number;
  /** Internal links with no text, no aria-label/title and no media child. */
  emptyAnchorCount: number;
  robotsMeta: string | null;
  /** Bot-specific directive; Google prefers it over the generic one. */
  googlebotMeta: string | null;
  /** `<html lang>`, trimmed; null when the attribute is absent or blank. */
  htmlLang: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;

  // Headings
  /**
   * Each <h1>'s text, with any image's alt text folded in at the point the
   * image sits. A heading that is a wordmark image still has words.
   */
  h1s: string[];
  headingOrder: number[];

  // Content
  wordCount: number;
  bodyText: string;

  // Images
  images: PageImage[];

  // Links (normalized, deduped by target)
  links: PageLink[];
  /** Distinct link targets on the page, counted past the `links` cap. */
  linkTargetCount: number;

  // Structured data
  hasStructuredData: boolean;
  /**
   * JSON-LD blocks that do not parse, or parse but name no `@type`. A count,
   * not the JSON: the reporter only needs to know a block is broken.
   */
  invalidStructuredDataCount: number;
  /** The raw `<meta name="viewport">` content, or null when absent. */
  viewport: string | null;
  /**
   * Same-origin `<script src>` and `<link rel=stylesheet>` URLs.
   *
   * Carried to the reporter and no further: a later check asks whether
   * robots.txt blocks any of them, and the answer is the finding. There is
   * no column, because nothing reads the list back.
   */
  resources: string[];
  /**
   * `http:` scripts and stylesheets on an `https:` page.
   *
   * Separate from `resources`, which is same-origin by definition and so
   * can never hold one: a different scheme is a different origin, and the
   * filter dropped exactly the case worth reporting. Carried to the
   * reporter and no further, like `resources`.
   */
  insecureResources: string[];

  // Hreflang
  /**
   * The alternates this page declares, href and all. The href is needed as
   * well as the language code, because whether a pairing is reciprocated is
   * a question about URLs.
   */
  hreflangAlternates: HreflangAlternate[];

  signals: PageSignals;
}

/** Lighthouse result for a single URL+strategy. */
export interface LighthouseResult {
  url: string;
  pageId: string;
  strategy: "mobile" | "desktop";
  performanceScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  seoScore: number | null;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  ttfbMs: number | null;
  errorMessage?: string | null;
  r2Key?: string | null;
  payloadSizeBytes?: number | null;
}

/**
 * Full result of crawling one page. Persisted to the app DB inside the
 * crawl-chunk step; never accumulated in memory or returned as durable
 * step state.
 */
export interface CrawledPageResult {
  id: string;
  url: string;
  statusCode: number;
  fetchClass: PageFetchClass;
  redirectUrl: string | null;
  title: string;
  metaDescription: string;
  canonicalUrl: string | null;
  /** Distinct canonical targets declared in the head; more than one is a contradiction. */
  canonicalCount: number;
  /** `<title>` elements in the document (outside inline SVG). More than one is malformed. */
  titleCount: number;
  /** Distinct non-empty `<meta name="description">` values in the head. */
  metaDescriptionCount: number;
  /** Internal links with no text, no aria-label/title and no media child. */
  emptyAnchorCount: number;
  robotsMeta: string | null;
  /** Bot-specific directive; Google prefers it over the generic one. */
  googlebotMeta: string | null;
  /** `<html lang>`, trimmed; null when the attribute is absent or blank. */
  htmlLang: string | null;
  xRobotsTag: string | null;
  headerCanonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  h1Count: number;
  /** Text of the first non-empty `<h1>`; feeds the cross-page duplicate-h1 check. */
  firstH1: string | null;
  h2Count: number;
  h3Count: number;
  h4Count: number;
  h5Count: number;
  h6Count: number;
  headingOrder: number[];
  wordCount: number;
  contentHash: string | null;
  /**
   * True when an HTML document was fetched and analyzed. Gates the content
   * checks in page reporters (an empty-shell HTML page must still be
   * checked; a PDF must not). Transient — not persisted.
   */
  isHtml: boolean;
  /**
   * HTML size read for this page (approximate; capped at MAX_HTML_BYTES).
   * Transient — feeds the crawl window's memory-pressure signal, since
   * response time is measured at headers and says nothing about body size.
   */
  htmlBytes: number;
  /**
   * True when a 429 was retried for this URL (whatever the retry returned).
   * Not persisted — narrows the crawl window so the pages after it are
   * fetched more slowly.
   */
  rateLimited: boolean;
  imagesTotal: number;
  imagesMissingAlt: number;
  images: PageImage[];
  links: PageLink[];
  /** Distinct link targets on the page, counted past the `links` cap. */
  linkTargetCount: number;
  hasStructuredData: boolean;
  /** JSON-LD blocks that do not parse or name no `@type`. Transient. */
  invalidStructuredDataCount: number;
  /** The raw `<meta name="viewport">` content, or null when absent. */
  viewport: string | null;
  /**
   * True when the character encoding is declared: a `charset` in the
   * Content-Type header, or a `<meta charset>` in the first 1024 bytes.
   * Transient; the crawler sets it, the analyzer never sees headers.
   */
  charsetDeclared: boolean;
  /**
   * Same-origin `<script src>` and `<link rel=stylesheet>` URLs.
   *
   * Carried to the reporter and no further: a later check asks whether
   * robots.txt blocks any of them, and the answer is the finding. There is
   * no column, because nothing reads the list back.
   */
  resources: string[];
  /**
   * `http:` scripts and stylesheets on an `https:` page.
   *
   * Separate from `resources`, which is same-origin by definition and so
   * can never hold one: a different scheme is a different origin, and the
   * filter dropped exactly the case worth reporting. Carried to the
   * reporter and no further, like `resources`.
   */
  insecureResources: string[];
  hreflangAlternates: HreflangAlternate[];
  /** Null when no HTML document was analyzed (redirect, error, non-HTML). */
  signals: PageSignals | null;
  isIndexable: boolean;
  responseTimeMs: number;
  /** null = not reached via links (e.g. sitemap-seeded). */
  crawlDepth: number | null;
  inSitemap: boolean;
}
