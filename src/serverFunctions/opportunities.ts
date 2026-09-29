import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SearchOpportunityService } from "@/server/features/ga4/services/SearchOpportunityService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";

const schema = z.object({
  projectId: z.string().min(1),
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
 * The scoring engine already existed and was reachable only through MCP, so
 * this is the same call an agent makes, handed to the page.
 *
 * "Not connected" comes back as a value rather than an exception. It is the
 * expected first state, not a failure, and throwing lost the distinction: the
 * error reaching the client is reduced to a generic code, so the page could
 * not tell which of the two integrations was missing and always named Search
 * Console - including for someone who had Search Console connected.
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
      });
      return { status: "ok" as const, report };
    } catch (error) {
      if (
        error instanceof Ga4ReportError &&
        error.code === "ga4_not_connected"
      ) {
        return { status: "needs_ga4" as const };
      }
      if (error instanceof GscNotConnectedError) {
        return { status: "needs_gsc" as const };
      }
      throw error;
    }
  });
