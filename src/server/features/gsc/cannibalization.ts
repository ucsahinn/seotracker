import { sort } from "remeda";
import type { GscSearchAnalyticsRow } from "@/server/lib/gscClient";

/**
 * Queries where your own pages compete with each other.
 *
 * Google usually shows one result per site for a query. When several of your
 * pages chase the same one, the signal splits: each page collects part of the
 * links and relevance that one of them needed to rank, and the site places
 * lower than any single page would have. The fix is editorial - merge, or
 * point one at the other - but you cannot fix what you cannot see, and
 * Search Console does not show it. The data does: ask for query and page
 * together, then look for the queries with more than one page under them.
 */

/** Below this a query is noise, and every site has thousands of those. */
const MIN_QUERY_IMPRESSIONS = 10;
/** A page has to be a real contender, not a stray impression. */
const MIN_PAGE_IMPRESSIONS = 3;
const MIN_PAGE_SHARE = 0.05;

type CompetingPage = {
  page: string;
  clicks: number;
  impressions: number;
  position: number;
};

export type CannibalizedQuery = {
  query: string;
  clicks: number;
  impressions: number;
  /** Best position any of the pages reached. */
  bestPosition: number;
  /** The page Google favours, by clicks then position. */
  primary: CompetingPage;
  /** The others chasing the same query, worst offender first. */
  competitors: CompetingPage[];
  /** Share of the query's impressions that did not go to the primary page. */
  splitShare: number;
};

export type CannibalizationReport = {
  rows: CannibalizedQuery[];
  /** Queries examined after the noise floor. */
  queriesAnalyzed: number;
  /** Impressions sitting on non-primary pages across every affected query. */
  splitImpressions: number;
  startDate: string;
  endDate: string;
};

function betterThan(a: CompetingPage, b: CompetingPage): boolean {
  if (a.clicks !== b.clicks) return a.clicks > b.clicks;
  return a.position < b.position;
}

/**
 * Pure so the grouping can be tested without a Search Console connection;
 * `getCannibalization` supplies the rows.
 */
export function findCannibalizedQueries(
  rows: GscSearchAnalyticsRow[],
): Pick<
  CannibalizationReport,
  "rows" | "queriesAnalyzed" | "splitImpressions"
> {
  const byQuery = new Map<string, CompetingPage[]>();

  for (const row of rows) {
    const [query, page] = row.keys ?? [];
    if (!query || !page) continue;
    const pages = byQuery.get(query) ?? [];
    pages.push({
      page,
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
    });
    byQuery.set(query, pages);
  }

  const found: CannibalizedQuery[] = [];
  let queriesAnalyzed = 0;
  let splitImpressions = 0;

  for (const [query, pages] of byQuery) {
    const impressions = pages.reduce((sum, page) => sum + page.impressions, 0);
    if (impressions < MIN_QUERY_IMPRESSIONS) continue;
    queriesAnalyzed += 1;

    const contenders = pages.filter(
      (page) =>
        page.impressions >= MIN_PAGE_IMPRESSIONS &&
        page.impressions / impressions >= MIN_PAGE_SHARE,
    );
    if (contenders.length < 2) continue;

    let primary = contenders[0];
    for (const page of contenders) {
      if (betterThan(page, primary)) primary = page;
    }
    const competitors = sort(
      contenders.filter((page) => page.page !== primary.page),
      (a, b) => b.impressions - a.impressions,
    );

    const split = competitors.reduce((sum, page) => sum + page.impressions, 0);
    splitImpressions += split;

    found.push({
      query,
      clicks: pages.reduce((sum, page) => sum + page.clicks, 0),
      impressions,
      bestPosition: Math.min(...contenders.map((page) => page.position)),
      primary,
      competitors,
      splitShare: split / impressions,
    });
  }

  // Most impressions at stake first: that is where merging pays.
  return {
    rows: sort(found, (a, b) => b.impressions - a.impressions),
    queriesAnalyzed,
    splitImpressions,
  };
}
