import {
  and,
  asc,
  desc,
  eq,
  gte,
  inArray,
  lte,
  sql,
  type SQL,
} from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { gscArchiveState, gscConnections, gscQueryDaily } from "@/db/schema";
import { archiveCoverage } from "./archiveCoverage";
import { replaceDailyRows } from "./replaceDailyRows";
import { addIsoDays } from "@/shared/dataFreshness";
import { getBackfillSnapshot } from "./gscBackfillSnapshot";

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
  until?: string;
}): Promise<GscDailyRow[]> {
  const clauses = [
    eq(gscQueryDaily.projectId, input.projectId),
    eq(gscQueryDaily.query, input.query),
  ];
  if (input.since) clauses.push(gte(gscQueryDaily.date, input.since));
  if (input.until) clauses.push(lte(gscQueryDaily.date, input.until));

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
  limit?: number;
  offset?: number;
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
    .orderBy(
      desc(sql`sum(${gscQueryDaily.impressions})`),
      asc(gscQueryDaily.query),
    )
    .limit(input.limit ?? -1)
    .offset(input.offset ?? 0);
}

/**
 * Per Monday-started week in [since, until]: how many queries sat in each
 * position bucket, by the query's impression-weighted position for that
 * week. Rounded like the quick filters (`positionBucketFor`), so a query at
 * 3.4 is in "1-3" here and on the chips.
 */
async function getWeeklyPositionBuckets(input: {
  projectId: string;
  since: string;
  until: string;
}): Promise<
  Array<{ weekStart: string; bucket: string; queries: number; days: number }>
> {
  const weekly = db
    .select({
      // Monday of the row's week: 'weekday 0' moves to Sunday (or stays),
      // and six days back from that Sunday is its Monday.
      weekStart:
        sql<string>`date(${gscQueryDaily.date}, 'weekday 0', '-6 days')`.as(
          "week_start",
        ),
      query: gscQueryDaily.query,
      position:
        sql<number>`sum(${gscQueryDaily.position} * ${gscQueryDaily.impressions}) / nullif(sum(${gscQueryDaily.impressions}), 0)`.as(
          "weighted_position",
        ),
      days: sql<number>`count(distinct ${gscQueryDaily.date})`.as("days"),
    })
    .from(gscQueryDaily)
    .where(
      and(
        eq(gscQueryDaily.projectId, input.projectId),
        gte(gscQueryDaily.date, input.since),
        lte(gscQueryDaily.date, input.until),
      ),
    )
    .groupBy(sql`week_start`, gscQueryDaily.query)
    .as("weekly");
  const rounded = sql<number>`max(1, cast(round(${weekly.position}) as integer))`;
  const rows = await db
    .select({
      weekStart: weekly.weekStart,
      bucket: sql<string>`case
        when ${rounded} <= 3 then '1-3'
        when ${rounded} <= 10 then '4-10'
        when ${rounded} <= 20 then '11-20'
        when ${rounded} <= 50 then '21-50'
        else '51+' end`.as("bucket"),
      queries: sql<number>`count(*)`,
      days: sql<number>`max(${weekly.days})`,
    })
    .from(weekly)
    .where(sql`${weekly.position} is not null`)
    .groupBy(sql`week_start`, sql`bucket`)
    .orderBy(sql`week_start`);
  return rows;
}

/**
 * Row count and the first day that holds data, for telling the operator how
 * much history exists. The first day comes from the rows themselves:
 * gsc_archive_state.earliest_date used to be a window start.
 */
async function getArchiveSpan(projectId: string): Promise<{
  rowCount: number;
  firstDate: string | null;
  lastDate: string | null;
}> {
  const [row] = await db
    .select({
      rowCount: sql<number>`count(*)`,
      firstDate: sql<string | null>`min(${gscQueryDaily.date})`,
      lastDate: sql<string | null>`max(${gscQueryDaily.date})`,
    })
    .from(gscQueryDaily)
    .where(eq(gscQueryDaily.projectId, projectId));
  return {
    rowCount: row?.rowCount ?? 0,
    firstDate: row?.firstDate ?? null,
    lastDate: row?.lastDate ?? null,
  };
}

