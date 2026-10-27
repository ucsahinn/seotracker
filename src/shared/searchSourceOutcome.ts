import { t } from "./i18n";
/** Explicit source health, separate from the metrics and insight results. */
export type SearchSourceOutcome =
  | { status: "available" | "empty"; reason: null }
  | { status: "partial"; reason: "row-limit" }
  | { status: "unavailable"; reason: "request-failed" }
  | { status: "insufficient-history"; reason: "retention-limit" };

export function sourceOutcome(
  result: { rows: unknown[]; truncated: boolean } | null,
): SearchSourceOutcome {
  if (!result) return { status: "unavailable", reason: "request-failed" };
  if (result.truncated) return { status: "partial", reason: "row-limit" };
  return { status: result.rows.length ? "available" : "empty", reason: null };
}

/** Shared copy for the screen and its saved report; no inferred failure reason. */
export function sourceOutcomeMessage(outcome?: SearchSourceOutcome): string {
  switch (outcome?.status) {
    case "available":
      return "";
    case "empty":
      return t("Okunan kaynakta bu dönem için kayıt bulunmadı.");
    case "partial":
      return t(
        "Kaynak satır sınırına ulaştı; sonuçlar yalnızca okunan kayıtları kapsar.",
      );
    case "unavailable":
      return t("Kaynak isteği başarısız; bu bölümün verisi alınamadı.");
    case "insufficient-history":
      return t(
        "Kaynak saklama süresi bu karşılaştırmanın tamamını kapsamıyor.",
      );
    default:
      return t("Kaynak durumu kaydedilmemiş.");
  }
}
