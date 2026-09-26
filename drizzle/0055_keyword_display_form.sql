-- Keep a saved keyword as the operator typed it, and match on a folded key.
--
-- `normalizeKeyword` lowercased the input and stored the result, so the
-- stored value was also the displayed value. `String.toLowerCase` is
-- locale-insensitive, and Turkish is the language this UI is pinned to:
-- "IŞIK" became "işik", which is not a word, and "İstanbul" became "i" plus
-- a combining dot that renders with the dot floating. Neither round-trips,
-- and searching for the ordinary Turkish lowercase found nothing.
--
-- Existing rows already hold the folded form and cannot be un-folded, so the
-- backfill copies it into both columns. New saves keep the original.
ALTER TABLE `saved_keywords` ADD `keyword_key` text;
--> statement-breakpoint
UPDATE `saved_keywords` SET `keyword_key` = `keyword` WHERE `keyword_key` IS NULL;
--> statement-breakpoint
DROP INDEX IF EXISTS `saved_keywords_unique_project_keyword_location_language`;
--> statement-breakpoint
CREATE UNIQUE INDEX `saved_keywords_unique_project_keyword_location_language` ON `saved_keywords` (`project_id`,`keyword_key`,`location_code`,`language_code`);
