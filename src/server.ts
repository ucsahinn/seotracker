import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { reconcileStaleAudits } from "@/server/features/audit/services/auditReconciler";
import { getAuthMode } from "@/lib/auth-mode";
import { requestWithPublicOrigin } from "@/server/mcp/public-origin";
import { MCP_ROUTE } from "@/server/mcp/context";
import { handleSelfHostedMcpRequest } from "@/server/mcp/transport";
import { enableDemoGoogle } from "@/server/dev/demoGoogle";
import { resolveLocale, setLocale } from "@/shared/i18n";

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

function fetch(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Response | Promise<Response> {
  // Developer-only: `.dev.vars` sets DEMO_GOOGLE=1 for the demo project.
  enableDemoGoogle(env.DEMO_GOOGLE === "1");
  const authMode = getAuthMode(env.AUTH_MODE);
  const publicRequest = requestWithPublicOrigin(request);
  const pathname = new URL(publicRequest.url).pathname;

  /*
   * The UI language for this request, set before anything renders. It is one
   * module-level value rather than per-request state: sound only because this
   * is a single-user local app (see src/shared/i18n.ts). Agents always get
   * Turkish, as they did before the app spoke English.
   */
  if (pathname === MCP_ROUTE) {
    setLocale("tr");
    return handleSelfHostedMcpRequest(publicRequest, authMode, env, ctx);
  }
  setLocale(
    resolveLocale(
      request.headers.get("cookie"),
      request.headers.get("accept-language"),
    ),
  );

  return appFetch(request);
}

export default {
  fetch,
  async scheduled(
    _controller: ScheduledController,
    _env: Env,
    _ctx: ExecutionContext,
  ) {
    // Watchdog: reconcile audits stuck in "running" whose workflow died without
    // reaching mark-failed (OOM/CPU kills, expired instances).
    await reconcileStaleAudits();
  },
};
