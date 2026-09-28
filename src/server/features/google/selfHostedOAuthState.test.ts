import { describe, expect, it } from "vitest";
import { getSafeCallbackPath } from "./selfHostedOAuthState";

const ORIGIN = "http://localhost:3001";

describe("getSafeCallbackPath", () => {
  it("keeps a path on this origin, with its query and hash", () => {
    expect(getSafeCallbackPath("/p/abc/settings?tab=x#y", ORIGIN)).toBe(
      "/p/abc/settings?tab=x#y",
    );
    expect(getSafeCallbackPath(`${ORIGIN}/projects`, ORIGIN)).toBe("/projects");
  });

  it("refuses another origin", () => {
    expect(getSafeCallbackPath("https://evil.com/steal", ORIGIN)).toBe("/");
  });

  /*
   * The origin check on its own passes this: `/..//evil.com` resolves to
   * this origin with the pathname `//evil.com`, and the success redirect
   * writes the path into `Location` unchanged — where a browser reads the
   * leading `//` as protocol-relative and leaves. Origin matched,
   * destination did not.
   */
  it("refuses a path a browser would read as another host", () => {
    expect(getSafeCallbackPath("/..//evil.com", ORIGIN)).toBe("/");
    expect(getSafeCallbackPath("//evil.com/path", ORIGIN)).toBe("/");
  });

  it("falls back to the root rather than throwing on nonsense", () => {
    expect(getSafeCallbackPath("http://", ORIGIN)).toBe("/");
  });
});
