import { sourceOutcome } from "@/shared/searchSourceOutcome";
import { completeSearchSeries } from "./completeSearchSeries";
import { AppError } from "@/server/lib/errors";
import { searchPerformanceViewInputSchema } from "@/types/schemas/search-performance";
import { t } from "@/shared/i18n";
/* eslint-disable max-lines */
import { sort, sortBy } from "remeda";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import {
  GscService,
  type GscAnalyticsResult,
} from "@/server/features/gsc/services/GscService";
import { isExpectedConnectionFailure } from "@/server/features/gsc/connectionFailure";
import { buildGscFilters } from "@/server/features/gsc/performanceFilters";
import {
  type GscDimension,
  type GscPerformanceFilter,
} from "@/server/features/gsc/searchAnalytics";
import {
  breakdown,
  compareMetrics,
  coverageOf,
  dailyPoints,
  hiddenQueries,
  periodPoints,
  rowsByDate,
  withSpan,
  toMetricRows,
  totalsFor,
} from "@/server/features/gsc/searchPerformanceReport";
import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
import { GscSiteDailyRepository } from "@/server/features/gsc/repositories/GscSiteDailyRepository";
import { SearchSettingsRepository } from "@/server/features/gsc/repositories/SearchSettingsRepository";
import { addIsoDays, gscToday } from "@/shared/dataFreshness";
import { googleUpdatesBetween } from "@/shared/googleSearchUpdates";
import { formatDate, parseTimestamp } from "@/shared/format";
import {
  buildInsights,
  buildTodo,
  combineMetrics,
  foldText,
  INSIGHT_RULES,
  suggestBrandTerms,
  type DecayQuarter,
  type MetricRow,
  type QueryPageRow,
  type RowSet,
} from "@/shared/searchInsights";
import {
  matchesQuickFilter,
  type QuickFilterId,
} from "@/shared/searchQuickFilters";
import type {
  DailyPoint,
  DateSpan,
  SearchAnnotation,
  SearchPerformanceView,
  SearchWindowInfo,
  WeeklyPositionDistribution,
} from "@/shared/searchPerformanceView";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
  SearchTableSortColumn,
} from "@/types/schemas/search-performance";

/**
 * The Search performance view: one resolution of the window, every Google
 * request the screen needs, and the insights drawn from them.
 *
 * Requests per view (each a `searchAnalytics.query`; cached for minutes per
 * isolate, see searchAnalyticsCache.ts):
 *   1  date series, the 16 months Google serves (site totals, previous
 *      period, year over year, anomalies, the site archive) -- one call
 *   1  device ring (country filter only)
 *   1  countries, all of them (device filter only)
 *   1  search appearance
 *   2x query, page and query+page for the window, and query and page for the
 *      previous period: one request each per 25,000 rows, at most
 *      ROW_PAGES requests each
 *   5  page tables for the five 13-week quarters behind content decay
 * A small site costs 14 requests on a cold view; a filter change re-asks
 * only what the filter changes. Google's limits are per minute and per day
 * in the thousands (developers.google.com/webmaster-tools/limits), and
 * nothing here loops on render.
 */

/** 25,000-row requests per table: 50,000 rows, Google's daily per-type ceiling. */
const ROW_PAGES = 2;

export type SearchFilters = {
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
};

type Window = SearchWindowInfo;

function filterSet(filters: SearchFilters) {
  return buildGscFilters({ device: filters.device, country: filters.country });
}

/** Which property, search type and cache policy a request runs under. */
type Scope = { projectId: string; filters: SearchFilters; fresh?: boolean };

/**
 * One Search Analytics request for the view: always dataState=all, the
 * scope's search type, and `maxPages` 25,000-row pages at most.
 */
function ask(
  scope: Scope,
  span: DateSpan,
  dimensions: GscDimension[],
  gscFilters: GscPerformanceFilter[],
  maxPages = 1,
): Promise<GscAnalyticsResult> {
  return GscService.queryAnalytics({
    projectId: scope.projectId,
    startDate: span.startDate,
    endDate: span.endDate,
    dimensions,
    filters: gscFilters,
    type: scope.filters.searchType,
    dataState: "all",
    maxPages,
    fresh: scope.fresh,
  });
}

/**
 * An extra panel's request: a Google refusal or outage leaves that panel
 * empty (null) instead of failing the whole view. A dead connection still
 * propagates, so the screen shows the connect card.
 */
