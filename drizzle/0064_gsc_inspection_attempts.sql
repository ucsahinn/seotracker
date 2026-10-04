-- URL Inspection attempts as their own ledger, and honest observation times.
--
-- The 2000-per-property-per-day allowance used to be counted from the rows of
-- `gsc_url_inspections`, which is a cache: a forced re-inspection overwrote its
-- row, so the same URL asked twice in a day counted once, and clearing a
-- project's property data erased the spend with it. Google counts every call.
-- This ledger holds one row per call, keyed by the property that was asked, so
-- it survives cache replacement, disconnecting and reconnecting.
CREATE TABLE `gsc_inspection_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`site_url` text NOT NULL,
	`attempted_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `gsc_inspection_attempts_site_idx` ON `gsc_inspection_attempts` (`site_url`,`attempted_at`);
--> statement-breakpoint
-- Carry over what the cache still shows as spent in the last day, so the quota
-- meter does not reset to zero on upgrade. `checked_at` is an ISO stamp when the
-- app wrote it but 'YYYY-MM-DD HH:MM:SS' when it came from the CURRENT_TIMESTAMP
-- default, so it is compared as a datetime and re-emitted in the ISO shape.
INSERT INTO `gsc_inspection_attempts` (`site_url`, `attempted_at`)
SELECT c.`site_url`, strftime('%Y-%m-%dT%H:%M:%fZ', i.`checked_at`)
FROM `gsc_url_inspections` i
JOIN `gsc_connections` c ON c.`project_id` = i.`project_id`
WHERE datetime(i.`checked_at`) >= datetime('now', '-1 day');
--> statement-breakpoint
-- `checked_at` becomes the time Google last *answered*; a failed attempt only
-- moves `last_attempt_at`, so an old verdict is never presented as fresh.
ALTER TABLE `gsc_url_inspections` ADD `last_attempt_at` text;
--> statement-breakpoint
UPDATE `gsc_url_inspections` SET `last_attempt_at` = `checked_at`;
--> statement-breakpoint
-- A truncated window is archived only partially (top queries). The range is
-- remembered so later runs re-read it in smaller windows instead of treating
-- "scanned through" as "completely archived".
ALTER TABLE `gsc_archive_state` ADD `incomplete_from` text;
--> statement-breakpoint
ALTER TABLE `gsc_archive_state` ADD `incomplete_through` text;
