import { sql } from "drizzle-orm";
import { db } from "@/db";
import { gscInspectionAttempts } from "@/db/schema";
import { DAILY_QUOTA } from "@/server/features/gsc/indexCoverage";

/** One SQLite statement checks and spends; concurrent Workers cannot share a slot. */
export async function reserveInspection(
  siteUrl: string,
  now: Date,
): Promise<boolean> {
  const since = new Date(now.getTime() - 86_400_000).toISOString();
  const rows = await db
    .insert(gscInspectionAttempts)
    .select(
      sql`
    SELECT NULL, ${siteUrl}, ${now.toISOString()}
    WHERE (SELECT count(*) FROM ${gscInspectionAttempts}
      WHERE ${gscInspectionAttempts.siteUrl} = ${siteUrl}
      AND ${gscInspectionAttempts.attemptedAt} >= ${since}) < ${DAILY_QUOTA}
  `,
    )
    .returning({ id: gscInspectionAttempts.id });
  return rows.length === 1;
}
