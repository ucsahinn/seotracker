import { readFileSync } from "node:fs";
import type { Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { recordGa4Quota } from "./ga4QuotaSnapshot";
import { getQuotaStatus } from "./QuotaService";
import { stateFromUsage } from "./quotaTypes";

// Real in-memory SQLite: the window and marker counts are SQL, and a mocked
// builder chain cannot see them.
const state = await vi.hoisted(async () => {
  const { createClient } = await import("@libsql/client");
  return { client: createClient({ url: "file::memory:" }) };
});
const client: Client = state.client;

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: drizzle(state.client) }));
vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedKeySource: vi.fn().mockResolvedValue(null),
}));

const NOW = new Date("2026-10-02T12:00:00.000Z");
const HOURS_AGO = (h: number) =>
  new Date(NOW.getTime() - h * 3_600_000).toISOString();

beforeAll(async () => {
  await client.executeMultiple(
    [
      `CREATE TABLE projects (id text PRIMARY KEY);`,
      `INSERT INTO projects (id) VALUES ('p1'), ('p2');`,
      ...readFileSync("drizzle/0050_gsc_url_inspections.sql", "utf8").split(
        "--> statement-breakpoint",
      ),
      `CREATE TABLE audits (id text PRIMARY KEY, project_id text NOT NULL,
        pages_crawled integer NOT NULL DEFAULT 0, started_at text NOT NULL);`,
      `CREATE TABLE audit_lighthouse_results (id text PRIMARY KEY,
        audit_id text NOT NULL, error_message text);`,
      `CREATE TABLE reports (id text PRIMARY KEY, project_id text NOT NULL,
        size_bytes integer NOT NULL);`,
      `CREATE TABLE report_templates (id text PRIMARY KEY, project_id text NOT NULL);`,
      // Two recent inspections and one outside the 24h window, plus another project's.
      `INSERT INTO gsc_url_inspections (project_id, url, checked_at) VALUES
        ('p1','https://a/1','${HOURS_AGO(1)}'),
        ('p1','https://a/2','${HOURS_AGO(23)}'),
        ('p1','https://a/3','${HOURS_AGO(30)}'),
        ('p2','https://b/1','${HOURS_AGO(1)}');`,
      // One audit started today (SQLite-default stamp shape), one two days ago.
      `INSERT INTO audits (id, project_id, pages_crawled, started_at) VALUES
        ('a-new','p1',120,'2026-10-02 08:00:00'),
        ('a-old','p1',9000,'2026-09-30 08:00:00');`,
      `INSERT INTO audit_lighthouse_results (id, audit_id, error_message) VALUES
        ('r1','a-new',NULL), ('r2','a-new',NULL),
        ('r3','a-new','Dakikalık sınır: 429'),
        ('r4','a-new','Kota doldu: günlük'),
        ('r5','a-old',NULL), ('r6','a-old',NULL), ('r7','a-old',NULL);`,
      `INSERT INTO reports (id, project_id, size_bytes) VALUES
        ('x1','p1',460000), ('x2','p1',1000);`,
      `INSERT INTO report_templates (id, project_id) VALUES ('t1','p1');`,
    ].join("\n"),
  );
});

afterAll(() => client.close());

const byId = async (kinds: Parameters<typeof getQuotaStatus>[0]["kinds"]) =>
  new Map(
    (await getQuotaStatus({ projectId: "p1", kinds, now: NOW })).items.map(
      (item) => [item.id, item],
    ),
  );

describe("getQuotaStatus", () => {
  it("counts only this project's inspections from the last 24 hours", async () => {
    const item = (await byId(["url_inspection"])).get("url_inspection");
    expect(item).toMatchObject({ used: 2, limit: 2000, state: "ok" });
  });

  it("counts PageSpeed checks of audits started today and names the stops", async () => {
    const item = (await byId(["pagespeed"])).get("pagespeed");
    expect(item).toMatchObject({
      used: 2,
      limit: null,
      state: "critical",
    });
    expect(item?.detail).toContain("Anahtar yok");
    expect(item?.detail).toContain("dakikalık sınıra takıldı");
  });

  it("reports report limits from stored rows", async () => {
    const items = await byId(["reports"]);
    expect(items.get("reports_count")?.used).toBe(2);
    expect(items.get("report_templates")?.used).toBe(1);
    expect(items.get("report_size")).toMatchObject({
      used: 460_000,
      state: "critical",
    });
  });

  it("shows GA4 as unknown until a report response was seen, then derives the limit", async () => {
    expect((await byId(["ga4"])).get("ga4_daily")?.state).toBe("unknown");
    recordGa4Quota(
      "p1",
      { tokensPerDay: { consumed: 150_000, remaining: 50_000 } },
      NOW,
    );
    const daily = (await byId(["ga4"])).get("ga4_daily");
    expect(daily).toMatchObject({
      used: 150_000,
      limit: 200_000,
      state: "warn",
      updatedAt: NOW.toISOString(),
    });
  });

  it("returns only the requested kinds", async () => {
    const items = await byId(["audit"]);
    expect([...items.keys()]).toEqual(["audit_pages"]);
    expect(items.get("audit_pages")?.used).toBe(120);
  });
});

describe("stateFromUsage", () => {
  it.each([
    [0, "ok"],
    [69, "ok"],
    [70, "warn"],
    [89, "warn"],
    [90, "critical"],
    [100, "critical"],
    [150, "critical"],
  ])("%i of 100 is %s", (used, expected) => {
    expect(stateFromUsage(used, 100)).toBe(expected);
  });

  it("is unknown without a real number on both sides", () => {
    expect(stateFromUsage(null, 100)).toBe("unknown");
    expect(stateFromUsage(5, null)).toBe("unknown");
    expect(stateFromUsage(5, 0)).toBe("unknown");
  });
});
