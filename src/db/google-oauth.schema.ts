import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * The Google OAuth client this install uses for Search Console and Analytics.
 *
 * One row, always. The credentials come from the operator's own Google Cloud
 * project, so they belong to the install rather than to any project inside it,
 * and they live here instead of in the environment because an install should
 * be configurable from its own settings page — not by editing a file and
 * recreating the container.
 *
 * The client secret is encrypted with the instance key, the same key that
 * protects the OAuth tokens it mints.
 */
export const googleOAuthClient = sqliteTable("google_oauth_client", {
  /** Always "default"; the column exists so the single row has a key. */
  id: text("id").primaryKey().default("default"),
  clientId: text("client_id").notNull(),
  clientSecretEncrypted: text("client_secret_encrypted").notNull(),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