async function optional<T>(call: Promise<T>): Promise<T | null> {
  try {
    return await call;
  } catch (error) {
    if (isExpectedConnectionFailure(error)) throw error;
    return null;
  }
}

function toQueryPageRows(result: GscAnalyticsResult): QueryPageRow[] {
  const out: QueryPageRow[] = [];
  for (const row of result.rows) {
    const [query, page] = row.keys ?? [];
    if (!query || !page) continue;
    out.push({
      query,
      page,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    });
  }
  return out;
}

function rowSet(result: GscAnalyticsResult): RowSet<MetricRow> {
  return { rows: toMetricRows(result.rows), truncated: result.truncated };
}

/**
 * The date series and the window it implies.
 *
 * One date-grouped request from Google's 16-month floor to Pacific yesterday
 * holds the window, the period before it, the same weeks a year ago and the
 * history the anomaly check compares against. With dataState=all and the
 * date dimension, Google also says where its still-changing days begin
 * (`metadata.first_incomplete_date`), which is what places the window.
 */
async function resolveSeries(
  projectId: string,
  filters: SearchFilters,
  window: DateSpan | undefined,
  fresh?: boolean,
): Promise<{ window: Window; series: GscAnalyticsResult }> {
  const { series, window: resolved } = await completeSearchSeries({
    projectId,
    range: filters.dateRange,
    filters: filterSet(filters).filters,
    searchType: filters.searchType,
    fresh,
  });
  const floorDate = resolved.floorDate;
  if (!window) return { window: resolved, series };
  /*
   * A window handed back by the view keeps the table on the view's days. It
   * is only honoured when it is one this server could have produced: inside
   * what Google serves and not reaching into incomplete days.
   */
  const valid =
    searchPerformanceViewInputSchema.safeParse({
      projectId,
      ...filters,
      window,
    }).success &&
    window.startDate >= floorDate &&
    window.endDate <= resolved.endDate;
  if (!valid)
    throw new AppError(
      "VALIDATION_ERROR",
      t(
        "Seçilen dönem Search Console'un okunabilir kesin günleri dışında. Kullanılabilir dönem: {start} – {end}.",
        { start: formatDate(floorDate), end: formatDate(resolved.endDate) },
      ),
    );
  return {
    window: withSpan(resolved, window),
    series,
  };
}

/** Archive the window's finished days -- zeros included, so coverage is knowable. */
async function archiveSiteDays(
  projectId: string,
  filters: SearchFilters,
  siteUrl: string,
  points: DailyPoint[],
): Promise<void> {
  // The archive has no country split; a country-filtered series is not the site.
  if (filters.country) return;
  const days = points
    .filter((p) => p.state === "complete" || p.state === "noImpressions")
    .map((p) => ({
      date: p.date,
      clicks: p.clicks,
      impressions: p.impressions,
      ctr: p.ctr ?? 0,
      position: p.position ?? 0,
    }));
  try {
    await GscSiteDailyRepository.upsertDays(
      {
        projectId,
        siteUrl,
        searchType: filters.searchType,
        device: filters.device ?? "all",
      },
      days,
    );
  } catch (error) {
    // The archive is a convenience; the view must not fail because of it.
    console.error("Search Console site archive write failed", error);
  }
}

function weekGroups(
  rows: Array<{
    weekStart: string;
    bucket: string;
    queries: number;
    days: number;
  }>,
): WeeklyPositionDistribution[] | null {
  if (rows.length === 0) return null;
  const weeks = new Map<string, WeeklyPositionDistribution>();
  for (const row of rows) {
    const week = weeks.get(row.weekStart) ?? {
      weekStart: row.weekStart,
      days: 0,
      buckets: [],
    };
    week.days = Math.max(week.days, row.days);
    week.buckets.push({ bucket: row.bucket, queries: row.queries });
    weeks.set(row.weekStart, week);
  }
  return [...weeks.values()];
}

