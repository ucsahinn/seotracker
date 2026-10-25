import { describe, expect, it } from "vitest";
import { resolveLocale } from "./i18n";

describe("resolveLocale", () => {
  it.each(["tr", "en", "de", "fr", "it", "pt"] as const)(
    "honors the %s language cookie",
    (locale) => {
      expect(resolveLocale(`seowatcher-lang=${locale}`, null)).toBe(locale);
    },
  );

  it.each([
    ["de-AT,de;q=0.9,en;q=0.8", "de"],
    ["fr-CA,en;q=0.8", "fr"],
    ["it-IT,en;q=0.8", "it"],
    ["pt-BR,en;q=0.8", "pt"],
  ])("selects the supported language from %s", (header, expected) => {
    expect(resolveLocale(null, header)).toBe(expected);
  });

  it("keeps Turkish as the no-preference default and English as fallback", () => {
    expect(resolveLocale(null, null)).toBe("tr");
    expect(resolveLocale(null, "ja-JP, *;q=0")).toBe("en");
  });
});
