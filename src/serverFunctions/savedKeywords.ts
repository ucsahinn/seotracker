import { z } from "zod";
import { savedWatchlistSchema } from "@/shared/savedWatchlist";
import {
  readSavedWatchlist,
  readSavedHistory,
} from "@/server/features/keywords/services/SavedWatchlistService";
import { createServerFn } from "@tanstack/react-start";
import {
  deleteSavedKeywordTagSchema,
  saveKeywordsSchema,
  getSavedKeywordsSchema,
  exportSavedKeywordsSchema,
  removeSavedKeywordsSchema,
  updateSavedKeywordTagSchema,
  updateSavedKeywordTagsSchema,
} from "@/types/schemas/keywords";
import { KeywordResearchService } from "@/server/features/keywords/services/KeywordResearchService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { resolveMarket } from "@/shared/keyword-locations";

export const saveKeywords = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(saveKeywordsSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.saveKeywords({
      ...data,
      ...resolveMarket(data, context.project),
      projectId: context.projectId,
    });
  });

export const getSavedKeywords = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(getSavedKeywordsSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.getSavedKeywords({
      ...data,
      projectId: context.projectId,
    });
  });

/** @public Inventory-only RPC retained for compatibility with existing consumers. */
export const exportSavedKeywords = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(exportSavedKeywordsSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.exportSavedKeywords({
      ...data,
      projectId: context.projectId,
    });
  });

export const updateSavedKeywordTags = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(updateSavedKeywordTagsSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.updateSavedKeywordTags({
      ...data,
      projectId: context.projectId,
    });
  });

export const updateSavedKeywordTag = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(updateSavedKeywordTagSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.updateSavedKeywordTag({
      ...data,
      projectId: context.projectId,
    });
  });

export const deleteSavedKeywordTag = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(deleteSavedKeywordTagSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.deleteSavedKeywordTag({
      ...data,
      projectId: context.projectId,
    });
  });

export const removeSavedKeywords = createServerFn({
  method: "POST",
})
  .middleware(requireProjectContext)
  .validator(removeSavedKeywordsSchema)
  .handler(async ({ data, context }) => {
    return KeywordResearchService.removeSavedKeywords(context.projectId, data);
  });

export const getSavedWatchlist = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(savedWatchlistSchema)
  .handler(({ data, context }) =>
    readSavedWatchlist({ ...data, projectId: context.projectId }),
  );

export const getSavedHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(savedWatchlistSchema.extend({ savedId: z.string().min(1) }))
  .handler(({ data, context }) =>
    readSavedHistory({ ...data, projectId: context.projectId }),
  );
