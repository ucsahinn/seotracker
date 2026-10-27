import {
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { projects } from "./app.schema";

/**
 * Daily Search Console totals for the whole property, kept locally.
 *
 * The query archive (`gsc_query_daily`) cannot give a site total: Google
 * withholds anonymized queries from query rows, so their sum is always short
 * of the property's own figure. This table holds what the date-grouped
 * request returns -- the property aggregate -- one row per day, search type
 * and device ('all' when no device filter applied). Google keeps 16 months;
 * this keeps what it has seen for year-over-year and longer trends.
 *
 * Only finished days are written (`data_state` 'final'), filled from the
 * Search performance screen's own request, so it costs no extra call.
 */
export const gscSiteDaily = sqliteTable(
  "gsc_site_daily",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    searchType: text("search_type").notNull(),
    device: text("device").notNull(),
    clicks: integer("clicks").notNull(),
    impressions: integer("impressions").notNull(),
    ctr: real("ctr").notNull(),
    position: real("position").notNull(),
    dataState: text("data_state").notNull(),
    fetchedAt: text("fetched_at").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.projectId, table.date, table.searchType, table.device],
    }),
  ],
);

/** The operator's own dated notes on the search trend ("redesign live"). */
export const gscAnnotations = sqliteTable(
  "gsc_annotations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    note: text("note").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (table) => [
    index("gsc_annotations_project_date_idx").on(table.projectId, table.date),
  ],
);

/**
 * Words that make a query a brand query for this project. One row per term,
 * so the list stays a list. Until the operator sets one, the brand split is
 * "unknown" rather than guessed from the domain.
 */
export const projectBrandTerms = sqliteTable(
  "project_brand_terms",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    term: text("term").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.term] })],
);