async function annotations(
  projectId: string,
  span: DateSpan,
): Promise<SearchAnnotation[]> {
  const [audits, notes] = await Promise.all([
    AuditRepository.getAuditsByProject(projectId),
    SearchSettingsRepository.listNotes({
      projectId,
      since: span.startDate,
      until: span.endDate,
    }),
  ]);
  const out: SearchAnnotation[] = googleUpdatesBetween(
    span.startDate,
    span.endDate,
  ).map((update) => ({
    kind: "googleUpdate",
    startDate: update.startDate,
    endDate: update.endDate,
    label: update.name,
    updateKind: update.kind,
  }));
  for (const audit of audits) {
    if (audit.status !== "completed") continue;
    const stamp = parseTimestamp(audit.completedAt ?? audit.startedAt);
    if (!Number.isFinite(stamp)) continue;
    // On Search Console's calendar, like every date on the chart.
    const date = gscToday(new Date(stamp));
    if (date < span.startDate || date > span.endDate) continue;
    out.push({
      kind: "audit",
      startDate: date,
      endDate: date,
      auditId: audit.id,
    });
  }
  for (const note of notes) {
    out.push({
      kind: "note",
      startDate: note.date,
      endDate: note.date,
      id: note.id,
      label: note.note,
    });
  }
  return sortBy(out, (a) => a.startDate);
}

/** The five 13-week quarters behind content decay, newest first. */
function decaySpans(endDate: string): DateSpan[] {
  const length = INSIGHT_RULES.decayQuarterDays;
  return Array.from({ length: 5 }, (_, index) => {
    const end = addIsoDays(endDate, -length * index);
    return { startDate: addIsoDays(end, -(length - 1)), endDate: end };
  });
}

