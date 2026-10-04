import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { projects } from "./app.schema";

/**
 * What Google says about each of your URLs, from the URL Inspection API.
 *
 * Stored rather than fetched on view, for one hard reason: the API allows
 * 2000 inspections per property per day. A page that re-inspected on every
 * render would burn a site's whole quota in an afternoon. The row keeps the
 * answer and the time it was given, and the UI says how old it is.
 *
 * Keyed by URL rather than by audit, because the question "is this indexed"
 * belongs to the URL and outlives the crawl that found it.
 */
export const gscUrlInspections = sqliteTable(
  "gsc_url_inspections",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    url: text("url").notNull(),

    /** PASS, PARTIAL, FAIL or NEUTRAL: Google's own summary. */
    verdict: text("verdict"),
    /** The sentence Search Console shows, e.g. "Crawled - currently not indexed". */
    coverageState: text("coverage_state"),
    robotsTxtState: text("robots_txt_state"),
    indexingState: text("indexing_state"),
    pageFetchState: text("page_fetch_state"),
    lastCrawlTime: text("last_crawl_time"),
    /** Google's chosen canonical, which is the one that counts. */
    googleCanonical: text("google_canonical"),
    /** The canonical you declared. A mismatch is worth knowing about. */
    userCanonical: text("user_canonical"),
    richResultsVerdict: text("rich_results_verdict"),
    inspectionLink: text("inspection_link"),

    /** Set when this one URL failed while others in the batch succeeded. */
    error: text("error"),
    /**
     * When Google last *answered* for this URL. A failed attempt does not move
     * it, so an old verdict never looks fresher than it is.
     */
    checkedAt: text("checked_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    /** The last time we asked, answered or not. Null on rows from before it existed. */
    lastAttemptAt: text("last_attempt_at"),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.url] }),
    index("gsc_url_inspections_checked_idx").on(
      table.projectId,
      table.checkedAt,
    ),
  ],
);

/**
 * One row per URL Inspection call, keyed by the property that was asked.
 *
 * The quota is Google's count of calls, not our count of cached answers: a
 * forced re-inspection overwrites its cache row but still spends an
 * inspection. Keyed by property (not project) because the allowance belongs to
 * the property, and deliberately not cleared when a project disconnects or
 * switches property, or reconnecting would reset the meter. Rows older than
 * the 24-hour window are pruned on write.
 */
export const gscInspectionAttempts = sqliteTable(
  "gsc_inspection_attempts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    siteUrl: text("site_url").notNull(),
    attemptedAt: text("attempted_at").notNull(),
  },
  (table) => [
    index("gsc_inspection_attempts_site_idx").on(
      table.siteUrl,
      table.attemptedAt,
    ),
  ],
);
