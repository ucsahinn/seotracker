import { describe, expect, it, vi } from "vitest";
import { AuditRepository } from "./AuditRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

describe("getAuditUsageForOrganization", () => {
  it("counts only running audits, so finished ones never block a new one", async () => {
    testDb.database.exec(`
      INSERT INTO projects (id, organization_id, name, domain) VALUES ('p1', 'o1', 'P', 'example.com');
      INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, pages_total, lighthouse_total)
      VALUES ('a1', 'p1', 'u', 'https://example.com/', 'completed', 10000, 20000),
             ('a2', 'p1', 'u', 'https://example.com/', 'failed', 10000, 20000),
             ('a3', 'p1', 'u', 'https://example.com/', 'running', 100, 200);
    `);

    expect(await AuditRepository.getAuditUsageForOrganization("o1")).toEqual({
      runningCount: 1,
      capacityUnits: 300,
    });
  });
});
