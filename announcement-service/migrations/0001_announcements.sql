CREATE TABLE announcements (
  id TEXT PRIMARY KEY NOT NULL,
  title_tr TEXT NOT NULL,
  body_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  body_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('product', 'maintenance', 'security', 'release')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
  publish_at TEXT NOT NULL,
  expires_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX announcements_publication_idx
  ON announcements(status, publish_at DESC, expires_at);

CREATE INDEX announcements_admin_idx
  ON announcements(status, updated_at DESC);
