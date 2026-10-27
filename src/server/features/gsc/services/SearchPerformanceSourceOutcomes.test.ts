import { afterEach, beforeEach, expect, it, vi } from "vitest";
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

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-26T19:00:00Z"));
  testDb.database.exec(
    "DELETE FROM gsc_connections; INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:site.test', 'u1')",
  );
  queryAnalytics.mockImplementation((input: GscPerformanceInput) => {
    const dimension = input.dimensions?.[0];
    if (dimension === "device") return Promise.reject(new Error("timeout"));
    return Promise.resolve({
      siteUrl: "sc-domain:site.test",
      request: {
        startDate: input.startDate ?? "",
        endDate: input.endDate ?? "",
      },
      rows:
        dimension === "date"
          ? [
              {
                keys: ["2026-10-20"],
                clicks: 10,
                impressions: 100,
                ctr: 0.1,
                position: 5,
              },
            ]
          : [],
      truncated: dimension === "searchAppearance",
      requests: 1,
      aggregationType: "byProperty",
      firstIncompleteDate: "2026-10-24",
    });
  });
});
afterEach(() => vi.useRealTimers());

it("keeps a failed optional panel distinct from empty and capped panels while retaining site totals (previously all looked empty)", async () => {
  const view = await SearchPerformanceService.getView({
    projectId: "p1",
    filters: { dateRange: "last_28_days", searchType: "web" },
  });
  expect(view.totals.current.clicks).toBe(10);
  expect(view.sourceOutcomes).toMatchObject({
    devices: { status: "unavailable", reason: "request-failed" },
    countries: { status: "empty", reason: null },
    searchAppearance: { status: "partial", reason: "row-limit" },
    decay: { status: "empty", reason: null },
  });
});

it("does not request decay quarters beyond retention (previously their clipped response became a negative finding)", async () => {
  const view = await SearchPerformanceService.getView({
    projectId: "p1",
    filters: { dateRange: "last_28_days", searchType: "web" },
    window: { startDate: "2026-06-01", endDate: "2026-06-28" },
  });
  expect(view.sourceOutcomes?.decay).toEqual({
    status: "insufficient-history",
    reason: "retention-limit",
  });
  const pageCalls = queryAnalytics.mock.calls.filter(
    ([input]) =>
      input.dimensions?.length === 1 && input.dimensions[0] === "page",
  );
  expect(pageCalls).toHaveLength(2);
});
