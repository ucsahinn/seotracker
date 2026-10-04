import { describe, expect, it, vi } from "vitest";
import { AuditLighthouseRepository } from "./AuditLighthouseRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

const result = (errorMessage?: string, performanceScore = 0.9) => ({
  url: "https://example.com/",
  pageId: "pg1",
  strategy: "mobile" as const,
  performanceScore: errorMessage ? null : performanceScore,
  accessibilityScore: null,
  bestPracticesScore: null,
  seoScore: null,
  lcpMs: null,
  cls: null,
  inpMs: null,
  ttfbMs: null,
  errorMessage,
});

const stored = () =>
  testDb.database
    .prepare(
      "SELECT performance_score, error_message FROM audit_lighthouse_results WHERE audit_id = 'a1'",
    )
    .all();

describe("insertLighthouseResults", () => {
  it("never replaces a stored success with a failure, but upgrades an error", async () => {
    await AuditLighthouseRepository.insertLighthouseResults("a1", [result()]);
    await AuditLighthouseRepository.insertLighthouseResults("a1", [
      result("retry failed"),
    ]);
    expect(stored()).toEqual([{ performance_score: 0.9, error_message: null }]);

    testDb.database.exec("DELETE FROM audit_lighthouse_results");
    await AuditLighthouseRepository.insertLighthouseResults("a1", [
      result("first failure"),
    ]);
    await AuditLighthouseRepository.insertLighthouseResults("a1", [result()]);
    expect(stored()).toEqual([{ performance_score: 0.9, error_message: null }]);
  });
});
