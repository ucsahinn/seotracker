import { useRef, useState } from "react";
import { toast } from "sonner";
import { buildCsv, downloadCsv } from "@/client/lib/csv";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { captureClientEvent } from "@/client/lib/observability";
import { getSavedWatchlist } from "@/serverFunctions/savedKeywords";
import type { SavedKeywordRow } from "@/types/keywords";
import type { SavedWatchlistInput } from "@/shared/savedWatchlist";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import {
  SAVED_EVIDENCE_HEADERS,
  savedEvidenceExportRow,
  SAVED_KEYWORD_EXPORT_HEADERS,
} from "./savedKeywordsUtils";
import { t } from "@/shared/i18n";

export function useSavedKeywordsExport(params: {
  input: SavedWatchlistInput;
  snapshot?: SavedWatchlist;
  blocked: boolean;
}) {
  const [exporting, setExporting] = useState<"csv" | "sheets" | null>(null);
  // Whether the last filtered CSV export reached the browser, for the
  // button's brief "İndirildi"; an empty list or an error must not claim it.
  const [csvDownloaded, setCsvDownloaded] = useState(false);
  const [exportingSelection, setExportingSelection] = useState<
    "csv" | "sheets" | null
  >(null);

  const scope = JSON.stringify({
    input: params.input,
    blocked: params.blocked,
    snapshot: params.snapshot?.snapshot,
  });
  const latest = useRef(scope);
  latest.current = scope;
  const headers = () => [
    ...SAVED_KEYWORD_EXPORT_HEADERS.map((header) => t(header)),
    ...SAVED_EVIDENCE_HEADERS,
  ];
  const requireSnapshot = () => {
    if (params.blocked || !params.snapshot || latest.current !== scope)
      throw new Error(
        t(
          "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.",
        ),
      );
    return params.snapshot;
  };
  const loadFilteredRows = async () => {
    const snapshot = requireSnapshot();
    const rows: SavedWatchlist["rows"] = [];
    for (let page = 1; ; page++) {
      const batch = await getSavedWatchlist({
        data: {
          ...params.input,
          startDate: snapshot.range.startDate,
          endDate: snapshot.range.endDate,
          expectedSnapshot: snapshot.snapshot,
          page,
          pageSize: 250,
        },
      }).catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.message.includes("SAVED_SNAPSHOT_CHANGED")
        )
          throw new Error(
            t(
              "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.",
            ),
          );
        throw error;
      });
      requireSnapshot();
      rows.push(...batch.rows);
      if (rows.length >= batch.totalMatching) break;
    }
    return rows;
  };
  const download = (rows: SavedWatchlist["rows"], selection = false) => {
    const snapshot = requireSnapshot();
    downloadCsv(
      "saved-keywords.csv",
      buildCsv(
        headers(),
        rows.map((row) =>
          savedEvidenceExportRow(row, snapshot, {
            scope: selection ? "selected-page" : "filtered",
            count: rows.length,
          }),
        ),
      ),
    );
  };
  const selected = (rows: SavedKeywordRow[]) => {
    const snapshot = requireSnapshot();
    const ids = new Set(rows.map((row) => row.id));
    return snapshot.rows.filter((row) => ids.has(row.id));
  };
  const exportFilteredCsv = async () => {
    setExporting("csv");
    setCsvDownloaded(false);
    try {
      const rows = await loadFilteredRows();
      if (rows.length === 0) {
        toast.error(t("Dışa aktarılacak kelime yok"));
        return;
      }
      download(rows);
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
        headers: headers(),
        rows: rows.map((row) => savedEvidenceExportRow(row, requireSnapshot())),
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
      download(selected(selectedRows), true);
      captureClientEvent("data:export", {
        source_feature: "saved_keywords",
        result_count: selectedRows.length,
        scope: "selection",
      });
    } catch (error) {
      toast.error(getStandardErrorMessage(error, t("CSV dışa aktarılamadı")));
    } finally {
      setExportingSelection(null);
    }
  };

  const exportSelectionSheets = async (selectedRows: SavedKeywordRow[]) => {
    if (selectedRows.length === 0) return;
    setExportingSelection("sheets");
    try {
      await exportTableToSheets({
        headers: headers(),
        rows: selected(selectedRows).map((row) =>
          savedEvidenceExportRow(row, requireSnapshot(), {
            scope: "selected-page",
            count: selectedRows.length,
          }),
        ),
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
