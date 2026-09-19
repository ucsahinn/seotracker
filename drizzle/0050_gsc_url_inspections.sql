-- Google's own verdict on each URL, from the URL Inspection API.
--
-- Cached rather than fetched on view: the API allows 2000 inspections per
-- property per day, and a screen that re-inspected on every render would
-- spend a site's whole quota in an afternoon.
CREATE TABLE `gsc_url_inspections` (
	`project_id` text NOT NULL,
	`url` text NOT NULL,
	`verdict` text,
	`coverage_state` text,
	`robots_txt_state` text,
	`indexing_state` text,
	`page_fetch_state` text,
	`last_crawl_time` text,
	`google_canonical` text,
	`user_canonical` text,
	`mobile_verdict` text,
	`rich_results_verdict` text,
	`inspection_link` text,
	`error` text,
	`checked_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	PRIMARY KEY(`project_id`, `url`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `gsc_url_inspections_checked_idx` ON `gsc_url_inspections` (`project_id`,`checked_at`);
