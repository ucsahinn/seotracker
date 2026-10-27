import { and, eq, exists, gte, lte, sql } from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { gscConnections, gscQueryDaily } from "@/db/schema";
import { queryDailyStage } from "./queryDailyStage";
import type { GscDailyRow } from "./GscHistoryRepository";

/** Stage a complete fetch, then publish the entire window in one D1 batch. */
export async function replaceDailyRows(
  projectId: string,
  siteUrl: string,
  rows: GscDailyRow[],
  since: string,
  until: string,
): Promise<void> {
  const runId = crypto.randomUUID();
  const fetchedAt = new Date().toISOString();
  // Reclaim unpublished rows left by an interrupted invocation, never a recent run.
  await db
    .delete(queryDailyStage)
    .where(
      sql`${queryDailyStage.fetchedAt} < ${new Date(Date.now() - 86_400_000).toISOString()}`,
    );
  try {
    await executeInBatches(rows, (tx, row) =>
      tx.insert(queryDailyStage).values({ ...row, runId, fetchedAt }),
    );
    const connected = exists(
      db
        .select({ one: sql`1` })
        .from(gscConnections)
        .where(
          and(
            eq(gscConnections.projectId, projectId),
            eq(gscConnections.siteUrl, siteUrl),
          ),
        ),
    );
    await runBatch((tx) => [
      tx
        .delete(gscQueryDaily)
        .where(
          and(
            eq(gscQueryDaily.projectId, projectId),
            gte(gscQueryDaily.date, since),
            lte(gscQueryDaily.date, until),
            connected,
          ),
        ),
      tx.insert(gscQueryDaily).select(
        tx
          .select({
            projectId: sql<string>`${projectId}`.as("project_id"),
            date: queryDailyStage.date,
            query: queryDailyStage.query,
            clicks: queryDailyStage.clicks,
            impressions: queryDailyStage.impressions,
            ctr: queryDailyStage.ctr,
            position: queryDailyStage.position,
            fetchedAt: queryDailyStage.fetchedAt,
          })
          .from(queryDailyStage)
          .where(
            and(
              eq(queryDailyStage.runId, runId),
              gte(queryDailyStage.date, since),
              lte(queryDailyStage.date, until),
              connected,
            ),
          ),
      ),
    ]);
  } finally {
    await db.delete(queryDailyStage).where(eq(queryDailyStage.runId, runId));
  }
}
