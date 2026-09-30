/**
 * Three basic per-page hygiene checks: the page's protocol, whether it names
 * its own canonical address, and whether it declares its language.
 *
 * Kept apart from `page-reporters.ts`, which is already the largest reporter
 * file. All three are pure functions over one crawled page. The caller has
 * already returned early for blocked, errored and non-200 fetches, so
 * whatever reaches here answered 200.
 */
import type { CrawledPageResult } from "@/server/lib/audit/types";

/**
 * An indexable page served over plain http.
 *
 * Only reached for a 200: an http URL that redirects to https answers 3xx
 * and is filtered out earlier, so a correctly redirected site is never told
 * off for the address it used to have.
 */
export function isPlainHttpPage(page: CrawledPageResult): boolean {
  return page.isIndexable && page.url.toLowerCase().startsWith("http://");
}

/**
 * An indexable HTML page with no canonical of any kind.
 *
 * `canonicalCount` is deliberately not the test: it counts distinct tags in
 * the head, and a canonical Google can still read may sit elsewhere
 * (`canonicalUrl` is the first one in the whole document, and a header
 * counts too). Any signal at all means the page has said something, and what
 * it said is judged by the `canonical-*` checks, never by this one.
 */
export function lacksCanonical(page: CrawledPageResult): boolean {
  return (
    page.isHtml &&
    page.isIndexable &&
    !page.canonicalUrl &&
    !page.headerCanonicalUrl &&
    page.canonicalCount === 0
  );
}

/** An indexable HTML page whose `<html>` has no usable `lang`. */
export function lacksLanguage(page: CrawledPageResult): boolean {
  return page.isHtml && page.isIndexable && page.htmlLang === null;
}
