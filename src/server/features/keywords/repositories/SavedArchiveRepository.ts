import { and, eq, gte, lte, inArray } from "drizzle-orm";
import { db } from "@/db";
import { gscQueryDaily } from "@/db/schema";
/** Query variants are batched below D1's 100-binding limit. Dates are distinct across variants in the projection. */
async function observationDates(
  projectId: string,
  queries: string[],
  since: string,
  until: string,
) {
  const dates = new Map<string, string[]>();
  for (let offset = 0; offset < queries.length; offset += 80) {
    const rows = await db
      .select({ query: gscQueryDaily.query, date: gscQueryDaily.date })
      .from(gscQueryDaily)
      .where(
        and(
          eq(gscQueryDaily.projectId, projectId),
          gte(gscQueryDaily.date, since),
          lte(gscQueryDaily.date, until),
          inArray(gscQueryDaily.query, queries.slice(offset, offset + 80)),
        ),
      );
    for (const row of rows) {
      const list = dates.get(row.query) ?? [];
      list.push(row.date);
      dates.set(row.query, list);
    }
  }
  return dates;
}
async function dailyObservations(
  projectId: string,
  queries: string[],
  since: string,
  until: string,
) {
  const rows: {
    date: string;
    position: number;
    impressions: number;
    clicks: number;
  }[] = [];
  for (let offset = 0; offset < queries.length; offset += 80)
    rows.push(
      ...(await db
        .select({
          date: gscQueryDaily.date,
          position: gscQueryDaily.position,
          impressions: gscQueryDaily.impressions,
          clicks: gscQueryDaily.clicks,
        })
        .from(gscQueryDaily)
        .where(
          and(
            eq(gscQueryDaily.projectId, projectId),
            gte(gscQueryDaily.date, since),
            lte(gscQueryDaily.date, until),
            inArray(gscQueryDaily.query, queries.slice(offset, offset + 80)),
          ),
        )),
    );
  return rows;
}
export const SavedArchiveRepository = { observationDates, dailyObservations };
