import { ga4ColumnHelp } from "@/client/features/analytics/metricHelp";
import * as React from "react";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { UrlCell } from "@/client/components/table/UrlCell";
import {
  compareText,
  type useLocalSort,
} from "@/client/components/table/useLocalSort";
import { ga4ValueLabel } from "@/client/features/analytics/ga4ValueLabels";
import type { ReportRow } from "@/client/features/analytics/reportInsights";
import type { CsvValue } from "@/client/lib/csv";
import {
  formatCount,
  formatMoney,
  formatPercent,
  formatDuration,
  formatDecimal,
} from "@/client/lib/format";
import {
  GA4_FIELD_LABELS,
  GA4_MONEY_FIELDS,
  GA4_RATE_FIELDS,
} from "@/shared/ga4-reports";

import { t } from "@/shared/i18n";

export function columnLabel(field: string): string {
  return field === "userEngagementDuration"
    ? t("Toplam etkileşim süresi")
    : (GA4_FIELD_LABELS[field] ?? field);
}

/** Money in the property's currency, rates as percentages, the rest as counts. */
export function formatGa4Metric(
  field: string,
  value: number,
  currencyCode: string | null,
): string {
  if (field === "userEngagementDuration") return formatDuration(value * 1000);
  if (GA4_MONEY_FIELDS.has(field))
    return currencyCode
      ? formatMoney(value, currencyCode)
      : t("{value} (para birimi bilinmiyor)", { value: formatDecimal(value) });
  if (GA4_RATE_FIELDS.has(field)) return formatPercent(value);
  return formatCount(value);
}

/** A metric through `formatGa4Metric`; strings pass through. */
function cellValue(
  field: string,
  value: string | number | null,
  currencyCode: string | null,
): React.ReactNode {
  // "-" in `text-subtle`, matching `MetricTile` and the opportunity table.
  if (value === null || value === "") {
    return <span className="text-subtle">-</span>;
  }
  if (typeof value === "string") return ga4ValueLabel(field, value);
  return formatGa4Metric(field, value, currencyCode);
}

/** One GA4 cell against another, ascending; `useLocalSort` applies direction. */
export function compareReportCells(
  a: string | number | null,
  b: string | number | null,
  isDimension: boolean,
  descending = false,
): number {
  // Absent sinks to the bottom whichever way the column is sorted.
  if (a === null && b === null) return 0;
  if (a === null) return descending ? -1 : 1;
  if (b === null) return descending ? 1 : -1;
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
  currencyCode,
}: {
  rows: ReportRow[];
  columns: string[];
  dimensionCount: number;
  currencyCode: string | null;
  sorting: ReturnType<typeof useLocalSort<string>>;
}) {
  return (
    <div
      id="analytics-table"
      className="overflow-x-auto rounded-box border border-base-300 bg-base-100"
      role="region"
      aria-label={t("Raporlar")}
      tabIndex={0}
    >
      <table className="table table-sm">
        <thead>
          <tr>
            {columns.map((field, index) => {
              const isDimension = index < dimensionCount;
              return (
                <th
                  key={field}
                  className={
                    index >= dimensionCount + 2
                      ? "hidden text-right sm:table-cell"
                      : isDimension
                        ? ""
                        : "text-right"
                  }
                  aria-sort={sorting.ariaSort(field)}
                >
                  <SortableHeader
                    column={sorting.column(field, !isDimension)}
                    label={columnLabel(field)}
                    helpText={ga4ColumnHelp(field)}
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
                        ? "max-w-40 whitespace-normal break-all align-top sm:max-w-md sm:truncate"
                        : index >= dimensionCount + 2
                          ? "hidden text-right tabular-nums align-top sm:table-cell"
                          : "text-right tabular-nums align-top"
                    }
                    title={isDimension ? String(row[field] ?? "") : undefined}
                  >
                    {target ? (
                      <UrlCell url={target} label={String(row[field] ?? "")} />
                    ) : (
                      cellValue(field, row[field] ?? null, currencyCode)
                    )}
                    {index === 0 && columns.length > dimensionCount + 2 ? (
                      <details className="mt-2 sm:hidden">
                        <summary className="min-h-11 cursor-pointer py-3 text-xs text-muted">
                          {t("Diğer ölçümler")}
                        </summary>
                        <dl className="space-y-2 text-xs">
                          {columns.slice(dimensionCount + 2).map((metric) => (
                            <div key={metric}>
                              <dt className="text-muted">
                                {columnLabel(metric)}
                              </dt>
                              <dd>
                                {cellValue(
                                  metric,
                                  row[metric] ?? null,
                                  currencyCode,
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    ) : null}
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
