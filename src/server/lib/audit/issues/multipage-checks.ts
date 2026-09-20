/**
 * Pure cross-page checks (no database access): duplicate grouping, redirect
 * chain/loop detection, canonical targets and hreflang return tags. The D1-backed checks (broken links,
 * orphans) live in multipage.ts.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { canonicalUrlKey } from "@/server/lib/audit/url-utils";
import type { HreflangAlternate } from "@/server/lib/audit/types";
import type { PageFetchClass } from "@/shared/audit-fetch-class";

const DUPLICATE_GROUP_SAMPLE = 3;

export interface SlimPage {
  id: string;
  url: string;
  statusCode: number | null;
  fetchClass: PageFetchClass;
  title: string | null;
  metaDescription: string | null;
  contentHash: string | null;
  redirectUrl: string | null;
  wordCount: number;
  isIndexable: boolean;
  canonicalUrl: string | null;
  headerCanonicalUrl: string | null;
  /**
   * The robots directives as written. `isIndexable` alone cannot support a
   * claim that a page is noindexed: `emptyPageResult` sets it false for
   * every non-HTML 200 as well, so a canonical pointing at a PDF was being
   * reported as pointing at a noindexed page.
   */
  robotsMeta: string | null;
  xRobotsTag: string | null;
  hreflangAlternates: HreflangAlternate[];
}

function isOkHtmlPage(page: SlimPage): boolean {
  return (
    page.fetchClass === "ok" &&
    page.statusCode !== null &&
    page.statusCode >= 200 &&
    page.statusCode < 300
  );
}

/**
 * Pages the owner already de-duplicated (noindex, or canonicalized to
 * another URL) don't belong in duplicate groups — flagging them tells the
 * user to fix something they already fixed.
 */
function isDuplicateCandidate(page: SlimPage): boolean {
  if (!isOkHtmlPage(page) || !page.isIndexable) return false;
  const effectiveCanonical = page.canonicalUrl ?? page.headerCanonicalUrl;
  return !effectiveCanonical || effectiveCanonical === page.url;
}

export function findDuplicates(pages: SlimPage[]): DetectedIssue[] {
  const okPages = pages.filter(isDuplicateCandidate);

  const groupBy = (
    keyOf: (page: SlimPage) => string | null,
  ): Map<string, SlimPage[]> => {
    const groups = new Map<string, SlimPage[]>();
    for (const page of okPages) {
      const key = keyOf(page);
      if (!key) continue;
      const group = groups.get(key);
      if (group) group.push(page);
      else groups.set(key, [page]);
    }
    return groups;
  };

  const issues: DetectedIssue[] = [];
  const emitGroups = (
    groups: Map<string, SlimPage[]>,
    issueType: DetectedIssue["issueType"],
  ) => {
    for (const group of groups.values()) {
      if (group.length < 2) continue;
      for (const page of group) {
        issues.push({
          issueType,
          pageId: page.id,
          pageUrl: page.url,
          details: {
            groupSize: group.length,
            otherUrls: group
              .filter((other) => other.id !== page.id)
              .slice(0, DUPLICATE_GROUP_SAMPLE)
              .map((other) => other.url),
          },
        });
      }
    }
  };

  emitGroups(
    groupBy((page) => page.title || null),
    "duplicate-title",
  );
  emitGroups(
    groupBy((page) => page.metaDescription || null),
    "duplicate-meta-description",
  );
  emitGroups(
    groupBy((page) => (page.wordCount > 0 ? page.contentHash : null)),
    "duplicate-content",
  );
  return issues;
}

/**
 * Where each page's declared canonical actually leads.
 *
 * A canonical is a vote, and the crawl already knows whether the URL it votes
 * for works. Three ways that vote is wasted, in descending damage:
 *
 * - it points at a page the crawl could not fetch, so Google discards the
 *   directive and picks a canonical itself;
 * - it points at a noindexed page, so the two directives cancel and both
 *   URLs can fall out of the index;
 * - it points at a redirect, which Google follows but which leaves the
 *   declared URL and the served URL disagreeing.
 *
 * Only pages the crawl actually visited can be judged. A canonical to an
 * off-site or out-of-scope URL is silently skipped rather than guessed at.
 */
export function findCanonicalTargetProblems(
  pages: SlimPage[],
): DetectedIssue[] {
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const issues: DetectedIssue[] = [];

  for (const page of pages) {
    if (!isOkHtmlPage(page)) continue;
    const canonical = page.canonicalUrl ?? page.headerCanonicalUrl;
    if (!canonical || canonical === page.url) continue;

    const target = byUrl.get(canonical);
    if (!target) continue;

    const status = target.statusCode;
    const details = { canonicalUrl: canonical, statusCode: status };

    /*
     * `blocked` and `rate_limited` describe what happened to this crawler,
     * not what is wrong with the site. The audit already reports those on
     * the target itself; repeating them one hop away as a verdict about the
     * canonical would light up a site behind a WAF with failures that do not
     * exist. An unjudgeable target is skipped, exactly as an uncrawled one is.
     */
    if (
      target.fetchClass === "blocked" ||
      target.fetchClass === "rate_limited"
    ) {
      continue;
    }

    if (status !== null && status >= 300 && status < 400) {
      issues.push({
        issueType: "canonical-to-redirect",
        pageId: page.id,
        pageUrl: page.url,
        details: { ...details, redirectsTo: target.redirectUrl },
      });
    } else if (!isOkHtmlPage(target)) {
      issues.push({
        issueType: "canonical-to-broken",
        pageId: page.id,
        pageUrl: page.url,
        details: { ...details, fetchClass: target.fetchClass },
      });
    } else if (
      !target.isIndexable &&
      (target.robotsMeta !== null || target.xRobotsTag !== null)
    ) {
      // The directive has to be there in writing. A page noindexed only by
      // `<meta name="googlebot">` is missed, because that one is not stored;
      // a missed finding beats a critical invented against a PDF.
      issues.push({
        issueType: "canonical-to-noindex",
        pageId: page.id,
        pageUrl: page.url,
        details,
      });
    }
  }

  return issues;
}

