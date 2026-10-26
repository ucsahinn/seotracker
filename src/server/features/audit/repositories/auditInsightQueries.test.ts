import { describe, expect, it, vi } from "vitest";
import { auditPages } from "@/db/schema";
import { getStartPageDetails } from "./auditInsightQueries";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

describe("getStartPageDetails", () => {
  // SQLite sorts NULL first, so an orphan sitemap page (no depth) used to
  // stand in for the home page.
  it("picks the depth-0 page over a sitemap-only page with no depth", async () => {
    await testDb.db.insert(auditPages).values([
      {
        id: "orphan",
        auditId: "a1",
        url: "https://example.com/aaa-orphan",
        statusCode: 200,
        crawlDepth: null,
      },
      {
        id: "home",
        auditId: "a1",
        url: "https://example.com/home",
        statusCode: 200,
        crawlDepth: 0,
      },
    ]);

    const page = await getStartPageDetails("a1", "https://example.com/start");

    expect(page?.id).toBe("home");
  });

  it("follows the start address's redirect to the page it landed on", async () => {
    await testDb.db.insert(auditPages).values([
      {
        id: "start",
        auditId: "a2",
        url: "https://example.com/",
        statusCode: 301,
        redirectUrl: "https://example.com/tr/",
        crawlDepth: 0,
      },
      {
        id: "shallow",
        auditId: "a2",
        url: "https://example.com/about",
        statusCode: 200,
        crawlDepth: 1,
      },
      {
        id: "landing",
        auditId: "a2",
        url: "https://example.com/tr/",
        statusCode: 200,
        crawlDepth: 1,
      },
    ]);

    const page = await getStartPageDetails("a2", "https://example.com/");

    expect(page?.id).toBe("landing");
  });
});
