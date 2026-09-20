import { createMcpHandler } from "agents/mcp/server";
import {
  hostHeaderValidationResponse,
  isLegacyRequest,
  localhostAllowedHostnames,
  localhostAllowedOrigins,
  originValidationResponse,
  WebStandardStreamableHTTPServerTransport,
} from "@modelcontextprotocol/server";
import { resolveCloudflareAccessContext } from "@/middleware/ensure-user/cloudflareAccess";
import { resolveLocalNoAuthContext } from "@/middleware/ensure-user/delegated";
import {
  createWorkersOAuthMcpProps,
  MCP_ROUTE,
  type McpProps,
} from "@/server/mcp/context";
import { getPublicOrigin } from "@/server/mcp/public-origin";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import { isMcpRequestAuthorized } from "@/server/mcp/token-auth";
import { createMcpServer } from "@/server/mcp/server";

// Mirrors the agents SDK's DEFAULT_CORS_OPTIONS so legacy responses carry the
// same CORS surface as the modern handler's.
const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, mcp-session-id, MCP-Protocol-Version, Mcp-Method, Mcp-Name",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "mcp-session-id",
  "Access-Control-Max-Age": "86400",
} as const;

function withMcpCors(response: Response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(MCP_CORS_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Port of the host/origin validation the agents SDK handler applies to the
// requests it serves; legacy requests bypass that handler, so it runs here.
function validateLegacyRequest(
  request: Request,
  allowedOriginHostnames?: string[],
) {
  const url = new URL(request.url);
  const isLocal = localhostAllowedHostnames().includes(url.hostname);
  const isWorkersDev = url.hostname.endsWith(".workers.dev");
  const acceptedHostnames = isLocal
    ? localhostAllowedHostnames()
    : isWorkersDev
      ? [url.hostname]
      : undefined;
  const hostRejection = acceptedHostnames
    ? hostHeaderValidationResponse(request, acceptedHostnames)
    : undefined;
  if (hostRejection) return withMcpCors(hostRejection);

  const acceptedOrigins =
    allowedOriginHostnames ??
    (isWorkersDev
      ? [...localhostAllowedOrigins(), url.hostname]
      : localhostAllowedOrigins());
  const originRejection = originValidationResponse(request, acceptedOrigins);
  return originRejection ? withMcpCors(originRejection) : undefined;
}

async function handleLegacyJsonRequest(request: Request, props: McpProps) {
  if (request.method !== "POST") {
    return withMcpCors(
      Response.json(
        {
          jsonrpc: "2.0",
          error: { code: -32000, message: "Method not allowed." },
          id: null,
        },
        { status: 405, headers: { Allow: "POST, OPTIONS" } },
      ),
    );
  }

  // The SDK's own legacy fallbacks (agents' compat lane, the MCP SDK's
  // legacyStatelessFallback) construct this transport without
  // enableJsonResponse, which answers with an SSE stream and retains the
  // per-request server plus a keepalive for the response lifetime. JSON mode
  // buffers the response and lets the finally below tear everything down
  // before the request completes. JSON mode silently drops server-to-client
  // requests (sampling/elicitation) and would hang the buffered response —
  // no tool here issues them.
  const server = createMcpServer(props);
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    return withMcpCors(await transport.handleRequest(request));
  } finally {
    await Promise.all([
      transport.close().catch(() => {}),
      server.close().catch(() => {}),
    ]);
  }
}

// No origin allowlist is passed, so the handler's localhost-class default
// applies. An allowlist derived from the request's own Host would accept a
// DNS-rebinding page trivially. Non-browser MCP clients send no Origin and are
// unaffected either way.
function createRequestHandler(props: McpProps) {
  const allowedOriginHostnames: string[] | undefined = undefined;
  const modernHandler = createMcpHandler(() => createMcpServer(props), {
    route: MCP_ROUTE,
    allowedOriginHostnames,
    legacy: "reject",
    // MCP serving is strictly stateless: no notification is ever published,
    // so refuse subscriptions/listen outright (in-band -32603 before the
    // ack). The SSE streams it would otherwise hold open pin isolates for
    // hours and turn every isolate death into a burst of exceededMemory
    // request outcomes (EVE-95).
    maxSubscriptions: 0,
  });

  return async (request: Request, env: unknown, ctx: ExecutionContext) => {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: MCP_CORS_HEADERS });
    }
    if (new URL(request.url).pathname !== MCP_ROUTE) {
      return withMcpCors(new Response("Not Found", { status: 404 }));
    }
    if (!(await isLegacyRequest(request))) {
      return modernHandler(request, env, ctx);
    }

    const rejection = validateLegacyRequest(request, allowedOriginHostnames);
    return rejection ?? handleLegacyJsonRequest(request, props);
  };
}

// Hosted credentials (OAuth grants and API keys) are user-scoped: the
// organizationId they carry is only the fallback context for tools with no
// project argument, so keep it while the membership holds, else rebind to the
/**
 * 401 when `MCP_TOKEN` is set and the request does not carry it. The decision
 * itself is in `token-auth.ts`; this is the I/O and the response shape.
 */
async function mcpTokenRejection(request: Request): Promise<Response | null> {
  const expected = await getOptionalEnvValue("MCP_TOKEN");
  if (isMcpRequestAuthorized(request.headers.get("authorization"), expected)) {
    return null;
  }

  return withMcpCors(
    new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message:
            "Unauthorized. This server has MCP_TOKEN set; send it as `Authorization: Bearer <token>`.",
        },
        id: null,
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
          "www-authenticate": 'Bearer realm="seotracker"',
        },
      },
    ),
  );
}

export async function handleSelfHostedMcpRequest(
  request: Request,
  authMode: "cloudflare_access" | "local_noauth",
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  // Preflight does not carry an authenticated application context.
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: MCP_CORS_HEADERS });
  }

  const unauthorized = await mcpTokenRejection(request);
  if (unauthorized) return unauthorized;

  const identity =
    authMode === "local_noauth"
      ? await resolveLocalNoAuthContext()
      : await resolveCloudflareAccessContext(request.headers);
  const props = createWorkersOAuthMcpProps({
    userId: identity.userId,
    userEmail: identity.userEmail,
    organizationId: identity.organizationId,
    baseUrl: getPublicOrigin(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return createRequestHandler(props)(request, env, ctx);
}
