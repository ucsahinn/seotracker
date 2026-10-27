import { t } from "@/shared/i18n";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { captureClientEvent } from "@/client/lib/observability";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { exportSearchPerformanceTable } from "@/serverFunctions/searchPerformance";

export type ExportTarget = "csv" | "sheets";

type ExportTable = { filename: string; headers: string[]; rows: CsvValue[][] };

type ExportedRows = Awaited<ReturnType<typeof exportSearchPerformanceTable>>;

function stamp(window: { startDate: string; endDate: string }) {
  return `${window.startDate}-to-${window.endDate}`;
}

/** Every matching query or page row, with the previous period beside it. */
export function dimensionExportTable(result: ExportedRows): ExportTable {
  const isPage = result.dimension === "page";
  return {
    filename: `search-performance-${isPage ? "pages" : "queries"}-${stamp(result.window)}.csv`,
    headers: [
      isPage ? t("Sayfa") : t("Sorgu"),
      t("Tıklama"),
      t("Önceki dönem tıklama"),
      t("Tıklama değişimi"),
      t("Gösterim"),
      t("Tıklama oranı"),
      t("Sıra"),
      t("Önceki dönem sıra"),
    ],
    rows: result.rows.map((row) => [
      row.key,
      row.clicks,
      row.previousClicks,
      row.clickChange,
      row.impressions,
      row.impressions > 0 ? row.clicks / row.impressions : null,
      row.position,
      row.previousPosition,
    ]),
  };
}

/** The striking-distance list exactly as the Fırsatlar tab shows it. */
export function strikingExportTable(view: SearchPerformanceView): ExportTable {
  return {
    filename: `search-performance-striking-distance-${stamp(view.window)}.csv`,
    headers: [
      t("Sorgu"),
      t("Hedef sayfa"),
      t("Sıra"),
      t("Gösterim"),
      t("Tıklama"),
      t("Olası kazanç"),
    ],
    rows: view.insights.striking.rows.map((row) => [
      row.query,
      row.page,
      row.position,
      row.impressions,
      row.clicks,
      row.potentialClicks,
    ]),
  };
}

export function runExport(table: ExportTable, target: ExportTarget): void {
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
