import { GA4_HELP } from "@/client/features/analytics/metricHelp";
import { HeaderHelpLabel } from "@/client/features/saved-keywords/components/HeaderHelpLabel";
import { fractionalChange, pointsDelta } from "@/shared/delta";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { useQuery } from "@tanstack/react-query";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_GRID,
  CHART_SERIES,
} from "@/client/components/Chart";
import { DeltaBadge } from "@/client/components/MetricTile";
import {
  formatCount,
  formatDate,
  formatDay,
  formatMoney,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { ga4OverviewQuery } from "@/client/features/dashboard/ga4OverviewQuery";
import { Ga4Provenance } from "@/client/features/dashboard/Ga4Provenance";
import { t } from "@/shared/i18n";

type TrendRow = { date: string; sessions: number | null };

/**
 * The shape of the window, above the table that lists it.
 *
 * The overview service has produced a daily trend since it was written and
 * the dashboard card was its only reader — so the screen whose entire
 * subject is Analytics drew seven tables and not one line. Same service,
 * same call shape, with the window the operator already picked.
 */
export function OrganicTrendPanel({
  projectId,
  windowDays,
}: {
  projectId: string;
  windowDays: number;
}) {
  const query = useQuery(ga4OverviewQuery(projectId, windowDays));

  if (query.isPending) return <div className="skeleton h-40" aria-busy />;
  // A failure is said here too: the tables below read other queries, and can
  // succeed while this one fails, which left a silent gap above them.
  if (query.isError)
    return (
      <section className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          title={t("Organik oturum grafiği yüklenemedi")}
          error={query.error}
          onRetry={() => void query.refetch()}
        />
      </section>
    );
  // Not connected: the tables below say so in their own words.
  if (!query.data?.connected) return null;

  const { totals, prevTotals, trend, previousDateRange } = query.data;
  /* The same sentence the search-performance totals use, so a reader who
     has seen one knows what the other means. */
  const deltaTitle = t("{start} – {end} dönemine göre", {
    start: formatDate(previousDateRange.startDate),
    end: formatDate(previousDateRange.endDate),
  });
  const rows: TrendRow[] = trend;
  const limited =
    query.data.reportMetadata.hasLimitedData || query.data.warnings.length > 0;
  const hasSessions = rows.some((row) => row.sessions !== null);

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-base-300 px-4 py-3">
        <div>
          <h2 className="text-sm font-medium">{t("Organik oturumlar")}</h2>
          <p className="mt-0.5 text-xs text-muted">
            {t("Seçtiğiniz aralık, gün gün.")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Total
            label={t("Oturum")}
            value={totals.sessions}
            previous={limited ? null : prevTotals.sessions}
            deltaTitle={deltaTitle}
            format={formatCount}
          />
          <Total
            label={t("Etkileşim oranı")}
            help={t(GA4_HELP.engagementRate)}
            value={totals.engagementRate}
            previous={prevTotals.engagementRate}
            deltaTitle={deltaTitle}
            format={(n) => formatPercent(n)}
            rate
          />
          {/* Fetched on every load for both windows and dropped before it
              reached the screen. GA4 answers 0 rather than null for a
              property with no shop, so zero in both windows -- not null --
              is what says there is no ecommerce here. */}
          {(totals.purchaseRevenue ?? 0) > 0 ||
          (prevTotals.purchaseRevenue ?? 0) > 0 ? (
            <Total
              label={t("Organik gelir")}
              value={totals.purchaseRevenue}
              previous={prevTotals.purchaseRevenue}
              deltaTitle={deltaTitle}
              format={(value) =>
                query.data.currencyCode
                  ? formatMoney(value, query.data.currencyCode)
                  : t("{value} (para birimi bilinmiyor)", {
                      value: formatDecimal(value),
                    })
              }
            />
          ) : null}
        </div>
      </div>

      <div className="px-4 py-3">
        <Ga4Provenance report={query.data} />
      </div>
      {hasSessions ? (
        <div className="px-2 py-3">
          <TrendChart rows={rows} />
        </div>
      ) : (
        /* A flat line along zero is a shape that looks like an answer. */
        <p className="px-4 py-6 text-sm text-muted">
          {t("Gösterilecek oturum verisi yok.")}
        </p>
      )}
    </section>
  );
}

function Total({
  label,
  value,
  previous,
  deltaTitle,
  format,
  help,
  rate = false,
}: {
  label: string;
  help?: string;
  /** A rate moves in points ("-0,3 puan"), as CTR does, not as a percentage of itself. */
  rate?: boolean;
  value: number | null;
  previous: number | null;
  /** What the delta is measured against, named rather than implied. */
  deltaTitle: string;
  format: (value: number) => string;
}) {
  const change =
    value === null || previous === null
      ? null
      : rate
        ? pointsDelta(value, previous)
        : fractionalChange(value, previous);
  return (
    <div className="text-right">
      <p className="text-xs text-muted">
        {help ? <HeaderHelpLabel label={label} helpText={help} /> : label}
      </p>
      <p className="flex items-center gap-1.5 text-sm font-medium tabular-nums">
        {value === null ? (
          "--"
        ) : (
          <AnimatedNumber value={value} format={format} />
        )}
        {change === null ? null : (
          <DeltaBadge value={change} title={deltaTitle} />
        )}
      </p>
    </div>
  );
}

function TrendChart({ rows }: { rows: TrendRow[] }) {
  const reduced = useReducedMotion();
  const total = rows.reduce((sum, row) => sum + (row.sessions ?? 0), 0);
  const peak = rows.reduce((best, row) =>
    (row.sessions ?? 0) > (best.sessions ?? 0) ? row : best,
  );

  return (
    <Chart
      height={180}
      summary={
        rows.some((row) => row.sessions === null)
          ? t(
              "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
            )
          : t(
              "{days} günde toplam {total} organik oturum. En yüksek gün {day}, {peak} oturum.",
              {
                days: formatCount(rows.length),
                total: formatCount(total),
                day: formatDay(peak.date),
                peak: formatCount(peak.sessions ?? 0),
              },
            )
      }
    >
      <AreaChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid {...CHART_GRID} />
        <XAxis
          dataKey="date"
          {...CHART_AXIS}
          tickFormatter={formatDay}
          minTickGap={24}
        />
        <YAxis
          {...CHART_AXIS}
          width={48}
          tickFormatter={formatCount}
          domain={[0, "auto"]}
        />
        <Tooltip
          cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
          content={({ active, label }) => {
            if (!active || typeof label !== "string") return null;
            const row = rows.find((entry) => entry.date === label);
            if (!row) return null;
            return (
              <ChartTooltip
                title={formatDay(label)}
                rows={[
                  {
                    label: t("oturum"),
                    value:
                      row.sessions === null ? "–" : formatCount(row.sessions),
                    color: CHART_SERIES.primary,
                  },
                ]}
              />
            );
          }}
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
  );
}
