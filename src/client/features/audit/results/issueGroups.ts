import {
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";
import { sort } from "remeda";
import type { AuditResultsData } from "@/client/features/audit/results/types";

export type AuditIssueRow = AuditResultsData["issues"][number];

export const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

export interface IssueGroup {
  issueType: string;
  severity: IssueSeverity;
  title: string;
  explanation: string;
  howToFix: string;
  issues: AuditIssueRow[];
  /**
   * Distinct pages, not rows.
   *
   * Link-level checks write one row per occurrence -- a page with eight
   * broken links is eight rows -- so printing `issues.length` as "N sayfa"
   * inflated a single page's problem eightfold against the dashboard card
   * the operator had just clicked through from. The repository that every
   * other consumer reads counts `countDistinct(pageUrl)` and says so.
   */
  pageCount: number;
  /** The distinct page addresses, in first-seen order. */
  pageUrls: string[];
}

export function groupIssues(issues: AuditIssueRow[]): IssueGroup[] {
  const groups = new Map<string, IssueGroup>();
  for (const issue of issues) {
    let group = groups.get(issue.issueType);
    if (!group) {
      const descriptor = getIssueDescriptor(issue.issueType);
      group = {
        issueType: issue.issueType,
        severity: resolveIssueSeverity(issue),
        title: descriptor?.title ?? issue.issueType,
        explanation: descriptor?.explanation ?? "",
        howToFix: descriptor?.howToFix ?? "",
        issues: [],
        pageCount: 0,
        pageUrls: [],
      };
      groups.set(issue.issueType, group);
    }
    group.issues.push(issue);
  }

  for (const group of groups.values()) {
    group.pageUrls = [...new Set(group.issues.map((issue) => issue.pageUrl))];
    group.pageCount = group.pageUrls.length;
  }

  return sort(
    Array.from(groups.values()),
    (a, b) =>
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
      // Ordered by pages affected, matching what the row now claims. Rows
      // would put one page with eight broken links above eight pages with
      // one problem each.
      b.pageCount - a.pageCount,
  );
}

/** Findings, not pages: the ring counts records. */
export function countBySeverity(
  groups: IssueGroup[],
): Record<IssueSeverity, number> {
  const counts = { critical: 0, warning: 0, info: 0 };
  for (const group of groups) counts[group.severity] += group.issues.length;
  return counts;
}

/** What the donut and the workload bars narrowed the list to. */
export function applyIssueFilters(
  groups: IssueGroup[],
  filters: { severity: IssueSeverity | null; issueType: string | null },
): IssueGroup[] {
  return groups.filter(
    (group) =>
      (filters.severity === null || group.severity === filters.severity) &&
      (filters.issueType === null || group.issueType === filters.issueType),
  );
}
