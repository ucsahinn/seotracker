import { canonicalUrlKey } from "./url-utils";
import { fetchPageSpeedReport, PageSpeedError } from "./pagespeed";
import { isLighthouseRuntimeError, redactKey } from "./pagespeedPayload";
import type {
  LighthouseMode,
  LighthouseResult,
  LighthouseStrategy,
} from "./types";
import { putTextToR2 } from "@/server/lib/r2";
import { LIGHTHOUSE_QUOTA_MARKER } from "@/shared/audit-limits";

interface LighthousePage {
  url: string;
  statusCode: number;
  fetchClass?: string;
}

function canonicalUrlKeyWithoutTrailingSlash(url: string): string {
  const parsed = new URL(canonicalUrlKey(url));
  if (parsed.pathname !== "/") {
    parsed.pathname = parsed.pathname.replace(/\/$/, "");
  }
  return parsed.toString();
}

type LighthouseFetchResult = {
  result: LighthouseResult;
  payloadJson: string | null;
  /** Google's daily quota is spent; the phase stops instead of going on. */
  quotaExhausted?: boolean;
  /**
   * Per-minute 429: not a failure yet. The wave pauses and re-runs this check;
   * the error row is only stored once the re-passes are used up.
   */
  rateLimited?: boolean;
  /**
   * Another transient failure (network, 5xx). Settled per check like a 429: its
   * siblings are stored now and only this one is re-fetched after a pause.
   */
  retryable?: boolean;
};

/**
 * A check that produced no payload — provider error, or a failed fetch step.
 * The one choke point for stored error text: the API key is stripped here so
 * no caller has to remember to.
 */
export function failedLighthouseFetch(
  url: string,
  pageId: string,
  strategy: LighthouseStrategy,
  errorMessage: string,
): LighthouseFetchResult {
  return {
    result: {
      url,
      pageId,
      strategy,
      performanceScore: null,
      accessibilityScore: null,
      bestPracticesScore: null,
      seoScore: null,
      lcpMs: null,
      cls: null,
      inpMs: null,
      ttfbMs: null,
      errorMessage: redactKey(errorMessage),
    },
    payloadJson: null,
  };
}

export async function fetchLighthouseResult(
  url: string,
  pageId: string,
  strategy: LighthouseStrategy,
): Promise<LighthouseFetchResult> {
  try {
    const data = await fetchPageSpeedReport({ url, strategy });

    return {
      result: {
        url,
        pageId,
        strategy,
        performanceScore: data.scores.performance,
        accessibilityScore: data.scores.accessibility,
        bestPracticesScore: data.scores["best-practices"],
        seoScore: data.scores.seo,
        lcpMs: data.metrics.largestContentfulPaint.numericValue,
        cls: data.metrics.cumulativeLayoutShift.numericValue,
        inpMs: data.metrics.interactionToNextPaint.numericValue,
        ttfbMs: data.metrics.serverResponseTime.numericValue,
      },
      payloadJson: JSON.stringify(data),
    };
  } catch (error) {
    // A per-minute 429 or another transient failure (network, 5xx) is handed
    // back flagged, never thrown: one flaky check must not discard its healthy
    // siblings. The wave re-runs only the flagged checks and stores an error
    // row once its passes are used up. Everything else becomes a failed row:
    // the crawl results are the bulk of an audit's value and must still land.
    if (
      error instanceof PageSpeedError &&
      (error.rateLimited || error.retryable) &&
      !error.quotaExhausted
    ) {
      return {
        ...failedLighthouseFetch(url, pageId, strategy, error.message),
        retryable: true,
        ...(error.rateLimited ? { rateLimited: true } : {}),
      };
    }
    if (error instanceof PageSpeedError && error.quotaExhausted) {
      const quota = failedLighthouseFetch(
        url,
        pageId,
        strategy,
        `${LIGHTHOUSE_QUOTA_MARKER}: Google'ın günlük PageSpeed ölçüm sınırı doldu.`,
      );
      return { ...quota, quotaExhausted: true };
    }

    const failed = failedLighthouseFetch(
      url,
      pageId,
      strategy,
      error instanceof Error ? error.message : String(error),
    );
    const message = failed.result.errorMessage ?? "";
    // A Lighthouse runtime error means the page itself didn't load for Google's
    // Chrome. It's already surfaced on the audit row, so there's nothing to act
    // on here.
    const log = isLighthouseRuntimeError(message)
      ? console.warn
      : console.error;
    log(`Lighthouse failed for ${url} (${strategy}): ${message}`);
    return failed;
  }
}

export async function storeLighthouseResult(input: {
  projectId: string;
  auditId: string;
  fetched: LighthouseFetchResult;
}): Promise<LighthouseResult> {
  if (!input.fetched.payloadJson) {
    return input.fetched.result;
  }

  const { pageId, strategy } = input.fetched.result;
  const key = `site-audit/${input.projectId}/${input.auditId}/${pageId}-${strategy}.json`;
  const uploaded = await putTextToR2(key, input.fetched.payloadJson);

  return {
    ...input.fetched.result,
    r2Key: uploaded.key,
    payloadSizeBytes: uploaded.sizeBytes,
  };
}

// The crawler does not store a content type, so a document that cannot be
// HTML is recognised by its extension. PageSpeed rejects those as NOT_HTML.
const NON_HTML_PATH =
  /\.(pdf|docx?|xlsx?|pptx?|zip|gz|rar|xml|json|txt|csv|rss|atom|jpe?g|png|gif|webp|avif|svg|ico|mp[34]|mov|webm|woff2?|ttf|css|js)$/i;

function isMeasurablePage(page: LighthousePage): boolean {
  if (page.statusCode < 200 || page.statusCode >= 300) return false;
  if (page.fetchClass !== undefined && page.fetchClass !== "ok") return false;
  return !NON_HTML_PATH.test(new URL(page.url).pathname);
}

/**
 * Which crawled pages get a speed measurement.
 *
 * Every page that loaded (2xx, not blocked) is measured, indexable or not,
 * each URL once. The start page comes first so a quota that runs out early
 * still covers the page that matters most. `cap` bounds the run when no
 * PageSpeed key is set.
 */
export function selectLighthousePages(
  pages: LighthousePage[],
  startUrl: string,
  mode: LighthouseMode,
  cap: number = Number.POSITIVE_INFINITY,
): string[] {
  if (mode === "none") return [];

  const validPages = pages.filter(isMeasurablePage);

  // Prefer an exact canonical match so distinct 2xx `/path` and `/path/` pages
  // stay distinct, then tolerate a trailing-slash redirect when the exact
  // start URL was not crawled as 2xx.
  const startKey = canonicalUrlKey(startUrl);
  const startPage =
    validPages.find((p) => canonicalUrlKey(p.url) === startKey) ??
    validPages.find(
      (p) =>
        canonicalUrlKeyWithoutTrailingSlash(p.url) ===
        canonicalUrlKeyWithoutTrailingSlash(startUrl),
    );

  const selected = new Set<string>();
  if (startPage) selected.add(startPage.url);
  for (const page of validPages) selected.add(page.url);

  return Array.from(selected).slice(0, cap);
}
