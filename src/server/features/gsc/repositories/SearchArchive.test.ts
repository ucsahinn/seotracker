import { beforeEach, describe, expect, it, vi } from "vitest";
import { GscSiteDailyRepository } from "./GscSiteDailyRepository";
import { GscHistoryRepository } from "./GscHistoryRepository";
import { SearchSettingsRepository } from "./SearchSettingsRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

const segment = { projectId: "p1", searchType: "web", device: "all" };
const day = (date: string, clicks: number) => ({
  date,
  clicks,
  impressions: 100,
  ctr: clicks / 100,
  position: 4,
});

beforeEach(() => {
  for (const table of [
    "gsc_connections",
    "gsc_site_daily",
    "gsc_query_daily",
    "gsc_annotations",
    "project_brand_terms",
  ]) {
    testDb.database.exec(`DELETE FROM ${table}`);
  }
  testDb.database.exec(
    "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:new.test', 'u1')",
  );
});

describe("GscSiteDailyRepository", () => {
  it("writes only new or changed days, and only for the connected property", async () => {
    const site = { ...segment, siteUrl: "sc-domain:new.test" };
    expect(
      await GscSiteDailyRepository.upsertDays(site, [
        day("2026-10-01", 5),
        day("2026-10-02", 0),
      ]),
    ).toBe(2);
    expect(
      await GscSiteDailyRepository.upsertDays(site, [
        day("2026-10-01", 5),
        day("2026-10-02", 3),
      ]),
    ).toBe(1);
    await GscSiteDailyRepository.upsertDays(
      { ...segment, siteUrl: "sc-domain:old.test" },
      [day("2026-10-03", 9)],
    );
    const stored = await GscSiteDailyRepository.getDays(segment);
    expect(stored.map((d) => [d.date, d.clicks])).toEqual([
      ["2026-10-01", 5],
      ["2026-10-02", 3],
    ]);
  });
});

describe("GscHistoryRepository.getWeeklyPositionBuckets", () => {
  it("buckets each query by its impression-weighted position for the week", async () => {
    const insert = testDb.database.prepare(
      "INSERT INTO gsc_query_daily (project_id, date, query, clicks, impressions, ctr, position, fetched_at) VALUES ('p1', ?, ?, 0, ?, 0, ?, 'x')",
    );
    // Monday 2026-10-05 and Wednesday 2026-10-07: (2*100 + 8*300) / 400 = 6.5 -> "4-10".
    insert.run("2026-10-05", "a", 100, 2);
    insert.run("2026-10-07", "a", 300, 8);
    insert.run("2026-10-06", "b", 50, 1);
    // Sunday belongs to the week that began the Monday before.
    insert.run("2026-10-11", "c", 10, 30);
    const rows = await GscHistoryRepository.getWeeklyPositionBuckets({
      projectId: "p1",
      since: "2026-10-01",
      until: "2026-10-31",
    });
    expect(rows.map((r) => [r.weekStart, r.bucket, r.queries])).toEqual(
      expect.arrayContaining([
        ["2026-10-05", "1-3", 1],
        ["2026-10-05", "4-10", 1],
        ["2026-10-05", "21-50", 1],
      ]),
    );
    expect(rows).toHaveLength(3);
  });
});

describe("SearchSettingsRepository", () => {
  it("replaces the brand terms as a whole list", async () => {
    await SearchSettingsRepository.replaceBrandTerms("p1", [
      "örnek site",
      "orneksite",
    ]);
    await SearchSettingsRepository.replaceBrandTerms("p1", ["örnek site"]);
    expect(await SearchSettingsRepository.listBrandTerms("p1")).toEqual([
      "örnek site",
    ]);
  });

  it("deletes a note only within its own project", async () => {
    const note = await SearchSettingsRepository.addNote({
      projectId: "p1",
      date: "2026-10-01",
      note: "Yeni tasarım",
    });
    await SearchSettingsRepository.deleteNote("p2", note.id);
    expect(
      await SearchSettingsRepository.listNotes({ projectId: "p1" }),
    ).toHaveLength(1);
    await SearchSettingsRepository.deleteNote("p1", note.id);
    expect(
      await SearchSettingsRepository.listNotes({ projectId: "p1" }),
    ).toEqual([]);
  });
});
