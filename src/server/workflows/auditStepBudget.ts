/**
 * Workflow step budget for one audit.
 *
 * Cloudflare Workflows caps steps per instance (docs: 10,000 default,
 * 25,000 with `limits.steps`; 1,024 on the Free plan; `step.sleep` does not
 * count; retries are not separate steps). Verified 2026-09-30 at
 * developers.cloudflare.com/workflows/reference/limits. Keep the formulas here
 * in step with the phases that create the steps.
 */

/** Platform default on the Paid plan; wrangler.audit.jsonc raises it. */
export const WORKFLOW_DEFAULT_STEP_LIMIT = 10_000;

/** URLs measured per `lighthouse-chunk-N` step (2 checks each, in parallel). */
export const LIGHTHOUSE_URLS_PER_STEP = 5;
/**
 * Re-passes a wave may make for checks that hit Google's per-minute limit,
 * each after a pause. A pass is a `step.do`; the pauses are `step.sleep`.
 */
export const LIGHTHOUSE_RATE_LIMIT_PASSES = 2;
/**
 * Pause before a re-pass: longer than the one-minute window the limit resets
 * on. Not verified against Google; the window length is the documented
 * meaning of "per minute".
 */
export const LIGHTHOUSE_RATE_LIMIT_PAUSE = "65 seconds";
/** Crawl chunk size: pages claimed per `crawl-chunk-N` step at most. */
const CRAWL_CHUNK_PAGES = 200;
/**
 * validate-context, discover-urls-v2, select-lighthouse-sample,
 * multipage-checks, finalize, plus mark-failed on a failed run.
 */
const FIXED_AUDIT_STEPS = 6;

/** Steps the speed phase creates for this many measured pages. */
export function lighthouseStepCount(pages: number, worstCase = false) {
  const chunks = Math.ceil(pages / LIGHTHOUSE_URLS_PER_STEP);
  // Worst case: every wave is rate limited through all its re-passes and then
  // fails into a fallback step that records the error rows.
  return worstCase ? chunks * (LIGHTHOUSE_RATE_LIMIT_PASSES + 2) : chunks;
}

/**
 * Total steps for an audit of `pages` pages with speed on. Crawl chunks are
 * at best pages/200; a slow site cuts chunks at the 90s soft deadline, so the
 * pessimistic crawl figure assumes `pagesPerCrawlChunk` pages per chunk.
 */
export function auditStepCount(
  pages: number,
  options: { speed: boolean; pagesPerCrawlChunk?: number } = { speed: true },
) {
  const perChunk = options.pagesPerCrawlChunk ?? CRAWL_CHUNK_PAGES;
  const crawl = Math.ceil(pages / perChunk);
  const worst = options.pagesPerCrawlChunk !== undefined;
  return (
    FIXED_AUDIT_STEPS +
    crawl +
    (options.speed ? lighthouseStepCount(pages, worst) : 0)
  );
}
