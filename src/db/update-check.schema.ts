import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * What the last look at GitHub's releases said, and whether to look at all.
 *
 * One row, always. Cached in the database rather than in memory because the
 * container is rebuilt on every update — an in-memory cache would re-ask on
 * every boot, and a worker isolate recycling would do it again. GitHub allows
 * an anonymous caller 60 requests an hour *per IP*, shared with everything
 * else on the operator's network, so the cache is the whole design: one call
 * a day is 0.07% of that budget.
 *
 * `etag` does not save quota — GitHub only exempts conditional requests that
 * carry an Authorization header, and this one deliberately does not — but a
 * 304 saves the round trip's body and confirms the cached answer is current.
 */
export const updateCheck = sqliteTable("update_check", {
  /** Always "default"; the column exists so the single row has a key. */
  id: text("id").primaryKey().default("default"),
  /** Off means the request is never constructed, not merely hidden. */
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  /** When GitHub was last asked, successfully or not. Drives the TTL. */
  checkedAt: text("checked_at"),
  etag: text("etag"),
  latestTag: text("latest_tag"),
  releaseUrl: text("release_url"),
  publishedAt: text("published_at"),
  /**
   * The HTTP status of the last attempt, or null if the request never left.
   * Kept so the UI can tell "no releases published yet" (404) apart from
   * "we were rate limited" (403/429) apart from "the network is down".
   */
  lastStatus: integer("last_status"),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
