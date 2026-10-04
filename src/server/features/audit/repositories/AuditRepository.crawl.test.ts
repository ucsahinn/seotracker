import { beforeEach, describe, expect, it, vi } from "vitest";
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

const deepPageIssue = (page: {
  id: string;
  url: string;
  crawlDepth: number | null;
}) => ({
  issueType: "deep-page" as const,
  pageId: page.id,
  pageUrl: page.url,
  details: { crawlDepth: page.crawlDepth },
});

describe("backfillCrawlDepths", () => {
  beforeEach(() => {
    testDb.database.exec("DELETE FROM audit_issues; DELETE FROM audit_pages");
  });

  async function seed() {
    const pages = [
      makeCrawledPage({
        id: "dp1",
        url: "https://example.com/a",
        crawlDepth: null,
      }),
      makeCrawledPage({
        id: "dp2",
        url: "https://example.com/b",
        crawlDepth: 7,
      }),
    ];
    await AuditRepository.insertCrawledBatch("d1", pages, [
      deepPageIssue(pages[1]),
    ]);
  }
  const deepPageIds = () =>
    testDb.database
      .prepare(
        "SELECT page_id FROM audit_issues WHERE audit_id = 'd1' AND issue_type = 'deep-page'",
      )
      .all()
      .map((row) => row.page_id);

  it("lowers depths and rebuilds deep-page findings when the graph was exact", async () => {
    await seed();
    await AuditRepository.backfillCrawlDepths("d1", [
      { url: "https://example.com/a", depth: 6, exact: true },
      { url: "https://example.com/b", depth: 2, exact: true },
    ]);
    expect(deepPageIds()).toEqual(["dp1"]);
  });

  it("only removes disproved deep-page findings when the graph was incomplete", async () => {
    await seed();
    await AuditRepository.backfillCrawlDepths("d1", [
      { url: "https://example.com/a", depth: 6, exact: false },
      { url: "https://example.com/b", depth: 2, exact: false },
    ]);

    // pg1's depth of 6 is only an upper bound, so it earns no new finding.
    expect(deepPageIds()).toEqual([]);
  });
});
