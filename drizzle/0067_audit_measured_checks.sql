-- Audit scope expansion: which of the recorded checks each audit measured
-- (Lighthouse report verdicts, opt-in external requests, HTML checks), so an
-- audit that did not measure one shows it as unknown rather than passed, and
-- two page signals the site-wide checks read back (breadcrumb navigation,
-- a declared RSS/Atom feed). Null means "not measured" (older audits).
CREATE TABLE `audit_measured_checks` (
	`audit_id` text NOT NULL,
	`check_id` text NOT NULL,
	PRIMARY KEY(`audit_id`, `check_id`),
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `has_breadcrumbs` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `has_feed_link` integer;
