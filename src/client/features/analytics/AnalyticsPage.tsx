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
import { sort as sortRows } from "remeda";
import { SortableHeader } from "@/client/components/table/SortableHeader";
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
  const [sort, setSort] = React.useState<{ key: string; desc: boolean } | null>(
    null,
  );
  const rows = sortReportRows(result.rows, sort, result.dimensions);

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
                      aria-sort={
                        sort?.key === field
                          ? sort.desc
                            ? "descending"
                            : "ascending"
                          : undefined
                      }
                    >
                      <SortableHeader
                        column={{
                          getIsSorted: (): false | "asc" | "desc" =>
                            sort?.key === field
                              ? sort.desc
                                ? "desc"
                                : "asc"
                              : false,
                          getToggleSortingHandler: () => () =>
                            setSort(
                              sort?.key === field
                                ? { key: field, desc: !sort.desc }
                                : { key: field, desc: !isDimension },
                            ),
                        }}
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
                        {cellValue(field, row[field] ?? null)}
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

/**
 * GA4 rows in the operator's chosen order.
 *
 * Google's own ordering is kept when nothing is chosen -- it is meaningful
 * (each report definition asks for its own `orderBys`), so a default of
 * "sorted by the first column" would throw that away.
 */
function sortReportRows(
  rows: Array<Record<string, string | number | null>>,
  sort: { key: string; desc: boolean } | null,
  dimensions: readonly string[],
) {
  if (!sort) return rows;
  const direction = sort.desc ? -1 : 1;
  const isDimension = dimensions.includes(sort.key);

  return sortRows(rows, (left, right) => {
    const a = left[sort.key] ?? null;
    const b = right[sort.key] ?? null;
    // Absent values sink to the bottom whichever way the column is sorted;
    // a null is not "smaller", it is "not measured".
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    if (isDimension) {
      return direction * String(a).localeCompare(String(b), "tr");
    }
    return direction * (Number(a) - Number(b));
  });
}
