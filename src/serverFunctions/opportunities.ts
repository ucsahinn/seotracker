import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SearchOpportunityService } from "@/server/features/ga4/services/SearchOpportunityService";
import { requireProjectContext } from "@/serverFunctions/middleware";

const schema = z.object({
  projectId: z.string().min(1),
  limit: z.number().int().min(1).max(100).default(50),
});

/**
 * The scoring engine already existed and was reachable only through MCP, so
 * this is the same call an agent makes, handed to the page.
 */
export const getSearchOpportunities = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(({ context, data }) =>
    SearchOpportunityService.getOpportunities({
      projectId: context.projectId,
      limit: data.limit,
    }),
  );
