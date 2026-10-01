import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { readdirSync, readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { sortBy } from "remeda";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { listRecentAudits } from "./collectDiagnostics";

const state = vi.hoisted(() => ({ database: null as DatabaseSync | null }));
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", async () => ({
  db: drizzle(
    async (query, params, method) => {
      if (!state.database) throw new Error("Database not initialized");
      const statement = state.database.prepare(query);
      const values = params.map((value: unknown): SQLInputValue => {
        if (
          value === null ||
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "bigint"
        )
          return value;
        throw new Error("Unexpected SQL parameter");
      });
      if (method === "run") {
        statement.run(...values);
        return { rows: [] };
      }
      return {
        rows: statement.all(...values).map((row) => Object.values(row)),
      };
    },
    { schema: await import("@/db/schema") },
  ),
}));

beforeAll(() => {
  const database = new DatabaseSync(":memory:");
  state.database = database;
  const files = sortBy(
    readdirSync("drizzle").filter((name) => name.endsWith(".sql")),
    (name) => name,
  );
  for (const file of files)
    database.exec(readFileSync(`drizzle/${file}`, "utf8"));
  database.exec("PRAGMA foreign_keys = OFF");
  const audit = database.prepare(
    `INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config)
     VALUES (?, 'p1', 'u1', 'https://example.com/', 'completed', '{}')`,
  );
  audit.run("with-issues");
  audit.run("without-issues");
  const issue = database.prepare(
    `INSERT INTO audit_issues (id, audit_id, page_url, issue_type, severity)
     VALUES (?, 'with-issues', 'https://example.com/', 'missing-title', 'warning')`,
  );
  issue.run("i1");
  issue.run("i2");
  issue.run("i3");
});

describe("listRecentAudits", () => {
  /*
   * The count used to be a correlated subquery whose `audits.id` lost its
   * table name, so every audit reported 0 findings in the support bundle.
   */
  it("counts each audit's own findings", async () => {
    const rows = await listRecentAudits();
    const count = (id: string) => rows.find((row) => row.id === id)?.issueCount;

    expect(count("with-issues")).toBe(3);
    expect(count("without-issues")).toBe(0);
  });
});
