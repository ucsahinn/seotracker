import { describe, expect, it } from "vitest";
import { textPixelWidth, truncateToPixels } from "@/shared/serp-pixel-width";

describe("textPixelWidth", () => {
  it("measures with Arial's advance widths at 20px", () => {
    // H 722 + e 556 + l 222 + l 222 + o 556 = 2278 units
    expect(textPixelWidth("Hello")).toBe(46);
    // The last entry of the table, so a short table would show here.
    expect(textPixelWidth("~")).toBe(12);
  });

  it("measures Turkish letters as their base letter", () => {
    expect(textPixelWidth("şğüöçİ")).toBe(textPixelWidth("sguocI"));
    expect(textPixelWidth("ı")).toBe(textPixelWidth("I"));
  });
});

describe("truncateToPixels", () => {
  it("keeps a title that fits and cuts one that does not at a word", () => {
    expect(truncateToPixels("Kısa başlık", 580)).toEqual({
      text: "Kısa başlık",
      truncated: false,
    });

    const long = truncateToPixels("Kelime ".repeat(30), 580);

    expect(long.truncated).toBe(true);
    expect(long.text.endsWith("Kelime ...")).toBe(true);
    expect(textPixelWidth(long.text)).toBeLessThanOrEqual(580);
  });
});
