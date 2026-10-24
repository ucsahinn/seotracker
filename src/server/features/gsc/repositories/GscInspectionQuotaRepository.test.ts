import { expect, test, vi } from "vitest";
import { reserveInspection } from "./GscInspectionQuotaRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("@/db", () => ({ db: testDb.db }));

test("concurrent callers cannot spend the same final property quota slot", async () => {
  const now = new Date("2026-10-24T10:00:00Z");
  const site = "sc-domain:example.com";
  const insert = testDb.database.prepare(
    "INSERT INTO gsc_inspection_attempts (site_url, attempted_at) VALUES (?, ?)",
  );
  for (let i = 0; i < 1999; i++) insert.run(site, now.toISOString());
  const reservations = await Promise.all(
    Array.from({ length: 10 }, () => reserveInspection(site, now)),
  );
  expect(reservations.filter(Boolean)).toHaveLength(1);
  expect(await reserveInspection("sc-domain:other.com", now)).toBe(true);
});
