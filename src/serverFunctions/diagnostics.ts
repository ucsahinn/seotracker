import { createServerFn } from "@tanstack/react-start";
import { collectDiagnostics } from "@/server/features/diagnostics/collectDiagnostics";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/**
 * The server half of the diagnostics bundle.
 *
 * Authenticated, not open like `/api/health`: health answers "is the
 * container up" for a Docker probe and says nothing about content, while
 * this names projects, domains and connected properties. Same install,
 * different question, different door.
 */
export const getDiagnostics = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(() => collectDiagnostics());
