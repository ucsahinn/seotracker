CREATE TABLE `update_check` (
	`id` text PRIMARY KEY DEFAULT 'default' NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`checked_at` text,
	`etag` text,
	`latest_tag` text,
	`release_url` text,
	`published_at` text,
	`last_status` integer,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
