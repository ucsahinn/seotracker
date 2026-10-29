import { t } from "@/shared/i18n";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { CompareMode } from "@/client/features/search-performance/searchTabs";
import { countDelta } from "@/client/components/MetricTile";
import { placesDelta, pointsDelta } from "@/shared/delta";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

/**
 * The four totals for the complete days of the window, each with its change
 * against the chosen comparison and a sparkline of the same days.
 *
 * Position runs the other way (lower is better), so its tile is inverted and
 * its change is worded in places; CTR changes in percentage points.
 */
export function KpiTiles({
  view,
  compare,
}: {
  view: SearchPerformanceView;
  compare: CompareMode;
}) {
  const { totals, window } = view;
  const current = totals.current;
  const changes =
    compare === "previous"
      ? totals.vsPrevious
      : compare === "yoy"
        ? totals.vsYoy
        : null;
  const against =
    compare === "previous"
      ? totals.previous
      : compare === "yoy"
        ? totals.yoy
        : null;
  const span =
    compare === "previous"
      ? window.previous
      : compare === "yoy"
        ? window.yoy
        : null;
  const deltaTitle = span
    ? t("{start} – {end} dönemine göre", {
        start: formatDate(span.startDate),
        end: formatDate(span.endDate),
      })
    : undefined;
  const hasImpressions = current.impressions > 0;
  const days = view.series.daily.filter(
    (p) => p.date >= window.startDate && p.date <= window.endDate,
  );

  return (
    <div className="space-y-1.5">
      <MetricRow>
        <MetricTile
          metric="clicks"
          label={t("Tıklama")}
          trend={days.map((p) => p.clicks)}
          value={formatCount(current.clicks)}
          animateTo={{ value: current.clicks, format: formatCount }}
          delta={countDelta(changes?.clicks)}
          deltaTitle={deltaTitle}
        />
        <MetricTile
          metric="impressions"
          label={t("Gösterim")}
          trend={days.map((p) => p.impressions)}
          value={formatCount(current.impressions)}
          animateTo={{ value: current.impressions, format: formatCount }}
          delta={countDelta(changes?.impressions)}
          deltaTitle={deltaTitle}
        />
        <MetricTile
          metric="ctr"
          label={t("Tıklama oranı")}
          trend={days.map((p) => p.ctr)}
          value={current.ctr === null ? null : formatPercent(current.ctr)}
          animateTo={
            current.ctr === null
              ? undefined
              : { value: current.ctr, format: (n) => formatPercent(n) }
          }
          delta={hasImpressions ? pointsDelta(current.ctr, against?.ctr) : null}
          deltaTitle={deltaTitle}
        />
        <MetricTile
          metric="position"
          label={t("Ortalama sıra")}
          trend={days.map((p) => p.position)}
          value={
            current.position === null ? null : formatDecimal(current.position)
          }
          animateTo={
            current.position === null
              ? undefined
              : { value: current.position, format: (n) => formatDecimal(n) }
          }
          delta={
            hasImpressions
              ? placesDelta(current.position, against?.position)
              : null
          }
          deltaTitle={deltaTitle}
          inverted
        />
      </MetricRow>
      <details className="text-sm text-muted">
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Ölçüler ne demek?")}
        </summary>
        <div className="max-w-prose space-y-1.5 leading-relaxed">
          <p>
            {t("Gösterimlerin yüzde kaçı tıklamaya döndü.")}{" "}
            {t(
              "Oran değişimi yüzde puanla gösterilir: iki dönemin yüzdeleri arasındaki farktır.",
            )}
          </p>
          <p>{t("Düşük sayı daha iyi: 1, listenin en üstü demek.")}</p>
        </div>
      </details>
    </div>
  );
}
