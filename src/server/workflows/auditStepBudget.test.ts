import { describe, expect, it } from "vitest";
import { MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import {
  auditStepCount,
  lighthouseStepCount,
  WORKFLOW_DEFAULT_STEP_LIMIT,
  WORKFLOW_STEP_LIMIT,
} from "@/server/workflows/auditStepBudget";

describe("audit step budget", () => {
  it("counts a url step and a fetch step per wave of five pages", () => {
    expect(lighthouseStepCount(1)).toBe(2);
    expect(lighthouseStepCount(5)).toBe(2);
    expect(lighthouseStepCount(6)).toBe(4);
    expect(lighthouseStepCount(MAX_AUDIT_PAGES)).toBe(4_000);
  });

  it("keeps a MAX_AUDIT_PAGES audit under the default step limit", () => {
    expect(auditStepCount(MAX_AUDIT_PAGES, { speed: true })).toBeLessThan(
      WORKFLOW_DEFAULT_STEP_LIMIT,
    );
  });

  it("fits the worst-case speed steps of the default page limit", () => {
    // 2,000 waves x (1 url read + 3 passes + 1 fallback) = 10,000, before
    // crawl: past the platform default, which is why wrangler.audit.jsonc
    // raises `limits.steps`.
    expect(lighthouseStepCount(MAX_AUDIT_PAGES, true)).toBe(10_000);
  });

  it("stays under the limit in the pessimistic case too", () => {
    // Every crawl chunk cut to 25 pages by the soft deadline, every speed
    // wave failing into its fallback step.
    const worst = auditStepCount(MAX_AUDIT_PAGES, {
      speed: true,
      pagesPerCrawlChunk: 25,
    });
    expect(worst).toBeLessThan(WORKFLOW_STEP_LIMIT);
  });
});
