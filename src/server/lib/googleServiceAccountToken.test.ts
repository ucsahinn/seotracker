import { beforeEach, describe, expect, it, vi } from "vitest";
import { GSC_SERVICE_ACCOUNT_SCOPE } from "@/shared/gsc";
import {
  clearServiceAccountTokenCache,
  getServiceAccountToken,
} from "./googleServiceAccountToken";
import { isGoogleCredentialRejection } from "./googleTokenErrors";

const repo = vi.hoisted(() => ({
  get: vi.fn(),
  getStatus: vi.fn(),
}));
vi.mock("@/server/features/google/GoogleServiceAccountRepository", () => ({
  GoogleServiceAccountRepository: repo,
}));
vi.mock("@/server/lib/googleServiceAccountKey", () => ({
  buildAssertionPayload: () => ({}),
  GOOGLE_TOKEN_URI: "https://token.test",
  signAssertion: async () => "assertion",
}));

function account(updatedAt: string) {
  return { clientEmail: "sa@x", privateKey: "k", projectId: null, updatedAt };
}

/** A token endpoint whose responses the test releases by hand. */
function controlledTokenEndpoint() {
  const releases: ((token: string) => void)[] = [];
  const fetchMock = vi.fn(
    () =>
      new Promise<Response>((resolve) => {
        releases.push((token) =>
          resolve(Response.json({ access_token: token, expires_in: 3600 })),
        );
      }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return {
    fetchMock,
    release: (index: number, token: string) => releases[index]?.(token),
  };
}

beforeEach(() => {
  clearServiceAccountTokenCache();
});

describe("getServiceAccountToken", () => {
  it.each([
    [400, "invalid_grant", true],
    [503, "temporarily_unavailable", false],
    [503, "invalid_grant", false],
  ])(
    "ERR-03 classifies actual token responses (%s, %s) without exposing response details",
    async (status, reason, rejected) => {
      repo.getStatus.mockResolvedValue({ updatedAt: "failure-revision" });
      repo.get.mockResolvedValue(account("failure-revision"));
      vi.stubGlobal(
        "fetch",
        vi
          .fn()
          .mockResolvedValue(
            Response.json(
              { error: reason, error_description: "private detail" },
              { status },
            ),
          ),
      );
      try {
        const error = await getServiceAccountToken(
          GSC_SERVICE_ACCOUNT_SCOPE,
        ).catch((caught: unknown) => caught);
        expect(isGoogleCredentialRejection(error)).toBe(rejected);
        expect(error).toMatchObject({ status, reason });
        expect(String(error)).not.toContain("private detail");
      } finally {
        vi.unstubAllGlobals();
      }
    },
  );
  it("ERR-02 aborts a stalled token mint after 30 seconds", async () => {
    repo.getStatus.mockResolvedValue({ updatedAt: "timeout-revision" });
    repo.get.mockResolvedValue(account("timeout-revision"));
    vi.useFakeTimers();
    vi.spyOn(AbortSignal, "timeout").mockImplementation((ms) => {
      const controller = new AbortController();
      setTimeout(
        () => controller.abort(new DOMException("timeout", "TimeoutError")),
        ms,
      );
      return controller.signal;
    });
    const endpoint = vi.fn<typeof fetch>(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener(
            "abort",
            () => reject(init.signal?.reason),
            { once: true },
          );
        }),
    );
    vi.stubGlobal("fetch", endpoint);
    try {
      const assertion = expect(
        getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE),
      ).rejects.toMatchObject({ name: "TimeoutError" });
      await vi.advanceTimersByTimeAsync(30_001);
      await assertion;
      expect(endpoint).toHaveBeenCalledOnce();
    } finally {
      vi.useRealTimers();
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
    }
  });
  it("does not let a mint started before a credential replacement refill the cache", async () => {
    const endpoint = controlledTokenEndpoint();
    repo.getStatus.mockResolvedValue({ updatedAt: "rev1" });
    repo.get.mockResolvedValueOnce(account("rev1"));
    const oldMint = getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE);
    await vi.waitFor(() => expect(endpoint.fetchMock).toHaveBeenCalledOnce());

    // The operator replaces the key; the old request is still out.
    clearServiceAccountTokenCache();
    repo.getStatus.mockResolvedValue({ updatedAt: "rev2" });
    repo.get.mockResolvedValueOnce(account("rev2"));
    const newMint = getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE);
    await vi.waitFor(() => expect(endpoint.fetchMock).toHaveBeenCalledTimes(2));

    endpoint.release(1, "new-token");
    expect(await newMint).toBe("new-token");
    endpoint.release(0, "old-token");
    expect(await oldMint).toBe("old-token");

    expect(await getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE)).toBe(
      "new-token",
    );
    expect(endpoint.fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shares one mint between concurrent callers of the same revision", async () => {
    const endpoint = controlledTokenEndpoint();
    repo.getStatus.mockResolvedValue({ updatedAt: "rev1" });
    repo.get.mockResolvedValue(account("rev1"));
    const first = getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE);
    const second = getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE);
    await vi.waitFor(() => expect(endpoint.fetchMock).toHaveBeenCalled());
    endpoint.release(0, "tok");

    expect(await first).toBe("tok");
    expect(await second).toBe("tok");
    expect(endpoint.fetchMock).toHaveBeenCalledOnce();
  });
});
