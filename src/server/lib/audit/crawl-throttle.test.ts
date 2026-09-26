import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCrawlThrottle } from "@/server/lib/audit/crawl-throttle";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(0);
});
afterEach(() => vi.useRealTimers());

describe("createCrawlThrottle", () => {
  it("keeps oversized Retry-After values finite even with overlapping refusals", async () => {
    const throttle = createCrawlThrottle(90_000);
    await Promise.all([
      throttle.backoff(1, "9".repeat(310)),
      throttle.backoff(1, "60"),
    ]);
    expect(throttle.stopped).toBe(true);
    expect(Object.values(throttle.state).every(Number.isFinite)).toBe(true);
    expect(await throttle.ready()).toBe(false);
  });

  it("waits for cooldown persistence before allowing another request", async () => {
    let save: () => void = vi.fn();
    const throttle = createCrawlThrottle(
      90_000,
      undefined,
      () =>
        new Promise<void>((resolve) => {
          save = resolve;
        }),
    );
    const backoff = throttle.backoff(1, "1");
    await vi.advanceTimersByTimeAsync(0);
    let started = false;
    const request = throttle.ready().then(() => {
      started = true;
    });
    await vi.advanceTimersByTimeAsync(10_000);
    expect(started).toBe(false);
    save();
    await backoff;
    await request;
    expect(started).toBe(true);
  });

  it("spaces simultaneous request starts instead of releasing a burst", async () => {
    const throttle = createCrawlThrottle(90_000);
    const starts: number[] = [];
    const requests = Promise.all(
      Array.from({ length: 5 }, async () => {
        if (await throttle.ready()) starts.push(Date.now());
      }),
    );
    await vi.runAllTimersAsync();
    await requests;
    expect(starts).toEqual([0, 1_000, 2_000, 3_000, 4_000]);
  });

  it("pauses for thirty seconds on the first 429 and spaces retries", async () => {
    const throttle = createCrawlThrottle(90_000);
    expect(await throttle.ready()).toBe(true);
    expect(await throttle.backoff(1, null)).toBe(true);
    const starts: number[] = [];
    const requests = Promise.all(
      Array.from({ length: 3 }, async () => {
        if (await throttle.ready()) starts.push(Date.now());
      }),
    );
    await vi.advanceTimersByTimeAsync(29_999);
    expect(starts).toEqual([]);
    await vi.runAllTimersAsync();
    await requests;
    expect(starts).toEqual([30_000, 32_000, 34_000]);
  });

  it("rechecks a cooldown extended while requests are waiting", async () => {
    const throttle = createCrawlThrottle(90_000);
    await throttle.backoff(1, "5");
    const starts: number[] = [];
    const request = throttle.ready().then(() => starts.push(Date.now()));
    await vi.advanceTimersByTimeAsync(4_000);
    await throttle.backoff(1, "10");
    await vi.advanceTimersByTimeAsync(9_999);
    expect(starts).toEqual([]);
    await vi.advanceTimersByTimeAsync(1);
    await request;
    expect(starts).toEqual([14_000]);
  });

  it.each(["60", "Thu, 01 Jan 1970 00:01:00 GMT"])(
    "honors Retry-After: %s",
    async (header) => {
      const throttle = createCrawlThrottle(90_000);
      await throttle.backoff(1, header);
      let started = false;
      const request = throttle.ready().then(() => {
        started = true;
      });
      await vi.advanceTimersByTimeAsync(59_999);
      expect(started).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await request;
      expect(started).toBe(true);
    },
  );

  it("backs off across chunks and stops after four consecutive refusals", async () => {
    let throttle = createCrawlThrottle(90_000);
    for (const [index, delay] of [30_000, 60_000, 120_000, 240_000].entries()) {
      expect(await throttle.backoff(1, null)).toBe(index < 3);
      expect(throttle.state.pausedUntil - Date.now()).toBe(delay);
      if (index < 3) {
        await vi.advanceTimersByTimeAsync(delay);
        throttle = createCrawlThrottle(Date.now() + 90_000, throttle.state);
      }
    }
    expect(throttle.stopped).toBe(true);
    expect(await throttle.ready()).toBe(false);
  });

  it("retains slower pacing after recovery and caps further slowdowns", async () => {
    let throttle = createCrawlThrottle(90_000);
    for (let i = 0; i < 8; i++) {
      await throttle.backoff(1, "1");
      await vi.advanceTimersByTimeAsync(30_000);
      await throttle.recovered();
      throttle = createCrawlThrottle(Date.now() + 90_000, throttle.state);
    }
    expect(throttle.state.intervalMs).toBe(30_000);
    expect(throttle.stopped).toBe(false);
  });

  it("defers a ten-minute wait without marking the audit stopped", async () => {
    const throttle = createCrawlThrottle(90_000);
    expect(await throttle.backoff(1, "600")).toBe(true);
    expect(await throttle.ready()).toBe(false);
    expect(throttle.stopped).toBe(false);
    expect(throttle.state.pausedUntil).toBe(600_000);
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(600_000);
    const resumed = createCrawlThrottle(690_000, throttle.state);
    expect(await resumed.ready()).toBe(true);
  });

  it("preserves request spacing across a chunk boundary", async () => {
    const first = createCrawlThrottle(90_000);
    await first.ready();
    const second = createCrawlThrottle(90_000, first.state);
    let startedAt = -1;
    const request = second.ready().then(() => {
      startedAt = Date.now();
    });
    await vi.runAllTimersAsync();
    await request;
    expect(startedAt).toBe(1_000);
  });

  it("does not label an ordinary chunk deadline as a rate-limit stop", async () => {
    const throttle = createCrawlThrottle(90_000);
    await vi.advanceTimersByTimeAsync(90_000);
    expect(await throttle.ready()).toBe(false);
    expect(throttle.stopped).toBe(false);
  });

  it("stops when cumulative cooldowns exceed thirty minutes, without retrying early", async () => {
    let throttle = createCrawlThrottle(90_000);
    for (let i = 0; i < 3; i++) {
      expect(await throttle.backoff(1, "600")).toBe(true);
      await vi.advanceTimersByTimeAsync(600_000);
      await throttle.recovered();
      throttle = createCrawlThrottle(Date.now() + 90_000, throttle.state);
    }
    expect(await throttle.backoff(1, "600")).toBe(false);
    expect(await throttle.ready()).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });

  /*
   * The other half of that guard, and the case it used to get wrong.
   *
   * One URL that answers 429 on every visit -- a WAF-protected /admin, say
   * -- among hundreds that serve fine. Each visit pauses the origin and adds
   * to the budget, and successes reset the consecutive counter but used to
   * repay nothing, so the audit eventually stopped and left the rest of the
   * site uncrawled. The pages it had already read were proof the origin was
   * healthy.
   */
  it("keeps crawling when one bad URL is surrounded by pages that serve", async () => {
    const throttle = createCrawlThrottle(Date.now() + 4 * 60 * 60_000);

    for (let i = 0; i < 40; i++) {
      // The bad URL: one refusal, then the crawler moves on.
      expect(await throttle.backoff(1, "60")).toBe(true);
      await vi.advanceTimersByTimeAsync(60_000);
      // Ten pages that answer normally before the next visit to the bad one.
      for (let page = 0; page < 10; page++) await throttle.recovered();
    }

    expect(throttle.stopped).toBe(false);
  });

  /*
   * The exact break-even the default path lands on, and the one the
   * repayment got wrong: with no `Retry-After`, an origin that refuses
   * every other request accrues 30s and repays 30s, so the budget never
   * moves and `consecutiveRateLimits` resets on every success. Both
   * breakers sat at zero and the crawl continued indefinitely against a
   * server refusing half its requests -- the opposite of what the budget
   * is for. Repayment is now strictly smaller than the smallest accrual.
   */
  it("still stops on an origin that refuses every other request", async () => {
    const throttle = createCrawlThrottle(Date.now() + 8 * 60 * 60_000);

    for (let i = 0; i < 200; i++) {
      await throttle.backoff(1, null);
      await vi.advanceTimersByTimeAsync(60_000);
      await throttle.recovered();
      if (throttle.stopped) break;
    }

    expect(throttle.stopped).toBe(true);
  });

  it("still stops when the origin refuses far more than it serves", async () => {
    const throttle = createCrawlThrottle(Date.now() + 4 * 60 * 60_000);

    for (let i = 0; i < 8; i++) {
      expect(await throttle.backoff(1, "600")).not.toBe(null);
      await vi.advanceTimersByTimeAsync(600_000);
      // One page gets through between refusals; nowhere near enough.
      await throttle.recovered();
      if (throttle.stopped) break;
    }

    expect(throttle.stopped).toBe(true);
  });
});
