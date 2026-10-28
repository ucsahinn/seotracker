import { expect, it, vi } from "vitest";
import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
import { readRankingArchive } from "@/server/features/gsc/services/rankingArchiveRead";
import { getRankingHistoryTool } from "./ranking-tools";
import { makeToolContext } from "./tool-test-support";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
vi.mock("@/server/features/projects/services/ProjectService", () => ({
  ProjectService: {
    getProjectForOrganization: vi.fn(async () => ({ id: "p1" })),
  },
}));

it("makes the archive summary beyond its first output page reachable", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-28T12:00:00Z"));
  try {
    testDb.database.exec(
      "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('cp', 'pp', 'o1', 'sc-domain:pages.test', 'u1')",
    );
    await GscHistoryRepository.upsertDailyRows(
      "pp",
      "sc-domain:pages.test",
      ["a", "b", "c"].map((query) => ({
        date: "2026-10-01",
        query,
        clicks: 1,
        impressions: 10,
        ctr: 0.1,
        position: 5,
      })),
    );
    const first = await getRankingHistoryTool.handler(
      { projectId: "pp", days: 900, limit: 2 },
      makeToolContext(),
    );
    expect(first.structuredContent).toMatchObject({
      hasMore: true,
      nextOffset: 2,
      rows: [{ query: "a" }, { query: "b" }],
    });
    const last = await getRankingHistoryTool.handler(
      { projectId: "pp", days: 900, limit: 2, offset: 2 },
      makeToolContext(),
    );
    expect(last.structuredContent).toMatchObject({
      hasMore: false,
      rows: [{ query: "c" }],
    });
  } finally {
    vi.useRealTimers();
  }
});

it("NUM-02: MCP summary and detail share the UI's complete 90-day archive window", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-28T12:00:00Z"));
  try {
    testDb.database.exec(
      "INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c1', 'p1', 'o1', 'sc-domain:example.com', 'u1')",
    );
    await GscHistoryRepository.upsertDailyRows(
      "p1",
      "sc-domain:example.com",
      Array.from({ length: 91 }, (_, i) => ({
        date: new Date(Date.UTC(2026, 6, 28 + i)).toISOString().slice(0, 10),
        query: "q",
        clicks: 1,
        impressions: 10,
        ctr: 0.1,
        position: 5,
      })),
    );
    const ui = await readRankingArchive({
      projectId: "p1",
      days: 90,
      limit: 25,
      offset: 0,
    });
    const summary = await getRankingHistoryTool.handler(
      { projectId: "p1", days: 90 },
      makeToolContext(),
    );
    expect(summary.structuredContent).toMatchObject({
      days: 90,
      startDate: "2026-07-28",
      endDate: "2026-10-25",
      rows: [
        expect.objectContaining({
          clicks: 90,
          impressions: 900,
          position: ui.rows[0].position,
        }),
      ],
    });
    const detail = await getRankingHistoryTool.handler(
      { projectId: "p1", days: 90, query: "q" },
      makeToolContext(),
    );
    expect(detail.structuredContent).toMatchObject({
      startDate: ui.range.startDate,
      endDate: ui.range.endDate,
    });
    expect(detail.structuredContent.rows).toHaveLength(90);
    expect(detail.structuredContent.rows[0]).toMatchObject({
      date: "2026-07-28",
    });
    expect(detail.structuredContent.rows.at(-1)).toMatchObject({
      date: "2026-10-25",
    });
  } finally {
    vi.useRealTimers();
  }
});
