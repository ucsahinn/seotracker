import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { reconcileStaleAudits } from "@/server/features/audit/services/auditReconciler";
import { getAuthMode } from "@/lib/auth-mode";
import {
  publicHostsOf,
  requestWithPublicOrigin,
} from "@/server/mcp/public-origin";
import { MCP_ROUTE } from "@/server/mcp/context";
import { handleSelfHostedMcpRequest } from "@/server/mcp/transport";
import { enableDemoGoogle } from "@/server/dev/demoGoogle";
import { resolveLocale } from "@/shared/i18n";
import { runWithLocale } from "@/server/localeScope";
import { hostGuardRejection } from "@/server/lib/host-guard";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";

const startHandler = createStartHandler(defaultStreamHandler);

// The app ships no security response headers of its own, so any third-party
// page can frame an app route and UI-redress a one-click action (delete a
// project, change project settings). `frame-ancestors 'self'` on the app's own
// documents is the whole fix, and deliberately all of it: a script-src policy
// would need a nonce for the inline bootstrap script in __root.tsx, which is
// separate, larger work.
//
// Only HTML documents, and only ones that carry no policy of their own, so a
// route that sets its own stricter CSP keeps it (two CSP headers intersect, so
// adding a second could only confuse things).
async function appFetch(request: Request): Promise<Response> {
  const response = await startHandler(request);
  const contentType = response.headers.get("content-type") ?? "";
  if (
    !contentType.startsWith("text/html") ||
    response.headers.has("content-security-policy")
  ) {
    return response;
  }
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", "frame-ancestors 'self'");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetch(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  // Developer-only: `.dev.vars` sets DEMO_GOOGLE=1 for the demo project.
  enableDemoGoogle(env.DEMO_GOOGLE === "1");
  const authMode = getAuthMode(env.AUTH_MODE);
  // Read the way MCP_TOKEN is: Docker hands these over through the process
  // environment, the Windows launcher through server.env.
  const [allowedHost, authUrl] = await Promise.all([
    getOptionalEnvValue("ALLOWED_HOST"),
    getOptionalEnvValue("BETTER_AUTH_URL"),
  ]);
  const hostRejection = hostGuardRejection(request, authMode, {
    allowedHost,
    authUrl,
  });
  if (hostRejection) return hostRejection;
  // Forwarded headers are a proxy's to set; without a configured public
  // name there is no proxy, and any caller could claim an origin.
  const publicHosts = publicHostsOf(allowedHost, authUrl);
  const publicRequest = requestWithPublicOrigin(request, publicHosts);
  const pathname = new URL(publicRequest.url).pathname;

  /*
   * The UI language for this request, scoped to it (src/server/localeScope.ts)
   * so concurrent requests never share one. Agents always get Turkish, as
   * they did before the app spoke English.
   */
  if (pathname === MCP_ROUTE) {
    return runWithLocale("tr", () =>
      handleSelfHostedMcpRequest(
        publicRequest,
        authMode,
        env,
        ctx,
        publicHosts,
      ),
    );
  }
  const locale = resolveLocale(
    request.headers.get("cookie"),
    request.headers.get("accept-language"),
  );
  return runWithLocale(locale, () => appFetch(request));
}

export default {
  fetch,
  async scheduled(
    _controller: ScheduledController,
    _env: Env,
    _ctx: ExecutionContext,
  ) {
    // Watchdog: reconcile audits stuck in "running" whose workflow died without
    // reaching mark-failed (OOM/CPU kills, expired instances). No request
    // scope here, so any text it writes is Turkish, the i18n fallback.
    await reconcileStaleAudits();
  },
};
