/**
 * The ascending comparison for each rankings column.
 *
 * `useLocalSort` holds the state and applies the direction; this only says
 * how two rows compare, which keeps the two from getting out of step.
 */
import { compareText } from "@/client/components/table/useLocalSort";

export type SortKey =
  | "query"
  | "position"
  | "impressions"
  | "clicks"
  | "days"
  | "delta";

type TrackedRow = {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  days: number;
  delta: number | null;
};

export function compareTracked(
  a: TrackedRow,
  b: TrackedRow,
  key: SortKey,
): number {
  if (key === "query") return compareText(a.query, b.query);
  // A query with no previous reading sorts as no change.
  return (a[key] ?? 0) - (b[key] ?? 0);
}
