import { describe, expect, it } from "vitest";
import {
  adjustCrawlWindow,
  RETRY_CRAWL_WINDOW,
} from "@/server/lib/audit/crawl-window";
import { makeCrawledPage } from "@/server/test-support/crawled-page";
import type { PageFetchClass } from "@/shared/audit-fetch-class";

function page(
  fetchClass: PageFetchClass,
  responseTimeMs: number,
  htmlBytes = 10_000,
) {
  return makeCrawledPage({
    id: "",
    fetchClass,
    statusCode: fetchClass === "ok" ? 200 : 0,
    responseTimeMs,
    htmlBytes,
  });
}

describe("adjustCrawlWindow", () => {
  it("keeps the window on an empty batch", () => {
    expect(adjustCrawlWindow(2, [])).toBe(2);
  });

  it.each(["error", "blocked", "rate_limited"] as const)(
    "reduces concurrency on %s",
    (fetchClass) => {
      const recent = Array.from({ length: 10 }, () => page(fetchClass, 300));
      expect(adjustCrawlWindow(2, recent)).toBe(1);
    },
  );

  it("treats recovered 429s as trouble", () => {
    const recent = Array.from({ length: 10 }, () => ({
      ...page("ok", 300),
      rateLimited: true,
    }));
    expect(adjustCrawlWindow(2, recent)).toBe(1);
  });

  it("never shrinks below one request", () => {
    expect(adjustCrawlWindow(1, [page("error", 15_000)])).toBe(1);
  });

  it("never grows beyond two concurrent requests, even on a fast site", () => {
    const recent = Array.from({ length: 25 }, () => page("ok", 400));
    expect(adjustCrawlWindow(2, recent)).toBe(2);
    expect(adjustCrawlWindow(1, recent)).toBe(2);
  });

  it("keeps retry chunks at one concurrent request", () => {
    const recent = Array.from({ length: 25 }, () => page("ok", 400));
    expect(adjustCrawlWindow(1, recent, RETRY_CRAWL_WINDOW)).toBe(1);
  });

  it("preserves the byte budget if page sizes increase", () => {
    const recent = Array.from({ length: 25 }, () =>
      page("ok", 300, 5 * 1024 * 1024),
    );
    expect(adjustCrawlWindow(2, recent)).toBe(1);
  });
});
