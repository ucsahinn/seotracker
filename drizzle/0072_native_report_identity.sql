ALTER TABLE `reports` ADD `native_kind` text;
--> statement-breakpoint
ALTER TABLE `reports` ADD `native_identity` text;
--> statement-breakpoint
CREATE UNIQUE INDEX `reports_project_native_idx` ON `reports` (`project_id`,`native_kind`,`native_identity`);
