import { GscService } from "@/server/features/gsc/services/GscService";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { toMetricRows } from "@/server/features/gsc/searchPerformanceReport";
import { SearchSettingsRepository } from "@/server/features/gsc/repositories/SearchSettingsRepository";
import { Ga4ReportingService } from "@/server/features/ga4/services/Ga4ReportingService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import {
  addIsoDays,
  DEFAULT_WINDOW_DAYS,
  GSC_DATA_LAG_DAYS,
  GSC_TIME_ZONE,
  gscToday,
  isoDaysInclusive,
} from "@/shared/dataFreshness";
import {
  pageOpportunities,
  perMonth,
  type PageOpportunity,
  type WorkKind,
} from "@/shared/pageOpportunities";
import { bandOf, type BandId } from "@/shared/positionBands";
import {
  effectiveBrandTerms,
  scaleThreshold,
  suggestBrandTerms,
  type QueryPageRow,
} from "@/shared/searchInsights";

type SearchOpportunityInput = {
  projectId: string;
  startDate?: string;
  endDate?: string;
  /** How many days back from Search Console's newest finalised day. */
  windowDays?: number;
  limit?: number;
};

type Ga4PageValue = {
  sessions: number;
  activeUsers: number;
  engagedSessions: number;
  engagementRate: number;
  keyEvents: number;
  sessionKeyEventRate: number;
  transactions: number;
  purchaseRevenue: number | null;
};

/**
 * What GA4 says about the page's business value, as a label next to the
 * click estimate rather than a weight inside it.
 *
 * - converts: enough organic sessions to judge, and key events among them.
 * - no_conversions: enough sessions, none converted, while other pages on the
 *   property do convert (so key events are set up).
 * - too_little_traffic: under the session floor; one lucky conversion on
 *   three sessions is not a conversion rate.
 *
 * Null when Analytics has no row for the page or is not connected.
 */
type ValueSignal = "converts" | "no_conversions" | "too_little_traffic";

type OpportunityRow = Omit<PageOpportunity, "page"> & {
  page: string;
  normalizedPage: string | null;
  band: BandId;
  gainPerMonth: number;
  joinStatus: "joined" | "gsc_only";
  ga4: Ga4PageValue | null;
  value: ValueSignal | null;
};

/** Organic sessions over 28 days below which a page's conversion rate is noise. */
const VALUE_MIN_SESSIONS_28D = 30;

/**
 * Search Console's window, on Search Console's calendar: the newest day it
 * has finalised and `windowDays` back from it. The same lag the dashboard and
 * Search performance assume when Google does not say. Analytics is read for
 * the same days, so the two sources can be joined row by row -- which is why
 * a page's sessions here can differ from the Analytics screen, whose window
 * ends yesterday.
 */
function resolveDates(
  input: Pick<SearchOpportunityInput, "startDate" | "endDate" | "windowDays">,
  now: Date,
): { startDate: string; endDate: string } {
  if (input.startDate && input.endDate && input.startDate <= input.endDate) {
    return { startDate: input.startDate, endDate: input.endDate };
  }
  const endDate = addIsoDays(gscToday(now), -GSC_DATA_LAG_DAYS);
  return {
    startDate: addIsoDays(
      endDate,
      -((input.windowDays ?? DEFAULT_WINDOW_DAYS) - 1),
    ),
    endDate,
  };
}

function normalizePageKey(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "(not set)") return null;
  try {
    const url = new URL(
      trimmed.includes("://") ? trimmed : `https://${trimmed}`,
    );
    let host = url.hostname.toLowerCase();
    const defaultPort =
      (url.protocol === "http:" && url.port === "80") ||
      (url.protocol === "https:" && url.port === "443");
    if (url.port && !defaultPort) host += `:${url.port}`;
    let path = url.pathname || "/";
    if (path.length > 1) path = path.replace(/\/+$/, "");
    return `${host}${path}`;
  } catch {
    return null;
  }
}

