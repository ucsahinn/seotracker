import { createServerFn } from "@tanstack/react-start";
import { getPortFallback } from "@/server/lib/port-fallback";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/** Whether this start runs on another port than the configured one. */
export const getPortFallbackStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(() => getPortFallback());
