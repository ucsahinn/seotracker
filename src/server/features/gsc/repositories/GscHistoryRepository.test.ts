import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscHistoryRepository } from "./GscHistoryRepository";
import {
  readRankingArchive,
  readRankingQueryArchive,
} from "../services/rankingArchiveRead";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

const day = {
  date: "2026-01-01",
  query: "q",
  clicks: 1,
  impressions: 2,
  ctr: 0.5,
  position: 3,
};
const run = {
  projectId: "p1",
  earliestDate: "2026-01-01",
  lastDate: "2026-01-02",
  scannedThrough: "2026-01-02",
  incomplete: { from: "2026-01-01", through: "2026-01-02" },
  error: null,
};

function count(table: string) {
  return Number(
    testDb.database.prepare(`SELECT count(*) AS n FROM ${table}`).get()?.n,
  );
}

beforeEach(() => {
  for (const table of [
    "gsc_archive_coverage",
    "gsc_connections",
    "gsc_query_daily",
    "gsc_archive_state",
  ]) {
    testDb.database.exec(`DELETE FROM ${table}`);
  }
  testDb.database.exec(
    "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:new.test', 'u1')",
  );
});

describe("GscHistoryRepository property fence", () => {
  it("stores rows and the incomplete range for the connected property", async () => {
    await GscHistoryRepository.upsertDailyRows("p1", "sc-domain:new.test", [
      day,
    ]);
    await GscHistoryRepository.markRun({
      ...run,
      siteUrl: "sc-domain:new.test",
    });

    expect(count("gsc_query_daily")).toBe(1);
    const state = testDb.database
      .prepare(
        "SELECT incomplete_from AS f, incomplete_through AS t FROM gsc_archive_state",
      )
      .get();
    expect(state).toMatchObject({ f: "2026-01-01", t: "2026-01-02" });
  });

  it("drops rows and run state fetched for a property the project has left", async () => {
    await GscHistoryRepository.upsertDailyRows("p1", "sc-domain:old.test", [
      day,
    ]);
    await GscHistoryRepository.markRun({
      ...run,
      siteUrl: "sc-domain:old.test",
    });

    expect(count("gsc_query_daily")).toBe(0);
    expect(count("gsc_archive_state")).toBe(0);
  });
});

describe("bounded ranking reads and coverage", () => {
  it("reconciles table and detail means for the same query and exact dates", async () => {
    await GscHistoryRepository.upsertDailyRows("p1", "sc-domain:new.test", [
      { ...day, date: "2025-12-31", position: 5 },
      { ...day, date: "2026-01-01", position: 3 },
      { ...day, date: "2026-01-02", position: 30 },
    ]);
    const scope = {
      projectId: "p1",
      days: 7,
      startDate: "2026-01-01",
      endDate: "2026-01-01",
    };
    const table = await readRankingArchive({ ...scope, limit: 25, offset: 0 });
    const detail = await readRankingQueryArchive({ ...scope, query: "q" });
    expect(detail.comparison).toMatchObject({
      position: table.rows[0]?.position,
      delta: 2,
    });
    expect(table.rows[0]?.impressions).toBe(
      detail.rows.reduce((sum, row) => sum + row.impressions, 0),
    );
    expect(table.coverage).toEqual({
      complete: 0,
      limited: 0,
      failed: 0,
      unknown: 1,
    });
  });
  it("excludes after-end observations from aggregates, daily history and weekly lines", async () => {
    await GscHistoryRepository.upsertDailyRows("p1", "sc-domain:new.test", [
      { ...day, date: "2026-01-01", position: 3 },
      { ...day, date: "2026-01-02", position: 30, impressions: 100 },
    ]);
    const span = { projectId: "p1", since: "2026-01-01", until: "2026-01-01" };
    const [aggregate] = await GscHistoryRepository.getTrackedQueries(span);
    const history = await GscHistoryRepository.getQueryHistory({
      ...span,
      query: "q",
    });
    const [weekly] = await GscHistoryRepository.getWeeklyPositions({
      ...span,
      queries: ["q"],
    });
    expect(aggregate).toMatchObject({ position: 3, impressions: 2, days: 1 });
    expect(history.map((row) => row.date)).toEqual(["2026-01-01"]);
    expect(weekly?.position).toBe(3);
  });

  it("does not invent coverage for old rows and retains an overflowing day after cursor advancement", async () => {
    const scope = { projectId: "p1", since: "2026-01-01", until: "2026-01-02" };
    await GscHistoryRepository.upsertDailyRows("p1", "sc-domain:new.test", [
      day,
    ]);
    expect(await GscHistoryRepository.getCoverage(scope)).toEqual([]);
    await GscHistoryRepository.markCoverage({
      ...scope,
      until: scope.since,
      siteUrl: "sc-domain:new.test",
      status: "own-cap-limited",
    });
    await GscHistoryRepository.markRun({
      ...run,
      incomplete: null,
      siteUrl: "sc-domain:new.test",
    });
    expect(await GscHistoryRepository.getCoverage(scope)).toEqual([
      { date: "2026-01-01", status: "own-cap-limited" },
    ]);
  });

  it("fences coverage writes against a property switch", async () => {
    await GscHistoryRepository.markCoverage({
      projectId: "p1",
      siteUrl: "sc-domain:old.test",
      since: day.date,
      until: day.date,
      status: "complete-response",
    });
    expect(
      await GscHistoryRepository.getCoverage({
        projectId: "p1",
        since: day.date,
        until: day.date,
      }),
    ).toEqual([]);
  });
});
