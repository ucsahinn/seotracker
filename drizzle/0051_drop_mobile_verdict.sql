-- Google retired the Mobile Usability report and its API on 2023-12-01, so
-- `mobileUsabilityResult` comes back empty and the column only ever held null.
-- Dropped rather than left in place: a mobile-friendliness field sitting in
-- the schema invites someone to surface a signal that no longer exists. Since
-- mobile-first indexing there is no separate mobile verdict to report; mobile
-- page experience lives in the CrUX field data the audit already reads.
ALTER TABLE `gsc_url_inspections` DROP COLUMN `mobile_verdict`;
