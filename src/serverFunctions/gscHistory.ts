import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import {
  readRankingArchive,
  readRankingQueryArchive,
} from "@/server/features/gsc/services/rankingArchiveRead";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { gscHistoryWindow, isoDaysInclusive } from "@/shared/dataFreshness";

const projectSchema = z.object({ projectId: z.string().min(1) });
const windowSchema = projectSchema
  .extend({
    days: z.number().int().min(7).max(1825).default(90),
    startDate: z.iso.date().optional(),
    endDate: z.iso.date().optional(),
  })
  .refine(
    (input) =>
      (!input.startDate && !input.endDate) ||
      (!!input.startDate &&
        !!input.endDate &&
        isoDaysInclusive(input.startDate, input.endDate) >= 1 &&
        isoDaysInclusive(input.startDate, input.endDate) <= 1825 &&
        input.endDate <= gscHistoryWindow(1).endDate),
    "Invalid archive window",
  );
const trackedQueriesSchema = windowSchema.safeExtend({
  limit: z.number().int().min(1).max(100).default(25),
  offset: z.number().int().min(0).max(10_000_000).default(0),
  search: z.string().max(500).optional(),
  band: z.enum(["top3", "top10", "top20", "beyond"]).optional(),
  move: z.enum(["risers", "fallers", "top10", "lost"]).optional(),
  chip: z.enum(["firstPage", "highImpressions", "noClicks"]).optional(),
  sort: z
    .enum(["query", "position", "delta", "impressions", "clicks", "days"])
    .optional(),
  desc: z.boolean().optional(),
});
const queryHistorySchema = windowSchema.safeExtend({
  query: z.string().min(1).max(500),
});

export const syncGscHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(projectSchema)
  .handler(async ({ context }) => {
    const outcome = await GscHistoryService.backfill({
      projectId: context.projectId,
    });
    const status = await GscHistoryService.getStatus(context.projectId);
    return { ...outcome, ...status };
  });

export const getTrackedQueries = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(trackedQueriesSchema)
  .handler(({ data, context }) =>
    readRankingArchive({ ...data, projectId: context.projectId }),
  );

export const getQueryHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(queryHistorySchema)
  .handler(async ({ data, context }) => {
    return readRankingQueryArchive({ ...data, projectId: context.projectId });
  });
