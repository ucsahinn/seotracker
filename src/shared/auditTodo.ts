/**
 * The audit's to-do list: one ranked list of what to fix, worth most first.
 *
 * Score impact alone treats a problem on a page nobody visits the same as
 * one on the page that brings every click. When Search Console is connected,
 * each fix is weighted by the share of the site's search traffic that lands
 * on the pages it touches, so the fix that protects real visitors comes
 * first. Without Search Console the order is score impact alone.
 *
 *   priority = points * (1 + trafficShare)
 *
 * The share is 0..1, so traffic can at most double a fix's weight: a small
 * fix on the home page does not outrank a critical problem on fifty pages.
 * Severity comes first: every critical fix, then every warning, then the
 * rest, each band ordered by priority. A site-level fix touches no page in
 * particular, so it takes a neutral share of 0.5 rather than all the
 * traffic, which put "add llms.txt" above a broken page that earns clicks.
 *
 * Within a severity, fixes whose priority is within half a point of each
 * other are a tie, and the tie goes to the one Lighthouse estimated saves
 * more load time, then more bytes, on its worst page.
 */
import { sort } from "remeda";
import {
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "./audit-issues";
import { issueSavings } from "./audit-issues/details";
import { SEVERITY_WEIGHT } from "./auditScore";

/** Search Console figures for one page, last 28 days. */
export type PageTraffic = { clicks: number; impressions: number };

/**
 * One key for an address however it was written: Search Console and the
 * crawler disagree on a trailing slash, the host's case, http or https, a
 * leading www and the order of query parameters, and a fragment never
 * reaches either. Folded like `siteKey`, so one site's page is one key.
 */
export function pageKey(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.host.toLowerCase().replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/+$/, "") || "/";
    parsed.searchParams.sort();
    const query = parsed.searchParams.toString();
    return `${host}${path}${query ? `?${query}` : ""}`;
  } catch {
    return url.trim();
  }
}

/**
 * "https://www.Example.com/blog/" and "http://example.com/blog" are one
 * scope: the address is typed by hand each run. The start path counts, since
 * a crawl of /blog is not comparable with a crawl of the whole host.
 */
export function siteKey(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    return host + parsed.pathname.replace(/\/+$/, "");
  } catch {
    return url.trim().toLowerCase();
  }
}

/** The traffic share a site-level fix is weighed with: neither none nor all. */
const SITE_LEVEL_SHARE = 0.5;

export type Effort = "S" | "M" | "L";

/*
 * Fixes that are a rewrite or a rebuild whatever the page count: content
 * has to be written, templates restructured, speed engineered.
 */
const HEAVY = new Set([
  "thin-content",
  "near-duplicate-content",
  "duplicate-content",
  "low-text-ratio",
  "orphan-page",
  "dom-too-large",
  "dom-too-deep",
  "cwv-lcp-poor",
  "cwv-cls-poor",
  "cwv-inp-poor",
  "lighthouse-seo-low",
]);

/**
 * A rough size for the work. A site-level fix is one setting or one file
 * (small); a page-level fix grows with the pages it touches; a heavy fix
 * starts at medium.
 */
export function estimateEffort(input: {
  issueType: string;
  siteLevel: boolean;
  pageCount: number;
}): Effort {
  const heavy = HEAVY.has(input.issueType);
  if (input.siteLevel) return heavy ? "M" : "S";
  const bySize: Effort =
    input.pageCount <= 5 ? "S" : input.pageCount <= 50 ? "M" : "L";
  if (heavy && bySize === "S") return "M";
  return bySize;
}

export type TodoInput = {
  issueType: string;
  severity: IssueSeverity;
  /** Points fixing it gives back to the site score. */
  points: number;
  siteLevel: boolean;
  /** Distinct affected page addresses (empty for a site-level finding). */
  pageUrls: string[];
  /**
   * Lighthouse's estimated savings on the affected page that gains most;
   * 0 when the finding carries none.
   */
  savingsMs: number;
  savingsBytes: number;
};

export type TodoItem = TodoInput & {
  pageCount: number;
  effort: Effort;
  /** Search clicks and impressions on the affected pages; null without GSC. */
  clicks: number | null;
  impressions: number | null;
  /** Share of the site's search traffic on the affected pages, 0..1. */
  trafficShare: number;
  priority: number;
};

/**
 * One to-do per issue type from stored issue rows, with the points the
 * score gives back for it (`scoreAudit(...).gains`).
 */
