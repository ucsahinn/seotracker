import { REPORT_MAX_TITLE_CHARS } from "@/types/schemas/reports";

/** Match the persistence code-unit limit without cutting a grapheme. */
export function boundedReportTitle(
  value: string,
  limit = REPORT_MAX_TITLE_CHARS,
): string {
  if (value.length <= limit) return value;
  let result = "";
  for (const { segment } of new Intl.Segmenter().segment(value)) {
    if (result.length + segment.length > limit - 1) break;
    result += segment;
  }
  return result.trimEnd() + "…";
}
