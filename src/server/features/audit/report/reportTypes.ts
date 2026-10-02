/*
 * What the report builder reads. Every field beyond the original seven page
 * columns is optional, so a caller (or a test) that has only the basics still
 * produces a report -- a missing field renders as "--", never as a guess.
 */

export type ReportPage = {
  id?: string;
  url: string;
  statusCode: number | null;
  title: string | null;
  metaDescription: string | null;
  wordCount: number | null;
  responseTimeMs: number | null;
  isIndexable: boolean;
  inSitemap: boolean;
  crawlDepth?: number | null;
  redirectUrl?: string | null;
  canonicalUrl?: string | null;
  fetchClass?: string;
};

export type ReportIssue = {
  issueType: string;
  severity: string | null;
  pageUrl: string | null;
  /** Null marks a finding about the whole site (robots.txt, the sitemap). */
  pageId?: string | null;
  detailsJson?: string | null;
};

export type ReportLighthouse = {
  pageId?: string;
  performanceScore: number | null;
  strategy: "mobile" | "desktop";
  accessibilityScore?: number | null;
  bestPracticesScore?: number | null;
  seoScore?: number | null;
  lcpMs?: number | null;
  cls?: number | null;
  inpMs?: number | null;
  ttfbMs?: number | null;
  errorMessage?: string | null;
};

type ReportIndexRow = {
  url: string;
  verdict: string | null;
  coverageState: string | null;
  lastCrawlTime: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  canonicalMismatch: boolean;
  error: string | null;
};

export type ReportIndexCoverage = {
  rows: ReportIndexRow[];
  checked: number;
  indexed: number;
  notIndexed: number;
  pending: number;
  asked: number;
  lastCheckedAt: string | null;
};

export type AuditReportInput = {
  siteUrl: string;
  startedAt: string;
  completedAt: string | null;
  pagesCrawled: number;
  pages: ReportPage[];
  issues: ReportIssue[];
  /*
   * Every page is measured twice -- mobile and desktop -- so counting rows
   * reported a 10-page sample as "20 sayfa ölçüldü". Mobile decides, the same
   * way the speed findings do: Google indexes mobile-first.
   */
  lighthouse: ReportLighthouse[];
  /** Stored URL Inspection answers; absent when Search Console was never asked. */
  indexCoverage?: ReportIndexCoverage | null;
  /** The crawl's page cap, from the audit's config. Absent in older callers. */
  maxPages?: number | null;
  /** Whether the audit ran Lighthouse at all ("none" = speed was switched off). */
  lighthouseMode?: "auto" | "none" | null;
  /**
   * How many Lighthouse CHECKS the audit planned, as stored on the audit: two
   * per page (mobile and desktop). The builder converts it to pages.
   */
  lighthouseTotal?: number | null;
  /** The audit's status. Absent means completed (older callers, tests). */
  status?: "running" | "completed" | "failed" | null;
  /** Short audit id, so two audits of one site on one day get distinct titles. */
  auditId?: string | null;
};

/*
 * How many rows each list prints. The stored report is capped in bytes, so
 * the builder halves these until the document fits (see buildAuditReportHtml).
 */
export type ReportCaps = {
  issuePages: number;
  appendix: number;
  pages: number;
  speed: number;
  /** Longest address printed under an issue or in the appendix. */
  urlChars: number;
  /** Longest "Ayrıntı" cell. */
  detailChars: number;
  /** How many issue types are listed in full (worst first); the rest are counted. */
  issueTypes: number;
};

export const DEFAULT_CAPS: ReportCaps = {
  issuePages: 50,
  appendix: 3000,
  pages: 300,
  speed: 50,
  urlChars: 110,
  detailChars: 200,
  issueTypes: Number.POSITIVE_INFINITY,
};

export type AuditReportDocument = {
  title: string;
  summary: string;
  html: string;
};
