-- A second way to reach Google, for operators who do not want the OAuth dance.
--
-- The OAuth path asks for a consent screen, a test-user entry and a redirect
-- URI that must match byte for byte; those three steps are where setup
-- actually fails. A service account has none of them: you create it, download
-- the key, and add its email to the Search Console property like any other
-- user. Only one is ever stored, so the row is keyed the way the OAuth client
-- row is. The private key is sealed with the instance key.
CREATE TABLE `google_service_account` (
	`id` text PRIMARY KEY DEFAULT 'default' NOT NULL,
	`client_email` text NOT NULL,
	`project_id` text,
	`private_key_encrypted` text NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
