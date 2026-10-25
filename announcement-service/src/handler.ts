import { adminPage } from "./admin";
import { handleAdminApiRequest } from "./admin-api";
import { handlePublicFeed, handlePublicResponse } from "./public-api";
import type { AnnouncementRepository } from "./repository";
import { bearer, cors, json } from "./service-utils";

export function createAnnouncementHandler(
  repository: AnnouncementRepository,
  options: {
    adminToken: string | undefined;
    now?: () => Date;
    responseLimiter?: {
      limit(input: { key: string }): Promise<{ success: boolean }>;
    };
  },
): (request: Request) => Promise<Response> {
  const now = options.now ?? (() => new Date());
  return async (request) => {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const responseMatch =
      /^\/api\/announcements\/([a-zA-Z0-9-]+)\/responses$/.exec(url.pathname);

    if (method === "OPTIONS" && url.pathname === "/api/announcements")
      return new Response(null, { status: 204, headers: cors() });
    if (method === "OPTIONS" && responseMatch)
      return new Response(null, {
        status: 204,
        headers: cors({
          "access-control-allow-methods": "POST",
          "access-control-allow-headers": "content-type",
        }),
      });
    if (url.pathname === "/health" && method === "GET")
      return json({ ok: true });
    if (url.pathname === "/admin" && method === "GET")
      return new Response(adminPage, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "content-security-policy":
            "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
          "x-content-type-options": "nosniff",
          "referrer-policy": "no-referrer",
        },
      });
    if (responseMatch && method === "POST")
      return handlePublicResponse(
        request,
        responseMatch[1],
        repository,
        now,
        options.responseLimiter,
      );
    if (url.pathname === "/api/announcements" && method === "GET")
      return handlePublicFeed(request, repository, now);

    const isAdminPath =
      url.pathname.startsWith("/api/admin/announcements") ||
      url.pathname.startsWith("/api/admin/responses");
    if (!isAdminPath) return json({ error: "Not found" }, 404);
    if (!bearer(request, options.adminToken))
      return json({ error: "Unauthorized" }, 401, {
        "www-authenticate": "Bearer",
      });
    return handleAdminApiRequest(request, repository, now);
  };
}
