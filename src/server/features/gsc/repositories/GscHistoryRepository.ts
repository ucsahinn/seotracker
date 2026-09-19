import { and, asc, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { gscArchiveState, gscQueryDaily } from "@/db/schema";

type GscDailyRow = {
  date: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

async function getArchiveState(projectId: string) {
  return (
    (await db.query.gscArchiveState.findFirst({
      where: eq(gscArchiveState.projectId, projectId),
    })) ?? null
  );
}

/**
 * Store one fetch's worth of daily rows. Conflicts overwrite: a re-fetched day
 * is the same day measured again, and Search Console revises recent days as
 * late data lands.
 */
async function upsertDailyRows(
  projectId: string,
  rows: GscDailyRow[],
): Promise<void> {
  if (rows.length === 0) return;
  const fetchedAt = new Date().toISOString();

  await executeInBatches(rows, (tx, row) =>
    tx
      .insert(gscQueryDaily)
      .values({ projectId, ...row, fetchedAt })
      .onConflictDoUpdate({
        target: [
          gscQueryDaily.projectId,
          gscQueryDaily.date,
          gscQueryDaily.query,
        ],
        set: {
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
          fetchedAt,
        },
      }),
  );
}

/** Record how far the archive reaches, in the same write as the rows' outcome. */
async function markRun(input: {
  projectId: string;
  earliestDate: string | null;
  lastDate: string | null;
  error: string | null;
}): Promise<void> {
  const lastRunAt = new Date().toISOString();
  await runBatch((tx) => [
    tx
      .insert(gscArchiveState)
      .values({
        projectId: input.projectId,
        earliestDate: input.earliestDate,
        lastDate: input.lastDate,
        lastRunAt,
        lastError: input.error,
      })
      .onConflictDoUpdate({
        target: gscArchiveState.projectId,
        set: {
          // Keep the widest window seen: a failed narrow run must not shrink it.
          earliestDate: sql`min(coalesce(${gscArchiveState.earliestDate}, ${input.earliestDate}), coalesce(${input.earliestDate}, ${gscArchiveState.earliestDate}))`,
          lastDate: sql`max(coalesce(${gscArchiveState.lastDate}, ${input.lastDate}), coalesce(${input.lastDate}, ${gscArchiveState.lastDate}))`,
          lastRunAt,
          lastError: input.error,
        },
      }),
  ]);
}

/** Every stored day for one query, oldest first — the ranking history. */
async function getQueryHistory(input: {
  projectId: string;
  query: string;
  since?: string;
}): Promise<GscDailyRow[]> {
  const clauses = [
    eq(gscQueryDaily.projectId, input.projectId),
    eq(gscQueryDaily.query, input.query),
  ];
  if (input.since) clauses.push(gte(gscQueryDaily.date, input.since));

  return db
    .select({
      date: gscQueryDaily.date,
      query: gscQueryDaily.query,
      clicks: gscQueryDaily.clicks,
      impressions: gscQueryDaily.impressions,
      ctr: gscQueryDaily.ctr,
      position: gscQueryDaily.position,
    })
    .from(gscQueryDaily)
    .where(and(...clauses))
    .orderBy(asc(gscQueryDaily.date));
}

/**
 * The queries worth tracking: most impressions over the stored window, with
 * their position at each end of it so a caller can see which way they moved.
 */
async function getTrackedQueries(input: {
  projectId: string;
  since: string;
  limit: number;
}) {
  return db
    .select({
      query: gscQueryDaily.query,
      clicks: sql<number>`sum(${gscQueryDaily.clicks})`,
      impressions: sql<number>`sum(${gscQueryDaily.impressions})`,
      // Impression-weighted, so a day with 2 impressions cannot outvote a day
      // with 2,000 the way a plain average would.
      position: sql<number>`sum(${gscQueryDaily.position} * ${gscQueryDaily.impressions}) / nullif(sum(${gscQueryDaily.impressions}), 0)`,
      days: sql<number>`count(*)`,
      firstDate: sql<string>`min(${gscQueryDaily.date})`,
      lastDate: sql<string>`max(${gscQueryDaily.date})`,
    })
    .from(gscQueryDaily)
    .where(
      and(
        eq(gscQueryDaily.projectId, input.projectId),
        gte(gscQueryDaily.date, input.since),
      ),
    )
    .groupBy(gscQueryDaily.query)
    .orderBy(desc(sql`sum(${gscQueryDaily.impressions})`))
    .limit(input.limit);
}

/** Row count, for telling the operator how much history exists. */
async function countRows(projectId: string): Promise<number> {
  const [row] = await db
    .select({ value: sql<number>`count(*)` })
    .from(gscQueryDaily)
    .where(eq(gscQueryDaily.projectId, projectId));
  return row?.value ?? 0;
}

export const GscHistoryRepository = {
  getArchiveState,
  upsertDailyRows,
  markRun,
  getQueryHistory,
  getTrackedQueries,
  countRows,
};
