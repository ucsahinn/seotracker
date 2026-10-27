import { buildInsights, buildTodo } from "./searchInsights";
import type { SearchPerformanceView } from "./searchPerformanceView";

const EMPTY = { rows: [], truncated: false };
const metrics = {
  clicks: 1234,
  impressions: 56789,
  ctr: 0.0217,
  position: 7.4,
};

/**
 * A small view built through the real insight rules, with one hostile query
 * (for escaping), no previous period and no provisional days. Override the
 * fields a test is about.
 */
export function searchViewFixture(
  overrides: Partial<SearchPerformanceView> = {},
): SearchPerformanceView {
  const queries = {
    rows: [
      {
        key: "<script>alert(1)</script>",
        clicks: 40,
        impressions: 4000,
        ctr: 0.01,
        position: 8,
      },
    ],
    truncated: false,
  };
  const base = { clicks: 1234, impressions: 56789, ctr: 0.0217, position: 7.4 };
  const insights = buildInsights({
    days: 28,
    queries,
    previousQueries: EMPTY,
    pages: EMPTY,
    previousPages: EMPTY,
    queryPages: {
      rows: [
        {
          query: "<script>alert(1)</script>",
          page: "https://example.com/a",
          clicks: 40,
          impressions: 4000,
          ctr: 0.01,
          position: 8,
        },
      ],
      truncated: false,
    },
    decayQuarters: null,
    devices: [],
    deviceBase: base,
    countries: [],
    countryBase: base,
    daily: [],
    windowStart: "2026-09-26",
    windowEnd: "2026-10-23",
    brandTerms: [],
    brandSuggestions: [],
  });
  const coverage = {
    rows: 1,
    truncated: false,
    clicks: 40,
    impressions: 4000,
    aggregation: "byProperty",
  };
  const breakdown = {
    rows: [],
    base,
    baseKind: "siteTotal" as const,
    aggregation: null,
    truncated: false,
  };
  return {
    connected: true,
    siteUrl: "sc-domain:example.com",
    filters: {
      range: "last_28_days",
      device: null,
      country: null,
      searchType: "web",
    },
    window: {
      startDate: "2026-09-26",
      endDate: "2026-10-23",
      days: 28,
      previous: { startDate: "2026-08-29", endDate: "2026-09-25" },
      yoy: null,
      freshEndDate: "2026-10-25",
      firstIncompleteDate: "2026-10-24",
      incompleteSource: "google",
      lastDataDate: "2026-10-25",
      floorDate: "2025-06-26",
      dataState: "all",
      timeZone: "America/Los_Angeles",
    },
    totals: {
      current: metrics,
      previous: null,
      yoy: null,
      provisional: null,
      vsPrevious: null,
      vsYoy: null,
    },
    series: {
      daily: [],
      previousDaily: null,
      yoyDaily: null,
      weekly: [],
      monthly: [],
    },
    coverage: {
      queries: coverage,
      pages: coverage,
      queryPages: coverage,
      hiddenQueries: {
        clicks: 1194,
        impressions: 52789,
        clickShare: 0.97,
        impressionShare: 0.93,
        exact: true,
      },
    },
    breakdowns: {
      devices: breakdown,
      countries: breakdown,
      searchAppearance: null,
    },
    insights,
    weeklyPositionDistribution: null,
    todo: buildTodo(insights, {
      days: 28,
      deviceBase: base,
      countryBase: base,
    }),
    annotations: [],
    quota: { requests: 0 },
    ...overrides,
  };
}
