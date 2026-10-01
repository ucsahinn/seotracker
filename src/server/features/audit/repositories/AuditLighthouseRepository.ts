/**
 * The Lighthouse rows of an audit: writing a run's results, and reading
 * one back for the issues screen.
 *
 * Split from `AuditRepository` when that file crossed its line ceiling.
 * Lighthouse is the one part of an audit that comes from a different
 * source -- Google PageSpeed Insights rather than this crawler -- so it
 * is the seam that costs least to cut.
 */
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { audits, auditLighthouseResults, auditPages } from "@/db/schema";
import { executeInBatches } from "@/db/runBatch";
import { deterministicAuditRowId } from "@/server/lib/audit/ids";
import type { LighthouseResult } from "@/server/lib/audit/types";

async function insertLighthouseResults(
  auditId: string,
  lighthouseResults: LighthouseResult[],
  /**
   * Leave a row that is already stored alone. The fallback that records a
   * failed wave must not overwrite the checks of that wave that succeeded.
   */
  options: { keepExisting?: boolean } = {},
) {
  const rows = await Promise.all(
    lighthouseResults.map(async (result) => ({
      id: await deterministicAuditRowId(
        auditId,
        result.pageId,
        result.strategy,
      ),
      auditId,
      pageId: result.pageId,
      strategy: result.strategy,
      performanceScore: result.performanceScore,
      accessibilityScore: result.accessibilityScore,
      bestPracticesScore: result.bestPracticesScore,
      seoScore: result.seoScore,
      lcpMs: result.lcpMs,
      cls: result.cls,
      inpMs: result.inpMs,
      ttfbMs: result.ttfbMs,
      errorMessage: result.errorMessage ?? null,
      r2Key: result.r2Key ?? null,
      payloadSizeBytes: result.payloadSizeBytes ?? null,
    })),
  );
  // The persistence step is retryable after its paid provider result has been
  // checkpointed, so repeated writes must stay idempotent.
  await executeInBatches(rows, (tx, row) => {
    const { id: _id, auditId: _auditId, ...dataColumns } = row;
    const insert = tx.insert(auditLighthouseResults).values(row);
    return options.keepExisting
      ? insert.onConflictDoNothing()
      : insert.onConflictDoUpdate({
          target: auditLighthouseResults.id,
          set: dataColumns,
        });
  });
}

/**
 * What is actually stored for these pages. The fallback of a failed wave
 * derives its progress from this, because rows a failed attempt already wrote
 * (kept by `keepExisting`) are not the wave's own in-memory results.
 */
async function countResultsForPages(auditId: string, pageIds: string[]) {
  if (pageIds.length === 0) return { ok: 0, error: 0 };
  const rows = await db
    .select({ errorMessage: auditLighthouseResults.errorMessage })
    .from(auditLighthouseResults)
    .where(
      and(
        eq(auditLighthouseResults.auditId, auditId),
        inArray(auditLighthouseResults.pageId, pageIds),
      ),
    );
  const error = rows.filter((row) => row.errorMessage).length;
  return { ok: rows.length - error, error };
}

async function getLighthouseResultById(input: {
  lighthouseResultId: string;
  projectId: string;
}) {
  const lighthouse = await db.query.auditLighthouseResults.findFirst({
    where: eq(auditLighthouseResults.id, input.lighthouseResultId),
  });

  if (!lighthouse) {
    return null;
  }

  const [parentAudit, page] = await Promise.all([
    db.query.audits.findFirst({
      where: and(
        eq(audits.id, lighthouse.auditId),
        eq(audits.projectId, input.projectId),
      ),
    }),
    db.query.auditPages.findFirst({
      where: eq(auditPages.id, lighthouse.pageId),
    }),
  ]);

  if (!parentAudit) {
    return null;
  }

  return {
    lighthouse,
    page,
    audit: parentAudit,
  };
}

export const AuditLighthouseRepository = {
  insertLighthouseResults,
  countResultsForPages,
  getLighthouseResultById,
};