async function getView(input: {
  projectId: string;
  filters: SearchFilters;
  window?: DateSpan;
  fresh?: boolean;
}): Promise<SearchPerformanceView> {
  const { projectId, filters, fresh } = input;
  const { window, series } = await resolveSeries(
    projectId,
    filters,
    input.window,
    fresh,
  );
  const { filters: gscFilters, deviceFilters } = filterSet(filters);
  const countryOnly = buildGscFilters({ country: filters.country }).filters;
  const current: DateSpan = window;
  const previous = window.previous;
  const scope: Scope = { projectId, filters, fresh };

  const [
    queries,
    pages,
    queryPages,
    previousQueries,
    previousPages,
    devices,
    countries,
    appearance,
    decay,
    brandTerms,
    identity,
    notesAndMarks,
    weekly,
  ] = await Promise.all([
    ask(scope, current, ["query"], gscFilters, ROW_PAGES),
    ask(scope, current, ["page"], gscFilters, ROW_PAGES),
    ask(scope, current, ["query", "page"], gscFilters, ROW_PAGES),
    ask(scope, previous, ["query"], gscFilters, ROW_PAGES),
    ask(scope, previous, ["page"], gscFilters, ROW_PAGES),
    optional(ask(scope, current, ["device"], countryOnly)),
    optional(ask(scope, current, ["country"], deviceFilters)),
    /*
     * searchAppearance cannot be combined with any other dimension, so it is
     * its own call; Google aggregates it by page.
     */
    optional(ask(scope, current, ["searchAppearance"], gscFilters)),
    optional(
      decaySpans(window.endDate).some(
        (span) => span.startDate < window.floorDate,
      )
        ? Promise.resolve(null)
        : Promise.all(
            decaySpans(window.endDate).map(async (span) => ({
              span,
              result: await ask(scope, span, ["page"], gscFilters, ROW_PAGES),
            })),
          ),
    ),
    SearchSettingsRepository.listBrandTerms(projectId),
    SearchSettingsRepository.getProjectIdentity(projectId),
    annotations(projectId, {
      startDate: previous.startDate,
      endDate: window.freshEndDate,
    }),
    filters.device || filters.country || filters.searchType !== "web"
      ? Promise.resolve([])
      : GscHistoryRepository.getWeeklyPositionBuckets({
          projectId,
          since: window.startDate,
          until: window.endDate,
        }),
  ]);

  const byDate = rowsByDate(series.rows);
  const first = window.firstIncompleteDate;
  const daily = dailyPoints(byDate, current, first);
  const tail =
    window.endDate < window.freshEndDate
      ? dailyPoints(
          byDate,
          {
            startDate: addIsoDays(window.endDate, 1),
            endDate: window.freshEndDate,
          },
          first,
        )
      : [];
  const previousDaily =
    previous.startDate >= window.floorDate
      ? dailyPoints(byDate, previous, first)
      : null;
  const yoyDaily = window.yoy ? dailyPoints(byDate, window.yoy, first) : null;

  const totalsCurrent = totalsFor(daily);
  const totalsPrevious = previousDaily ? totalsFor(previousDaily) : null;
  const totalsYoy = yoyDaily ? totalsFor(yoyDaily) : null;
  const provisional = tail.some((p) => p.state === "provisional")
    ? totalsFor(tail)
    : null;

  await archiveSiteDays(
    projectId,
    filters,
    series.siteUrl,
    dailyPoints(
      byDate,
      { startDate: window.floorDate, endDate: window.endDate },
      first,
    ),
  );

  const queryCoverage = coverageOf(
    queries.rows,
    queries.truncated,
    queries.aggregationType,
  );
  const deviceRows = devices ? toMetricRows(devices.rows) : [];
  const countryRows = countries ? toMetricRows(countries.rows) : [];
  const deviceBase = filters.device
    ? { metrics: combineMetrics(deviceRows), kind: "sumOfRows" as const }
    : { metrics: totalsCurrent, kind: "siteTotal" as const };
  const countryBase = filters.country
    ? { metrics: combineMetrics(countryRows), kind: "sumOfRows" as const }
    : { metrics: totalsCurrent, kind: "siteTotal" as const };

  const decayQuarters: DecayQuarter[] | null = decay
    ? decay.map(({ span, result }) => ({
        startDate: span.startDate,
        endDate: span.endDate,
        rows: rowSet(result),
      }))
    : null;

  // Every complete day the series holds, for the anomaly history.
  const anomalySeries = dailyPoints(
    byDate,
    { startDate: window.floorDate, endDate: window.endDate },
    first,
  ).map((p) => ({
    date: p.date,
    clicks: p.clicks,
    impressions: p.impressions,
    complete: p.state === "complete" || p.state === "noImpressions",
  }));

  const insights = buildInsights({
    days: window.days,
    queries: rowSet(queries),
    previousQueries: rowSet(previousQueries),
    pages: rowSet(pages),
    previousPages: rowSet(previousPages),
    queryPages: {
      rows: toQueryPageRows(queryPages),
      truncated: queryPages.truncated,
    },
    decayQuarters,
    devices: deviceRows,
    deviceBase: deviceBase.metrics,
    countries: countryRows,
    countryBase: countryBase.metrics,
    daily: anomalySeries,
    windowStart: window.startDate,
    windowEnd: window.endDate,
    brandTerms,
    brandSuggestions: suggestBrandTerms(identity.domain, identity.name),
  });

  const requests = [
    series,
    queries,
    pages,
    queryPages,
    previousQueries,
    previousPages,
    devices,
    countries,
    appearance,
    ...(decay ?? []).map((q) => q.result),
  ].reduce((sum, result) => sum + (result?.requests ?? 0), 0);

  return {
    connected: true,
    sourceOutcomes: {
      devices: sourceOutcome(devices),
      countries: sourceOutcome(countries),
      searchAppearance: sourceOutcome(appearance),
      decay: decaySpans(window.endDate).some(
        (span) => span.startDate < window.floorDate,
      )
        ? { status: "insufficient-history", reason: "retention-limit" }
        : decay
          ? sourceOutcome({
              rows: decay.flatMap((quarter) => quarter.result.rows),
              truncated: decay.some((quarter) => quarter.result.truncated),
            })
          : sourceOutcome(null),
    },
    siteUrl: series.siteUrl,
    filters: {
      range: filters.dateRange,
      device: filters.device ?? null,
      country: filters.country ?? null,
      searchType: filters.searchType,
    },
    window,
    totals: {
      current: totalsCurrent,
      previous: totalsPrevious,
      yoy: totalsYoy,
      provisional,
      vsPrevious: totalsPrevious
        ? compareMetrics(totalsCurrent, totalsPrevious)
        : null,
      vsYoy: totalsYoy ? compareMetrics(totalsCurrent, totalsYoy) : null,
    },
    series: {
      daily: [...daily, ...tail],
      previousDaily,
      yoyDaily,
      weekly: periodPoints([...daily, ...tail], "week"),
      monthly: periodPoints([...daily, ...tail], "month"),
    },
    coverage: {
      queries: queryCoverage,
      pages: coverageOf(pages.rows, pages.truncated, pages.aggregationType),
      queryPages: coverageOf(
        queryPages.rows,
        queryPages.truncated,
        queryPages.aggregationType,
      ),
      hiddenQueries: hiddenQueries(totalsCurrent, queryCoverage),
    },
    breakdowns: {
      devices: breakdown(
        deviceRows,
        deviceBase,
        devices?.aggregationType ?? null,
        devices?.truncated ?? false,
      ),
      countries: breakdown(
        countryRows,
        countryBase,
        countries?.aggregationType ?? null,
        countries?.truncated ?? false,
      ),
      searchAppearance: appearance
        ? breakdown(
            toMetricRows(appearance.rows),
            { metrics: totalsCurrent, kind: "siteTotal" },
            appearance.aggregationType,
            appearance.truncated,
          )
        : null,
    },
    insights,
    weeklyPositionDistribution: weekGroups(weekly),
    todo: buildTodo(insights, {
      days: window.days,
      deviceBase: deviceBase.metrics,
      countryBase: countryBase.metrics,
    }),
    annotations: notesAndMarks,
    quota: { requests },
  };
}

