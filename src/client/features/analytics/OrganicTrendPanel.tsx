import { GA4_HELP } from "@/client/features/analytics/metricHelp";
import { HeaderHelpLabel } from "@/client/features/saved-keywords/components/HeaderHelpLabel";
import { fractionalChange, pointsDelta } from "@/shared/delta";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { useQuery } from "@tanstack/react-query";
import { getGa4DashboardReport } from "@/serverFunctions/ga4";
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
  channel = "organic_search",
  startDate,
  endDate,
  onOpenHealth,
}: {
  projectId: string;
  windowDays: number;
  channel?: "organic_search" | "all";
  startDate?: string;
  endDate?: string;
  onOpenHealth?: () => void;
}) {
  const defaults = ga4OverviewQuery(projectId, windowDays);
  const query = useQuery(
    channel === "organic_search" && !startDate && !endDate
      ? defaults
      : {
          ...defaults,
          queryKey: [
            "ga4Overview",
            projectId,
            windowDays,
            channel,
            startDate ?? "",
            endDate ?? "",
          ],
          queryFn: () =>
            getGa4DashboardReport({
              data: { projectId, windowDays, channel, startDate, endDate },
            }),
        },
  );

  if (query.isPending) return <div className="skeleton h-40" aria-busy />;
  // A failure is said here too: the tables below read other queries, and can
  // succeed while this one fails, which left a silent gap above them.
  if (query.isError && !query.data?.connected)
    return (
      <section className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          title={t("Google Analytics verileri yüklenemedi.")}
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
      {query.isError ? (
        <div>
          <QueryErrorState
            compact
            error={query.error}
            onRetry={() => void query.refetch()}
            title={t(
              "Son yenileme başarısız; önbellekteki veriler gösteriliyor.",
            )}
          />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-base-300 px-4 py-3">
        <div>
          <h2 className="text-sm font-medium">
            {channel === "all" ? t("Tüm trafik") : t("Organik arama motorları")}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {t("Seçtiğiniz aralık, gün gün.")}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-4">
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
            previous={limited ? null : prevTotals.engagementRate}
            deltaTitle={deltaTitle}
            format={(n) => formatPercent(n)}
            rate
          />
          <Total
            label={t("Anahtar olay")}
            help={t(GA4_HELP.keyEvents)}
            value={totals.keyEvents}
            previous={limited ? null : prevTotals.keyEvents}
            deltaTitle={deltaTitle}
            format={formatCount}
          />
          {/* Zero and unknown revenue remain visible with currency context. */}
          {
            <Total
              label={t("Gelir")}
              value={totals.purchaseRevenue}
              previous={limited ? null : prevTotals.purchaseRevenue}
              deltaTitle={deltaTitle}
              format={(value) =>
                query.data.currencyCode
                  ? formatMoney(value, query.data.currencyCode)
                  : t("{value} (para birimi bilinmiyor)", {
                      value: formatDecimal(value),
                    })
              }
            />
          }
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="mb-2 text-xs text-muted">
          {t(
            "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
          )}
        </p>
        <p className="mb-2 text-sm">
          {totals.sessions === null || totals.keyEvents === null
            ? t(
                "Trafik veya sonuç ölçümü okunamadı; dönüşüm yorumu yapılamıyor.",
              )
            : t(
                "Bu dönemde {sessions} oturum ve {events} anahtar olay kaydedildi.",
                {
                  sessions: formatCount(totals.sessions),
                  events: formatCount(totals.keyEvents),
                },
              )}
        </p>
        <Ga4Provenance report={query.data} />
        {query.data.warnings.includes("property_time_zone_changed") ? (
          <p role="status" className="text-xs text-muted">
            {t(
              "Mülkün saat dilimi değişmiş; bağlantı ayarlarını yenileyip tarihleri yeniden kontrol edin.",
            )}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-muted">
          {t(
            "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.",
          )}
        </p>
        {query.data.warnings.includes("end_date_clamped") ? (
          <p role="status" className="text-xs text-muted">
            {t(
              "Bitiş tarihi, mülkün saat diliminde düne çekildi; gösterilen tarihleri kullanın.",
            )}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-muted">
          {t(
            "Satış ölçümü doğrulanmadı; sıfır satış, mağaza olmadığı anlamına gelmez.",
          )}
        </p>
        {!limited &&
        query.data.diagnostics.some(
          (d) => d.code === "key_events_sharp_decline",
        ) ? (
          <p className="mt-2 text-sm text-[var(--ink-warning)]">
            {t(
              "Anahtar olaylar önceki döneme göre en az yarıya düştü. Bu bir gözlemdir; nedenini belirlemek için olayları ve ölçüm ayarlarını inceleyin.",
            )}
          </p>
        ) : null}
        {onOpenHealth ? (
          <button
            type="button"
            className="btn btn-sm mt-2 min-h-11"
            onClick={onOpenHealth}
          >
            {t("Ölçüm durumunu kontrol et")}
          </button>
        ) : null}
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
      <details className="px-4 pb-4">
        <summary className="min-h-11 cursor-pointer py-3 text-sm">
          {t("Günlük değerler")}
        </summary>
        <table className="table table-sm">
          <caption className="text-left text-xs text-muted">
            {t(
              "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.",
            )}
          </caption>
          <thead>
            <tr>
              <th>{t("Tarih")}</th>
              <th>{t("Oturum")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.date}>
                <td>{formatDate(row.date)}</td>
                <td>
                  {row.sessions === null
                    ? t("Bilinmiyor")
                    : formatCount(row.sessions)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
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
      {value === null || previous === null ? (
        <p className="text-xs text-muted">
          {t("Karşılaştırma yok; önceki değer okunamadı veya veri sınırlı.")}
        </p>
      ) : !rate && previous === 0 && value > 0 ? (
        <p className="text-xs text-muted">
          {t("Önceki dönem sıfır, şimdi {value}.", { value: format(value) })}
        </p>
      ) : !rate &&
        (value === previous ||
          (change !== null &&
            typeof change === "number" &&
            Math.abs(change) < 0.0005)) ? (
        <p className="text-xs text-muted">{t("Değişmedi")}</p>
      ) : null}
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
              "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.",
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
