-- How many URLs the audit found (sitemap seeds plus links, before the page
-- limit cut the crawl), and a notice column pair for completed audits that
-- worked around something. Null means unknown: older audits never stored it.
ALTER TABLE `audits` ADD `urls_discovered` integer;
--> statement-breakpoint
ALTER TABLE `audits` ADD `notice_code` text;
--> statement-breakpoint
ALTER TABLE `audits` ADD `notice_detail` text;
--> statement-breakpoint
-- The saved-key notice used to live in the failure columns of a completed
-- audit. Move it, so error_* means a failure and nothing else.
UPDATE `audits`
SET `notice_code` = `error_code`,
    `notice_detail` = `error_detail`,
    `error_code` = NULL,
    `error_detail` = NULL,
    `failed_phase` = NULL
WHERE `status` = 'completed' AND `error_code` = 'missing_secret';
