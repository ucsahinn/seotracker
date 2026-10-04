-- One report title per project, enforced by the database. The service checked
-- this with a read before the write, so two concurrent saves could both pass.
--
-- A real install may already hold duplicates (that race, or older versions), and
-- a unique index would then fail the whole migration. Rename only the later
-- copies of a duplicated title, keeping the oldest as it was: nothing is
-- deleted, and the id suffix makes the new title unique (cut so it stays
-- inside the 120-character title limit).
UPDATE `reports` SET `title` = substr(`title`, 1, 100) || ' (' || substr(`id`, 1, 8) || ')'
WHERE `id` <> (
  SELECT `r2`.`id` FROM `reports` AS `r2`
  WHERE `r2`.`project_id` = `reports`.`project_id` AND `r2`.`title` = `reports`.`title`
  ORDER BY `r2`.`created_at`, `r2`.`id` LIMIT 1
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reports_project_title_idx` ON `reports` (`project_id`,`title`);
