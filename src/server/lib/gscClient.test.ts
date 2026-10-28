import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGscClient as clientForRegression } from "./gscClient";
import { googleFailureReason } from "@/server/features/google/googleFailureReason";
import { googleAppError as appErrorForRegression } from "./errors";

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

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status });
}

describe("gscClient", () => {
  it.each([
    new TypeError("fetch failed"),
    new DOMException("timeout", "TimeoutError"),
  ])(
    "ERR-03 does not request reconnection for token outages: %s",
    async (cause) => {
      mocks.hasServiceAccount.mockResolvedValue(true);
      mocks.getServiceAccountToken.mockRejectedValueOnce(cause);
      const error = await clientForRegression({ userId: "u" })
        .listSites()
        .catch((caught: unknown) => caught);
      expect(googleFailureReason(error)).toBe(
        cause.name === "TimeoutError" ? "timeout" : "unknown",
      );
      expect(appErrorForRegression(error)?.code).toBe("UPSTREAM_UNAVAILABLE");
      expect(mocks.fetch).not.toHaveBeenCalled();
    },
  );
  beforeEach(() => {
    mocks.getAccessToken.mockReset();
    mocks.getAccessToken.mockResolvedValue({ accessToken: "tok_123" });
    mocks.hasServiceAccount.mockResolvedValue(false);
    mocks.getServiceAccountToken.mockResolvedValue("sa_tok");
    mocks.fetch.mockReset();
    vi.stubGlobal("fetch", mocks.fetch);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /*
   * A service account replaces the grant entirely: there is nothing to
   * refresh and no user to be, so Better Auth must not be consulted at all.
   */
  it("mints from the service account instead of a grant when one is stored", async () => {
    mocks.hasServiceAccount.mockResolvedValue(true);
    mocks.fetch.mockResolvedValue(jsonResponse({ siteEntry: [] }));

    const { createGscClient } = await import("./gscClient");
    await createGscClient({ userId: "u1" }).listSites();

    expect(mocks.getAccessToken).not.toHaveBeenCalled();
    expect(mocks.fetch.mock.calls[0]?.[1]?.headers).toMatchObject({
      Authorization: "Bearer sa_tok",
    });
  });

  it("lists sites with a bearer token", async () => {
    mocks.fetch.mockResolvedValue(
      jsonResponse({
        siteEntry: [{ siteUrl: "https://x/", permissionLevel: "siteOwner" }],
      }),
    );
    const { createGscClient } = await import("./gscClient");
    const sites = await createGscClient({ userId: "u1" }).listSites();

    expect(sites).toHaveLength(1);
    const [url, init] = mocks.fetch.mock.calls[0];
    expect(url).toBe("https://www.googleapis.com/webmasters/v3/sites");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer tok_123" });
  });

  it("targets the selected Better Auth grant by Google sub", async () => {
    mocks.fetch.mockResolvedValue(jsonResponse({ siteEntry: [] }));
    const { createGscClient } = await import("./gscClient");

    await createGscClient({
      userId: "u1",
      gscAccountId: "google-sub-a",
    }).listSites();

    expect(mocks.getAccessToken).toHaveBeenCalledWith({
      body: {
        providerId: "google-search-console",
        userId: "u1",
        accountId: "google-sub-a",
      },
    });
  });

  it("omits accountId for the legacy null-account fallback", async () => {
    mocks.fetch.mockResolvedValue(jsonResponse({ siteEntry: [] }));
    const { createGscClient } = await import("./gscClient");

    await createGscClient({ userId: "u1" }).listSites();

    expect(mocks.getAccessToken).toHaveBeenCalledWith({
      body: { providerId: "google-search-console", userId: "u1" },
    });
  });

  it("fetches the Google account email from userinfo", async () => {
    mocks.fetch.mockResolvedValue(
      jsonResponse({ email: "client@example.com" }),
    );
    const { createGscClient } = await import("./gscClient");

    const email = await createGscClient({
      userId: "u1",
      gscAccountId: "google-sub-a",
    }).getUserInfoEmail();

    expect(email).toBe("client@example.com");
    const [url, init] = mocks.fetch.mock.calls[0];
    expect(url).toBe("https://openidconnect.googleapis.com/v1/userinfo");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer tok_123" });
  });

  it("keeps the response's aggregation and first incomplete date", async () => {
    mocks.fetch.mockResolvedValue(
      jsonResponse({
        rows: [{ keys: ["2026-10-24"], clicks: 1, impressions: 2, ctr: 0.5 }],
        responseAggregationType: "byProperty",
        metadata: { first_incomplete_date: "2026-10-24" },
      }),
    );
    const { createGscClient } = await import("./gscClient");
    const page = await createGscClient({
      userId: "u1",
    }).querySearchAnalyticsPage("sc-domain:example.com", {
      startDate: "2026-10-01",
      endDate: "2026-10-25",
      dataState: "all",
    });
    expect(page).toEqual({
      // Discover-style rows without a position read as 0 ("absent").
      rows: [
        {
          keys: ["2026-10-24"],
          clicks: 1,
          impressions: 2,
          ctr: 0.5,
          position: 0,
        },
      ],
      aggregationType: "byProperty",
      firstIncompleteDate: "2026-10-24",
    });
  });

  it("encodes the siteUrl in the searchAnalytics path (both property forms)", async () => {
    mocks.fetch.mockImplementation(async () => jsonResponse({ rows: [] }));
    const { createGscClient } = await import("./gscClient");
    const client = createGscClient({ userId: "u1" });

    await client.querySearchAnalytics("sc-domain:example.com", {
      startDate: "2026-01-01",
      endDate: "2026-01-28",
    });
    expect(mocks.fetch.mock.calls[0][0]).toBe(
      "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aexample.com/searchAnalytics/query",
    );

    await client.querySearchAnalytics("https://example.com/", {
      startDate: "2026-01-01",
      endDate: "2026-01-28",
    });
    expect(mocks.fetch.mock.calls[1][0]).toBe(
      "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fexample.com%2F/searchAnalytics/query",
    );
  });

  it("posts to the URL Inspection endpoint and returns the result", async () => {
    mocks.fetch.mockResolvedValue(
      jsonResponse({
        inspectionResult: {
          indexStatusResult: { verdict: "PASS", coverageState: "Indexed" },
        },
      }),
    );
    const { createGscClient } = await import("./gscClient");
    const result = await createGscClient({ userId: "u1" }).inspectUrl(
      "sc-domain:example.com",
      "https://example.com/post",
      "en-US",
    );

    const [url, init] = mocks.fetch.mock.calls[0];
    expect(url).toBe(
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    );
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer tok_123" });
    const body = init?.body;
    const payload =
      typeof body === "string" ? (JSON.parse(body) as unknown) : null;
    expect(payload).toEqual({
      siteUrl: "sc-domain:example.com",
      inspectionUrl: "https://example.com/post",
      languageCode: "en-US",
    });
    expect(result?.indexStatusResult?.verdict).toBe("PASS");
  });

  it("maps 403 to a no-access GscApiError", async () => {
    mocks.fetch.mockImplementation(async () =>
      jsonResponse({ error: "forbidden" }, 403),
    );
    const { createGscClient, GscApiError } = await import("./gscClient");
    await expect(
      createGscClient({ userId: "u1" }).listSites(),
    ).rejects.toMatchObject({ status: 403 });
    await expect(
      createGscClient({ userId: "u1" }).listSites(),
    ).rejects.toBeInstanceOf(GscApiError);
  });

  it("maps 429 to a rate-limit GscApiError", async () => {
    mocks.fetch.mockResolvedValue(jsonResponse({ error: "slow down" }, 429));
    const { createGscClient } = await import("./gscClient");
    await expect(
      createGscClient({ userId: "u1" }).listSites(),
    ).rejects.toMatchObject({ status: 429 });
  });

  it("turns a stalled Google call into a GscApiError instead of hanging", async () => {
    mocks.fetch.mockRejectedValue(
      new DOMException("signal timed out", "TimeoutError"),
    );
    const { createGscClient } = await import("./gscClient");
    await expect(
      createGscClient({ userId: "u1" }).listSites(),
    ).rejects.toMatchObject({ name: "GscApiError", status: 504 });
    expect(mocks.fetch.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal);
  });

  /*
   * server.log (installed 2.4.3): one "Network connection lost" from workerd
   * failed getPerformance outright and reached the screen as INTERNAL_ERROR.
   */
  it("retries a dropped connection instead of failing the report", async () => {
    vi.useFakeTimers();
    mocks.fetch
      .mockRejectedValueOnce(new Error("Network connection lost."))
      .mockResolvedValueOnce(jsonResponse({ rows: [] }));
    const { createGscClient } = await import("./gscClient");

    const rows = createGscClient({ userId: "u1" }).querySearchAnalytics(
      "sc-domain:example.com",
      { startDate: "2026-10-01", endDate: "2026-10-25" },
    );
    await vi.runAllTimersAsync();

    expect(await rows).toEqual([]);
    expect(mocks.fetch).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("names the cause when Google stays unreachable", async () => {
    vi.useFakeTimers();
    mocks.fetch.mockRejectedValue(new Error("Network connection lost."));
    const { createGscClient } = await import("./gscClient");
    const { googleAppError, toClientError } = await import("./errors");

    const failure = createGscClient({ userId: "u1" })
      .listSites()
      .catch((error: unknown) => error);
    await vi.runAllTimersAsync();
    const clientError = toClientError(googleAppError(await failure));
    vi.useRealTimers();

    expect(clientError.message).toMatch(/^UPSTREAM_UNAVAILABLE: /);
    expect(clientError.message).toContain("Google'a bağlanılamadı");
    expect(clientError.message).toContain("Network connection lost.");
  });

  it("ERR-03 still requires credential repair for a structured invalid grant", async () => {
    mocks.getAccessToken.mockRejectedValue({ error: "invalid_grant" });
    const { createGscClient, GscTokenError } = await import("./gscClient");
    await expect(
      createGscClient({ userId: "u1" }).listSites(),
    ).rejects.toBeInstanceOf(GscTokenError);
  });
});

// Access persistence is tested with real SQLite in GoogleAccessRepository.test.ts.
vi.mock("@/server/features/google/GoogleAccessService", () => ({
  googleAccessScope: async (scope: object) => ({ ...scope, generation: 0 }),
  observeGoogleAccess: async (_scope: object, read: () => Promise<unknown>) =>
    read(),
}));
