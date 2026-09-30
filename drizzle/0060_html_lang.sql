-- The document language, which the analyzer never looked at.
--
-- `<html lang="tr">` tells screen readers which voice to use and gives Google
-- a hint about the page language. The `missing-lang` check reads it straight
-- from the live crawl result, so no cross-page query needs the column today;
-- it is stored so the value is not lost, the way `googlebot_meta` was.
--
-- One nullable text column: the trimmed attribute, or null when it is absent
-- or blank.
ALTER TABLE `audit_pages` ADD `html_lang` text;
