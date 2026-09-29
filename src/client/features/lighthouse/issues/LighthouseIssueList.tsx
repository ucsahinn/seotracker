/**
 * The issue table.
 *
 * Split out of `LighthouseIssuesParts` when that file crossed its line
 * ceiling; it was the only part of it that is a table rather than a control.
 */
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import { LighthouseIssueRow } from "./LighthouseIssueRow";
import { compareIssues, type LighthouseSortKey } from "./lighthouseIssueSort";
import type { LighthouseIssue } from "./types";

export function LighthouseIssueList({
  issues,
  isLoading,
  emptyMessage,
}: {
  issues: LighthouseIssue[];
  isLoading: boolean;
  emptyMessage?: string;
}) {
  /*
   * Severity first, then impact within it -- the order an operator reads the
   * list in. Sorting by "Etki" is the reason this exists: that column holds
   * the millisecond and byte cost of each audit, and the list arrived in
   * whatever order the server produced, so "biggest saving first" was not a
   * question the screen could answer.
   */
  const sorting = useLocalSort<LighthouseSortKey>({
    key: "severity",
    desc: false,
  });
  const sorted = sorting.apply(issues, compareIssues);

  if (isLoading) {
    /* Shaped like the rows that are coming, per the house rule. */
    return (
      <div className="space-y-2" aria-busy>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="skeleton h-12" />
        ))}
      </div>
    );
  }
  if (!issues.length) {
    return (
      <p className="text-sm text-muted">
        {emptyMessage ?? "Bu kategoride işlem gerektiren sorun yok."}
      </p>
    );
  }
  return (
    <table className="table table-sm w-full table-fixed">
      <colgroup>
        <col className="w-8" />
        <col className="w-24" />
        <col />
        <col className="w-28 hidden sm:table-column" />
        <col className="w-28 hidden md:table-column" />
        <col className="w-14" />
      </colgroup>
      <thead>
        <tr className="text-xs text-muted uppercase tracking-wide border-b border-base-300">
          <th />
          <th className="font-medium" aria-sort={sorting.ariaSort("severity")}>
            <SortableHeader
              column={sorting.column("severity", false)}
              label="Önem"
            />
          </th>
          <th className="font-medium" aria-sort={sorting.ariaSort("title")}>
            <SortableHeader
              column={sorting.column("title", false)}
              label="Sorun"
            />
          </th>
          <th className="font-medium hidden sm:table-cell">Kategori</th>
          <th
            className="font-medium hidden md:table-cell text-right"
            aria-sort={sorting.ariaSort("impact")}
          >
            <SortableHeader
              column={sorting.column("impact")}
              label="Etki"
              align="right"
            />
          </th>
          <th
            className="font-medium text-right"
            aria-sort={sorting.ariaSort("score")}
          >
            <SortableHeader
              column={sorting.column("score", false)}
              label="Puan"
              align="right"
            />
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-base-300/60">
        {sorted.map((issue, issueIndex) => (
          <LighthouseIssueRow
            key={`${issue.category}-${issue.auditKey}-${issueIndex}`}
            issue={issue}
          />
        ))}
      </tbody>
    </table>
  );
}
