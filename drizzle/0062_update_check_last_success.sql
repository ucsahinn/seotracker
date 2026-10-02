-- When GitHub last gave a usable answer, apart from when it was last asked.
--
-- `checked_at` moves on every attempt (it drives the retry back-off), so a
-- failed check used to erase the only record of when the cached version was
-- last confirmed. Existing rows whose last attempt succeeded are backfilled.
ALTER TABLE `update_check` ADD `last_success_at` text;
--> statement-breakpoint
UPDATE `update_check` SET `last_success_at` = `checked_at` WHERE `last_status` IN (200, 304);
