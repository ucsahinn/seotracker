import { and, asc, desc, eq, gt, inArray, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { auditIssues, audits, projects } from "@/db/schema";

type AuditNotificationCursor = { finishedAt: string; id: string };

export async function getAuditNotifications(
  organizationId: string,
  cursor?: AuditNotificationCursor,
) {
  const rows = await db
    .select({
      id: audits.id,
      projectId: audits.projectId,
      projectName: projects.name,
      outcome: audits.status,
      pagesCrawled: audits.pagesCrawled,
      finishedAt: audits.completedAt,
      critical: sql<number>`(select count(*) from ${auditIssues} where ${auditIssues.auditId} = ${audits.id} and ${auditIssues.severity} = 'critical')`,
      warning: sql<number>`(select count(*) from ${auditIssues} where ${auditIssues.auditId} = ${audits.id} and ${auditIssues.severity} = 'warning')`,
      info: sql<number>`(select count(*) from ${auditIssues} where ${auditIssues.auditId} = ${audits.id} and ${auditIssues.severity} = 'info')`,
    })
    .from(audits)
    .innerJoin(projects, eq(audits.projectId, projects.id))
    .where(
      and(
        eq(projects.organizationId, organizationId),
        inArray(audits.status, ["completed", "failed"]),
        cursor
          ? or(
              gt(audits.completedAt, cursor.finishedAt),
              and(
                eq(audits.completedAt, cursor.finishedAt),
                gt(audits.id, cursor.id),
              ),
            )
          : sql`${audits.completedAt} is not null`,
      ),
    )
    .orderBy(
      cursor ? asc(audits.completedAt) : desc(audits.completedAt),
      cursor ? asc(audits.id) : desc(audits.id),
    )
    .limit(cursor ? 100 : 1);
  return rows;
}
