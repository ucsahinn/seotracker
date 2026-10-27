import { GA4_HELP } from "@/client/features/analytics/metricHelp";
import { fractionalChange, pointsDelta } from "@/shared/delta";
import { GA4_DATA_LAG_DAYS, GSC_DATA_LAG_DAYS } from "@/shared/dataFreshness";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import {
  CardShell,
  moreDetailsClass,
  Stat,
} from "@/client/features/dashboard/cardParts";
import { DeltaBadge } from "@/client/components/MetricTile";
import { Chart, CHART_SERIES } from "@/client/components/Chart";
import { Ga4ConnectCard } from "@/client/features/dashboard/Ga4ConnectCard";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  formatCount,
  formatDay,
  formatMoney,
  formatPercent,
} from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { getGa4DashboardReport } from "@/serverFunctions/ga4";
import { formatDate } from "@/client/lib/format";
import { t } from "@/shared/i18n";

function formatTrendDay(date: string): string {
  // `formatDay` handles the calendar-day shape and is pinned to tr-TR; this
  // used to pass `undefined` as the locale, so the axis read "Aug 1" in a
  // container with no LANG while the rest of the dashboard read "1 Ağu".
  return formatDay(date);
}

function statValue(
  value: number | null,
  format: (value: number) => string,
): string {
  // "–", matching MetricTile: two absence glyphs on one screen for the
  // same meaning is a detail the reader has to resolve for no reason.
  return value === null ? "–" : format(value);
}

/** The count-up props, only when there is a number. */
function count(value: number | null, format: (n: number) => string) {
  return value === null ? undefined : { value, format };
}

function statDelta(current: number | null, previous: number | null) {
  if (current === null || previous === null) return undefined;
  const change = fractionalChange(current, previous);
  return change === null ? undefined : <DeltaBadge value={change} />;
}

function SessionsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-3 py-2 shadow-sm">
      <p className="text-xs text-muted">{label ? formatTrendDay(label) : ""}</p>
      <p className="text-sm font-medium tabular-nums">
        {t("{count} oturum", { count: payload[0].value })}
      </p>
    </div>
  );
}

