import { expect, it, vi } from "vitest";
import { cachedSearchAnalytics } from "./searchAnalyticsCache";

it("expires answers by acquisition time even when a slow load took longer than the TTL", async () => {
  let now = 0;
  const load = vi.fn(async () => {
    now += 11 * 60_000;
    return [now];
  });
  const key = crypto.randomUUID();
  await cachedSearchAnalytics(key, (rows) => rows.length, load, {
    now: () => now,
  });
  await cachedSearchAnalytics(key, (rows) => rows.length, load, {
    now: () => now,
  });
  expect(load).toHaveBeenCalledTimes(2);
});
