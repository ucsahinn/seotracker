import { sort } from "remeda";
import type { GscSearchAnalyticsRow } from "@/server/lib/gscClient";

/**
 * Queries where more than one of your pages shows up.
 *
 * Search Console reports queries and pages as two separate lists, so a query
 * answered by four of your pages looks exactly like one answered by a single
 * page. Asking for both dimensions at once and grouping is what surfaces it.
 *
 * What this does and does not prove: it proves several of your pages appeared
 * for one query over the period. It does not prove they appeared at the same
 * time, because a query whose ranking page Google swapped mid-period produces
 * the same shape. And the common "signal dilution" story - that the pages
 * split each other's link value - is not something Google describes; what
 * actually happens is that Google picks a page you did not intend, or keeps
 * changing its pick. That matters for the fix: merging two pages that serve
 * different intents makes things worse. Decide which page you meant, point
 * internal links at it, and only merge when they genuinely answer the same
 * question.
 */

/**
 * Noise floors, set for a 28-day window.
 *
 * These started far lower and flagged almost anything: at 10 query
 * impressions a 5% share is under one impression, so the only real gate was
 * "3 impressions", and a query seen ten times with a 7/3 split - one
 * impression every three days on the second page - was reported as
 * competition. On a small site that noise was the whole table.
 */
const MIN_QUERY_IMPRESSIONS = 100;
/** A page has to be a real contender, not a stray impression. */
const MIN_PAGE_IMPRESSIONS = 10;
/** And it has to hold a real share, not a sliver. */
const MIN_PAGE_SHARE = 0.2;

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
  /** The best *average* position among the pages. Google reports no best. */
  bestPosition: number;
  /** The page Google favours, by clicks, then impressions, then position. */
  primary: CompetingPage;
  /** The others chasing the same query, worst offender first. */
  competitors: CompetingPage[];
  /**
   * Share of the competing pages' impressions that did not go to the primary
   * one. Approximate: when two of your pages appear in a single result set
   * that is two page-impressions for one query-impression, which is exactly
   * the case being measured, so the denominator runs slightly high.
   */
  splitShare: number;
};

export type CannibalizationReport = {
  rows: CannibalizedQuery[];
  /** Queries examined after the noise floor. */
  queriesAnalyzed: number;
  /** Impressions sitting on non-primary pages across every affected query. */
  splitImpressions: number;
  /**
   * Google returned a full page of rows, so there are more it did not send.
   * It sorts by clicks descending and cannibalisation lives in the low-click
   * tail, so a truncated answer is the one most likely to be missing things.
   * Reported rather than hidden: "no conflicts" and "we did not look at all
   * of it" must not read the same.
   */
  truncated: boolean;
  startDate: string;
  endDate: string;
};

/**
 * Which page Google actually favours.
 *
 * Clicks first, then impressions, then position. Impressions is the key that
 * was missing: at positions 8 to 20 almost nothing has clicks, so the tie fell
 * to average position - and that average covers only the impressions where the
 * page appeared. A page seen once at position 3 beat a page seen four hundred
 * times at position 9, and the UI then told the operator to merge the working
 * page into the outlier.
 */
function betterThan(a: CompetingPage, b: CompetingPage): boolean {
  if (a.clicks !== b.clicks) return a.clicks > b.clicks;
  if (a.impressions !== b.impressions) return a.impressions > b.impressions;
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

    // Numerator and denominator have to cover the same set. `split` sums the
    // contenders minus the primary, so the denominator is the contenders too
    // - using the all-pages total counted impressions from pages that were
    // filtered out as noise and understated every share.
    const contended = contenders.reduce(
      (sum, page) => sum + page.impressions,
      0,
    );
    const split = contended - primary.impressions;
    splitImpressions += split;

    found.push({
      query,
      clicks: pages.reduce((sum, page) => sum + page.clicks, 0),
      impressions,
      bestPosition: Math.min(...contenders.map((page) => page.position)),
      primary,
      competitors,
      splitShare: split / contended,
    });
  }

  // Most impressions at stake first: that is where merging pays.
  return {
    rows: sort(found, (a, b) => b.impressions - a.impressions),
    queriesAnalyzed,
    splitImpressions,
  };
}
