/**
 * The decisions behind index coverage, with no database and no API.
 *
 * Two of them are worth testing on their own: how the counts are derived from
 * whatever Google last said, and which URLs are worth spending quota on. Both
 * are pure, so they live here and `GscIndexCoverageService` supplies the rows.
 */

/** Google allows 2000 inspections per property per day. */
export const DAILY_QUOTA = 2000;
/** One call is roughly a second, so a batch has to stay under a page load. */
const MAX_PER_RUN = 25;
/** Google re-crawls on its own schedule; a fresher check tells you nothing new. */
const STALE_AFTER_DAYS = 14;

export type CoverageRow = {
  url: string;
  verdict: string | null;
  coverageState: string | null;
  /**
   * The machine-readable reasons. `coverageState` is a free-form sentence
   * Google localises and may reword; these are stable enums, so anything that
   * has to branch on a reason branches on these.
   */
  robotsTxtState: string | null;
  indexingState: string | null;
  pageFetchState: string | null;
  lastCrawlTime: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  mobileVerdict: string | null;
  richResultsVerdict: string | null;
  inspectionLink: string | null;
  error: string | null;
  checkedAt: string | null;
};

export type IndexCoverage = {
  /** Every indexable page in the audit, with its inspection when there is one. */
  rows: CoverageRow[];
  checked: number;
  indexed: number;
  /** Google looked and said no: excluded, or an error on its side. */
  notIndexed: number;
  /** Crawled pages never inspected, or last inspected too long ago. */
  pending: number;
  /** Declared canonical differs from the one Google picked. */
  canonicalMismatches: number;
  lastCheckedAt: string | null;
};

export function blankRow(url: string): CoverageRow {
  return {
    url,
    verdict: null,
    coverageState: null,
    robotsTxtState: null,
    indexingState: null,
    pageFetchState: null,
    lastCrawlTime: null,
    googleCanonical: null,
    userCanonical: null,
    mobileVerdict: null,
    richResultsVerdict: null,
    inspectionLink: null,
    error: null,
    checkedAt: null,
  };
}

/**
 * Compare two URLs the way Google treats them. A declared `https://x/a/` and a
 * chosen `https://x/a` are the same page, and reporting that as a mismatch
 * would bury the real ones.
 */
function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    const path = url.pathname.replace(/\/+$/, "");
    return `${url.protocol}//${url.host}${path}${url.search}`;
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function sameUrl(a: string, b: string): boolean {
  return normalizeUrl(a) === normalizeUrl(b);
}

function isStale(checkedAt: string | null, now: Date): boolean {
  if (!checkedAt) return true;
  // SQLite's CURRENT_TIMESTAMP carries no zone marker; treat that shape as UTC.
  const ms = Date.parse(
    /^\d{4}-\d{2}-\d{2} /.test(checkedAt)
      ? `${checkedAt.replace(" ", "T")}Z`
      : checkedAt,
  );
  if (Number.isNaN(ms)) return true;
  return now.getTime() - ms > STALE_AFTER_DAYS * 86_400_000;
}

export function summarizeCoverage(
  urls: string[],
  stored: Map<string, CoverageRow>,
): IndexCoverage {
  const rows = urls.map((url) => stored.get(url) ?? blankRow(url));

  let indexed = 0;
  let notIndexed = 0;
  let pending = 0;
  let canonicalMismatches = 0;
  let lastCheckedAt: string | null = null;

  for (const row of rows) {
    // An errored check is not an answer, so it stays in the queue. Neither is
    // VERDICT_UNSPECIFIED, which is Google declining to say: counting that as
    // "not indexed" would invent a negative Google never gave.
    const answered =
      row.checkedAt &&
      !row.error &&
      row.verdict &&
      row.verdict !== "VERDICT_UNSPECIFIED";
    if (!answered) {
      pending += 1;
      continue;
    }
    if (!lastCheckedAt || row.checkedAt! > lastCheckedAt) {
      lastCheckedAt = row.checkedAt;
    }
    // "PASS" is Google's word for "this URL is on Google". NEUTRAL is
    // "excluded" and FAIL is "error"; both mean it is not there.
    if (row.verdict === "PASS") indexed += 1;
    else notIndexed += 1;

    // The costly case is the one where the page declared no canonical at all
    // and Google picked a different URL anyway. Comparing only when the page
    // declared one skipped exactly that case, so an undeclared canonical is
    // compared against the URL itself.
    if (
      row.googleCanonical &&
      !sameUrl(row.googleCanonical, row.userCanonical ?? row.url)
    ) {
      canonicalMismatches += 1;
    }
  }

  return {
    rows,
    checked: rows.length - pending,
    indexed,
    notIndexed,
    pending,
    canonicalMismatches,
    lastCheckedAt,
  };
}

/** One batch of URLs worth asking about, plus how many are left after it. */
export function selectDueUrls(
  urls: string[],
  stored: Map<string, CoverageRow>,
  now: Date,
): { batch: string[]; remaining: number } {
  const due = urls.filter((url) =>
    isStale(stored.get(url)?.checkedAt ?? null, now),
  );
  return {
    batch: due.slice(0, MAX_PER_RUN),
    remaining: Math.max(due.length - MAX_PER_RUN, 0),
  };
}
