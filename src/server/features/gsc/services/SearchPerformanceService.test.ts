import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GscAnalyticsResult } from "@/server/features/gsc/services/GscService";
import type { GscPerformanceInput } from "@/server/features/gsc/searchAnalytics";
import { SearchPerformanceService } from "./SearchPerformanceService";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
const queryAnalytics = vi.hoisted(() =>
  vi.fn<(input: GscPerformanceInput) => Promise<GscAnalyticsResult>>(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: { queryAnalytics },
  isExpectedGrantFailure: () => false,
  GscNotConnectedError: class extends Error {},
}));

const answer = (
  rows: GscAnalyticsResult["rows"],
  extra: Partial<GscAnalyticsResult> = {},
): GscAnalyticsResult => ({
  siteUrl: "sc-domain:site.test",
  request: { startDate: "", endDate: "" },
  rows,
  truncated: false,
  requests: 1,
  aggregationType: "byProperty",
  firstIncompleteDate: null,
  ...extra,
});

/** Pacific today is 2026-10-26 at this instant (UTC noon). */
const NOW = new Date("2026-10-26T19:00:00Z");

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
  testDb.database.exec("DELETE FROM gsc_site_daily");
  testDb.database.exec("DELETE FROM gsc_connections");
  testDb.database.exec(
    "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:site.test', 'u1')",
  );
  queryAnalytics.mockImplementation((input: GscPerformanceInput) => {
    const dims = input.dimensions ?? [];
    if (dims[0] === "date") {
      // 10 clicks / 100 impressions every day; Google is still counting from 10-24.
      const rows = [];
      for (
        let d = Date.parse("2025-07-01");
        d <= Date.parse("2026-10-25");
        d += 86_400_000
      ) {
        const date = new Date(d).toISOString().slice(0, 10);
        rows.push({
          keys: [date],
          clicks: 10,
          impressions: 100,
          ctr: 0.1,
          position: 5,
        });
      }
      return Promise.resolve(
        answer(rows, { firstIncompleteDate: "2026-10-24" }),
      );
    }
    if (dims[0] === "query" && dims.length === 1) {
      // 28 days x 10 = 280 site clicks; the query rows hold only 200.
      return Promise.resolve(
        answer([
          {
            keys: ["q"],
            clicks: 200,
            impressions: 2000,
            ctr: 0.1,
            position: 5,
          },
        ]),
      );
    }
    return Promise.resolve(answer([]));
  });
});

describe("SearchPerformanceService.getView", () => {
  it.each(["query", "page"] as const)(
    "keeps the literal %s key in exact-date evidence instead of including substring neighbors",
    async (dimension) => {
      const original = queryAnalytics.getMockImplementation()!;
      queryAnalytics.mockImplementation((input: GscPerformanceInput) => {
        if (input.dimensions?.join() === "query,page")
          return Promise.resolve(
            answer([
              {
                keys: ["cat", "https://site.test/a?x=1"],
                clicks: 1,
                impressions: 10,
                ctr: 0.1,
                position: 5,
              },
              {
                keys: ["cats", "https://site.test/ab"],
                clicks: 2,
                impressions: 20,
                ctr: 0.1,
                position: 6,
              },
            ]),
          );
        return original(input);
      });
      const window = { startDate: "2026-09-01", endDate: "2026-09-07" };
      const key = dimension === "query" ? "cat" : "https://site.test/a?x=1";
      const result = await SearchPerformanceService.getDrilldown({
        projectId: "p1",
        filters: { dateRange: "last_28_days", searchType: "web" },
        dimension,
        key,
        window,
      });
      expect(result.window).toEqual(window);
      expect(result.rows).toHaveLength(1);
      expect(queryAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          ...window,
          dimensions: ["date"],
          filters: [{ dimension, operator: "equals", expression: key }],
        }),
      );
    },
  );

  it("pins a 90-day source span instead of replacing it with the moving preset", async () => {
    const window = { startDate: "2026-07-01", endDate: "2026-09-28" };
    const view = await SearchPerformanceService.getView({
      projectId: "p1",
      filters: { dateRange: "last_28_days", searchType: "web" },
      window,
    });
    expect(view.window).toMatchObject({ ...window, days: 90 });
    expect(view.window.previous).toEqual({
      startDate: "2026-04-02",
      endDate: "2026-06-30",
    });
    expect(view.totals.current.clicks).toBe(900);
    expect(queryAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ ...window, dimensions: ["page"] }),
    );
  });

  it("refuses an unreadable pinned span instead of silently exporting another period", async () => {
    for (const window of [
      { startDate: "2020-01-01", endDate: "2020-01-07" },
      { startDate: "2026-10-20", endDate: "2026-10-24" },
      { startDate: "2026-02-30", endDate: "2026-03-04" },
    ])
      await expect(
        SearchPerformanceService.getView({
          projectId: "p1",
          filters: { dateRange: "last_7_days", searchType: "web" },
          window,
        }),
      ).rejects.toMatchObject({ code: "VALIDATION_ERROR" });
  });

  it("takes site totals from the date series and shows the rest as hidden queries", async () => {
    const view = await SearchPerformanceService.getView({
      projectId: "p1",
      filters: { dateRange: "last_28_days", searchType: "web" },
    });

    expect(view.window).toMatchObject({
      startDate: "2026-09-26",
      endDate: "2026-10-23",
      firstIncompleteDate: "2026-10-24",
    });
    expect(view.totals.current).toMatchObject({
      clicks: 280,
      impressions: 2800,
    });
    expect(view.totals.vsPrevious?.clicks.change).toBe(0);
    // Two provisional days after the window, summed apart.
    expect(view.totals.provisional).toMatchObject({ clicks: 20 });
    expect(view.coverage.hiddenQueries).toMatchObject({
      clicks: 80,
      exact: true,
    });
    expect(view.coverage.hiddenQueries.clickShare).toBeCloseTo(80 / 280);
  });

  it("archives the finished days and nothing Google is still counting", async () => {
    await SearchPerformanceService.getView({
      projectId: "p1",
      filters: { dateRange: "last_7_days", searchType: "web" },
    });
    const newest = testDb.database
      .prepare("SELECT max(date) AS d FROM gsc_site_daily")
      .get();
    expect(newest?.d).toBe("2026-10-23");
  });
});
