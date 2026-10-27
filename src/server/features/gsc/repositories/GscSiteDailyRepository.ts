import { sortBy } from "remeda";
import { and, asc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "@/db";
import { executeInBatches } from "@/db/runBatch";
import { gscConnections, gscSiteDaily } from "@/db/schema";

type GscSiteDay = {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  fetchedAt?: string;
  dataState?: string;
};

type Segment = { projectId: string; searchType: string; device: string };

/** Stored days of one segment in [since, until], oldest first. */
async function getDays(
  segment: Segment & { since?: string; until?: string },
): Promise<GscSiteDay[]> {
  return db
    .select({
      date: gscSiteDaily.date,
      fetchedAt: gscSiteDaily.fetchedAt,
      dataState: gscSiteDaily.dataState,
      clicks: gscSiteDaily.clicks,
      impressions: gscSiteDaily.impressions,
      ctr: gscSiteDaily.ctr,
      position: gscSiteDaily.position,
    })
    .from(gscSiteDaily)
    .where(
      and(
        eq(gscSiteDaily.projectId, segment.projectId),
        eq(gscSiteDaily.searchType, segment.searchType),
        eq(gscSiteDaily.device, segment.device),
        segment.since ? gte(gscSiteDaily.date, segment.since) : undefined,
        segment.until ? lte(gscSiteDaily.date, segment.until) : undefined,
      ),
    )
    .orderBy(asc(gscSiteDaily.date));
}

/**
 * Write finished days, skipping the ones already stored with the same
 * numbers, so the screen's every visit does not rewrite sixteen months.
 * Dropped when the project no longer points at `siteUrl` (an INSERT ...
 * SELECT against the connection row, as in GscHistoryRepository).
 */
async function upsertDays(
  segment: Segment & { siteUrl: string },
  days: GscSiteDay[],
): Promise<number> {
  if (days.length === 0) return 0;
  const sorted = sortBy(days, (d) => d.date);
  const stored = await getDays({
    ...segment,
    since: sorted[0]?.date,
    until: sorted[sorted.length - 1]?.date,
  });
  const known = new Map(stored.map((d) => [d.date, d] as const));
  const changed = sorted.filter((day) => {
    const before = known.get(day.date);
    return (
      !before ||
      before.clicks !== day.clicks ||
      before.impressions !== day.impressions ||
      Math.abs(before.position - day.position) > 1e-9
    );
  });
  if (changed.length === 0) return 0;
  const fetchedAt = new Date().toISOString();
  await executeInBatches(changed, (tx, day) =>
    tx
      .insert(gscSiteDaily)
      .select(
        tx
          .select({
            projectId: sql<string>`${segment.projectId}`.as("project_id"),
            date: sql<string>`${day.date}`.as("date"),
            searchType: sql<string>`${segment.searchType}`.as("search_type"),
            device: sql<string>`${segment.device}`.as("device"),
            clicks: sql<number>`${day.clicks}`.as("clicks"),
            impressions: sql<number>`${day.impressions}`.as("impressions"),
            ctr: sql<number>`${day.ctr}`.as("ctr"),
            position: sql<number>`${day.position}`.as("position"),
            dataState: sql<string>`'final'`.as("data_state"),
            fetchedAt: sql<string>`${fetchedAt}`.as("fetched_at"),
          })
          .from(gscConnections)
          .where(
            and(
              eq(gscConnections.projectId, segment.projectId),
              eq(gscConnections.siteUrl, segment.siteUrl),
            ),
          ),
      )
      .onConflictDoUpdate({
        target: [
          gscSiteDaily.projectId,
          gscSiteDaily.date,
          gscSiteDaily.searchType,
          gscSiteDaily.device,
        ],
        set: {
          clicks: day.clicks,
          impressions: day.impressions,
          ctr: day.ctr,
          position: day.position,
          fetchedAt,
        },
      }),
  );
  return changed.length;
}

export const GscSiteDailyRepository = { getDays, upsertDays };
