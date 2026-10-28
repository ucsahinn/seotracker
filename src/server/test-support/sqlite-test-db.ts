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
const D1_MAX_BOUND_PARAMETERS = 100;

export async function createTestDb(
  options: {
    atomicBatches?: boolean;
    beforeQuery?: (query: string) => void | Promise<void>;
  } = {},
) {
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
      if (options.beforeQuery) await options.beforeQuery(query);
      // D1 rejects a statement with more than 100 bound values ("too many SQL
      // variables"); plain SQLite allows far more, so enforce it here.
      if (params.length > D1_MAX_BOUND_PARAMETERS)
        throw new Error(
          `D1 allows ${D1_MAX_BOUND_PARAMETERS} bound parameters, this statement has ${params.length}`,
        );
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
      if (method === "get") {
        // sqlite-proxy expects one positional row (or undefined), not an array
        // of rows. Its callback type incorrectly excludes undefined for no match.
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Node types do not reflect setReturnArrays; preserve the proxy's runtime get contract
        return { rows: statement.get(...values) as unknown as unknown[] };
      }
      return { rows: statement.all(...values) };
    },
    { schema: await import("@/db/schema") },
  );

  // Atomic batches are opt-in for tests that exercise concurrent mutations.
  let batchTail = Promise.resolve();
  async function batch(statements: readonly Promise<unknown>[]) {
    const results: unknown[] = [];
    if (!options.atomicBatches) {
      for (const statement of statements) results.push(await statement);
      return results;
    }
    const previous = batchTail;
    let release!: () => void;
    batchTail = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    database.exec("BEGIN");
    try {
      for (const statement of statements) results.push(await statement);
      database.exec("COMMIT");
      return results;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    } finally {
      release();
    }
  }
  const runBatchModule = {
    runBatch: async (build: (tx: typeof db) => readonly Promise<unknown>[]) => {
      await batch(build(db));
    },
    executeInBatches: async <T>(
      items: T[],
      build: (tx: typeof db, item: T) => Promise<unknown>,
    ) => {
      for (const item of items) await build(db, item);
    },
  };

  return { database, db, batch, runBatchModule };
}
