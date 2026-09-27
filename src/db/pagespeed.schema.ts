import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * The PageSpeed Insights key this install uses for the Lighthouse phase.
 *
 * One row, always. Like the Google OAuth client beside it, the key comes from
 * the operator's own Google Cloud project, so it belongs to the install and
 * is entered on its settings page rather than in the environment.
 *
 * It is a quota credential rather than an access-control one: without it the
 * API answers on a keyless allowance that returns 429 under almost any real
 * audit. Sealed with the instance key regardless, because a billable key in
 * plaintext beside the database is the wrong default.
 */
export const pagespeedApiKey = sqliteTable("pagespeed_api_key", {
  /** Always "default"; the column exists so the single row has a key. */
  id: text("id").primaryKey().default("default"),
  keyEncrypted: text("key_encrypted").notNull(),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
