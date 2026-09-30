import { z } from "zod";

/**
 * Chrome UX Report History API: parsing and rating, no I/O.
 *
 * Shape from https://developer.chrome.com/docs/crux/guides/history-api :
 * `record.metrics.<name>.percentilesTimeseries.p75s` is an array with one entry
 * per entry of `record.collectionPeriods`, matched by index. Each period is a
 * 28-day window (`firstDate`..`lastDate`), one new period per week. A period
 * without enough traffic comes back as `null` (and CLS values are strings such
 * as "0.05"), so every value is read defensively.
 */

export type CruxMetric = "lcp" | "cls" | "inp";

export type CruxRating = "good" | "needs-improvement" | "poor";

export type CruxPoint = {
  /** Last day of the 28-day window, `YYYY-MM-DD`. */
  date: string;
  p75: number | null;
};

export type CruxSeries = {
  metric: CruxMetric;
  points: CruxPoint[];
};

/** The API's own metric names. */
export const CRUX_API_METRICS: Record<CruxMetric, string> = {
  lcp: "largest_contentful_paint",
  cls: "cumulative_layout_shift",
  inp: "interaction_to_next_paint",
};

/** Web Vitals thresholds: good up to and including the first, poor above the second. */
export const CRUX_THRESHOLDS: Record<CruxMetric, [number, number]> = {
  lcp: [2500, 4000],
  cls: [0.1, 0.25],
  inp: [200, 500],
};

export function rateCrux(metric: CruxMetric, value: number): CruxRating {
  const [good, poor] = CRUX_THRESHOLDS[metric];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

const dateSchema = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
});

const responseSchema = z.object({
  record: z.object({
    metrics: z.record(
      z.string(),
      z.object({
        percentilesTimeseries: z
          .object({ p75s: z.array(z.unknown()) })
          .optional(),
      }),
    ),
    collectionPeriods: z.array(z.object({ lastDate: dateSchema })),
  }),
});

function readValue(raw: unknown): number | null {
  const value =
    typeof raw === "number"
      ? raw
      : typeof raw === "string" && raw.trim() !== ""
        ? Number(raw)
        : Number.NaN;
  return Number.isFinite(value) ? value : null;
}

function isoDate({ year, month, day }: z.infer<typeof dateSchema>): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Null when the body is not a history record at all. A metric Google left
 * out, or one with no usable period, is omitted rather than drawn empty.
 */
export function parseCruxHistory(body: unknown): CruxSeries[] | null {
  const parsed = responseSchema.safeParse(body);
  if (!parsed.success) return null;

  const { metrics, collectionPeriods } = parsed.data.record;
  const series: CruxSeries[] = [];

  for (const metric of ["lcp", "inp", "cls"] as const) {
    const p75s = metrics[CRUX_API_METRICS[metric]]?.percentilesTimeseries?.p75s;
    if (!p75s) continue;
    const points = collectionPeriods.map((period, index) => ({
      date: isoDate(period.lastDate),
      p75: readValue(p75s[index]),
    }));
    if (points.some((point) => point.p75 !== null)) {
      series.push({ metric, points });
    }
  }

  return series;
}
