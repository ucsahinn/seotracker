import { afterEach, describe, expect, it, vi } from "vitest";
import {
  probeFavicon,
  probeHttpsRedirect,
  probeStartPage,
  probeWellKnownFile,
} from "./http-probes";
import type { ProbeContext } from "./site-fetch";

const ORIGIN = "https://example.com";

/** Answers each URL from the table; anything else is a network failure. */
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

const context = (): ProbeContext => ({
  originHost: "example.com",
  checkedHosts: new Set(),
});

const status =
  (code: number, contentType = "text/plain") =>
  () =>
    new Response(code === 204 ? null : "x", {
      status: code,
      headers: { "content-type": contentType },
    });

const redirect = (location: string) => () =>
  new Response(null, { status: 301, headers: { location } });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("probeWellKnownFile", () => {
  it("is missing on a 404 and on an HTML catch-all page", async () => {
    serve({ [`${ORIGIN}/llms.txt`]: status(404) });
    expect(
      (await probeWellKnownFile([`${ORIGIN}/llms.txt`], context())).found,
    ).toBe(false);

    serve({ [`${ORIGIN}/llms.txt`]: status(200, "text/html") });
    expect(
      (await probeWellKnownFile([`${ORIGIN}/llms.txt`], context())).found,
    ).toBe(false);
  });

  it.each([401, 403, 429, 503])(
    "is unknown, not missing, when the server answers %i",
    async (code) => {
      serve({ [`${ORIGIN}/llms.txt`]: status(code) });
      const file = await probeWellKnownFile([`${ORIGIN}/llms.txt`], context());
      expect(file).toEqual({ status: code, found: null });
    },
  );

  it("is unknown when one of two locations could not be read", async () => {
    serve({
      [`${ORIGIN}/.well-known/security.txt`]: status(503),
      [`${ORIGIN}/security.txt`]: status(404),
    });
    const file = await probeWellKnownFile(
      [`${ORIGIN}/.well-known/security.txt`, `${ORIGIN}/security.txt`],
      context(),
    );
    expect(file.found).toBeNull();
  });
});

describe("probeFavicon", () => {
  it.each([403, 429, 500])(
    "is unknown when /favicon.ico answers %i",
    async (code) => {
      serve({ [`${ORIGIN}/favicon.ico`]: status(code) });
      const favicon = await probeFavicon(
        ORIGIN,
        "<head></head>",
        ORIGIN,
        context(),
      );
      expect(favicon.found).toBeNull();
    },
  );

  it("is missing on a 404", async () => {
    serve({ [`${ORIGIN}/favicon.ico`]: status(404) });
    const favicon = await probeFavicon(
      ORIGIN,
      "<head></head>",
      ORIGIN,
      context(),
    );
    expect(favicon.found).toBe(false);
  });

  it("counts an inline data: icon as found without fetching", async () => {
    serve({});
    const favicon = await probeFavicon(
      ORIGIN,
      '<link rel="icon" href="data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=">',
      ORIGIN,
      context(),
    );
    expect(favicon).toMatchObject({ declared: true, found: true });
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("probeHttpsRedirect", () => {
  it("says no redirect only when http:// answered with its own page", async () => {
    serve({ "http://example.com/": status(200, "text/html") });
    expect(
      (await probeHttpsRedirect("example.com", context())).redirectsToHttps,
    ).toBe(false);
  });

  it.each([403, 429, 503])(
    "is unknown when http:// answers %i",
    async (code) => {
      serve({ "http://example.com/": status(code) });
      expect(
        (await probeHttpsRedirect("example.com", context())).redirectsToHttps,
      ).toBeNull();
    },
  );

  it("follows the redirect onto https", async () => {
    serve({
      "http://example.com/": redirect("https://example.com/"),
      "https://example.com/": status(200, "text/html"),
    });
    expect(
      (await probeHttpsRedirect("example.com", context())).redirectsToHttps,
    ).toBe(true);
  });
});

describe("probeStartPage", () => {
  it("finds frame-ancestors in the second of two CSP headers", async () => {
    serve({
      [`${ORIGIN}/`]: () => {
        const headers = new Headers({ "content-type": "text/html" });
        headers.append("content-security-policy", "default-src 'self'");
        headers.append("content-security-policy", "frame-ancestors 'none'");
        return new Response("<html></html>", { status: 200, headers });
      },
    });
    const { facts } = await probeStartPage(`${ORIGIN}/`, context());
    expect(facts.cspFrameAncestors).toBe(true);
  });
});
