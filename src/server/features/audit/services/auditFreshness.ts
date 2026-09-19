import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { getIssueTypePageCountsForAudit } from "@/server/features/audit/repositories/auditSummaryQueries";

/**
 * Is this project's audit stale, and what changed since the one before it?
 *
 * Deliberately not a scheduler. Docker never fires a cron and the machine is
 * asleep half the time, so a weekly job would run whenever the container
 * happened to be up — which is to say, unpredictably. Instead the dashboard
 * asks this question when it renders and the operator starts the audit if they
 * want one. A crawl takes minutes and can hammer a small site, so starting one
 * behind their back would be a surprise, not a convenience.
 */

/** A site left uncrawled for this long is worth looking at again. */
const STALE_AFTER_DAYS = 7;

type IssueDelta = {
  issueType: string;
  severity: "critical" | "warning" | "info";
  /** Pages affected now. */
  count: number;
  /** Pages affected in the previous completed audit, or null when it is new. */
  previousCount: number | null;
};

type AuditFreshness = {
  hasAudit: boolean;
  lastCompletedAt: string | null;
  daysSince: number | null;
  isStale: boolean;
  /** Issue types that appeared, or affect more pages than they used to. */
  newIssues: IssueDelta[];
  /** Issue types that are gone, or affect fewer pages. */
  resolvedIssues: IssueDelta[];
};

function daysBetween(from: string, to: Date): number | null {
  // Audit timestamps are SQLite's "YYYY-MM-DD HH:MM:SS"; ISO parses once the
  // space becomes a T.
  const started = Date.parse(from.replace(" ", "T") + "Z");
  if (Number.isNaN(started)) return null;
  return Math.floor((to.getTime() - started) / 86_400_000);
}

/**
 * Compare the last two completed audits. The comparison is the point: a list of
 * 40 issues is wallpaper, while "three of these are new since last week" is
 * something to act on.
 */
export async function getAuditFreshness(input: {
  projectId: string;
  now?: Date;
}): Promise<AuditFreshness> {
  const now = input.now ?? new Date();
  const audits = await AuditRepository.getAuditsByProject(input.projectId);
  const completed = audits.filter((audit) => audit.status === "completed");
  const [latest, previous] = completed;

  if (!latest) {
    return {
      hasAudit: false,
      lastCompletedAt: null,
      daysSince: null,
      isStale: false,
      newIssues: [],
      resolvedIssues: [],
    };
  }

  const daysSince = daysBetween(latest.startedAt, now);
  const base = {
    hasAudit: true,
    lastCompletedAt: latest.startedAt,
    daysSince,
    isStale: daysSince !== null && daysSince >= STALE_AFTER_DAYS,
  };

  if (!previous) {
    return { ...base, newIssues: [], resolvedIssues: [] };
  }

  const [latestCounts, previousCounts] = await Promise.all([
    getIssueTypePageCountsForAudit(latest.id),
    getIssueTypePageCountsForAudit(previous.id),
  ]);

  const beforeByType = new Map(
    previousCounts.map((row) => [row.issueType, row.pages]),
  );
  const currentByType = new Map(
    latestCounts.map((row) => [row.issueType, row]),
  );

  const newIssues: IssueDelta[] = [];
  for (const row of latestCounts) {
    const previousCount = beforeByType.get(row.issueType) ?? null;
    if (previousCount === null || row.pages > previousCount) {
      newIssues.push({
        issueType: row.issueType,
        severity: row.severity,
        count: row.pages,
        previousCount,
      });
    }
  }

  const resolvedIssues: IssueDelta[] = [];
  for (const row of previousCounts) {
    const current = currentByType.get(row.issueType);
    if (!current) {
      resolvedIssues.push({
        issueType: row.issueType,
        severity: row.severity,
        count: 0,
        previousCount: row.pages,
      });
    } else if (current.pages < row.pages) {
      resolvedIssues.push({
        issueType: row.issueType,
        severity: current.severity,
        count: current.pages,
        previousCount: row.pages,
      });
    }
  }

  const bySeverity = { critical: 0, warning: 1, info: 2 } as const;
  const rank = (delta: IssueDelta) => bySeverity[delta.severity];
  newIssues.sort((a, b) => rank(a) - rank(b) || b.count - a.count);
  resolvedIssues.sort(
    (a, b) =>
      rank(a) - rank(b) || (b.previousCount ?? 0) - (a.previousCount ?? 0),
  );

  return { ...base, newIssues, resolvedIssues };
}
