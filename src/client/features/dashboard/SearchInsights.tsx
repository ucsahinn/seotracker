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
import { dashboardGscReportQuery } from "@/client/features/dashboard/dashboardGscReport";
import { describeClickTrend } from "@/client/features/dashboard/clickTrend";
import { DeltaBadge } from "@/client/components/MetricTile";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";
import { formatCount, formatDay, formatDecimal } from "@/client/lib/format";
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
  if (!connected || query.isError) return null;

  if (query.isPending) {
    return (
      <div className="grid gap-5 lg:grid-cols-2" aria-busy>
        <div className="skeleton h-56" />
        <div className="skeleton h-56" />
      </div>
    );
  }

  const report = query.data.connected ? query.data : null;
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
  const striking = report.strikingDistance.slice(0, TOP_QUERIES);

  return (
    <div className="stagger grid gap-5 lg:grid-cols-2">
      {trend ? (
        <div style={{ animationDelay: "0ms" }}>
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
              <p className="text-2xl font-semibold tabular-nums">
                {formatCount(trend.total)}
              </p>
              <p className="text-sm text-muted">
                {t("tıklama, son {days} gün", { days: DEFAULT_WINDOW_DAYS })}
              </p>
              {change !== null ? (
                <span className="inline-flex items-center gap-1 text-sm tabular-nums">
                  <DeltaBadge value={change} />
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
                data={report.daily}
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

      <div style={{ animationDelay: "60ms" }}>
        <CardShell
          title={t("Sıra 5-20 arası sorgular")}
          action={
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              search={{ tab: "striking" }}
              className={moreDetailsClass}
            >
              {t("Tümünü gör")}
            </Link>
          }
        >
          {striking.length === 0 ? (
            <p className="text-sm text-muted">
              {t(
                "Şu an 5. ile 20. sıra arasında sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.",
              )}
            </p>
          ) : (
            <ul className="space-y-1">
              {striking.map((row) => (
                <li key={row.query}>
                  <Link
                    to="/p/$projectId/search-performance"
                    params={{ projectId }}
                    search={{ tab: "queries", q: row.query }}
                    className="flex items-center justify-between gap-3 rounded-field px-1 py-1 text-sm transition-colors hover:bg-base-200/60"
                  >
                    <span className="min-w-0 truncate">{row.query}</span>
                    <span className="shrink-0 tabular-nums text-muted">
                      {t("{impressions} gösterim · sıra {position}", {
                        impressions: formatCount(row.impressions),
                        position: formatDecimal(row.position),
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardShell>
      </div>
    </div>
  );
}
