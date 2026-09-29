import {
  ISSUE_SEVERITY_ORDER,
  type IssueSeverity,
} from "@/shared/audit-issues";
import {
  compareNullable,
  compareText,
} from "@/client/components/table/useLocalSort";

/*
 * The five fields the comparison reads, rather than the whole issue. Taking
 * `LighthouseIssue` would make every test of this assemble a ten-field
 * fixture to exercise two of them.
 */
type SortableIssue = {
  severity: IssueSeverity;
  title: string;
  score: number | null;
  impactMs: number | null;
  impactBytes: number | null;
};

export type LighthouseSortKey = "severity" | "title" | "impact" | "score";

/**
 * The ascending comparison for each column; `useLocalSort` applies the
 * direction, so this never has to think about which way round it is.
 *
 * Impact is one column carrying two units -- Lighthouse reports a saving in
 * milliseconds, in bytes, or in both. Ranking them against each other would
 * be comparing seconds to kilobytes, so time leads: a render-blocking
 * request costs every visitor a wait, while an oversized image costs them
 * bandwidth they may not be paying for.
 */
export function compareIssues(
  a: SortableIssue,
  b: SortableIssue,
  key: LighthouseSortKey,
): number {
  if (key === "title") return compareText(a.title, b.title);

  if (key === "severity") {
    const order =
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity];
    // Within one severity the biggest saving leads, which is the order the
    // list is actually read in.
    return order !== 0 ? order : -compareImpact(a, b);
  }

  if (key === "score") {
    const nulls = compareNullable(a.score, b.score, 1);
    return nulls ?? (a.score ?? 0) - (b.score ?? 0);
  }

  return compareImpact(a, b);
}

function compareImpact(a: SortableIssue, b: SortableIssue): number {
  const byTime = (a.impactMs ?? 0) - (b.impactMs ?? 0);
  if (byTime !== 0) return byTime;
  return (a.impactBytes ?? 0) - (b.impactBytes ?? 0);
}
