import { describe, expect, it } from "vitest";
import {
  AppError,
  isUniqueConstraintError,
  toClientError,
} from "@/server/lib/errors";

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

describe("isUniqueConstraintError", () => {
  it("finds the driver message on the cause of a wrapped query error", () => {
    const wrapped = new Error("Failed query: insert ...", {
      cause: new Error("UNIQUE constraint failed: projects.name"),
    });

    expect(isUniqueConstraintError(wrapped)).toBe(true);
    expect(isUniqueConstraintError(new Error("boom"))).toBe(false);
  });
});
