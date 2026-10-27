import { sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

/** Kept beside its only repository; old days have no inferred confidence. */
export const archiveCoverage = sqliteTable(
  "gsc_archive_coverage",
  {
    projectId: text("project_id").notNull(),
    date: text("date").notNull(),
    siteUrl: text("site_url").notNull(),
    status: text("status", {
      enum: ["complete-response", "own-cap-limited", "failed"],
    }).notNull(),
    fetchedAt: text("fetched_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.date] })],
);
