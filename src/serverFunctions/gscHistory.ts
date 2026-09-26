import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import { requireProjectContext } from "@/serverFunctions/middleware";

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

const trackedQueriesSchema = projectSchema.extend({
  /** Window in days. 90 covers a quarter, which is where trends become real. */
  days: z.number().int().min(7).max(MAX_ARCHIVE_DAYS).default(90),
  limit: z.number().int().min(1).max(100).default(25),
});

const queryHistorySchema = projectSchema.extend({
  query: z.string().min(1),
  days: z.number().int().min(7).max(MAX_ARCHIVE_DAYS).default(90),
});

function sinceDate(days: number): string {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
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
      limit: data.limit,
    });
    return { rows, days: data.days };
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
