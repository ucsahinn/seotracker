import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { reconcileRunningAudit, reconcileStaleAudits } from "./auditReconciler";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
const workflow = vi.hoisted(() => ({ status: vi.fn(), heartbeat: vi.fn() }));
vi.mock("cloudflare:workers", () => ({
  env: {
    SITE_AUDIT_WORKFLOW: {
      get: async () => ({ status: workflow.status }),
    },
  },
}));
vi.mock("@/server/features/audit/auditHeartbeat", () => ({
  getAuditHeartbeat: workflow.heartbeat,
}));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

/** D1's own timestamp shape, `minutesAgo` before now. */
function stamp(minutesAgo: number) {
  return new Date(Date.now() - minutesAgo * 60_000)
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
}

function insertRunning(id: string, minutesAgo: number) {
  testDb.database
    .prepare(
      `INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config, workflow_instance_id, started_at)
       VALUES (?, 'p1', 'u1', 'https://example.com/', 'running', '{}', ?, ?)`,
    )
    .run(id, id, stamp(minutesAgo));
}

function statusOf(id: string) {
  return testDb.database
    .prepare("SELECT status, error_code FROM audits WHERE id = ?")
    .get(id);
}

beforeEach(() => {
  testDb.database.exec("DELETE FROM audits");
  workflow.status.mockResolvedValue({ status: "running" });
  workflow.heartbeat.mockResolvedValue(null);
});

describe("audit watchdog", () => {
  /** Run `body` with the clock `minutes` after this module booted. */
  async function afterBoot(minutes: number, body: () => Promise<void>) {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(Date.now() + minutes * 60_000);
    try {
      await body();
    } finally {
      vi.useRealTimers();
    }
  }

  it("fails an audit from before this boot only once it has been silent since", async () => {
    await afterBoot(46, async () => {
      insertRunning("zombie", 60);
      insertRunning("mine", 0);
      await reconcileStaleAudits();
    });

    expect(statusOf("zombie")).toMatchObject({
      status: "failed",
      error_code: "instance_lost",
    });
    expect(statusOf("mine")).toMatchObject({ status: "running" });
  });

  it("does not fail a pre-boot audit whose worker is still beating, or that is inside the window", async () => {
    // Only this module reloaded: the audit worker never stopped.
    await afterBoot(46, async () => {
      insertRunning("alive", 60);
      workflow.heartbeat.mockResolvedValue(Date.now() - 60_000);
      await reconcileStaleAudits();
    });
    expect(statusOf("alive")).toMatchObject({ status: "running" });

    await afterBoot(10, async () => {
      insertRunning("young", 60);
      workflow.heartbeat.mockResolvedValue(null);
      await reconcileStaleAudits();
    });
    expect(statusOf("young")).toMatchObject({ status: "running" });
  });

  it("leaves a long-running audit of this process alone while its instance runs", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(Date.now() + 40 * 60_000);
    try {
      insertRunning("slow", 20);
      await reconcileStaleAudits();
      await expect(
        reconcileRunningAudit({
          id: "slow",
          workflowInstanceId: "slow",
          startedAt: stamp(20),
          currentPhase: "crawl",
        }),
      ).resolves.toBeNull();
    } finally {
      vi.useRealTimers();
    }
    expect(statusOf("slow")).toMatchObject({ status: "running" });
  });

  it("does not let a late workflow finalize resurrect a failed audit", async () => {
    insertRunning("zombie", 2);
    await AuditRepository.failAudit("zombie", "zombie", {
      errorCode: "instance_lost",
      errorDetail: "x",
      failedPhase: null,
    });

    await AuditRepository.completeAudit("zombie", "zombie", {
      pagesCrawled: 3,
      pagesTotal: 3,
    });

    expect(statusOf("zombie")).toMatchObject({
      status: "failed",
      error_code: "instance_lost",
    });
  });
});
