import type {
  DailyPoint,
  PeriodPoint,
  SearchAnnotation,
  SearchPerformanceView,
} from "@/shared/searchPerformanceView";
import type {
  CompareMode,
  Granularity,
} from "@/client/features/search-performance/searchTabs";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";

/*
 * `inline` is the name inside a sentence ("toplam 120 tıklama"); English
 * keeps "CTR" in capitals there, so it is its own string. `short` is the
 * toggle label on a phone, where four full names do not fit one row.
 */
export const METRICS = [
  {
    id: "clicks",
    label: "Tıklama",
    short: "Tıklama",
    inline: "tıklama",
    kind: "count",
  },
  {
    id: "impressions",
    label: "Gösterim",
    short: "Gösterim",
    inline: "gösterim",
    kind: "count",
  },
  {
    id: "ctr",
    label: "Tıklama oranı",
    short: "Oran",
    inline: "tıklama oranı",
    kind: "percent",
  },
  {
    id: "position",
    label: "Ortalama sıra",
    short: "Sıra",
    inline: "ortalama sıra",
    kind: "position",
  },
] as const;
export type MetricId = (typeof METRICS)[number]["id"];
type MetricConfig = (typeof METRICS)[number];

export const GRAIN_LABEL: Record<Granularity, string> = {
  day: "Gün",
  week: "Hafta",
  month: "Ay",
};

export type Point = {
  x: string;
  /** The period's last day; equal to `x` for a day. */
  end: string;
  value: number | null;
  compare: number | null;
  /** Still being counted, or a cut-off week or month. */
  unsettled: boolean;
  state: DailyPoint["state"] | null;
};

function metricValue(
  point: DailyPoint | PeriodPoint,
  metric: MetricId,
): number | null {
  if ("state" in point && point.state === "pending") return null;
  return point[metric];
}

export function formatterFor(config: MetricConfig) {
  return config.kind === "count"
    ? formatCount
    : config.kind === "percent"
      ? (value: number) => formatPercent(value)
      : (value: number) => formatDecimal(value);
}

export function buildPoints(
  view: SearchPerformanceView,
  metric: MetricId,
  grain: Granularity,
  compare: CompareMode,
): Point[] {
  if (grain === "day") {
    const comparison =
      compare === "previous"
        ? view.series.previousDaily
        : compare === "yoy"
          ? view.series.yoyDaily
          : null;
    return view.series.daily.map((point, index) => {
      const other = comparison?.[index];
      return {
        x: point.date,
        end: point.date,
        value: metricValue(point, metric),
        compare: other ? metricValue(other, metric) : null,
        unsettled: point.state === "provisional" || point.state === "pending",
        state: point.state,
      };
    });
  }
  const periods = grain === "week" ? view.series.weekly : view.series.monthly;
  return periods.map((point) => ({
    x: point.startDate,
    end: point.endDate,
    value: metricValue(point, metric),
    compare: null,
    unsettled: point.partial || point.provisional,
    state: null,
  }));
}

/** The annotations inside the plotted range, numbered for the list below. */
export function placedAnnotations(
  annotations: SearchAnnotation[],
  points: Point[],
): Array<{ n: number; x: string; annotation: SearchAnnotation }> {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return [];
  const out: Array<{ n: number; x: string; annotation: SearchAnnotation }> = [];
  for (const annotation of annotations) {
    const date = annotation.startDate;
    if (date < first.x || date > last.end) continue;
    const point = points.find((p) => p.x <= date && date <= p.end);
    if (!point) continue;
    out.push({ n: out.length + 1, x: point.x, annotation });
  }
  return out;
}
