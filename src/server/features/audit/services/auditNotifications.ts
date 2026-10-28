import { z } from "zod";
import { getAuditNotifications } from "../repositories/auditNotifications";

const cursorSchema = z.object({
  finishedAt: z.string().datetime(),
  id: z.string().max(128),
});

export async function getAuditNotificationFeed(
  organizationId: string,
  rawCursor: string | null,
) {
  const cursor = rawCursor
    ? cursorSchema.parse(JSON.parse(rawCursor))
    : undefined;
  const rows = await getAuditNotifications(organizationId, cursor);
  const last = rows.at(-1);
  return {
    cursor: last
      ? { finishedAt: last.finishedAt, id: last.id }
      : (cursor ?? { finishedAt: "1970-01-01T00:00:00.000Z", id: "" }),
    events: cursor
      ? rows.map((row) => ({
          id: row.id,
          projectName: row.projectName,
          outcome: row.outcome,
          pagesCrawled: row.pagesCrawled,
          issueCounts: {
            critical: row.critical,
            warning: row.warning,
            info: row.info,
          },
          finishedAt: row.finishedAt,
          path: `/p/${encodeURIComponent(row.projectId)}/audit?auditId=${encodeURIComponent(row.id)}`,
        }))
      : [],
  };
}
