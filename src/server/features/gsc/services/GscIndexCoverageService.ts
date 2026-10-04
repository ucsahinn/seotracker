import { and, count, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches } from "@/db/runBatch";
import {
  auditPages,
  audits,
  gscConnections,
  gscInspectionAttempts,
  gscUrlInspections,
} from "@/db/schema";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import {
  DAILY_QUOTA,
  isStale,
  URL_BIND_CHUNK,
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

type InspectionEntry = Awaited<
  ReturnType<typeof GscService.inspectUrls>
>["results"][number];

/**
 * Write one answer into the cache as an INSERT ... SELECT from the project's
 * connection row for the property the answer came from. If the project was
 * pointed at another property (or disconnected) while Google was answering,
 * the SELECT is empty and nothing is written: a verdict for the old property
 * must not land in the cache the switch just cleared.
 */
function upsertAnswer(
  tx: typeof db,
  input: {
    projectId: string;
    siteUrl: string;
    checkedAt: string;
    entry: InspectionEntry;
  },
) {
  const { entry, checkedAt } = input;
  const status = entry.result?.indexStatusResult;
  const answer = {
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
    lastAttemptAt: checkedAt,
  };
  const lit = <T>(value: T, name: string) => sql<T>`${value}`.as(name);
  const connection = tx
    .select({
      projectId: lit(input.projectId, "project_id"),
      url: lit(entry.url, "url"),
      verdict: lit(answer.verdict, "verdict"),
      coverageState: lit(answer.coverageState, "coverage_state"),
      robotsTxtState: lit(answer.robotsTxtState, "robots_txt_state"),
      indexingState: lit(answer.indexingState, "indexing_state"),
      pageFetchState: lit(answer.pageFetchState, "page_fetch_state"),
      lastCrawlTime: lit(answer.lastCrawlTime, "last_crawl_time"),
      googleCanonical: lit(answer.googleCanonical, "google_canonical"),
      userCanonical: lit(answer.userCanonical, "user_canonical"),
      richResultsVerdict: lit(
        answer.richResultsVerdict,
        "rich_results_verdict",
      ),
      inspectionLink: lit(answer.inspectionLink, "inspection_link"),
      error: lit(answer.error, "error"),
      checkedAt: lit(answer.checkedAt, "checked_at"),
      lastAttemptAt: lit(answer.lastAttemptAt, "last_attempt_at"),
    })
    .from(gscConnections)
    .where(
      and(
        eq(gscConnections.projectId, input.projectId),
        eq(gscConnections.siteUrl, input.siteUrl),
      ),
    );
  /*
   * A failed inspection carries no answer, with or without an error message:
   * an entry with no result is a failure. Writing its nulls over the conflict
   * would erase a verdict Google already gave, and refreshing `checkedAt`
   * would present that old verdict as freshly observed. A failure on an
   * already-stored URL therefore records only the error and the attempt time.
   * A URL with nothing stored still gets the full row from the insert.
   * Known wrinkle: for a first-ever failed inspection that row carries
   * `checkedAt` = now, although the contract says "when Google last answered"
   * and Google did not. Such a row is told apart by its null verdict and its
   * error, not by `checkedAt`; do not read the timestamp as proof of an answer.
   */
  return tx
    .insert(gscUrlInspections)
    .select(connection)
    .onConflictDoUpdate({
      target: [gscUrlInspections.projectId, gscUrlInspections.url],
      set: entry.result
        ? answer
        : { error: answer.error, lastAttemptAt: checkedAt },
    });
}

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
  // Chunked because D1 caps bound parameters at 100 per statement; an audit
  // of more than about a hundred pages used to fail the whole read.
  const rows: (typeof gscUrlInspections.$inferSelect)[] = [];
  for (let i = 0; i < urls.length; i += URL_BIND_CHUNK) {
    rows.push(
      ...(await db
        .select()
        .from(gscUrlInspections)
        .where(
          and(
            eq(gscUrlInspections.projectId, projectId),
            inArray(gscUrlInspections.url, urls.slice(i, i + URL_BIND_CHUNK)),
          ),
        )),
    );
  }
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
        lastAttemptAt: row.lastAttemptAt,
      },
    ]),
  );
}

/**
 * How much of the day's quota this project's property has already spent.
 *
 * Counted from the attempt ledger, not from the cache: every call Google
 * served is one row, so a forced re-inspection of the same URL counts again
 * and clearing the cache does not refund anything. Keyed by the property's
 * site URL, which is the unit Google's allowance belongs to.
 *
 * A rolling 24 hours rather than a calendar day, because Google's quota day
 * rolls over on its own clock and guessing the boundary wrong would let a run
 * cross the line. Over any 24-hour window the count is at least as large as
 * the count since the real midnight, so the budget it produces is the safe
 * side of the truth.
 */
