import { and, asc, desc, eq, gte, lte, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { gscArchiveState, gscConnections, gscQueryDaily } from "@/db/schema";

export type GscDailyRow = {
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
 * The project's connection row, when it still points at the property the data
 * came from. Used as the SELECT of an INSERT ... SELECT, so a write for a
 * property the project has since left matches nothing and is dropped by the
 * database itself, atomically with the check. `siteUrl` null means the caller
 * never got an answer from Google and has no property to hold the write to.
 */
function stillConnectedTo<T extends Record<string, SQL.Aliased>>(
  tx: typeof db,
  fields: T,
  projectId: string,
  siteUrl: string | null,
) {
  return tx
    .select(fields)
    .from(gscConnections)
    .where(
      and(
        eq(gscConnections.projectId, projectId),
        siteUrl === null ? undefined : eq(gscConnections.siteUrl, siteUrl),
      ),
    );
}

/**
 * Store one fetch's worth of daily rows. Conflicts overwrite: a re-fetched day
 * is the same day measured again, and Search Console revises recent days as
 * late data lands. Dropped when the project no longer points at `siteUrl`.
 */
async function upsertDailyRows(
  projectId: string,
  siteUrl: string,
  rows: GscDailyRow[],
): Promise<void> {
  if (rows.length === 0) return;
  const fetchedAt = new Date().toISOString();

  await executeInBatches(rows, (tx, row) =>
    tx
      .insert(gscQueryDaily)
      .select(
        stillConnectedTo(
          tx,
          {
            projectId: sql<string>`${projectId}`.as("project_id"),
            date: sql<string>`${row.date}`.as("date"),
            query: sql<string>`${row.query}`.as("query"),
            clicks: sql<number>`${row.clicks}`.as("clicks"),
            impressions: sql<number>`${row.impressions}`.as("impressions"),
            ctr: sql<number>`${row.ctr}`.as("ctr"),
            position: sql<number>`${row.position}`.as("position"),
            fetchedAt: sql<string>`${fetchedAt}`.as("fetched_at"),
          },
          projectId,
          siteUrl,
        ),
      )
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

/**
 * Record how far the archive reaches, in the same write as the rows' outcome.
 * Dropped, like the rows, when the project no longer points at `siteUrl`.
 */
async function markRun(input: {
  projectId: string;
  siteUrl: string | null;
  earliestDate: string | null;
  lastDate: string | null;
  scannedThrough: string | null;
  /** Range still holding only the top queries; null when nothing is partial. */
  incomplete: { from: string; through: string } | null;
  error: string | null;
}): Promise<void> {
  const lastRunAt = new Date().toISOString();
  await runBatch((tx) => [
    tx
      .insert(gscArchiveState)
      .select(
        stillConnectedTo(
          tx,
          {
            projectId: sql<string>`${input.projectId}`.as("project_id"),
            earliestDate: sql<string | null>`${input.earliestDate}`.as(
              "earliest_date",
            ),
            lastDate: sql<string | null>`${input.lastDate}`.as("last_date"),
            lastRunAt: sql<string>`${lastRunAt}`.as("last_run_at"),
            lastError: sql<string | null>`${input.error}`.as("last_error"),
            scannedThrough: sql<string | null>`${input.scannedThrough}`.as(
              "scanned_through",
            ),
            incompleteFrom: sql<
              string | null
            >`${input.incomplete?.from ?? null}`.as("incomplete_from"),
            incompleteThrough: sql<
              string | null
            >`${input.incomplete?.through ?? null}`.as("incomplete_through"),
          },
          input.projectId,
          input.siteUrl,
        ),
      )
      .onConflictDoUpdate({
        target: gscArchiveState.projectId,
        set: {
          // Keep the widest window seen: a failed narrow run must not shrink it.
          earliestDate: sql`min(coalesce(${gscArchiveState.earliestDate}, ${input.earliestDate}), coalesce(${input.earliestDate}, ${gscArchiveState.earliestDate}))`,
          lastDate: sql`max(coalesce(${gscArchiveState.lastDate}, ${input.lastDate}), coalesce(${input.lastDate}, ${gscArchiveState.lastDate}))`,
          // Always the newer value: this cursor only moves forward, and a
          // null means "start over", which must also be written.
          scannedThrough: input.scannedThrough,
          // Written as given: null is how a fully re-read range is cleared.
          incompleteFrom: input.incomplete?.from ?? null,
          incompleteThrough: input.incomplete?.through ?? null,
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
  /** Inclusive upper bound; omitted means "through the newest day". */
  until?: string;
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
        input.until ? lte(gscQueryDaily.date, input.until) : undefined,
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
