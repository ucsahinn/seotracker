import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPublicJson } from "./third-party-fetch";

vi.mock("../url-policy", () => ({
  assertPublicHostname: vi.fn(async (host: string) => {
    if (host === "internal.example") throw new Error("blocked");
  }),
}));

function serve(answers: Record<string, () => Response>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => {
      const answer = answers[input];
      if (!answer) throw new TypeError("fetch failed");
      return answer();
    }),
  );
}

const redirect = (location: string) => () =>
  new Response(null, { status: 302, headers: { location } });
const json = (body: string) => () => new Response(body, { status: 200 });
const options = { accept: "application/json", maxBytes: 64, timeoutMs: 1000 };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchPublicJson", () => {
  it("follows an https redirect to the registry", async () => {
    serve({
      "https://rdap.org/domain/x.com": redirect(
        "https://rdap.registry.example/domain/x.com",
      ),
      "https://rdap.registry.example/domain/x.com": json('{"ldhName":"x.com"}'),
    });
    expect(
      await fetchPublicJson("https://rdap.org/domain/x.com", options),
    ).toEqual({ ldhName: "x.com" });
  });

  it("names itself on every hop, since rdap.org refuses a request without a User-Agent", async () => {
    const answers: Record<string, () => Response> = {
      "https://rdap.org/domain/x.com": redirect(
        "https://rdap.registry.example/domain/x.com",
      ),
      "https://rdap.registry.example/domain/x.com": json('{"ldhName":"x"}'),
    };
    // Like rdap.org: no User-Agent, no answer.
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string, init?: RequestInit) =>
        new Headers(init?.headers).get("user-agent")
          ? answers[input]()
          : new Response(null, { status: 403 }),
      ),
    );
    expect(
      await fetchPublicJson("https://rdap.org/domain/x.com", options),
    ).toEqual({ ldhName: "x" });
  });

  it("refuses a hop to plain http or to a private address", async () => {
    serve({
      "https://rdap.org/a": redirect("http://rdap.registry.example/a"),
      "https://rdap.org/b": redirect("https://internal.example/b"),
      "https://internal.example/b": json("{}"),
    });
    expect(await fetchPublicJson("https://rdap.org/a", options)).toBeNull();
    expect(await fetchPublicJson("https://rdap.org/b", options)).toBeNull();
  });

  it("gives up on a body past the cap", async () => {
    serve({ "https://crt.sh/": json(`[${'"x",'.repeat(40)}"x"]`) });
    expect(await fetchPublicJson("https://crt.sh/", options)).toBeNull();
  });
});
