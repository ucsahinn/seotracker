/**
 * What Google already told us about these pages, turned into audit findings.
 *
 * `gsc_url_inspections` has held Google's own verdict since the Index
 * Coverage screen was built, and it was rendered only on that screen. So the
 * one thing Google can say that a crawler genuinely cannot -- that a page
 * returning 200 is a soft 404 -- appeared nowhere in the issue list, the
 * severity rollup, the CSV export, or the MCP issue tool.
 *
 * Free by construction: this reads the cache and never calls Google, so it
 * spends nothing against the 2000-per-property-per-day URL Inspection
 * allowance that `GscIndexCoverageService` manages.
 */
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { gscUrlInspections } from "@/db/schema";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { isStale, URL_BIND_CHUNK } from "@/server/features/gsc/indexCoverage";
import { sameCanonicalTarget } from "@/server/lib/audit/url-utils";
import { GscService } from "@/server/features/gsc/services/GscService";
import { gscPropertyCoversHost } from "@/shared/gscProperty";
import { classifyCoverageState } from "@/shared/gsc-coverage-states";

type PageRef = { id: string; url: string; isIndexable: boolean };

/*
 * Ninety days. Not a Google number -- there is no published crawl cadence --
 * but far enough past any healthy interval that "Google has not looked in a
 * quarter" is a fact about the page rather than about the calendar.
 */
const GOOGLE_CRAWL_STALE_DAYS = 90;

function hostOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function isOlderThanDays(timestamp: string, days: number, now: Date): boolean {
  const at = Date.parse(timestamp);
  if (Number.isNaN(at)) return false;
  return now.getTime() - at > days * 24 * 60 * 60 * 1000;
}

