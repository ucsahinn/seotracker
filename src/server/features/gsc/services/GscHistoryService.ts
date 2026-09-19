import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
import type { GscDailyRow } from "@/server/features/gsc/repositories/GscHistoryRepository";
import { GSC_MAX_ROW_LIMIT } from "@/server/features/gsc/searchAnalytics";
import { GscService } from "@/server/features/gsc/services/GscService";
import { isExpectedGrantFailure } from "@/server/features/gsc/services/GscService";

/**
 * Local archive of Search Console's daily query data.
 *
 * Google serves the last 16 months and deletes what falls off the back, so the
 * only way to have a longer history is to keep it. Nothing here is scheduled:
 * Docker never fires a cron, and a laptop is asleep half the time. Instead the
 * archive catches up whenever the operator opens the page — it asks how far it
 * got last time and fetches the days since. Because Google keeps 16 months, any
 * gap shorter than that is recoverable, which makes an unscheduled catch-up as
 * complete as a nightly job would have been.
 */

/** Search Console finalizes a day's data a few days late. */
const DATA_LAG_DAYS = 3;
/** Google's own retention limit, and therefore the furthest a backfill reaches. */
const MAX_HISTORY_DAYS = 480;
/** Days per chunk. Each chunk is one or more API calls. */
const CHUNK_DAYS = 30;
/**
 * Rows per request, and how many requests a chunk may take.
 *
 * This used to be a single `rowLimit: 250` for the whole 30-day chunk, under
 * the belief that it was 250 per day. It is not: with `dimensions:
 * ["date","query"]` a row is one (date, query) pair, so 250 rows covered
 * roughly eight query-days out of thirty. Worse, Search Console sorts by
 * clicks descending, so what survived was the best day of the best queries --
 * the archive systematically kept the peaks and discarded the decline it
 * exists to reveal.
 *
 * The request is paginated instead. `GSC_MAX_ROW_LIMIT` is the wrapper's cap
 * per response, and the page budget bounds a chunk so one catch-up cannot
 * stall the page for minutes on a large site.
 */
