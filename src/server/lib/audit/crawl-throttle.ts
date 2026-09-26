/** Retries per URL after its first 429. Every 429 still pauses new URLs. */
const MAX_RETRIES = 3;
const FIRST_DELAY_MS = 30_000;
const MAX_INTERVAL_MS = 30_000;
const MAX_COOLDOWN_MS = 30 * 60_000;

/** Checkpointed between chunks so a new step does not forget site limits. */
export type CrawlThrottleState = {
  intervalMs: number;
  nextRequestAt: number;
  pausedUntil: number;
  consecutiveRateLimits: number;
  cooldownMs: number;
};

/** `Retry-After` is either delay-seconds or an HTTP-date. */
function parseRetryAfterMs(header: string | null): number | null {
  if (!header) return null;
  const value = header.trim();
  // Keep over-budget values finite for checkpoint serialization/arithmetic.
  if (/^\d+$/.test(value))
    return Math.min(Number(value) * 1_000, MAX_COOLDOWN_MS + 1);
  const at = Date.parse(value);
  return Number.isNaN(at) ? null : Math.max(0, at - Date.now());
}

export interface CrawlThrottle {
  /** False when this chunk can no longer start a request. */
  ready(): Promise<boolean>;
  /** Pause the origin on every 429; return whether this URL may retry. */
  backoff(attempt: number, retryAfter: string | null): Promise<boolean>;
  /** A non-429 response breaks a run of consecutive refusals. */
  recovered(): Promise<void>;
  readonly checkpointFailed: boolean;
  readonly stopped: boolean;
  readonly state: CrawlThrottleState;
}

/** One audit's origin pacing. Long waits are resumed by the workflow. */
export function createCrawlThrottle(
  deadlineAt: number,
  previous?: CrawlThrottleState,
  persist?: (state: CrawlThrottleState) => Promise<void>,
): CrawlThrottle {
  const state: CrawlThrottleState = previous
    ? { ...previous }
    : {
        intervalMs: 1_000,
        nextRequestAt: 0,
        pausedUntil: 0,
        consecutiveRateLimits: 0,
        cooldownMs: 0,
      };
  let checkpointFailed = false;
  let checkpoint = Promise.resolve();
  const save = () => {
    const snapshot = { ...state };
    checkpoint = checkpoint
      .then(() => persist?.(snapshot))
      .catch((error) => {
        checkpointFailed = true;
        throw error;
      });
    return checkpoint;
  };
  const stopped = () =>
    checkpointFailed ||
    state.consecutiveRateLimits > MAX_RETRIES ||
    state.cooldownMs > MAX_COOLDOWN_MS;
  return {
    async ready() {
      while (!stopped()) {
        await checkpoint;
        const now = Date.now();
        const readyAt = Math.max(state.pausedUntil, state.nextRequestAt);
        if (now >= deadlineAt || readyAt >= deadlineAt) return false;
        if (readyAt <= now) {
          // Reserve synchronously: waiters waking together must take turns.
          state.nextRequestAt = now + state.intervalMs;
          return true;
        }
        await new Promise((resolve) => setTimeout(resolve, readyAt - now));
      }
      return false;
    },
    async backoff(attempt, retryAfter) {
      state.consecutiveRateLimits += 1;
      state.intervalMs = Math.min(MAX_INTERVAL_MS, state.intervalMs * 2);
      const delayMs = Math.max(
        state.intervalMs,
        parseRetryAfterMs(retryAfter) ??
          FIRST_DELAY_MS * 2 ** (state.consecutiveRateLimits - 1),
      );
      const now = Date.now();
      const pausedUntil = Math.max(state.pausedUntil, now + delayMs);
      state.cooldownMs += pausedUntil - Math.max(now, state.pausedUntil);
      state.pausedUntil = pausedUntil;
      await save();
      return !stopped() && attempt <= MAX_RETRIES;
    },
    async recovered() {
      /*
       * A served page repays a little of the accumulated cooldown.
       *
       * `cooldownMs` is a budget guard: past thirty minutes of waiting, this
       * audit stops. Measured as a lifetime total it could not tell thirty
       * minutes spread across two thousand successful pages -- an origin
       * that is simply slow, and worth finishing -- from thirty minutes
       * spent on three, which is an origin refusing to serve. A single
       * permanently-429 URL among hundreds of good ones therefore stopped
       * the whole crawl and left the rest of the site uncrawled.
       *
       * Repaying one first-delay per success separates the two: an origin
       * that genuinely recovers sheds the debt faster than it accrues, while
       * one that keeps refusing still trips, because every 429 adds at least
       * as much as a success removes. The existing cumulative-stop test is
       * unchanged by it, which is the point -- the guard still fires where
       * it was designed to.
       */
      const repaid = Math.max(0, state.cooldownMs - FIRST_DELAY_MS);
      if (state.consecutiveRateLimits === 0 && repaid === state.cooldownMs) {
        return;
      }
      state.consecutiveRateLimits = 0;
      state.cooldownMs = repaid;
      await save();
    },
    get checkpointFailed() {
      return checkpointFailed;
    },
    get stopped() {
      return stopped();
    },
    get state() {
      return { ...state };
    },
  };
}