export function Ga4Card({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const reduced = useReducedMotion();
  const reportQuery = useQuery({
    queryKey: ["dashboardGa4Report", projectId],
    queryFn: () => getGa4DashboardReport({ data: { projectId } }),
    enabled: connected,
    // The server already retried Google; a lost property or an expired
    // grant will not fix itself, so say so after one more try.
    retry: 1,
  });

  // Never connected: the connection card sells and runs the whole flow
  // itself. A broken connection is an error below, with its cause.
  if (!connected || (reportQuery.data && !reportQuery.data.connected)) {
    return <Ga4ConnectCard projectId={projectId} connected={connected} />;
  }

  const report = reportQuery.data;
  /*
   * The dates the report actually covers, rather than a literal beside a
   * query whose window is a service default -- the two could disagree and
   * nothing would catch it. Absent while the first load is in flight, so the
   * stamp names the source alone until the dates arrive.
   */
  const covered = report?.connected ? report.resolvedDateRange : null;
  /*
   * Whether this property sells anything, rather than whether it sold
   * anything this week: a shop with a quiet window still wants its revenue
   * tile, and a site with no shop never wants it.
   */
  const hasEcommerce =
    report?.connected === true &&
    ((report.totals.purchaseRevenue ?? 0) > 0 ||
      (report.prevTotals.purchaseRevenue ?? 0) > 0 ||
      (report.totals.transactions ?? 0) > 0 ||
      (report.prevTotals.transactions ?? 0) > 0);

  return (
    <CardShell
      title={t("Organik trafik")}
      stamp={
        covered
          ? `Google Analytics · ${formatDate(covered.startDate)} – ${formatDate(covered.endDate)}`
          : "Google Analytics"
      }
      action={
        <div className="flex items-center gap-1">
          {report?.connected ? (
            <Link
              to="/p/$projectId/analytics"
              params={{ projectId }}
              className={moreDetailsClass}
            >
              {t("Raporlar")}
            </Link>
          ) : null}
          <Link
            to="/p/$projectId/settings"
            params={{ projectId }}
            hash="google-analytics"
            className={moreDetailsClass}
          >
            {t("Yönet")}
          </Link>
        </div>
      }
    >
      {reportQuery.isPending ? (
        <div className="space-y-3" aria-busy>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="skeleton h-16" />
            ))}
          </div>
          <div className="skeleton h-24" />
        </div>
      ) : reportQuery.isError ? (
        <div className="space-y-2 text-sm">
          <p className="text-muted">
            {/* The server's sentence names the cause (quota, permission,
                removed property, no connection) and the fix. */}
            {getStandardErrorMessage(
              reportQuery.error,
              t("Google Analytics verileri yüklenemedi."),
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/p/$projectId/settings"
              params={{ projectId }}
              hash="google-analytics"
              className="btn btn-primary btn-xs"
            >
              {t("Bağlantıyı düzelt")}
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={() => void reportQuery.refetch()}
            >
              {t("Tekrar dene")}
            </button>
          </div>
        </div>
      ) : report?.connected ? (
        // Covers null (no report row) and 0: a zero-session period would
        // otherwise render an all-zero flatline chart in an empty box.
        !report.totals.sessions ? (
          <p className="text-sm text-muted">
            {t("Bu aralıkta organik arama trafiği kaydedilmemiş.")}
          </p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Stat
                label={t("Oturum")}
                value={statValue(report.totals.sessions, formatCount)}
                animateTo={count(report.totals.sessions, formatCount)}
                sub={statDelta(
                  report.totals.sessions,
                  report.prevTotals.sessions,
                )}
              />
              <Stat
                label={t("Aktif kullanıcı")}
                help={t(GA4_HELP.activeUsers)}
                value={statValue(report.totals.activeUsers, formatCount)}
                animateTo={count(report.totals.activeUsers, formatCount)}
                sub={statDelta(
                  report.totals.activeUsers,
                  report.prevTotals.activeUsers,
                )}
              />
              <Stat
                label={t("Etkileşim oranı")}
                help={t(GA4_HELP.engagementRate)}
                value={statValue(report.totals.engagementRate, formatPercent)}
                animateTo={count(report.totals.engagementRate, (n) =>
                  formatPercent(n),
                )}
                sub={(() => {
                  // A rate moves in points, as CTR does on the tiles above.
                  const delta = pointsDelta(
                    report.totals.engagementRate,
                    report.prevTotals.engagementRate,
                  );
                  return delta ? <DeltaBadge value={delta} /> : undefined;
                })()}
              />
              <Stat
                label={t("Anahtar olay")}
                help={t(GA4_HELP.keyEvents)}
                value={statValue(report.totals.keyEvents, formatCount)}
                animateTo={count(report.totals.keyEvents, formatCount)}
                sub={statDelta(
                  report.totals.keyEvents,
                  report.prevTotals.keyEvents,
                )}
              />
              {/*
               * Revenue, when the property records any. It was fetched on
               * every dashboard load -- for this window and the previous
               * one -- and thrown away at the projection.
               *
               * GA4 answers 0 rather than null for a property with no shop,
               * so "is this null" was the wrong question: it put a confident
               * "Organik gelir ₺0" on the dashboard of every site that does
               * not sell anything. Zero in *both* windows is what says the
               * property has no ecommerce at all.
               */}
              {hasEcommerce ? (
                <Stat
                  label={t("Organik gelir")}
                  value={statValue(report.totals.purchaseRevenue, (value) =>
                    formatMoney(value, report.currencyCode),
                  )}
                  sub={statDelta(
                    report.totals.purchaseRevenue,
                    report.prevTotals.purchaseRevenue,
                  )}
                />
              ) : null}
              {hasEcommerce ? (
                <Stat
                  label={t("Sipariş")}
                  value={statValue(report.totals.transactions, formatCount)}
                  sub={statDelta(
                    report.totals.transactions,
                    report.prevTotals.transactions,
                  )}
                />
              ) : null}
            </div>
            {/* Why these days differ from the Search Console tiles above. */}
            <p className="text-xs text-subtle">
              {t(
                "Analytics {ga4} gün, Search Console {gsc} gün geriden gelir; bu yüzden buradaki günler üstteki tıklama kutularından farklıdır. Değişimler önceki aynı uzunluktaki döneme göredir.",
                { ga4: GA4_DATA_LAG_DAYS, gsc: GSC_DATA_LAG_DAYS },
              )}
            </p>
            {/*
             * Through the shared wrapper like every other chart. Its own
             * `ResponsiveContainer` measured during hydration, before the
             * card had layout, and printed a -1 warning to the console of
             * every install on every dashboard load.
             */}
            <Chart
              height={96}
              summary={trendSummary(report.trend)}
              className="[&_figcaption]:hidden"
            >
              <AreaChart
                data={report.trend}
                margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide domain={[0, "auto"]} />
                <Tooltip
                  content={<SessionsTooltip />}
                  cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke={CHART_SERIES.primary}
                  strokeWidth={2}
                  fill={CHART_SERIES.primary}
                  fillOpacity={0.08}
                  isAnimationActive={!reduced}
                />
              </AreaChart>
            </Chart>
          </div>
        )
      ) : null}
    </CardShell>
  );
}

/*
 * The card's chart has no axes -- it is a shape, not a readout -- so the
 * sentence is the only thing a screen reader gets from it.
 */
function trendSummary(
  trend: Array<{ date: string; sessions: number }>,
): string {
  if (trend.length === 0) return t("Gösterilecek oturum verisi yok.");
  const total = trend.reduce((sum, row) => sum + row.sessions, 0);
  const peak = trend.reduce((best, row) =>
    row.sessions > best.sessions ? row : best,
  );
  return t(
    "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.",
    {
      days: formatCount(trend.length),
      total: formatCount(total),
      day: formatTrendDay(peak.date),
      peak: formatCount(peak.sessions),
    },
  );
}
