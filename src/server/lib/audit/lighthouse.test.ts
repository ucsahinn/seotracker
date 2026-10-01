import { afterEach, describe, expect, it, vi } from "vitest";

const fetchPageSpeedReportMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/lib/r2", () => ({
  putTextToR2: vi.fn(),
}));

// Only the transport is stubbed; PageSpeedError stays real so the rethrow
// branch is exercised against the class the code actually checks for.
vi.mock("./pagespeed", async () => ({
  ...(await vi.importActual("./pagespeed")),
  fetchPageSpeedReport: fetchPageSpeedReportMock,
}));

import { classifyFailure, PageSpeedError } from "./pagespeed";
import { fetchLighthouseResult, selectLighthousePages } from "./lighthouse";

afterEach(() => {
  vi.clearAllMocks();
});

const ok = (path: string, statusCode = 200) => ({
  url: `https://example.com${path}`,
  statusCode,
});

describe("selectLighthousePages", () => {
  it("selects every page that loaded, however many there are", () => {
    const pages = Array.from({ length: 120 }, (_, index) => ok(`/p/${index}`));

    const selected = selectLighthousePages(
      pages,
      "https://example.com/",
      "auto",
    );

    expect(selected).toHaveLength(120);
  });

  it("skips redirects, errors, blocked pages and non-HTML files", () => {
    const selected = selectLighthousePages(
      [
        ok("/"),
        ok("/moved", 301),
        ok("/missing", 404),
        ok("/report.pdf"),
        { ...ok("/walled"), fetchClass: "blocked" },
        ok("/about"),
      ],
      "https://example.com/",
      "auto",
    );

    expect(selected).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("puts the start page first, including through a trailing-slash redirect", () => {
    const selected = selectLighthousePages(
      [ok("/section"), ok("/services/")],
      "https://example.com/services",
      "auto",
    );

    expect(selected[0]).toBe("https://example.com/services/");
  });

  it("prefers an exact start page when both slash forms return 2xx", () => {
    const selected = selectLighthousePages(
      [ok("/services/"), ok("/services")],
      "https://example.com/services",
      "auto",
    );

    expect(selected[0]).toBe("https://example.com/services");
  });

  it("keeps the start page when the cap cuts the list", () => {
    const pages = [
      ...Array.from({ length: 10 }, (_, i) => ok(`/p/${i}`)),
      ok("/"),
    ];

    const selected = selectLighthousePages(
      pages,
      "https://example.com/",
      "auto",
      3,
    );

    expect(selected).toHaveLength(3);
    expect(selected[0]).toBe("https://example.com/");
  });

  it("selects nothing in none mode", () => {
    expect(
      selectLighthousePages([ok("/")], "https://example.com/", "none"),
    ).toEqual([]);
  });
});

describe("fetchLighthouseResult", () => {
  it("hands a retryable provider failure back flagged instead of rejecting the wave", async () => {
    fetchPageSpeedReportMock.mockRejectedValue(
      new PageSpeedError("backend error", { status: 503, retryable: true }),
    );

    const fetched = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "desktop",
    );

    expect(fetched.retryable).toBe(true);
    expect(fetched.rateLimited).toBeUndefined();
  });

  it("never lets a ?key= secret reach the stored text or the log", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchPageSpeedReportMock.mockRejectedValue(
      new Error("boom https://x/run?url=a&key=SECRET123&b=1"),
    );
    const generic = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "desktop",
    );
    fetchPageSpeedReportMock.mockRejectedValue(
      new PageSpeedError("down ?key=SECRET123", {
        status: 503,
        retryable: true,
      }),
    );
    const transient = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "desktop",
    );

    const seen = [
      generic.result.errorMessage,
      transient.result.errorMessage,
      String(error.mock.calls),
    ].join(" ");
    expect(seen).not.toContain("SECRET123");
    expect(seen).toContain("key=[gizli]");
    error.mockRestore();
  });

  it("hands a per-minute 429 back flagged instead of throwing or finalising it", async () => {
    fetchPageSpeedReportMock.mockRejectedValue(
      classifyFailure(429, "Quota exceeded: Queries per minute", true),
    );

    const fetched = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "desktop",
    );

    expect(fetched.rateLimited).toBe(true);
    expect(fetched.quotaExhausted).toBeUndefined();
    expect(fetched.result.errorMessage).toContain("Queries per minute");
  });

  it("records a non-retryable failure on the row instead of throwing", async () => {
    fetchPageSpeedReportMock.mockRejectedValue(
      new PageSpeedError("Lighthouse returned error: NO_FCP", {
        status: 500,
        retryable: false,
      }),
    );

    const fetched = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "desktop",
    );

    expect(fetched.result.errorMessage).toBe(
      "Lighthouse returned error: NO_FCP",
    );
    expect(fetched.payloadJson).toBeNull();
  });

  it("marks a spent daily quota so the phase can stop, without a retry", async () => {
    fetchPageSpeedReportMock.mockRejectedValue(
      new PageSpeedError("Quota exceeded for Queries per day", {
        status: 429,
        retryable: false,
        quotaExhausted: true,
      }),
    );

    const fetched = await fetchLighthouseResult(
      "https://example.com/",
      "page-1",
      "mobile",
    );

    expect(fetched.quotaExhausted).toBe(true);
    expect(fetched.result.errorMessage).toMatch(/^Kota doldu/);
  });
});

describe("classifyFailure", () => {
  it("treats a daily 429 as final and a per-minute 429 as retryable", () => {
    const daily = classifyFailure(429, "Quota exceeded: Queries per day", true);
    const perMinute = classifyFailure(
      429,
      "Quota exceeded: Queries per minute",
      true,
    );

    expect([daily.retryable, daily.quotaExhausted]).toEqual([false, true]);
    expect([perMinute.retryable, perMinute.quotaExhausted]).toEqual([
      true,
      false,
    ]);
    expect([daily.rateLimited, perMinute.rateLimited]).toEqual([false, true]);
  });
});
