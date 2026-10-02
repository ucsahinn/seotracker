/**
 * The last GA4 `propertyQuota` a report response carried, per project.
 *
 * Google returns it with every runReport at no extra cost, so this never asks
 * for it: whoever runs a GA4 report calls `recordGa4Quota` with the response.
 * Held in process memory on purpose: a snapshot is a hint with a timestamp,
 * and a restart simply shows "unknown" until the next report runs.
 */

/**
 * Google's `QuotaStatus`: `consumed` is only the cost of the LAST request, and
 * `remaining` is what is left in the window. The ceiling is not returned.
 */
type QuotaPair = { consumed: number; remaining: number };

type Ga4QuotaInput = {
  tokensPerDay?: QuotaPair;
  tokensPerHour?: QuotaPair;
} | null;

export type Ga4QuotaSnapshot = {
  tokensPerDay: QuotaPair | null;
  tokensPerHour: QuotaPair | null;
  seenAt: string;
};

const snapshots = new Map<string, Ga4QuotaSnapshot>();

export function recordGa4Quota(
  projectId: string,
  quota: Ga4QuotaInput,
  now: Date = new Date(),
): void {
  if (!quota || (!quota.tokensPerDay && !quota.tokensPerHour)) return;
  snapshots.set(projectId, {
    tokensPerDay: quota.tokensPerDay ?? null,
    tokensPerHour: quota.tokensPerHour ?? null,
    seenAt: now.toISOString(),
  });
}

export function readGa4Quota(projectId: string): Ga4QuotaSnapshot | null {
  return snapshots.get(projectId) ?? null;
}
