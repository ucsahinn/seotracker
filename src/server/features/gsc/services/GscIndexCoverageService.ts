import { and, count, eq, gte, inArray } from "drizzle-orm";
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
        richResultsVerdict: row.richResultsVerdict,
        inspectionLink: row.inspectionLink,
        error: row.error,
        checkedAt: row.checkedAt,
      },
    ]),
  );
}

/**
 * How much of the day's quota this project has already spent.
 *
 * A rolling 24 hours rather than a calendar day, because Google's quota day
 * rolls over on its own clock and guessing the boundary wrong would let a run
 * cross the line. Over any 24-hour window the count is at least as large as
 * the count since the real midnight, so the budget it produces is the safe
 * side of the truth.
 *
 * A URL re-inspected twice in the window counts once, since the row is
 * overwritten. That makes this a floor, which is why it is spent against
 * 2000 and not treated as an exact ledger.
 */
async function inspectionsInLastDay(
  projectId: string,
  now: Date,
): Promise<number> {
  // Every write in this module stores an ISO stamp, so a string comparison
  // orders them correctly. The column's SQLite default is the other shape
  // ("2026-09-19 22:30:00"), which would sort as older and be missed -- an
  // undercount, which spends quota rather than losing it.
  const since = new Date(now.getTime() - 86_400_000).toISOString();
  const [row] = await db
    .select({ value: count() })
    .from(gscUrlInspections)
    .where(
      and(
        eq(gscUrlInspections.projectId, projectId),
        gte(gscUrlInspections.checkedAt, since),
      ),
    );
  return row?.value ?? 0;
}

/** Reads what is already known. Never calls Google, so it is free to render. */
export async function getIndexCoverage(input: {
  projectId: string;
  auditId: string;
  now?: Date;
}): Promise<IndexCoverage> {
  const urls = await indexableUrlsForAudit(input.auditId, input.projectId);
  return summarizeCoverage(
    urls,
    await storedFor(input.projectId, urls),
    input.now ?? new Date(),
  );
}

/**
 * Ask Google about the pages we have not asked about lately, up to one batch.
 * Returning how many are still waiting lets the UI offer another run instead
 * of silently doing nothing.
 */
/**
 * Inspect URLs against the daily quota and write what came back.
 *
 * Both callers have to come through here. URL Inspection allows 2000 URLs per
 * property per day and the allowance does not replenish early, so an
 * inspection that is not counted is one the operator cannot see they spent:
 * `/mcp` used to call `GscService.inspectUrls` directly, which meant an agent
 * looping over an audit's pages could burn the whole day's allowance while
 * `inspectionsInLastDay` still read zero - and the Index Coverage screen
 * would then fire its own refresh into a quota that was already gone.
 *
 * Returns what was actually asked, since the caller cannot assume it got the
 * whole list.
 */
export async function inspectAndRecord(input: {
  projectId: string;
  urls: string[];
  languageCode?: string;
  now?: Date;
}): Promise<{
  siteUrl: string | null;
  results: Awaited<ReturnType<typeof GscService.inspectUrls>>["results"];
  requested: number;
  skipped: number;
  quotaRemaining: number;
}> {
  const now = input.now ?? new Date();
  const spent = await inspectionsInLastDay(input.projectId, now);
  const budget = Math.max(DAILY_QUOTA - spent, 0);
  const batch = input.urls.slice(0, budget);

  if (batch.length === 0) {
    return {
      siteUrl: null,
      results: [],
      requested: 0,
      skipped: input.urls.length,
      quotaRemaining: 0,
    };
  }

  const { siteUrl, results } = await GscService.inspectUrls({
    projectId: input.projectId,
    urls: batch,
    languageCode: input.languageCode,
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

  return {
    siteUrl,
    results,
    requested: batch.length,
    skipped: input.urls.length - batch.length,
    quotaRemaining: Math.max(budget - batch.length, 0),
  };
}

export async function refreshIndexCoverage(input: {
  projectId: string;
  auditId: string;
  now?: Date;
}): Promise<{
  inspected: number;
  remaining: number;
  quotaRemaining: number;
}> {
  const now = input.now ?? new Date();
  const urls = await indexableUrlsForAudit(input.auditId, input.projectId);
  const stored = await storedFor(input.projectId, urls);
  const spent = await inspectionsInLastDay(input.projectId, now);
  const budget = Math.max(DAILY_QUOTA - spent, 0);
  const { batch, remaining } = selectDueUrls(urls, stored, now, budget);

  if (batch.length === 0) {
    return { inspected: 0, remaining, quotaRemaining: budget };
  }

  // Google localises coverageState, so asking for Turkish means the sentence
  // explaining a refusal arrives in the UI's language. The local map in
  // shared/gsc-coverage-states.ts stays as the fallback for the English
  // phrases already stored, and for anything Google has not translated.
  await inspectAndRecord({
    projectId: input.projectId,
    urls: batch,
    languageCode: "tr",
    now,
  });

  return {
    inspected: batch.length,
    remaining,
    quotaRemaining: Math.max(budget - batch.length, 0),
  };
}
