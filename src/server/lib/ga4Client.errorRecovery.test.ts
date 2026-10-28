import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGa4AdminClient, createGa4DataClient } from "./ga4Client";
import { googleFailureReason } from "@/server/features/google/googleFailureReason";
import { mapGa4ReportError } from "@/server/features/ga4/services/mapGa4ReportError";
const mocks = vi.hoisted(() => ({
  getAccessToken: vi.fn(),
  hasServiceAccount: vi.fn<() => Promise<boolean>>(),
  getServiceAccountToken: vi.fn<() => Promise<string>>(),
  fetch: vi.fn<typeof fetch>(),
}));

vi.mock("@/lib/auth", () => ({
  getGoogleGrantAuth: () =>
    Promise.resolve({ api: { getAccessToken: mocks.getAccessToken } }),
}));

// Mocked for the same reason `@/lib/auth` is: the real module reaches the
// database, which this client does not otherwise touch and the Node test
// environment cannot load (`cloudflare:workers`).
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  hasServiceAccount: mocks.hasServiceAccount,
  getServiceAccountToken: mocks.getServiceAccountToken,
}));

const reportRequest = {
  dateRanges: [{ startDate: "2026-07-01", endDate: "2026-07-28" }],
  dimensions: [{ name: "hostName" }],
  metrics: [{ name: "sessions" }],
  offset: "0",
  limit: "100",
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  keepEmptyRows: false as const,
  returnPropertyQuota: true as const,
};

describe("GA4 error recovery", () => {
  beforeEach(() => {
    mocks.getAccessToken.mockResolvedValue({ accessToken: "token" });
    mocks.hasServiceAccount.mockResolvedValue(false);
    mocks.getServiceAccountToken.mockResolvedValue("sa_tok");
    vi.stubGlobal("fetch", mocks.fetch);
  });
  afterEach(() => vi.unstubAllGlobals());
  it.each([
    new TypeError("fetch failed"),
    new DOMException("timeout", "TimeoutError"),
  ])(
    "ERR-03 keeps token outages retryable through the report boundary: %s",
    async (cause) => {
      mocks.hasServiceAccount.mockResolvedValue(true);
      mocks.getServiceAccountToken.mockRejectedValueOnce(cause);
      const error = await createGa4AdminClient({ userId: "u" })
        .listProperties()
        .catch((caught: unknown) => caught);
      expect(googleFailureReason(error)).toBe(
        cause.name === "TimeoutError" ? "timeout" : "unknown",
      );
      expect(() => mapGa4ReportError(error)).toThrow(
        expect.objectContaining({ code: "ga4_upstream_unreachable" }),
      );
      expect(mocks.fetch).not.toHaveBeenCalled();
    },
  );

  it.each(["Admin", "Data"])(
    "ERR-02 aborts a stalled %s request after its 30 second budget",
    async (api) => {
      vi.useFakeTimers();
      vi.spyOn(AbortSignal, "timeout").mockImplementation((ms) => {
        const controller = new AbortController();
        setTimeout(
          () => controller.abort(new DOMException("timeout", "TimeoutError")),
          ms,
        );
        return controller.signal;
      });
      mocks.fetch.mockImplementation(
        (_url, init) =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener(
              "abort",
              () => reject(init.signal?.reason),
              { once: true },
            );
          }),
      );
      try {
        const result =
          api === "Admin"
            ? createGa4AdminClient({ userId: "u" }).listProperties()
            : createGa4DataClient({
                userId: "u",
                ga4AccountId: "a",
                propertyId: "properties/123",
              }).runReport(reportRequest);
        const assertion = expect(result).rejects.toMatchObject({
          status: 0,
          upstreamReason: "TIMEOUT",
        });
        await vi.advanceTimersByTimeAsync(30_001);
        await assertion;
        expect(mocks.fetch).toHaveBeenCalledOnce();
      } finally {
        vi.useRealTimers();
        vi.restoreAllMocks();
      }
    },
  );
});
vi.mock("@/server/features/google/GoogleAccessService", () => ({
  googleAccessScope: async (scope: object) => ({ ...scope, generation: 0 }),
  observeGoogleAccess: async (_scope: object, read: () => Promise<unknown>) =>
    read(),
}));