// ---------------------------------------------------------------------------
// Tables, drill-down, export
// ---------------------------------------------------------------------------

type SearchTableRow = MetricRow & {
  /** Null when the previous period's table was truncated and lacks the row. */
  previousClicks: number | null;
  previousImpressions: number | null;
  previousPosition: number | null;
  clickChange: number | null;
};

type TableQuery = {
  projectId: string;
  filters: SearchFilters;
  dimension: "query" | "page";
  window?: DateSpan;
  search?: string;
  quickFilter?: QuickFilterId;
};

/** Every fetched row of a dimension for the view's window, with the previous period beside it. */
async function tableRows(input: TableQuery): Promise<{
  window: Window;
  rows: SearchTableRow[];
  matched: SearchTableRow[];
  googleTruncated: boolean;
  previousTruncated: boolean;
}> {
  const { window } = await resolveSeries(
    input.projectId,
    input.filters,
    input.window,
  );
  const gscFilters = filterSet(input.filters).filters;
  const [current, previous] = await Promise.all([
    ask(input, window, [input.dimension], gscFilters, ROW_PAGES),
    ask(input, window.previous, [input.dimension], gscFilters, ROW_PAGES),
  ]);
  const before = new Map(
    toMetricRows(previous.rows).map((row) => [row.key, row] as const),
  );
  const rows = toMetricRows(current.rows).map((row): SearchTableRow => {
    const then = before.get(row.key);
    // Absent from a truncated previous table: its clicks are unknown, not 0.
    const unknown = !then && previous.truncated;
    return {
      ...row,
      previousClicks: unknown ? null : (then?.clicks ?? 0),
      previousImpressions: unknown ? null : (then?.impressions ?? 0),
      previousPosition: then && then.impressions > 0 ? then.position : null,
      clickChange: unknown ? null : row.clicks - (then?.clicks ?? 0),
    };
  });
  // Folded, so "nasil" finds "nasıl" and "orneksite" finds "örnek site".
  const needle = input.search ? foldText(input.search) : "";
  const matched = rows.filter(
    (row) =>
      (!needle || foldText(row.key).includes(needle)) &&
      (!input.quickFilter || matchesQuickFilter(input.quickFilter, row)),
  );
  return {
    window,
    rows,
    matched,
    googleTruncated: current.truncated,
    previousTruncated: previous.truncated,
  };
}

function sortRows(
  rows: SearchTableRow[],
  order:
    | { column: SearchTableSortColumn; direction: "asc" | "desc" }
    | undefined,
): SearchTableRow[] {
  if (!order) return rows; // Google's own order: clicks, descending.
  const sign = order.direction === "asc" ? 1 : -1;
  const value = (row: SearchTableRow): number | null =>
    order.column === "clickChange"
      ? row.clickChange
      : order.column === "ctr"
        ? row.impressions > 0
          ? row.clicks / row.impressions
          : null
        : row[order.column];
  return sort(rows, (a, b) => {
    const x = value(a);
    const y = value(b);
    // Unknowns sort last in either direction.
    if (x === null && y === null) return 0;
    if (x === null) return 1;
    if (y === null) return -1;
    return (x - y) * sign;
  });
}

async function getTable(
  input: TableQuery & {
    sort?: { column: SearchTableSortColumn; direction: "asc" | "desc" };
    offset: number;
    limit: number;
  },
) {
  const result = await tableRows(input);
  const sorted = sortRows(result.matched, input.sort);
  const page = sorted.slice(input.offset, input.offset + input.limit);
  return {
    window: {
      startDate: result.window.startDate,
      endDate: result.window.endDate,
    },
    rows: page,
    /** Rows matching the search and chip, across every fetched row. */
    total: result.matched.length,
    /** Rows fetched from Google for the window. */
    fetched: result.rows.length,
    /** Google had more rows than the page budget read (the low-click tail). */
    googleTruncated: result.googleTruncated,
    previousTruncated: result.previousTruncated,
    /** The table's base: the sum of every fetched row, not the site total. */
    base: combineMetrics(result.rows),
  };
}

