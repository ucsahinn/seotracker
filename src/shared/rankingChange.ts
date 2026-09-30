/**
 * Position change between two equal-length windows, per query.
 *
 * Lower position is better, so the signed `delta` is previous minus current:
 * positive means the query moved up. A query only gets a delta when both
 * windows have rows for it; "no previous data" is not "no change".
 */

/** Smaller than this many positions is noise in an impression-weighted mean. */
const STABLE_THRESHOLD = 0.5;

type Direction = "up" | "down" | "flat";

type PositionPoint = { query: string; position: number | null };

export function directionOf(delta: number): Direction {
  if (delta >= STABLE_THRESHOLD) return "up";
  if (delta <= -STABLE_THRESHOLD) return "down";
  return "flat";
}

/**
 * Adds `previousPosition` and `delta` (both null when the query has no usable
 * reading in the preceding window) to each current row, keeping row order.
 */
export function attachChange<Row extends PositionPoint>(
  current: Row[],
  previous: PositionPoint[],
): Array<Row & { previousPosition: number | null; delta: number | null }> {
  const before = new Map<string, number>();
  for (const row of previous) {
    if (row.position !== null && Number.isFinite(row.position)) {
      before.set(row.query, row.position);
    }
  }
  return current.map((row) => {
    const previousPosition = before.get(row.query) ?? null;
    const { position } = row;
    return {
      ...row,
      previousPosition,
      delta:
        previousPosition !== null && position !== null
          ? previousPosition - position
          : null,
    };
  });
}

/** The window of the same length that ends the day before `since`. */
export function previousWindow(
  since: string,
  days: number,
): { since: string; until: string } {
  const start = new Date(`${since}T00:00:00Z`);
  const until = new Date(start);
  until.setUTCDate(until.getUTCDate() - 1);
  start.setUTCDate(start.getUTCDate() - days);
  return {
    since: start.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}
