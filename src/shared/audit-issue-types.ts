/**
 * The shapes the issue registry is built from.
 *
 * Their own module so the descriptor table and the lookups can both import
 * them without either importing the other.
 */
export type IssueSeverity = "critical" | "warning" | "info";

export interface AuditIssueDescriptor {
  severity: IssueSeverity;
  title: string;
  explanation: string;
  howToFix: string;
}
