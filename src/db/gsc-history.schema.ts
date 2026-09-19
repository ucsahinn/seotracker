import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
import { projects } from "./app.schema";

/**
 * Daily Search Console performance per query, kept locally.
 *
 * Google only serves the last 16 months and deletes everything older, so
 * anything past that horizon exists only if this install stored it. The rows
 * are the raw daily grain Google reports, which is what makes a real ranking
 * history possible: a 28-day average hides the day a page moved.
 *
 * The primary key is (project, date, query), so re-fetching a day is an
 * idempotent upsert — the backfill can overlap its window without duplicating.
 * Only queries are recorded, not query-by-page: the page breakdown multiplies
 * the row count several times over for a question the live API already answers.
 */
export const gscQueryDaily = sqliteTable(
  "gsc_query_daily",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    // ISO date, "YYYY-MM-DD", exactly as Search Console reports it.
    date: text("date").notNull(),
    query: text("query").notNull(),
    clicks: integer("clicks").notNull(),
    impressions: integer("impressions").notNull(),
    // Stored as Google returns them rather than recomputed: ctr is a ratio and
    // position is the impression-weighted average for that day.
    ctr: real("ctr").notNull(),
    position: real("position").notNull(),
    fetchedAt: text("fetched_at").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.date, table.query] }),
    // The two reads this table exists for: one query's history, and a day's
    // top queries.
    index("gsc_query_daily_query_idx").on(table.projectId, table.query),
    index("gsc_query_daily_date_idx").on(table.projectId, table.date),
  ],
);

/**
 * How far the archive has been filled per project, so a backfill knows where to
 * resume without scanning the rows. `lastDate` is the newest day already
 * stored; `earliestDate` is the oldest, which tells the UI how much history it
 * can honestly draw.
 */
export const gscArchiveState = sqliteTable("gsc_archive_state", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  earliestDate: text("earliest_date"),
  lastDate: text("last_date"),
  lastRunAt: text("last_run_at"),
  // Set when a run failed, so the UI can say why the history stopped growing
  // instead of silently showing a stale window.
  lastError: text("last_error"),
});
