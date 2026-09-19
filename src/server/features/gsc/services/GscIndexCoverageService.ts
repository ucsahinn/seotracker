import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { auditPages, audits, gscUrlInspections } from "@/db/schema";
import {
  DAILY_QUOTA,
  selectDueUrls,
  summarizeCoverage,
  type CoverageRow,
  type IndexCoverage,
} from "@/server/features/gsc/indexCoverage";
import { GscService } from "@/server/features/gsc/services/GscService";

/**
 * Whether Google actually indexed the pages your crawler found.
 *
 * The crawler can only say a page *may* be indexed: it returns 200, it is not
 * noindexed, it is linked. Whether Google agreed is a different question, and
 * the URL Inspection API is the only free source that answers it. The two
 * disagree more often than people expect, and every disagreement is a page
 * doing no work.
 *
 * The decisions live in `../indexCoverage`; this module is the I/O around them.
 */

/**
 * Only pages worth asking Google about: ones it could actually have indexed.
 *
 * Joined through `audits` so the audit has to belong to the project. Without
 * that join an audit id from another project would resolve here, and its URLs
 * would then be inspected against *this* project's Search Console property and
 * stored under this project's key. `audit_pages` carries no project column, so
 * the join is the only way to scope it - which is how every other audit query
 * in this codebase does it.
 */
async function indexableUrlsForAudit(
  auditId: string,
  projectId: string,
): Promise<string[]> {
  const rows = await db
    .select({ url: auditPages.url, indexable: auditPages.isIndexable })
    .from(auditPages)
    .innerJoin(audits, eq(audits.id, auditPages.auditId))
    .where(
      and(eq(auditPages.auditId, auditId), eq(audits.projectId, projectId)),
    );
  return rows.filter((row) => row.indexable).map((row) => row.url);
}

async function storedFor(
  projectId: string,
  urls: string[],
): Promise<Map<string, CoverageRow>> {
  if (urls.length === 0) return new Map();
  const rows = await db
    .select()
    .from(gscUrlInspections)
    .where(
      and(
        eq(gscUrlInspections.projectId, projectId),
        inArray(gscUrlInspections.url, urls),
      ),
    );
  return new Map(
    rows.map((row) => [
      row.url,
      {
        url: row.url,
        verdict: row.verdict,
        coverageState: row.coverageState,
        robotsTxtState: row.robotsTxtState,
        indexingState: row.indexingState,
        pageFetchState: row.pageFetchState,
        lastCrawlTime: row.lastCrawlTime,
        googleCanonical: row.googleCanonical,
        userCanonical: row.userCanonical,
        mobileVerdict: row.mobileVerdict,
        richResultsVerdict: row.richResultsVerdict,
        inspectionLink: row.inspectionLink,
        error: row.error,
        checkedAt: row.checkedAt,
      },
    ]),
  );
}

/** Reads what is already known. Never calls Google, so it is free to render. */
export async function getIndexCoverage(input: {
  projectId: string;
  auditId: string;
}): Promise<IndexCoverage> {
  const urls = await indexableUrlsForAudit(input.auditId, input.projectId);
  return summarizeCoverage(urls, await storedFor(input.projectId, urls));
}

/**
 * Ask Google about the pages we have not asked about lately, up to one batch.
 * Returning how many are still waiting lets the UI offer another run instead
 * of silently doing nothing.
 */
export async function refreshIndexCoverage(input: {
  projectId: string;
  auditId: string;
  now?: Date;
}): Promise<{ inspected: number; remaining: number; quotaPerDay: number }> {
  const now = input.now ?? new Date();
  const urls = await indexableUrlsForAudit(input.auditId, input.projectId);
  const stored = await storedFor(input.projectId, urls);
  const { batch, remaining } = selectDueUrls(urls, stored, now);

  if (batch.length === 0) {
    return { inspected: 0, remaining: 0, quotaPerDay: DAILY_QUOTA };
  }

  const { results } = await GscService.inspectUrls({
    projectId: input.projectId,
    urls: batch,
    // Google localises coverageState, so asking for Turkish means the sentence
    // explaining a refusal arrives in the UI's language. The local map in
    // shared/gsc-coverage-states.ts stays as the fallback for the English
    // phrases already stored, and for anything Google has not translated.
    languageCode: "tr",
  });
  const checkedAt = now.toISOString();

  for (const entry of results) {
    const status = entry.result?.indexStatusResult;
    const values = {
      projectId: input.projectId,
      url: entry.url,
      verdict: status?.verdict ?? null,
      coverageState: status?.coverageState ?? null,
      robotsTxtState: status?.robotsTxtState ?? null,
      indexingState: status?.indexingState ?? null,
      pageFetchState: status?.pageFetchState ?? null,
      lastCrawlTime: status?.lastCrawlTime ?? null,
      googleCanonical: status?.googleCanonical ?? null,
      userCanonical: status?.userCanonical ?? null,
      mobileVerdict: entry.result?.mobileUsabilityResult?.verdict ?? null,
      richResultsVerdict: entry.result?.richResultsResult?.verdict ?? null,
      inspectionLink: entry.result?.inspectionResultLink ?? null,
      error: entry.error ?? null,
      checkedAt,
    };
    await db
      .insert(gscUrlInspections)
      .values(values)
      .onConflictDoUpdate({
        target: [gscUrlInspections.projectId, gscUrlInspections.url],
        set: values,
      });
  }

  return { inspected: batch.length, remaining, quotaPerDay: DAILY_QUOTA };
}
