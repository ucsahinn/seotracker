import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";

// Orgs whose first tool call is already recorded (or in flight) in this
// isolate. Only the *first* timestamp matters, so after one successful write
// this hot path never touches the DB again for that org.
const recordedToolCallOrgs = new Set<string>();

export async function recordExternalMcpToolCall(
  organizationId: string,
): Promise<void> {
  if (recordedToolCallOrgs.has(organizationId)) return;
  recordedToolCallOrgs.add(organizationId);
  try {
    await ActivationRepository.recordFirstMcpToolCall(organizationId);
  } catch (error) {
    // Allow a retry on a later call rather than losing the milestone.
    recordedToolCallOrgs.delete(organizationId);
    console.error("activation: recordExternalMcpToolCall failed", error);
  }
}
