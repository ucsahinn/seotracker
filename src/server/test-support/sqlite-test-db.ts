import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { readdirSync, readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { sortBy } from "remeda";

/**
 * A real in-memory SQLite with every migration applied, behind a drizzle
 * handle shaped like `@/db`. Repositories are tested against actual SQL
 * evaluation instead of mocked builder chains.
 *
 * Call it from `vi.hoisted` and feed the parts to `vi.mock`:
 *
 *   const testDb = await vi.hoisted(async () =>
 *     (await import("@/server/test-support/sqlite-test-db")).createTestDb());
 *   vi.mock("@/db", () => ({ db: testDb.db }));
 *   vi.mock("@/db/runBatch", () => testDb.runBatchModule);
 */
export async function createTestDb() {
  const database = new DatabaseSync(":memory:");
  const files = sortBy(
    readdirSync("drizzle").filter((name) => name.endsWith(".sql")),
    (name) => name,
  );
  for (const file of files) {
    database.exec(readFileSync(`drizzle/${file}`, "utf8"));
  }
  // Fixtures insert only the rows a test asserts on, not their parents.
  database.exec("PRAGMA foreign_keys = OFF");

  const db = drizzle(
    async (query, params, method) => {
      const statement = database.prepare(query);
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
      // Arrays, not objects: a join repeats column names (`id`, `project_id`)
      // and an object per row would keep only the last of each.
      statement.setReturnArrays(true);
      return { rows: statement.all(...values) };
    },
    { schema: await import("@/db/schema") },
  );

  // Same contract as the real module (statements run in order); atomicity is
  // not what these tests look at.
  const runBatchModule = {
    runBatch: async (build: (tx: typeof db) => readonly Promise<unknown>[]) => {
      for (const statement of build(db)) await statement;
    },
    executeInBatches: async <T>(
      items: T[],
      build: (tx: typeof db, item: T) => Promise<unknown>,
    ) => {
      for (const item of items) await build(db, item);
    },
  };

  return { database, db, runBatchModule };
}
