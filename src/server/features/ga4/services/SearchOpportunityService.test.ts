import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { makeGa4ReportResult } from "./ga4-test-fixtures";
import { SearchOpportunityService } from "./SearchOpportunityService";

const mocks = vi.hoisted(() => ({
  getGa4Connection: vi.fn(),
  getGscConnection: vi.fn(),
  queryAnalytics: vi.fn(),
  runGa4Report: vi.fn(),
  listBrandTerms: vi.fn(),
  getProjectIdentity: vi.fn(),
}));

vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: mocks.getGa4Connection },
}));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: {
    getConnection: mocks.getGscConnection,
    queryAnalytics: mocks.queryAnalytics,
  },
}));
vi.mock("@/server/features/gsc/repositories/SearchSettingsRepository", () => ({
  SearchSettingsRepository: {
    listBrandTerms: mocks.listBrandTerms,
    getProjectIdentity: mocks.getProjectIdentity,
  },
}));
vi.mock("@/server/features/ga4/services/Ga4ReportingService", () => ({
  Ga4ReportingService: { runReport: mocks.runGa4Report },
}));

type Row = {
  keys: string[];
  clicks: number;
  impressions: number;
  position: number;
};
const row = (
  keys: string[],
  position: number,
  impressions: number,
  clicks: number,
): Row => ({ keys, position, impressions, clicks });

/** Five queries at #2 clicking 15%: the site's CTR for positions 2-3. */
const CURVE = Array.from({ length: 5 }, (_, i) =>
  row([`curve ${i}`], 2, 1000, 150),
);

function gsc(
  queryPages: Row[],
  firstIncompleteDate: string | null = null,
  queryTruncated = false,
) {
  const pages = new Map<string, Row>();
  for (const qp of queryPages) {
    const page = qp.keys[1] ?? "";
    const prev = pages.get(page);
    pages.set(
      page,
      prev
        ? row(
            [page],
            qp.position,
            prev.impressions + qp.impressions,
            prev.clicks + qp.clicks,
          )
        : row([page], qp.position, qp.impressions, qp.clicks),
    );
  }
  mocks.queryAnalytics.mockImplementation(
    async ({ dimensions }: { dimensions: string[] }) => ({
      siteUrl: "https://example.com/",
      truncated:
        queryTruncated && dimensions.length === 1 && dimensions[0] === "query",
      firstIncompleteDate,
      rows:
        dimensions[0] === "date"
          ? []
          : dimensions.length === 2
            ? queryPages
            : dimensions[0] === "page"
              ? [...pages.values()]
              : CURVE,
    }),
  );
}

const ga4Row = (landingPage: string, sessions: number, keyEvents: number) => ({
  hostName: "example.com",
  landingPage,
  sessions,
  activeUsers: sessions,
  engagedSessions: sessions / 2,
  engagementRate: 0.5,
  keyEvents,
  sessionKeyEventRate: sessions > 0 ? keyEvents / sessions : 0,
  transactions: 0,
  purchaseRevenue: 0,
});

const ga4Result = (rows: Array<ReturnType<typeof ga4Row>>) =>
  makeGa4ReportResult({
    rows,
    rowCount: rows.length,
    totalRowCount: rows.length,
  });

const NOW = { now: new Date("2026-08-06T12:00:00Z") };

