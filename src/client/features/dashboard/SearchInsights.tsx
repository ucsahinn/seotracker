import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";
import {
  formatCount,
  formatDay,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

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
    <div className="stagger grid items-start gap-5 lg:grid-cols-2">
      {trend ? (
        <div style={{ animationDelay: "0ms" }}>
          <CardShell
            title="Tıklama eğilimi"
            action={
              <Link
                to="/p/$projectId/search-performance"
                params={{ projectId }}
                search={{ tab: "queries" }}
                className={moreDetailsClass}
              >
                Sorguları aç
              </Link>
            }
          >
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-semibold tabular-nums">
                {formatCount(trend.total)}
              </p>
              <p className="text-sm text-muted">
                tıklama, son {DEFAULT_WINDOW_DAYS} gün
              </p>
              {change !== null ? (
                <span
                  className={`inline-flex items-center gap-0.5 text-sm tabular-nums ${
                    change >= 0
                      ? "text-[var(--ink-success)]"
                      : "text-[var(--ink-error)]"
                  }`}
                >
                  {change >= 0 ? (
                    <ArrowUpRight className="size-4" aria-hidden />
                  ) : (
                    <ArrowDownRight className="size-4" aria-hidden />
                  )}
                  {formatPercent(Math.abs(change))}
                  <span className="text-muted"> önceki döneme göre</span>
                </span>
              ) : null}
            </div>
            <Chart
              height={120}
              summary={`Son ${formatCount(report.daily.length)} günde ${formatCount(trend.total)} tıklama. ${
                change === null
                  ? ""
                  : `Önceki döneme göre yüzde ${formatDecimal(Math.abs(change) * 100, 0)} ${change >= 0 ? "yüksek" : "düşük"}. `
              }En yüksek gün ${formatDay(trend.peakDay)}, ${formatCount(trend.peakClicks)} tıklama.`}
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
                            label: "tıklama",
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
                />
              </AreaChart>
            </Chart>
          </CardShell>
        </div>
      ) : null}

      <div style={{ animationDelay: "60ms" }}>
        <CardShell
          title="Sıra 5-20 arası sorgular"
          action={
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              search={{ tab: "striking" }}
              className={moreDetailsClass}
            >
              Tümünü gör
            </Link>
          }
        >
          {striking.length === 0 ? (
            <p className="text-sm text-muted">
              Şu an 5. ile 20. sıra arasında yer alan sorgu yok. Sıralamaya
              girdikçe en kolay kazanılacak olanlar burada listelenir.
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
                      {formatCount(row.impressions)} gösterim · sıra{" "}
                      {formatDecimal(row.position)}
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
