/**
 * One finding when the whole site carries no Open Graph tags.
 *
 * `og_title` and `og_image` have been parsed by the analyzer and written by
 * every crawl since it was built, and read by nothing. Per page this would
 * be noise on every crawl of every site that has not set them up -- 212
 * identical info rows on the project this was measured against. Across a
 * site it is one statement with one fix, because Open Graph is a property of
 * the template, not of a page.
 *
 * Deliberately not a ranking claim. Google does not rank on these tags; they
 * decide what a link looks like when someone shares it, which is a different
 * kind of traffic and worth saying plainly in the explanation.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { SlimPage } from "@/server/lib/audit/issues/multipage-checks";

/** Under this, the absence says more about the crawl than about the site. */
const MIN_PAGES = 5;

export function findMissingOpenGraph(
  pages: SlimPage[],
  startUrl: string,
): DetectedIssue[] {
  const html = pages.filter(
    (page) =>
      page.fetchClass === "ok" &&
      page.statusCode !== null &&
      page.statusCode >= 200 &&
      page.statusCode < 300,
  );
  if (html.length < MIN_PAGES) return [];
  // Either tag anywhere means somebody has set this up; the gaps are then a
  // per-template question this check is the wrong shape to answer.
  if (html.some((page) => page.ogTitle ?? page.ogImage)) return [];

  return [
    {
      issueType: "open-graph-missing-site",
      pageId: null,
      pageUrl: startUrl,
      details: { pagesChecked: html.length },
    },
  ];
}
