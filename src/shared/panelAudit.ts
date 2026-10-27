import { siteKey } from "./auditTodo";
/** A single age boundary for readiness, tasks and the audit snapshot. */
export function auditIsStale(startedAt: number, now: number): boolean {
  return !Number.isFinite(startedAt) || now - startedAt >= 7 * 86_400_000;
}
/** Input is repository history, newest first. No domain means no selected site. */
export function selectPanelAudits<
  T extends { startUrl: string; status: string },
>(audits: readonly T[], domain: string | null) {
  const host = domain
    ? siteKey(domain.includes("://") ? domain : "https://" + domain).split(
        "/",
      )[0]
    : null;
  const own = host
    ? audits.filter((a) => siteKey(a.startUrl).split("/")[0] === host)
    : [];
  return {
    latestAttempt: own[0] ?? null,
    snapshot: own.find((a) => a.status === "completed") ?? null,
  };
}

/** Count each unit independently: one page can fail several checks. */
export function panelFindingCounts(
  issues: readonly {
    pageId: string | null;
    pageUrl: string;
    issueType: string;
    severity: "critical" | "warning" | "info";
  }[],
) {
  const severityTotals = { critical: 0, warning: 0, info: 0 };
  const siteSeverityTotals = { critical: 0, warning: 0, info: 0 };
  const severityCheckTypes = { critical: 0, warning: 0, info: 0 };
  for (const severity of ["critical", "warning", "info"] as const) {
    const rows = issues.filter((row) => row.severity === severity);
    severityTotals[severity] = new Set(
      rows
        .filter((row) => row.pageId !== null)
        .map((row) => JSON.stringify([row.pageUrl, row.issueType])),
    ).size;
    siteSeverityTotals[severity] = new Set(
      rows.filter((row) => row.pageId === null).map((row) => row.issueType),
    ).size;
    severityCheckTypes[severity] = new Set(
      rows.map((row) => row.issueType),
    ).size;
  }
  return {
    affectedPages: new Set(
      issues.filter((row) => row.pageId !== null).map((row) => row.pageUrl),
    ).size,
    failedCheckTypes: new Set(issues.map((row) => row.issueType)).size,
    severityTotals,
    siteSeverityTotals,
    severityCheckTypes,
  };
}
