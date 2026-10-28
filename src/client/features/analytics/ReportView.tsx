import { sortBy } from "remeda";
import { FilterX } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { HelpTip } from "@/client/components/HelpTip";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import { ReportEmptyState } from "@/client/features/analytics/ReportEmptyState";
import { ReportSummary } from "@/client/features/analytics/ReportSummary";
import {
  columnLabel,
  compareReportCells,
  ReportTable,
} from "@/client/features/analytics/ReportTable";
import {
  applyChips,
  applySegment,
  availableChips,
  reportIdentity,
  type ChipId,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import { buildKpis } from "@/client/features/analytics/reportKpis";
import { buildSummary } from "@/client/features/analytics/reportBuckets";
import { buildCsv, downloadCsv } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { formatCount, formatDate } from "@/client/lib/format";
import { WeakConversionTile } from "./WeakConversionTile";
import { buildReportExport } from "./reportExport";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";
import type { Ga4ReportMetadata } from "@/server/features/ga4/services/Ga4ReportNormalization";
import { AnalyticsEvidence } from "./AnalyticsEvidence";
import { AnalyticsPageScope } from "./AnalyticsPageScope";
import { t } from "@/shared/i18n";

export type ReportResult = {
  fetchedAt?: string;
  propertyDisplayName: string | null;
  dateRange: { startDate: string; endDate: string };
  dimensions: string[];
  metrics: string[];
  rows: ReportRow[];
  rowCount: number;
  totalRowCount: number;
  sampled: boolean;
  thresholded: boolean;
  emptyReason: string | null;
  /** The property's currency; revenue columns are money in it. */
  currencyCode?: string | null;
  activityStatus?: "detected" | "none" | "unknown" | null;
  diagnosticCoverage?: {
    complete: boolean;
    limitedData: boolean;
    fetchedRowCount: number;
    totalRowCount: number;
  } | null;
  propertyId?: string;
  propertyTimeZone?: string | null;
  channel?: string;
  reportMetadata?: Ga4ReportMetadata;
  warnings?: string[];
  requestedDateRange?: { startDate: string; endDate: string } | null;
  pageGroup?: {
    key: string;
    complete: boolean;
    sourceTotalRowCount: number;
    sourceFetchedRowCount: number;
  } | null;
  pageInfo?: {
    offset: number;
    limit: number;
    hasMore: boolean;
    nextOffset: number | null;
  };
  diagnostics?: Array<{
    code: string;
    sessions: number | null;
    share: number | null;
    totalSessions: number | null;
  }>;
};

/**
 * One report: its own summary, quick chips, and the sortable table.
 *
 * Filter state lives here and the parent keys this component by report and
 * window, so a filter chosen on one tab can never silently narrow another.
 */
export function ReportView({
  kind,
  result,
  organicOnly,
  onOrganicOnlyChange,
  onOpenHealth,
  exactPage,
  onClearPageGroup,
  onClearExactPage,
  configurationState = "unknown",
}: {
  kind: Ga4ReportKindName;
  exactPage?: { host: string; path: string };
  onClearPageGroup?: () => void;
  onClearExactPage?: () => void;
  configurationState?: "configured" | "none" | "unknown";
  result: ReportResult;
  organicOnly: boolean;
  onOrganicOnlyChange: (next: boolean) => void;
  /** Switches to the setup check; offered where a property setting explains an empty tab. */
  onOpenHealth?: () => void;
}) {
  // Hide the repeated host in a single-host table; exports keep it.
  const singleHost =
    result.dimensions.includes("hostName") &&
    new Set(result.rows.map((row) => row["hostName"])).size <= 1;
  const shownDimensions = singleHost
    ? result.dimensions.filter((field) => field !== "hostName")
    : result.dimensions;
  const shownColumns = [...shownDimensions, ...result.metrics];
  const sorting = useLocalSort<string>({ key: "", desc: true });
  const [activeChips, setActiveChips] = React.useState<ChipId[]>([]);
  const [segmentKey, setSegmentKey] = React.useState<string | null>(null);
  const [focusedRowKey, setFocusedRowKey] = React.useState<string | null>(null);
  const filtersRef = React.useRef<HTMLDivElement>(null);

  const plan = buildSummary(kind, result.dimensions, result.rows, columnLabel);
  const segment =
    plan?.segments.find((item) => item.key === segmentKey) ?? null;
  const chips = availableChips(result.metrics, result.rows, {
    limited:
      result.reportMetadata?.hasLimitedData ||
      result.warnings?.includes("property_time_zone_changed") ||
      result.sampled ||
      result.thresholded,
    configurationState,
  });
  const scope = t("Listelenen {count} satırda", {
    count: result.rows.length,
  });
  const weakChip = chips.find(
    (chip) => chip.id === "weakConversion" && !chip.disabledReason,
  );
  const candidate = sortBy(
    result.rows.filter((row) => weakChip?.test(row)),
    [(row) => Number(row.sessions), "desc"],
    [(row) => Number(row.sessionKeyEventRate), "asc"],
    (row) => reportIdentity(row, "landingPage"),
  )[0];
  const kpis = buildKpis(
    kind,
    result.rows,
    scope,
    result.currencyCode ?? null,
  ).map((kpi) => ({
    ...kpi,
    hint: [scope, kpi.hint && kpi.hint !== scope ? kpi.hint : null]
      .filter(Boolean)
      .join(" · "),
  }));

  // A chip the data no longer offers must neither narrow nor count.
  const appliedChips = activeChips.filter((id) =>
    chips.some((chip) => chip.id === id),
  );
  const filtered = applyChips(
    (plan
      ? applySegment(result.rows, plan.dimension, segment)
      : result.rows
    ).filter(
      (row) =>
        !exactPage ||
        (row.hostName === exactPage.host && row.landingPage === exactPage.path),
    ),
    chips,
    appliedChips,
  );
  const focused = focusedRowKey
    ? filtered.filter(
        (row) => reportIdentity(row, "landingPage") === focusedRowKey,
      )
    : filtered;
  const rows = sorting.sort.key
    ? sorting.apply(focused, (a, b, key) =>
        compareReportCells(
          a[key] ?? null,
          b[key] ?? null,
          result.dimensions.includes(key),
          sorting.sort.desc,
        ),
      )
    : // Google's own ordering when nothing is chosen.
      focused;
  const isFiltered =
    appliedChips.length > 0 || segment !== null || focusedRowKey !== null;

  const clearFilters = () => {
    // The clicked button unmounts with the filters; keep focus in the group.
    filtersRef.current?.focus();
    setActiveChips([]);
    setSegmentKey(null);
    setFocusedRowKey(null);
    if (exactPage) onClearExactPage?.();
  };

  const { headers: exportHeaders, rows: exportRows } = buildReportExport({
    result,
    kind,
    organicOnly,
    rows,
    filters: appliedChips,
    segmentKey: segment?.key ?? null,
    exactPage,
    focusedRowKey,
    sort: sorting.sort,
  });
  const pageScope = (
    <AnalyticsPageScope
      pageGroup={result.pageGroup}
      exactPage={exactPage}
      onClearPageGroup={onClearPageGroup}
      onClearExactPage={onClearExactPage}
    />
  );
  if (result.rows.length === 0) {
    return (
      <div className="space-y-3" id="analytics-report">
        <AnalyticsEvidence result={result} onOpenHealth={onOpenHealth} />
        {pageScope}
        <ReportEmptyState
          pageGroup={Boolean(result.pageGroup)}
          kind={kind}
          organicOnly={organicOnly}
          emptyReason={result.emptyReason}
          onShowAllTraffic={() => onOrganicOnlyChange(false)}
          onOpenHealth={onOpenHealth}
        />
      </div>
    );
  }
  return (
    <div className="space-y-3" id="analytics-report">
      <AnalyticsEvidence result={result} onOpenHealth={onOpenHealth} />
      <p role="status" className="text-xs text-muted">
        {scope} ·{" "}
        {t(
          "Filtreleme, sıralama ve dışa aktarma bu sayfadaki satırları kapsar.",
        )}{" "}
        {t("{shown} / {count} satır", {
          shown: formatCount(rows.length),
          count: result.rows.length,
        })}
      </p>
      {pageScope}
      <ReportSummary
        plan={plan}
        kpis={kpis}
        selectedKey={segment ? segment.key : null}
        onSelect={setSegmentKey}
        currencyCode={result.currencyCode ?? null}
      />

      <WeakConversionTile
        chip={weakChip}
        active={activeChips.includes("weakConversion")}
        candidate={candidate}
        onShow={() => {
          if (candidate)
            setFocusedRowKey(reportIdentity(candidate, "landingPage"));
          setActiveChips((current) =>
            current.includes("weakConversion")
              ? current
              : [...current, "weakConversion"],
          );
        }}
      />

      <p className="text-xs text-muted">
        {result.propertyDisplayName ?? t("Analytics mülkü")} ·{" "}
        {formatDate(result.dateRange.startDate)} –{" "}
        {formatDate(result.dateRange.endDate)} ·{" "}
        {result.rowCount < result.totalRowCount
          ? t("{shown} / {count} satır", {
              shown: formatCount(result.rowCount),
              count: result.totalRowCount,
            })
          : t("{count} satır", { count: result.totalRowCount })}
        {result.sampled ? ` · ${t("örneklenmiş")}` : ""}
        {result.thresholded ? ` · ${t("eşik altı satırlar gizlendi")}` : ""}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          ref={filtersRef}
          tabIndex={-1}
          className="flex flex-wrap items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary"
          role="group"
          aria-label={t("Hızlı filtreler")}
        >
          {kind !== "site_search" ? (
            <button
              type="button"
              aria-pressed={organicOnly}
              title={t(
                "Organik arama motorlarından gelen ziyaretleri gösterir.",
              )}
              className={`btn btn-sm min-h-11 sm:min-h-0 rounded-full ${organicOnly ? "btn-neutral" : "btn-ghost border-base-300"}`}
              onClick={() => onOrganicOnlyChange(!organicOnly)}
            >
              {t("Sadece organik")}
            </button>
          ) : null}
          {chips.map((chip) => {
            const on = activeChips.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={on}
                disabled={chip.disabledReason !== null}
                title={chip.hint}
                className={`btn btn-sm min-h-11 sm:min-h-0 gap-1.5 rounded-full ${on ? "btn-neutral" : "btn-ghost border-base-300"}`}
                onClick={() =>
                  setActiveChips((current) =>
                    on
                      ? current.filter((id) => id !== chip.id)
                      : [...current, chip.id],
                  )
                }
              >
                {chip.label}
                <span className="tabular-nums text-muted">
                  {formatCount(chip.count)}
                </span>
              </button>
            );
          })}
          {chips.length > 0 ? (
            <HelpTip label={t("Hızlı filtreler")}>
              {t(
                "Sayılar, listelenen tüm satırlara göre hesaplanır. Birden fazla filtre seçerseniz satırın hepsine uyması gerekir.",
              )}
            </HelpTip>
          ) : null}
          {isFiltered ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11 sm:min-h-0 gap-1"
              onClick={clearFilters}
            >
              <FilterX aria-hidden className="size-3.5" />
              {t("Filtreleri temizle")}
            </button>
          ) : null}
        </div>

        {result.rows.length > 0 ? (
          <TableExportMenu
            buttonClassName="btn btn-ghost btn-sm min-h-11 gap-1"
            actions={[
              {
                label: t("E-Tablolar'a aktar ({count} satır)", {
                  count: rows.length,
                }),
                onClick: () =>
                  void exportTableToSheets({
                    headers: exportHeaders,
                    rows: exportRows,
                    feature: "ga4_report",
                  }),
              },
              {
                label: t("CSV ({count} satır)", {
                  count: rows.length,
                }),
                onClick: () =>
                  downloadCsv(
                    "analytics.csv",
                    buildCsv(exportHeaders, exportRows),
                  ),
              },
            ]}
          />
        ) : null}
      </div>

      {chips
        .filter((chip) => chip.disabledReason)
        .map((chip) => (
          <p key={chip.id} className="text-xs text-muted">
            {chip.disabledReason}
          </p>
        ))}

      {rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={FilterX}
            title={t("Bu filtrelere uyan satır yok")}
            description={t("Seçtiğiniz filtrelerle hiçbir satır eşleşmiyor.")}
            action={
              <button
                type="button"
                className="btn btn-sm"
                onClick={clearFilters}
              >
                {t("Filtreleri temizle")}
              </button>
            }
          />
        </div>
      ) : (
        <ReportTable
          rows={rows}
          columns={shownColumns}
          dimensionCount={shownDimensions.length}
          sorting={sorting}
          currencyCode={result.currencyCode ?? null}
        />
      )}
    </div>
  );
}
