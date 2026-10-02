import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  gscArchiveState,
  gscConnections,
  gscQueryDaily,
  gscUrlInspections,
} from "@/db/schema";
import { runBatch } from "@/db/runBatch";

export type GscConnection = typeof gscConnections.$inferSelect;

async function getByProjectId(
  projectId: string,
): Promise<GscConnection | null> {
  const rows = await db
    .select()
    .from(gscConnections)
    .where(eq(gscConnections.projectId, projectId))
    .limit(1);
  return rows[0] ?? null;
}

async function upsert(input: {
  projectId: string;
  organizationId: string;
  siteUrl: string;
  connectedByUserId: string;
  gscAccountId: string;
  connectedAccountEmail: string | null;
}): Promise<GscConnection> {
  // The archive and the inspection ledger are keyed by project, not by
  // property. Pointing the project at another property must not leave the
  // old one's history behind: the backfill would resume from its last date
  // and the two properties' rows would mix.
  const previous = await getByProjectId(input.projectId);
  if (previous && previous.siteUrl !== input.siteUrl) {
    await runBatch((tx) => propertyDataDeletes(tx, input.projectId));
  }
  const [row] = await db
    .insert(gscConnections)
    .values({ id: crypto.randomUUID(), ...input })
    .onConflictDoUpdate({
      target: gscConnections.projectId,
      set: {
        siteUrl: input.siteUrl,
        organizationId: input.organizationId,
        connectedByUserId: input.connectedByUserId,
        gscAccountId: input.gscAccountId,
        connectedAccountEmail: sql`case
          when ${gscConnections.connectedByUserId} = ${input.connectedByUserId}
            and ${gscConnections.gscAccountId} = ${input.gscAccountId}
          then coalesce(${input.connectedAccountEmail}, ${gscConnections.connectedAccountEmail})
          else ${input.connectedAccountEmail}
        end`,
        updatedAt: sql`(current_timestamp)`,
      },
    })
    .returning();
  if (!row) {
    throw new Error("Failed to upsert gsc_connection");
  }
  return row;
}

/** The project's per-property data: query archive, its cursor, URL inspections. */
function propertyDataDeletes(tx: typeof db, projectId: string) {
  return [
    tx.delete(gscQueryDaily).where(eq(gscQueryDaily.projectId, projectId)),
    tx.delete(gscArchiveState).where(eq(gscArchiveState.projectId, projectId)),
    tx
      .delete(gscUrlInspections)
      .where(eq(gscUrlInspections.projectId, projectId)),
  ];
}

/** Disconnecting drops the property's stored data with it (see `upsert`). */
async function deleteByProjectId(projectId: string): Promise<void> {
  await runBatch((tx) => [
    tx.delete(gscConnections).where(eq(gscConnections.projectId, projectId)),
    ...propertyDataDeletes(tx, projectId),
  ]);
}

export const GscConnectionRepository = {
  getByProjectId,
  upsert,
  deleteByProjectId,
};
