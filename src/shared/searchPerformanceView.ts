import type { SearchSourceOutcome } from "./searchSourceOutcome";
/**
 * The Search performance screen's one contract: what
 * `getSearchPerformanceView` returns, shared by the screen, the dashboard and
 * the printable report so all three read the same numbers.
 *
 * Rules every field follows:
 * - Site totals come from the date-grouped request (Google aggregates it by
 *   property), never from summing query or page rows.
 * - `null` means unknown -- no impressions to divide by, a band with too
 *   little data, a comparison Google no longer serves. It is never a zero.
 * - The window covers complete days only. Days Google is still counting
 *   ("fresh" data, dataState=all) follow it in `series.daily` marked
 *   `provisional`, and are summed apart in `totals.provisional`.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import type { SearchInsights, SearchMetrics, TodoItem } from "./searchInsights";

export type { SearchMetrics } from "./searchInsights";

export type DateSpan = { startDate: string; endDate: string };

/**
 * - complete: a finished day with data.
 * - noImpressions: a finished day Google returned no row for -- a real zero.
 * - provisional: Google is still counting it (on or after the first
 *   incomplete date); its numbers will still change.
 * - pending: on or after the first incomplete date with no row yet -- not a
 *   zero, just not known.
 */
export type DayState = "complete" | "noImpressions" | "provisional" | "pending";

export type DailyPoint = SearchMetrics & { date: string; state: DayState };

export type PeriodPoint = SearchMetrics & {
  startDate: string;
  endDate: string;
  /** Days of the period inside the series (a cut-off week has fewer). */
  days: number;
  /** The calendar week or month is not wholly inside the series. */
  partial: boolean;
  /** Holds at least one provisional day. */
  provisional: boolean;
};

/**
 * One metric compared. `change` is current - previous, except position, where
 * it is previous - current so that a positive number always means "better"
 * (moved up). CTR change is a fraction difference (0.012 = 1.2 points).
 * `relative` is set for clicks and impressions only.
 */
export type MetricChange = {
  change: number | null;
  relative: number | null;
};

export type MetricChanges = {
  clicks: MetricChange;
  impressions: MetricChange;
  ctr: MetricChange;
  position: MetricChange;
};

export type SearchWindowInfo = DateSpan & {
  days: number;
  previous: DateSpan;
  /** 52 weeks back, weekday-aligned; null when older than Google serves. */
  yoy: DateSpan | null;
  /** Newest day requested (Pacific yesterday); provisional days run to here. */
  freshEndDate: string;
  /** Google's `metadata.first_incomplete_date`, or the assumed one. */
  firstIncompleteDate: string | null;
  /**
   * google: from the response metadata. assumed: Google sent none, so the
   * last GSC_DATA_LAG_DAYS days are treated as incomplete to be safe.
   */
  incompleteSource: "google" | "assumed";
  /** Newest day any row came back for; null when there was none. */
  lastDataDate: string | null;
  /** Oldest day Search Console still serves today. */
  floorDate: string;
  dataState: "all";
  timeZone: "America/Los_Angeles";
};

export type TableCoverage = {
  /** Rows read from Google. */
  rows: number;
  /** Google had more rows than the page budget read (the low-click tail). */
  truncated: boolean;
  /** Sum of the rows read -- a table base, never a site total. */
  clicks: number;
  impressions: number;
  /** As Google reported it: "byProperty" or "byPage". */
  aggregation: string | null;
};

/**
 * The part of the site total no query row accounts for: Google withholds
 * rare queries for privacy ("anonymized queries"). `exact` is false when the
 * query table was truncated, in which case the remainder also holds rows past
 * the cap and is labelled "hidden or beyond the row limit".
 */
export type HiddenQueries = {
  clicks: number | null;
  impressions: number | null;
  clickShare: number | null;
  impressionShare: number | null;
  exact: boolean;
};

export type BreakdownRow = SearchMetrics & {
  key: string;
  clickShare: number | null;
  impressionShare: number | null;
};

export type Breakdown = {
  rows: BreakdownRow[];
  /** What the shares divide by. */
  base: SearchMetrics;
  /**
   * siteTotal: the property's own total for the same filters.
   * sumOfRows: the rows partition the traffic (each impression has one
   * device and one country), used when a filter on this very dimension is
   * active and the site total is narrowed by it.
   */
  baseKind: "siteTotal" | "sumOfRows";
  aggregation: string | null;
  truncated: boolean;
};

export type SearchAnnotation =
  | {
      kind: "googleUpdate";
      startDate: string;
      endDate: string;
      label: string;
      updateKind: string;
    }
  | { kind: "audit"; startDate: string; endDate: string; auditId: string }
  | {
      kind: "note";
      startDate: string;
      endDate: string;
      id: number;
      label: string;
    };

