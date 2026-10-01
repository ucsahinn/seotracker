import * as React from "react";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { UrlCell } from "@/client/components/table/UrlCell";
import {
  compareText,
  type useLocalSort,
} from "@/client/components/table/useLocalSort";
import type { ReportRow } from "@/client/features/analytics/reportInsights";
import type { CsvValue } from "@/client/lib/csv";
import { formatCount, formatPercent } from "@/client/lib/format";
import { GA4_FIELD_LABELS, GA4_RATE_FIELDS } from "@/shared/ga4-reports";

export function columnLabel(field: string): string {
  return GA4_FIELD_LABELS[field] ?? field;
}

/** Rates as percentages, everything else as a count. Strings pass through. */
function cellValue(
  field: string,
  value: string | number | null,
): React.ReactNode {
  // "-" in `text-subtle`, matching `MetricTile` and the opportunity table.
  if (value === null || value === "") {
    return <span className="text-subtle">-</span>;
  }
  if (typeof value === "string") return value;
  if (GA4_RATE_FIELDS.has(field)) return formatPercent(value);
  return formatCount(value);
}

/** One GA4 cell against another, ascending; `useLocalSort` applies direction. */
export function compareReportCells(
  a: string | number | null,
  b: string | number | null,
  isDimension: boolean,
): number {
  // Absent sinks to the bottom whichever way the column is sorted.
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (isDimension) return compareText(String(a), String(b));
  return Number(a) - Number(b);
}

const PATH_DIMENSIONS = new Set(["landingPage", "pagePath"]);

/** A full address for a path cell: GA4 reports host and path separately. */
function urlFor(field: string, row: ReportRow): string | null {
  if (!PATH_DIMENSIONS.has(field)) return null;
  const path = row[field];
  const host = row["hostName"];
  if (typeof path !== "string" || typeof host !== "string") return null;
  if (!path.startsWith("/") || !host) return null;
  return `https://${host}${path}`;
}

export function toCsvRows(rows: ReportRow[], columns: string[]): CsvValue[][] {
  return rows.map((row) => columns.map((field) => row[field] ?? null));
}

/** The report's rows as a sortable table. Sort state is the caller's. */
export function ReportTable({
  rows,
  columns,
  dimensionCount,
  sorting,
}: {
  rows: ReportRow[];
  columns: string[];
  dimensionCount: number;
  sorting: ReturnType<typeof useLocalSort<string>>;
}) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
      <table className="table table-sm">
        <thead>
          <tr>
            {columns.map((field, index) => {
              const isDimension = index < dimensionCount;
              return (
                <th
                  key={field}
                  className={isDimension ? "" : "text-right"}
                  aria-sort={sorting.ariaSort(field)}
                >
                  <SortableHeader
                    column={sorting.column(field, !isDimension)}
                    label={columnLabel(field)}
                    align={isDimension ? "left" : "right"}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((field, index) => {
                const isDimension = index < dimensionCount;
                const target = urlFor(field, row);
                return (
                  <td
                    key={field}
                    className={
                      isDimension
                        ? "max-w-md truncate"
                        : "text-right tabular-nums"
                    }
                    title={isDimension ? String(row[field] ?? "") : undefined}
                  >
                    {target ? (
                      <UrlCell url={target} label={String(row[field] ?? "")} />
                    ) : (
                      cellValue(field, row[field] ?? null)
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