describe("SearchOpportunityService", () => {
  beforeEach(() => {
    mocks.getGa4Connection.mockResolvedValue({
      propertyTimeZone: "America/New_York",
    });
    mocks.getGscConnection.mockResolvedValue({
      siteUrl: "https://example.com/",
    });
    mocks.listBrandTerms.mockResolvedValue([]);
    mocks.getProjectIdentity.mockResolvedValue({ domain: null, name: null });
    mocks.runGa4Report.mockResolvedValue(ga4Result([]));
  });

  it.each([
    ["2026-08-01", "2026-07-25", "2026-07-31"],
    ["2026-08-06", "2026-07-30", "2026-08-05"],
  ])(
    "excludes incomplete days when Google reports %s instead of assuming three days",
    async (boundary, startDate, endDate) => {
      gsc([row(["q", "https://example.com/a"], 5, 1000, 40)], boundary);
      const result = await SearchOpportunityService.getOpportunities(
        { projectId: "p", windowDays: 7 },
        NOW,
      );
      expect(result.request.dateRange).toEqual({ startDate, endDate });
      expect(result.request.completeness.incompleteSource).toBe("google");
      expect(mocks.runGa4Report).toHaveBeenCalledWith(
        expect.objectContaining({ startDate, endDate }),
      );
    },
  );

  it("finds a converting page below rank fifty before applying the display limit", async () => {
    gsc(
      Array.from({ length: 55 }, (_, i) =>
        row([`q ${i}`, `https://example.com/p${i}`], 5, 1000, 40),
      ),
    );
    mocks.runGa4Report.mockResolvedValue(ga4Result([ga4Row("/p54", 200, 5)]));
    const unfiltered = await SearchOpportunityService.getOpportunities(
      { projectId: "p", limit: 25 },
      NOW,
    );
    const filtered = await SearchOpportunityService.getOpportunities(
      { projectId: "p", limit: 25, quick: "converts", work: "page1" },
      NOW,
    );
    expect(filtered.rows.map((r) => r.page)).toEqual([
      "https://example.com/p54",
    ]);
    expect(filtered.filteredCount).toBe(1);
    expect(filtered.valueCounts).toEqual(unfiltered.valueCounts);
    expect(filtered.totals).toEqual(unfiltered.totals);
    expect(
      Object.values(filtered.totals.byWork).reduce(
        (sum, work) => sum + work.gainPerMonth,
        0,
      ),
    ).toBe(filtered.totals.gainPerMonth);
  });

  it("preserves restricted event metrics instead of declaring zero conversions", async () => {
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)]);
    mocks.runGa4Report.mockResolvedValue(
      makeGa4ReportResult({
        rows: [
          {
            ...ga4Row("/a", 200, 0),
            keyEvents: null,
            sessionKeyEventRate: null,
          },
        ],
      }),
    );
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(result.rows[0]).toMatchObject({
      ga4: { sessions: 200, keyEvents: null, sessionKeyEventRate: null },
      value: null,
    });
  });

  it("does not issue conversion verdicts from thresholded Analytics reports", async () => {
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)]);
    const report = ga4Result([ga4Row("/a", 200, 5)]);
    report.reportMetadata.hasLimitedData = true;
    report.reportMetadata.subjectToThresholding = true;
    mocks.runGa4Report.mockResolvedValue(report);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(result.rows[0]).toMatchObject({
      ga4: { sessions: 200 },
      value: null,
    });
  });

  it("keeps GSC variants distinct and marks their Analytics cohort as shared", async () => {
    gsc([
      row(["q1", "https://example.com/a"], 5, 1000, 40),
      row(["q2", "https://example.com/a?variant=x"], 5, 1000, 40),
    ]);
    mocks.runGa4Report.mockResolvedValue(ga4Result([ga4Row("/a", 200, 5)]));
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(result.rows).toHaveLength(2);
    expect(result.rows.map((r) => r.joinPrecision)).toEqual([
      "ambiguous",
      "ambiguous",
    ]);
  });

  it("rejects impossible or unfinished explicit days rather than reading a different scope", async () => {
    gsc([], "2026-08-04");
    await expect(
      SearchOpportunityService.getOpportunities(
        { projectId: "p", startDate: "2026-02-30", endDate: "2026-08-03" },
        NOW,
      ),
    ).rejects.toMatchObject({ code: "validation_error" });
    await expect(
      SearchOpportunityService.getOpportunities(
        { projectId: "p", startDate: "2026-08-01", endDate: "2026-08-05" },
        NOW,
      ),
    ).rejects.toMatchObject({ code: "validation_error" });
  });

  it("reads Search Console's window and lists only pages with a gain", async () => {
    gsc([
      row(["near miss", "https://example.com/a"], 5, 1000, 40),
      row(["already top", "https://example.com/top"], 1, 1000, 300),
    ]);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      NOW,
    );

    // Search Console's calendar (Pacific), three days back, 28 days long.
    expect(result.request.dateRange).toEqual({
      startDate: "2026-07-07",
      endDate: "2026-08-03",
    });
    expect(mocks.runGa4Report).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: "2026-07-07",
        endDate: "2026-08-03",
      }),
    );
    // 1000 x 15% - 40 over 28 days, scaled to 30.
    expect(result.rows[0]).toMatchObject({
      page: "https://example.com/a",
      work: "page1",
      gain: 110,
      gainPerMonth: 118,
    });
    expect(result.rows[1]).toMatchObject({
      page: "https://example.com/top",
      gain: null,
    });
    expect(result.rows).toHaveLength(2);
    expect(result.totals).toMatchObject({
      noGainPages: 0,
      unknownPages: 1,
      gainPerMonth: 118,
      reasons: { insufficientTargetCurve: 1 },
    });
  });

  it("uses the Pacific day and labels missing completeness metadata as assumed", async () => {
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)]);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p", windowDays: 7 },
      { now: new Date("2026-08-06T01:00:00Z") },
    );
    expect(result.request.dateRange).toEqual({
      startDate: "2026-07-27",
      endDate: "2026-08-02",
    });
    expect(result.request.completeness.incompleteSource).toBe("assumed");
  });

  it("surfaces query-only truncation even when page and pair lists are complete", async () => {
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)], null, true);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(result.truncated).toMatchObject({
      gsc: true,
      queries: true,
      pages: false,
      queryPages: false,
    });
  });

  it("works without Analytics, which is only the secondary factor", async () => {
    mocks.getGa4Connection.mockResolvedValue(null);
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)]);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      NOW,
    );
    expect(result.analytics.state).toBe("not_connected");
    expect(result.rows[0]).toMatchObject({ ga4: null, value: null });
    expect(mocks.runGa4Report).not.toHaveBeenCalled();
  });

  it("labels business value only above a session floor", async () => {
    gsc([
      row(["q1", "https://example.com/sells"], 5, 1000, 40),
      row(["q2", "https://example.com/lucky"], 5, 1000, 40),
      row(["q3", "https://example.com/reads"], 5, 1000, 40),
    ]);
    mocks.runGa4Report.mockResolvedValue(
      ga4Result([
        ga4Row("/sells", 200, 12),
        // One conversion on three sessions is not a conversion rate.
        ga4Row("/lucky", 3, 1),
        ga4Row("/reads", 200, 0),
      ]),
    );
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      NOW,
    );
    const value = Object.fromEntries(
      result.rows.map((r) => [new URL(r.page).pathname, r.value]),
    );
    expect(value).toEqual({
      "/sells": "converts",
      "/lucky": "too_little_traffic",
      "/reads": "no_conversions",
    });
  });

  /*
   * Search Console reports `/blog`; GA4 reports `/blog` and
   * `/blog?utm_source=x` separately. The join key collapses them, and the
   * variants are added, not overwritten by whichever came last.
   */
  it("adds up the GA4 variants that collapse onto one page", async () => {
    gsc([row(["q", "https://example.com/blog"], 5, 1000, 40)]);
    mocks.runGa4Report.mockResolvedValue(
      ga4Result([
        ga4Row("/blog/", 800, 40),
        ga4Row("/blog/?utm_source=n", 200, 2),
      ]),
    );
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      NOW,
    );
    expect(result.rows[0]).toMatchObject({
      joinStatus: "joined",
      ga4: { sessions: 1_000, keyEvents: 42 },
    });
  });

  it("uses brand terms suggested from the domain until some are confirmed", async () => {
    mocks.getProjectIdentity.mockResolvedValue({
      domain: "ornek-site.com",
      name: null,
    });
    gsc([row(["ornek site kampanya", "https://example.com/k"], 5, 1000, 40)]);
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "project_1" },
      NOW,
    );
    expect(result.method.brandSource).toBe("suggested");
    expect(result.rows).toMatchObject([{ gain: null, brandOnly: true }]);
  });

  it("fails before asking anything when Search Console is not connected", async () => {
    mocks.getGscConnection.mockResolvedValue(null);
    await expect(
      SearchOpportunityService.getOpportunities({ projectId: "project_1" }),
    ).rejects.toBeInstanceOf(GscNotConnectedError);
    expect(mocks.queryAnalytics).not.toHaveBeenCalled();
    expect(mocks.runGa4Report).not.toHaveBeenCalled();
  });
});

