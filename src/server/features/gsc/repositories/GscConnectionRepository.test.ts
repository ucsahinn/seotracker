import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscConnectionRepository } from "./GscConnectionRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

const connection = (siteUrl: string, gscAccountId = "acc") => ({
  projectId: "p1",
  organizationId: "o1",
  siteUrl,
  connectedByUserId: "u1",
  gscAccountId,
  connectedAccountEmail: null,
});

function count(table: string) {
  const row = testDb.database
    .prepare(`SELECT count(*) AS n FROM ${table} WHERE project_id = 'p1'`)
    .get();
  return Number(row?.n);
}

beforeEach(() => {
  for (const table of [
    "gsc_connections",
    "gsc_query_daily",
    "gsc_archive_state",
    "gsc_url_inspections",
  ]) {
    testDb.database.exec(`DELETE FROM ${table}`);
  }
  testDb.database.exec(`
    INSERT INTO gsc_query_daily VALUES ('p1', '2026-01-01', 'q', 1, 2, 0.5, 3, 'now');
    INSERT INTO gsc_archive_state (project_id, last_date) VALUES ('p1', '2026-01-01');
    INSERT INTO gsc_url_inspections (project_id, url) VALUES ('p1', 'https://a/');
  `);
});

describe("GscConnectionRepository property data", () => {
  it("drops the archive and ledger when the project switches property", async () => {
    await GscConnectionRepository.upsert(connection("sc-domain:old.test"));
    await GscConnectionRepository.upsert(connection("sc-domain:new.test"));

    expect(count("gsc_query_daily")).toBe(0);
    expect(count("gsc_archive_state")).toBe(0);
    expect(count("gsc_url_inspections")).toBe(0);
  });

  it("keeps them when the same property is saved again", async () => {
    await GscConnectionRepository.upsert(connection("sc-domain:a.test"));
    await GscConnectionRepository.upsert(connection("sc-domain:a.test", "b"));

    expect(count("gsc_query_daily")).toBe(1);
    expect(count("gsc_archive_state")).toBe(1);
    expect(count("gsc_url_inspections")).toBe(1);
  });

  it("drops them on disconnect", async () => {
    await GscConnectionRepository.upsert(connection("sc-domain:a.test"));
    await GscConnectionRepository.deleteByProjectId("p1");

    expect(count("gsc_connections")).toBe(0);
    expect(count("gsc_query_daily")).toBe(0);
    expect(count("gsc_archive_state")).toBe(0);
    expect(count("gsc_url_inspections")).toBe(0);
  });
});
