import { beforeEach, describe, expect, it, vi } from "vitest";

const SECRET = "AIzaSyTESTKEYNOTREAL";

const mocks = vi.hoisted(() => ({
  source: vi.fn(),
  key: vi.fn(),
  fetch: vi.fn<typeof fetch>(),
}));

vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedKeySource: mocks.source,
  getPageSpeedApiKey: mocks.key,
}));

import { PageSpeedKeyTestService } from "./PageSpeedKeyTestService";

const report = () =>
  Response.json({
    analysisUTCTimestamp: "2026-10-02T10:00:00.000Z",
    lighthouseResult: {
      categories: { performance: { score: 0.9, auditRefs: [] } },
      audits: {},
    },
  });

const apiError = (status: number, message: string) =>
  Response.json({ error: { message } }, { status });

beforeEach(() => {
  mocks.source.mockResolvedValue("settings");
  mocks.key.mockResolvedValue(SECRET);
  vi.stubGlobal("fetch", mocks.fetch);
});

describe("PageSpeedKeyTestService.testKey", () => {
  it("makes one mobile request for the fixed page with the stored key", async () => {
    mocks.fetch.mockResolvedValue(report());

    const outcome = await PageSpeedKeyTestService.testKey();

    expect(outcome).toMatchObject({ ok: true, state: "ok" });
    expect(mocks.fetch).toHaveBeenCalledOnce();
    const [requested] = mocks.fetch.mock.calls[0] ?? [];
    const url = new URL(typeof requested === "string" ? requested : "");
    expect(url.searchParams.get("url")).toBe("https://example.com/");
    expect(url.searchParams.get("strategy")).toBe("mobile");
    expect(url.searchParams.get("key")).toBe(SECRET);
  });

  it("does not spend a request when no key is configured", async () => {
    mocks.source.mockResolvedValue(null);

    const outcome = await PageSpeedKeyTestService.testKey();

    expect(outcome.state).toBe("no_key");
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  it.each([
    [
      "invalid_key",
      () => apiError(400, "API key not valid. Please pass a valid API key."),
    ],
    [
      "restricted",
      () =>
        apiError(
          403,
          `PageSpeed Insights API has not been used in project 1 before or it is disabled. ?key=${SECRET}`,
        ),
    ],
    [
      "quota_exhausted",
      () => apiError(429, "Quota exceeded for quota metric 'Queries per day'"),
    ],
    [
      "rate_limited",
      () =>
        apiError(429, "Quota exceeded for quota metric 'Queries per minute'"),
    ],
    ["error", () => apiError(500, "Internal error")],
  ])("classifies a %s reply without echoing the key", async (state, reply) => {
    mocks.fetch.mockResolvedValue(reply());

    const outcome = await PageSpeedKeyTestService.testKey();

    expect(outcome).toMatchObject({ ok: false, state });
    expect(JSON.stringify(outcome)).not.toContain(SECRET);
  });

  it("classifies a failed connection as network and never leaks the key", async () => {
    mocks.fetch.mockRejectedValue(
      new Error(`fetch failed: https://x/run?key=${SECRET}&url=a`),
    );

    const outcome = await PageSpeedKeyTestService.testKey();

    expect(outcome.state).toBe("network");
    expect(JSON.stringify(outcome)).not.toContain(SECRET);
  });
});
