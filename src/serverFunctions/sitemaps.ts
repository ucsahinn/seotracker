import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GscSitemapService } from "@/server/features/gsc/services/GscSitemapService";
import { requireProjectContext } from "@/serverFunctions/middleware";

/**
 * Google's view of this property's sitemaps.
 *
 * "Not connected" and "you may not list these" come back as values rather
 * than exceptions, matching `getGa4Report` and `getSearchOpportunities`:
 * both are expected states a screen has to render differently, and a thrown
 * error reaches the client reduced to a generic code that cannot tell them
 * apart.
 */
export const getSitemapReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(z.object({ projectId: z.string().min(1) }))
  .handler(({ context }) => GscSitemapService.getSitemaps(context.projectId));
