-- Local Search Console archive.
--
-- Google serves the last 16 months of query data and deletes what falls off the
-- back. These two tables are how this install keeps a longer history than
-- Google will: the daily rows, and a cursor saying how far the archive reaches
-- so a catch-up knows where to resume.
CREATE TABLE `gsc_query_daily` (
	`project_id` text NOT NULL,
	`date` text NOT NULL,
	`query` text NOT NULL,
	`clicks` integer NOT NULL,
	`impressions` integer NOT NULL,
	`ctr` real NOT NULL,
	`position` real NOT NULL,
	`fetched_at` text NOT NULL,
	PRIMARY KEY(`project_id`, `date`, `query`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `gsc_query_daily_query_idx` ON `gsc_query_daily` (`project_id`,`query`);--> statement-breakpoint
CREATE INDEX `gsc_query_daily_date_idx` ON `gsc_query_daily` (`project_id`,`date`);--> statement-breakpoint
CREATE TABLE `gsc_archive_state` (
	`project_id` text PRIMARY KEY NOT NULL,
	`earliest_date` text,
	`last_date` text,
	`last_run_at` text,
	`last_error` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
-- Tables whose features were removed with the paid data provider and the hosted
-- SaaS surface. Nothing reads them any more; dropping them keeps a fresh
-- database honest about what this install actually stores.
DROP TABLE IF EXISTS `rank_snapshots`;--> statement-breakpoint
DROP TABLE IF EXISTS `rank_check_runs`;--> statement-breakpoint
DROP TABLE IF EXISTS `rank_tracking_keywords`;--> statement-breakpoint
DROP TABLE IF EXISTS `rank_tracking_configs`;--> statement-breakpoint
DROP TABLE IF EXISTS `backlink_snapshots`;--> statement-breakpoint
DROP TABLE IF EXISTS `billing_customer_status`;--> statement-breakpoint
DROP TABLE IF EXISTS `sam_sessions`;--> statement-breakpoint
DROP TABLE IF EXISTS `telemetry_state`;
