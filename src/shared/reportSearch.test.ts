import { describe, expect, it } from "vitest";
import { reportSearchPattern } from "./reportSearch";
it("escapes GLOB syntax and keeps literal percent and underscore", () => {
  expect(reportSearchPattern("[*?]%_")).toBe("*[[][*][?][]]%_*");
});
describe("Latin search", () => {
  it("includes accented case pairs and distinct Turkish I", () => {
    expect(reportSearchPattern("ÖÉÄIİ")).toBe("*[Öö][Éé][Ää][Iı][İi]*");
  });
});
