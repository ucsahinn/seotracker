import { BarChart3, FilterX } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { HelpTip } from "@/client/components/HelpTip";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { UrlCell } from "@/client/components/table/UrlCell";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import {
  applyChips,
  applySegment,
  availableChips,
  buildShareSegments,
  shareConfig,
  type ChipId,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import { DonutCard } from "@/client/components/DonutChart";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { formatCount, formatDate, formatPercent } from "@/client/lib/format";
import {
  GA4_FIELD_LABELS,
  GA4_RATE_FIELDS,
  type Ga4ReportKindName,
} from "@/shared/ga4-reports";

function columnLabel(field: string): string {
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
 * One report: an optional share ring, quick chips, and the sortable table.
 *
 * Filter state lives here and the parent keys this component by report and
 * window, so a filter chosen on one tab can never silently narrow another.
 */
export function ReportView({
  kind,
  result,
  organicOnly,
  onOrganicOnlyChange,
}: {
  kind: Ga4ReportKindName;
  result: ReportResult;
  organicOnly: boolean;
  onOrganicOnlyChange: (next: boolean) => void;
}) {
  const columns = [...result.dimensions, ...result.metrics];
  const sorting = useLocalSort<string>({ key: "", desc: true });
  const [activeChips, setActiveChips] = React.useState<ChipId[]>([]);
  const [segmentKey, setSegmentKey] = React.useState<string | null>(null);

  const share = shareConfig(kind);
  const segments = share
    ? buildShareSegments(result.rows, share.dimension, share.metric)
    : [];
  const segment = segments.find((item) => item.key === segmentKey) ?? null;
  const chips = availableChips(result.metrics, result.rows);

  const filtered = applyChips(
    share ? applySegment(result.rows, share.dimension, segment) : result.rows,
    activeChips,
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
  const isFiltered = activeChips.length > 0 || segment !== null;

  const clearFilters = () => {
    setActiveChips([]);
    setSegmentKey(null);
  };

  return (
    <div className="space-y-3">
      {share && segments.length > 1 ? (
        <DonutCard
          title={share.title}
          description="Bir dilime tıklayın, aşağıdaki tablo o satırlara daralsın."
          totalLabel={share.totalLabel}
          segments={segments}
          summary={shareSummary(share.title, share.totalLabel, segments)}
          selectedKey={segment ? segment.key : null}
          onSelect={setSegmentKey}
        />
      ) : null}

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
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Hızlı süzgeçler"
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
            <HelpTip label="Hızlı süzgeçler">
              Sayılar, listelenen tüm satırlar üzerinden hesaplanır. Birden
              fazla süzgeç seçerseniz bir satırın hepsini birden sağlaması
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
              Süzgeçleri temizle
            </button>
          ) : null}
        </div>

        {result.rows.length > 0 ? (
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
        ) : null}
      </div>

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
      ) : rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={FilterX}
            title="Bu süzgeçlere uyan satır yok"
            description="Seçtiğiniz süzgeçlerin birleşimi hiçbir satırla eşleşmiyor."
            action={
              <button
                type="button"
                className="btn btn-sm"
                onClick={clearFilters}
              >
                Süzgeçleri temizle
              </button>
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

function toCsvRows(rows: ReportRow[], columns: string[]): CsvValue[][] {
  return rows.map((row) => columns.map((field) => row[field] ?? null));
}

/** The finding, for readers who cannot see the ring. */
function shareSummary(
  title: string,
  totalLabel: string,
  segments: { label: string; value: number }[],
): string {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const lead = segments[0];
  return `${title}: toplam ${formatCount(total)} ${totalLabel}. ${
    lead
      ? `En büyük pay ${lead.label}, ${formatPercent(lead.value / total)}.`
      : ""
  }`;
}
