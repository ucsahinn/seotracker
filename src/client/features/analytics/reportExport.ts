import type { ReportResult } from "./ReportView";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";
import type { ReportRow } from "./reportInsights";
import { toCsvRows } from "./ReportTable";
/** Raw numeric cells plus machine-readable scope, identical in CSV and Sheets. */
export function buildReportExport(input: {
  result: ReportResult;
  kind: Ga4ReportKindName;
  organicOnly: boolean;
  rows: ReportRow[];
  filters: string[];
  segmentKey: string | null;
  exactPage?: { host: string; path: string };
  focusedRowKey: string | null;
  sort: { key: string; desc: boolean };
}) {
  const { result, kind, organicOnly, rows } = input;
  const scope = JSON.stringify({
    provider: "Google Analytics 4",
    propertyId: result.propertyId ?? null,
    property: result.propertyDisplayName,
    channel:
      result.channel ??
      (kind === "site_search" ? "all" : organicOnly ? "organic_search" : "all"),
    dates: result.dateRange,
    timeZone: result.propertyTimeZone ?? null,
    currency: result.currencyCode ?? null,
    quality: result.reportMetadata ?? {
      sampled: result.sampled,
      thresholded: result.thresholded,
    },
    warnings: result.warnings ?? [],
    page: result.pageInfo ?? null,
    pageGroup: result.pageGroup ?? null,
    listedRows: result.rows.length,
    exportedRows: rows.length,
    filters: input.filters,
    segment: input.segmentKey,
    exactPage: input.exactPage ?? null,
    focusedRow: input.focusedRowKey,
    sort: input.sort,
  });
  const columns = [...result.dimensions, ...result.metrics];
  return {
    headers: [...columns, "ga4_scope_json"],
    rows: toCsvRows(rows, columns).map((row) => [...row, scope]),
  };
}
