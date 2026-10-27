import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import { formatDate } from "@/client/lib/format";
import type { CsvValue } from "@/client/lib/csv";
import { sort } from "remeda";
import type { SavedKeywordRow, SavedKeywordTag } from "@/types/keywords";

export const SAVED_KEYWORD_PAGE_SIZES = [50, 100, 250] as const;
export const SAVED_KEYWORD_EXPORT_HEADERS = [
  "Kelime",
  "Amaç",
  "Etiketler",
  "Eklenme",
];

function savedKeywordExportRow(row: SavedKeywordRow): CsvValue[] {
  return [
    row.keyword,
    row.intent ?? "",
    row.tags.map((tag) => tag.name).join(", "),
    row.createdAt,
  ];
}

export function formatSavedKeywordDate(value: string | null | undefined) {
  if (!value) return "-";
  return formatDate(value);
}

/** The distinct tags across some rows, by name, for the bulk tag editor. */
export function uniqueTagsOf(rows: SavedKeywordRow[]): SavedKeywordTag[] {
  const map = new Map<string, SavedKeywordTag>();
  for (const row of rows) {
    for (const tag of row.tags) {
      if (!map.has(tag.id)) map.set(tag.id, tag);
    }
  }
  return sort([...map.values()], (a, b) =>
    a.normalizedName.localeCompare(b.normalizedName),
  );
}

/** Rows already on screen win over a server round trip. */
export async function resolveFilteredRows(
  positionRows: SavedKeywordRow[] | null,
  loadFromServer: () => Promise<SavedKeywordRow[]>,
): Promise<SavedKeywordRow[]> {
  return positionRows ?? (await loadFromServer());
}

export const SAVED_EVIDENCE_HEADERS = [
  "averagePosition",
  "previousPosition",
  "deltaPlaces",
  "positionStatus",
  "observedDays",
  "currentStart",
  "currentEnd",
  "previousStart",
  "previousEnd",
  "lastImport",
  "coverage",
  "matchVariants",
  "scope",
  "locationCode",
  "languageCode",
  "savedId",
  "snapshot",
  "previousObservedDays",
  "previousMatchVariants",
  "previousCoverage",
  "readStatus",
  "filters",
  "totalSavedMatching",
  "totalMatching",
  "exportScope",
  "exportedRecordCount",
];
export function savedEvidenceExportRow(
  row: SavedWatchlist["rows"][number],
  snapshot: Pick<
    SavedWatchlist,
    | "range"
    | "previousRange"
    | "status"
    | "coverage"
    | "previousCoverage"
    | "scope"
    | "snapshot"
    | "filters"
    | "totalSavedMatching"
    | "totalMatching"
    | "archiveError"
    | "previousError"
    | "statusError"
    | "connectionError"
  >,
  exportContext: { scope: "filtered" | "selected-page"; count: number } = {
    scope: "filtered",
    count: snapshot.totalMatching,
  },
): CsvValue[] {
  return [
    ...savedKeywordExportRow(row),
    row.position ?? "",
    row.previousPosition ?? "",
    row.delta ?? "",
    row.positionStatus,
    row.observation?.observedDays ?? 0,
    snapshot.range.startDate,
    snapshot.range.endDate,
    snapshot.previousRange.startDate,
    snapshot.previousRange.endDate,
    snapshot.status?.lastRunAt ?? "",
    JSON.stringify(snapshot.coverage),
    JSON.stringify(row.observation?.variants ?? []),
    snapshot.scope,
    row.locationCode,
    row.languageCode,
    row.id,
    snapshot.snapshot,
    row.previousObservation?.observedDays ?? 0,
    JSON.stringify(row.previousObservation?.variants ?? []),
    JSON.stringify(snapshot.previousCoverage),
    JSON.stringify({
      archiveError: snapshot.archiveError,
      previousError: snapshot.previousError,
      statusError: snapshot.statusError,
      connectionError: snapshot.connectionError,
    }),
    JSON.stringify(snapshot.filters),
    snapshot.totalSavedMatching,
    snapshot.totalMatching,
    exportContext.scope,
    exportContext.count,
  ];
}
