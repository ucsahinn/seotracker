import type { StoredLighthousePayload } from "@/server/lib/lighthouseStoredPayload";
import {
  PAGESPEED_CATEGORIES,
  parsePageSpeedPayload,
  readPageSpeedApiError,
} from "./pagespeedPayload";
import type { LighthouseStrategy } from "./types";

const PAGESPEED_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

// Google runs a full Lighthouse pass plus a field-data lookup, so a cold run on
// a slow site regularly passes a minute. The step budget is five minutes for
// two parallel calls, which leaves room for two attempts each.
const REQUEST_TIMEOUT_MS = 120_000;

// Lighthouse localizes audit titles and descriptions, and those strings are
// persisted verbatim into every stored issue. Pinning the locale keeps the same
// finding worded the same way across runs.
const REPORT_LOCALE = "tr";

export class PageSpeedError extends Error {
  readonly status: number | null;
  /** True when another attempt could plausibly succeed. */
  readonly retryable: boolean;
  /** True when the daily quota is spent: every later call fails the same way. */
  readonly quotaExhausted: boolean;
  /**
   * True for a per-minute 429. The limit frees up within about a minute, so the
   * workflow pauses and re-runs just those checks rather than storing a failure.
   */
  readonly rateLimited: boolean;

  constructor(
    message: string,
    options: {
      status: number | null;
      retryable: boolean;
      quotaExhausted?: boolean;
      rateLimited?: boolean;
    },
  ) {
    super(message);
    this.name = "PageSpeedError";
    this.status = options.status;
    this.retryable = options.retryable;
    this.quotaExhausted = options.quotaExhausted ?? false;
    this.rateLimited = options.rateLimited ?? false;
  }
}

/**
 * One report body is parsed at a time per isolate. The raw payload runs to
 * several megabytes and is held more than once while parsing, which is the
 * operation that used to exhaust the audit worker's memory. Requests still run
 * concurrently; only the parse is serialized, and workerd streams a body that
 * has not been read yet, so waiting siblings buffer nothing.
 */
let parseChain: Promise<unknown> = Promise.resolve();

function withParseLock<T>(run: () => Promise<T>): Promise<T> {
  const next = parseChain.then(run, run);
  parseChain = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function buildRequestUrl(
  url: string,
  strategy: LighthouseStrategy,
  apiKey: string | undefined,
): string {
  const params = new URLSearchParams({
    url,
    strategy,
    locale: REPORT_LOCALE,
  });
  for (const category of PAGESPEED_CATEGORIES) {
    params.append("category", category);
  }
  if (apiKey) params.set("key", apiKey);
  return `${PAGESPEED_ENDPOINT}?${params.toString()}`;
}

/**
 * Classifies a non-2xx response. Anything caused by the page itself, or by a
 * key that will never work, is final — retrying it only burns the step budget
 * and delays the rest of the audit.
 */
export function classifyFailure(
  status: number,
  message: string,
  hasApiKey: boolean,
): PageSpeedError {
  // "Queries per day" never recovers within the audit, so retrying only burns
  // time; the audit stops measuring and keeps what it has. A per-minute 429
  // is flagged `rateLimited` below so the wave can pause and re-run it.
  if (status === 429 && /per day|daily/i.test(message)) {
    return new PageSpeedError(message, {
      status,
      retryable: false,
      quotaExhausted: true,
    });
  }
  if (isFinalStatus(status) || isPageFault(message)) {
    return new PageSpeedError(message, { status, retryable: false });
  }
  if (status === 429 && !hasApiKey) {
    return new PageSpeedError(
      `No PageSpeed key set — ${message}. A free key raises the quota and ` +
        `is entered under Settings; see docs/PAGESPEED_API_KEY.md.`,
      { status, retryable: true, rateLimited: true },
    );
  }
  return new PageSpeedError(message, {
    status,
    retryable: true,
    rateLimited: status === 429,
  });
}

function isFinalStatus(status: number): boolean {
  // 400/404/422: the URL cannot be analyzed. 401/403: the key is rejected.
  return [400, 401, 403, 404, 422].includes(status);
}

function isPageFault(message: string): boolean {
  return /Lighthouse returned error|ERRORED_DOCUMENT_REQUEST|NO_FCP|NOT_HTML|INVALID_URL|DNS_FAILURE|FAILED_DOCUMENT_REQUEST/i.test(
    message,
  );
}

export async function fetchPageSpeedReport(input: {
  url: string;
  strategy: LighthouseStrategy;
}): Promise<StoredLighthousePayload> {
  /*
   * Loaded here rather than imported at the top. Resolving the key reaches
   * the database, which reaches `cloudflare:workers` -- a module only the
   * worker runtime provides. Everything else in this file is plain fetch
   * code that the node test project imports directly, and a static import
   * made the whole file unloadable outside workerd.
   */
  const { getPageSpeedApiKey } =
    await import("@/server/features/lighthouse/pagespeed-config");
  const apiKey = await getPageSpeedApiKey();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(buildRequestUrl(input.url, input.strategy, apiKey), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (error) {
    throw new PageSpeedError(
      error instanceof Error
        ? `PageSpeed Insights request failed: ${redactKey(error.message)}`
        : "PageSpeed Insights request failed",
      { status: null, retryable: true },
    );
  } finally {
    // Cleared once headers arrive: the body is read behind the parse lock, and
    // a still-armed signal would abort an analysis that already succeeded while
    // it waits its turn.
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // Error bodies are small, so this read stays outside the parse lock.
    const body = await response.json().catch(() => null);
    throw classifyFailure(
      response.status,
      readPageSpeedApiError(response.status, body),
      Boolean(apiKey),
    );
  }

  return withParseLock(async () => {
    const body = await response.json();
    return parsePageSpeedPayload(body, input);
  });
}

/**
 * The key travels in the query string, and some runtimes echo the request URL
 * in a network error. The message ends up in stored rows and in the report, so
 * it is stripped here rather than trusted never to appear.
 */
function redactKey(message: string): string {
  return message.replace(/([?&]key=)[^&\s"']+/gi, "$1[gizli]");
}