async function exportTable(input: TableQuery) {
  const result = await tableRows(input);
  return {
    window: {
      startDate: result.window.startDate,
      endDate: result.window.endDate,
    },
    rows: result.matched,
    googleTruncated: result.googleTruncated,
  };
}

/**
 * One query's pages or one page's queries, from the cached query+page table,
 * plus that key's own daily series (one filtered date request).
 */
async function getDrilldown(input: {
  projectId: string;
  filters: SearchFilters;
  dimension: "query" | "page";
  key: string;
  window?: DateSpan;
}) {
  const { window } = await resolveSeries(
    input.projectId,
    input.filters,
    input.window,
  );
  const gscFilters = filterSet(input.filters).filters;
  const keyFilters: GscPerformanceFilter[] = [
    ...gscFilters,
    {
      dimension: input.dimension,
      operator: "equals",
      expression: input.key,
    },
  ];
  const [pairs, series, before] = await Promise.all([
    ask(input, window, ["query", "page"], gscFilters, ROW_PAGES),
    ask(input, window, ["date"], keyFilters),
    // The same key the period before, for the panel's changes. Optional: a
    // refusal leaves the panel without deltas, not without numbers.
    optional(ask(input, window.previous, ["date"], keyFilters)),
  ]);
  const other = input.dimension === "query" ? "page" : "query";
  const rows = toQueryPageRows(pairs)
    .filter((row) => row[input.dimension] === input.key)
    .map((row) => ({
      key: row[other],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
  const daily = dailyPoints(
    rowsByDate(series.rows),
    window,
    window.firstIncompleteDate,
  );
  return {
    window: { startDate: window.startDate, endDate: window.endDate },
    dimension: input.dimension,
    key: input.key,
    rows,
    /** The query+page table was cut short, so some pairs may be missing. */
    truncated: pairs.truncated,
    /**
     * The key's own totals from a filtered date request. Filtering on a
     * query drops anonymized data, so for a page these can exceed the sum
     * of its query rows.
     */
    totals: totalsFor(daily),
    previousWindow: window.previous,
    /** The key over the previous equal-length period; null when unavailable. */
    previousTotals: before
      ? totalsFor(
          dailyPoints(
            rowsByDate(before.rows),
            window.previous,
            window.firstIncompleteDate,
          ),
        )
      : null,
    daily,
  };
}

/** Archived site totals for long trends, oldest first. Local only, no Google call. */
async function getSiteHistory(input: {
  projectId: string;
  searchType: SearchPerformanceType;
  device?: SearchPerformanceDevice;
  days: number;
}) {
  const until = addIsoDays(gscToday(), -1);
  const since = addIsoDays(until, -(input.days - 1));
  const days = await GscSiteDailyRepository.getDays({
    projectId: input.projectId,
    searchType: input.searchType,
    device: input.device ?? "all",
    since,
    until,
  });
  return {
    since,
    until,
    /** Days present; a stored day with no impressions is a real zero. */
    days: days.map((d) => ({
      date: d.date,
      clicks: d.clicks,
      impressions: d.impressions,
      ctr: d.impressions > 0 ? d.clicks / d.impressions : null,
      position: d.impressions > 0 ? d.position : null,
    })),
    earliestDate: days[0]?.date ?? null,
    latestDate: days[days.length - 1]?.date ?? null,
  };
}

async function getBrandTerms(projectId: string) {
  const [terms, identity] = await Promise.all([
    SearchSettingsRepository.listBrandTerms(projectId),
    SearchSettingsRepository.getProjectIdentity(projectId),
  ]);
  return {
    terms,
    suggestions: suggestBrandTerms(identity.domain, identity.name).filter(
      (s) => !terms.includes(s),
    ),
  };
}

async function setBrandTerms(projectId: string, terms: string[]) {
  const unique = [
    ...new Set(terms.map((term) => term.trim().toLowerCase())),
  ].filter((term) => term.length >= 2);
  await SearchSettingsRepository.replaceBrandTerms(projectId, unique);
  return getBrandTerms(projectId);
}

export const SearchPerformanceService = {
  getView,
  getTable,
  exportTable,
  getDrilldown,
  getSiteHistory,
  getBrandTerms,
  setBrandTerms,
  listNotes: SearchSettingsRepository.listNotes,
  addNote: SearchSettingsRepository.addNote,
  deleteNote: SearchSettingsRepository.deleteNote,
};
