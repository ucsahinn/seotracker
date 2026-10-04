import { and, eq, exists, ne, sql, type SQL } from "drizzle-orm";
import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
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
  // The archive and the inspection cache are keyed by project, not by
  // property. Pointing the project at another property must not leave the
  // old one's history behind: the backfill would resume from its last date
  // and the two properties' rows would mix.
  //
  // One batch, so the invalidation and the new mapping land together and the
  // "is this a different property" test is evaluated by the database against
  // the row being replaced, not against an earlier read. It must come before
  // the upsert, which overwrites the site URL it compares with.
  const switched = (projectId: AnySQLiteColumn) =>
    and(
      eq(projectId, input.projectId),
      exists(
        db
          .select({ one: sql`1` })
          .from(gscConnections)
          .where(
            and(
              eq(gscConnections.projectId, input.projectId),
              ne(gscConnections.siteUrl, input.siteUrl),
            ),
          ),
      ),
    );
  await runBatch((tx) => [
    ...propertyDataDeletes(tx, switched),
    tx
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
      }),
  ]);
  const row = await getByProjectId(input.projectId);
  if (!row) {
    throw new Error("Failed to upsert gsc_connection");
  }
  return row;
}

/**
 * The project's per-property data: query archive, its cursor, URL inspections.
 * `where` picks the projects from each table's own project column, so one
 * definition serves a single project and a whole account's projects.
 *
 * The inspection *attempt ledger* is deliberately not here: it is Google's
 * spend for the property, and disconnecting does not refund it.
 */
function propertyDataDeletes(
  tx: typeof db,
  where: (projectId: AnySQLiteColumn) => SQL | undefined,
) {
  return [
    tx.delete(gscQueryDaily).where(where(gscQueryDaily.projectId)),
    tx.delete(gscArchiveState).where(where(gscArchiveState.projectId)),
    tx.delete(gscUrlInspections).where(where(gscUrlInspections.projectId)),
  ];
}

/**
 * Every statement that disconnects projects: their stored property data, then
 * the connections. The one path for a single disconnect and for removing a
 * Google account, so the two cannot drift. Run inside one `runBatch`.
 */
function disconnectStatements(
  tx: typeof db,
  where: (projectId: AnySQLiteColumn) => SQL | undefined,
) {
  return [
    ...propertyDataDeletes(tx, where),
    tx.delete(gscConnections).where(where(gscConnections.projectId)),
  ];
}

/** Disconnecting drops the property's stored data with it (see `upsert`). */
async function deleteByProjectId(projectId: string): Promise<void> {
  await runBatch((tx) =>
    disconnectStatements(tx, (column) => eq(column, projectId)),
  );
}

export const GscConnectionRepository = {
  getByProjectId,
  upsert,
  deleteByProjectId,
  disconnectStatements,
};
