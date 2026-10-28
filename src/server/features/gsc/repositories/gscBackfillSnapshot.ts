import { eq } from "drizzle-orm";
import { db } from "@/db";
import { gscArchiveState, gscConnections } from "@/db/schema";

/** Read the property and its cursor from one database snapshot. */
export async function getBackfillSnapshot(projectId: string) {
  const [snapshot] = await db
    .select({ siteUrl: gscConnections.siteUrl, state: gscArchiveState })
    .from(gscConnections)
    .leftJoin(
      gscArchiveState,
      eq(gscArchiveState.projectId, gscConnections.projectId),
    )
    .where(eq(gscConnections.projectId, projectId));
  return snapshot ?? { siteUrl: null, state: null };
}
