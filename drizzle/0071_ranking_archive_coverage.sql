-- Existing archive days deliberately remain unknown. A completed API response
-- still excludes Google's hidden queries and source-side top-row omissions.
CREATE TABLE gsc_archive_coverage (
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  site_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('complete-response', 'own-cap-limited', 'failed')),
  fetched_at TEXT NOT NULL,
  PRIMARY KEY (project_id, date)
);
