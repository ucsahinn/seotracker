import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { listReportInventory } from "./ReportInventoryRepository";
import { reportInventorySchema } from "@/shared/reportInventory";

const state = vi.hoisted<{ db: ReturnType<typeof drizzle> | null }>(() => ({
  db: null,
}));
vi.mock("@/db", () => ({
  get db() {
    if (!state.db) throw new Error("Test database not initialized");
    return state.db;
  },
}));
const client = createClient({ url: "file::memory:" });
state.db = drizzle(client);
const input = (overrides: Record<string, unknown> = {}) =>
  reportInventorySchema.parse({ projectId: "p", ...overrides });

beforeAll(async () => {
  await client.executeMultiple(`CREATE TABLE reports (id TEXT PRIMARY KEY, project_id TEXT, title TEXT, summary TEXT, html TEXT, skill TEXT, template_id TEXT, created_by TEXT, created_by_user_id TEXT, size_bytes INTEGER, created_at TEXT, updated_at TEXT, native_kind TEXT, native_identity TEXT);
  CREATE TABLE report_templates (id TEXT PRIMARY KEY, project_id TEXT, name TEXT);`);
  await client.batch(
    Array.from({ length: 1001 }, (_, index) => ({
      sql: "INSERT INTO reports (id, project_id, title, summary, html, skill, template_id, created_by, created_by_user_id, size_bytes, created_at, updated_at) VALUES (?, 'p', ?, ?, '<html></html>', NULL, NULL, 'app:site-audit', 'u', 13, '2025-01-01', ?)",
      args: [
        String(index).padStart(4, "0"),
        index === 0 ? "İstanbul %_" : "Report " + index,
        "summary",
        index === 0 ? "2099-01-01" : "2026-01-01",
      ],
    })),
    "write",
  );
  await client.execute(
    "INSERT INTO reports (id, project_id, title, summary, html, skill, template_id, created_by, created_by_user_id, size_bytes, created_at, updated_at) SELECT 'other', 'other-project', title, summary, html, skill, template_id, created_by, created_by_user_id, size_bytes, created_at, updated_at FROM reports LIMIT 1",
  );
  await client.batch(
    Array.from({ length: 7 }, (_, index) => ({
      sql: "INSERT INTO reports (id, project_id, title, summary, html, skill, template_id, created_by, created_by_user_id, size_bytes, created_at, updated_at) VALUES (?, 'facets', ?, '', '<html></html>', ?, NULL, 'Codex', 'u', 13, '2026-01-01', '2026-01-01')",
      args: ["facet-" + index, "Facet " + index, "skill-" + index],
    })),
    "write",
  );
});
afterAll(() => client.close());

describe("report inventory on real SQLite", () => {
  it("reaches the thousandth file without reading HTML and raises an old edited file", async () => {
    const first = await listReportInventory(input());
    const last = await listReportInventory(input({ page: 41 }));
    expect(first.totalProject).toBe(1001);
    expect(first.reports).toHaveLength(25);
    expect(first.reports[0]?.id).toBe("0000");
    expect(first.reports[0]).not.toHaveProperty("html");
    expect(last.reports).toHaveLength(1);
    expect(last.pageCount).toBe(41);
    expect(last.reports[0]?.projectId).toBe("p");
  });
  it("searches beyond page one with literal percent and Turkish I, with scoped facet counts", async () => {
    const result = await listReportInventory(
      input({ query: "İSTANBUL %_", kind: "app-kind-unknown" }),
    );
    expect(result.totalMatching).toBe(1);
    expect(result.reports[0]?.id).toBe("0000");
    expect(result.facets).toEqual([
      { key: "app-kind-unknown", name: null, value: 1 },
    ]);
  });
  it("keeps a stale kind filter empty and clamps a page after deletions", async () => {
    const result = await listReportInventory(
      input({ kind: "deleted-template", page: 9999 }),
    );
    expect(result.totalMatching).toBe(0);
    expect(result.page).toBe(1);
    expect(result.reports).toEqual([]);
  });
});

it("keeps the compact Other facet actionable without returning every distinct kind", async () => {
  const result = await listReportInventory(
    input({ projectId: "facets", kind: "__other" }),
  );
  expect(result.facets).toHaveLength(6);
  expect(result.facets.at(-1)).toEqual({
    key: "__other",
    name: null,
    value: 2,
  });
  expect(result.totalMatching).toBe(2);
  expect(result.reports.map((row) => row.skill)).toEqual([
    "skill-6",
    "skill-5",
  ]);
});

// Before the native-kind contract this query classified both rows as unknown.
it("filters persisted native kinds independently of a shared app creator", async () => {
  await client.execute(
    "INSERT INTO reports (id, project_id, title, summary, created_by, native_kind, native_identity) VALUES ('native-search', 'native', 'Search', '', 'seotracker', 'search-performance-export', 's1'), ('native-audit', 'native', 'Audit', '', 'seotracker', 'site-audit-export', 'a1')",
  );
  const result = await listReportInventory(
    input({ projectId: "native", kind: "search-performance-export" }),
  );
  expect(result.totalMatching).toBe(1);
  expect(result.reports[0]?.id).toBe("native-search");
  expect(result.reports[0]?.nativeIdentity).toBe("s1");
});
