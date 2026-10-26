import { describe, expect, it, vi } from "vitest";
import { auditIssues } from "@/db/schema";
import { getTopAffectedPagesForAudit } from "./auditSummaryQueries";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

describe("getTopAffectedPagesForAudit", () => {
  it("leaves site-level findings off the start URL", async () => {
    const home = "https://example.com/";
    await testDb.db.insert(auditIssues).values([
      {
        id: "1",
        auditId: "a1",
        pageId: null,
        pageUrl: home,
        issueType: "missing-hsts",
        severity: "warning",
      },
      {
        id: "2",
        auditId: "a1",
        pageId: null,
        pageUrl: home,
        issueType: "missing-spf",
        severity: "critical",
      },
      {
        id: "3",
        auditId: "a1",
        pageId: "p1",
        pageUrl: home,
        issueType: "missing-h1",
        severity: "warning",
      },
      {
        id: "4",
        auditId: "a1",
        pageId: "p2",
        pageUrl: "https://example.com/b",
        issueType: "missing-title",
        severity: "critical",
      },
    ]);

    const pages = await getTopAffectedPagesForAudit("a1", 10);

    expect(pages).toEqual([
      { pageUrl: "https://example.com/b", issueCount: 1, worstRank: 0 },
      { pageUrl: home, issueCount: 1, worstRank: 1 },
    ]);
  });
});
