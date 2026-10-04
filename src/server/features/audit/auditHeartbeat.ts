/**
 * A liveness signal for a running audit, written by the audit worker and read
 * by the app worker's reconciler. The two workers share KV but not memory, so
 * this is the one thing that says whether the workflow is still making
 * progress when only the app worker's process has restarted.
 */
import { env } from "cloudflare:workers";

// KV's minimum TTL is 60 seconds. Far longer than the reconciler's silence
// window, so an expired key means the audit has long been silent.
const TTL_SECONDS = 2 * 60 * 60;

function key(auditId: string): string {
  return `audit-heartbeat:${auditId}`;
}

/** Called from the workflow after each persisted batch of work. Never throws. */
export async function recordAuditHeartbeat(auditId: string): Promise<void> {
  try {
    await env.KV.put(key(auditId), String(Date.now()), {
      expirationTtl: TTL_SECONDS,
    });
  } catch (error) {
    // Advisory only: a missed beat must not fail the audit that is working.
    console.warn(`Failed to record heartbeat of audit ${auditId}:`, error);
  }
}

/** Epoch ms of the last heartbeat, or null when none was recorded. Throws if KV cannot be read. */
export async function getAuditHeartbeat(
  auditId: string,
): Promise<number | null> {
  const value = await env.KV.get(key(auditId), "text");
  const at = value === null ? Number.NaN : Number(value);
  return Number.isFinite(at) ? at : null;
}
