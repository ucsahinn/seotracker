import { describe, expect, it } from "vitest";
import { sanitizeAuditErrorDetail } from "./sanitizeAuditError";

describe("sanitizeAuditErrorDetail", () => {
  it("keeps useful failure text while removing URLs, credentials, and local paths", () => {
    const result = sanitizeAuditErrorDetail(
      "Request failed for https://private.example/path?token=abc with Bearer xyz; api_key=def at C:\\Users\\Alice\\app\\server.js",
    );

    expect(result).toBe(
      "Request failed for [URL redacted] with Bearer [redacted]; api_key=[redacted] at [path redacted]",
    );
    expect(result).not.toMatch(/private\.example|abc|xyz|def|Alice/);
  });

  it("redacts bare token fields and POSIX and UNC paths", () => {
    const result = sanitizeAuditErrorDetail(
      "token=abc123 at /home/alice/app/server.js and \\\\build-host\\Users\\Alice\\app.js",
    );

    expect(result).toBe(
      "token=[redacted] at [path redacted] and [path redacted]",
    );
    expect(result).not.toMatch(/abc123|alice|build-host/i);
  });

  it("limits the exported detail and preserves null values", () => {
    expect(sanitizeAuditErrorDetail(null)).toBeNull();
    expect(sanitizeAuditErrorDetail("x".repeat(700))).toHaveLength(300);
    expect(sanitizeAuditErrorDetail("first line\nsecond line")).toBe(
      "first line second line",
    );
  });
});
