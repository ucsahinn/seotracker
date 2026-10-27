import { beforeEach, expect, it, vi } from "vitest";
import { GscHistoryService } from "./GscHistoryService";
import { GscHistoryRepository } from "../repositories/GscHistoryRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
const getPerformance = vi.hoisted(() => vi.fn());
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
vi.mock("./GscService", () => ({
  GscService: { getPerformance },
  isExpectedGrantFailure: () => false,
}));

const siteUrl = "sc-domain:site.test";
const row = {
  date: "2026-06-25",
  query: "remaining",
  clicks: 1,
  impressions: 10,
  ctr: 0.1,
  position: 5,
};

beforeEach(() => {
  for (const table of [
    "gsc_connections",
    "gsc_query_daily",
    "gsc_archive_state",
    "gsc_archive_coverage",
    "gsc_query_daily_stage",
  ])
    testDb.database.exec(`DELETE FROM ${table}`);
  testDb.database.exec(
    "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:site.test', 'u1')",
  );
});

it.each([false, true])(
  "P1-1: backfill reconciles vanished queries and complete coverage (empty response: %s)",
  async (empty) => {
    await GscHistoryRepository.upsertDailyRows("p1", siteUrl, [
      row,
      { ...row, query: "vanished", impressions: 90 },
    ]);
    await GscHistoryRepository.markRun({
      projectId: "p1",
      siteUrl,
      earliestDate: row.date,
      lastDate: row.date,
      scannedThrough: "2026-06-27",
      incomplete: null,
      error: null,
    });
    getPerformance.mockResolvedValue({
      siteUrl,
      rows: empty
        ? []
        : [{ ...row, keys: [row.date, row.query], impressions: 12 }],
    });
    const result = await GscHistoryService.backfill({
      projectId: "p1",
      today: new Date("2026-06-30T12:00:00Z"),
    });
    expect(result.error).toBeNull();
    expect(
      await GscHistoryRepository.getQueryHistory({
        projectId: "p1",
        query: "vanished",
      }),
    ).toEqual([]);
    const stored = await GscHistoryRepository.getQueryHistory({
      projectId: "p1",
      query: row.query,
    });
    expect(stored).toEqual(empty ? [] : [{ ...row, impressions: 12 }]);
    expect(
      await GscHistoryRepository.getCoverage({
        projectId: "p1",
        since: row.date,
        until: row.date,
      }),
    ).toEqual([{ date: row.date, status: "complete-response" }]);
  },
);
