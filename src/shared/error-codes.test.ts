import { describe, expect, it } from "vitest";
import { shouldCaptureAppErrorCode } from "@/shared/error-codes";

describe("shouldCaptureAppErrorCode", () => {
  it.each([
    "UNAUTHENTICATED",
    "NOT_FOUND",
    "VALIDATION_ERROR",
    "AUDIT_CAPACITY_REACHED",
    "AUDIT_PAGE_LIMIT_EXCEEDED",
    "AUDIT_ALREADY_RUNNING",
    "RATE_LIMITED",
  ] as const)("skips expected %s errors", (code) => {
    expect(shouldCaptureAppErrorCode(code)).toBe(false);
  });

  it("captures unexpected errors and unknown failures", () => {
    expect(shouldCaptureAppErrorCode("INTERNAL_ERROR")).toBe(true);
    expect(shouldCaptureAppErrorCode(undefined)).toBe(true);
    // A denied request is a real problem in a single-user install, where
    // there is nobody to be denied. The paid-data billing codes this used to
    // assert on went out with the paid-data surface.
    expect(shouldCaptureAppErrorCode("FORBIDDEN")).toBe(true);
    expect(shouldCaptureAppErrorCode("CONFLICT")).toBe(true);
  });
});
