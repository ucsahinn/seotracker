import { describe, expect, it } from "vitest";
import { isMcpRequestAuthorized } from "@/server/mcp/token-auth";

describe("isMcpRequestAuthorized", () => {
  // The default install sets no token: loopback plus the handler's origin
  // check is the boundary, and requiring a header would break every existing
  // client for a risk that install does not carry.
  it("lets everything through when no token is configured", () => {
    expect(isMcpRequestAuthorized(null, undefined)).toBe(true);
    expect(isMcpRequestAuthorized(null, "   ")).toBe(true);
  });

  it("accepts the token however the client cased the scheme", () => {
    expect(isMcpRequestAuthorized("Bearer s3cret", "s3cret")).toBe(true);
    expect(isMcpRequestAuthorized("bearer s3cret", "s3cret")).toBe(true);
    expect(isMcpRequestAuthorized("s3cret", "s3cret")).toBe(true);
  });

  it("refuses a missing, wrong or truncated token", () => {
    expect(isMcpRequestAuthorized(null, "s3cret")).toBe(false);
    expect(isMcpRequestAuthorized("Bearer ", "s3cret")).toBe(false);
    expect(isMcpRequestAuthorized("Bearer wrong", "s3cret")).toBe(false);
    // A prefix must not pass: the length check is what stops that.
    expect(isMcpRequestAuthorized("Bearer s3cre", "s3cret")).toBe(false);
  });
});
