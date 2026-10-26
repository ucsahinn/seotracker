import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runSiteProbes } from "./run-site-probes";
import { siteFactFindings } from "./site-fact-checks";
import { probeFetch } from "./site-fetch";

vi.mock("./site-fetch", () => ({ probeFetch: vi.fn() }));

const input = (origin: string) => ({
  origin,
  startUrl: `${origin}/`,
  robots: { status: null, text: null },
  sitemap: {
    url: null,
    urlCount: null,
    onHostUrlCount: null,
    listedInRobots: null,
  },
  now: new Date("2026-10-26T00:00:00Z"),
});

/** The start page answers with these first-byte times, in order; nothing else answers. */
function startPageTtfb(origin: string, samples: number[]) {
  vi.mocked(probeFetch).mockImplementation(async (url) => {
    if (url !== `${origin}/`) return null;
    const ttfbMs = samples.shift() ?? 0;
    return {
      firstStatus: 200,
      firstLocation: null,
      response: new Response("<html></html>", {
        headers: { "content-type": "text/html" },
      }),
      finalUrl: url,
      unfollowedLocation: null,
      hops: 0,
      ttfbMs,
    };
  });
}

beforeEach(() => {
  // DNS, RDAP and certificate lookups: unreachable in a test.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new TypeError("offline");
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("runSiteProbes", () => {
  it("judges first-byte time on the faster of two samples", async () => {
    const origin = "https://example.com";
    startPageTtfb(origin, [1900, 250]);

    const facts = await runSiteProbes(input(origin));

    expect(facts.start.ttfbMs).toBe(250);
    expect(
      siteFactFindings(facts, origin).map((finding) => finding.issueType),
    ).not.toContain("slow-ttfb");
  });

  // A pages.dev site used to be reported as Cloudflare's pages.dev, with
  // its registration, SPF and DMARC.
  it("asks no registry or mail record about a platform subdomain", async () => {
    // Plain http, so no certificate lookup either.
    const origin = "http://mysite.pages.dev";
    startPageTtfb(origin, [100, 100]);

    const facts = await runSiteProbes(input(origin));

    expect(facts.domain.domain).toBe("mysite.pages.dev");
    expect(facts.dns.resolved).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
});
