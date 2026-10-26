import { describe, expect, it, vi } from "vitest";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";
import { AuditSiteFactsRepository } from "./AuditSiteFactsRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

describe("saveSiteFacts", () => {
  // The row has about sixty columns; an upsert binding them twice failed on
  // D1's 100-variable cap and took every new audit down at the probe step.
  it("saves within D1's bound-parameter limit and replaces on retry", async () => {
    const facts = unknownFacts();
    await AuditSiteFactsRepository.saveSiteFacts("a1", facts);
    await AuditSiteFactsRepository.saveSiteFacts("a1", {
      ...facts,
      start: { ...facts.start, status: 200 },
    });

    const saved = await AuditSiteFactsRepository.getSiteFacts("a1");
    expect(saved?.start.status).toBe(200);
  });
});
