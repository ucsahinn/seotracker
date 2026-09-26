/**
 * Findings about the site rather than about a page.
 *
 * They carry `pageId: null` and the start URL, the same shape
 * `crawl-rate-limited` has always used, because there is no single page they
 * belong to: a robots.txt that 5xxs is a fact about the whole crawl, and a
 * sitemap shard this tool could not read took its pages out of the audit
 * entirely so there is no row to attach to.
 *
 * Split out of the workflow when that file crossed its line ceiling. The
 * inputs are plain data rather than the workflow's state so this stays
 * testable without a Workflow runtime.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { AuditIssueType } from "@/shared/audit-issues";

export type RobotsFindings = {
  /** null when the request never completed (DNS, timeout, TLS). */
  status: number | null;
  truncated: boolean;
  startBlocked: boolean;
  disallowedSitemapSample: string[];
  disallowedSitemapCount: number;
};

export type SitemapProblems = {
  /** Shards past this tool's own read limit, so their pages are missing. */
  oversized: string[];
  oversizedCount: number;
  /** Shards past Google's 50,000-URL ceiling. */
  overfull: { url: string; urlCount: number }[];
  overfullCount: number;
};

export function siteLevelIssues(input: {
  startUrl: string;
  /*
   * Both optional because they arrive as durable Workflow step state: a run
   * that started before these fields existed replays its discovery step
   * from storage and gets the old shape back. Absent means "not recorded",
   * never "clean".
   */
  robotsFindings?: RobotsFindings;
  sitemapProblems?: SitemapProblems;
}): DetectedIssue[] {
  const issues: DetectedIssue[] = [];
  const at = (
    issueType: AuditIssueType,
    pageUrl: string,
    details?: Record<string, unknown>,
  ) => issues.push({ issueType, pageId: null, pageUrl, details });

  const { startUrl, robotsFindings, sitemapProblems } = input;

  if (robotsFindings) {
    /*
     * A 404 is deliberately not among these: Google reads a missing
     * robots.txt as "no restrictions", which is a normal way to run a site.
     */
    if (robotsFindings.status !== null && robotsFindings.status >= 500) {
      at("robots-txt-server-error", startUrl, {
        statusCode: robotsFindings.status,
      });
    } else if (robotsFindings.status === null) {
      at("robots-txt-unreachable", startUrl);
    }
    if (robotsFindings.truncated) at("robots-txt-truncated", startUrl);
    if (robotsFindings.startBlocked) {
      at("robots-txt-blocks-start-url", startUrl);
    }
    if (robotsFindings.disallowedSitemapCount > 0) {
      at("sitemap-disallowed-page", startUrl, {
        count: robotsFindings.disallowedSitemapCount,
        sample: robotsFindings.disallowedSitemapSample,
      });
    }
  }

  if (sitemapProblems) {
    /*
     * One issue for all oversized shards rather than one each: the finding
     * is "your sitemap is too big to read", and it has the same fix however
     * many shards hit it. The over-count shards get one apiece because the
     * URL count is the actionable number.
     */
    if (sitemapProblems.oversizedCount > 0) {
      at("sitemap-too-large", sitemapProblems.oversized[0] ?? startUrl, {
        count: sitemapProblems.oversizedCount,
        sample: sitemapProblems.oversized,
      });
    }
    for (const shard of sitemapProblems.overfull) {
      at("sitemap-too-many-urls", shard.url, { urlCount: shard.urlCount });
    }
  }

  return issues;
}
