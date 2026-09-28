import { describe, expect, it } from "vitest";
import { gscPropertyCoversHost, gscPropertyHost } from "./gscProperty";

describe("gscPropertyCoversHost", () => {
  it("covers the domain and its subdomains for a domain property", () => {
    expect(gscPropertyCoversHost("sc-domain:example.com", "example.com")).toBe(
      true,
    );
    expect(
      gscPropertyCoversHost("sc-domain:example.com", "blog.example.com"),
    ).toBe(true);
  });

  /*
   * The whole point of the check: an audit of another site inside the same
   * project must not be answered with this property's data.
   */
  it("does not cover an unrelated host", () => {
    expect(gscPropertyCoversHost("sc-domain:example.com", "other.com")).toBe(
      false,
    );
    expect(gscPropertyCoversHost("https://example.com/", "vaultpilot.io")).toBe(
      false,
    );
  });

  /*
   * A suffix match alone would accept this, and "notexample.com" is not a
   * subdomain of "example.com".
   */
  it("does not mistake a suffix for a subdomain", () => {
    expect(
      gscPropertyCoversHost("sc-domain:example.com", "notexample.com"),
    ).toBe(false);
  });

  it("treats www as the same site as the bare host", () => {
    expect(
      gscPropertyCoversHost("https://www.example.com/", "example.com"),
    ).toBe(true);
    expect(
      gscPropertyCoversHost("https://example.com/", "www.example.com"),
    ).toBe(true);
  });

  it("does not cover a subdomain for a URL-prefix property", () => {
    expect(
      gscPropertyCoversHost("https://example.com/", "blog.example.com"),
    ).toBe(false);
  });

  it("answers false rather than throwing on missing or unparseable input", () => {
    expect(gscPropertyCoversHost(null, "example.com")).toBe(false);
    expect(gscPropertyCoversHost("sc-domain:example.com", null)).toBe(false);
    expect(gscPropertyCoversHost("not a url", "example.com")).toBe(false);
  });
});

describe("gscPropertyHost", () => {
  it("names the property for both shapes", () => {
    expect(gscPropertyHost("sc-domain:example.com")).toBe("example.com");
    expect(gscPropertyHost("https://www.example.com/")).toBe("example.com");
    expect(gscPropertyHost(null)).toBeNull();
  });
});
