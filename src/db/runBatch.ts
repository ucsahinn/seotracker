import { d1Db } from "./d1/client";

// The executor handed to the `build` callback. Typed as the D1 client so call
// sites get full Drizzle inference; at runtime it is either `d1Db` or a Postgres
// transaction handle.
type BatchExecutor = typeof d1Db;
type BatchStatement = Parameters<typeof d1Db.batch>[0][number];

// D1 caps bound parameters at ~100 per statement; keep batches bounded so each
// runBatch call stays under that limit.
const DB_BATCH_SIZE = 100;

/**
 * Run a set of write statements atomically: they go out as one ordered
 * `db.batch([...])` call.
 *
 * Build the statements from the `tx` handle the callback receives rather than
 * the module-level `db`. Returning the unawaited Drizzle query builders is
 * enough; they are thenables.
 */
export async function runBatch(
  build: (tx: BatchExecutor) => readonly Promise<unknown>[],
): Promise<void> {
  const statements = build(d1Db);
  if (statements.length === 0) return;
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- d1 query builders are BatchItems; length checked above
  const batch = statements as unknown as [BatchStatement, ...BatchStatement[]];
  await d1Db.batch(batch);
}

/**
 * Chunk `items` into D1-safe batches and run each chunk atomically via
 * `runBatch`. Shared by repositories that bulk-insert/update (audit pages,
 * rank snapshots, etc.).
 */
export async function executeInBatches<T>(
  items: T[],
  buildStatement: (tx: BatchExecutor, item: T) => Promise<unknown>,
): Promise<void> {
  for (let i = 0; i < items.length; i += DB_BATCH_SIZE) {
    const chunk = items.slice(i, i + DB_BATCH_SIZE);
    if (chunk.length === 0) continue;
    await runBatch((tx) => chunk.map((item) => buildStatement(tx, item)));
  }
}
