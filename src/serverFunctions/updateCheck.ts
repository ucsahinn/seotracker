import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { UpdateCheckService } from "@/server/features/updates/UpdateCheckService";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/**
 * Served from the cached answer, refreshing in the same request only when the
 * cached one is a day old. The Settings page therefore pays a network round
 * trip at most once a day, and never on a page that is merely being reopened.
 */
export const getUpdateStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => UpdateCheckService.getStatus());

/** The explicit button, which ignores the day-old rule. */
export const checkForUpdateNow = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => UpdateCheckService.getStatus({ force: true }));

export const setUpdateCheckEnabled = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(z.object({ enabled: z.boolean() }))
  .handler(async ({ data }) => UpdateCheckService.setEnabled(data.enabled));
