/**
 * Registry of site-audit issue types.
 *
 * Shared between the server (issue engine, MCP tools) and the client
 * (issues UI, CSV export). Each issue row in `audit_issues` references one
 * of these types by id.
 *
 * The ids stay in English because they are stored in the database and read by
 * agents; the prose is what the operator reads, so it is Turkish.
 *
 * Sibling imports here are relative, not `@/`: the badseo harness reaches
 * this module by relative path and its tsconfig declares no path alias, so
 * an `@/` import inside this file breaks that build and not this one.
 */
import { AUDIT_ISSUE_TYPES } from "./audit-issue-table";
import type { AuditIssueDescriptor, IssueSeverity } from "./audit-issue-types";

export { AUDIT_ISSUE_TYPES };

export type { IssueSeverity } from "./audit-issue-types";

export type AuditIssueType = keyof typeof AUDIT_ISSUE_TYPES;

export const ISSUE_SEVERITY_ORDER: Record<IssueSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

const issueRegistry: Record<string, AuditIssueDescriptor> = AUDIT_ISSUE_TYPES;

export function getIssueDescriptor(
  issueType: string,
): AuditIssueDescriptor | null {
  return issueRegistry[issueType] ?? null;
}

/**
 * The severity of a stored issue row.
 *
 * `audit_issues.severity` is written from this registry at insert time, so
 * the two agree until the registry changes -- and this is self-hosted
 * software that gets upgraded. Six consumers were split between the two
 * sources: the issues screen, the results stat row and the CSV export read
 * the descriptor, while the JSON export, the dashboard card, the freshness
 * card and the MCP tool read the stored column. Promote one issue type from
 * `warning` to `critical` in a release and the same audit reported both,
 * from one button on one screen.
 *
 * The registry wins, because it is what the operator is reading today. The
 * stored value is the fallback for a type the registry no longer knows, and
 * anything outside the three known values becomes `info` rather than an
 * undefined index into `ISSUE_SEVERITY_ORDER` -- which turned a comparator
 * into `NaN` and silently dropped the "critical rows survive truncation"
 * guarantee.
 */
export function resolveIssueSeverity(issue: {
  issueType: string;
  severity: string;
}): IssueSeverity {
  const descriptor = getIssueDescriptor(issue.issueType);
  if (descriptor) return descriptor.severity;
  return issue.severity === "critical" || issue.severity === "warning"
    ? issue.severity
    : "info";
}
