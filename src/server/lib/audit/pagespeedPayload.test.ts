import { describe, expect, it } from "vitest";
import {
  isLighthouseRuntimeError,
  parsePageSpeedPayload,
  readPageSpeedApiError,
  SCREENSHOT_MAX_CHARS,
} from "./pagespeedPayload";

const INPUT = { url: "https://example.com/", strategy: "mobile" as const };

/** The smallest body the parser accepts: one scored category, one audit. */
function response(overrides: Record<string, unknown> = {}) {
  return {
    analysisUTCTimestamp: "2026-09-19T10:00:00.000Z",
    lighthouseResult: {
      requestedUrl: "https://example.com/",
      finalUrl: "https://example.com/",
      lighthouseVersion: "12.2.0",
      categories: {
        performance: {
          score: 0.91 as number | null,
          auditRefs: [{ id: "server-response-time" }],
        },
      },
      audits: {
        "server-response-time": {
          title: "Initial server response time was short",
          description: "Keep the server response time low.",
          score: 0.4,
          scoreDisplayMode: "binary",
          displayValue: "Root document took 610 ms",
          numericValue: 610,
        },
      },
    },
    ...overrides,
  };
}

describe("parsePageSpeedPayload", () => {
  it("maps scores, metrics and issues onto the stored shape", () => {
    const payload = parsePageSpeedPayload(response(), INPUT);

    expect(payload.source).toBe("pagespeed-insights");
    expect(payload.scores.performance).toBe(91);
    expect(payload.metadata.lighthouseVersion).toBe("12.2.0");
    // PageSpeed's own timestamp, not the local clock: it serves cached runs.
    expect(payload.metadata.fetchedAt).toBe("2026-09-19T10:00:00.000Z");
    expect(payload.metrics.serverResponseTime.numericValue).toBe(610);
    expect(payload.issues).toHaveLength(1);
    expect(payload.issues[0]?.auditKey).toBe("server-response-time");
  });

  it("refuses a report with no category scores at all", () => {
    const body = response();
    body.lighthouseResult.categories.performance.score = null;

    expect(() => parsePageSpeedPayload(body, INPUT)).toThrow(
      /no category scores/,
    );
  });

  it("surfaces a runtime error the API reported inside a 200", () => {
    const body = response();
    Object.assign(body.lighthouseResult, {
      runtimeError: { code: "NO_FCP", message: "The page did not paint" },
    });

    expect(() => parsePageSpeedPayload(body, INPUT)).toThrow(/NO_FCP/);
  });

  it("keeps field data that belongs to this URL", () => {
    const payload = parsePageSpeedPayload(
      response({
        loadingExperience: {
          overall_category: "AVERAGE",
          metrics: {
            LARGEST_CONTENTFUL_PAINT_MS: {
              percentile: 2600,
              category: "AVERAGE",
            },
            INTERACTION_TO_NEXT_PAINT: { percentile: 180, category: "FAST" },
          },
        },
      }),
      INPUT,
    );

    expect(payload.fieldData?.overall).toBe("AVERAGE");
    expect(payload.fieldData?.largestContentfulPaint).toEqual({
      percentile: 2600,
      category: "AVERAGE",
    });
    // INP has no lab equivalent, so the field value fills the metric slot.
    expect(payload.metrics.interactionToNextPaint.numericValue).toBe(180);
  });

  // Without this guard every long-tail URL would report the site-wide average
  // as if Chrome had measured that page.
  it("drops field data Google substituted from the whole origin", () => {
    const payload = parsePageSpeedPayload(
      response({
        loadingExperience: {
          origin_fallback: true,
          overall_category: "FAST",
          metrics: {
            LARGEST_CONTENTFUL_PAINT_MS: { percentile: 900, category: "FAST" },
          },
        },
      }),
      INPUT,
    );

    expect(payload.fieldData).toBeNull();
  });
});

