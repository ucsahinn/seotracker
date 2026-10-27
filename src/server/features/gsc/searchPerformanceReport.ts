import { sort } from "remeda";
import type { GscSearchAnalyticsRow } from "@/server/lib/gscClient";
import {
  rangeStartDate,
  type GscDateRange,
} from "@/server/features/gsc/searchAnalytics";
import {
  addIsoDays,
  GSC_DATA_LAG_DAYS,
  GSC_TIME_ZONE,
  isoDaysInclusive,
} from "@/shared/dataFreshness";
import { combineMetrics, type MetricRow } from "@/shared/searchInsights";
import type {
  Breakdown,
  DailyPoint,
  DateSpan,
  HiddenQueries,
  MetricChanges,
  PeriodPoint,
  SearchMetrics,
  SearchWindowInfo,
  TableCoverage,
} from "@/shared/searchPerformanceView";

/**
 * Pure shaping for the Search performance view: the window, the series, the
 * totals and the breakdown shares. Kept apart from the service so the date
 * and aggregation rules are tested without a Google client.
 */

/** 52 weeks: a year back that lands on the same weekday. */
const YOY_SHIFT_DAYS = 364;

/**
 * Where the window ends and begins.
 *
 * The screen asks Google with dataState=all, which includes days Google is
 * still counting. Those days are not part of the window: the window is the
 * preset's length of *complete* days, so its totals compare like with like
 * against the period before and the same weeks a year ago. The incomplete
 * days still reach the chart, marked, as a tail after the window.
 *
 * `today` is Search Console's own date (Pacific; see gscToday).
 */
export function resolveSearchWindow(input: {
  range: GscDateRange;
  today: string;
  floorDate: string;
  firstIncompleteDate: string | null;
  lastDataDate: string | null;
}): SearchWindowInfo {
  const freshEndDate = addIsoDays(input.today, -1);
  /*
   * Google sends `first_incomplete_date` only when the requested range holds
   * incomplete data. Its absence should mean every day is final, but the
   * cost of trusting a missing field is a fall presented as fact, so the
   * conventional lag is assumed instead and the screen says so.
   */
  const google = input.firstIncompleteDate !== null;
  const firstIncomplete =
    input.firstIncompleteDate ??
    addIsoDays(input.today, -(GSC_DATA_LAG_DAYS - 1));
  const lastComplete = addIsoDays(firstIncomplete, -1);
  const endDate = lastComplete < freshEndDate ? lastComplete : freshEndDate;
  let startDate = rangeStartDate(endDate, input.range);
  if (startDate < input.floorDate) startDate = input.floorDate;
  return withSpan(
    {
      startDate,
      endDate,
      days: 0,
      previous: { startDate, endDate },
      yoy: null,
      freshEndDate,
      firstIncompleteDate:
        firstIncomplete <= freshEndDate ? firstIncomplete : null,
      incompleteSource: google ? "google" : "assumed",
      lastDataDate: input.lastDataDate,
      floorDate: input.floorDate,
      dataState: "all",
      timeZone: GSC_TIME_ZONE,
    },
    { startDate, endDate },
  );
}

/**
 * The same window moved onto an explicit span (one a previous view resolved),
 * with the previous period and year-ago span recomputed to match it.
 */
export function withSpan(
  window: SearchWindowInfo,
  span: DateSpan,
): SearchWindowInfo {
  const days = isoDaysInclusive(span.startDate, span.endDate);
  const yoyStart = addIsoDays(span.startDate, -YOY_SHIFT_DAYS);
  return {
    ...window,
    startDate: span.startDate,
    endDate: span.endDate,
    days,
    previous: {
      startDate: addIsoDays(span.startDate, -days),
      endDate: addIsoDays(span.startDate, -1),
    },
    yoy:
      yoyStart >= window.floorDate
        ? {
            startDate: yoyStart,
            endDate: addIsoDays(span.endDate, -YOY_SHIFT_DAYS),
          }
        : null,
  };
}

/** `["date"]` rows keyed by day. */
export function rowsByDate(
  rows: readonly GscSearchAnalyticsRow[],
): Map<string, GscSearchAnalyticsRow> {
  const out = new Map<string, GscSearchAnalyticsRow>();
  for (const row of rows) {
    const date = row.keys?.[0];
    if (date) out.set(date, row);
  }
  return out;
}

/**
 * Every day of [startDate, endDate], each with its state.
 *
 * Google returns a row only for a day with at least one impression. A
 * finished day with no row is therefore a real zero ("noImpressions"); a day
 * on or after the first incomplete date with no row is not known yet.
 */
export function dailyPoints(
  byDate: ReadonlyMap<string, GscSearchAnalyticsRow>,
  span: DateSpan,
  firstIncompleteDate: string | null,
): DailyPoint[] {
  const days = isoDaysInclusive(span.startDate, span.endDate);
  return Array.from({ length: days }, (_, index) => {
    const date = addIsoDays(span.startDate, index);
    const row = byDate.get(date);
    const incomplete =
      firstIncompleteDate !== null && date >= firstIncompleteDate;
    if (!row) {
      return {
        date,
        clicks: 0,
        impressions: 0,
        ctr: null,
        position: null,
        state: incomplete ? "pending" : "noImpressions",
      };
    }
    return {
      date,
      ...combineMetrics([row]),
      state: incomplete ? "provisional" : "complete",
    };
  });
}

