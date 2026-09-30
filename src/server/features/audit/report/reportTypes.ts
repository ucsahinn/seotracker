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
};

export type AuditReportDocument = {
  title: string;
  summary: string;
  html: string;
};
