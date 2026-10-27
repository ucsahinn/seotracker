import { GscService } from "@/server/features/gsc/services/GscService";
import { describe, expect, it, vi } from "vitest";
import { auditIssues, audits } from "@/db/schema";
import type * as AuditRepositoryModule from "@/server/features/audit/repositories/AuditRepository";
import { AuditSiteFactsRepository } from "@/server/features/audit/repositories/AuditSiteFactsRepository";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";
import { getAuditInsights } from "./auditInsights";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);
// Search Console and the payload store are not connected in this test.
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: {
    getPerformance: vi.fn(async () => Promise.reject(new Error())),
  },
}));
vi.mock("@/server/features/gsc/services/GscIndexCoverageService", () => ({
  getIndexCoverage: vi.fn(async () => Promise.reject(new Error())),
}));
vi.mock("@/server/lib/r2", () => ({ getJsonFromR2: vi.fn() }));
// findFirst goes through drizzle's `get`, which the test database does not
// shape; the audit row itself is not what this test is about.
vi.mock(
  "@/server/features/audit/repositories/AuditRepository",
  async (importOriginal) => {
    const actual = await importOriginal<typeof AuditRepositoryModule>();
    return {
      AuditRepository: {
        ...actual.AuditRepository,
        getAuditForProject: vi.fn(async (auditId: string) =>
          (await actual.AuditRepository.getAuditsByProject("p1")).find(
            (row) => row.id === auditId,
          ),
        ),
      },
    };
  },
);

const audit = (id: string, startedAt: string) => ({
  id,
  projectId: "p1",
  startedByUserId: "u1",
  startUrl: "https://example.com/",
  status: "completed" as const,
  pagesCrawled: 4,
  startedAt,
});

const issue = (auditId: string, issueType: string, pageId: string) => ({
  id: `${auditId}-${issueType}-${pageId}`,
  auditId,
  pageId,
  pageUrl: `https://example.com/${pageId}`,
  issueType,
  severity: "warning" as const,
});

describe("getAuditInsights changes", () => {
  /*
   * The older audit predates the site facts, so it never ran
   * twitter-card-missing: failing it now is not a new problem, and the
   * score history must not count it against the newer audit alone.
   */
  it("compares only the checks both audits measured", async () => {
    await testDb.db
      .insert(audits)
      .values([
        audit("old", "2026-10-01T00:00:00.000Z"),
        audit("new", "2026-10-20T00:00:00.000Z"),
      ]);
    await AuditSiteFactsRepository.saveSiteFacts("new", unknownFacts());
    await testDb.db
      .insert(auditIssues)
      .values([
        issue("old", "missing-title", "a"),
        issue("new", "missing-h1", "a"),
        issue("new", "twitter-card-missing", "a"),
      ]);

    const insights = await getAuditInsights({
      projectId: "p1",
      auditId: "new",
    });

    expect(insights.changes).toMatchObject({
      added: [{ issueType: "missing-h1" }],
      fixed: [{ issueType: "missing-title" }],
      partial: true,
    });
    // Both points scored on the checks they share: one warning on one page.
    const [before, after] = insights.history;
    expect(after.score).toBe(before.score);
    expect(after.partial).toBe(true);
    expect(before.partial).toBe(false);
  });
});

it("retains the actual traffic property, dates and source cap (previously enrichment discarded them)", async () => {
  await testDb.db
    .insert(audits)
    .values(audit("traffic", "2026-10-22T00:00:00Z"));
  vi.mocked(GscService.getPerformance).mockResolvedValueOnce({
    siteUrl: "sc-domain:example.com",
    connectedBy: null,
    request: { startDate: "2026-09-23", endDate: "2026-10-20" },
    rows: Array.from({ length: 1000 }, (_, index) => ({
      keys: ["https://example.com/p" + index],
      clicks: 1,
      impressions: 5,
      ctr: 0.2,
      position: 3,
    })),
  });
  const insights = await getAuditInsights({
    projectId: "p1",
    auditId: "traffic",
  });
  expect(insights.traffic).toMatchObject({
    startDate: "2026-09-23",
    endDate: "2026-10-20",
    source: {
      property: "sc-domain:example.com",
      fetchedRows: 1000,
      rowLimit: 1000,
      capped: true,
      timeZone: "America/Los_Angeles",
    },
  });
  expect(insights.traffic?.source?.retrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  expect(insights.traffic?.rows).toHaveLength(1000);
});
