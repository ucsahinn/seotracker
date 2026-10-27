import type { StrikingResult } from "./searchInsights";
import { formatCount } from "./format";
import { t } from "./i18n";
/** The same full-set estimate wording on Panel and Search performance. */
export function strikingEstimateText(
  estimate?: StrikingResult["estimate"],
): string {
  if (estimate?.knownGainSum == null)
    return t("Yeterli örnek yok; ek tıklama üst sınırı hesaplanamadı.");
  return t(
    "Hesaplanabilen {known} sorguda en fazla {clicks} ek tıklama (üst sınır); {unknown} sorguda hesaplanamadı.",
    {
      known: formatCount(estimate.knownGainCount),
      clicks: formatCount(Math.round(estimate.knownGainSum)),
      unknown: formatCount(estimate.unknownGainCount),
    },
  );
}
export function strikingMethodText(
  source: "confirmed" | "suggested" | "none",
  truncated: boolean,
): string {
  return [
    source === "confirmed"
      ? t("Marka adları onaylandı.")
      : source === "suggested"
        ? t("Marka adları öneriye göre ayrıldı.")
        : t("Marka ayrımı yapılmadı."),
    truncated
      ? t(
          "Sorgu listesi satır sınırında kesildi; tahminler yalnızca alınan sorguları kapsar.",
        )
      : null,
  ]
    .filter(Boolean)
    .join(" ");
}
