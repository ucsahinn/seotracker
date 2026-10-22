import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { UpdateCheckService } from "@/server/features/updates/UpdateCheckService";
import { getInstallKind } from "@/server/lib/install-kind";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/**
 * How this install was set up decides what "update" means on the Settings
 * page: the Windows package (its launcher writes INSTALL_KIND=windows into
 * server.env) updates itself from the tray icon, everything else is a git
 * checkout updated with a docker compose command.
 */
async function withInstallKind<T extends object>(status: T) {
  return { ...status, installKind: await getInstallKind() };
}

/**
 * Served from the cached answer, refreshing in the same request only when the
 * cached one is a day old. The Settings page therefore pays a network round
 * trip at most once a day, and never on a page that is merely being reopened.
 */
export const getUpdateStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => withInstallKind(await UpdateCheckService.getStatus()));

/** The explicit button, which ignores the day-old rule. */
export const checkForUpdateNow = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () =>
    withInstallKind(await UpdateCheckService.getStatus({ force: true })),
  );

export const setUpdateCheckEnabled = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(z.object({ enabled: z.boolean() }))
  .handler(async ({ data }) =>
    withInstallKind(await UpdateCheckService.setEnabled(data.enabled)),
  );
