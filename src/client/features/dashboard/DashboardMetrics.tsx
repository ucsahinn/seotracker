import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import { useQuery } from "@tanstack/react-query";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { dashboardSearchViewQuery } from "./dashboardGscReport";
import { countDelta } from "@/client/components/MetricTile";
import { placesDelta, pointsDelta } from "@/shared/delta";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/shared/format";
import { t } from "@/shared/i18n";
export function DashboardMetrics({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const query = useQuery(dashboardSearchViewQuery(projectId, connected));
  if (connected && query.isPending)
    return (
      <MetricRow>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="px-5 py-4">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton mt-3 h-7 w-24" />
          </div>
        ))}
      </MetricRow>
    );
  if (connected && query.isError && !query.data)
    return (
      <QueryErrorState
        compact
        error={query.error}
        onRetry={() => void query.refetch()}
        title={t("Search Console verisi alınamadı")}
      />
    );
  const view: SearchPerformanceView | null = query.data?.connected
    ? query.data
    : null;
  const current = view?.totals.current;
  const previous = view?.totals.previous;
  const changes = view?.totals.vsPrevious;
  const days = view?.series.daily.filter(
    (p) => p.date >= view.window.startDate && p.date <= view.window.endDate,
  );
  const deltaTitle =
    view && previous
      ? t("{start} – {end} dönemine göre", {
          start: formatDate(view.window.previous.startDate),
          end: formatDate(view.window.previous.endDate),
        })
      : t("Karşılaştırma yok");
  const href = { to: "/p/$projectId/search-performance" as const, projectId };
  return (
    <div className="space-y-2">
      <MetricRow>
        <MetricTile
          metric="clicks"
          label={t("Tıklama")}
          value={current ? formatCount(current.clicks) : null}
          animateTo={
            current ? { value: current.clicks, format: formatCount } : undefined
          }
          trend={days?.map((p) => p.clicks)}
          delta={countDelta(changes?.clicks)}
          deltaTitle={deltaTitle}
          href={href}
        />
        <MetricTile
          metric="impressions"
          label={t("Gösterim")}
          value={current ? formatCount(current.impressions) : null}
          animateTo={
            current
              ? { value: current.impressions, format: formatCount }
              : undefined
          }
          trend={days?.map((p) => p.impressions)}
          delta={countDelta(changes?.impressions)}
          deltaTitle={deltaTitle}
          href={href}
        />
        <MetricTile
          metric="ctr"
          label={t("Tıklama oranı")}
          value={current?.ctr == null ? null : formatPercent(current.ctr)}
          trend={days?.map((p) => p.ctr)}
          delta={pointsDelta(current?.ctr, previous?.ctr)}
          deltaTitle={deltaTitle}
          href={href}
        />
        <MetricTile
          metric="position"
          label={t("Ortalama sıra")}
          value={
            current?.position == null ? null : formatDecimal(current.position)
          }
          trend={days?.map((p) => p.position)}
          delta={placesDelta(current?.position, previous?.position)}
          deltaTitle={deltaTitle}
          inverted
          href={href}
        />
      </MetricRow>
      <details className="text-sm text-muted">
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Veri hakkında")}
        </summary>
        <div className="max-w-prose space-y-1.5 leading-relaxed">
          <p>{t("Google aramasından sitenize gelen tıklamalar.")}</p>
          <p>{t("Sitenizin Google sonuçlarında gösterilme sayısı.")}</p>
          <p>{t("Gösterimlerin yüzde kaçı tıklamaya döndü.")}</p>
          <p>{t("Düşük sayı daha iyi: 1, listenin en üstü demek.")}</p>
        </div>
      </details>
    </div>
  );
}
