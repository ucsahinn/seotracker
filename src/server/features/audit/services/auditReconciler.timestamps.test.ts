import { expect, it, vi } from "vitest";
import { reconcileStaleAudits } from "./auditReconciler";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({
  env: {
    SITE_AUDIT_WORKFLOW: {
      get: async () => {
        throw new Error("not found");
      },
    },
  },
}));
vi.mock("@/server/features/audit/auditHeartbeat", () => ({
  getAuditHeartbeat: async () => null,
}));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

it("P2-1: reconciles both timestamp formats on the same UTC day without selecting a recent legacy row", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  // A future day also keeps this test independent of the module's boot time.
  vi.setSystemTime(new Date("2099-10-28T02:00:00Z"));
  try {
    const insert = testDb.database
      .prepare(`INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config, workflow_instance_id, started_at)
      VALUES (?, 'p', 'u', 'https://example.test', 'running', '{}', ?, ?)`);
    for (const [id, timestamp] of [
      ["iso", "2099-10-28T01:00:00.000Z"],
      ["legacy", "2099-10-28 01:00:00"],
      ["recent", "2099-10-28 01:59:00"],
    ])
      insert.run(id, id, timestamp);
    await reconcileStaleAudits();
    expect(
      testDb.database
        .prepare("SELECT id, status FROM audits ORDER BY id")
        .all(),
    ).toEqual([
      { id: "iso", status: "failed" },
      { id: "legacy", status: "failed" },
      { id: "recent", status: "running" },
    ]);
  } finally {
    vi.useRealTimers();
  }
});
