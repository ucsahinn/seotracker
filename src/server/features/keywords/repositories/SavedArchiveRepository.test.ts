import { describe, expect, it, vi } from "vitest";
import { SavedArchiveRepository } from "./SavedArchiveRepository";
const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
describe("Saved observation dates", () => {
  it("batches more than 100 variants and excludes other projects and out-of-window rows", async () => {
    const insert = testDb.database.prepare(
      "INSERT INTO gsc_query_daily (project_id,date,query,clicks,impressions,ctr,position,fetched_at) VALUES (?,?,?,?,?,?,?,?)",
    );
    const queries = Array.from({ length: 161 }, (_, i) => "query " + i);
    for (const query of queries)
      insert.run(
        "saved-test",
        "2026-09-01",
        query,
        1,
        10,
        0.1,
        2,
        "2026-09-05",
      );
    insert.run("other", "2026-09-01", queries[0], 1, 10, 0.1, 2, "2026-09-05");
    insert.run(
      "saved-test",
      "2026-10-01",
      queries[0],
      1,
      10,
      0.1,
      2,
      "2026-10-05",
    );
    const result = await SavedArchiveRepository.observationDates(
      "saved-test",
      queries,
      "2026-09-01",
      "2026-09-30",
    );
    expect(result.size).toBe(161);
    expect(result.get(queries[0])).toEqual(["2026-09-01"]);
  });
});
