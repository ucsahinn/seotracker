import { beforeEach, describe, expect, it, vi } from "vitest";
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
  curve = CURVE,
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
              : curve,
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

describe("SearchOpportunityService number consistency", () => {
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

  it("NUM-01: withholds conversion verdicts until the normalized GA4 cohort is complete", async () => {
    gsc([row(["q", "https://example.com/a"], 5, 1000, 40)]);
    const rows = [
      ga4Row("/a", 40, 0),
      ...Array.from({ length: 999 }, (_, i) => ga4Row(`/other${i}`, 30, 1)),
    ];
    mocks.runGa4Report.mockResolvedValue({
      ...ga4Result(rows),
      totalRowCount: 1001,
    });
    const partial = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(partial.truncated.ga4).toBe(true);
    expect(partial.reportMetadata?.hasLimitedData).toBe(true);
    expect(partial.rows[0]).toMatchObject({
      ga4: { sessions: 40, keyEvents: 0 },
      value: null,
    });
    expect(partial.valueCounts.no_conversions).toBe(0);
    const filtered = await SearchOpportunityService.getOpportunities(
      { projectId: "p", quick: "no_conversions" },
      NOW,
    );
    expect(filtered.rows).toEqual([]);
    mocks.runGa4Report.mockResolvedValue(
      ga4Result([...rows, ga4Row("/a/", 20, 4)]),
    );
    const complete = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(complete.rows[0]).toMatchObject({
      ga4: { sessions: 60, keyEvents: 4 },
      value: "converts",
    });
  });

  it("NUM-04: allocates the monthly total across pages before display slicing", async () => {
    gsc(
      [
        row(["q1", "https://example.com/a"], 15, 200, 1),
        row(["q2", "https://example.com/b"], 15, 200, 1),
      ],
      null,
      false,
      Array.from({ length: 5 }, (_, i) => row([`curve ${i}`], 8, 1000, 40)),
    );
    const result = await SearchOpportunityService.getOpportunities(
      { projectId: "p" },
      NOW,
    );
    expect(result.rows.map((page) => page.gain)).toEqual([7, 7]);
    expect(result.totals.gainPerMonth).toBe(15);
    expect(result.rows.reduce((sum, page) => sum + page.gainPerMonth, 0)).toBe(
      15,
    );
    expect(
      Object.values(result.totals.byWork).reduce(
        (sum, work) => sum + work.gainPerMonth,
        0,
      ),
    ).toBe(15);
    for (const page of result.rows) {
      expect(
        page.queries.reduce(
          (sum, query) => sum + (query.gainPerMonth ?? 0),
          0,
        ) + (page.otherQueryGainPerMonth ?? 0),
      ).toBe(page.gainPerMonth);
    }
    const limited = await SearchOpportunityService.getOpportunities(
      { projectId: "p", limit: 1 },
      NOW,
    );
    expect(limited.rows[0]).toEqual(result.rows[0]);
    expect(limited.totals).toEqual(result.totals);
  });
});
