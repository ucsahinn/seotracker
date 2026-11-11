import { afterEach, describe, expect, it, vi } from "vitest";
import { createCrawlThrottle } from "@/server/lib/audit/crawl-throttle";
import { crawlPage } from "@/server/workflows/site-audit-workflow-helpers";

// Every host passes the public-address check, so the stubbed fetch only sees
// page requests.
vi.mock("@/server/lib/audit/url-policy", () => ({
  assertPublicHostname: async () => undefined,
}));

const PAGE_URL = "https://example.com/page";
const PAGE_HTML =
  "<html><head><title>A page</title></head><body><h1>A page</h1></body></html>";

function crawl() {
  return crawlPage(
    PAGE_URL,
    0,
    false,
    createCrawlThrottle(Date.now() + 90_000),
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("crawlPage answers", () => {
  it("reads an X-Robots-Tag scoped to another crawler as not Google's rule", async () => {
    const page = (header: string) => {
      vi.spyOn(globalThis, "fetch").mockImplementation(
        async () =>
          new Response(PAGE_HTML, {
            headers: { "content-type": "text/html", "x-robots-tag": header },
          }),
      );
      return crawl();
    };

    expect(await page("bingbot: noindex")).toMatchObject({
      isIndexable: true,
    });
    expect(await page("googlebot: noindex")).toMatchObject({
      isIndexable: false,
    });
    expect(await page("noindex")).toMatchObject({ isIndexable: false });
  });

  it.each([
    [301, "text/html"],
    [200, "application/pdf"],
  ])(
    "cancels the body of a %i %s answer it will not read",
    async (status, contentType) => {
      const cancel = vi.fn();
      vi.spyOn(globalThis, "fetch").mockImplementation(
        async () =>
          new Response(new ReadableStream({ cancel }), {
            status,
            headers: {
              "content-type": contentType,
              location: "https://example.com/elsewhere",
            },
          }),
      );

      await crawl();

      expect(cancel).toHaveBeenCalledTimes(1);
    },
  );

  it.each([
    [404, true],
    [301, true],
    [500, false],
    [403, false],
  ])(
    "reports a %i answer to the throttle as served=%s",
    async (status, served) => {
      vi.spyOn(globalThis, "fetch").mockImplementation(
        async () =>
          new Response(PAGE_HTML, {
            status,
            headers: {
              "content-type": "text/html",
              location: "https://example.com/elsewhere",
            },
          }),
      );
      const throttle = createCrawlThrottle(Date.now() + 90_000);
      const recovered = vi.spyOn(throttle, "recovered");

      await crawlPage(PAGE_URL, 0, false, throttle);

      expect(recovered).toHaveBeenCalledWith(served);
    },
  );
});
