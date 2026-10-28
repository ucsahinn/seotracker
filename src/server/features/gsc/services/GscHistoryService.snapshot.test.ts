import { expect, it, vi } from "vitest";
import { GscHistoryService } from "./GscHistoryService";
import { GscHistoryRepository } from "../repositories/GscHistoryRepository";
import { GscConnectionRepository } from "../repositories/GscConnectionRepository";
import type { GscPerformanceInput } from "../searchAnalytics";

const control = vi.hoisted(() => ({
  switchProperty: undefined as (() => Promise<void>) | undefined,
}));
const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb({
    beforeQuery: async (query) => {
      if (query.startsWith("select") && query.includes('"gsc_connections"'))
        await control.switchProperty?.();
    },
  }),
);
const getPerformance = vi.hoisted(() =>
  vi.fn<
    (
      input: GscPerformanceInput,
    ) => Promise<{ siteUrl: string; rows: unknown[] }>
  >(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
vi.mock("./GscService", () => ({
  GscService: { getPerformance },
  isExpectedGrantFailure: () => false,
}));

it("P1-3: a property switch at the initial SQL read cannot import the previous archive cursor", async () => {
  testDb.database.exec(`
    INSERT INTO gsc_connections (id, project_id, organization_id, site_url, connected_by_user_id) VALUES ('c', 'p', 'o', 'sc-domain:a.test', 'u');
    INSERT INTO gsc_archive_state (project_id, earliest_date, last_date, scanned_through) VALUES ('p', '2026-01-01', '2026-10-20', '2026-10-20');
  `);
  control.switchProperty = async () => {
    control.switchProperty = undefined;
    await GscConnectionRepository.upsert({
      projectId: "p",
      organizationId: "o",
      connectedByUserId: "u",
      siteUrl: "sc-domain:b.test",
      gscAccountId: "account",
      connectedAccountEmail: null,
    });
  };
  getPerformance.mockResolvedValue({ siteUrl: "sc-domain:b.test", rows: [] });
  await GscHistoryService.backfill({
    projectId: "p",
    today: new Date("2026-10-28T12:00:00Z"),
  });
  expect(getPerformance.mock.calls[0]?.[0].startDate).not.toBe("2026-10-21");
  const state = await GscHistoryRepository.getArchiveState("p");
  expect(state?.earliestDate).toBeNull();
  expect(state?.lastDate).toBeNull();
});
