import { formatDate } from "@/client/lib/format";
import type { CsvValue } from "@/client/lib/csv";
import type { SavedKeywordRow } from "@/types/keywords";
import type { GetSavedKeywordsInput } from "@/types/schemas/keywords";

export const SAVED_KEYWORD_PAGE_SIZES = [50, 100, 250] as const;
export const SAVED_KEYWORD_EXPORT_HEADERS = [
  "Kelime",
  "Hacim",
  "CPC",
  "Rekabet",
  "Zorluk",
  "Amaç",
  "Etiketler",
  "Son alınma",
];

export function savedKeywordExportRow(row: SavedKeywordRow): CsvValue[] {
  return [
    row.keyword,
    row.searchVolume ?? "",
    row.cpc ?? "",
    row.competition ?? "",
    row.keywordDifficulty ?? "",
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
