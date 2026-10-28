/**
 * Bounded retry for network-level fetch failures.
 *
 * The Windows build runs inside workerd, whose outbound proxy reports a
 * dropped connection as a plain rejection ("Network connection lost.",
 * "internal error; reference = ...") and marks it retryable. One such blip
 * used to fail a whole Search Console report with INTERNAL_ERROR. Only the
 * transport is retried: an HTTP answer, even a 5xx other than the gateway
 * family, is Google speaking and is returned to the caller unchanged. A
 * timeout is not retried either -- the caller already waited the full budget.
 */

/** A request that never got an HTTP answer, after every retry was spent. */
export class UpstreamNetworkError extends Error {
  constructor(
    public readonly service: string,
    /** The transport's own words, URLs removed. Safe to show. */
    public readonly reason: string,
    public readonly attempts: number,
    options?: { cause?: unknown },
  ) {
    super(
      `${service} could not be reached after ${attempts} attempt(s): ${reason}`,
      options,
    );
    this.name = "UpstreamNetworkError";
  }
}

const TRANSIENT_MESSAGE =
  /network connection lost|internal error|fetch failed|econnreset|econnrefused|etimedout|eai_again|enotfound|socket|connection (?:reset|closed|refused)|disconnected|network ?error/i;

/** True for a rejection that means "no answer arrived", not "a bad answer". */
export function isTransientNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  if (error.name === "AbortError" || error.name === "TimeoutError") {
    return false;
  }
  return error instanceof TypeError || TRANSIENT_MESSAGE.test(error.message);
}

/** The transport's message without URLs (they can carry query strings). */
export function networkErrorReason(error: unknown): string {
  const message =
    error instanceof Error && error.message ? error.message : String(error);
  return message
    .replace(/https?:\/\/\S+/g, "<url>")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

// Gateway answers that mean the request did not reach Google's service.
const RETRYABLE_STATUSES = new Set([502, 503, 504]);

const DEFAULT_RETRY_DELAYS_MS = [400, 1200] as const;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * `fetch` with up to `retryDelaysMs.length` retries on transport failures and
 * gateway statuses. A fresh timeout signal is made for every attempt. When
 * every attempt fails at the transport, throws `UpstreamNetworkError`; any
 * other rejection (abort, timeout) is rethrown untouched.
 */
export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  options: {
    service: string;
    timeoutMs?: number;
    retryDelaysMs?: readonly number[];
  },
): Promise<Response> {
  const delays = options.retryDelaysMs ?? DEFAULT_RETRY_DELAYS_MS;
  const attempts = delays.length + 1;
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, {
        ...init,
        ...(options.timeoutMs
          ? {
              signal: init.signal
                ? AbortSignal.any([
                    init.signal,
                    AbortSignal.timeout(options.timeoutMs),
                  ])
                : AbortSignal.timeout(options.timeoutMs),
            }
          : {}),
      });
      if (!RETRYABLE_STATUSES.has(response.status) || attempt === attempts) {
        return response;
      }
      await response.body?.cancel().catch(() => {});
      console.warn(
        `${options.service}: HTTP ${response.status} on attempt ${attempt}/${attempts}, retrying`,
      );
    } catch (error) {
      if (!isTransientNetworkError(error)) throw error;
      lastError = error;
      console.warn(
        `${options.service}: network failure on attempt ${attempt}/${attempts}: ${networkErrorReason(error)}`,
      );
      if (attempt === attempts) break;
    }
    await sleep(delays[attempt - 1] ?? 0);
  }
  throw new UpstreamNetworkError(
    options.service,
    networkErrorReason(lastError),
    attempts,
    { cause: lastError },
  );
}