/**
 * Each listed query's impression-weighted position per Monday-started week
 * since `since`, oldest first: the per-row sparkline on Rankings, read from
 * the archive this install already holds.
 */
async function getWeeklyPositions(input: {
  projectId: string;
  since: string;
  until?: string;
  queries: string[];
}): Promise<Array<{ query: string; weekStart: string; position: number }>> {
  // D1 binds at most 100 parameters per statement; two go to project and date.
  const out: Array<{ query: string; weekStart: string; position: number }> = [];
  for (let i = 0; i < input.queries.length; i += 90) {
    out.push(
      ...(await weeklyPositionsChunk({
        ...input,
        queries: input.queries.slice(i, i + 90),
      })),
    );
  }
  return out;
}

async function weeklyPositionsChunk(input: {
  projectId: string;
  since: string;
  until?: string;
  queries: string[];
}) {
  const weekStart = sql<string>`date(${gscQueryDaily.date}, 'weekday 0', '-6 days')`;
  const rows = await db
    .select({
      query: gscQueryDaily.query,
      weekStart,
      position: sql<number>`sum(${gscQueryDaily.position} * ${gscQueryDaily.impressions}) / nullif(sum(${gscQueryDaily.impressions}), 0)`,
    })
    .from(gscQueryDaily)
    .where(
      and(
        eq(gscQueryDaily.projectId, input.projectId),
        gte(gscQueryDaily.date, input.since),
        inArray(gscQueryDaily.query, input.queries),
        input.until ? lte(gscQueryDaily.date, input.until) : undefined,
      ),
    )
    .groupBy(gscQueryDaily.query, weekStart)
    .orderBy(weekStart);
  return rows.filter((row) => row.position !== null);
}

async function markCoverage(input: {
  projectId: string;
  siteUrl: string;
  since: string;
  until: string;
  status: "complete-response" | "own-cap-limited" | "failed";
}) {
  const dates: string[] = [];
  for (let day = input.since; day <= input.until; day = addIsoDays(day, 1))
    dates.push(day);
  const fetchedAt = new Date().toISOString();
  await executeInBatches(dates, (tx, day) =>
    tx
      .insert(archiveCoverage)
      .select(
        stillConnectedTo(
          tx,
          {
            projectId: sql<string>`${input.projectId}`.as("project_id"),
            date: sql<string>`${day}`.as("date"),
            siteUrl: sql<string>`${input.siteUrl}`.as("site_url"),
            status: sql<string>`${input.status}`.as("status"),
            fetchedAt: sql<string>`${fetchedAt}`.as("fetched_at"),
          },
          input.projectId,
          input.siteUrl,
        ),
      )
      .onConflictDoUpdate({
        target: [archiveCoverage.projectId, archiveCoverage.date],
        set: { status: input.status, fetchedAt, siteUrl: input.siteUrl },
      }),
  );
}

async function getProperty(projectId: string) {
  const [connection] = await db
    .select({ siteUrl: gscConnections.siteUrl })
    .from(gscConnections)
    .where(eq(gscConnections.projectId, projectId));
  return connection?.siteUrl ?? null;
}

async function getCoverage(input: {
  projectId: string;
  since: string;
  until: string;
}) {
  return db
    .select({ date: archiveCoverage.date, status: archiveCoverage.status })
    .from(archiveCoverage)
    .innerJoin(
      gscConnections,
      and(
        eq(archiveCoverage.projectId, gscConnections.projectId),
        eq(archiveCoverage.siteUrl, gscConnections.siteUrl),
      ),
    )
    .where(
      and(
        eq(archiveCoverage.projectId, input.projectId),
        gte(archiveCoverage.date, input.since),
        lte(archiveCoverage.date, input.until),
      ),
    )
    .orderBy(archiveCoverage.date);
}

export const GscHistoryRepository = {
  getBackfillSnapshot,
  replaceDailyRows,
  markCoverage,
  getCoverage,
  getProperty,
  getWeeklyPositions,
  getArchiveState,
  upsertDailyRows,
  markRun,
  getQueryHistory,
  getTrackedQueries,
  getWeeklyPositionBuckets,
  getArchiveSpan,
};
