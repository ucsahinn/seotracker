export type AuditStatus = "running" | "completed" | "failed";

export interface AuditRow {
  id: string;
  status: AuditStatus;
  pagesCrawled: number;
  issues: { critical: number; warning: number; info: number };
}

interface AuditTransition {
  audit: AuditRow;
  outcome: "completed" | "failed";
}

/**
 * Audits that were running last time and have finished now.
 *
 * `previous` is undefined on the first look at a project: whatever is already
 * finished then finished before the app was watching, so nothing is reported
 * and the statuses only become the baseline. An audit seen for the first
 * time already finished is skipped for the same reason.
 */
export function detectAuditTransitions(
  previous: ReadonlyMap<string, AuditStatus> | undefined,
  audits: readonly AuditRow[],
): AuditTransition[] {
  if (!previous) return [];
  const transitions: AuditTransition[] = [];
  for (const audit of audits) {
    if (previous.get(audit.id) !== "running") continue;
    if (audit.status === "completed" || audit.status === "failed") {
      transitions.push({ audit, outcome: audit.status });
    }
  }
  return transitions;
}

export function auditStatuses(
  audits: readonly AuditRow[],
): Map<string, AuditStatus> {
  return new Map(audits.map((audit) => [audit.id, audit.status]));
}
