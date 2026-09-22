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

/**
 * A service account, the other way to reach Google.
 *
 * Same shape and same reasoning as the OAuth client above: one row, belongs
 * to the install, private key sealed with the instance key. It exists because
 * the OAuth path costs the operator a consent screen, a test-user entry and a
 * redirect URI that must match byte for byte, and those are the three steps
 * setup actually fails on. A service account skips all three; the operator
 * grants it access by adding its email to the Search Console property the way
 * they would add a colleague.
 *
 * Both can be stored at once. The service account wins when present, because
 * an operator who configured the harder path and then the easier one meant to
 * move.
 */
export const googleServiceAccount = sqliteTable("google_service_account", {
  /** Always "default"; the column exists so the single row has a key. */
  id: text("id").primaryKey().default("default"),
  /** `...@<project>.iam.gserviceaccount.com` — shown, never secret. */
  clientEmail: text("client_email").notNull(),
  projectId: text("project_id"),
  privateKeyEncrypted: text("private_key_encrypted").notNull(),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
