import { useMemo, useState } from "react";
import { toast } from "sonner";
import { buildCsv, downloadCsv } from "@/client/lib/csv";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { captureClientEvent } from "@/client/lib/observability";
import { exportSavedKeywords } from "@/serverFunctions/savedKeywords";
import type { SavedKeywordRow } from "@/types/keywords";
import type { ExportSavedKeywordsInput } from "@/types/schemas/keywords";
import type { AppliedSavedKeywordsFilters } from "./savedKeywordsFilterTypes";
import {
  resolveFilteredRows,
  SAVED_KEYWORD_EXPORT_HEADERS,
  savedKeywordExportRow,
} from "./savedKeywordsUtils";
import { t } from "@/shared/i18n";

export function useSavedKeywordsExport(params: {
  projectId: string;
  appliedFilters: AppliedSavedKeywordsFilters;
  selectedTagIds: string[];
  sort: ExportSavedKeywordsInput["sort"];
  order: ExportSavedKeywordsInput["order"];
  /**
   * The rows on screen while a position group narrows the table locally, or
   * null when the server filters already describe the screen. The server
   * knows nothing about positions, so exporting by filters alone would hand
   * over the whole list.
   */
  positionRows?: SavedKeywordRow[] | null;
}) {
  const [exporting, setExporting] = useState<"csv" | "sheets" | null>(null);
  // Whether the last filtered CSV export reached the browser, for the
  // button's brief "İndirildi"; an empty list or an error must not claim it.
  const [csvDownloaded, setCsvDownloaded] = useState(false);
  const [exportingSelection, setExportingSelection] = useState<
    "csv" | "sheets" | null
  >(null);

  const exportInput = useMemo<ExportSavedKeywordsInput>(
    () => ({
      projectId: params.projectId,
      ...params.appliedFilters,
      tagIds:
        params.selectedTagIds.length > 0 ? params.selectedTagIds : undefined,
      sort: params.sort,
      order: params.order,
    }),
    [
      params.appliedFilters,
      params.order,
      params.projectId,
      params.selectedTagIds,
      params.sort,
    ],
  );

  const loadFilteredRows = () =>
    resolveFilteredRows(params.positionRows ?? null, async () => {
      const result = await exportSavedKeywords({ data: exportInput });
      return result.rows;
    });

  const exportFilteredCsv = async () => {
    setExporting("csv");
    setCsvDownloaded(false);
    try {
      const rows = await loadFilteredRows();
      if (rows.length === 0) {
        toast.error(t("Dışa aktarılacak kelime yok"));
        return;
      }
      downloadKeywordCsv(rows);
      setCsvDownloaded(true);
      captureClientEvent("data:export", {
        source_feature: "saved_keywords",
        result_count: rows.length,
      });
    } catch (error) {
      toast.error(getStandardErrorMessage(error, t("CSV dışa aktarılamadı")));
    } finally {
      setExporting(null);
    }
  };

  const exportFilteredSheets = async () => {
    setExporting("sheets");
    try {
      const rows = await loadFilteredRows();
      await exportTableToSheets({
        headers: SAVED_KEYWORD_EXPORT_HEADERS.map((header) => t(header)),
        rows: rows.map(savedKeywordExportRow),
        feature: "saved_keywords",
      });
    } catch (error) {
      toast.error(
        getStandardErrorMessage(error, t("E-Tablolar'a aktarılamadı")),
      );
    } finally {
      setExporting(null);
    }
  };

  const exportSelectionCsv = (selectedRows: SavedKeywordRow[]) => {
    if (selectedRows.length === 0) return;
    setExportingSelection("csv");
    try {
      downloadKeywordCsv(selectedRows);
      captureClientEvent("data:export", {
        source_feature: "saved_keywords",
        result_count: selectedRows.length,
        scope: "selection",
      });
    } finally {
      setExportingSelection(null);
    }
  };

  const exportSelectionSheets = async (selectedRows: SavedKeywordRow[]) => {
    if (selectedRows.length === 0) return;
    setExportingSelection("sheets");
    try {
      await exportTableToSheets({
        headers: SAVED_KEYWORD_EXPORT_HEADERS.map((header) => t(header)),
        rows: selectedRows.map(savedKeywordExportRow),
        feature: "saved_keywords",
      });
    } catch (error) {
      toast.error(
        getStandardErrorMessage(error, t("E-Tablolar'a aktarılamadı")),
      );
    } finally {
      setExportingSelection(null);
    }
  };

  return {
    exporting,
    csvDownloaded,
    exportingSelection,
    exportFilteredCsv,
    exportFilteredSheets,
    exportSelectionCsv,
    exportSelectionSheets,
  };
}

function downloadKeywordCsv(rows: SavedKeywordRow[]) {
  const csvRows = rows.map(savedKeywordExportRow);
  downloadCsv(
    "saved-keywords.csv",
    buildCsv(
      SAVED_KEYWORD_EXPORT_HEADERS.map((header) => t(header)),
      csvRows,
    ),
  );
}
