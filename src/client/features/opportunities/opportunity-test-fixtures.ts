import type { OpportunityReport } from "./report";
import type { OpportunityRow } from "./opportunityLogic";

export function makeRow(
  overrides: Partial<OpportunityRow> = {},
): OpportunityRow {
  return {
    page: "https://example.com/a",
    normalizedPage: "example.com/a",
    clicks: 10,
    impressions: 1000,
    ctr: 0.01,
    position: 7,
    band: "top10",
    gain: 100,
    gainPerMonth: 107,
    gainByWork: { snippet: 0, page1: 100, page2: 0, deep: 0 },
    work: "page1",
    nonBrandCtr: 0.01,
    siteCtr: 0.04,
    queries: [],
    capped: false,
    joinStatus: "gsc_only",
    ga4: null,
    value: null,
    ...overrides,
  };
}

export function makeReport(rows: OpportunityRow[]): OpportunityReport {
  const byWork = { pages: 0, gain: 0, gainPerMonth: 0 };
  return {
    status: "ok",
    source: {
      searchConsoleSiteUrl: "https://example.com/",
      googleAnalyticsPropertyId: null,
      googleAnalyticsPropertyDisplayName: null,
    },
    request: {
      dateRange: { startDate: "2026-09-01", endDate: "2026-09-28" },
      days: 28,
      limit: 50,
      searchConsoleTimeZone: "America/Los_Angeles",
      googleAnalyticsTimeZone: null,
    },
    analytics: { state: "connected", code: null },
    rowCount: rows.length,
    totalCandidateRows: rows.length,
    rows,
    totals: {
      gain: rows.reduce((s, r) => s + r.gain, 0),
      gainPerMonth: rows.reduce((s, r) => s + r.gainPerMonth, 0),
      clicksPerMonth: rows.reduce((s, r) => s + r.clicks, 0),
      byWork: {
        snippet: byWork,
        page1: { ...byWork, pages: rows.length },
        page2: byWork,
        deep: byWork,
      },
      noGainPages: 2,
      pagesConsidered: rows.length + 2,
    },
    method: {
      formula: "",
      curve: "nonBrand",
      curveInsufficient: false,
      brandSource: "suggested",
      brandTerms: ["example"],
      valueMinSessions: 30,
    },
    coverage: {
      gscRowsConsidered: rows.length,
      queryPageRows: 0,
      ga4RowsConsidered: 0,
      matchedRows: rows.filter((r) => r.ga4).length,
      unmatchedGscRows: rows.filter((r) => !r.ga4).length,
      unmatchedGa4Rows: 0,
    },
    truncated: { gsc: false, ga4: false, candidates: false },
    warnings: [],
    reportMetadata: null,
    quota: null,
  };
}
