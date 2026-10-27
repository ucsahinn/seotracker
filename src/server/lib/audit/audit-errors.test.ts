import { describe, expect, it } from "vitest";
import { classifyAuditError, storedAuditErrorCode } from "./audit-errors";

describe("classifyAuditError", () => {
  it("names a missing instance key as its own code, as the workflow serialises it", () => {
    expect(
      classifyAuditError(
        new Error(
          "MissingInstanceKeyError: No instance encryption key. In Docker the container generates one at startup; outside it, set BETTER_AUTH_SECRET.",
        ),
      ).errorCode,
    ).toBe("missing_secret");
  });

  it.each([
    ["Worker exceeded memory limit", "oom"],
    ["Execution timed out", "step_timeout"],
    ["Failed query: select 1", "db_error"],
    ["something nobody planned for", "unknown"],
  ])("%s -> %s", (message, code) => {
    expect(classifyAuditError(message).errorCode).toBe(code);
  });
});

describe("storedAuditErrorCode", () => {
  it("re-reads the cause of a row stored as unknown before missing_secret existed", () => {
    expect(
      storedAuditErrorCode({
        errorCode: "unknown",
        errorDetail: "MissingInstanceKeyError: No instance encryption key.",
      }),
    ).toBe("missing_secret");
    expect(storedAuditErrorCode({ errorCode: "oom", errorDetail: null })).toBe(
      "oom",
    );
  });
});
