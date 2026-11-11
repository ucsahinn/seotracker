import { describe, expect, it } from "vitest";
import { reportSearchPatterns } from "./reportSearch";
it("escapes GLOB syntax and keeps literal percent and underscore", () => {
  expect(reportSearchPatterns("[*?]%_")).toEqual(["*[[][*][?][]]%_*"]);
});
describe("Latin search", () => {
  it("includes accented case pairs and distinct Turkish I", () => {
    expect(reportSearchPatterns("ÖÉÄIİ")).toEqual(["*[Öö][Éé][Ää][Iı][İi]*"]);
  });
});

it("splits a long search so that no pattern exceeds D1's 50 bytes", () => {
  const patterns = reportSearchPatterns("nevresim takımı kampanya");
  expect(patterns.length).toBeGreaterThan(1);
  for (const pattern of patterns)
    expect(new TextEncoder().encode(pattern).length).toBeLessThanOrEqual(50);
  // Nothing of the search is dropped between the pieces.
  expect(patterns.join("").replaceAll("*", "")).toBe(
    "[Nn][Ee][Vv][Rr][Ee][Ss][İi][Mm] [Tt][Aa][Kk][Iı][Mm][Iı] [Kk][Aa][Mm][Pp][Aa][Nn][Yy][Aa]",
  );
});
