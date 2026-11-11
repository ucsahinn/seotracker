/**
 * The Durable Object class itself, run over node:sqlite: `cloudflare:workers`
 * is replaced by a bare DurableObject base so the real recordBatch and
 * runFinalizeChecks code executes against a real SQLite engine.
 */
import { DatabaseSync } from "node:sqlite";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({
  env: {},
  DurableObject: class {
    ctx: unknown;
    constructor(ctx: unknown) {
      this.ctx = ctx;
    }
  },
}));

import { AuditScratchpad } from "@/server/features/audit/AuditScratchpad";

let db: DatabaseSync;
let scratchpad: AuditScratchpad;

beforeEach(() => {
  db = new DatabaseSync(":memory:");
  const ctx = {
    storage: {
      sql: {
        databaseSize: 0,
        exec(query: string, ...params: never[]) {
          if (/^\s*(SELECT|WITH)/i.test(query)) {
            const rows = db.prepare(query).all(...params);
            return { toArray: () => rows, one: () => rows[0] };
          }
          // The schema is several statements with no parameters.
          if (params.length === 0) db.exec(query);
          else db.prepare(query).run(...params);
          return { toArray: () => [], one: () => undefined };
        },
      },
      getAlarm: async () => 1,
    },
    blockConcurrencyWhile: async (fn: () => Promise<void>) => fn(),
  };
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- a minimal stand-in for DurableObjectState
  scratchpad = new AuditScratchpad(ctx as never, {} as never);
});

const frontierCount = () =>
  db.prepare("SELECT COUNT(*) AS n FROM frontier").get()?.n;
const batch = (discovered: Array<{ url: string; depth: number | null }>) => ({
  crawledUrls: [],
  pages: [],
  links: [],
  maxPages: 50,
  discovered,
});

describe("recordBatch frontier bound", () => {
  // A faceted or calendar trap can list endless URLs while only maxPages are
  // ever crawled; the frontier must not grow without bound.
  it("stops adding new URLs once the frontier is full but still lowers known depths", async () => {
    db.exec(`WITH RECURSIVE n(i) AS (SELECT 0 UNION ALL SELECT i + 1 FROM n WHERE i < 99999)
      INSERT INTO frontier (url, depth, source, in_sitemap)
      SELECT 'https://site.test/f' || i, 5, 'link', 0 FROM n`);
    await scratchpad.recordBatch(
      batch([
        { url: "https://site.test/f0", depth: 2 },
        { url: "https://site.test/trap", depth: 3 },
      ]),
    );

    expect(frontierCount()).toBe(100_000);
    expect(
      db
        .prepare(
          "SELECT depth FROM frontier WHERE url = 'https://site.test/f0'",
        )
        .get()?.depth,
    ).toBe(2);
  });
});

describe("runFinalizeChecks link finding cap", () => {
  it("logs when broken-link findings are cut at the cap", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const targets = Array.from(
      { length: 2_001 },
      (_, i) => `https://site.test/gone${i}`,
    );
    for (const target of targets) {
      db.prepare(
        `INSERT INTO page_mirror (page_id, url, status_code, fetch_class, redirect_url)
         VALUES (?, ?, 404, 'ok', NULL)`,
      ).run(target, target);
    }
    db.prepare(
      `INSERT INTO page_links (page_id, url, targets_json) VALUES ('src', 'https://site.test/', ?)`,
    ).run(JSON.stringify(targets));

    const result = await scratchpad.runFinalizeChecks({
      startUrl: "https://site.test/",
      crawlCompleted: true,
    });

    expect(result.brokenLinks).toHaveLength(2_000);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("broken-link"));
  });
});