export type SearchPerformanceFilters = {
  range: string;
  device: string | null;
  country: string | null;
  searchType: string;
};

export type SearchPerformanceView = {
  connected: true;
  /** Absent only on older stored/test views; never interpret absence as empty. */
  sourceOutcomes?: Record<
    "devices" | "countries" | "searchAppearance" | "decay",
    SearchSourceOutcome
  >;
  siteUrl: string;
  filters: SearchPerformanceFilters;
  window: SearchWindowInfo;
  totals: {
    current: SearchMetrics;
    /** Equal-length period just before; null when Google no longer serves it. */
    previous: SearchMetrics | null;
    yoy: SearchMetrics | null;
    /** The provisional days after the window; null when there are none. */
    provisional: SearchMetrics | null;
    vsPrevious: MetricChanges | null;
    vsYoy: MetricChanges | null;
  };
  series: {
    /** The window's days, then the provisional tail. */
    daily: DailyPoint[];
    /** Same length as the window, aligned day for day. */
    previousDaily: DailyPoint[] | null;
    yoyDaily: DailyPoint[] | null;
    weekly: PeriodPoint[];
    monthly: PeriodPoint[];
  };
  coverage: {
    queries: TableCoverage;
    pages: TableCoverage;
    queryPages: TableCoverage;
    hiddenQueries: HiddenQueries;
  };
  breakdowns: {
    devices: Breakdown;
    countries: Breakdown;
    /** Null when Google rejected or had nothing for the appearance table. */
    searchAppearance: Breakdown | null;
  };
  insights: SearchInsights;
  /**
   * Weekly count of queries per position bucket, from the local query
   * archive (final data, web, every device and country). Null when a filter
   * is active -- the archive has no device or country split -- or when the
   * archive holds nothing for the window.
   */
  weeklyPositionDistribution: WeeklyPositionDistribution[] | null;
  todo: TodoItem[];
  annotations: SearchAnnotation[];
  /** Google requests this view cost; cached answers cost none. */
  quota: { requests: number };
};

export type WeeklyPositionDistribution = {
  weekStart: string;
  /** Days of that week the archive holds within the window. */
  days: number;
  buckets: Array<{ bucket: string; queries: number }>;
};

export type SearchPerformanceViewResult =
  | SearchPerformanceView
  | { connected: false };

type LegacyRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

function legacyMetrics(metrics: SearchMetrics) {
  return {
    clicks: metrics.clicks,
    impressions: metrics.impressions,
    ctr: metrics.ctr ?? 0,
    position: metrics.position ?? 0,
  };
}

function legacyRow(row: SearchMetrics & { key: string }): LegacyRow {
  return { key: row.key, ...legacyMetrics(row) };
}

/**
 * The view in the shape the current screen and dashboard cards read, until
 * they move onto the view itself. The numbers are the view's (complete-day
 * window, all countries, Google's own totals); only the shape is old:
 * an unknown current CTR and position read as 0. The previous period
 * keeps its nulls.
 */
export function toLegacyReport(view: SearchPerformanceView) {
  const windowDays = view.series.daily.filter(
    (p) => p.date >= view.window.startDate && p.date <= view.window.endDate,
  );
  return {
    connected: true as const,
    range: {
      startDate: view.window.startDate,
      endDate: view.window.endDate,
      prevStartDate: view.window.previous.startDate,
      prevEndDate: view.window.previous.endDate,
    },
    totals: legacyMetrics(view.totals.current),
    /*
     * Kept nullable, unlike `totals`: a previous CTR of "0" against a real
     * one reads as a gain of the whole rate. No previous period, or one
     * without impressions, has no CTR or position to compare against.
     */
    prevTotals: view.totals.previous ?? {
      clicks: 0,
      impressions: 0,
      ctr: null,
      position: null,
    },
    daily: windowDays.map((p) => legacyRow({ ...p, key: p.date })),
    queryRowCount: view.coverage.queries.rows,
    strikingDistance: view.insights.striking.rows.flatMap((row) =>
      row.page
        ? [
            {
              query: row.query,
              page: row.page,
              clicks: row.clicks,
              impressions: row.impressions,
              position: row.position,
            },
          ]
        : [],
    ),
    countries: view.breakdowns.countries.rows.map(legacyRow),
    devices: view.breakdowns.devices.rows.map(legacyRow),
    searchAppearance: (view.breakdowns.searchAppearance?.rows ?? []).map(
      legacyRow,
    ),
  };
}
