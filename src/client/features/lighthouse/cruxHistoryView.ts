import { formatDecimal, formatDuration } from "@/client/lib/format";
import {
  rateCrux,
  type CruxMetric,
  type CruxRating,
  type CruxSeries,
} from "@/shared/cruxHistory";

export const CRUX_METRIC_LABEL: Record<CruxMetric, string> = {
  lcp: "LCP",
  cls: "CLS",
  inp: "INP",
};

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

  const change =
    first === 0 ? (latest === 0 ? 0 : 1) : (latest - first) / first;
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
  return `${label} son ${summary.weeks} haftada ${start} değerinden ${now} değerine geldi, ${TREND_TEXT[summary.trend]}; şu an ${CRUX_RATING_LABEL[summary.rating]}.`;
}
