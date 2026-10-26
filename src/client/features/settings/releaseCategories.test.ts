import { describe, expect, it } from "vitest";
import { CHANGELOG_ENTRIES_BY_LOCALE } from "./changelog";
import { getReleaseCategories, stripLeadingEmoji } from "./releaseCategories";

describe("release categories", () => {
  it("classifies section headings without mistaking security prose for a security release", () => {
    expect(
      getReleaseCategories({
        sections: [
          { heading: "Yenilikler", items: [] },
          { heading: "Güvenlik", items: [] },
          { heading: "Düzeltmeler", items: [] },
        ],
      }),
    ).toEqual(["feature", "fix", "security"]);
    expect(
      getReleaseCategories({
        sections: [
          {
            heading: "Uygulama",
            items: [{ text: "Güvenlik sayfasına bağlantı", code: false }],
          },
        ],
      }),
    ).toEqual(["feature"]);
  });
  it("distinguishes explicit hotfixes and leaves unknown sections unlabelled", () => {
    expect(
      getReleaseCategories({
        sections: [{ heading: "Acil düzeltme", items: [] }],
      }),
    ).toEqual(["hotfix"]);
    expect(
      getReleaseCategories({
        sections: [{ heading: "Başlamadan önce", items: [] }],
      }),
    ).toEqual([]);
  });

  it("keeps colored release labels when section headings are in English", () => {
    expect(
      getReleaseCategories({
        sections: [
          { heading: "Features", items: [] },
          { heading: "Fixes", items: [] },
          { heading: "Security", items: [] },
        ],
      }),
    ).toEqual(["feature", "fix", "security"]);
    expect(
      getReleaseCategories({
        sections: [{ heading: "What the app offers", items: [] }],
      }),
    ).toEqual(["feature"]);
  });

  it.each([
    ["Funktionen", "Fehlerbehebungen", "Sicherheit"],
    ["Fonctionnalités", "Corrections", "Sécurité"],
    ["Funzionalità", "Correzioni", "Sicurezza"],
    ["Funcionalidades", "Correções", "Segurança"],
  ])("classifies translated release headings", (feature, fix, security) => {
    expect(
      getReleaseCategories({
        sections: [
          { heading: feature, items: [] },
          { heading: fix, items: [] },
          { heading: security, items: [] },
        ],
      }),
    ).toEqual(["feature", "fix", "security"]);
  });

  it("ignores the emoji that opens each curated heading", () => {
    expect(stripLeadingEmoji("🛠️ Düzeltmeler")).toBe("Düzeltmeler");
    expect(stripLeadingEmoji("✨ Highlights")).toBe("Highlights");
    expect(stripLeadingEmoji("Fixes")).toBe("Fixes");
    expect(
      getReleaseCategories({
        sections: [
          { heading: "✨ Öne çıkanlar", items: [] },
          { heading: "🛠️ Düzeltmeler", items: [] },
          { heading: "🔒 Güvenlik", items: [] },
        ],
      }),
    ).toEqual(["feature", "fix", "security"]);
  });

  it("labels the real releases in every language", () => {
    for (const [locale, entries] of Object.entries(
      CHANGELOG_ENTRIES_BY_LOCALE,
    )) {
      expect(
        entries.map((entry) => getReleaseCategories(entry)),
        locale,
      ).toEqual([
        ["feature", "fix", "security"],
        ["feature", "fix"],
        ["feature", "fix", "security"],
      ]);
    }
  });
});
