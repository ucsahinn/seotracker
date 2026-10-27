import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SearchOpportunityService } from "@/server/features/ga4/services/SearchOpportunityService";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";
import { WORK_KINDS } from "@/shared/pageOpportunities";

const schema = z.object({
  projectId: z.string().min(1),
  work: z.enum(WORK_KINDS).optional(),
  quick: z.enum(["converts", "no_conversions"]).optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  // Matches the ceiling SearchOpportunityService enforces; 250 here only
  // moved the failure from a validation message to a thrown error.
  limit: z.number().int().min(1).max(100).default(50),
  /*
   * The window was a literal inside the service with no way to pass one, so
   * this screen was the only data screen in the app with no period control
   * at all. Same three options the search-performance and analytics screens
   * offer, so the vocabulary matches across the app.
   */
  windowDays: z
    .union([z.literal(7), z.literal(28), z.literal(90)])
    .default(DEFAULT_WINDOW_DAYS),
});

/**
 * The same call an agent makes through MCP, handed to the page.
 *
 * "Not connected" comes back as a value rather than an exception: it is the
 * expected first state, not a failure, and an exception reaching the client
 * is reduced to a generic code. Only Search Console is required; Analytics
 * is the secondary factor and the report says when it is missing.
 */
export const getSearchOpportunities = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(async ({ context, data }) => {
    try {
      const report = await SearchOpportunityService.getOpportunities({
        projectId: context.projectId,
        limit: data.limit,
        windowDays: data.windowDays,
        work: data.work,
        quick: data.quick,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      return { status: "ok" as const, report };
    } catch (error) {
      if (error instanceof GscNotConnectedError) {
        return { status: "needs_gsc" as const };
      }
      throw error;
    }
  });