const ROWS_PER_REQUEST = GSC_MAX_ROW_LIMIT;
const MAX_REQUESTS_PER_CHUNK = 12;
/** Chunks per catch-up, so opening the page cannot stall for minutes. */
const MAX_CHUNKS_PER_RUN = 4;

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const next = new Date(`${date}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return isoDate(next);
}

function latestAvailableDate(today: Date): string {
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() - DATA_LAG_DAYS);
  return isoDate(end);
}

/**
 * Where this run should start.
 *
 * With nothing stored, reach back as far as Google will serve. With a partial
 * archive, resume one day *before* the last stored date: Search Console revises
 * the most recent days as late data arrives, and the upsert makes re-fetching
 * that day free.
 */
function resolveStart(lastDate: string | null, today: Date): string {
  const floor = new Date(today);
  floor.setUTCDate(floor.getUTCDate() - MAX_HISTORY_DAYS);
  const earliest = isoDate(floor);
  if (!lastDate) return earliest;
  const resume = addDays(lastDate, -1);
  return resume < earliest ? earliest : resume;
}

type BackfillOutcome = {
  /** Days newly stored or refreshed by this run. */
  daysFetched: number;
  rowsWritten: number;
  earliestDate: string | null;
  lastDate: string | null;
  /** True when the archive still has older or newer days left to fetch. */
  hasMore: boolean;
  /**
   * Chunks where the page budget ran out before Google ran out of rows, so
   * those days hold the top queries rather than all of them. Reported rather
   * than hidden: an archive that quietly drops rows is worse than one that
   * admits it.
   */
  truncatedChunks: number;
  error: string | null;
};

/**
 * Every query-day Google has for one date range, paged until it runs out.
 *
 * `truncated` means the page budget ran out first, so the range holds the top
 * queries rather than all of them - reported rather than hidden.
 */
async function fetchRange(
  projectId: string,
  startDate: string,
  endDate: string,
): Promise<{ rows: GscDailyRow[]; truncated: boolean }> {
  const rows: GscDailyRow[] = [];

  for (let page = 0; page < MAX_REQUESTS_PER_CHUNK; page += 1) {
    const performance = await GscService.getPerformance({
      projectId,
      // The date dimension is what makes this an archive rather than a
      // snapshot: without it Google returns one aggregate for the range.
      dimensions: ["date", "query"],
      startDate,
      endDate,
      rowLimit: ROWS_PER_REQUEST,
      startRow: page * ROWS_PER_REQUEST,
      dataState: "final",
    });

    for (const row of performance.rows) {
      const [date, query] = row.keys ?? [];
      if (!date || !query) continue;
      rows.push({
        date,
        query,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      });
    }

    // A short page means Google has no more rows for this range.
    if (performance.rows.length < ROWS_PER_REQUEST) {
      return { rows, truncated: false };
    }
  }

  return { rows, truncated: true };
}

/**
 * Fetch the days this project is missing, bounded so one call stays quick.
 * Safe to call on every page view: with nothing to do it makes no API request.
 */
async function backfill(input: {
  projectId: string;
  today?: Date;
}): Promise<BackfillOutcome> {
  const today = input.today ?? new Date();
  const state = await GscHistoryRepository.getArchiveState(input.projectId);
  const endDate = latestAvailableDate(today);
  let cursor = resolveStart(state?.lastDate ?? null, today);

  const outcome: BackfillOutcome = {
    daysFetched: 0,
    rowsWritten: 0,
    earliestDate: state?.earliestDate ?? null,
    lastDate: state?.lastDate ?? null,
    hasMore: false,
    truncatedChunks: 0,
    error: null,
  };

  if (cursor > endDate) return outcome;

  for (let chunk = 0; chunk < MAX_CHUNKS_PER_RUN; chunk += 1) {
    if (cursor > endDate) break;

    const chunkEnd = addDays(cursor, CHUNK_DAYS - 1);
    const rangeEnd = chunkEnd > endDate ? endDate : chunkEnd;

    try {
      const { rows, truncated } = await fetchRange(
        input.projectId,
        cursor,
        rangeEnd,
      );

      await GscHistoryRepository.upsertDailyRows(input.projectId, rows);

      if (truncated) outcome.truncatedChunks += 1;
      outcome.rowsWritten += rows.length;
      outcome.daysFetched += new Set(rows.map((row) => row.date)).size;
      outcome.earliestDate =
        outcome.earliestDate && outcome.earliestDate < cursor
          ? outcome.earliestDate
          : cursor;
      outcome.lastDate =
        outcome.lastDate && outcome.lastDate > rangeEnd
          ? outcome.lastDate
          : rangeEnd;
    } catch (error) {
      // A revoked grant or an API outage stops this run, but the days already
      // written stay. Recording the reason keeps the UI honest about why the
      // history is not growing.
      outcome.error =
        error instanceof Error
          ? error.message
          : "Search Console request failed";
      if (isExpectedGrantFailure(error)) {
        outcome.error = "Search Console connection needs to be renewed.";
      }
      break;
    }

    cursor = addDays(rangeEnd, 1);
  }

  outcome.hasMore = outcome.error === null && cursor <= endDate;

  await GscHistoryRepository.markRun({
    projectId: input.projectId,
    earliestDate: outcome.earliestDate,
    lastDate: outcome.lastDate,
    error: outcome.error,
  });

  return outcome;
}

/** What the UI needs to describe the archive without reading every row. */
async function getStatus(projectId: string) {
  const [state, rowCount] = await Promise.all([
    GscHistoryRepository.getArchiveState(projectId),
    GscHistoryRepository.countRows(projectId),
  ]);

  return {
    earliestDate: state?.earliestDate ?? null,
    lastDate: state?.lastDate ?? null,
    lastRunAt: state?.lastRunAt ?? null,
    lastError: state?.lastError ?? null,
    rowCount,
  };
}

export const GscHistoryService = {
  backfill,
  getStatus,
  getQueryHistory: GscHistoryRepository.getQueryHistory,
  getTrackedQueries: GscHistoryRepository.getTrackedQueries,
};
