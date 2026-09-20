import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { makeGa4ReportResult } from "./ga4-test-fixtures";
import { SearchOpportunityService } from "./SearchOpportunityService";

const mocks = vi.hoisted(() => ({
  getGa4Connection: vi.fn(),
  getGscConnection: vi.fn(),
  getPerformance: vi.fn(),
  runGa4Report: vi.fn(),
}));

vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: mocks.getGa4Connection },
}));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: {
    getConnection: mocks.getGscConnection,
    getPerformance: mocks.getPerformance,
  },
}));
vi.mock("@/server/features/ga4/services/Ga4ReportingService", () => ({
  Ga4ReportingService: { runReport: mocks.runGa4Report },
  resolveGa4DateRange: vi.fn(),
}));

const ga4Result = makeGa4ReportResult({
  status: "ok" as const,
  source: {
    provider: "google_analytics" as const,
    propertyId: "properties/123",
    propertyDisplayName: "Example",
  },
  request: {
    requestedDateRange: { startDate: "2026-07-07", endDate: "2026-08-03" },
    resolvedDateRange: { startDate: "2026-07-07", endDate: "2026-08-03" },
    propertyTimeZone: "America/New_York",
    currencyCode: "USD",
    channel: "organic_search" as const,
    limit: 1_000,
    offset: 0,
  },
  rows: [
    {
      hostName: "example.com",
      landingPage: "/High-Value/?utm_source=x",
      sessions: 100,
      activeUsers: 90,
      engagedSessions: 80,
      engagementRate: 0.8,
      keyEvents: 10,
      sessionKeyEventRate: 0.1,
      transactions: 2,
      purchaseRevenue: 500,
    },
    {
      hostName: "example.com",
      landingPage: "/other/",
      sessions: 10,
      activeUsers: 9,
      engagedSessions: 5,
      engagementRate: 0.5,
      keyEvents: 1,
      sessionKeyEventRate: 0.02,
      transactions: 0,
      purchaseRevenue: 0,
    },
  ],
  rowCount: 2,
  totalRowCount: 2,
  pageInfo: { offset: 0, limit: 1_000, hasMore: false, nextOffset: null },
  reportMetadata: {
    dataLossFromOtherRow: false,
    subjectToThresholding: false,
    sampling: [],
    restrictedMetrics: [],
    emptyReason: null,
    hasLimitedData: false,
  },
  quota: null,
  warnings: [],
});

