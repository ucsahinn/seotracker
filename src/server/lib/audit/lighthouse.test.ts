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

import { PageSpeedError } from "./pagespeed";
import { fetchLighthouseResult, selectLighthouseSample } from "./lighthouse";

afterEach(() => {
  vi.clearAllMocks();
});

describe("selectLighthouseSample", () => {
  it("includes a start page reached through a trailing-slash redirect", () => {
    const pages = [
      ...Array.from({ length: 10 }, (_, index) => ({
        url: `https://example.com/section${index}`,
        statusCode: 200,
      })),
      { url: "https://example.com/services/", statusCode: 200 },
    ];

    const selected = selectLighthouseSample(
      pages,
      "https://example.com/services",
      "auto",
    );

    expect(selected).toHaveLength(10);
    expect(selected[0]).toBe("https://example.com/services/");
  });

  it("prefers an exact start page when both slash forms return 2xx", () => {
    const selected = selectLighthouseSample(
      [
        { url: "https://example.com/services/", statusCode: 200 },
        { url: "https://example.com/services", statusCode: 200 },
      ],
      "https://example.com/services",
      "auto",
    );

    expect(selected[0]).toBe("https://example.com/services");
  });

  it("does not sample another page from the start page's template", () => {
    const selected = selectLighthouseSample(
      [
        { url: "https://example.com/products/123", statusCode: 200 },
        { url: "https://example.com/products/456", statusCode: 200 },
        { url: "https://example.com/about", statusCode: 200 },
      ],
      "https://example.com/products/123",
      "auto",
    );

    expect(selected).toEqual([
      "https://example.com/products/123",
      "https://example.com/about",
    ]);
  });
});

describe("fetchLighthouseResult", () => {
  it("rethrows a retryable provider failure so the workflow step retries", async () => {
    fetchPageSpeedReportMock.mockRejectedValue(
      new PageSpeedError("quota exceeded", { status: 429, retryable: true }),
    );

    await expect(
      fetchLighthouseResult("https://example.com/", "page-1", "desktop"),
    ).rejects.toThrow("quota exceeded");
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
});
