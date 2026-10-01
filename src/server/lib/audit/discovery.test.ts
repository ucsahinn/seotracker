import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { discoverUrls } from "@/server/lib/audit/discovery";

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
