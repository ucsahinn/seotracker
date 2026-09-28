-- Two things upstream left behind that nothing here reads or writes.
--
-- `user_onboarding_answers` is the hosted product's signup questionnaire:
-- which features you want, who you work for, how many client sites. Eight
-- columns and an index, and the symbol appears nowhere outside its own
-- declaration. A single-user self-hosted install has nobody to ask.
--
-- `reports.share_token` / `shared_at` were a public share-link capability.
-- The schema comment is precise about how it would work -- "the capability
-- IS the token, so nulling it is what revokes the link" -- and nothing ever
-- mints one. `/r/$reportId` looks a report up by its id, and the MCP tool
-- explicitly omits both columns from its output. They were designed,
-- migrated and indexed, and then the hosted surface they belonged to was
-- removed. A self-hosted report is read in-app or exported.
DROP TABLE IF EXISTS `user_onboarding_answers`;
--> statement-breakpoint
DROP INDEX IF EXISTS `reports_share_token_idx`;
--> statement-breakpoint
ALTER TABLE `reports` DROP COLUMN `share_token`;
--> statement-breakpoint
ALTER TABLE `reports` DROP COLUMN `shared_at`;
