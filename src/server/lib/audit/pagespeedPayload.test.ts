import { describe, expect, it } from "vitest";
import {
  isLighthouseRuntimeError,
  parsePageSpeedPayload,
  readPageSpeedApiError,
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
