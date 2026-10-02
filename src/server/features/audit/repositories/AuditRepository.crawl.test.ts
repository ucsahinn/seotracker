import { describe, expect, it, vi } from "vitest";
import { makeCrawledPage } from "@/server/test-support/crawled-page";
import { AuditRepository } from "./AuditRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

describe("insertCrawledBatch", () => {
  it("replaces a page's issues when the chunk is retried", async () => {
    const page = makeCrawledPage({ id: "pg1", url: "https://example.com/a" });
    const issue = (
      issueType: "missing-title" | "missing-meta-description",
    ) => ({
      issueType,
      pageId: "pg1",
      pageUrl: page.url,
    });

    await AuditRepository.insertCrawledBatch(
      "a1",
      [page],
      [issue("missing-title")],
    );
    await AuditRepository.insertCrawledBatch(
      "a1",
      [page],
      [issue("missing-meta-description")],
    );

    const rows = testDb.database
      .prepare("SELECT issue_type FROM audit_issues WHERE audit_id = 'a1'")
      .all();
    expect(rows).toEqual([{ issue_type: "missing-meta-description" }]);
  });
});
