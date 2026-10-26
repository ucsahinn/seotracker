-- Site audit overhaul: per-page signals, page schema types and analytics ids,
-- and one record of site-level facts per audit (headers, redirects, 404 probe,
-- robots/sitemap/well-known files, DNS, domain and certificate expiry).
-- Every new column is nullable: null means "not measured" (older audits).
ALTER TABLE `audit_pages` ADD `html_bytes` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `text_ratio` real;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `dom_node_count` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `dom_max_depth` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `twitter_card` text;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `og_complete` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `meta_keywords_present` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `viewport_zoom_disabled` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `external_blank_without_noopener` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `javascript_links` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `hash_only_links` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `images_lazy_count` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `images_modern_format_count` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `form_inputs_without_label` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `duplicate_ids` integer;
--> statement-breakpoint
ALTER TABLE `audit_pages` ADD `content_simhash` text;
--> statement-breakpoint
CREATE TABLE `audit_page_schema_types` (
	`audit_id` text NOT NULL,
	`page_id` text NOT NULL,
	`schema_type` text NOT NULL,
	PRIMARY KEY(`page_id`, `schema_type`),
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `audit_pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `audit_page_schema_types_audit_id_idx` ON `audit_page_schema_types` (`audit_id`);
--> statement-breakpoint
CREATE TABLE `audit_page_analytics_ids` (
	`audit_id` text NOT NULL,
	`page_id` text NOT NULL,
	`tag_id` text NOT NULL,
	PRIMARY KEY(`page_id`, `tag_id`),
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `audit_pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `audit_page_analytics_ids_audit_id_idx` ON `audit_page_analytics_ids` (`audit_id`);
--> statement-breakpoint
CREATE TABLE `audit_site_facts` (
	`audit_id` text PRIMARY KEY NOT NULL,
	`checked_at` text NOT NULL,
	`start_final_url` text,
	`start_status` integer,
	`start_redirect_hops` integer,
	`ttfb_ms` integer,
	`total_ms` integer,
	`html_bytes` integer,
	`content_type` text,
	`content_encoding` text,
	`cache_control` text,
	`server_header` text,
	`x_powered_by` text,
	`hsts` text,
	`csp_present` integer,
	`csp_frame_ancestors` integer,
	`x_content_type_options` text,
	`x_frame_options` text,
	`referrer_policy` text,
	`permissions_policy` text,
	`response_headers_json` text,
	`http_status` integer,
	`http_final_url` text,
	`http_redirect_hops` integer,
	`http_redirects_to_https` integer,
	`canonical_host` text,
	`alternate_host` text,
	`alternate_status` integer,
	`alternate_redirects_to_canonical` integer,
	`not_found_url` text,
	`not_found_status` integer,
	`not_found_redirected_home` integer,
	`not_found_body_bytes` integer,
	`favicon_declared` integer,
	`favicon_url` text,
	`favicon_status` integer,
	`favicon_found` integer,
	`robots_status` integer,
	`robots_bytes` integer,
	`robots_has_sitemap_line` integer,
	`robots_disallow_all` integer,
	`sitemap_url` text,
	`sitemap_url_count` integer,
	`sitemap_listed_in_robots` integer,
	`llms_txt_status` integer,
	`llms_txt_found` integer,
	`security_txt_status` integer,
	`security_txt_found` integer,
	`ads_txt_status` integer,
	`ads_txt_found` integer,
	`dns_resolved` integer,
	`registrable_domain` text,
	`domain_registered_at` text,
	`domain_expires_at` text,
	`domain_registrar` text,
	`cert_issuer` text,
	`cert_not_before` text,
	`cert_not_after` text,
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `audit_site_crawler_access` (
	`audit_id` text NOT NULL,
	`bot` text NOT NULL,
	`blocked` integer NOT NULL,
	PRIMARY KEY(`audit_id`, `bot`),
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `audit_site_dns_records` (
	`audit_id` text NOT NULL,
	`record_type` text NOT NULL,
	`value` text NOT NULL,
	PRIMARY KEY(`audit_id`, `record_type`, `value`),
	FOREIGN KEY (`audit_id`) REFERENCES `audits`(`id`) ON UPDATE no action ON DELETE cascade
);
