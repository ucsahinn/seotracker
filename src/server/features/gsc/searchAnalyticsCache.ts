/**
 * A short-lived memory of Search Analytics answers, per worker isolate.
 *
 * The Search performance screen asks Google a dozen questions per view, and
 * most of them do not change when one filter does: switching the device keeps
 * the device ring's request, switching the period keeps the decay quarters'.
 * Asking again would cost quota and a second or two for an identical answer.
 *
 * Bounded twice -- by age and by the rows held -- because a paged query+page
 * table on a large property is tens of thousands of rows, and an isolate's
 * memory is not the place to keep a property's whole history.
 */

const TTL_MS = 10 * 60 * 1000;
const MAX_CACHED_ROWS = 400_000;

type Entry<T> = { value: T; rows: number; storedAt: number };

const entries = new Map<string, Entry<unknown>>();
let heldRows = 0;

function evict(key: string): void {
  const entry = entries.get(key);
  if (!entry) return;
  heldRows -= entry.rows;
  entries.delete(key);
}

/**
 * The cached answer for `key`, or `load()`'s, stored on the way out.
 * `fresh` skips the read (an explicit refresh) but still stores the result.
 */
export async function cachedSearchAnalytics<T>(
  key: string,
  rowsOf: (value: T) => number,
  load: () => Promise<T>,
  options: { fresh?: boolean; now?: () => number } = {},
): Promise<T> {
  const now = options.now ?? Date.now;
  const hit = entries.get(key);
  if (hit && !options.fresh && now() - hit.storedAt < TTL_MS) {
    // Re-insert so the Map's order is least-recently-used first.
    entries.delete(key);
    entries.set(key, hit);
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- one key, one request shape: the value stored under it came from the same `load` type
    return hit.value as T;
  }
  // A slow multi-page acquisition must not receive a brand-new ten-minute
  // lease when it finishes: the first rows are already that much older.
  const storedAt = now();
  const value = await load();
  const rows = rowsOf(value);
  evict(key);
  // A single answer larger than the whole budget is served, never held.
  if (rows > MAX_CACHED_ROWS || now() - storedAt >= TTL_MS) return value;
  while (heldRows + rows > MAX_CACHED_ROWS && entries.size > 0) {
    const oldest = entries.keys().next().value;
    if (oldest === undefined) break;
    evict(oldest);
  }
  entries.set(key, { value, rows, storedAt });
  heldRows += rows;
  return value;
}
