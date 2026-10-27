import { parseTimestamp } from "@/shared/format";
export function connectionEvidence(
  value: string | null | undefined,
  now = Date.now(),
): number | null {
  if (!value) return null;
  const stamp = parseTimestamp(value);
  return Number.isFinite(stamp) && stamp <= now ? stamp : null;
}
export function verificationState(
  value: string | null | undefined,
  startedAt: number,
  baseline: number | null,
  now = Date.now(),
): "waiting" | "verified" | "timeout" {
  const stamp = connectionEvidence(value, now);
  if (stamp !== null && stamp > startedAt && stamp > (baseline ?? -Infinity))
    return "verified";
  return now - startedAt >= 60_000 ? "timeout" : "waiting";
}
