import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { assertPublicHostname } from "./url-policy";
import type * as UrlPolicy from "./url-policy";
import {
  checkExternalLink,
  measureImage,
  type HostCache,
} from "./external-checks";

vi.mock("./url-policy", async (importOriginal) => ({
  ...(await importOriginal<typeof UrlPolicy>()),
  assertPublicHostname: vi.fn(),
}));

type Answer = (method: string) => Response;

/** DNS answers by host name, then each URL from the table. */
function serve(
  answers: Record<string, Answer>,
  dns: Record<string, number> = {},
) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      if (input.startsWith("https://cloudflare-dns.com/")) {
        const name = new URL(input).searchParams.get("name") ?? "";
        return Response.json({ Status: dns[name] ?? 0, Answer: [] });
      }
      const answer = answers[input];
      if (!answer) throw new TypeError("fetch failed");
      return answer(init?.method ?? "GET");
    }),
  );
}

const status =
  (code: number, headers: Record<string, string> = {}) =>
  () =>
    new Response(null, { status: code, headers });

const cache = (): HostCache => new Map();

beforeEach(() => {
  vi.mocked(assertPublicHostname).mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("checkExternalLink", () => {
  it("calls a 404 broken only when GET confirms it", async () => {
    serve({ "https://gone.example/a": status(404) });
    expect(await checkExternalLink("https://gone.example/a", cache())).toEqual({
      url: "https://gone.example/a",
      state: "broken",
      status: 404,
      reason: "http",
    });

    // HEAD wrongly says 404, GET finds the page.
    serve({
      "https://fine.example/a": (method) =>
        new Response(null, { status: method === "HEAD" ? 404 : 200 }),
    });
    expect(
      (await checkExternalLink("https://fine.example/a", cache())).state,
    ).toBe("ok");
  });

  it("follows redirects to the final answer", async () => {
    serve({
      "https://old.example/": status(301, { location: "https://new.example/" }),
      "https://new.example/": status(200),
    });
    expect(
      (await checkExternalLink("https://old.example/", cache())).state,
    ).toBe("ok");
  });

  it("calls a name DNS does not know broken", async () => {
    serve({}, { "dead.example": 3 });
    expect(
      await checkExternalLink("https://dead.example/x", cache()),
    ).toMatchObject({ state: "broken", reason: "dns" });
  });

  it("never calls a refusal, a bot wall or a timeout broken", async () => {
    serve({
      "https://wall.example/": status(403),
      "https://busy.example/": status(429),
      "https://cf.example/": status(503, { "cf-mitigated": "challenge" }),
    });
    for (const url of [
      "https://wall.example/",
      "https://busy.example/",
      "https://cf.example/",
      "https://timeout.example/",
    ]) {
      expect((await checkExternalLink(url, cache())).state).toBe("unknown");
    }
  });

  it("does not ask social networks at all", async () => {
    serve({});
    expect(
      (await checkExternalLink("https://www.linkedin.com/in/x", cache())).state,
    ).toBe("unknown");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not contact a host that resolves to a private address", async () => {
    vi.mocked(assertPublicHostname).mockRejectedValue(new Error("blocked"));
    serve({ "https://intranet.example/": status(404) });
    expect(
      (await checkExternalLink("https://intranet.example/", cache())).state,
    ).toBe("unknown");
  });
});

describe("measureImage", () => {
  it("reads Content-Length from HEAD", async () => {
    serve({
      "https://example.com/a.jpg": status(200, { "content-length": "312000" }),
    });
    expect(await measureImage("https://example.com/a.jpg", cache())).toEqual({
      url: "https://example.com/a.jpg",
      bytes: 312_000,
      atLeast: false,
    });
  });

  it("counts the body when no length is sent, and gives up on errors", async () => {
    serve({
      "https://example.com/b.jpg": (method) =>
        new Response(method === "HEAD" ? null : new Uint8Array(1500), {
          status: 200,
        }),
      "https://example.com/c.jpg": status(404),
    });
    expect(
      (await measureImage("https://example.com/b.jpg", cache())).bytes,
    ).toBe(1500);
    expect(
      (await measureImage("https://example.com/c.jpg", cache())).bytes,
    ).toBeNull();
  });
});
