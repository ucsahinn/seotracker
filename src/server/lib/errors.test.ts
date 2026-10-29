import { describe, expect, it } from "vitest";
import {
  AppError,
  googleAppError,
  isUniqueConstraintError,
  toClientError,
} from "@/server/lib/errors";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { GscApiError } from "@/server/lib/gscErrors";

describe("toClientError", () => {
  it("sanitizes detailed internal error messages", () => {
    const error = toClientError(
      new AppError(
        "INTERNAL_ERROR",
        "DataForSEO task missing billing metadata (path: Invalid input). Response: {...}",
      ),
    );

    expect(error.message).toBe("INTERNAL_ERROR");
  });

  it("keeps public error codes unchanged", () => {
    const error = toClientError(new AppError("AUDIT_ALREADY_RUNNING"));

    expect(error.message).toBe("AUDIT_ALREADY_RUNNING");
  });

  it("passes setup-error detail through as CODE: detail", () => {
    const error = toClientError(
      new AppError(
        "AUTH_CONFIG_MISSING",
        "TEAM_DOMAIN must be a full https URL like https://your-team.cloudflareaccess.com",
      ),
    );

    expect(error.message).toBe(
      "AUTH_CONFIG_MISSING: TEAM_DOMAIN must be a full https URL like https://your-team.cloudflareaccess.com",
    );
  });

  it("keeps a detail-less setup error as its bare code", () => {
    const error = toClientError(new AppError("AUTH_CONFIG_MISSING"));

    expect(error.message).toBe("AUTH_CONFIG_MISSING");
  });

  it.each(["CONFLICT", "VALIDATION_ERROR"] as const)(
    "keeps the hand-written %s message",
    (code) => {
      const error = toClientError(new AppError(code, "Alan adı geçersiz."));

      expect(error.message).toBe(`${code}: Alan adı geçersiz.`);
    },
  );
});

/*
 * A Google failure used to reach the screen as one "Google did not answer"
 * whatever happened. Each cause now carries its own cause-and-fix sentence.
 */
describe("googleAppError", () => {
  const clientMessage = (error: unknown) =>
    toClientError(googleAppError(error)).message;

  it("names a missing GA4 permission and how to grant it", () => {
    const message = clientMessage(
      new Ga4ReportError("ga4_property_inaccessible", "no access", null, {
        status: 403,
        reason: "PERMISSION_DENIED",
      }),
    );
    expect(message).toMatch(/^UPSTREAM_UNAVAILABLE: /);
    expect(message).toContain("HTTP 403");
    expect(message).toContain("Görüntüleyici");
  });

  it("keeps an exhausted quota as RATE_LIMITED, with when it renews", () => {
    const message = clientMessage(
      new Ga4ReportError("ga4_quota_exhausted", "quota", 60, {
        status: 429,
        reason: null,
      }),
    );
    expect(message).toMatch(/^RATE_LIMITED: /);
    expect(message).toContain("saatlik ve günlük");
  });

  it("tells a removed Search Console property from a Google outage", () => {
    expect(clientMessage(new GscApiError(404, "gone"))).toContain(
      "mülkü bulunamadı",
    );
    expect(clientMessage(new GscApiError(500, "oops"))).toContain("HTTP 500");
  });
});

describe("isUniqueConstraintError", () => {
  it("finds the driver message on the cause of a wrapped query error", () => {
    const wrapped = new Error("Failed query: insert ...", {
      cause: new Error("UNIQUE constraint failed: projects.name"),
    });

    expect(isUniqueConstraintError(wrapped)).toBe(true);
    expect(isUniqueConstraintError(new Error("boom"))).toBe(false);
  });
});
