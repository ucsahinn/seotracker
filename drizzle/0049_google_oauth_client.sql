-- The Google OAuth client, moved out of the environment.
--
-- Upstream read GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from env because one
-- hosted operator set a single client for every tenant. A single-user install
-- gets its own client from Google Cloud Console, so the credentials belong to
-- the install and are entered on its settings page. The secret is encrypted
-- with the instance key, the same key that protects the tokens it mints.
CREATE TABLE `google_oauth_client` (
	`id` text PRIMARY KEY DEFAULT 'default' NOT NULL,
	`client_id` text NOT NULL,
	`client_secret_encrypted` text NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
