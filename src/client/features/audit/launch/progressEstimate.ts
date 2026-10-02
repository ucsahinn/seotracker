import { parseTimestamp } from "@/shared/format";

/**
 * Roughly how long a running audit has left, or null while it would be a
 * guess. `startedAt` is SQLite's zone-less UTC timestamp, so it goes through
 * `parseTimestamp`; `new Date(value)` read it as local time and, in a zone
 * ahead of UTC, made a fresh audit look hours old.
 *
 * Gated on 5%: before that the rate is one or two pages of noise.
 */
export function estimateRemainingMs({
  startedAt,
  progress,
  hasTotal,
  now = Date.now(),
}: {
  startedAt: string;
  progress: number;
  hasTotal: boolean;
  now?: number;
}): number | null {
  const elapsedMs = now - parseTimestamp(startedAt);
  if (!hasTotal || !(progress > 0.05) || !(elapsedMs > 0)) return null;
  return (elapsedMs * (1 - progress)) / progress;
}
