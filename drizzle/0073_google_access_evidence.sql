CREATE TABLE `google_credential_generation` (
  `id` text PRIMARY KEY NOT NULL,
  `generation` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `google_credential_generation` VALUES ('default', 0);
--> statement-breakpoint
CREATE TABLE `google_access_evidence` (
  `provider` text NOT NULL,
  `property_id` text NOT NULL,
  `user_id` text NOT NULL,
  `account_id` text NOT NULL,
  `generation` integer NOT NULL,
  `observed_at` text NOT NULL,
  `started_at` text NOT NULL,
  `reason` text,
  `last_success_at` text,
  PRIMARY KEY (`provider`, `property_id`, `user_id`, `account_id`, `generation`)
);
--> statement-breakpoint
CREATE TRIGGER `google_sa_insert_generation` AFTER INSERT ON `google_service_account` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
--> statement-breakpoint
CREATE TRIGGER `google_sa_update_generation` AFTER UPDATE ON `google_service_account` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
--> statement-breakpoint
CREATE TRIGGER `google_sa_delete_generation` AFTER DELETE ON `google_service_account` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
--> statement-breakpoint
CREATE TRIGGER `google_oauth_insert_generation` AFTER INSERT ON `google_oauth_client` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
--> statement-breakpoint
CREATE TRIGGER `google_oauth_update_generation` AFTER UPDATE ON `google_oauth_client` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
--> statement-breakpoint
CREATE TRIGGER `google_oauth_delete_generation` AFTER DELETE ON `google_oauth_client` BEGIN
  UPDATE google_credential_generation SET generation = generation + 1 WHERE id = 'default';
END;
