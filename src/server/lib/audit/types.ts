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

export interface PageLink {
  targetUrl: string;
  anchor: string | null;
  isInternal: boolean;
  isNofollow: boolean;
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
  robotsMeta: string | null;
  /** Bot-specific directive; Google prefers it over the generic one. */
  googlebotMeta: string | null;
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
  images: Array<{ src: string | null; alt: string | null }>;

  // Links (normalized, deduped by target)
  links: PageLink[];

  // Structured data
  hasStructuredData: boolean;
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

  // Hreflang
  /**
   * The alternates this page declares, href and all. The href is needed as
   * well as the language code, because whether a pairing is reciprocated is
   * a question about URLs.
   */
  hreflangAlternates: HreflangAlternate[];
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
  robotsMeta: string | null;
  /** Bot-specific directive; Google prefers it over the generic one. */
  googlebotMeta: string | null;
  xRobotsTag: string | null;
  headerCanonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  h1Count: number;
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
  images: Array<{ src: string | null; alt: string | null }>;
  links: PageLink[];
  hasStructuredData: boolean;
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
  hreflangAlternates: HreflangAlternate[];
  isIndexable: boolean;
  responseTimeMs: number;
  /** null = not reached via links (e.g. sitemap-seeded). */
  crawlDepth: number | null;
  inSitemap: boolean;
}
