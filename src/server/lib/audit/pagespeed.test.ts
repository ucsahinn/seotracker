import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPageSpeedReport } from "./pagespeed";

vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedApiKey: async () => undefined,
}));

/** Headers arrive at once; the body never ends until the request is aborted. */
function stalledResponse(signal: AbortSignal | null | undefined) {
  const body = new ReadableStream({
    start(controller) {
      signal?.addEventListener("abort", () =>
        controller.error(new DOMException("aborted", "AbortError")),
      );
    },
  });
  return new Response(body, { status: 200 });
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("fetchPageSpeedReport body deadline", () => {
  it("abandons a body that never finishes and lets the next report through the parse queue", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch")
      .mockImplementationOnce(async (_url, init) =>
        stalledResponse(init?.signal),
      )
      .mockResolvedValueOnce(new Response("{}", { status: 200 }));

    const stalled = fetchPageSpeedReport({
      url: "https://example.com/",
      strategy: "mobile",
    });
    const stalledOutcome = expect(stalled).rejects.toMatchObject({
      name: "PageSpeedError",
      retryable: true,
    });
    await vi.advanceTimersByTimeAsync(61_000);
    await stalledOutcome;

    // Reaches the parser (which rejects an empty report) instead of waiting
    // behind the stalled one forever.
    await expect(
      fetchPageSpeedReport({
        url: "https://example.com/b",
        strategy: "mobile",
      }),
    ).rejects.not.toMatchObject({ name: "PageSpeedError" });
  });
});