export async function findGoogleVerdictProblems(input: {
  projectId: string;
  pages: PageRef[];
  now?: Date;
}): Promise<DetectedIssue[]> {
  if (input.pages.length === 0) return [];

  /*
   * Only when the property covers what was crawled.
   *
   * The inspection cache is keyed by project and URL, not by property, so
   * pages of a site the project's property does not cover can have rows in
   * it -- asked before the Index Coverage tab started refusing, or through
   * the MCP tool. Those rows read "URL is unknown to Google", which is
   * true and useless: Google was asked the wrong question. Reporting it
   * would tell someone to fix their sitemap over a site that was never in
   * that property.
   */
  const connection = await GscService.getConnection(input.projectId);
  const auditedHost = hostOf(input.pages[0]?.url);
  if (!gscPropertyCoversHost(connection?.siteUrl, auditedHost)) return [];

  const byUrl = new Map(input.pages.map((page) => [page.url, page]));
  const urls = [...byUrl.keys()];
  const issues: DetectedIssue[] = [];
  const now = input.now ?? new Date();

  let staleRows = 0;
  let firstStale: { pageId: string; pageUrl: string } | null = null;

  const push = (
    issueType:
      | "google-soft-404"
      | "google-blocked-by-robots"
      | "google-blocked-by-meta"
      | "google-chose-different-canonical"
      | "google-crawled-not-indexed"
      | "google-discovered-not-indexed"
      | "google-duplicate-no-canonical"
      | "google-url-unknown"
      | "google-rich-results-invalid"
      | "google-crawl-stale",
    at: { pageId: string; pageUrl: string },
    details: Record<string, unknown>,
  ) => issues.push({ ...at, issueType, details });

  for (let i = 0; i < urls.length; i += URL_BIND_CHUNK) {
    const rows = await db
      .select({
        url: gscUrlInspections.url,
        verdict: gscUrlInspections.verdict,
        pageFetchState: gscUrlInspections.pageFetchState,
        indexingState: gscUrlInspections.indexingState,
        coverageState: gscUrlInspections.coverageState,
        lastCrawlTime: gscUrlInspections.lastCrawlTime,
        richResultsVerdict: gscUrlInspections.richResultsVerdict,
        robotsTxtState: gscUrlInspections.robotsTxtState,
        googleCanonical: gscUrlInspections.googleCanonical,
        userCanonical: gscUrlInspections.userCanonical,
        checkedAt: gscUrlInspections.checkedAt,
      })
      .from(gscUrlInspections)
      .where(
        and(
          eq(gscUrlInspections.projectId, input.projectId),
          inArray(gscUrlInspections.url, urls.slice(i, i + URL_BIND_CHUNK)),
        ),
      );

    for (const row of rows) {
      const page = byUrl.get(row.url);
      if (!page) continue;
      const at = { pageId: page.id, pageUrl: page.url };
      /*
       * How old Google's answer is, and whether that is old enough to stop
       * reporting it as a current fact.
       *
       * The comment here used to claim a fourteen-day bound "the refresh
       * scheduler uses". There is no scheduler: `STALE_AFTER_DAYS` only
       * decides which URLs the operator's manual refresh button picks, and
       * that button asks about 25 URLs a click. On a thousand-page site
       * the other rows keep their original `checkedAt` indefinitely -- so
       * a `critical` finding could be produced from a verdict recorded
       * months ago about a page since fixed, and would reappear at
       * `critical` on every later audit because nothing re-asks.
       *
       * A per-row severity override is not available and should not be:
       * `DetectedIssue` has no such field, `insertIssues` takes severity
       * from the registry, and `resolveIssueSeverity` makes the registry
       * win on read. So an aged-out row produces no verdict finding at
       * all, and one `stale-google-verdicts` issue says how many there are
       * and what to do -- which is the actionable half anyway.
       */
      const stale = isStale(
        // `isStale` reads only these three; building the shape explicitly
        // rather than casting keeps that dependency visible.
        {
          url: row.url,
          verdict: row.verdict,
          coverageState: null,
          robotsTxtState: null,
          indexingState: null,
          pageFetchState: null,
          lastCrawlTime: null,
          googleCanonical: null,
          userCanonical: null,
          richResultsVerdict: null,
          inspectionLink: null,
          error: null,
          checkedAt: row.checkedAt,
        },
        now,
      );
      if (stale) {
        staleRows += 1;
        firstStale ??= at;
        continue;
      }
      const details = { checkedAt: row.checkedAt };

      const verdict = (issueType: Parameters<typeof push>[0]) =>
        push(issueType, at, details);

      if (row.pageFetchState === "SOFT_404") verdict("google-soft-404");
      if (
        row.robotsTxtState === "DISALLOWED" ||
        row.indexingState === "BLOCKED_BY_ROBOTS_TXT"
      ) {
        verdict("google-blocked-by-robots");
      }
      /*
       * Only where this crawl disagreed. The registry copy says the finding
       * means the two crawlers are reading different versions of the page
       * and sends the operator to compare rendered HTML -- advice that is
       * wrong, and wastes their time, on a page that is plainly and
       * deliberately noindex in its source. `noindex-page` already covers
       * that, as `info`.
       */
      if (row.indexingState === "BLOCKED_BY_META_TAG" && page.isIndexable) {
        verdict("google-blocked-by-meta");
      }
      /*
       * Only when the page actually declared one. Google overriding an
       * undeclared canonical is ordinary behaviour on any site with
       * parameterised URLs, and reporting it would bury the case worth
       * seeing.
       *
       * `sameCanonicalTarget`, not `canonicalUrlKey`: the latter folds www
       * and deliberately keeps the trailing slash, so `/a/` against `/a`
       * read as a disagreement here while the Index Coverage tile -- which
       * strips the slash -- called the same row fine. Two screens, opposite
       * answers, for one project.
       */
      if (
        row.userCanonical &&
        row.googleCanonical &&
        !sameCanonicalTarget(row.userCanonical, row.googleCanonical)
      ) {
        push("google-chose-different-canonical", at, {
          ...details,
          declared: row.userCanonical,
          chosen: row.googleCanonical,
        });
      }

      /*
       * Why Google has not indexed the page, which only the coverage
       * sentence says: the enums beside it are identical for "discovered,
       * not indexed" and "unknown to Google", and those two send an
       * operator to opposite fixes. Unrecognised sentences classify as
       * null and raise nothing.
       *
       * The blocked and duplicate-canonical states are deliberately absent
       * from the classifier: `google-blocked-by-robots` and
       * `google-chose-different-canonical` above already report them from
       * the enums, and reporting both would file two findings for one
       * fact.
       */
      /*
       * Google's own verdict on the page's schema.org markup. A crawler can
       * see that markup exists -- `has_structured_data` does -- but not
       * whether it is valid, so this is the only source for it. PARTIAL
       * counts: it means some items were rejected, and the operator's
       * question is the same either way.
       */
      if (
        row.richResultsVerdict === "FAIL" ||
        row.richResultsVerdict === "PARTIAL"
      ) {
        push("google-rich-results-invalid", at, {
          ...details,
          verdict: row.richResultsVerdict,
        });
      }

      /*
       * When Google last fetched the page. Stored since the coverage screen
       * was built, read by nothing -- yet it answers a question no crawler
       * can: whether the version Google has is the version you published.
       * Only for pages Google has actually crawled; a null here means never,
       * which the coverage states above already report with the right words.
       */
      if (
        row.lastCrawlTime &&
        isOlderThanDays(row.lastCrawlTime, GOOGLE_CRAWL_STALE_DAYS, now)
      ) {
        push("google-crawl-stale", at, {
          ...details,
          lastCrawlTime: row.lastCrawlTime,
          thresholdDays: GOOGLE_CRAWL_STALE_DAYS,
        });
      }

      const coverage = classifyCoverageState(row.coverageState);
      if (coverage === "crawled-not-indexed") {
        verdict("google-crawled-not-indexed");
      } else if (coverage === "discovered-not-indexed") {
        verdict("google-discovered-not-indexed");
      } else if (coverage === "duplicate-no-canonical") {
        verdict("google-duplicate-no-canonical");
      } else if (coverage === "unknown-to-google") {
        verdict("google-url-unknown");
      }
    }
  }

  /*
   * One finding for the whole set rather than one per page: the operator
   * cannot act on an individual stale row, only on "go re-ask". The page
   * it attaches to is the first stale one, so the report has somewhere to
   * point.
   */
  if (staleRows > 0 && firstStale) {
    issues.push({
      ...firstStale,
      issueType: "stale-google-verdicts",
      details: { count: staleRows },
    });
  }

  return issues;
}
