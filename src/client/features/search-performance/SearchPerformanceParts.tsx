import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  AppDataTable,
  useAppTable,
  useSelectionAnchor,
} from "@/client/components/table/AppDataTable";
import {
  TableBulkActionBar,
  TableBulkActionButton,
} from "@/client/components/table/TableBulkActionBar";
import { TablePagination } from "@/client/components/table/TablePagination";
import {
  buildDimensionColumns,
  buildStrikingColumns,
  type Report,
  type SearchPerformanceTableRow,
} from "@/client/features/search-performance/SearchPerformanceColumns";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { describeTotals } from "@/client/features/search-performance/totals";
import {
  buildCsv,
  downloadCsv,
  normalizeExportValue,
  type CsvValue,
} from "@/client/lib/csv";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { captureClientEvent } from "@/client/lib/observability";
import {
  SEARCH_PERFORMANCE_PAGE_SIZES,
  type SearchPerformanceTableDimension,
} from "@/types/schemas/search-performance";
import { saveKeywords } from "@/serverFunctions/savedKeywords";

export type Tab = "striking" | "queries" | "pages" | "cannibalization";
export type ExportTarget = "csv" | "sheets";

type ExportTable = { filename: string; headers: string[]; rows: CsvValue[][] };

function strikingExportTable(report: Report): ExportTable {
  const stamp = `${report.range.startDate}-to-${report.range.endDate}`;
  return {
    filename: `search-performance-striking-distance-${stamp}.csv`,
    headers: ["Sorgu", "Sayfa", "Gösterim", "Tıklama", "Sıra"],
    rows: report.strikingDistance.map((row) => [
      row.query,
      row.page,
      row.impressions,
      row.clicks,
      row.position,
    ]),
  };
}

function dimensionExportTable(
  dimension: SearchPerformanceTableDimension,
  rows: SearchPerformanceTableRow[],
  stamp: string,
): ExportTable {
  const isPage = dimension === "page";
  return {
    filename: `search-performance-${isPage ? "pages" : "queries"}-${stamp}.csv`,
    headers: [isPage ? "Sayfa" : "Sorgu", "Tıklama", "Gösterim", "TO", "Sıra"],
    rows: rows.map((row) => [
      row.key,
      row.clicks,
      row.impressions,
      row.ctr,
      row.position,
    ]),
  };
}

function runExport(table: ExportTable, target: ExportTarget): void {
  if (target === "csv") {
    downloadCsv(table.filename, buildCsv(table.headers, table.rows));
    captureClientEvent("data:export", {
      source_feature: "search_performance",
      result_count: table.rows.length,
    });
    return;
  }
  void exportTableToSheets({
    headers: table.headers,
    rows: table.rows,
    feature: "search_performance",
  });
}

export function exportStriking(report: Report, target: ExportTarget): void {
  runExport(strikingExportTable(report), target);
}

/** Export the full queries/pages dataset (fetched separately, not the visible
 *  page) so pagination never truncates a download. */
export function exportDimensionRows(
  dimension: SearchPerformanceTableDimension,
  rows: SearchPerformanceTableRow[],
  range: Report["range"],
  target: ExportTarget,
): void {
  const stamp = `${range.startDate}-to-${range.endDate}`;
  runExport(dimensionExportTable(dimension, rows, stamp), target);
}

type Delta = { text: string; improved: boolean } | null;

function percentDelta(current: number, previous: number): Delta {
  if (previous <= 0) return null;
  const change = (current - previous) / previous;
  // The sign is carried in the text, so `formatPercent` gets the magnitude.
  return {
    text: `${change >= 0 ? "+" : "-"}${formatPercent(Math.abs(change))}`,
    improved: change >= 0,
  };
}

/** Position falls as rankings improve, so the delta is inverted. */
function positionDelta(current: number, previous: number): Delta {
  if (previous <= 0 || current <= 0) return null;
  const change = previous - current;
  return {
    text: `${change >= 0 ? "+" : "-"}${formatDecimal(Math.abs(change))}`,
    improved: change >= 0,
  };
}

