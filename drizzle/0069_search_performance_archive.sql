-- Search performance overhaul: the property's own daily totals, the operator's
-- notes on the trend, and the project's brand terms. All additive.
--
-- gsc_site_daily holds what Search Console's date-grouped request returns --
-- the property aggregate, anonymized queries included -- which no sum of
-- query rows can rebuild. Finished days only; one row per day, search type
-- and device ('all' when unfiltered).
CREATE TABLE `gsc_site_daily` (
	`project_id` text NOT NULL,
	`date` text NOT NULL,
	`search_type` text NOT NULL,
	`device` text NOT NULL,
	`clicks` integer NOT NULL,
	`impressions` integer NOT NULL,
	`ctr` real NOT NULL,
	`position` real NOT NULL,
	`data_state` text NOT NULL,
	`fetched_at` text NOT NULL,
	PRIMARY KEY(`project_id`, `date`, `search_type`, `device`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `gsc_annotations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`date` text NOT NULL,
	`note` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `gsc_annotations_project_date_idx` ON `gsc_annotations` (`project_id`,`date`);
--> statement-breakpoint
CREATE TABLE `project_brand_terms` (
	`project_id` text NOT NULL,
	`term` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')) NOT NULL,
	PRIMARY KEY(`project_id`, `term`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
