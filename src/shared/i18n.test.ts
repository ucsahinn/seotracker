import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveLocale, setLocale, t } from "@/shared/i18n";

// A fixed catalog, so these tests do not move when the real English does.
vi.mock("@/shared/i18n/en", () => ({
  en: {
    "{name} kaydedildi": "{name} saved",
    "{count} sayfa": { one: "{count} page", other: "{count} pages" },
  },
}));

afterEach(() => setLocale("tr"));

describe("t", () => {
  it("fills placeholders in the English template", () => {
    setLocale("en");
    expect(t("{name} kaydedildi", { name: "Rapor" })).toBe("Rapor saved");
  });

  it("picks the English plural form from count and groups it", () => {
    setLocale("en");
    expect(t("{count} sayfa", { count: 1 })).toBe("1 page");
    expect(t("{count} sayfa", { count: 1234 })).toBe("1,234 pages");
  });

  it("falls back to the Turkish source when English is missing", () => {
    setLocale("en");
    expect(t("Henüz çevrilmedi {x}", { x: 3 })).toBe("Henüz çevrilmedi 3");
  });

  it("uses the Turkish source in Turkish, plural entry or not", () => {
    expect(t("{count} sayfa", { count: 1234 })).toBe("1.234 sayfa");
  });

  it("uses a translated catalog entry and falls back to English per key", () => {
    setLocale("de");
    expect(t("Bildirimler")).toBe("Benachrichtigungen");
    expect(t("Henüz çevrilmedi {x}", { x: 3 })).toBe("Henüz çevrilmedi 3");
  });
});

describe("resolveLocale", () => {
  it("prefers the cookie over the browser's languages", () => {
    expect(resolveLocale("a=1; seowatcher-lang=tr", "en-US,en")).toBe("tr");
  });

  it("reads Accept-Language by preference and uses supported languages", () => {
    expect(resolveLocale(null, "tr-TR,tr;q=0.9,en;q=0.8")).toBe("tr");
    expect(resolveLocale(null, "tr;q=0.5,de-DE")).toBe("de");
  });

  it("stays Turkish with no usable header", () => {
    expect(resolveLocale(null, null)).toBe("tr");
  });
});