/** Site totals for a span, from date rows -- the property's own aggregate. */
export function totalsFor(points: readonly DailyPoint[]): SearchMetrics {
  return combineMetrics(
    points.map((p) => ({
      clicks: p.clicks,
      impressions: p.impressions,
      position: p.position ?? 0,
    })),
  );
}

function additive(now: number, then: number) {
  return {
    change: now - then,
    relative: then > 0 ? (now - then) / then : null,
  };
}

export function compareMetrics(
  current: SearchMetrics,
  previous: SearchMetrics,
): MetricChanges {
  return {
    clicks: additive(current.clicks, previous.clicks),
    impressions: additive(current.impressions, previous.impressions),
    ctr: {
      change:
        current.ctr !== null && previous.ctr !== null
          ? current.ctr - previous.ctr
          : null,
      relative: null,
    },
    position: {
      // Positive = moved up: a lower position number is better.
      change:
        current.position !== null && previous.position !== null
          ? previous.position - current.position
          : null,
      relative: null,
    },
  };
}

/** Monday of the ISO week holding `date`. */
function weekStart(date: string): string {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  return addIsoDays(date, -((weekday + 6) % 7));
}

function monthStart(date: string): string {
  return `${date.slice(0, 7)}-01`;
}

function monthEnd(date: string): string {
  const [y, m] = date.split("-").map(Number);
  const last = new Date(Date.UTC(y ?? 0, m ?? 1, 0)).getUTCDate();
  return `${date.slice(0, 7)}-${String(last).padStart(2, "0")}`;
}

/**
 * Days grouped into calendar weeks (Monday first) or months. A period the
 * series does not cover end to end is `partial`, so a three-day week is
 * never drawn as if it were a collapse.
 */
export function periodPoints(
  points: readonly DailyPoint[],
  unit: "week" | "month",
): PeriodPoint[] {
  const groups = new Map<string, DailyPoint[]>();
  for (const point of points) {
    const key =
      unit === "week" ? weekStart(point.date) : monthStart(point.date);
    const group = groups.get(key);
    if (group) group.push(point);
    else groups.set(key, [point]);
  }
  return [...groups.entries()].map(([start, group]) => {
    const end = unit === "week" ? addIsoDays(start, 6) : monthEnd(start);
    return {
      startDate: start,
      endDate: end,
      days: group.length,
      partial: group.length < isoDaysInclusive(start, end),
      provisional: group.some(
        (p) => p.state === "provisional" || p.state === "pending",
      ),
      ...totalsFor(group),
    };
  });
}

/** Single-dimension rows as keyed metric rows. */
export function toMetricRows(
  rows: readonly GscSearchAnalyticsRow[],
): MetricRow[] {
  const out: MetricRow[] = [];
  for (const row of rows) {
    const key = row.keys?.[0];
    if (!key) continue;
    out.push({
      key,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    });
  }
  return out;
}

export function coverageOf(
  rows: ReadonlyArray<{ clicks: number; impressions: number }>,
  truncated: boolean,
  aggregation: string | null,
): TableCoverage {
  let clicks = 0;
  let impressions = 0;
  for (const row of rows) {
    clicks += row.clicks;
    impressions += row.impressions;
  }
  return { rows: rows.length, truncated, clicks, impressions, aggregation };
}

/**
 * What the site total holds beyond the query rows. Google's own example:
 * 450 itemized clicks under a 550-click total is 100 clicks of anonymized
 * queries. Clamped at zero: the two tables are aggregated separately and can
 * disagree by a rounding unit.
 */
export function hiddenQueries(
  total: SearchMetrics,
  queries: TableCoverage,
): HiddenQueries {
  const clicks = Math.max(0, total.clicks - queries.clicks);
  const impressions = Math.max(0, total.impressions - queries.impressions);
  return {
    clicks,
    impressions,
    clickShare: total.clicks > 0 ? clicks / total.clicks : null,
    impressionShare:
      total.impressions > 0 ? impressions / total.impressions : null,
    exact: !queries.truncated,
  };
}

export function breakdown(
  rows: readonly MetricRow[],
  base: { metrics: SearchMetrics; kind: "siteTotal" | "sumOfRows" },
  aggregation: string | null,
  truncated: boolean,
): Breakdown {
  const sorted = sort(
    rows,
    (a, b) => b.clicks - a.clicks || b.impressions - a.impressions,
  );
  return {
    rows: sorted.map((row) => ({
      key: row.key,
      ...combineMetrics([row]),
      clickShare:
        base.metrics.clicks > 0 ? row.clicks / base.metrics.clicks : null,
      impressionShare:
        base.metrics.impressions > 0
          ? row.impressions / base.metrics.impressions
          : null,
    })),
    base: base.metrics,
    baseKind: base.kind,
    aggregation,
    truncated,
  };
}
