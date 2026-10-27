import { sqliteTable, text, real, primaryKey } from "drizzle-orm/sqlite-core";

/** Unpublished fetches; only a completed run may replace archive rows. */
export const queryDailyStage = sqliteTable(
  "gsc_query_daily_stage",
  {
    runId: text("run_id").notNull(),
    date: text("date").notNull(),
    query: text("query").notNull(),
    clicks: real("clicks").notNull(),
    impressions: real("impressions").notNull(),
    ctr: real("ctr").notNull(),
    position: real("position").notNull(),
    fetchedAt: text("fetched_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.runId, table.date, table.query] })],
);
