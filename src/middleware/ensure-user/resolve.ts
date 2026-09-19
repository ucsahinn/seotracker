import { env } from "cloudflare:workers";
import { getAuthMode } from "@/lib/auth-mode";
import { resolveCloudflareAccessContext } from "./cloudflareAccess";
import { resolveLocalNoAuthContext } from "./delegated";
import type { EnsuredUserContext } from "./types";

// Resolves the authenticated user for a request's headers. Shared by
// ensureUserMiddleware (server functions) and raw API routes, which can't use
// function middleware.
export async function resolveUserContextFromHeaders(
  headers: Headers,
): Promise<EnsuredUserContext> {
  const authMode = getAuthMode(env.AUTH_MODE);
  if (authMode === "local_noauth") {
    return resolveLocalNoAuthContext();
  }
  return resolveCloudflareAccessContext(headers);
}
