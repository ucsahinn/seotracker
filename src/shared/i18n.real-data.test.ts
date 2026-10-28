import { afterEach, expect, it } from "vitest";
import { setLocale, t } from "./i18n";

afterEach(() => setLocale("tr"));

it.each([1, 2])(
  "uses the right English noun for %s observed queries and rows",
  (count) => {
    setLocale("en");
    expect(
      t(
        "{count} sorgunun mevcut sırası gösteriliyor. Önceki dönemle karşılaştırılabilecek sorgu yok.",
        { count },
      ),
    ).toBe(
      count === 1
        ? "Current positions for 1 query. No queries can be compared with the previous period."
        : "Current positions for 2 queries. No queries can be compared with the previous period.",
    );
    expect(t("Listelenen {count} satırda", { count })).toBe(
      count === 1 ? "Across the 1 listed row" : "Across the 2 listed rows",
    );
  },
);

it("avoids plural nouns for independently varying formatted counts", () => {
  setLocale("en");
  expect(
    t("Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.", {
      clicks: "1",
      impressions: "2",
    }),
  ).toBe("Previous period — clicks: 1; impressions: 2.");
  expect(
    t("{matching} sonuç / projedeki {total} rapor", {
      matching: "1",
      total: "2",
    }),
  ).toBe("Results: 1 / reports in the project: 2");
});
