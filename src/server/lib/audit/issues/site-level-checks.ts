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
import { siteFactFindings } from "@/server/lib/audit/site-probes/site-fact-checks";
import type { SiteFacts } from "@/server/lib/audit/site-probes/types";

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
  /*
   * Optional for the same reason the two fields above are: an audit that
   * started before this existed replays its discovery step from durable
   * storage and gets the old shape back. Absent means "not recorded".
   */
  /** Absent on a replayed run that predates it; see above. */
  offHost?: { count: number; sample: string[] };
  /** Named sitemap documents that yielded nothing, with why (capped). */
  failed?: { url: string; reason: string; statusCode?: number }[];
  failedCount?: number;
  lastmod?: {
    urls: number;
    withLastmod: number;
    future: number;
    futureSample: string | null;
  };
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
  /** Absent for a run that predates the site probes. */
  siteFacts?: SiteFacts | null;
}): DetectedIssue[] {
  const issues: DetectedIssue[] = [];
  const at = (
    issueType: AuditIssueType,
    pageUrl: string,
    details?: Record<string, unknown>,
  ) => issues.push({ issueType, pageId: null, pageUrl, details });

  const { startUrl, robotsFindings, sitemapProblems, siteFacts } = input;

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
    // A disallow-all (reported from the site facts) already says the start
    // page is blocked; two critical findings for one robots line is noise.
    if (robotsFindings.startBlocked && siteFacts?.robots.disallowAll !== true) {
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
    /*
     * react-bootstrap.github.io's sitemap lists 52 addresses, every one on
     * its netlify.app twin. Google drops entries for another host unless
     * that host's own robots.txt points at this sitemap.
     */
    if (sitemapProblems.offHost && sitemapProblems.offHost.count > 0) {
      at("sitemap-off-host-urls", startUrl, {
        count: sitemapProblems.offHost.count,
        sample: sitemapProblems.offHost.sample,
      });
    }
    /*
     * One finding per document, at the document's own address, so the
     * report names which sitemap could not be read and why. Discovery used to
     * log only "failed=1".
     */
    for (const doc of sitemapProblems.failed ?? []) {
      at("sitemap-unreadable", doc.url, {
        reason: doc.reason,
        ...(doc.statusCode ? { statusCode: doc.statusCode } : {}),
        ...(sitemapProblems.failedCount &&
        sitemapProblems.failedCount > (sitemapProblems.failed?.length ?? 0)
          ? { count: sitemapProblems.failedCount }
          : {}),
      });
    }
    reportLastmod(sitemapProblems.lastmod, startUrl, at);
  }

  if (siteFacts) {
    const origin = new URL(startUrl).origin;
    for (const finding of siteFactFindings(siteFacts, origin)) {
      at(finding.issueType, startUrl, finding.details);
    }
  }

  return issues;
}

/** Under this, "no dates" says more about the sitemap's size than its quality. */
const LASTMOD_MIN_URLS = 5;

/**
 * Google documents lastmod as a signal it uses "if it is consistently
 * accurate", and ignores otherwise. Both halves of that sentence are worth a
 * finding: no dates at all means Google recrawls on its own schedule, and a
 * date in the future is the kind of inaccuracy that makes it stop trusting
 * the rest of them.
 */
function reportLastmod(
  lastmod: SitemapProblems["lastmod"],
  startUrl: string,
  at: (
    issueType: AuditIssueType,
    pageUrl: string,
    details?: Record<string, unknown>,
  ) => void,
) {
  if (!lastmod || lastmod.urls < LASTMOD_MIN_URLS) return;

  if (lastmod.withLastmod === 0) {
    at("sitemap-lastmod-missing", startUrl, { urlCount: lastmod.urls });
    return;
  }
  if (lastmod.future > 0) {
    at("sitemap-lastmod-future", startUrl, {
      count: lastmod.future,
      example: lastmod.futureSample,
    });
  }
}

/**
 * The checks added after the site facts that this run could measure, for
 * `audit_measured_checks`: an audit replayed from older step state (no
 * off-host count, no Googlebot rules) leaves them unknown, not passed.
 */
export function measuredSiteLevelChecks(input: {
  sitemapProblems?: SitemapProblems;
  siteFacts?: SiteFacts | null;
}): string[] {
  const measured: string[] = [];
  if (input.sitemapProblems?.offHost) measured.push("sitemap-off-host-urls");
  if (input.sitemapProblems?.failed) measured.push("sitemap-unreadable");
  if (Array.isArray(input.siteFacts?.robots.googlebotOnlyRules)) {
    measured.push("robots-googlebot-only-paths");
  }
  return measured;
}
