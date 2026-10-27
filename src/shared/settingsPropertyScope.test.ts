import { expect, it } from "vitest";
import { gscPropertyMismatch } from "./settingsPropertyScope";
it("accepts domain properties covering a subdomain and warns only on known host mismatch", () => {
  expect(gscPropertyMismatch("blog.example.com", "sc-domain:example.com")).toBe(
    false,
  );
  expect(
    gscPropertyMismatch("example.com", "https://www.example.com/blog/"),
  ).toBe(false);
  expect(gscPropertyMismatch("example.com", "sc-domain:other.test")).toBe(true);
  expect(gscPropertyMismatch(null, "sc-domain:other.test")).toBe(false);
});