describe("SearchOpportunityService", () => {
  beforeEach(() => {
    mocks.getGa4Connection.mockResolvedValue({
      propertyTimeZone: "America/New_York",
    });
    mocks.getGscConnection.mockResolvedValue({
      siteUrl: "https://example.com/",
    });
    mocks.runGa4Report.mockResolvedValue(ga4Result);
  });

  it("normalizes URLs and scores every candidate, matched or not", async () => {
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      request: {},
      rows: [
        {
          keys: ["https://EXAMPLE.com/High-Value/?ref=gsc"],
          clicks: 10,
          impressions: 1_000,
          ctr: 0.01,
          position: 6,
        },
        {
          keys: ["https://example.com/other"],
          clicks: 5,
          impressions: 500,
          ctr: 0.01,
          position: 12,
        },
        {
          keys: ["https://example.com/no-analytics"],
          clicks: 1,
          impressions: 2_000,
          ctr: 0.0005,
          position: 8,
        },
        {
          keys: ["https://example.com/top-result"],
          clicks: 100,
          impressions: 3_000,
          ctr: 0.03,
          position: 2,
        },
      ],
    });
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      { now: new Date("2026-08-06T12:00:00Z") },
    );

    expect(mocks.getPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: "2026-07-07",
        endDate: "2026-08-03",
        dimensions: ["page"],
        rowLimit: 1_000,
      }),
    );
    expect(mocks.runGa4Report).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: "2026-07-07",
        endDate: "2026-08-03",
        kind: "landing_pages",
      }),
    );
    expect(result.totalCandidateRows).toBe(3);
    expect(result.coverage).toMatchObject({
      matchedRows: 2,
      unmatchedGscRows: 1,
    });
    // A page with demand and no traffic is the opportunity, not a row to
    // bury. /no-analytics has the most impressions of the three candidates
    // and no GA4 row, so it takes the top demand mid-rank and the neutral
    // middle for business value: 0.5*0.8333 + 0.3*0.5 + 0.2*0.5 = 67. Under
    // the old scoring it had no score at all and sorted last, which is the
    // bug this pins.
    expect(result.rows[0]).toMatchObject({
      page: "https://example.com/no-analytics",
      joinStatus: "gsc_only",
      ga4: null,
      score: 67,
      scoreComponents: {
        demand: 0.8333,
        businessValue: 0.5,
        reachability: 0.5,
      },
    });
    expect(result.rows[1]).toMatchObject({
      page: "https://EXAMPLE.com/High-Value/?ref=gsc",
      normalizedPage: "example.com/High-Value",
      joinStatus: "joined",
      score: 64,
    });
    expect(result.scoring.businessValueMetric).toBe("sessionKeyEventRate");
    expect(result.warnings).toContain("source_time_zones_differ");
  });

  /*
   * The inversion a floor-rank produced: a property whose key event fires on
   * every session gives every matched page the same rate, so all of them
   * ranked 0 for business value and sorted below the 0.5 handed to pages GA4
   * never saw. Measuring a page's value must not cost it points.
   */
  it("does not rank matched pages below unmatched ones when their value ties", async () => {
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      request: {},
      rows: [
        {
          keys: ["https://example.com/other"],
          clicks: 5,
          impressions: 500,
          ctr: 0.01,
          position: 10,
        },
        {
          keys: ["https://example.com/unmatched"],
          clicks: 5,
          impressions: 500,
          ctr: 0.01,
          position: 10,
        },
      ],
    });
    mocks.runGa4Report.mockResolvedValue({
      ...ga4Result,
      rows: [ga4Result.rows[1]],
      rowCount: 1,
      totalRowCount: 1,
    });

    const result = await SearchOpportunityService.getOpportunities({
      projectId: "project_1",
    });
    const matched = result.rows.find((row) => row.joinStatus === "joined");
    const unmatched = result.rows.find((row) => row.joinStatus === "gsc_only");

    expect(matched?.scoreComponents?.businessValue).toBe(0.5);
    expect(matched?.score).toBe(unmatched?.score);
  });

  it("uses engagement rate when all joined rows have zero key events", async () => {
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      request: {},
      rows: [
        {
          keys: ["https://example.com/other"],
          clicks: 1,
          impressions: 100,
          ctr: 0.01,
          position: 10,
        },
      ],
    });
    mocks.runGa4Report.mockResolvedValue({
      ...ga4Result,
      rows: [{ ...ga4Result.rows[1], keyEvents: 0, sessionKeyEventRate: 0 }],
      rowCount: 1,
      totalRowCount: 1,
    });
    const result = await SearchOpportunityService.getOpportunities({
      projectId: "project_1",
    });
    expect(result.scoring).toMatchObject({
      engagementFallback: true,
      businessValueMetric: "engagementRate",
    });
  });

  it("anchors the shared default range to the GA4 property date", async () => {
    mocks.getGa4Connection.mockResolvedValue({
      propertyTimeZone: "America/Los_Angeles",
    });
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      request: {},
      rows: [],
    });

    await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      { now: new Date("2026-08-06T01:00:00Z") },
    );

    expect(mocks.getPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: "2026-07-06",
        endDate: "2026-08-02",
      }),
    );
    expect(mocks.runGa4Report).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: "2026-07-06",
        endDate: "2026-08-02",
      }),
    );
  });

  it("fails before querying GA4 when Search Console is not connected", async () => {
    mocks.getGscConnection.mockResolvedValue(null);
    await expect(
      SearchOpportunityService.getOpportunities({ projectId: "project_1" }),
    ).rejects.toBeInstanceOf(GscNotConnectedError);
    expect(mocks.getPerformance).not.toHaveBeenCalled();
    expect(mocks.runGa4Report).not.toHaveBeenCalled();
  });
});
