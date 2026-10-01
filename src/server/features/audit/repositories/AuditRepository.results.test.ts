import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { readdirSync, readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { sortBy } from "remeda";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { AuditRepository } from "./AuditRepository";

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

const blob = (n: number) =>
  JSON.stringify(Array(n).fill({ src: "x".repeat(60), alt: "alt text" }));

const PAGES = 200;
const HEAVY = ["imagesJson", "headingOrderJson", "hreflangTagsJson"];

beforeAll(() => {
  const database = new DatabaseSync(":memory:");
  state.database = database;
  const files = sortBy(
    readdirSync("drizzle").filter((name) => name.endsWith(".sql")),
    (name) => name,
  );
  for (const file of files) {
    database.exec(readFileSync(`drizzle/${file}`, "utf8"));
  }
  database.exec("PRAGMA foreign_keys = OFF");
  database.exec(
    `INSERT INTO audits (id, project_id, started_by_user_id, start_url, status, config)
     VALUES ('a1', 'p1', 'u1', 'https://example.com/', 'completed', '{}')`,
  );
  const insert = database.prepare(
    `INSERT INTO audit_pages (id, audit_id, url, title, images_json, heading_order_json, hreflang_tags_json)
     VALUES (?, 'a1', ?, 'Title', ?, ?, ?)`,
  );
  for (let i = 0; i < PAGES; i++) {
    insert.run(
      `pg${i}`,
      `https://example.com/${i}`,
      blob(40),
      blob(15),
      blob(8),
    );
  }
});

describe("getAuditResultsForProject", () => {
  it("leaves the heavy JSON page columns out of the results payload", async () => {
    const { pages } = await AuditRepository.getAuditResultsForProject(
      "a1",
      "p1",
    );
    expect(pages).toHaveLength(PAGES);
    for (const field of HEAVY) expect(pages[0]).not.toHaveProperty(field);
    expect(pages[0]).toHaveProperty("imagesMissingAlt");

    const full =
      state.database?.prepare("SELECT * FROM audit_pages").all() ?? [];
    const ratio = JSON.stringify(pages).length / JSON.stringify(full).length;
    expect(ratio).toBeLessThan(0.1);
  });
});
