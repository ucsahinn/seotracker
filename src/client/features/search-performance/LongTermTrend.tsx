import { t } from "@/shared/i18n";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_GRID,
  CHART_SERIES,
} from "@/client/components/Chart";
import { Skeleton } from "@/client/components/Skeleton";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { formatCount, formatDate, formatMonth } from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { getSiteDailyHistory } from "@/serverFunctions/searchPerformance";
import type {
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

type MonthBar = {
  month: string;
  clicks: number;
  days: number;
  partial: boolean;
};

/** The last day of the month that starts at `month` (YYYY-MM-01). */
function monthEnd(month: string): string {
  const [year, mon] = month.split("-").map(Number);
  return new Date(Date.UTC(year ?? 0, mon ?? 1, 0)).toISOString().slice(0, 10);
}

/** The first day of the month after `month` (YYYY-MM-01). */
function addMonth(month: string): string {
  const [year, mon] = month.split("-").map(Number);
  return new Date(Date.UTC(year ?? 0, mon ?? 1, 1)).toISOString().slice(0, 10);
}

function monthBars(days: Array<{ date: string; clicks: number }>): MonthBar[] {
  const byMonth = new Map<string, { clicks: number; days: number }>();
  for (const day of days) {
    const month = `${day.date.slice(0, 7)}-01`;
    const entry = byMonth.get(month) ?? { clicks: 0, days: 0 };
    entry.clicks += day.clicks;
    entry.days += 1;
    byMonth.set(month, entry);
  }
  return [...byMonth.entries()].map(([month, entry]) => {
    const length = Number(monthEnd(month).slice(8, 10));
    return {
      month,
      clicks: entry.clicks,
      days: entry.days,
      partial: entry.days < length,
    };
  });
}

/**
 * Monthly clicks from the local archive, which keeps the days Search
 * Console forgets after 16 months. A month the archive does not hold in full
 * is drawn hollow and says how many days it has.
 */
export function LongTermTrend({
  projectId,
  searchType,
  device,
}: {
  projectId: string;
  searchType: SearchPerformanceType;
  device?: SearchPerformanceDevice;
}) {
  const reduced = useReducedMotion();
  const history = useQuery({
    queryKey: ["siteDailyHistory", projectId, searchType, device ?? null],
    queryFn: () =>
      getSiteDailyHistory({
        data: {
          projectId,
          searchType,
          days: 730,
          ...(device ? { device } : {}),
        },
      }),
    staleTime: 10 * 60_000,
  });
  if (history.isPending) return <Skeleton variant="chart" className="px-4" />;
  const failure = history.isError ? (
    <QueryErrorState
      error={history.error}
      onRetry={() => void history.refetch()}
      compact
    />
  ) : null;
  if (!history.data) return failure;
  if (history.data.days.length === 0) {
    return (
      <div>
        {failure}
        <p className="px-4 text-sm text-muted">
          {t(
            "Arşivde henüz gün yok. Bu ekran her açıldığında Search Console'dan günlük toplamları alıp bu bilgisayarda saklar; ay ay eğilim birkaç gün içinde burada görünür.",
          )}
        </p>
      </div>
    );
  }
  const bars = monthBars(history.data.days);
  /*
   * The newest month is cut short by Search Console's lag, not by the
   * archive, while the archive has not yet reached its last day: it says so
   * in words rather than leaving a short dashed bar to read as a drop. That
   * holds in the first days of the next month too, when the previous month
   * is still arriving; once the archive covers through its last day the
   * month is simply complete.
   */
  const last = bars[bars.length - 1];
  const lastMonth = last?.month;
  const latest = history.data.latestDate;
  const untilMonth = history.data.until.slice(0, 7);
  // Still this calendar month, or the previous one's last days in transit.
  const thisMonth = lastMonth?.slice(0, 7) === untilMonth;
  const previousMonth =
    lastMonth !== undefined && addMonth(lastMonth).slice(0, 7) === untilMonth;
  const running =
    last !== undefined &&
    last.partial &&
    (thisMonth || previousMonth) &&
    latest !== null &&
    latest < monthEnd(last.month);
  if (bars.length < 2) {
    return (
      <div>
        {failure}
        <p className="px-4 text-sm text-muted">
          {t(
            "Arşiv {date} tarihinden başlıyor; iki ay dolunca eğilim burada görünür.",
            {
              date: formatDate(history.data.earliestDate ?? history.data.since),
            },
          )}
        </p>
      </div>
    );
  }
  return (
    <div className="px-2">
      {failure}
      <Chart
        height={180}
        summary={t("{count} aylık tıklama, {start} – {end}.", {
          count: bars.length,
          start: formatMonth(bars[0]?.month ?? ""),
          end: formatMonth(bars[bars.length - 1]?.month ?? ""),
        })}
        table={{
          caption: t("Aylık tıklama"),
          columns: [t("Ay"), t("Tıklama"), t("Gün")],
          rows: bars.map((b) => [
            formatMonth(b.month),
            formatCount(b.clicks),
            formatCount(b.days),
          ]),
        }}
      >
        <BarChart data={bars} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid {...CHART_GRID} />
          <XAxis
            dataKey="month"
            {...CHART_AXIS}
            tickFormatter={formatMonth}
            minTickGap={16}
          />
          <YAxis {...CHART_AXIS} width={52} tickFormatter={formatCount} />
          <Tooltip
            cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
            content={({ active, label }) => {
              if (!active || typeof label !== "string") return null;
              const bar = bars.find((b) => b.month === label);
              if (!bar) return null;
              return (
                <ChartTooltip
                  title={formatMonth(label)}
                  rows={[
                    {
                      label: t("Tıklama"),
                      value: formatCount(bar.clicks),
                      color: CHART_SERIES.primary,
                    },
                    ...(running && bar.month === lastMonth
                      ? [
                          {
                            label: t("Durum"),
                            value: thisMonth
                              ? t("Bu ay henüz tamamlanmadı ({days} gün)", {
                                  days: bar.days,
                                })
                              : t(
                                  "Ayın son günleri henüz gelmedi ({days} gün)",
                                  {
                                    days: bar.days,
                                  },
                                ),
                          },
                        ]
                      : bar.partial
                        ? [
                            {
                              label: t("Arşivdeki gün"),
                              value: formatCount(bar.days),
                            },
                          ]
                        : []),
                  ]}
                />
              );
            }}
          />
          <Bar
            dataKey="clicks"
            radius={[4, 4, 0, 0]}
            isAnimationActive={!reduced}
            shape={(props: {
              x?: number;
              y?: number;
              width?: number;
              height?: number;
              payload?: MonthBar;
            }) => {
              const { x = 0, y = 0, width = 0, height = 0, payload } = props;
              const hollow = payload?.partial ?? false;
              const inProgress = running && payload?.month === lastMonth;
              return (
                <g>
                  <rect
                    x={x + 1}
                    y={y}
                    width={Math.max(width - 2, 1)}
                    height={height}
                    rx={3}
                    fill={hollow ? "transparent" : CHART_SERIES.primary}
                    stroke={CHART_SERIES.primary}
                    strokeWidth={hollow ? 1.5 : 0}
                    strokeDasharray={hollow ? "3 2" : undefined}
                  />
                  {inProgress ? (
                    <text
                      x={x + width / 2}
                      y={y - 4}
                      textAnchor="end"
                      fontSize={10}
                      fill="var(--text-muted)"
                    >
                      {t("sürüyor")}
                    </text>
                  ) : null}
                </g>
              );
            }}
          />
        </BarChart>
      </Chart>
      <p className="px-2 pb-1 text-xs text-muted">
        {running
          ? `${
              thisMonth
                ? t("Son çubuk kesik çizgili: bu ay henüz tamamlanmadı.")
                : t(
                    "Son çubuk kesik çizgili: ayın son günleri Search Console'dan henüz gelmedi.",
                  )
            } `
          : null}
        {t(
          "Bu bilgisayardaki arşivden, cihaz filtresine göre (ülke filtresi uygulanmaz). Kesik çizgili çubuk: arşivin o ayın tamamını tutmadığı ay.",
        )}
      </p>
    </div>
  );
}
