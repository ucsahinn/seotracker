import {
  strikingEstimateText,
  strikingMethodText,
} from "@/shared/strikingEstimateCopy";
import type {
  toLegacyReport,
  SearchPerformanceView,
} from "@/shared/searchPerformanceView";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import {
  CHART_AXIS,
  CHART_SERIES,
  Chart,
  ChartTooltip,
} from "@/client/components/Chart";
import {
  CardShell,
  moreDetailsClass,
} from "@/client/features/dashboard/cardParts";
import {
  dashboardGscReportQuery,
  dashboardSearchViewQuery,
} from "@/client/features/dashboard/dashboardGscReport";
import { gainText, countDelta } from "@/shared/searchTodoCopy";
import { describeClickTrend } from "@/client/features/dashboard/clickTrend";
import { DeltaBadge } from "@/client/components/MetricTile";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { EmptyState } from "@/client/components/EmptyState";
import {
  formatCount,
  formatDate,
  formatDay,
  formatDecimal,
} from "@/client/lib/format";
import { t } from "@/shared/i18n";

const TOP_QUERIES = 4;

/**
 * Two cards under the metric row, fed by the report the row already fetched
 * (same query key, so no extra Search Console call): when the clicks moved,
 * and which queries sit just off page one. Each answers a question the four
 * totals cannot, and each opens the screen that goes deeper.
 *
 * Silent when Search Console is not connected or the report failed: the
 * metric row above already says which, and a second error here would only
 * repeat it.
 */
