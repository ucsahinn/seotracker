/**
 * The audit as a list of checks rather than a list of problems.
 *
 * Every issue type in the registry is a check the audit can run. A check
 * that found something has failed; one whose data was measured and found
 * nothing has passed; one whose data was never measured (no speed run, a
 * DNS lookup that timed out, Search Console never asked) is unknown. Unknown
 * is never a pass and never a fail: a free audit that reads "all clear"
 * where it did not look is worse than one that says it did not look.
 *
 * The checks are grouped into seven categories (`auditCategory`), each
 * category gets a score, and the site score is their weighted average, all
 * from `scoreAudit`, so a fix moves both by numbers that agree. Shared so the screen, the report and the
 * MCP summary cannot disagree about which check passed.
 */
import type { SiteFacts } from "@/server/lib/audit/site-probes/types";
import { AUDIT_ISSUE_TYPES, type IssueSeverity } from "./audit-issues";
import { CHECKS_SINCE_SITE_FACTS } from "./audit-issues/since-site-facts";
import { RECORDED_CHECKS } from "./audit-issues/recorded-checks";
import { SPEED_ISSUES } from "./audit-issues/speed";
import {
  AUDIT_CATEGORIES,
  auditCategoryOf,
  type AuditCategory,
} from "./auditCategory";
import { scoreAudit, type ScoredFinding } from "./auditScore";

export type CheckState = "passed" | "failed" | "unknown";

/** What the audit measured, which decides passed versus unknown. */
export type CheckContext = {
  pagesCrawled: number;
  /** At least one Lighthouse row carries a score. */
  hasLighthouse: boolean;
  /** Null for an audit that predates the site probes. */
  siteFacts: SiteFacts | null;
  /** Search Console answered for some page; null when not known yet. */
  googleInspected: boolean | null;
  /** The pages' GA4 ids were compared with the connected property's. */
  analyticsCompared: boolean | null;
};

/*
 * What each site-probe check needs before its silence means "passed". These
 * mirror the conditions its finding is raised under (site-fact-checks.ts):
 * a 401, 403, 429 or 5xx is a server declining to answer the probe, and an
 * absence read off it would be a guess.
 */
const answered = (status: number | null) =>
  status !== null && (status < 400 || status === 404 || status === 410);
const headersReadable = (f: SiteFacts) =>
  f.start.status !== null && f.start.status < 400;
const startSucceeded = (f: SiteFacts) =>
  f.start.status !== null && f.start.status >= 200 && f.start.status < 300;
const notFoundProbed = (f: SiteFacts) => answered(f.notFound.status);
const htmlMeasured = (f: SiteFacts) => f.start.htmlBytes !== null;
const certKnown = (f: SiteFacts) => f.certificate.notAfter !== null;
const dnsKnown = (f: SiteFacts) => f.dns.resolved;

/** Site-probe checks and the fact each one needs. */
const SITE_FACT_NEEDS: Record<string, (facts: SiteFacts) => boolean> = {
  "no-https-redirect": (f) => f.httpsRedirect.redirectsToHttps !== null,
  // HSTS is only read on an https answer; on http it does not apply.
  "missing-hsts": (f) =>
    headersReadable(f) && (f.start.finalUrl?.startsWith("https://") ?? false),
  "missing-x-content-type-options": headersReadable,
  "missing-clickjacking-protection": headersReadable,
  "missing-referrer-policy": headersReadable,
  "ssl-expiring-soon": certKnown,
  "ssl-expiring-very-soon": certKnown,
  "domain-expiring-soon": (f) => f.domain.expiresAt !== null,
  "missing-spf": dnsKnown,
  "missing-dmarc": dnsKnown,
  "www-and-apex-both-serve": (f) =>
    f.hostVariant !== null && answered(f.hostVariant.alternateStatus),
  "soft-404-on-missing-page": notFoundProbed,
  "not-found-redirects-home": notFoundProbed,
  "missing-favicon": (f) => f.favicon.found !== null,
  // A robots.txt that answered 5xx, 401 or 403 was never read.
  "robots-disallow-all": (f) => f.robots.disallowAll !== null,
  "robots-missing-sitemap-line": (f) =>
    f.robots.status === 200 && f.robots.hasSitemapLine !== null,
  // Under a disallow-all only robots-disallow-all is raised; the AI bots
  // are blocked too, so this check did not pass.
  "ai-crawlers-blocked": (f) =>
    f.robots.access.length > 0 && f.robots.disallowAll === false,
  "missing-llms-txt": (f) => f.llmsTxt.found !== null,
  "html-too-large": htmlMeasured,
  // Compression is judged on the real page, not on an error page.
  "no-compression": (f) => htmlMeasured(f) && startSucceeded(f),
  "slow-ttfb": (f) => f.start.ttfbMs !== null,
};

/*
 * A check whose finding a stricter one replaces: a certificate with ten days
 * left raises only "very soon", and "soon" did not pass for it.
 */
const SUPERSEDED_BY: Record<string, string> = {
  "ssl-expiring-soon": "ssl-expiring-very-soon",
  // A page in the "poor" band is never also reported as "needs improvement".
  "cwv-lcp-needs-improvement": "cwv-lcp-poor",
  "cwv-cls-needs-improvement": "cwv-cls-poor",
  "cwv-inp-needs-improvement": "cwv-inp-poor",
};

function isGoogleVerdict(issueType: string): boolean {
  return (
    issueType.startsWith("google-") || issueType === "stale-google-verdicts"
  );
}

