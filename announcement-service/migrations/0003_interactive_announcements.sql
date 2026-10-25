ALTER TABLE announcements ADD COLUMN interaction_type TEXT NOT NULL DEFAULT 'none'
  CHECK (interaction_type IN ('none', 'poll', 'question'));
ALTER TABLE announcements ADD COLUMN prompt_tr TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN prompt_en TEXT NOT NULL DEFAULT '';

CREATE TABLE announcement_options (
  id TEXT PRIMARY KEY NOT NULL,
  announcement_id TEXT NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  label_tr TEXT NOT NULL,
  label_en TEXT NOT NULL,
  position INTEGER NOT NULL,
  UNIQUE (announcement_id, position)
);

CREATE TABLE announcement_responses (
  id TEXT PRIMARY KEY NOT NULL,
  announcement_id TEXT NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  respondent_hash TEXT NOT NULL,
  option_id TEXT REFERENCES announcement_options(id) ON DELETE CASCADE,
  answer TEXT,
  created_at TEXT NOT NULL,
  UNIQUE (announcement_id, respondent_hash),
  CHECK ((option_id IS NOT NULL AND answer IS NULL) OR
         (option_id IS NULL AND answer IS NOT NULL))
);

CREATE INDEX announcement_responses_announcement_idx
  ON announcement_responses(announcement_id, created_at DESC);

CREATE TRIGGER announcement_options_keep_responses
BEFORE DELETE ON announcement_options
WHEN EXISTS (
  SELECT 1 FROM announcement_responses
  WHERE option_id = OLD.id
)
BEGIN
  SELECT RAISE(ABORT, 'announcement option has recorded responses');
END;
