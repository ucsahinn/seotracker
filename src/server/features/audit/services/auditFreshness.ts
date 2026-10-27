import { comparePanelAudits } from "@/shared/panelAuditComparison";
import { loadPanelAuditSnapshot } from "./panelAuditSnapshot";
import { getPanelAuditSelection } from "./panelAuditSelection";
import { auditIsStale } from "@/shared/panelAudit";
import { parseTimestamp } from "@/shared/format";

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
  comparisonUnavailable?: boolean;
  comparisonPartial?: boolean;
  previousAuditId?: string;
  /** The audit these deltas were computed against, so the card can link. */
  auditId: string | null;
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
  const started = parseTimestamp(from);
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
  const selection = await getPanelAuditSelection(input.projectId);
  const latest = selection.snapshot;
  if (!latest) {
    return {
      hasAudit: false,
      auditId: null,
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
    auditId: latest.id,
    lastCompletedAt: latest.startedAt,
    daysSince,
    isStale: auditIsStale(parseTimestamp(latest.startedAt), now.getTime()),
  };

  if (!selection.previous)
    return {
      ...base,
      comparisonUnavailable: false,
      newIssues: [],
      resolvedIssues: [],
    };
  const [current, previous] = await Promise.all([
    loadPanelAuditSnapshot(input.projectId, latest.id),
    loadPanelAuditSnapshot(input.projectId, selection.previous.id),
  ]);
  const comparison = comparePanelAudits(current, previous);
  return {
    ...base,
    previousAuditId: selection.previous.id,
    comparisonUnavailable: comparison === null,
    comparisonPartial: comparison?.partial ?? false,
    newIssues: comparison?.newIssues ?? [],
    resolvedIssues: comparison?.resolvedIssues ?? [],
  };
}
