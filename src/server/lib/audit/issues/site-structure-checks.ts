/**
 * Two site-wide HTML checks that need every page at once: a blog that
 * declares no feed, and deep pages with no breadcrumb trail. Pure; the
 * reads live in `multipage.ts` and the finalize step.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";

/** Pages this many clicks from the start page are deep enough to need a trail. */
const BREADCRUMB_DEPTH = 3;

const ARTICLE_TYPES = new Set(["Article", "BlogPosting", "NewsArticle"]);

export function isArticleType(schemaType: string): boolean {
  return ARTICLE_TYPES.has(schemaType);
}

/**
 * One finding when pages are marked up as articles and no analyzed page
 * declares a feed. `measured` is false when no page was analyzed by a crawl
 * that reads feed links (an older crawl stored null).
 */
export function findMissingFeed(input: {
  pages: { id: string; hasFeedLink: boolean | null }[];
  articlePageIds: ReadonlySet<string>;
  startUrl: string;
}): { issues: DetectedIssue[]; measured: boolean } {
  const analyzed = input.pages.filter((page) => page.hasFeedLink !== null);
  if (analyzed.length === 0) return { issues: [], measured: false };
  const articles = analyzed.filter((page) =>
    input.articlePageIds.has(page.id),
  ).length;
  const declared = analyzed.some((page) => page.hasFeedLink === true);
  return {
    measured: true,
    issues:
      articles > 0 && !declared
        ? [
            {
              issueType: "missing-feed",
              pageId: null,
              pageUrl: input.startUrl,
              details: { articlePages: articles },
            },
          ]
        : [],
  };
}

export type BreadcrumbPage = {
  id: string;
  url: string;
  statusCode: number | null;
  fetchClass: string;
  isIndexable: boolean;
  crawlDepth: number | null;
  hasBreadcrumbs: boolean | null;
};

/**
 * Indexable 2xx pages at least `BREADCRUMB_DEPTH` clicks deep with no
 * breadcrumb markup. Only meaningful on exact click depths: the caller
 * passes pages after the depth repair, and only when it was exact.
 */
export function findMissingBreadcrumbs(pages: BreadcrumbPage[]): {
  issues: DetectedIssue[];
  measured: boolean;
} {
  const measured = pages.some((page) => page.hasBreadcrumbs !== null);
  const issues = pages
    .filter(
      (page) =>
        page.hasBreadcrumbs === false &&
        page.isIndexable &&
        page.fetchClass === "ok" &&
        page.statusCode !== null &&
        page.statusCode >= 200 &&
        page.statusCode < 300 &&
        page.crawlDepth !== null &&
        page.crawlDepth >= BREADCRUMB_DEPTH,
    )
    .map(
      (page): DetectedIssue => ({
        issueType: "missing-breadcrumbs",
        pageId: page.id,
        pageUrl: page.url,
        details: { crawlDepth: page.crawlDepth },
      }),
    );
  return { issues, measured };
}
