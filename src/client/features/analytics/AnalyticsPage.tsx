import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { OrganicTrendPanel } from "@/client/features/analytics/OrganicTrendPanel";
import { MeasurementHealthPanel } from "@/client/features/analytics/MeasurementHealthPanel";
import { formatCount, formatDate, formatPercent } from "@/client/lib/format";
import { getGa4Report } from "@/serverFunctions/ga4Reports";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { UrlCell } from "@/client/components/table/UrlCell";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import {
  GA4_FIELD_LABELS,
  GA4_RATE_FIELDS,
  GA4_REPORT_KINDS,
  GA4_REPORT_LABELS,
  type Ga4ReportKindName,
} from "@/shared/ga4-reports";

type Channel = "organic_search" | "all";
/** Matches the windows Search Performance offers, so the two read alike. */
type WindowDays = 7 | 28 | 90;
const WINDOWS: { value: WindowDays; label: string }[] = [
  { value: 7, label: "Son 7 gün" },
  { value: 28, label: "Son 28 gün" },
  { value: 90, label: "Son 3 ay" },
];

/** Matches the ceiling `ga4Reports`' schema enforces. */
const ROW_LIMITS = [50, 100, 200] as const;

const CHANNELS: { value: Channel; label: string }[] = [
  { value: "organic_search", label: "Organik arama" },
  { value: "all", label: "Tüm trafik" },
];

function columnLabel(field: string): string {
  return GA4_FIELD_LABELS[field] ?? field;
}

/** Rates as percentages, everything else as a count. Strings pass through. */
function cellValue(field: string, value: string | number | null): string {
  if (value === null || value === "") return "—";
  if (typeof value === "string") return value;
  if (GA4_RATE_FIELDS.has(field)) return formatPercent(value);
  return formatCount(value);
}

/**
 * The seven Google Analytics reports.
 *
 * The engine behind these has existed since the fork began and only an agent
 * could reach it — seven MCP tools, no screen. The columns come from the
 * report definition rather than being hard-coded per report, which is why one
 * table serves all seven.
 */
/*
 * The setup check rides in the same strip as the seven reports rather than
 * taking its own route. It is an Analytics view, one nav entry is enough,
 * and this repo's own trap is a route with no nav entry: `getProjectNavGroups`
 * names paths one by one, so a new page orphans silently.
 */
const HEALTH = "measurement_health";
type View = Ga4ReportKindName | typeof HEALTH;

