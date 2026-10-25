ALTER TABLE announcements ADD COLUMN title_de TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN body_de TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN title_fr TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN body_fr TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN title_it TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN body_it TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN title_pt TEXT NOT NULL DEFAULT '';
ALTER TABLE announcements ADD COLUMN body_pt TEXT NOT NULL DEFAULT '';

UPDATE announcements SET title_de = title_en, body_de = body_en;
UPDATE announcements SET title_fr = title_en, body_fr = body_en;
UPDATE announcements SET title_it = title_en, body_it = body_en;
UPDATE announcements SET title_pt = title_en, body_pt = body_en;