/**
 * hreflang return tags.
 *
 * An hreflang set is a claim about a group of pages, and it is only valid if
 * every page in the group makes it. When A says "the German version is B" but
 * B never points back at A, Google discards the pairing: neither page gets
 * the alternate treated as an alternate, and the cluster silently does
 * nothing. This is the single most common hreflang mistake, and it is
 * invisible in the source of either page on its own -- A looks complete, B
 * looks complete, only the pair is broken.
 *
 * Only alternates the crawl actually visited can be judged. An alternate on
 * another domain -- the normal shape of a country-domain setup -- is out of
 * scope and is skipped rather than reported as missing.
 */
export function findHreflangReturnTagProblems(
  pages: SlimPage[],
): DetectedIssue[] {
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const issues: DetectedIssue[] = [];

  for (const page of pages) {
    if (!isOkHtmlPage(page)) continue;
    const selfKey = canonicalUrlKey(page.url);

    for (const alternate of page.hreflangAlternates) {
      if (alternate.href === page.url) continue;
      const target = byUrl.get(alternate.href);
      if (!target || !isOkHtmlPage(target)) continue;

      /*
       * The return tag is matched on a folded key, not byte-for-byte. An
       * hreflang block is usually generated from a base-URL constant that is
       * not the one the crawl started from, so `https://www.site.com/en/`
       * and `https://site.com/en` name the same page and a strict compare
       * called a perfectly reciprocal cluster broken.
       */
      const returns = target.hreflangAlternates.some(
        (back) =>
          back.href === page.url || canonicalUrlKey(back.href) === selfKey,
      );
      if (returns) continue;

      issues.push({
        issueType: "hreflang-no-return-tag",
        pageId: page.id,
        pageUrl: page.url,
        // One issue per unreciprocated alternate, so a page declaring six
        // languages can report the two that are actually broken.
        dedupeKey: alternate.href,
        details: {
          alternateUrl: alternate.href,
          hreflang: alternate.hreflang,
        },
      });
    }
  }

  return issues;
}

export function findRedirectChainsAndLoops(pages: SlimPage[]): DetectedIssue[] {
  const redirects = new Map<string, SlimPage>();
  for (const page of pages) {
    const isRedirect =
      page.statusCode !== null &&
      page.statusCode >= 300 &&
      page.statusCode < 400 &&
      page.redirectUrl;
    if (isRedirect) redirects.set(page.url, page);
  }

  const redirectTargets = new Set(
    Array.from(redirects.values(), (page) => page.redirectUrl!),
  );

  const issues: DetectedIssue[] = [];
  const walked = new Set<string>();

  // Walk from chain heads (redirects nothing else redirects to), so a 5-hop
  // chain yields one issue, not five.
  for (const [url, head] of redirects) {
    if (redirectTargets.has(url)) continue;

    const hops: string[] = [url];
    const seen = new Set(hops);
    walked.add(url);
    let current = head.redirectUrl;
    let isLoop = false;
    while (current) {
      if (seen.has(current)) {
        isLoop = true;
        hops.push(current);
        break;
      }
      hops.push(current);
      seen.add(current);
      if (redirects.has(current)) walked.add(current);
      current = redirects.get(current)?.redirectUrl ?? null;
    }

    if (isLoop) {
      issues.push({
        issueType: "redirect-loop",
        pageId: head.id,
        pageUrl: url,
        details: { hops },
      });
    } else if (hops.length > 2) {
      // url -> a -> b: two redirects before content = a chain
      issues.push({
        issueType: "redirect-chain",
        pageId: head.id,
        pageUrl: url,
        details: { hops, finalUrl: hops[hops.length - 1] },
      });
    }
  }

  // Headless cycles (every member is also a target — e.g. a↔b, or a→a) are
  // never reached from a head; emit one loop issue per cycle.
  for (const [url, page] of redirects) {
    if (walked.has(url)) continue;

    const cycle: string[] = [];
    let current: string | null = url;
    while (current && !walked.has(current)) {
      walked.add(current);
      cycle.push(current);
      current = redirects.get(current)?.redirectUrl ?? null;
    }
    issues.push({
      issueType: "redirect-loop",
      pageId: page.id,
      pageUrl: url,
      details: { hops: [...cycle, url] },
    });
  }

  return issues;
}
