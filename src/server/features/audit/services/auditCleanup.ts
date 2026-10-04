/**
 * What stopping and deleting an audit needs from the outside world: telling a
 * workflow that is gone from one whose state is merely unknown, and removing
 * the audit's R2 payloads.
 */
import { env } from "cloudflare:workers";
import { lighthousePayloadPrefix } from "@/server/lib/audit/lighthouse";
import { deleteManyFromR2 } from "@/server/lib/r2";

/** R2 lists at most 1000 keys per call. */
const SWEEP_PAGE_SIZE = 1000;
/** 100 pages of 1000: far above the 2 payloads x 10,000 pages an audit can hold. */
const MAX_SWEEP_PAGES = 100;

/**
 * True only for a confirmed "no such instance" answer (never created, or
 * expired from Workflows retention). Any other error is unknown state.
 */
export function isWorkflowNotFound(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /not[ _]?found/i.test(message);
}

/**
 * Delete every Lighthouse payload under the audit's deterministic key prefix.
 *
 * The prefix is swept instead of the keys the database references: a payload
 * is uploaded before the row that references it is written, so a failure in
 * between leaves an object no row points at. Lists from the start each round
 * (deleted keys drop out of the listing), bounded by MAX_SWEEP_PAGES. Throws
 * on any failure, or when the bound is hit with objects still left, so the
 * caller can keep the audit and let the user retry.
 */
export async function deleteAuditPayloads(
  projectId: string,
  auditId: string,
): Promise<void> {
  const prefix = lighthousePayloadPrefix(projectId, auditId);
  for (let round = 0; round < MAX_SWEEP_PAGES; round += 1) {
    const listing = await env.R2.list({ prefix, limit: SWEEP_PAGE_SIZE });
    if (listing.objects.length === 0) return;
    await deleteManyFromR2(listing.objects.map((object) => object.key));
  }
  throw new Error(`R2 payload sweep for audit ${auditId} did not finish`);
}
