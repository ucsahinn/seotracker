import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { discoverUrls, parseRobotsTxt } from "@/server/lib/audit/discovery";

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  return input instanceof URL ? input.href : input.url;
}

const redirect = (location: string) =>
  new Response(null, { status: 302, headers: { location } });

describe("discoverUrls redirects", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not follow a redirect to a private address and degrades to nothing found", async () => {
    vi.mocked(fetch).mockImplementation(async () =>
      redirect("http://169.254.169.254/latest/meta-data/"),
    );

    const result = await discoverUrls("https://example.com");

    expect(result.urls).toEqual([]);
    expect(result.robotsText).toBeNull();
    expect(result.robotsFetch.status).toBeNull();
    const requested = vi
      .mocked(fetch)
      .mock.calls.map(([input]) => requestUrl(input));
    expect(requested).toEqual([
      "https://example.com/robots.txt",
      "https://example.com/sitemap.xml",
    ]);
  });

  it("follows a same-origin redirect to the sitemap", async () => {
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = requestUrl(input);
      if (url.endsWith("/robots.txt")) return new Response("", { status: 404 });
      if (url.endsWith("/sitemap.xml")) {
        return redirect("https://example.com/real-sitemap.xml");
      }
      return new Response(
        "<?xml version='1.0'?><urlset><url><loc>https://example.com/a</loc></url></urlset>",
        { headers: { "content-type": "application/xml" } },
      );
    });

    const result = await discoverUrls("https://example.com");

    expect(result.urls).toEqual(["https://example.com/a"]);
  });
});

describe("discoverUrls robots.txt and sitemap handling", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("applies the complete lines of an oversized robots.txt instead of allowing all", async () => {
    const body = `User-agent: *\nDisallow: /private/\n${"# pad\n".repeat(100_000)}`;
    vi.mocked(fetch).mockImplementation(async (input) =>
      requestUrl(input).endsWith("/robots.txt")
        ? new Response(body)
        : new Response("", { status: 404 }),
    );

    const result = await discoverUrls("https://example.com");
    const robots = parseRobotsTxt("https://example.com", result.robotsText);

    expect(result.robotsFetch.truncated).toBe(true);
    expect(robots.isAllowed("https://example.com/private/x")).toBe(false);
    expect(robots.isAllowed("https://example.com/public")).toBe(true);
  });

  it("judges Google by the Googlebot group, the crawler by the * group", () => {
    const robots = parseRobotsTxt(
      "https://example.com",
      "User-agent: *\nDisallow: /*?*\n\nUser-agent: Googlebot\nAllow: /\n",
    );
    const sensor = "https://example.com/sensor/abc?v=1";
    expect(robots.isAllowed(sensor)).toBe(false);
    expect(robots.googlebotAllows(sensor)).toBe(true);
  });

  it("keeps sitemap membership beyond the maxPages seed budget", async () => {
    const locs = ["a", "b", "c"]
      .map((p) => `<url><loc>https://example.com/${p}</loc></url>`)
      .join("");
    vi.mocked(fetch).mockImplementation(async (input) =>
      requestUrl(input).endsWith("/sitemap.xml")
        ? new Response(`<?xml version='1.0'?><urlset>${locs}</urlset>`, {
            headers: { "content-type": "application/xml" },
          })
        : new Response("", { status: 404 }),
    );

    const result = await discoverUrls("https://example.com", 1);

    expect(result.urls).toHaveLength(3);
    expect(result.membershipComplete).toBe(true);
  });

  it("counts what the sitemap lists on other hosts without crawling it", async () => {
    const locs = ["a", "b"]
      .map((p) => `<url><loc>https://twin.example.net/${p}</loc></url>`)
      .join("");
    vi.mocked(fetch).mockImplementation(async (input) =>
      requestUrl(input).endsWith("/sitemap.xml")
        ? new Response(`<?xml version='1.0'?><urlset>${locs}</urlset>`, {
            headers: { "content-type": "application/xml" },
          })
        : new Response("", { status: 404 }),
    );

    const result = await discoverUrls("https://example.com", 1);

    expect(result.urls).toEqual([]);
    expect(result.listedUrlCount).toBe(2);
    expect(result.sitemapProblems.offHost).toEqual({
      count: 2,
      sample: ["https://twin.example.net/a", "https://twin.example.net/b"],
    });
  });

  // The site facts store the sitemap's size only from a complete read.
  it("marks membership incomplete when the URL cap cut the sitemap short", async () => {
    const locs = Array.from(
      { length: 600 },
      (_, i) => `<url><loc>https://example.com/p${i}</loc></url>`,
    ).join("");
    vi.mocked(fetch).mockImplementation(async (input) =>
      requestUrl(input).endsWith("/sitemap.xml")
        ? new Response(`<?xml version='1.0'?><urlset>${locs}</urlset>`, {
            headers: { "content-type": "application/xml" },
          })
        : new Response("", { status: 404 }),
    );

    const result = await discoverUrls("https://example.com", 1);

    expect(result.urls).toHaveLength(500);
    expect(result.membershipComplete).toBe(false);
  });

  it("does not fetch a www sibling whose DNS cannot be verified", async () => {
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = requestUrl(input);
      if (url.startsWith("https://cloudflare-dns.com/")) {
        throw new Error("dns unreachable");
      }
      if (url.endsWith("/robots.txt")) {
        return new Response(null, {
          status: 302,
          headers: { location: "https://www.example.com/robots.txt" },
        });
      }
      return new Response("", { status: 404 });
    });

    const result = await discoverUrls("https://example.com");

    expect(result.robotsFetch.status).toBeNull();
    const requested = vi
      .mocked(fetch)
      .mock.calls.map(([input]) => requestUrl(input));
    expect(requested).not.toContain("https://www.example.com/robots.txt");
  });
});
