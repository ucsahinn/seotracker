import { sql } from "drizzle-orm";
import { index, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
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
    mobileVerdict: text("mobile_verdict"),
    richResultsVerdict: text("rich_results_verdict"),
    inspectionLink: text("inspection_link"),

    /** Set when this one URL failed while others in the batch succeeded. */
    error: text("error"),
    checkedAt: text("checked_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.url] }),
    index("gsc_url_inspections_checked_idx").on(
      table.projectId,
      table.checkedAt,
    ),
  ],
);
