import type { Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { clearGa4Quota, recordGa4Quota } from "./ga4QuotaSnapshot";
import { getQuotaStatus } from "./QuotaService";
import { stateFromUsage } from "./quotaTypes";

// Real in-memory SQLite: the window and marker counts are SQL, and a mocked
// builder chain cannot see them.
const mocks = vi.hoisted(() => ({ getByProjectId: vi.fn() }));
const state = await vi.hoisted(async () => {
  const { createClient } = await import("@libsql/client");
  return { client: createClient({ url: "file::memory:" }) };
});
const client: Client = state.client;

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: mocks.getByProjectId },
}));
vi.mock("@/db", () => ({ db: drizzle(state.client) }));
vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedKeySource: vi.fn().mockResolvedValue(null),
}));

const owner = {
  projectId: "p1",
  propertyId: "properties/1",
  ga4AccountId: "acct",
  connectedByUserId: "u1",
};

const NOW = new Date("2026-10-02T12:00:00.000Z");
const HOURS_AGO = (h: number) =>
  new Date(NOW.getTime() - h * 3_600_000).toISOString();

beforeAll(async () => {
  await client.executeMultiple(
    [
      `CREATE TABLE projects (id text PRIMARY KEY);`,
      `INSERT INTO projects (id) VALUES ('p1'), ('p2');`,
      `CREATE TABLE gsc_connections (id text PRIMARY KEY, project_id text NOT NULL,
        organization_id text, site_url text NOT NULL, connected_by_user_id text,
        gsc_account_id text, connected_account_email text,
        created_at text, updated_at text);`,
      `CREATE TABLE gsc_inspection_attempts (id integer PRIMARY KEY AUTOINCREMENT,
        site_url text NOT NULL, attempted_at text NOT NULL);`,
      `CREATE TABLE audits (id text PRIMARY KEY, project_id text NOT NULL,
        pages_crawled integer NOT NULL DEFAULT 0, started_at text NOT NULL);`,
      `CREATE TABLE audit_lighthouse_results (id text PRIMARY KEY,
        audit_id text NOT NULL, error_message text);`,
      `CREATE TABLE reports (id text PRIMARY KEY, project_id text NOT NULL,
        size_bytes integer NOT NULL);`,
      `CREATE TABLE report_templates (id text PRIMARY KEY, project_id text NOT NULL);`,
      // The ledger is keyed by property: two attempts inside 24h and one
      // outside for p1's site, plus another site's.
      `INSERT INTO gsc_connections (id, project_id, site_url) VALUES
        ('c1','p1','sc-domain:a.test'), ('c2','p2','sc-domain:b.test');`,
      `INSERT INTO gsc_inspection_attempts (site_url, attempted_at) VALUES
        ('sc-domain:a.test','${HOURS_AGO(1)}'),
        ('sc-domain:a.test','${HOURS_AGO(23)}'),
        ('sc-domain:a.test','${HOURS_AGO(30)}'),
        ('sc-domain:b.test','${HOURS_AGO(1)}');`,
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

beforeEach(() => {
  mocks.getByProjectId.mockResolvedValue(owner);
});

afterAll(() => client.close());

const byId = async (kinds: Parameters<typeof getQuotaStatus>[0]["kinds"]) =>
  new Map(
    (await getQuotaStatus({ projectId: "p1", kinds, now: NOW })).items.map(
      (item) => [item.id, item],
    ),
  );

describe("getQuotaStatus", () => {
  it("counts only this property's inspection attempts from the last 24 hours", async () => {
    const item = (await byId(["url_inspection"])).get("url_inspection");
    expect(item).toMatchObject({ used: 2, limit: 2000, state: "ok" });
  });

  it("counts PageSpeed checks of audits started in the last 24 hours and says so", async () => {
    const item = (await byId(["pagespeed"])).get("pagespeed");
    expect(item).toMatchObject({
      used: 2,
      limit: null,
      state: "critical",
    });
    expect(item?.detail).toContain("Anahtar yok");
    expect(item?.detail).toContain("dakikalık sınıra takıldı");
    expect(item?.detail).toContain("başlayan denetimlere");
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

  it("shows GA4 as unknown until a report response was seen", async () => {
    const daily = (await byId(["ga4"])).get("ga4_daily");
    expect(daily?.state).toBe("unknown");
    expect(daily?.detail).toContain("yeniden başladığından");
  });

  it("derives GA4 usage from remaining against the documented standard ceiling, not from the last request's cost", async () => {
    recordGa4Quota(
      owner,
      {
        tokensPerDay: { consumed: 231, remaining: 199_769 },
        tokensPerHour: { consumed: 231, remaining: 39_796 },
      },
      NOW,
    );
    const items = await byId(["ga4"]);
    expect(items.get("ga4_daily")).toMatchObject({
      used: 231,
      limit: 200_000,
      state: "ok",
      updatedAt: NOW.toISOString(),
    });
    expect(items.get("ga4_hourly")).toMatchObject({
      used: 204,
      limit: 40_000,
    });
  });

  it("shows only what is left, with no bar or state, when remaining exceeds the standard ceiling (360)", async () => {
    recordGa4Quota(
      owner,
      { tokensPerDay: { consumed: 500, remaining: 1_900_000 } },
      NOW,
    );
    expect((await byId(["ga4"])).get("ga4_daily")).toMatchObject({
      used: null,
      limit: null,
      remaining: 1_900_000,
      state: "unknown",
    });
  });

  it("ignores GA4 readings from another property and after the connection is cleared", async () => {
    recordGa4Quota(
      owner,
      { tokensPerDay: { consumed: 1, remaining: 100 } },
      NOW,
    );
    mocks.getByProjectId.mockResolvedValue({
      ...owner,
      propertyId: "properties/2",
    });
    expect((await byId(["ga4"])).get("ga4_daily")?.state).toBe("unknown");

    mocks.getByProjectId.mockResolvedValue(owner);
    expect((await byId(["ga4"])).get("ga4_daily")?.used).not.toBeNull();
    clearGa4Quota("p1");
    expect((await byId(["ga4"])).get("ga4_daily")?.state).toBe("unknown");
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
