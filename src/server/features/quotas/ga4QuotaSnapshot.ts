/**
 * The last GA4 `propertyQuota` a report response carried, per project and connection.
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

/**
 * Who a response belongs to. Google's quota is per property and the token is
 * per connected account, so a snapshot only describes the connection that
 * produced it.
 */
type Ga4QuotaOwner = {
  projectId: string;
  propertyId: string;
  ga4AccountId: string;
  connectedByUserId: string;
};

const ownerKey = (owner: Ga4QuotaOwner) =>
  JSON.stringify([
    owner.propertyId,
    owner.ga4AccountId,
    owner.connectedByUserId,
  ]);

// project -> owner -> snapshot. A response that lands after the connection
// changed is stored under its old owner, where no reader of the new
// connection looks.
const snapshots = new Map<string, Map<string, Ga4QuotaSnapshot>>();

export function recordGa4Quota(
  owner: Ga4QuotaOwner,
  quota: Ga4QuotaInput,
  now: Date = new Date(),
): void {
  if (!quota || (!quota.tokensPerDay && !quota.tokensPerHour)) return;
  const forProject =
    snapshots.get(owner.projectId) ?? new Map<string, Ga4QuotaSnapshot>();
  forProject.set(ownerKey(owner), {
    tokensPerDay: quota.tokensPerDay ?? null,
    tokensPerHour: quota.tokensPerHour ?? null,
    seenAt: now.toISOString(),
  });
  snapshots.set(owner.projectId, forProject);
}

export function readGa4Quota(owner: Ga4QuotaOwner): Ga4QuotaSnapshot | null {
  return snapshots.get(owner.projectId)?.get(ownerKey(owner)) ?? null;
}

/** Called when a project's GA4 connection is replaced or removed. */
export function clearGa4Quota(projectId: string): void {
  snapshots.delete(projectId);
}