export function AnalyticsPage({
  projectId,
  windowDays,
  onWindowChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  windowDays: WindowDays;
  onWindowChange: (days: WindowDays) => void;
}) {
  const [view, setView] = React.useState<View>("landing_pages");
  const [channel, setChannel] = React.useState<Channel>("organic_search");
  /*
   * The page was pinned to 28 days with no control, while the server
   * function had accepted a range all along -- so the one question an
   * Analytics screen exists for, "is this better or worse than before",
   * could not be asked.
   */
  const kind = view === HEALTH ? "landing_pages" : view;
  /*
   * The row cap was a literal 50 with no control, over a report that says
   * "50 / 800 satır" right above the table -- so the screen named 750 rows
   * the operator had no way to reach. 200 is the server's own ceiling.
   */
  const [rowLimit, setRowLimit] = React.useState<(typeof ROW_LIMITS)[number]>(
    ROW_LIMITS[0],
  );

  const reportQuery = useQuery({
    queryKey: ["ga4Report", projectId, kind, channel, windowDays, rowLimit],
    queryFn: () =>
      getGa4Report({
        data: { projectId, kind, channel, windowDays, limit: rowLimit },
      }),
    enabled: view !== HEALTH,
  });
  const result = reportQuery.data;

  return (
    <PageShell>
      <PageHeader
        title="Analytics raporları"
        description={
          view === HEALTH
            ? "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulumunu okur, rapor verisi harcamaz."
            : GA4_REPORT_LABELS[kind].description
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          group="ga4-report"
          value={view}
          onChange={setView}
          items={[
            ...GA4_REPORT_KINDS.map((value) => ({
              id: value as View,
              label: GA4_REPORT_LABELS[value].label,
            })),
            { id: HEALTH as View, label: "Ölçüm durumu" },
          ]}
        />

        {/* A pick-one filter, not a second tab strip: it narrows the report
            the tabs above chose rather than swapping the panel. Gone on the
            setup-check tab, where it used to flip its own active state and
            change nothing -- a control that visibly responds and has no
            effect is worse than a disabled one. */}
        {view === HEALTH ? null : (
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-muted">
              <span className="whitespace-nowrap">Satır</span>
              <select
                className="select select-bordered select-sm w-20"
                value={rowLimit}
                onChange={(event) => {
                  const next = ROW_LIMITS.find(
                    (option) => String(option) === event.target.value,
                  );
                  if (next) setRowLimit(next);
                }}
              >
                {ROW_LIMITS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <select
              className="select select-bordered select-sm w-32"
              value={windowDays}
              onChange={(event) => {
                const next = WINDOWS.find(
                  (option) => String(option.value) === event.target.value,
                );
                if (next) onWindowChange(next.value);
              }}
              aria-label="Tarih aralığı"
            >
              {WINDOWS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="join" role="radiogroup" aria-label="Kanal">
              {CHANNELS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={option.value === channel}
                  className={`btn join-item btn-sm ${
                    option.value === channel ? "btn-active" : ""
                  }`}
                  onClick={() => setChannel(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <TabPanel group="ga4-report" value={view} className="space-y-4">
        {/* The report query keeps its last result while the health tab is
            open, so without this branch the two panels stacked and the page
            said "Google Analytics bağlı değil" twice. */}
        {view === HEALTH ? (
          <MeasurementHealthPanel projectId={projectId} />
        ) : (
          <>
            {/* The window's shape, above whichever report lists it. Its own
                query, so a slow overview never holds up the table. */}
            <OrganicTrendPanel projectId={projectId} windowDays={windowDays} />
            {reportQuery.isPending ? (
              <div className="space-y-2" aria-busy>
                <div className="skeleton h-10" />
                <div className="skeleton h-64" />
              </div>
            ) : null}

            {reportQuery.isError ? (
              <QueryErrorState
                error={reportQuery.error}
                onRetry={() => void reportQuery.refetch()}
                title="Rapor alınamadı"
              />
            ) : null}

            {result?.status === "needs_ga4" ? (
              <div className="rounded-box border border-base-300 bg-base-100">
                <EmptyState
                  icon={BarChart3}
                  title="Google Analytics bağlı değil"
                  description="Bu raporlar GA4 mülkünüzden gelir. Proje ayarlarındaki Entegrasyonlar sekmesinden bağlayın."
                />
              </div>
            ) : null}

            {result?.status === "ok" ? <ReportTable result={result} /> : null}
          </>
        )}
      </TabPanel>
    </PageShell>
  );
}

function ReportTable({
  result,
}: {
  result: Extract<Awaited<ReturnType<typeof getGa4Report>>, { status: "ok" }>;
}) {
  const columns = [...result.dimensions, ...result.metrics];
  /*
   * Sortable. Seven GA4 reports rendered in whatever order Google returned,
   * so "which landing page converts worst" could not be asked on the screen
   * built to answer it. Dimensions sort as text, metrics as numbers, and a
   * first click on a metric sorts it biggest-first -- the same convention
   * the opportunity and search-performance tables use.
   */
  const sorting = useLocalSort<string>({ key: "", desc: true });
  const rows = sorting.sort.key
    ? sorting.apply(result.rows, (a, b, key) =>
        compareReportCells(
          a[key] ?? null,
          b[key] ?? null,
          result.dimensions.includes(key),
        ),
      )
    : // Google's own ordering when nothing is chosen: each report definition
      // asks for its own `orderBys`, so defaulting to a column would throw
      // a meaningful order away.
      result.rows;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">
        {result.propertyDisplayName ?? "GA4 mülkü"} ·{" "}
        {formatDate(result.dateRange.startDate)} –{" "}
        {formatDate(result.dateRange.endDate)} ·{" "}
        {/* Both numbers. This printed the dataset size above a table
            holding at most 50 rows, so a property with 800 landing pages
            said "800 satır" over fifty of them. */}
        {result.rowCount < result.totalRowCount
          ? `${formatCount(result.rowCount)} / ${formatCount(result.totalRowCount)} satır`
          : `${formatCount(result.totalRowCount)} satır`}
        {result.sampled ? " · örneklenmiş" : ""}
        {/* Google withholds rows below its own privacy threshold; a total
            that looks short is often this rather than missing traffic. */}
        {result.thresholded ? " · eşik altı satırlar gizlendi" : ""}
      </p>

      {/*
       * Export, which this screen -- the densest tabular data in the app --
       * was the only one without. The rows are the ones on screen, in the
       * order on screen, so a download matches what was exported from.
       */}
      {result.rows.length > 0 ? (
        <div className="flex justify-end">
          <TableExportMenu
            buttonClassName="btn btn-ghost btn-sm gap-1"
            actions={[
              {
                label: `Sheets'e aktar (${formatCount(rows.length)} satır)`,
                onClick: () =>
                  void exportTableToSheets({
                    headers: columns.map(columnLabel),
                    rows: toCsvRows(rows, columns),
                    feature: "ga4_report",
                  }),
              },
              {
                label: `CSV (${formatCount(rows.length)} satır)`,
                onClick: () =>
                  downloadCsv(
                    "analytics.csv",
                    buildCsv(
                      columns.map(columnLabel),
                      toCsvRows(rows, columns),
                    ),
                  ),
              },
            ]}
          />
        </div>
      ) : null}

      {result.rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={BarChart3}
            title="Bu dönemde veri yok"
            description={
              result.emptyReason
                ? `Google bir satır döndürmedi (${result.emptyReason}).`
                : "Google bu aralık için satır döndürmedi. Mülk yeni bağlandıysa veriler birkaç gün sonra görünür."
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table table-sm">
            <thead>
              <tr>
                {columns.map((field, index) => {
                  const isDimension = index < result.dimensions.length;
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
                    const isDimension = index < result.dimensions.length;
                    const target = urlFor(field, row);
                    return (
                      <td
                        key={field}
                        className={
                          isDimension
                            ? "max-w-md truncate"
                            : "text-right tabular-nums"
                        }
                        title={
                          isDimension ? String(row[field] ?? "") : undefined
                        }
                      >
                        {/* Reachable, like every other URL column in the
                            app. These were truncated strings with a tooltip
                            -- no open, no copy, no way through. */}
                        {target ? (
                          <UrlCell
                            url={target}
                            label={String(row[field] ?? "")}
                          />
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
      )}
    </div>
  );
}

/** One GA4 cell against another, ascending; `useLocalSort` applies direction. */
function compareReportCells(
  a: string | number | null,
  b: string | number | null,
  isDimension: boolean,
): number {
  // Absent sinks to the bottom whichever way the column is sorted: a null is
  // not "smaller", it is "not measured".
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (isDimension) return compareText(String(a), String(b));
  return Number(a) - Number(b);
}

/** The GA4 dimensions that are paths, and the one that carries their host. */
const PATH_DIMENSIONS = new Set(["landingPage", "pagePath"]);

/**
 * A full address for a path cell, or null when it is not one.
 *
 * GA4 reports the path and the host as separate dimensions, so neither is a
 * link on its own -- which is why these cells were dead text. Both reports
 * that carry a path ask for `hostName` beside it, so joining them is the
 * whole job.
 */
function urlFor(
  field: string,
  row: Record<string, string | number | null>,
): string | null {
  if (!PATH_DIMENSIONS.has(field)) return null;
  const path = row[field];
  const host = row["hostName"];
  if (typeof path !== "string" || typeof host !== "string") return null;
  if (!path.startsWith("/") || !host) return null;
  return `https://${host}${path}`;
}

/** The rendered values, so an export reads like the table it came from. */
function toCsvRows(
  rows: Array<Record<string, string | number | null>>,
  columns: string[],
): CsvValue[][] {
  return rows.map((row) => columns.map((field) => row[field] ?? null));
}
