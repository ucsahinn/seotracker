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
  database
    .prepare(
      `INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config, current_phase, error_code, error_detail, failed_phase)
       VALUES (?, 'p1', 'u1', 'https://example.com/', 'failed', '{}', 'failed', 'unknown', ?, 'lighthouse')`,
    )
    .run(
      "failed-audit",
      "Request failed for https://private.example/path?token=abc with Bearer xyz; api_key=def at C:\\Users\\Alice\\app\\server.js",
    );
  database
    .prepare(
      `INSERT INTO audit_lighthouse_results (id, audit_id, page_id, strategy, error_message)
       VALUES (?, 'without-issues', 'page-1', 'mobile', ?), (?, 'without-issues', 'page-2', 'mobile', ?)`,
    )
    .run(
      "lh-1",
      "PageSpeed request failed for https://private.example/page?key=abc",
      "lh-2",
      "PageSpeed request failed for https://private.example/other?key=def",
    );
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

  it("includes the failed phase and a sanitized error detail", async () => {
    const row = (await listRecentAudits()).find(
      (audit) => audit.id === "failed-audit",
    );

    expect(row).toMatchObject({
      status: "failed",
      currentPhase: "failed",
      failedPhase: "lighthouse",
      errorCode: "unknown",
      errorDetail:
        "Request failed for [URL redacted] with Bearer [redacted]; api_key=[redacted] at [path redacted]",
    });
    expect(row?.errorDetail).not.toMatch(/private\.example|abc|xyz|def|Alice/);
  });

  it("summarizes Lighthouse errors without exposing page URLs", async () => {
    const row = (await listRecentAudits()).find(
      (audit) => audit.id === "without-issues",
    );

    expect(row?.lighthouseErrors).toEqual([
      { count: 2, errorMessage: "PageSpeed request failed for [URL redacted]" },
    ]);
    expect(JSON.stringify(row?.lighthouseErrors)).not.toMatch(
      /private\.example|key=abc|key=def/,
    );
  });
});
