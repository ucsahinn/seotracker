import { t } from "@/shared/i18n";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_GRID,
  DATA_SERIES,
} from "@/client/components/Chart";
import { formatCount, formatDay, formatPercent } from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import { BAND_IDS, BAND_LABELS, type BandId } from "@/shared/positionBands";

/* Bands share the position hue; patterns distinguish them without fading marks. */
const BUCKET_FILL: Record<BandId, string> = {
  top3: DATA_SERIES.position,
  top10: `repeating-linear-gradient(0deg, ${DATA_SERIES.position} 0 3px, var(--color-base-100) 3px 5px)`,
  top20: `repeating-linear-gradient(90deg, ${DATA_SERIES.position} 0 3px, var(--color-base-100) 3px 5px)`,
  beyond: `repeating-linear-gradient(45deg, ${DATA_SERIES.position} 0 3px, var(--color-base-100) 3px 5px)`,
};

function bucketLabel(band: BandId): string {
  return t("Sıra {range}", { range: BAND_LABELS[band] });
}

/*
 * The view's finer buckets (21-50, 51+) folded into the app's one set of
 * position bands (positionBands.ts). Both cut on the rounded position, so
 * the fold is exact.
 */
const BAND_OF_BUCKET: Record<string, BandId> = {
  "1-3": "top3",
  "4-10": "top10",
  "11-20": "top20",
};

function toBands<T extends { bucket: string; queries: number }>(
  rows: readonly T[],
  extra: (row: T) => number,
): Array<{ band: BandId; queries: number; clicks: number }> {
  return BAND_IDS.map((band) => {
    const members = rows.filter(
      (r) => (BAND_OF_BUCKET[r.bucket] ?? "beyond") === band,
    );
    return {
      band,
      queries: members.reduce((sum, r) => sum + r.queries, 0),
      clicks: members.reduce((sum, r) => sum + extra(r), 0),
    };
  });
}

function bandCounts(
  buckets: ReadonlyArray<{ bucket: string; queries: number }>,
): Record<BandId, number> {
  const counts: Record<BandId, number> = {
    top3: 0,
    top10: 0,
    top20: 0,
    beyond: 0,
  };
  for (const b of buckets)
    counts[BAND_OF_BUCKET[b.bucket] ?? "beyond"] += b.queries;
  return counts;
}

/**
 * A week the archive holds in part: cut by the window (fewer than seven
 * days), or with far fewer queries than the fullest week -- the archive
 * fills backwards from the day it was first synced, so its oldest weeks hold
 * only the queries that were fetched then. Its shares are not comparable
 * with a full week, so it is drawn faint and named below.
 */
const MIN_WEEK_DAYS = 7;
const MIN_WEEK_COVERAGE = 0.5;

function weekCoverage(
  weeks: ReadonlyArray<{ days: number; total: number }>,
): boolean[] {
  const fullest = Math.max(0, ...weeks.map((w) => w.total));
  return weeks.map(
    (w) =>
      w.days >= MIN_WEEK_DAYS &&
      fullest > 0 &&
      w.total / fullest >= MIN_WEEK_COVERAGE,
  );
}