describe("readPageSpeedApiError", () => {
  it("prefers the message the API gave", () => {
    expect(
      readPageSpeedApiError(429, { error: { message: "Quota exceeded" } }),
    ).toBe("PageSpeed Insights 429: Quota exceeded");
  });

  it("strips an echoed ?key= from the API message", () => {
    const text = readPageSpeedApiError(400, {
      error: { message: "bad request /run?url=a&key=SECRET123" },
    });

    expect(text).not.toContain("SECRET123");
  });

  it("falls back to the status when the body is unusable", () => {
    expect(readPageSpeedApiError(503, "<html>")).toBe(
      "PageSpeed Insights request failed with HTTP 503",
    );
  });
});

describe("isLighthouseRuntimeError", () => {
  // These describe the page being measured, so a retry fails the same way.
  it("recognizes failures that are properties of the page", () => {
    expect(isLighthouseRuntimeError("Lighthouse returned error: NO_FCP")).toBe(
      true,
    );
    expect(isLighthouseRuntimeError("ERRORED_DOCUMENT_REQUEST")).toBe(true);
  });

  it("leaves transport failures alone", () => {
    expect(isLighthouseRuntimeError("PageSpeed Insights 429: Quota")).toBe(
      false,
    );
  });
});

describe("final screenshot", () => {
  const withScreenshot = (data: string) => {
    const body = response();
    Object.assign(body.lighthouseResult.audits, {
      "final-screenshot": { details: { type: "screenshot", data } },
    });
    return body;
  };
  const jpeg = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";

  it("keeps the mobile screenshot and leaves the desktop one out", () => {
    expect(parsePageSpeedPayload(withScreenshot(jpeg), INPUT).screenshot).toBe(
      jpeg,
    );
    expect(
      parsePageSpeedPayload(withScreenshot(jpeg), {
        ...INPUT,
        strategy: "desktop",
      }).screenshot,
    ).toBeNull();
  });

  it("skips a screenshot over the size cap or that is not an image data URI", () => {
    const huge = `data:image/jpeg;base64,${"A".repeat(SCREENSHOT_MAX_CHARS)}`;

    expect(
      parsePageSpeedPayload(withScreenshot(huge), INPUT).screenshot,
    ).toBeNull();
    expect(
      parsePageSpeedPayload(withScreenshot("javascript:alert(1)"), INPUT)
        .screenshot,
    ).toBeNull();
  });
});

describe("tracked audit verdicts", () => {
  /*
   * The shapes Lighthouse 13 reports: an insight with metric savings and
   * its bytes under debugData, a checklist inside a list detail, a table of
   * third parties with main-thread time. Untracked audits are not kept.
   */
  it("keeps the verdicts the findings read, and only those", () => {
    const body = response();
    Object.assign(body.lighthouseResult.audits, {
      "image-delivery-insight": {
        score: 0,
        scoreDisplayMode: "metricSavings",
        metricSavings: { FCP: 0, LCP: 450 },
        details: {
          type: "table",
          items: [{ url: "https://example.com/hero.jpg" }],
          debugData: { type: "debugdata", wastedBytes: 182_000 },
        },
      },
      "lcp-discovery-insight": {
        score: 0,
        scoreDisplayMode: "metricSavings",
        details: {
          type: "list",
          items: [
            {
              type: "checklist",
              items: {
                eagerlyLoaded: { value: false, label: "lazy" },
                priorityHinted: { value: true, label: "ok" },
              },
            },
          ],
        },
      },
      "third-parties-insight": {
        score: null,
        scoreDisplayMode: "informative",
        details: {
          type: "table",
          items: [
            { entity: "Ads", mainThreadTime: 400.4 },
            { entity: "Chat", mainThreadTime: 200.2 },
          ],
        },
      },
      "speed-index": { score: 0.2, scoreDisplayMode: "numeric" },
    });

    const audits = parsePageSpeedPayload(body, INPUT).audits ?? {};

    expect(audits["image-delivery-insight"]).toMatchObject({
      score: 0,
      savingsMs: 450,
      savingsBytes: 182_000,
      examples: ["https://example.com/hero.jpg"],
    });
    expect(audits["lcp-discovery-insight"]?.checklist).toEqual({
      eagerlyLoaded: false,
      priorityHinted: true,
    });
    expect(audits["third-parties-insight"]?.mainThreadMs).toBe(601);
    expect(audits["speed-index"]).toBeUndefined();
  });
});
