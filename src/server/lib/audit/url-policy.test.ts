import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppError } from "@/server/lib/errors";
import {
  normalizeAndValidateStartUrl,
  resolveStartUrlRedirects,
} from "@/server/lib/audit/url-policy";

// A fresh Response per call: the A and AAAA lookups run in parallel and a
// body can only be read once.
const dnsAnswer = (answer: { type: number; data: string }[]) =>
  new Response(JSON.stringify({ Status: 0, Answer: answer }), {
    status: 200,
    headers: { "content-type": "application/dns-json" },
  });
const publicAnswer = () => dnsAnswer([{ type: 1, data: "93.184.216.34" }]);

describe("normalizeAndValidateStartUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("adds https when protocol is missing and strips hash", async () => {
    vi.mocked(fetch).mockImplementation(async () => publicAnswer());

    await expect(
      normalizeAndValidateStartUrl("example.com/path#section"),
    ).resolves.toBe("https://example.com/path");
  });

  /*
   * The check is there to keep the crawler out of the operator's own
   * network, so it must not quietly pass the target through when it cannot
   * run - an install that cannot reach the DNS resolver used to allow
   * everything.
   */
  it("refuses rather than allowing when the name cannot be resolved", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("getaddrinfo ENOTFOUND"));

    await expect(
      normalizeAndValidateStartUrl("https://example.com"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  // Reachable only through the container's own resolver or its hosts file,
  // and rejected without asking anyone.
  it("blocks a single-label host with no lookup at all", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("should not be called"));

    await expect(
      normalizeAndValidateStartUrl("http://nas"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("blocks localhost-like targets", async () => {
    await expect(
      normalizeAndValidateStartUrl("http://localhost:3000"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  it("blocks private ip targets", async () => {
    await expect(
      normalizeAndValidateStartUrl("http://192.168.0.10"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  it.each(["http://router.lan", "http://nas.corp", "http://x.intranet"])(
    "blocks the private-network suffix in %s with no lookup",
    async (url) => {
      await expect(normalizeAndValidateStartUrl(url)).rejects.toMatchObject({
        code: "CRAWL_TARGET_BLOCKED",
      } satisfies Partial<AppError>);
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    },
  );

  // The public resolver cannot see the container's own DNS, so "no such
  // name" there says nothing about whether it resolves internally.
  it("blocks a name the public resolver returns no address for", async () => {
    vi.mocked(fetch).mockImplementation(async () => dnsAnswer([]));

    await expect(
      normalizeAndValidateStartUrl("https://split-horizon.example.com"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  it("blocks a name that resolves to a private address", async () => {
    vi.mocked(fetch).mockImplementation(async () =>
      dnsAnswer([{ type: 1, data: "10.0.0.5" }]),
    );

    await expect(
      normalizeAndValidateStartUrl("https://rebind.example.com"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  it.each([
    "http://[::7f00:1]/",
    "http://[::a00:1]/",
    "http://[64:ff9b::7f00:1]/",
    "http://[64:ff9b::169.254.169.254]/",
    "http://[64:ff9b:1::1]/",
    "http://[2002:7f00:1::]/",
    "http://[2002:a9fe:a9fe::1]/",
    "http://[fec0::1]/",
    "http://[ff02::1]/",
    "http://[::ffff:7f00:1]/",
    "http://[::1]/",
    "http://[fd00::1]/",
    "http://[fe80::1]/",
    "http://192.0.0.8/",
  ])("blocks the IP literal %s", async (url) => {
    await expect(normalizeAndValidateStartUrl(url)).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });

  it.each([
    "http://[2002:5db8:d822::1]/",
    "http://[64:ff9b::5db8:d822]/",
    "http://[2606:4700::1111]/",
    "http://93.184.216.34/",
  ])("allows the public IP literal %s", async (url) => {
    await expect(normalizeAndValidateStartUrl(url)).resolves.toBe(
      new URL(url).toString(),
    );
  });

  it("rejects invalid URL input", async () => {
    await expect(
      normalizeAndValidateStartUrl("not a url"),
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
    } satisfies Partial<AppError>);
  });
});

const redirect = (location: string) =>
  new Response(null, { status: 301, headers: { location } });

describe("resolveStartUrlRedirects", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /** Route probe fetches by URL; DoH lookups always resolve clean. */
  function stubFetch(routes: Record<string, () => Response>) {
    vi.mocked(fetch).mockImplementation((input) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("dns-query")) return Promise.resolve(publicAnswer());
      const route = routes[url];
      return route
        ? Promise.resolve(route())
        : Promise.resolve(new Response(null, { status: 200 }));
    });
  }

  it("follows a cross-domain redirect to the real origin", async () => {
    stubFetch({
      "https://example.net/": () => redirect("https://example.com/"),
    });
    await expect(
      resolveStartUrlRedirects("https://example.net/"),
    ).resolves.toBe("https://example.com/");
  });

  it("follows an apex-to-www redirect chain", async () => {
    stubFetch({
      "https://example.com/": () => redirect("https://www.example.com/"),
    });
    await expect(
      resolveStartUrlRedirects("https://example.com/"),
    ).resolves.toBe("https://www.example.com/");
  });

  it("returns the original URL when the site does not redirect", async () => {
    stubFetch({});
    await expect(
      resolveStartUrlRedirects("https://example.com/"),
    ).resolves.toBe("https://example.com/");
  });

  it("returns the last URL when the probe fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));
    await expect(
      resolveStartUrlRedirects("https://example.com/"),
    ).resolves.toBe("https://example.com/");
  });

  it("stops after the hop limit on a redirect loop", async () => {
    stubFetch({
      "https://a.example/": () => redirect("https://b.example/"),
      "https://b.example/": () => redirect("https://a.example/"),
    });
    await expect(
      resolveStartUrlRedirects("https://a.example/"),
    ).resolves.toMatch(/^https:\/\/(a|b)\.example\/$/);
  });

  it("rejects redirects into blocked targets", async () => {
    stubFetch({
      "https://example.com/": () => redirect("http://192.168.0.10/"),
    });
    await expect(
      resolveStartUrlRedirects("https://example.com/"),
    ).rejects.toMatchObject({
      code: "CRAWL_TARGET_BLOCKED",
    } satisfies Partial<AppError>);
  });
});