/** Whether this audit measured what `issueType` needs, found or not. */
export function checkMeasured(issueType: string, ctx: CheckContext): boolean {
  if (ctx.pagesCrawled <= 0) return false;
  // Measured only where the audit itself recorded that it measured it.
  if (RECORDED_CHECKS.has(issueType)) {
    return ctx.siteFacts?.measuredChecks?.includes(issueType) ?? false;
  }
  // Judged only when a GA4 property and a G- tag were both there to compare.
  if (issueType === "analytics-id-mismatch") {
    return ctx.analyticsCompared === true;
  }
  if (issueType in SPEED_ISSUES) return ctx.hasLighthouse;
  if (isGoogleVerdict(issueType)) return ctx.googleInspected === true;
  // An audit from before the site facts never ran these.
  if (CHECKS_SINCE_SITE_FACTS.has(issueType) && ctx.siteFacts === null) {
    return false;
  }
  const needs = SITE_FACT_NEEDS[issueType];
  if (needs) return ctx.siteFacts !== null && needs(ctx.siteFacts);
  return true;
}

export type AuditCheck = {
  issueType: string;
  category: AuditCategory;
  severity: IssueSeverity;
  state: CheckState;
  /** Distinct pages it fails on; the crawl size for a site-level finding. */
  pages: number;
  siteLevel: boolean;
  /** Points fixing it adds to the site score; 0 unless failed. */
  points: number;
};

export type CategoryScore = {
  category: AuditCategory;
  /** 0-100, or null when none of its checks could be measured. */
  score: number | null;
  passed: number;
  failed: number;
  unknown: number;
  /** Points its failed checks take off the site score. */
  impact: number;
};

export type AuditBreakdown = {
  /** The site score, 0-100, or null when nothing was crawled. */
  score: number | null;
  /** The severity cap that lowered the site score, if one did (see `scoreAudit`). */
  cappedBy: "critical" | "warnings" | null;
  /** What fixing each failed check adds to the site score, largest first. */
  gains: { issueType: string; points: number }[];
  checks: AuditCheck[];
  categories: CategoryScore[];
  counters: {
    /** Failed critical checks: "Teknik hata". */
    errors: number;
    /** Failed warning and info checks: "Gelişim fırsatı". */
    opportunities: number;
    /** Passed checks: "Güçlü sinyal". */
    passed: number;
    unknown: number;
  };
};

/**
 * Every registered check with its state, plus per-category scores.
 * `findings` are the scored findings of this audit (see
 * `findingsFromIssues`); a finding whose type the registry no longer knows
 * still counts, under its own category.
 */
export function buildAuditBreakdown(
  findings: ScoredFinding[],
  ctx: CheckContext,
): AuditBreakdown {
  const failedByType = new Map(findings.map((f) => [f.issueType, f]));

  const registered = Object.entries(AUDIT_ISSUE_TYPES).map(
    ([issueType, descriptor]): AuditCheck => {
      const finding = failedByType.get(issueType);
      return {
        issueType,
        category: auditCategoryOf(issueType),
        severity: finding?.severity ?? descriptor.severity,
        state: finding
          ? "failed"
          : checkMeasured(issueType, ctx) &&
              !failedByType.has(SUPERSEDED_BY[issueType] ?? "")
            ? "passed"
            : "unknown",
        pages: finding?.pages ?? 0,
        siteLevel: finding?.siteLevel ?? false,
        points: 0,
      };
    },
  );
  const unregistered = findings
    .filter((f) => !(f.issueType in AUDIT_ISSUE_TYPES))
    .map(
      (f): AuditCheck => ({
        issueType: f.issueType,
        category: auditCategoryOf(f.issueType),
        severity: f.severity,
        state: "failed",
        pages: f.pages,
        siteLevel: f.siteLevel ?? false,
        points: 0,
      }),
    );

  // A category with nothing measured stays out of the site score.
  const measuredCategories = new Set(
    [...registered, ...unregistered]
      .filter((check) => check.state !== "unknown")
      .map((check) => check.category),
  );
  const scored = scoreAudit(findings, ctx.pagesCrawled, measuredCategories);
  const points = new Map(
    scored.gains.map((gain) => [gain.issueType, gain.points]),
  );
  const checks = [...registered, ...unregistered].map((check) => ({
    ...check,
    points: check.state === "failed" ? (points.get(check.issueType) ?? 0) : 0,
  }));

  const categories = AUDIT_CATEGORIES.map((category): CategoryScore => {
    const own = checks.filter((check) => check.category === category);
    const failed = own.filter((check) => check.state === "failed").length;
    const passed = own.filter((check) => check.state === "passed").length;
    const result = scored.categories.find((c) => c.category === category);
    return {
      category,
      score: result?.score ?? null,
      passed,
      failed,
      unknown: own.length - passed - failed,
      impact: result?.impact ?? 0,
    };
  });

  const failed = checks.filter((check) => check.state === "failed");
  return {
    score: scored.score,
    cappedBy: scored.cappedBy,
    gains: scored.gains,
    checks,
    categories,
    counters: {
      errors: failed.filter((check) => check.severity === "critical").length,
      opportunities: failed.filter((check) => check.severity !== "critical")
        .length,
      passed: checks.filter((check) => check.state === "passed").length,
      unknown: checks.filter((check) => check.state === "unknown").length,
    },
  };
}
