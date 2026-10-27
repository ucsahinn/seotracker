import { COMPLETE_REPORT_LIMIT } from "./Ga4ReportEnhancements";
import {
  normalizePageKey,
  joinPrecisionFor,
  addRow,
  finishRates,
  valueSignal,
  type Ga4PageValue,
  type Ga4PageTotals,
  type ValueSignal,
} from "./opportunityAnalytics";
import type { SearchWindowInfo } from "@/shared/searchPerformanceView";
import { GscService } from "@/server/features/gsc/services/GscService";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import {
  toMetricRows,
  withSpan,
} from "@/server/features/gsc/searchPerformanceReport";
import { completeSearchSeries } from "@/server/features/gsc/services/completeSearchSeries";
import { allocateGain } from "@/shared/opportunityAllocation";
import { SearchSettingsRepository } from "@/server/features/gsc/repositories/SearchSettingsRepository";
import { Ga4ReportingService } from "@/server/features/ga4/services/Ga4ReportingService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GSC_TIME_ZONE, isoDaysInclusive } from "@/shared/dataFreshness";
import {
  pageOpportunities,
  perMonth,
  WORK_KINDS,
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
  work?: WorkKind;
  quick?: "converts" | "no_conversions";
};

function selectedFilters(input: SearchOpportunityInput) {
  return { work: input.work ?? null, quick: input.quick ?? null };
}

type OpportunityRow = Omit<PageOpportunity, "page"> & {
  page: string;
  normalizedPage: string | null;
  band: BandId;
  gainPerMonth: number;
  joinStatus: "joined" | "gsc_only";
  ga4: Ga4PageValue | null;
  value: ValueSignal | null;
  joinPrecision?: "exact" | "collapsed" | "ambiguous" | null;
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
function validDay(day: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    !Number.isNaN(Date.parse(day)) &&
    new Date(day).toISOString().slice(0, 10) === day
  );
}

function requestedWindow(
  input: SearchOpportunityInput,
  resolved: SearchWindowInfo,
): SearchWindowInfo {
  if (input.startDate === undefined && input.endDate === undefined)
    return resolved;
  const { startDate, endDate } = input;
  if (
    !startDate ||
    !endDate ||
    !validDay(startDate) ||
    !validDay(endDate) ||
    startDate > endDate ||
    startDate < resolved.floorDate ||
    endDate > resolved.endDate
  ) {
    throw new Ga4ReportError(
      "validation_error",
      "Dates must be paired real ISO days within the complete Search Console window.",
    );
  }
  return withSpan(resolved, { startDate, endDate });
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
      limit: COMPLETE_REPORT_LIMIT,
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

  const now = opts.now ?? new Date();
  const { window: resolved } = await completeSearchSeries({
    projectId: input.projectId,
    range:
      input.windowDays === 7
        ? "last_7_days"
        : input.windowDays === 90
          ? "last_3_months"
          : "last_28_days",
    filters: [],
    searchType: "web",
    now,
  });
  const window = requestedWindow(input, resolved);
  const dates = { startDate: window.startDate, endDate: window.endDate };
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
  const ga4Sources = new Map<string, Set<string>>();
  const gscCohortCounts = new Map<string, number>();
  for (const page of result.pages) {
    const key = normalizePageKey(page.page);
    if (key) gscCohortCounts.set(key, (gscCohortCounts.get(key) ?? 0) + 1);
  }
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
    const sources = ga4Sources.get(key) ?? new Set<string>();
    sources.add(`${host}${landing}`);
    ga4Sources.set(key, sources);
    ga4ByPage.set(key, addRow(ga4ByPage.get(key), row));
  }
  for (const totals of ga4ByPage.values()) finishRates(totals);
  const propertyConverts = [...ga4ByPage.values()].some(
    (totals) => totals.keyEvents !== null && totals.keyEvents > 0,
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
      value:
        analytics.state === "connected" &&
        (analytics.report.reportMetadata.hasLimitedData ||
          analytics.report.warnings.length > 0)
          ? null
          : valueSignal(ga4, minSessions, propertyConverts),
      joinPrecision: joinPrecisionFor(page.page, gscCohortCounts, ga4Sources),
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
  const monthlyWork = allocateGain(
    WORK_KINDS.map((kind) => byWork[kind].gain),
    perMonth(totalGain, days),
  );
  WORK_KINDS.forEach((kind, index) => {
    byWork[kind].gainPerMonth = monthlyWork[index];
  });
  const listedClicks = candidates.reduce((sum, row) => sum + row.clicks, 0);

  const joined = candidates.filter((row) => row.ga4 !== null);
  const matchedGa4Pages = new Set(joined.map((row) => row.normalizedPage)).size;
  const filtered = candidates.filter(
    (row) =>
      (!input.work || row.gainByWork[input.work] > 0) &&
      (!input.quick || row.value === input.quick),
  );
  const returned = filtered.slice(0, limit);
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
      filters: selectedFilters(input),
      completeness: window,
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
    filteredCount: filtered.length,
    topRecommendation: candidates[0] ?? null,
    valueCounts: {
      converts: candidates.filter((row) => row.value === "converts").length,
      no_conversions: candidates.filter((row) => row.value === "no_conversions")
        .length,
    },
    totalCandidateRows: candidates.length,
    rows: returned,
    totals: {
      gain:
        result.reasons.calculablePositive + result.reasons.calculableZero > 0
          ? totalGain
          : null,
      gainPerMonth:
        result.reasons.calculablePositive + result.reasons.calculableZero > 0
          ? perMonth(totalGain, days)
          : null,
      clicksPerMonth: perMonth(listedClicks, days),
      byWork,
      noGainPages: result.noGainPages,
      reasons: result.reasons,
      unknownPages:
        result.reasons.belowThreshold +
        result.reasons.insufficientTargetCurve +
        result.reasons.missingQueryPairs,
      pagesConsidered: pages.rows.length,
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
      queries: queries.truncated,
      pages: pages.truncated,
      queryPages: queryPages.truncated,
      gsc: queries.truncated || pages.truncated || queryPages.truncated,
      ga4: ga4Report ? ga4Report.totalRowCount > ga4Report.rows.length : false,
      candidates: returned.length < filtered.length,
    },
    warnings: ga4Report?.warnings ?? [],
    reportMetadata: ga4Report?.reportMetadata ?? null,
    quota: ga4Report?.quota ?? null,
  };
}

export const SearchOpportunityService = { getOpportunities };