it("joins converting landing pages from later GA4 pages before ranking opportunities", async () => {
  mocks.getGa4Connection.mockResolvedValue({
    propertyTimeZone: "America/New_York",
  });
  mocks.getGscConnection.mockResolvedValue({ siteUrl: "https://example.com/" });
  mocks.listBrandTerms.mockResolvedValue([]);
  mocks.getProjectIdentity.mockResolvedValue({ domain: null, name: null });
  gsc([row(["q", "https://example.com/later"], 5, 1000, 40)]);
  mocks.runGa4Report
    .mockResolvedValueOnce(
      makeGa4ReportResult({
        rows: [ga4Row("/first", 10, 0)],
        rowCount: 1,
        totalRowCount: 2,
        pageInfo: { offset: 0, limit: 1000, hasMore: true, nextOffset: 1 },
      }),
    )
    .mockResolvedValueOnce(
      makeGa4ReportResult({
        rows: [ga4Row("/later", 200, 5)],
        rowCount: 1,
        totalRowCount: 2,
        pageInfo: { offset: 1, limit: 1000, hasMore: false, nextOffset: null },
      }),
    );
  const result = await SearchOpportunityService.getOpportunities(
    { projectId: "p", quick: "converts" },
    NOW,
  );
  expect(result.rows.map((item) => item.page)).toEqual([
    "https://example.com/later",
  ]);
  expect(result.rows[0]?.ga4?.keyEvents).toBe(5);
});