function numberField(
  row: Record<string, string | number | null>,
  name: string,
): number {
  const value = row[name];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

type Ga4PageTotals = {
  sessions: number;
  activeUsers: number;
  engagedSessions: number;
  engagementRate: number;
  keyEvents: number;
  sessionKeyEventRate: number;
  transactions: number;
  purchaseRevenue: number | null;
  /** Session-weighted rate sums, divided out by `finishRates`. */
  weighted: { engagement: number; keyEvent: number };
};

/**
 * Fold one GA4 landing-page row into the totals for its page.
 *
 * `normalizePageKey` drops the query string on purpose, because Search
 * Console reports `/blog` where GA4 reports `/blog?utm_source=newsletter`
 * and the two have to meet. Collapsing without adding, though, kept whichever
 * variant GA4 happened to return last: a page with 800 organic sessions and
 * 40 conversions could be read off its own `?utm_source=` row at 120 and 2,
 * and since business value is a percentile over those numbers, the best page
 * on the site sorted below pages a tenth its size.
 *
 * Sessions, conversions and revenue are additive, so they add. `activeUsers`
 * is a distinct count and summing it double-counts anyone who arrived through
 * two variants - GA4 does not expose the overlap, it is the closer of the two
 * available answers, and nothing is ranked on it.
 */
function addRow(
  totals: Ga4PageTotals | undefined,
  row: Record<string, string | number | null>,
): Ga4PageTotals {
  const revenue =
    typeof row.purchaseRevenue === "number" &&
    Number.isFinite(row.purchaseRevenue)
      ? row.purchaseRevenue
      : null;
  const sessions = numberField(row, "sessions");
  return {
    sessions: (totals?.sessions ?? 0) + sessions,
    activeUsers: (totals?.activeUsers ?? 0) + numberField(row, "activeUsers"),
    engagedSessions:
      (totals?.engagedSessions ?? 0) + numberField(row, "engagedSessions"),
    keyEvents: (totals?.keyEvents ?? 0) + numberField(row, "keyEvents"),
    transactions:
      (totals?.transactions ?? 0) + numberField(row, "transactions"),
    purchaseRevenue:
      revenue === null && totals?.purchaseRevenue == null
        ? null
        : (totals?.purchaseRevenue ?? 0) + (revenue ?? 0),
    weighted: {
      engagement:
        (totals?.weighted.engagement ?? 0) +
        sessions * numberField(row, "engagementRate"),
      keyEvent:
        (totals?.weighted.keyEvent ?? 0) +
        sessions * numberField(row, "sessionKeyEventRate"),
    },
    // Divided out by `finishRates` once every variant has been folded in.
    engagementRate: 0,
    sessionKeyEventRate: 0,
  };
}

/**
 * Rates are ratios, so they cannot be added - a page whose variants ran at 40%
 * and 60% is not a 100% page. Each variant's rate is weighted by the sessions
 * it was measured over, which is the rate the whole page ran at.
 *
 * Deliberately not recomputed from the counts we hold: GA4's
 * `sessionKeyEventRate` is the share of *sessions that fired at least one key
 * event*, not `keyEvents / sessions`, and one session can fire several - so
 * dividing the totals would report rates above 1 on a page with repeat
 * conversions. Weighting keeps Google's definition intact, and for the
 * ordinary page with a single variant it returns exactly what GA4 reported.
 */
function finishRates(totals: Ga4PageTotals): void {
  if (totals.sessions <= 0) return;
  totals.engagementRate = totals.weighted.engagement / totals.sessions;
  totals.sessionKeyEventRate = totals.weighted.keyEvent / totals.sessions;
}

function valueSignal(
  ga4: Ga4PageValue | null,
  minSessions: number,
  propertyConverts: boolean,
): ValueSignal | null {
  if (!ga4) return null;
  if (ga4.sessions < minSessions) return "too_little_traffic";
  if (ga4.keyEvents > 0) return "converts";
  return propertyConverts ? "no_conversions" : null;
}

function toQueryPageRows(
  rows: ReadonlyArray<{
    keys?: string[] | null;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>,
): QueryPageRow[] {
  const out: QueryPageRow[] = [];
  for (const row of rows) {
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

/**
 * Analytics for the same days, joined by host and path. Analytics is the
 * secondary factor here, so a project without it still gets every estimate;
 * a GA4 failure (quota, permissions) becomes a note instead of an empty
 * screen.
 */
async function readAnalytics(
  projectId: string,
  dates: { startDate: string; endDate: string },
) {
  const connection = await Ga4ConnectionRepository.getByProjectId(projectId);
  if (!connection) return { state: "not_connected" as const };
  try {
    const report = await Ga4ReportingService.runReport({
      projectId,
      kind: "landing_pages",
      startDate: dates.startDate,
      endDate: dates.endDate,
      limit: 1_000,
      offset: 0,
      channel: "organic_search",
    });
    return { state: "connected" as const, report };
  } catch (error) {
    if (error instanceof Ga4ReportError) {
      return { state: "unavailable" as const, code: error.code };
    }
    throw error;
  }
}

async function getOpportunities(
  input: SearchOpportunityInput,
  opts: { now?: Date } = {},
) {
  const limit = input.limit ?? 50;
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new Ga4ReportError(
      "validation_error",
      "limit must be an integer from 1 to 100.",
    );
  }
  const gscConnection = await GscService.getConnection(input.projectId);
  if (!gscConnection) throw new GscNotConnectedError(input.projectId);

  const dates = resolveDates(input, opts.now ?? new Date());
  const days = isoDaysInclusive(dates.startDate, dates.endDate);
  /*
   * The same three tables, with the same request, Search performance reads,
   * so a visit to one screen warms the cache for the other and both read
   * one set of rows.
   */
  const ask = (dimensions: Array<"query" | "page">) =>
    GscService.queryAnalytics({
      projectId: input.projectId,
      startDate: dates.startDate,
      endDate: dates.endDate,
      dimensions,
      filters: [],
      type: "web",
      dataState: "all",
      maxPages: 2,
    });
  const [queries, pages, queryPages, confirmedTerms, identity, analytics] =
    await Promise.all([
      ask(["query"]),
      ask(["page"]),
      ask(["query", "page"]),
      SearchSettingsRepository.listBrandTerms(input.projectId),
      SearchSettingsRepository.getProjectIdentity(input.projectId),
      readAnalytics(input.projectId, dates),
    ]);

  /*
   * Brand queries are split out of the curve and out of the gain. Until the
   * operator confirms terms, the ones suggested from the domain and project
   * name stand in -- otherwise the brand name at 55% sets the bar for every
   * informational query at the same position, which is how a blog post at
   * 2.7 with a healthy 16% was told to rewrite its title. The screen says
   * which terms were used.
   */
  const { terms: brandTerms, source: brandSource } = effectiveBrandTerms(
    confirmedTerms,
    suggestBrandTerms(identity.domain, identity.name),
  );

  const result = pageOpportunities({
    days,
    queries: toMetricRows(queries.rows),
    pages: toMetricRows(pages.rows),
    queryPages: toQueryPageRows(queryPages.rows),
    brandTerms,
  });

  const ga4ByPage = new Map<string, Ga4PageTotals>();
  let invalidGa4Rows = 0;
  const ga4Rows = analytics.state === "connected" ? analytics.report.rows : [];
  for (const row of ga4Rows) {
    const host = typeof row.hostName === "string" ? row.hostName : "";
    const landing = typeof row.landingPage === "string" ? row.landingPage : "";
    const key = normalizePageKey(`${host}${landing}`);
    if (!key) {
      invalidGa4Rows += 1;
      continue;
    }
    ga4ByPage.set(key, addRow(ga4ByPage.get(key), row));
  }
  for (const totals of ga4ByPage.values()) finishRates(totals);
  const propertyConverts = [...ga4ByPage.values()].some(
    (totals) => totals.keyEvents > 0,
  );
  const minSessions = scaleThreshold(VALUE_MIN_SESSIONS_28D, days);

  const candidates: OpportunityRow[] = result.pages.map((page) => {
    const normalizedPage = normalizePageKey(page.page);
    const totals = normalizedPage ? ga4ByPage.get(normalizedPage) : undefined;
    const ga4: Ga4PageValue | null = totals
      ? {
          sessions: totals.sessions,
          activeUsers: totals.activeUsers,
          engagedSessions: totals.engagedSessions,
          engagementRate: totals.engagementRate,
          keyEvents: totals.keyEvents,
          sessionKeyEventRate: totals.sessionKeyEventRate,
          transactions: totals.transactions,
          purchaseRevenue: totals.purchaseRevenue,
        }
      : null;
    return {
      ...page,
      normalizedPage,
      band: bandOf(page.position),
      gainPerMonth: perMonth(page.gain, days),
      joinStatus: ga4 ? "joined" : "gsc_only",
      ga4,
      value: valueSignal(ga4, minSessions, propertyConverts),
    };
  });

  const workTotals = (kind: WorkKind) => {
    const gain = candidates.reduce((sum, row) => sum + row.gainByWork[kind], 0);
    return {
      pages: candidates.filter((row) => row.gainByWork[kind] > 0).length,
      gain,
      gainPerMonth: perMonth(gain, days),
    };
  };
  const byWork = {
    snippet: workTotals("snippet"),
    page1: workTotals("page1"),
    page2: workTotals("page2"),
    deep: workTotals("deep"),
  };
  const totalGain = candidates.reduce((sum, row) => sum + row.gain, 0);
  const listedClicks = candidates.reduce((sum, row) => sum + row.clicks, 0);

  const joined = candidates.filter((row) => row.ga4 !== null);
  const matchedGa4Pages = new Set(joined.map((row) => row.normalizedPage)).size;
  const returned = candidates.slice(0, limit);
  const ga4Report = analytics.state === "connected" ? analytics.report : null;
  return {
    status: "ok" as const,
    source: {
      searchConsoleSiteUrl: pages.siteUrl,
      googleAnalyticsPropertyId: ga4Report?.source.propertyId ?? null,
      googleAnalyticsPropertyDisplayName:
        ga4Report?.source.propertyDisplayName ?? null,
    },
    request: {
      dateRange: dates,
      days,
      limit,
      searchConsoleTimeZone: GSC_TIME_ZONE,
      googleAnalyticsTimeZone: ga4Report?.request.propertyTimeZone ?? null,
    },
    analytics:
      analytics.state === "unavailable"
        ? { state: analytics.state, code: analytics.code }
        : { state: analytics.state, code: null },
    rowCount: returned.length,
    totalCandidateRows: candidates.length,
    rows: returned,
    totals: {
      gain: totalGain,
      gainPerMonth: perMonth(totalGain, days),
      clicksPerMonth: perMonth(listedClicks, days),
      byWork,
      noGainPages: result.noGainPages,
      pagesConsidered: candidates.length + result.noGainPages,
    },
    method: {
      formula:
        "per query x page: impressions x site CTR at the target position - clicks; summed per page, scaled to 30 days",
      curve: result.curve,
      curveInsufficient: result.curveInsufficient,
      brandSource,
      brandTerms,
      valueMinSessions: minSessions,
    },
    coverage: {
      gscRowsConsidered: pages.rows.length,
      queryPageRows: queryPages.rows.length,
      ga4RowsConsidered: ga4Rows.length,
      matchedRows: joined.length,
      unmatchedGscRows: candidates.length - joined.length,
      unmatchedGa4Rows:
        Math.max(ga4ByPage.size - matchedGa4Pages, 0) + invalidGa4Rows,
    },
    truncated: {
      gsc: pages.truncated || queryPages.truncated,
      ga4: ga4Report ? ga4Report.totalRowCount > ga4Report.rows.length : false,
      candidates: returned.length < candidates.length,
    },
    warnings: ga4Report?.warnings ?? [],
    reportMetadata: ga4Report?.reportMetadata ?? null,
    quota: ga4Report?.quota ?? null,
  };
}

export const SearchOpportunityService = { getOpportunities };
