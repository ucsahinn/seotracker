import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
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
/** Days per request. Each one is a separate API call, so keep the count sane. */
const CHUNK_DAYS = 30;
/** Top queries kept per day. Google's own default page size. */
const ROWS_PER_DAY = 250;
/** Requests per catch-up, so opening the page cannot stall for minutes. */
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
  error: string | null;
};

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
    error: null,
  };

  if (cursor > endDate) return outcome;

  for (let chunk = 0; chunk < MAX_CHUNKS_PER_RUN; chunk += 1) {
    if (cursor > endDate) break;

    const chunkEnd = addDays(cursor, CHUNK_DAYS - 1);
    const rangeEnd = chunkEnd > endDate ? endDate : chunkEnd;

    try {
      const performance = await GscService.getPerformance({
        projectId: input.projectId,
        // The date dimension is what makes this an archive rather than a
        // snapshot: without it Google returns one aggregate for the range.
        dimensions: ["date", "query"],
        startDate: cursor,
        endDate: rangeEnd,
        rowLimit: ROWS_PER_DAY,
        dataState: "final",
      });

      const rows = performance.rows.flatMap((row) => {
        const [date, query] = row.keys ?? [];
        if (!date || !query) return [];
        return [
          {
            date,
            query,
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          },
        ];
      });

      await GscHistoryRepository.upsertDailyRows(input.projectId, rows);

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
