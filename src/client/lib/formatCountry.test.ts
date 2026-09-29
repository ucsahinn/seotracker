import { describe, expect, it } from "vitest";
import { formatCountry } from "@/client/lib/format";

describe("formatCountry", () => {
  /*
   * Search Console reports alpha-3 and `Intl.DisplayNames` only speaks
   * alpha-2, so the narrowing is the whole point: without it a Turkish UI
   * showed "TUR / GBR / DEU" under a heading reading "Ülkeler".
   */
  it("names the countries a Turkish operator actually sees", () => {
    expect(formatCountry("TUR")).toBe("Türkiye");
    expect(formatCountry("GBR")).toBe("Birleşik Krallık");
    expect(formatCountry("DEU")).toBe("Almanya");
  });

  it("accepts an alpha-2 code directly", () => {
    expect(formatCountry("TR")).toBe("Türkiye");
  });

  it("is case-insensitive, since the codes arrive however Google sent them", () => {
    expect(formatCountry("tur")).toBe("Türkiye");
  });

  /*
   * A country outside the map must not disappear or become a wrong name.
   * The code is still a usable answer; a guess is not.
   */
  it("falls back to the code it was given", () => {
    expect(formatCountry("ZZZ")).toBe("ZZZ");
  });
});
