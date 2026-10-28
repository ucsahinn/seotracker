import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { CompareMode } from "./searchTabs";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";

/** Reuse the insight engine's minimum click base for trend interpretation. */
export function searchSampleNote(
  view: SearchPerformanceView,
  compare: CompareMode,
): string | null {
  const previous =
    compare === "previous"
      ? view.totals.previous
      : compare === "yoy"
        ? view.totals.yoy
        : null;
  if (!previous || previous.clicks >= view.insights.thresholds.moverMinClicks)
    return null;
  const counts = {
    clicks: formatCount(previous.clicks),
    impressions: formatCount(previous.impressions),
  };
  const baseline =
    compare === "yoy"
      ? t(
          "Geçen yıl aynı dönemde {clicks} tıklama, {impressions} gösterim vardı.",
          counts,
        )
      : t(
          "Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.",
          counts,
        );
  return `${baseline} ${t("Az veride yüzdeler ve ortalamalar hızla değişir; tek başına büyüme veya kayıp kanıtı değildir.")}`;
}