export function TotalsCards({ report }: { report: Report }) {
  const { totals, prevTotals, range } = report;
  const deltaTitle = `${range.prevStartDate} - ${range.prevEndDate} dönemine göre`;
  const shown = describeTotals(totals);
  // Nothing to compare against when the period itself is empty, and a delta
  // beside a dash is noise.
  const delta = (current: number, previous: number) =>
    shown.hasImpressions ? percentDelta(current, previous) : null;
  return (
    <MetricRow>
      <MetricTile
        label="Tıklama"
        value={shown.clicks}
        delta={delta(totals.clicks, prevTotals.clicks)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Gösterim"
        value={shown.impressions}
        delta={delta(totals.impressions, prevTotals.impressions)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Tıklama oranı"
        value={shown.ctr}
        delta={delta(totals.ctr, prevTotals.ctr)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Ortalama sıra"
        value={shown.position}
        delta={
          shown.hasImpressions
            ? positionDelta(totals.position, prevTotals.position)
            : null
        }
        deltaTitle={deltaTitle}
      />
    </MetricRow>
  );
}

export function DimensionTable({
  rows,
  keyLabel,
  truncated,
  hasActiveFilter,
}: {
  rows: SearchPerformanceTableRow[];
  keyLabel: string;
  /** The fetch hit its ceiling, so this is not the whole dimension. */
  truncated: boolean;
  /** Changes what an empty table means, and therefore what to say about it. */
  hasActiveFilter: boolean;
}) {
  const columns = useMemo(() => buildDimensionColumns(keyLabel), [keyLabel]);
  /*
   * Sorted and paginated here, over the whole fetched set.
   *
   * Google paginated this server-side and returns its own clicks-desc
   * order, so the client held one page and sorted that -- "Gösterim"
   * reordered twenty-five of the top-twenty-five-by-clicks and called them
   * the highest-impression queries.
   */
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    withPagination: true,
    initialState: {
      sorting: [{ id: "clicks", desc: true }],
      pagination: { pageIndex: 0, pageSize: SEARCH_PERFORMANCE_PAGE_SIZES[0] },
    },
  });
  const pagination = table.getState().pagination;

  return (
    <>
      <AppDataTable
        table={table}
        className="table table-zebra table-sm"
        wrapperClassName="overflow-x-auto"
        empty={
          <p className="p-6 text-sm text-muted">
            {hasActiveFilter
              ? "Bu filtrelerle eşleşen satır yok. Filtreleri genişletmeyi deneyin."
              : "Bu dönem için henüz veri yok. Search Console verisi birkaç gün gecikmeli gelir."}
          </p>
        }
      />
      {rows.length > 0 ? (
        <>
          <TablePagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
            totalCount={rows.length}
            hasNextPage={table.getCanNextPage()}
            isLoading={false}
            onPageChange={(next) => table.setPageIndex(next - 1)}
            onPageSizeChange={(next) => table.setPageSize(next)}
          />
          {truncated ? (
            <p className="border-t border-base-300 px-4 py-2 text-xs text-muted">
              Google&apos;ın tek çağrıda döndürdüğü üst sınıra ulaşıldı, bu
              yüzden bu liste tam değil. Daraltmak için filtreleri kullanın.
            </p>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export function StrikingDistanceTable({
  projectId,
  rows,
}: {
  projectId: string;
  rows: Report["strikingDistance"];
}) {
  const queryClient = useQueryClient();
  const anchorRef = useSelectionAnchor();
  const [rowSelection, setRowSelection] = useState({});
  const columns = useMemo(() => buildStrikingColumns(anchorRef), [anchorRef]);
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    withPagination: true,
    enableRowSelection: true,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => `${row.query}::${row.page}`,
    initialState: {
      sorting: [{ id: "impressions", desc: true }],
      // All rows are already loaded; paginate client-side to keep the table
      // short. 50/page by default.
      pagination: { pageIndex: 0, pageSize: 50 },
    },
  });
  const pagination = table.getState().pagination;

  // Rows are query x page; saving/copying dedupes to the query strings.
  const selectedQueries = Array.from(
    new Set(table.getSelectedRowModel().rows.map((row) => row.original.query)),
  );

  const copyKeywords = async () => {
    try {
      // Sanitize against spreadsheet formula injection: GSC query strings are
      // untrusted and may begin with =, +, -, @, etc. See @/client/lib/csv.
      const text = selectedQueries
        .map((query) => normalizeExportValue(query))
        .join("\n");
      await navigator.clipboard.writeText(text);
      toast.success(`${selectedQueries.length} kelime kopyalandı`);
    } catch {
      toast.error("Panoya kopyalanamadı");
    }
  };

  const save = useMutation({
    mutationFn: (keywords: string[]) =>
      saveKeywords({ data: { projectId, keywords } }),
    onSuccess: (result, keywords) => {
      captureClientEvent("keyword:save", {
        source_feature: "search_performance",
        keyword_count: keywords.length,
      });
      void queryClient.invalidateQueries({
        queryKey: ["savedKeywords", projectId],
      });
      /*
       * "kayıtlı", not "kaydedildi". The write is an upsert that ignores
       * conflicts, so selecting ten rows that were already saved used to
       * report ten new ones. The returned list is what is stored now, which
       * is both true and the number the operator can go and look at.
       */
      toast.success(
        `${formatCount(result.savedKeywordIds.length)} kelime kayıtlı`,
      );
      setRowSelection({});
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error, "Kelimeler kaydedilemedi"));
    },
  });

  if (rows.length === 0) {
    return (
      <p className="p-6 text-sm text-muted">
        Bu dönemde eşiğe yakın sorgu yok. Bunlar 5 ile 20. sıra arasındaki,
        iyileştirmenin trafiğe en çok dokunacağı sorgulardır.
      </p>
    );
  }

  return (
    <>
      <div className="p-4">
        <p className="mb-3 text-sm text-muted">
          5 ile 20. sıra arasındaki sorgular, gösterime göre sıralı. Listedeki
          sayfayı iyileştirerek bunları ilk sonuçlara taşıyabilirsiniz.
        </p>
        <AppDataTable
          table={table}
          className="table table-zebra table-sm"
          wrapperClassName="overflow-x-auto"
        />
      </div>
      <TablePagination
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
        totalCount={rows.length}
        hasNextPage={table.getCanNextPage()}
        isLoading={false}
        onPageChange={(nextPage) => table.setPageIndex(nextPage - 1)}
        onPageSizeChange={(nextSize) => table.setPageSize(nextSize)}
      />
      <TableBulkActionBar
        selectedCount={selectedQueries.length}
        selectedLabel={selectedQueries.length === 1 ? "query" : "queries"}
        onClear={() => setRowSelection({})}
        actions={
          <div className="flex items-center gap-1 px-1.5">
            <TableBulkActionButton
              icon={<Copy className="size-3.5" />}
              onClick={() => void copyKeywords()}
            >
              Kelimeleri kopyala
            </TableBulkActionButton>
            <TableBulkActionButton
              icon={
                save.isPending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Save className="size-3.5" />
                )
              }
              onClick={() => save.mutate(selectedQueries)}
              disabled={save.isPending}
            >
              Kelime olarak kaydet
            </TableBulkActionButton>
          </div>
        }
      />
    </>
  );
}
