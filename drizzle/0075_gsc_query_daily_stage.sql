CREATE TABLE `gsc_query_daily_stage` (
  `run_id` text NOT NULL,
  `date` text NOT NULL,
  `query` text NOT NULL,
  `clicks` real NOT NULL,
  `impressions` real NOT NULL,
  `ctr` real NOT NULL,
  `position` real NOT NULL,
  `fetched_at` text NOT NULL,
  PRIMARY KEY (`run_id`, `date`, `query`)
);
