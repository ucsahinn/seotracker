import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscHistoryRepository } from "./GscHistoryRepository";

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