export function PositionDistribution({
  view,
}: {
  view: SearchPerformanceView;
}) {
  const reduced = useReducedMotion();
  const patternId = React.useId();
  const current = toBands(view.insights.positionDistribution, (r) => r.clicks);
  const total = current.reduce((sum, b) => sum + b.queries, 0);
  const totalClicks = current.reduce((sum, b) => sum + b.clicks, 0);
  const weekly = view.weeklyPositionDistribution;
  const weeklyRows = (weekly ?? []).map((week) => {
    const counts = bandCounts(week.buckets);
    return {
      week: week.weekStart,
      days: week.days,
      total: BAND_IDS.reduce((sum, id) => sum + counts[id], 0),
      ...counts,
    };
  });
  const complete = weekCoverage(weeklyRows);
  const completeWeeks = complete.filter(Boolean).length;
  const anyPartial = completeWeeks < weeklyRows.length;
  const buckets = BAND_IDS;

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Two bars per band: how many queries sit there, and how much of
          the click traffic they bring. A band can hold half the queries and
          almost none of the clicks, and the count alone hid that. */}
      <ul className="flex flex-col gap-3">
        {current.map((bucket) => {
          const queryShare = total > 0 ? bucket.queries / total : 0;
          const clickShare = totalClicks > 0 ? bucket.clicks / totalClicks : 0;
          return (
            <li
              key={bucket.band}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[7rem_minmax(0,1fr)_13rem]"
            >
              <span className="text-muted">{bucketLabel(bucket.band)}</span>
              <span className="order-last col-span-2 flex flex-col gap-1 sm:order-none sm:col-span-1">
                <span className="h-2.5 overflow-hidden rounded-full bg-[var(--mark-track)]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${queryShare * 100}%`,
                      background: BUCKET_FILL[bucket.band],
                    }}
                  />
                </span>
                <span className="h-1 overflow-hidden rounded-full bg-[var(--mark-track)]">
                  <span
                    className="block h-full rounded-full bg-[var(--data-clicks)]"
                    style={{ width: `${clickShare * 100}%` }}
                  />
                </span>
              </span>
              <span className="whitespace-nowrap text-right tabular-nums">
                <span className="font-semibold">
                  {t("{share} tıklama", {
                    share: formatPercent(clickShare, 0),
                  })}
                </span>
                <span className="ml-2 text-xs text-muted">
                  {/* A number, so t() picks the plural and formats it. */}
                  {t("{count} sorgu", { count: bucket.queries })}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-4 rounded-full bg-[var(--data-position)]"
          />
          {t("Sorgu sayısı")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-1 w-4 rounded-full bg-[var(--data-clicks)]"
          />
          {t("Tıklama payı")}
        </span>
      </p>
      <p className="text-xs text-muted">
        {t(
          "Okunan {count} sorgunun ortalama sırasına göre. Google'ın gizlediği sorgular burada yok.",
          { count: total },
        )}
      </p>

      {weekly && weeklyRows.length > 1 ? (
        <div>
          <h4 className="mb-1 text-sm font-medium">
            {t("Haftalara göre sorgu dağılımı")}
          </h4>
          <Chart
            metric="position"
            height={200}
            summary={t(
              "{count} haftada, sıra aralıklarının sorgular içindeki payı.",
              { count: weeklyRows.length },
            )}
            table={{
              caption: t("Haftalara göre sorgu dağılımı"),
              columns: [t("Hafta"), ...buckets.map(bucketLabel)],
              rows: weeklyRows.map((week, index) => [
                complete[index]
                  ? formatDay(week.week)
                  : t("{date} (eksik veri)", { date: formatDay(week.week) }),
                ...buckets.map((id) => formatCount(week[id])),
              ]),
            }}
          >
            <BarChart
              data={weeklyRows}
              stackOffset="expand"
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <defs>
                {buckets
                  .filter((id) => id !== "top3")
                  .map((id) => (
                    <pattern
                      key={id}
                      id={`${patternId}-${id}`}
                      width={5}
                      height={5}
                      patternUnits="userSpaceOnUse"
                      patternTransform={`rotate(${id === "top10" ? 90 : id === "top20" ? 0 : 45})`}
                    >
                      <rect width={5} height={5} fill="var(--color-base-100)" />
                      <rect width={3} height={5} fill={DATA_SERIES.position} />
                    </pattern>
                  ))}
              </defs>
              <CartesianGrid {...CHART_GRID} />
              <XAxis
                dataKey="week"
                {...CHART_AXIS}
                tickFormatter={formatDay}
                minTickGap={16}
              />
              <YAxis
                {...CHART_AXIS}
                width={44}
                tickFormatter={(v: number) => formatPercent(v, 0)}
              />
              <Tooltip
                cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
                content={({ active, label }) => {
                  if (!active || typeof label !== "string") return null;
                  const index = weeklyRows.findIndex((w) => w.week === label);
                  const week = weeklyRows[index];
                  if (!week) return null;
                  return (
                    <ChartTooltip
                      title={t("{date} haftası", { date: formatDay(label) })}
                      rows={[
                        ...buckets.map((id) => ({
                          label: bucketLabel(id),
                          value: formatCount(week[id]),
                          color: DATA_SERIES.position,
                        })),
                        ...(complete[index]
                          ? []
                          : [
                              {
                                label: t("Durum"),
                                value: t(
                                  "Arşivde eksik; paylar karşılaştırılamaz",
                                ),
                              },
                            ]),
                      ]}
                    />
                  );
                }}
              />
              {buckets.map((id) => (
                <Bar
                  key={id}
                  dataKey={id}
                  stackId="buckets"
                  fill={
                    id === "top3"
                      ? DATA_SERIES.position
                      : `url(#${patternId}-${id})`
                  }
                  stroke="var(--color-base-100)"
                  strokeWidth={1}
                  isAnimationActive={!reduced}
                >
                  {weeklyRows.map((week, index) => (
                    <Cell
                      key={week.week}
                      fillOpacity={complete[index] ? 1 : 0.35}
                    />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </Chart>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {buckets.map((id) => (
              <li key={id} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block size-2.5 rounded-sm"
                  style={{ background: BUCKET_FILL[id] }}
                />
                {bucketLabel(id)}
              </li>
            ))}
          </ul>
          {anyPartial ? (
            <p className="mt-1 text-xs font-medium">
              {completeWeeks > 0
                ? t(
                    "Arşiv {count} haftalık; soluk çubuklu haftalar eksik veri, paylar onlarla karşılaştırılamaz.",
                    { count: completeWeeks },
                  )
                : t(
                    "Arşivde henüz tam bir hafta yok; soluk çubuklar eksik veri, paylar karşılaştırılamaz.",
                  )}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-muted">
            {t(
              "Her hafta, o hafta görünen sorguların sıra aralıklarına dağılımı (pay). Bu bilgisayardaki sorgu arşivinden, kesin verilerle; tüm cihaz ve ülkeler.",
            )}
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted">
          {weekly === null && view.filters.searchType !== "web"
            ? t("Haftalık dağılım yalnızca Web aramaları için.")
            : weekly === null &&
                view.filters.device === null &&
                view.filters.country === null
              ? t(
                  "Haftalık dağılım için sorgu arşivi doluyor; Sıralama takibi ekranı ya da bu ekran açıldıkça tamamlanır.",
                )
              : weekly === null
                ? t(
                    "Haftalık dağılım cihaz ya da ülke filtresiyle gösterilmez: arşiv bu kırılımları tutmaz.",
                  )
                : t("Haftalık dağılım için en az iki hafta gerekir.")}
        </p>
      )}
    </div>
  );
}
