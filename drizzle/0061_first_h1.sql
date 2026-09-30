-- The text of each page's first non-empty <h1>.
--
-- The `duplicate-h1` check groups pages across the whole crawl, and that
-- runs on stored rows (the page reporters only ever see one page), so the
-- text has to be stored the way `title` is. One nullable text column: null
-- when the page has no h1 with words in it.
ALTER TABLE `audit_pages` ADD `first_h1` text;
