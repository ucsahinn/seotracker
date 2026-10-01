import { describe, expect, it } from "vitest";
import { searchFold } from "@/client/lib/searchFold";

describe("searchFold", () => {
  it("matches the same word across Turkish and English capitals", () => {
    expect(searchFold("INFO")).toBe(searchFold("info"));
    expect(searchFold("ISPARTA")).toBe(searchFold("ısparta"));
    expect(searchFold("Işık")).toBe(searchFold("ışık"));
    expect(searchFold("İstanbul")).toBe(searchFold("istanbul"));
  });

  it("keeps distinct letters distinct", () => {
    expect(searchFold("şık")).not.toBe(searchFold("sik"));
  });
});
