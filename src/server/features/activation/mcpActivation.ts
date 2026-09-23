import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";

/**
 * When this isolate last wrote each org's activity stamp.
 *
 * The previous version memoised "written once, ever" because only the first
 * timestamp mattered. A last-seen stamp has to move, so the memo becomes a
 * throttle instead: at most one write a minute per org. That costs up to a
 * minute of accuracy against a relative timestamp whose finest grain is
 * "az önce", and it keeps a chatty agent from writing on every single call.
 */
const WRITE_EVERY_MS = 60_000;
const lastWriteAt = new Map<string, number>();

export async function recordMcpActivity(
  organizationId: string,
  clientLabel: string | null,
): Promise<void> {
  const previous = lastWriteAt.get(organizationId);
  const now = Date.now();
  if (previous !== undefined && now - previous < WRITE_EVERY_MS) return;
  lastWriteAt.set(organizationId, now);

  try {
    await ActivationRepository.recordMcpActivity(organizationId, clientLabel);
  } catch (error) {
    // Allow the next call to retry rather than losing a minute of signal.
    lastWriteAt.delete(organizationId);
    console.error("activation: recordMcpActivity failed", error);
  }
}
