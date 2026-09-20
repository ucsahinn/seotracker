/**
 * The decisions behind index coverage, with no database and no API.
 *
 * Two of them are worth testing on their own: how the counts are derived from
 * whatever Google last said, and which URLs are worth spending quota on. Both
 * are pure, so they live here and `GscIndexCoverageService` supplies the rows.
 */

import { sort } from "remeda";

/** Google allows 2000 inspections per property per day. */
export const DAILY_QUOTA = 2000;
/** One call is roughly a second, so a batch has to stay under a page load. */
const MAX_PER_RUN = 25;
/** Google re-crawls on its own schedule; a fresher check tells you nothing new. */
const STALE_AFTER_DAYS = 14;
/**
 * Except when the last answer was a refusal. "Crawled - currently not
 * indexed" is the page you are actively working on, and the whole value of
 * re-asking is finding out that the work landed. Waiting a fortnight to learn
 * that spends the quota on pages that were already fine.
 */
const STALE_AFTER_DAYS_UNRESOLVED = 3;

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
  /** Crawled pages Google has never given an answer for. */
  pending: number;
  /**
   * Pages Google has been asked about at all, answer or not. Distinct from
   * `checked`, which counts answers: a run where every inspection errored
   * leaves `checked` at zero, and a screen keyed off that told the operator
   * Google had never been asked while hiding the very rows carrying the
   * error that explains why.
   */
  asked: number;
  /**
   * How many the refresh button would actually ask about. Not the same as
   * `pending`: an answered page whose answer has aged out is due without
   * being pending, and the button has to key off this one or it sits
   * disabled while there is work to do.
   */
  due: number;
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

/** SQLite's CURRENT_TIMESTAMP carries no zone marker; treat that shape as UTC. */
function parseStamp(value: string | null): number {
  if (!value) return Number.NaN;
  return Date.parse(
    /^\d{4}-\d{2}-\d{2} /.test(value) ? `${value.replace(" ", "T")}Z` : value,
  );
}

/**
 * How overdue this row is, as a multiple of its own re-ask window.
 *
 * One number does two jobs that used to be two functions, because when they
 * were separate they disagreed. Staleness is `overdue > 1`; priority is the
 * same value sorted descending. A row can no longer be due without being
 * ranked, or ranked without being due.
 *
 * Expressing it as a ratio rather than a band also stops one class of row
 * starving another. Strict bands meant a site with more refused pages than a
 * batch can hold never re-asked an indexed page at all, so a page that
 * silently dropped out of the index was never noticed -- which is the one
 * thing the 14-day window exists to catch. A 60-day-old PASS is 4.3 windows
 * overdue and now outranks a 4-day-old refusal at 1.3.
 */
function overdueRatio(row: CoverageRow | undefined, now: Date): number {
  // Never asked: the only genuinely unknown answer, so nothing outranks it.
  if (!row || !row.checkedAt) return Number.POSITIVE_INFINITY;
  const ms = parseStamp(row.checkedAt);
  if (Number.isNaN(ms)) return Number.POSITIVE_INFINITY;
  /*
   * An error used to return "due" unconditionally, with no age at all. That
   * looked like urgency and behaved like a livelock: 25 URLs outside the
   * verified property error on every inspection, are due again instantly,
   * sort to the front, and fill every batch forever -- burning 25 real
   * inspections a click and never letting another URL through. A failed ask
   * is worth repeating, but on the same clock as any other unresolved row.
   */
  const days =
    !row.error && row.verdict === "PASS"
      ? STALE_AFTER_DAYS
      : STALE_AFTER_DAYS_UNRESOLVED;
  return (now.getTime() - ms) / (days * 86_400_000);
}

function isStale(row: CoverageRow | undefined, now: Date): boolean {
  return overdueRatio(row, now) > 1;
}

export function summarizeCoverage(
  urls: string[],
  stored: Map<string, CoverageRow>,
  now: Date = new Date(),
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
    // Parsed, not compared as strings. Two formats live in this column: the
    // SQLite default "2026-09-19 22:30:00" and the ISO form a refresh writes.
    // A space sorts before "T", so the later of the two could read as older.
    if (
      !lastCheckedAt ||
      parseStamp(row.checkedAt) > parseStamp(lastCheckedAt)
    ) {
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
    asked: rows.filter((row) => row.checkedAt).length,
    indexed,
    notIndexed,
    pending,
    due: rows.filter((row) => isStale(stored.get(row.url), now)).length,
    canonicalMismatches,
    lastCheckedAt,
  };
}

/**
 * One batch of URLs worth asking about, plus how many are left after it.
 *
 * `budget` is what is left of the day's quota. Google allows 2000 inspections
 * per property per day and answers the 2001st with an error, so a run that
 * would cross the line is trimmed rather than half-failed.
 */
export function selectDueUrls(
  urls: string[],
  stored: Map<string, CoverageRow>,
  now: Date,
  budget: number = MAX_PER_RUN,
): { batch: string[]; remaining: number } {
  const due = urls.filter((url) => isStale(stored.get(url), now));
  // Most overdue first. Total and transitive -- every row maps to one finite
  // or infinite number -- so the sort is well defined; ties keep crawl order.
  // Compared, not subtracted: two never-asked rows are both Infinity, and
  // Infinity - Infinity is NaN, which makes the comparator inconsistent and
  // the resulting order implementation-defined.
  const ordered = sort(due, (a, b) => {
    const left = overdueRatio(stored.get(a), now);
    const right = overdueRatio(stored.get(b), now);
    if (left === right) return 0;
    return left > right ? -1 : 1;
  });
  const take = Math.max(Math.min(MAX_PER_RUN, budget), 0);
  return {
    batch: ordered.slice(0, take),
    remaining: Math.max(ordered.length - take, 0),
  };
}