export async function inspectionsInLastDay(
  projectId: string,
  now: Date,
): Promise<number> {
  const connection = await GscConnectionRepository.getByProjectId(projectId);
  if (!connection) return 0;
  // Every ledger row is an ISO stamp, so a string comparison orders them.
  const since = new Date(now.getTime() - 86_400_000).toISOString();
  const [row] = await db
    .select({ value: count() })
    .from(gscInspectionAttempts)
    .where(
      and(
        eq(gscInspectionAttempts.siteUrl, connection.siteUrl),
        gte(gscInspectionAttempts.attemptedAt, since),
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
  /** Ask again even for URLs with a fresh stored answer. */
  force?: boolean;
}): Promise<{
  siteUrl: string | null;
  results: Awaited<ReturnType<typeof GscService.inspectUrls>>["results"];
  requested: number;
  skipped: number;
  /** Not asked because a recent answer is already stored. */
  fresh: number;
  quotaRemaining: number;
}> {
  const now = input.now ?? new Date();
  // A URL listed twice would be bought twice and counted twice in
  // `requested`, `fresh` and `skipped`.
  const urls = [...new Set(input.urls)];
  const spent = await inspectionsInLastDay(input.projectId, now);
  const budget = Math.max(DAILY_QUOTA - spent, 0);
  /*
   * The UI refresh has always gone through `selectDueUrls`, which skips a
   * URL answered inside the last 14 days. This path had no such check, so an
   * agent asked to re-check forty pages after a timeout paid for all forty
   * again -- against an allowance that does not replenish early. Same rule
   * for both callers now; `force` is the deliberate override.
   */
  const stored = input.force
    ? new Map<string, CoverageRow>()
    : await storedFor(input.projectId, urls);
  const due = urls.filter((url) => isStale(stored.get(url), now));
  const fresh = urls.length - due.length;
  const batch = due.slice(0, budget);

  if (batch.length === 0) {
    return {
      siteUrl: null,
      results: [],
      requested: 0,
      skipped: due.length,
      fresh,
      quotaRemaining: budget,
    };
  }

  const { siteUrl, results, tokenError } = await GscService.inspectUrls({
    projectId: input.projectId,
    urls: batch,
    languageCode: input.languageCode,
  });
  const checkedAt = now.toISOString();

  /*
   * The ledger first, and for the property that was actually asked: Google
   * has spent these inspections whatever happens to the cache below, and the
   * project may have been pointed at another property while they ran.
   */
  if (siteUrl && results.length > 0) {
    await executeInBatches(results, (tx) =>
      tx
        .insert(gscInspectionAttempts)
        .values({ siteUrl, attemptedAt: checkedAt }),
    );
    await db
      .delete(gscInspectionAttempts)
      .where(
        lt(
          gscInspectionAttempts.attemptedAt,
          new Date(now.getTime() - 86_400_000).toISOString(),
        ),
      );
  }

  /*
   * One D1 round trip per 100 rows instead of one per URL (up to 2000 a
   * day). Each statement is still a single-row upsert, so the bound
   * parameters stay per statement and the order is the order Google answered.
   *
   * Each upsert is an INSERT ... SELECT from the project's connection row
   * for the property the answers came from. If the project was pointed at
   * another property (or disconnected) while Google was answering, the
   * SELECT is empty and nothing is written: a verdict for the old property
   * must not land in the cache the switch just cleared.
   */
  await executeInBatches(results, (tx, entry) =>
    upsertAnswer(tx, {
      projectId: input.projectId,
      siteUrl,
      checkedAt,
      entry,
    }),
  );

  /*
   * Rethrown only after the loop above has persisted everything Google did
   * serve. The caller still gets its reconnect prompt; the difference is
   * that the inspections already paid for are on the books, so the next
   * batch does not buy them again.
   */
  if (tokenError) throw tokenError;

  return {
    siteUrl,
    results,
    requested: batch.length,
    skipped: due.length - batch.length,
    fresh,
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

  /*
   * English, and translated on the way out.
   *
   * `coverageState` is the only field that says *why* a page is not
   * indexed, and Google localises it. Asking for Turkish put the right
   * words on screen but made the column unreadable by anything else: the
   * enums beside it cannot tell "discovered, not indexed" from "unknown to
   * Google" -- both arrive NEUTRAL/UNSPECIFIED -- so the sentence is the
   * only signal, and a sentence in an unknown language is no signal.
   *
   * It also left the table holding both languages at once, since rows
   * stored before that change are English, so the same state read as two
   * different sentences on one screen.
   *
   * `coverageStateLabel` in shared/gsc-coverage-states.ts translates the
   * documented set for display, which is what it was written for. Rows
   * already stored in Turkish pass through it unchanged and stay readable;
   * they simply produce no finding until they are inspected again.
   */
  await inspectAndRecord({
    projectId: input.projectId,
    urls: batch,
    languageCode: "en",
    now,
  });

  return {
    inspected: batch.length,
    remaining,
    quotaRemaining: Math.max(budget - batch.length, 0),
  };
}
