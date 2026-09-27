-- The PageSpeed Insights key, moved out of the environment.
--
-- Same reasoning as `google_oauth_client` in 0049: the key comes from the
-- operator's own Google Cloud project, so it belongs to this install rather
-- than to the machine running it, and changing it should not mean editing a
-- file and recreating the container.
--
-- It is a quota credential, not an access-control one -- it raises the
-- Lighthouse phase off Google's keyless allowance, which answers 429 under
-- almost any real audit. Encrypted anyway, with the instance key, because a
-- billable key in plaintext next to the database is a worse default than the
-- one line of code it takes to seal it.
CREATE TABLE `pagespeed_api_key` (
	`id` text PRIMARY KEY DEFAULT 'default' NOT NULL,
	`key_encrypted` text NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
