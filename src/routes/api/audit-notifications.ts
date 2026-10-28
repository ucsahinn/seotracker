import { createFileRoute } from "@tanstack/react-router";
import { resolveUserContextFromHeaders } from "@/middleware/ensure-user/resolve";
import { getAuditNotificationFeed } from "@/server/features/audit/services/auditNotifications";

export async function handleAuditNotificationRequest(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  let organizationId: string;
  try {
    ({ organizationId } = await resolveUserContextFromHeaders(request.headers));
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  const cursor = new URL(request.url).searchParams.get("cursor");
  try {
    return Response.json(
      await getAuditNotificationFeed(organizationId, cursor),
      { headers },
    );
  } catch (error) {
    const invalid =
      error instanceof SyntaxError ||
      (error instanceof Error && error.name === "ZodError");
    return Response.json(
      { error: invalid ? "Invalid cursor" : "Unavailable" },
      { status: invalid ? 400 : 503, headers },
    );
  }
}

export const Route = createFileRoute("/api/audit-notifications")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) =>
        handleAuditNotificationRequest(request),
    },
  },
});
