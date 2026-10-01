import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchCruxHistory } from "@/server/lib/cruxHistory";

// Built from parts so no key-shaped literal sits in the file; the test only needs a unique marker.
const API_KEY = ["fake", "marker", "not", "a", "real", "key"].join("-");

function run() {
  return fetchCruxHistory({
    origin: "https://example.com",
    formFactor: "PHONE",
    apiKey: API_KEY,
  });
}

function reply(status: number, body: unknown = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify(body), { status })),
  );
}

/** A Google error body whose free-text message echoes the key, as proxies can. */
function googleError(status: string, reason: string, message = "") {
  return {
    error: {
      status,
      message: `${message} key=${API_KEY}`,
      details: [{ reason }],
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchCruxHistory", () => {
  it("treats a 404 as no data, not a failure", async () => {
    reply(404);

    expect(await run()).toEqual({ status: "no_data" });
  });

  it("names an API restriction that leaves the Chrome UX Report API out", async () => {
    reply(403, googleError("PERMISSION_DENIED", "API_KEY_SERVICE_BLOCKED"));

    const result = await run();

    expect(result.status).toBe("error");
    expect(JSON.stringify(result)).toContain("kısıtlaması");
  });

  it("names a Cloud project where the API is not enabled", async () => {
    reply(403, googleError("PERMISSION_DENIED", "SERVICE_DISABLED"));

    const result = await run();

    expect(result.status).toBe("error");
    expect(JSON.stringify(result)).toContain("etkin değil");
  });

  it("reports an unreachable Google without leaking the key", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error(`connect failed for key=${API_KEY}`);
      }),
    );

    expect(await run()).toEqual({
      status: "error",
      message: "Google'a ulaşılamadı.",
    });
  });

  it("never puts the API key in a returned message", async () => {
    for (const status of [401, 403, 429, 500]) {
      reply(status, googleError("PERMISSION_DENIED", "OTHER", "denied"));
      expect(JSON.stringify(await run())).not.toContain(API_KEY);
    }
  });
});
