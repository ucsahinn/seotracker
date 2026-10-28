import { expect, it, vi } from "vitest";
import { runSearchAnalyticsRequest } from "./searchAnalyticsQuota";
import { GscApiError } from "@/server/lib/gscErrors";

it("paces concurrent pages and pauses new calls for fifteen minutes after a quota refusal", async () => {
  vi.useFakeTimers();
  try {
    const starts: number[] = [];
    const load = async () => {
      starts.push(Date.now());
      return "ok";
    };
    const pages = Promise.all([
      runSearchAnalyticsRequest(load),
      runSearchAnalyticsRequest(load),
      runSearchAnalyticsRequest(load),
    ]);
    await vi.runAllTimersAsync();
    expect(await pages).toEqual(["ok", "ok", "ok"]);
    expect(starts[1] - starts[0]).toBeGreaterThanOrEqual(100);
    expect(starts[2] - starts[1]).toBeGreaterThanOrEqual(100);
    const failed = runSearchAnalyticsRequest(async () => {
      throw new GscApiError(429, "quota");
    }).catch((error: unknown) => error);
    await vi.runAllTimersAsync();
    expect(await failed).toMatchObject({ status: 429 });
    await expect(runSearchAnalyticsRequest(load)).rejects.toMatchObject({
      status: 429,
    });
    expect(starts).toHaveLength(3);
    await vi.advanceTimersByTimeAsync(15 * 60_000);
    expect(await runSearchAnalyticsRequest(load)).toBe("ok");
  } finally {
    vi.useRealTimers();
  }
});