export function todoInputs(
  issues: {
    issueType: string;
    severity: string;
    pageId: string | null;
    pageUrl: string | null;
    detailsJson?: string | null;
  }[],
  gains: { issueType: string; points: number }[],
): TodoInput[] {
  const points = new Map(gains.map((gain) => [gain.issueType, gain.points]));
  const byType = new Map<string, TodoInput & { urls: Set<string> }>();
  for (const issue of issues) {
    const entry = byType.get(issue.issueType) ?? {
      issueType: issue.issueType,
      severity: resolveIssueSeverity(issue),
      points: points.get(issue.issueType) ?? 0,
      siteLevel: false,
      pageUrls: [],
      savingsMs: 0,
      savingsBytes: 0,
      urls: new Set<string>(),
    };
    const savings = issueSavings(issue.detailsJson);
    entry.savingsMs = Math.max(entry.savingsMs, savings.ms);
    entry.savingsBytes = Math.max(entry.savingsBytes, savings.bytes);
    if (issue.pageId === null) entry.siteLevel = true;
    else if (issue.pageUrl) entry.urls.add(issue.pageUrl);
    byType.set(issue.issueType, entry);
  }
  return [...byType.values()].map(({ urls, ...entry }) => ({
    ...entry,
    pageUrls: entry.siteLevel ? [] : [...urls],
  }));
}

/**
 * Rank fixes by score impact weighted by traffic. `traffic` is keyed by
 * `pageKey`; null when Search Console is not connected or did not answer.
 */
export function rankTodos(
  inputs: TodoInput[],
  traffic: Map<string, PageTraffic> | null,
): TodoItem[] {
  const all = traffic ? [...traffic.values()] : [];
  const totalClicks = all.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = all.reduce((sum, row) => sum + row.impressions, 0);
  // Clicks are the value; impressions stand in on a site too small to click.
  const useClicks = totalClicks > 0;
  const total = useClicks ? totalClicks : totalImpressions;

  const items = inputs.map((input): TodoItem => {
    const rows = traffic
      ? input.pageUrls.flatMap((url) => {
          const row = traffic.get(pageKey(url));
          return row ? [row] : [];
        })
      : [];
    const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
    const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
    const trafficShare =
      total <= 0
        ? 0
        : input.siteLevel
          ? SITE_LEVEL_SHARE
          : Math.min(1, (useClicks ? clicks : impressions) / total);
    return {
      ...input,
      pageCount: input.pageUrls.length,
      effort: estimateEffort({
        issueType: input.issueType,
        siteLevel: input.siteLevel,
        pageCount: input.pageUrls.length,
      }),
      clicks: traffic ? (input.siteLevel ? totalClicks : clicks) : null,
      impressions: traffic
        ? input.siteLevel
          ? totalImpressions
          : impressions
        : null,
      trafficShare,
      priority: input.points * (1 + trafficShare),
    };
  });

  return sort(
    items,
    (a, b) =>
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
      priorityBand(b.priority) - priorityBand(a.priority) ||
      b.savingsMs - a.savingsMs ||
      b.savingsBytes - a.savingsBytes ||
      b.priority - a.priority,
  );
}

/*
 * Half-point bands: a band, unlike "within 0.5 of each other", is
 * transitive, so the comparator stays a valid ordering.
 */
function priorityBand(priority: number): number {
  return Math.round(priority * 2);
}

export type WorstPage = {
  url: string;
  /** Severity weight summed over the page's distinct issue types. */
  weight: number;
  critical: number;
  warning: number;
  info: number;
  issueTypes: { issueType: string; severity: IssueSeverity }[];
};

/**
 * The pages with the most wrong with them, by the same severity weights as
 * the score. Site-level findings are left out: they are not a page's fault.
 */
export function rankWorstPages(
  issues: {
    issueType: string;
    severity: IssueSeverity;
    pageId: string | null;
    pageUrl: string;
  }[],
  limit: number,
): WorstPage[] {
  const byPage = new Map<string, Map<string, IssueSeverity>>();
  for (const issue of issues) {
    if (issue.pageId === null) continue;
    const types = byPage.get(issue.pageUrl) ?? new Map<string, IssueSeverity>();
    types.set(issue.issueType, issue.severity);
    byPage.set(issue.pageUrl, types);
  }
  const pages = [...byPage].map(([url, types]): WorstPage => {
    const list = sort(
      [...types].map(([issueType, severity]) => ({ issueType, severity })),
      (a, b) =>
        ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity],
    );
    const count = (severity: IssueSeverity) =>
      list.filter((entry) => entry.severity === severity).length;
    return {
      url,
      weight: list.reduce(
        (sum, entry) => sum + SEVERITY_WEIGHT[entry.severity],
        0,
      ),
      critical: count("critical"),
      warning: count("warning"),
      info: count("info"),
      issueTypes: list,
    };
  });
  return sort(pages, (a, b) => b.weight - a.weight).slice(0, limit);
}
