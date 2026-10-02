import { formatDate } from "@/client/lib/format";
import type { CsvValue } from "@/client/lib/csv";
import { sort } from "remeda";
import type { SavedKeywordRow, SavedKeywordTag } from "@/types/keywords";
import type { GetSavedKeywordsInput } from "@/types/schemas/keywords";

export const SAVED_KEYWORD_PAGE_SIZES = [50, 100, 250] as const;
export const SAVED_KEYWORD_EXPORT_HEADERS = [
  "Kelime",
  "Amaç",
  "Etiketler",
  "Son güncelleme",
];

export function savedKeywordExportRow(row: SavedKeywordRow): CsvValue[] {
  return [
    row.keyword,
    row.intent ?? "",
    row.tags.map((tag) => tag.name).join(", "),
    row.fetchedAt ?? "",
  ];
}

export function toSavedKeywordSort(
  value: string | undefined,
): GetSavedKeywordsInput["sort"] {
  if (
    value === "keyword" ||
    value === "searchVolume" ||
    value === "cpc" ||
    value === "competition" ||
    value === "keywordDifficulty" ||
    value === "fetchedAt"
  ) {
    return value;
  }
  return "createdAt";
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
