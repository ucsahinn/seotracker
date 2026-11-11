import { formatDecimal, formatDuration } from "@/client/lib/format";
import {
  rateCrux,
  type CruxMetric,
  type CruxRating,
  type CruxSeries,
} from "@/shared/cruxHistory";
import { t } from "@/shared/i18n";

export const CRUX_METRIC_LABEL: Record<CruxMetric, string> = {
  lcp: "LCP",
  cls: "CLS",
  inp: "INP",
};

/** Turkish source labels; t() runs where they render. */
export const CRUX_RATING_LABEL: Record<CruxRating, string> = {
  good: "iyi",
  "needs-improvement": "geliştirilmeli",
  poor: "zayıf",
};

export function formatCruxValue(metric: CruxMetric, value: number): string {
  return metric === "cls" ? formatDecimal(value, 2) : formatDuration(value);
}

/** A change smaller than this is noise in a 28-day rolling p75. */
const STEADY = 0.1;
/** The smallest move worth calling a trend: one printed step of the metric. */
const MIN_VISIBLE_CHANGE: Record<CruxMetric, number> = {
  cls: 0.02,
  lcp: 100,
  inp: 20,
};

export type CruxSeriesSummary = {
  metric: CruxMetric;
  latest: number;
  first: number;
  rating: CruxRating;
  trend: "better" | "worse" | "steady";
  /** Number of weekly windows that had a value. */
  weeks: number;
};

/** Null when the series has no value at all. */
export function summarizeCruxSeries(
  series: CruxSeries,
): CruxSeriesSummary | null {
  const values = series.points.flatMap((point) =>
    point.p75 === null ? [] : [point.p75],
  );
  const first = values[0];
  const latest = values[values.length - 1];
  if (first === undefined || latest === undefined) return null;

  // A relative test alone called CLS 0 -> 0.01 "getting worse" under values
  // that both print as 0,01 and both rate "good". The move also has to be
  // large enough to see.
  const visible = Math.abs(latest - first) >= MIN_VISIBLE_CHANGE[series.metric];
  const change = !visible ? 0 : first === 0 ? 1 : (latest - first) / first;
  return {
    metric: series.metric,
    latest,
    first,
    rating: rateCrux(series.metric, latest),
    trend: change <= -STEADY ? "better" : change >= STEADY ? "worse" : "steady",
    weeks: values.length,
  };
}

const TREND_TEXT = {
  better: "düşüyor, yani iyileşiyor",
  worse: "yükseliyor, yani kötüleşiyor",
  steady: "yatay seyrediyor",
} as const;

/** One sentence per metric, for readers who cannot see the lines. */
export function describeCruxSeries(summary: CruxSeriesSummary): string {
  const label = CRUX_METRIC_LABEL[summary.metric];
  const now = formatCruxValue(summary.metric, summary.latest);
  const start = formatCruxValue(summary.metric, summary.first);
  return t(
    "{metric} son {count} haftada {start} değerinden {now} değerine geldi, {trend}; şu an {rating}.",
    {
      metric: label,
      count: summary.weeks,
      start,
      now,
      trend: t(TREND_TEXT[summary.trend]),
      rating: t(CRUX_RATING_LABEL[summary.rating]),
    },
  );
}
