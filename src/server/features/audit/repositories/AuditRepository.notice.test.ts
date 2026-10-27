import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuditRepository } from "./AuditRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

function insertAudit(id: string, status: string, errorCode: string | null) {
  testDb.database
    .prepare(
      `INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config, workflow_instance_id, error_code, error_detail, failed_phase)
       VALUES (?, 'p1', 'u1', 'https://example.com/', ?, '{}', ?, ?, ?, ?)`,
    )
    .run(
      id,
      status,
      id,
      errorCode,
      errorCode && "detail",
      errorCode && "lighthouse",
    );
}

function row(id: string) {
  return testDb.database
    .prepare(
      "SELECT status, error_code, failed_phase, notice_code, urls_discovered FROM audits WHERE id = ?",
    )
    .get(id);
}

beforeEach(() => {
  testDb.database.exec("DELETE FROM audits");
});

describe("audit notices and the found-URL count", () => {
  it("keeps a worked-around fault out of the failure columns of a completed audit", async () => {
    insertAudit("a1", "running", null);

    await AuditRepository.recordAuditNotice("a1", "a1", {
      noticeCode: "missing_secret",
      noticeDetail: "MissingInstanceKeyError",
    });
    await AuditRepository.updateAuditProgress("a1", "a1", {
      urlsDiscovered: 640,
    });
    await AuditRepository.completeAudit("a1", "a1", {
      pagesCrawled: 100,
      pagesTotal: 100,
    });

    expect(row("a1")).toEqual({
      status: "completed",
      error_code: null,
      failed_phase: null,
      notice_code: "missing_secret",
      urls_discovered: 640,
    });
  });

  it("moves notices stored in the failure columns, and only those (0070 backfill)", () => {
    insertAudit("notice", "completed", "missing_secret");
    insertAudit("failure", "failed", "missing_secret");
    const backfill = readFileSync(
      "drizzle/0070_audit_discovered_and_notice.sql",
      "utf8",
    )
      .split("--> statement-breakpoint")
      .at(-1);
    testDb.database.exec(backfill ?? "");

    expect(row("notice")).toMatchObject({
      error_code: null,
      failed_phase: null,
      notice_code: "missing_secret",
    });
    expect(row("failure")).toMatchObject({
      error_code: "missing_secret",
      notice_code: null,
    });
  });
});