export function SearchInsights({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const reduced = useReducedMotion();
  const query = useQuery(dashboardGscReportQuery(projectId, connected));
  // The same cache entry as above, read whole for the striking list.
  const viewQuery = useQuery(dashboardSearchViewQuery(projectId, connected));
  if (!connected || query.isError) return null;

  if (query.isPending) {
    return (
      <div className="grid gap-5 lg:grid-cols-2" aria-busy>
        <div className="skeleton h-56" />
        <div className="skeleton h-56" />
      </div>
    );
  }

  const report: ReturnType<typeof toLegacyReport> | null = query.data.connected
    ? query.data
    : null;
  if (!report) return null;

  const trend = describeClickTrend(report.daily);
  /*
   * The same comparison the Tıklama tile above makes (previous period), so
   * the two percentages for clicks cannot disagree.
   */
  const change =
    report.prevTotals.clicks > 0
      ? (report.totals.clicks - report.prevTotals.clicks) /
        report.prevTotals.clicks
      : null;
  const view: SearchPerformanceView | null = viewQuery.data?.connected
    ? viewQuery.data
    : null;
  const delta = countDelta(view?.totals.vsPrevious?.clicks);
  const striking = (view?.insights.striking.rows ?? []).slice(0, TOP_QUERIES);
  const strikingTotal = view?.insights.striking.total ?? 0;
  // Over every striking query, not only the rows the view lists.
  const estimate = view?.insights.striking.estimate;
  const points = report.daily.map((row, i) => ({
    ...row,
    previousClicks: view?.series.previousDaily?.[i]?.clicks ?? null,
  }));

  return (
    <div className="space-y-5">
      {trend ? (
        <div>
          <CardShell
            title={t("Tıklama eğilimi")}
            action={
              <Link
                to="/p/$projectId/search-performance"
                params={{ projectId }}
                search={{ tab: "queries" }}
                className={moreDetailsClass}
              >
                {t("Sorguları aç")}
              </Link>
            }
          >
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-sm font-medium tabular-nums">
                {formatDate(report.range.startDate)} –{" "}
                {formatDate(report.range.endDate)}
              </p>
              <p className="text-sm text-muted">
                {view?.series.previousDaily
                  ? t("Günlük tıklamalar; soluk çizgi önceki dönemi gösterir.")
                  : t("Karşılaştırma yok")}
              </p>
              {delta !== null ? (
                <span className="inline-flex items-center gap-1 text-sm tabular-nums">
                  <DeltaBadge value={delta} />
                  <span className="text-muted"> {t("önceki döneme göre")}</span>
                </span>
              ) : null}
            </div>
            <Chart
              height={120}
              summary={[
                t("Son {days} günde {total} tıklama.", {
                  days: formatCount(report.daily.length),
                  total: formatCount(trend.total),
                }),
                change === null
                  ? null
                  : t(
                      change >= 0
                        ? "Önceki döneme göre yüzde {percent} yüksek."
                        : "Önceki döneme göre yüzde {percent} düşük.",
                      { percent: formatDecimal(Math.abs(change) * 100, 0) },
                    ),
                t("En yüksek gün {day}, {clicks} tıklama.", {
                  day: formatDay(trend.peakDay),
                  clicks: formatCount(trend.peakClicks),
                }),
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <AreaChart
                data={points}
                margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
              >
                <XAxis
                  dataKey="key"
                  {...CHART_AXIS}
                  tickFormatter={formatDay}
                  minTickGap={40}
                />
                <Tooltip
                  cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                  content={({ active, label: day }) => {
                    if (!active || typeof day !== "string") return null;
                    const row = report.daily.find((entry) => entry.key === day);
                    if (!row) return null;
                    return (
                      <ChartTooltip
                        title={formatDay(day)}
                        rows={[
                          {
                            label: t("tıklama"),
                            value: formatCount(row.clicks),
                            color: CHART_SERIES.primary,
                          },
                        ]}
                      />
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="previousClicks"
                  name={t("Önceki dönem")}
                  stroke={CHART_SERIES.comparison}
                  strokeDasharray="4 4"
                  fillOpacity={0}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke={CHART_SERIES.primary}
                  strokeWidth={2}
                  fill={CHART_SERIES.primary}
                  fillOpacity={0.08}
                  isAnimationActive={!reduced}
                />
              </AreaChart>
            </Chart>
          </CardShell>
        </div>
      ) : null}

      <div>
        <CardShell
          title={t("Bir üst sıra bandına çıkabilecek sorgular")}
          action={
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              search={{ tab: "opportunities" }}
              className={moreDetailsClass}
            >
              {t("Tümünü gör")}
            </Link>
          }
        >
          <p className="mb-2 text-xs text-muted">
            {strikingMethodText(
              view?.insights.brandState.source ?? "none",
              view?.coverage.queries.truncated ?? false,
            )}
          </p>
          {striking.length === 0 ? (
            <EmptyState
              compact
              title={
                view?.totals.current.impressions === 0
                  ? t("Bu dönemde gösterim yok")
                  : t("Bu kapsamda uygun sorgu bulunmadı.")
              }
              description={t(
                "Şu an 4. ile 20. sıra arasında yeterli gösterimi olan sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.",
              )}
            />
          ) : (
            <>
              <p className="mb-2 text-sm text-muted">
                {t("{count} sorgu bir üst sıra bandı için değerlendirildi.", {
                  count: formatCount(strikingTotal),
                })}
              </p>
              <p className="mb-3 text-sm text-muted">
                {strikingEstimateText(estimate)}
              </p>
              <p className="mb-3 text-xs text-subtle">
                {t(
                  "Bu bir tahmindir; sayfa bazlı Fırsatlar toplamına eklenmez.",
                )}
              </p>
              <ul className="space-y-1">
                {striking.map((row) => (
                  <li key={row.query}>
                    <Link
                      to="/p/$projectId/search-performance"
                      params={{ projectId }}
                      search={{ tab: "queries", q: row.query }}
                      className="flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-field px-2 py-2 text-sm transition-colors hover:bg-base-200/60 focus-visible:outline-offset-[-2px]"
                    >
                      <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                        {row.query}
                      </span>
                      <span className="flex flex-wrap gap-x-2 tabular-nums text-muted">
                        {t("sıra {position}", {
                          position: formatDecimal(row.position),
                        })}
                        {row.potentialClicks !== null ? (
                          <span className="ml-2 font-medium text-[var(--ink-success)]">
                            {gainText(row.potentialClicks)}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardShell>
      </div>
    </div>
  );
}
