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
  toCsvRows,
} from "@/client/features/analytics/ReportTable";
import {
  applyChips,
  applySegment,
  availableChips,
  type ChipId,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import { buildKpis } from "@/client/features/analytics/reportKpis";
import { buildSummary } from "@/client/features/analytics/reportBuckets";
import { buildCsv, downloadCsv } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { formatCount, formatDate } from "@/client/lib/format";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";

export type ReportResult = {
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
}: {
  kind: Ga4ReportKindName;
  result: ReportResult;
  organicOnly: boolean;
  onOrganicOnlyChange: (next: boolean) => void;
  /** Switches to the setup check; offered where a property setting explains an empty tab. */
  onOpenHealth?: () => void;
}) {
  const columns = [...result.dimensions, ...result.metrics];
  const sorting = useLocalSort<string>({ key: "", desc: true });
  const [activeChips, setActiveChips] = React.useState<ChipId[]>([]);
  const [segmentKey, setSegmentKey] = React.useState<string | null>(null);
  const filtersRef = React.useRef<HTMLDivElement>(null);

  const plan = buildSummary(kind, result.dimensions, result.rows, columnLabel);
  const segment =
    plan?.segments.find((item) => item.key === segmentKey) ?? null;
  const chips = availableChips(result.metrics, result.rows);
  const kpis = buildKpis(
    kind,
    result.rows,
    result.rowCount < result.totalRowCount
      ? `Listelenen ${formatCount(result.rowCount)} satırdan`
      : "",
  );

  // A chip the data no longer offers must neither narrow nor count.
  const appliedChips = activeChips.filter((id) =>
    chips.some((chip) => chip.id === id),
  );
  const filtered = applyChips(
    plan ? applySegment(result.rows, plan.dimension, segment) : result.rows,
    chips,
    appliedChips,
  );
  const rows = sorting.sort.key
    ? sorting.apply(filtered, (a, b, key) =>
        compareReportCells(
          a[key] ?? null,
          b[key] ?? null,
          result.dimensions.includes(key),
        ),
      )
    : // Google's own ordering when nothing is chosen.
      filtered;
  const isFiltered = appliedChips.length > 0 || segment !== null;

  const clearFilters = () => {
    // The clicked button unmounts with the filters; keep focus in the group.
    filtersRef.current?.focus();
    setActiveChips([]);
    setSegmentKey(null);
  };

  return (
    <div className="space-y-3">
      <ReportSummary
        plan={plan}
        kpis={kpis}
        selectedKey={segment ? segment.key : null}
        onSelect={setSegmentKey}
      />

      <p className="text-xs text-muted">
        {result.propertyDisplayName ?? "GA4 mülkü"} ·{" "}
        {formatDate(result.dateRange.startDate)} –{" "}
        {formatDate(result.dateRange.endDate)} ·{" "}
        {result.rowCount < result.totalRowCount
          ? `${formatCount(result.rowCount)} / ${formatCount(result.totalRowCount)} satır`
          : `${formatCount(result.totalRowCount)} satır`}
        {result.sampled ? " · örneklenmiş" : ""}
        {result.thresholded ? " · eşik altı satırlar gizlendi" : ""}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          ref={filtersRef}
          tabIndex={-1}
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Hızlı filtreler"
        >
          <button
            type="button"
            aria-pressed={organicOnly}
            title="Yalnızca Google organik aramadan gelen ziyaretleri gösterir."
            className={`btn btn-xs rounded-full ${organicOnly ? "btn-neutral" : "btn-ghost border-base-300"}`}
            onClick={() => onOrganicOnlyChange(!organicOnly)}
          >
            Sadece organik
          </button>
          {chips.map((chip) => {
            const on = activeChips.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={on}
                disabled={chip.disabledReason !== null}
                title={chip.hint}
                className={`btn btn-xs gap-1.5 rounded-full ${on ? "btn-neutral" : "btn-ghost border-base-300"}`}
                onClick={() =>
                  setActiveChips((current) =>
                    on
                      ? current.filter((id) => id !== chip.id)
                      : [...current, chip.id],
                  )
                }
              >
                {chip.label}
                <span className="tabular-nums opacity-70">
                  {formatCount(chip.count)}
                </span>
              </button>
            );
          })}
          {chips.length > 0 ? (
            <HelpTip label="Hızlı filtreler">
              Sayılar, listelenen tüm satırlar üzerinden hesaplanır. Birden
              fazla filtre seçerseniz bir satırın hepsini birden sağlaması
              gerekir.
            </HelpTip>
          ) : null}
          {isFiltered ? (
            <button
              type="button"
              className="btn btn-ghost btn-xs gap-1"
              onClick={clearFilters}
            >
              <FilterX aria-hidden className="size-3.5" />
              Filtreleri temizle
            </button>
          ) : null}
        </div>

        {result.rows.length > 0 ? (
          <TableExportMenu
            buttonClassName="btn btn-ghost btn-sm gap-1"
            actions={[
              {
                label: `E-Tablolar'a aktar (${formatCount(rows.length)} satır)`,
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
        ) : null}
      </div>

      {result.rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <ReportEmptyState
            kind={kind}
            organicOnly={organicOnly}
            emptyReason={result.emptyReason}
            onShowAllTraffic={() => onOrganicOnlyChange(false)}
            onOpenHealth={onOpenHealth}
          />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={FilterX}
            title="Bu filtrelere uyan satır yok"
            description="Seçtiğiniz filtrelerin birleşimi hiçbir satırla eşleşmiyor."
            action={
              <button
                type="button"
                className="btn btn-sm"
                onClick={clearFilters}
              >
                Filtreleri temizle
              </button>
            }
          />
        </div>
      ) : (
        <ReportTable
          rows={rows}
          columns={columns}
          dimensionCount={result.dimensions.length}
          sorting={sorting}
        />
      )}
    </div>
  );
}
