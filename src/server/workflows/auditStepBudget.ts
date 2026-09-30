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
  // Worst case: every chunk step fails after its retries and a fallback
  // step records the error rows.
  return worstCase ? chunks * 2 : chunks;
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
