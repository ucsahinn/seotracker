import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  inspectAndRecord,
  inspectionsInLastDay,
} from "./GscIndexCoverageService";

// Real SQLite with every migration: what the upsert's conflict clause keeps,
// what the attempt ledger counts and what the property fence drops are the
// contract, and a mocked builder chain cannot see any of it.
const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
const inspectUrls = vi.hoisted(() => vi.fn());

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: { inspectUrls },
}));

const SITE = "sc-domain:example.com";
const URL_A = "https://example.com/a";

function answer(url: string, verdict: string | null, siteUrl = SITE) {
  return {
    siteUrl,
    results: [
      verdict
        ? { url, result: { indexStatusResult: { verdict } } }
        : { url, result: null, error: "quota" },
    ],
  };
}

function inspection() {
  return testDb.database
    .prepare(
      "SELECT verdict, error, checked_at, last_attempt_at FROM gsc_url_inspections WHERE url = ?",
    )
    .get(URL_A);
}

beforeEach(() => {
  for (const table of [
    "gsc_connections",
    "gsc_url_inspections",
    "gsc_inspection_attempts",
  ]) {
    testDb.database.exec(`DELETE FROM ${table}`);
  }
  testDb.database
    .prepare(
      "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', ?, 'u1')",
    )
    .run(SITE);
});

describe("inspectAndRecord", () => {
  it("keeps a stored verdict, and the time it was given, when a later inspection fails", async () => {
    inspectUrls.mockResolvedValueOnce(answer(URL_A, "PASS"));
    await inspectAndRecord({
      projectId: "p1",
      urls: [URL_A],
      now: new Date("2026-06-01T10:00:00.000Z"),
    });

    inspectUrls.mockResolvedValueOnce(answer(URL_A, null));
    await inspectAndRecord({
      projectId: "p1",
      urls: [URL_A],
      force: true,
      now: new Date("2026-06-20T10:00:00.000Z"),
    });

    expect(inspection()).toMatchObject({
      verdict: "PASS",
      error: "quota",
      checked_at: "2026-06-01T10:00:00.000Z",
      last_attempt_at: "2026-06-20T10:00:00.000Z",
    });
  });

  it("counts a forced re-inspection of the same URL as another spent inspection", async () => {
    const now = new Date("2026-06-01T10:00:00.000Z");
    inspectUrls.mockResolvedValue(answer(URL_A, "PASS"));
    await inspectAndRecord({ projectId: "p1", urls: [URL_A], now });
    await inspectAndRecord({
      projectId: "p1",
      urls: [URL_A],
      force: true,
      now,
    });

    expect(await inspectionsInLastDay("p1", now)).toBe(2);
  });

  it("does not forget spent inspections when the cache is cleared", async () => {
    const now = new Date("2026-06-01T10:00:00.000Z");
    inspectUrls.mockResolvedValueOnce(answer(URL_A, "PASS"));
    await inspectAndRecord({ projectId: "p1", urls: [URL_A], now });
    testDb.database.exec("DELETE FROM gsc_url_inspections");

    expect(await inspectionsInLastDay("p1", now)).toBe(1);
  });

  it("drops answers for a property the project no longer points at, but still counts them", async () => {
    const now = new Date("2026-06-01T10:00:00.000Z");
    inspectUrls.mockImplementationOnce(async () => {
      // The operator switches property while Google is answering.
      testDb.database.exec(
        "UPDATE gsc_connections SET site_url = 'sc-domain:other.com'",
      );
      return answer(URL_A, "PASS");
    });
    await inspectAndRecord({ projectId: "p1", urls: [URL_A], now });

    expect(inspection()).toBeUndefined();
    const spent = testDb.database
      .prepare(
        "SELECT count(*) AS n FROM gsc_inspection_attempts WHERE site_url = ?",
      )
      .get(SITE);
    expect(spent).toMatchObject({ n: 1 });
  });
});
