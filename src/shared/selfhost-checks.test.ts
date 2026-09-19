import { describe, expect, it } from "vitest";
import { validateTeamDomain } from "./selfhost-checks";

describe("validateTeamDomain", () => {
  it("accepts a full https team domain", () => {
    expect(
      validateTeamDomain("https://your-team.cloudflareaccess.com"),
    ).toEqual({ ok: true, origin: "https://your-team.cloudflareaccess.com" });
  });

  it("trims whitespace and trailing slashes", () => {
    expect(
      validateTeamDomain(" https://your-team.cloudflareaccess.com/ "),
    ).toEqual({ ok: true, origin: "https://your-team.cloudflareaccess.com" });
  });

  it("rejects a bare hostname and tells the user to add https://", () => {
    const result = validateTeamDomain("your-team.cloudflareaccess.com");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("https://");
      expect(result.message).toContain(
        'add the https:// prefix to "your-team.cloudflareaccess.com"',
      );
    }
  });

  it("rejects http://", () => {
    const result = validateTeamDomain("http://your-team.cloudflareaccess.com");
    expect(result.ok).toBe(false);
  });

  it("rejects empty values", () => {
    expect(validateTeamDomain("").ok).toBe(false);
  });
});
