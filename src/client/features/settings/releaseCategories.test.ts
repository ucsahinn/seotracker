import { describe, expect, it } from "vitest";
import { getReleaseCategories } from "./releaseCategories";

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
});
