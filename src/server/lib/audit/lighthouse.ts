import { detectUrlTemplate, canonicalUrlKey } from "./url-utils";
import { fetchPageSpeedReport, PageSpeedError } from "./pagespeed";
import { isLighthouseRuntimeError } from "./pagespeedPayload";
import type {
  LighthouseMode,
  LighthouseResult,
  LighthouseStrategy,
} from "./types";
import { putTextToR2 } from "@/server/lib/r2";

interface LighthouseSamplePage {
  url: string;
  statusCode: number;
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
};

/** A check that produced no payload — provider error, or a failed fetch step. */
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
      errorMessage,
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
    // A transient failure (network, quota, 5xx) goes back to the Workflow so the
    // step retries. Everything else becomes a failed row: the crawl results are
    // the bulk of an audit's value and must still land.
    if (error instanceof PageSpeedError && error.retryable) throw error;

    const failed = error instanceof Error ? error : new Error(String(error));
    // A Lighthouse runtime error means the page itself didn't load for Google's
    // Chrome. It's already surfaced on the audit row, so there's nothing to act
    // on here.
    const log = isLighthouseRuntimeError(failed.message)
      ? console.warn
      : console.error;
    log(`Lighthouse failed for ${url} (${strategy}): ${failed.message}`);
    return failedLighthouseFetch(url, pageId, strategy, failed.message);
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

/**
 * Select which pages to run Lighthouse on, based on the chosen strategy.
 */
export function selectLighthouseSample(
  pages: LighthouseSamplePage[],
  startUrl: string,
  mode: LighthouseMode,
): string[] {
  if (mode === "none") return [];

  // Only consider pages that loaded successfully
  const validPages = pages.filter(
    (p) => p.statusCode >= 200 && p.statusCode < 300,
  );

  // mode === "auto": homepage + 1 per URL pattern, capped at 10
  const selected = new Set<string>();

  // Always include the start URL / homepage. Prefer an exact canonical match
  // so distinct 2xx `/path` and `/path/` pages stay distinct, then tolerate a
  // trailing-slash redirect when the exact start URL was not crawled as 2xx.
  const startKey = canonicalUrlKey(startUrl);
  const startPage =
    validPages.find((p) => canonicalUrlKey(p.url) === startKey) ??
    validPages.find(
      (p) =>
        canonicalUrlKeyWithoutTrailingSlash(p.url) ===
        canonicalUrlKeyWithoutTrailingSlash(startUrl),
    );
  if (startPage) selected.add(startPage.url);

  // Group by URL template pattern
  const templateGroups = new Map<string, LighthouseSamplePage>();
  if (startPage) {
    templateGroups.set(
      detectUrlTemplate(new URL(startPage.url).pathname),
      startPage,
    );
  }
  for (const page of validPages) {
    if (selected.has(page.url)) continue;
    const template = detectUrlTemplate(new URL(page.url).pathname);
    if (!templateGroups.has(template)) {
      templateGroups.set(template, page);
    }
  }

  // Add one page per template group
  for (const [, page] of templateGroups) {
    if (selected.size >= 10) break;
    selected.add(page.url);
  }

  return Array.from(selected);
}
