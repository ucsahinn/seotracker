import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { GSC_DATA_LAG_DAYS } from "@/shared/dataFreshness";

const projectSchema = z.object({ projectId: z.string().min(1) });

/*
 * Five years, matching `get_ranking_history` on the MCP side. The cap was
 * 480 days -- about 15.8 months, which is roughly what Search Console itself
 * still serves, so the screen stopped at exactly the window this archive
 * exists to outlive. The agent surface was raised and the screen was not,
 * which left the oldest months readable only by an agent. The repository has
 * no bound; this is a limit on response size, not on the idea.
 */
const MAX_ARCHIVE_DAYS = 1825;
/** Ceiling for one tracked-queries fetch; the client paginates below it. */
const TRACKED_QUERY_LIMIT = 500;

const trackedQueriesSchema = projectSchema.extend({
  /** Window in days. 90 covers a quarter, which is where trends become real. */
  days: z.number().int().min(7).max(MAX_ARCHIVE_DAYS).default(90),
  /*
   * The screen holds its whole set and paginates in the browser, the way
   * the search-performance tables do. It used to ask for 25 and show them
   * with no pagination and nothing saying 25 was a cut -- so an archive of
   * four hundred queries looked like an archive of twenty-five. These rows
   * are already aggregated by query in SQLite, so a larger fetch is cheap.
   */
  limit: z.number().int().min(1).max(TRACKED_QUERY_LIMIT).default(25),
});

const queryHistorySchema = projectSchema.extend({
  query: z.string().min(1),
  days: z.number().int().min(7).max(MAX_ARCHIVE_DAYS).default(90),
});

/*
 * Counted back from the newest day Search Console has finalised, not from
 * today. The archive this reads only ever reaches `today - GSC_DATA_LAG_DAYS`
 * because that is as far as the backfill goes, so counting from today made a
 * "30 gün" selection cover 27 days of data -- and every window was short by
 * the same three days, which is invisible until two screens are compared.
 */
function sinceDate(days: number): string {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - GSC_DATA_LAG_DAYS - (days - 1));
  return since.toISOString().slice(0, 10);
}

/**
 * Catch the archive up and report where it stands. Called when the ranking
 * page opens, and a caught-up archive still costs one small request: the
 * service rewinds into the window Search Console is still revising so the
 * tail is not frozen at its first, partial reading. The client caches this
 * for a minute, which is what keeps it safe on every view.
 */
export const syncGscHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(projectSchema)
  .handler(async ({ context }) => {
    const outcome = await GscHistoryService.backfill({
      projectId: context.projectId,
    });
    const status = await GscHistoryService.getStatus(context.projectId);
    return { ...status, ...outcome };
  });

export const getTrackedQueries = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(trackedQueriesSchema)
  .handler(async ({ data, context }) => {
    const rows = await GscHistoryService.getTrackedQueries({
      projectId: context.projectId,
      since: sinceDate(data.days),
      limit: data.limit + 1,
    });
    // One extra row so the screen can say the set was capped instead of
    // presenting a truncated list as the whole archive.
    return {
      rows: rows.slice(0, data.limit),
      truncated: rows.length > data.limit,
      days: data.days,
    };
  });

export const getQueryHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(queryHistorySchema)
  .handler(async ({ data, context }) => {
    const rows = await GscHistoryService.getQueryHistory({
      projectId: context.projectId,
      query: data.query,
      since: sinceDate(data.days),
    });
    return { query: data.query, rows };
  });
