import { t } from "@/shared/i18n";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import type { WorkKind } from "@/shared/pageOpportunities";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { perMonth } from "@/shared/pageOpportunities";

export type OpportunityRow = OpportunityReport["rows"][number];
export type QuickId = "converts" | "no_conversions";

/**
 * The four kinds of work, cheapest first. Copy lives here so the bars, the
 * table and the panel agree; it stays Turkish and goes through t() where it
 * renders. Colours are tints of the one accent: these are categories, not
 * verdicts, so success / warning / error stay out of them.
 */
export const WORK_COPY = {
  snippet: {
    label: "Başlık ve açıklama işi",
    action: "Başlığı ve açıklamayı yenileyin",
    hint: "İlk sayfada ama sitenizin aynı sıradaki aramalarına göre az tıklanıyor. Sıra değişmeden tıklama artar.",
    target: "aynı sıra, sitenizin tıklama oranı",
    shade: 100,
    todo: [
      "Başlığı, aşağıdaki aramaların ilk kelimelerde karşılık bulacağı biçimde yeniden yazın.",
      "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.",
      "Değişikliği not edin; aynı kapsamlı dönemlerde ölçülen tıklama, tıklama oranı ve sırayı Arama performansında karşılaştırın.",
    ],
  },
  page1: {
    label: "İlk sayfada, 4-10. sıra",
    action: "İçeriği güçlendirin",
    hint: "İlk sayfada ama ilk üçün altında. Bir basamak yükselmek (6-10'dan 4-5'e, 4-5'ten 2-3'e) tıklamayı belirgin artırır.",
    target: "bir basamak yukarı",
    shade: 76,
    todo: [
      "İçeriği, aşağıdaki aramalara rakiplerden daha eksiksiz yanıt verecek şekilde genişletin.",
      "Sitenizdeki ilgili sayfalardan bu sayfaya, aramayı anlatan bir bağlantı metniyle iç bağlantı verin.",
      "Başlıkta ve ilk paragrafta en çok kazandıracak aramayı açıkça geçirin.",
    ],
  },
  page2: {
    label: "2. sayfada, 11-20. sıra",
    action: "İç bağlantı verin, içeriği genişletin",
    hint: "İlk sayfanın hemen arkasında. İlk sayfaya çıkana kadar neredeyse hiç tıklanmaz.",
    target: "ilk sayfa, 6-10. sıra",
    shade: 54,
    todo: [
      "Sayfanın bu aramalar için gerçekten doğru sayfa olduğunu kontrol edin; değilse doğru sayfaya yönlendirin.",
      "Eksik alt başlıkları, örnekleri ve sık sorulan soruları ekleyin.",
      "Ana menüden ya da güçlü sayfalardan bu sayfaya iç bağlantı verin.",
    ],
  },
  deep: {
    label: "Derinde, 21. sıradan sonra",
    action: "Arama niyetini ve sayfanın kapsamını inceleyin",
    hint: "Gösterimler ölçüldü; düşük sıra tek başına sayfayı silmek veya birleştirmek için kanıt değildir.",
    target: "2. sayfa, 11-20. sıra",
    shade: 34,
    todo: [
      "Birleştirmeyi yalnızca sayfaların aynı ihtiyacı karşıladığını doğrularsanız değerlendirin.",
      "Sayfa bu konunun cevabıysa eksik bölümleri yazın ve iç bağlantı verin.",
      "Önceliği ölçülen sorgulara göre belirleyin; düşük tahmin tek başına içerik kaldırma gerekçesi değildir.",
    ],
  },
} as const satisfies Record<
  WorkKind,
  {
    label: string;
    action: string;
    hint: string;
    target: string;
    shade: number;
    todo: readonly string[];
  }
>;

export function workColor(_work: WorkKind): string {
  return "var(--color-primary)";
}

// Turkish, translated with t() where the chips render.
export const QUICK_COPY = {
  converts: "Dönüşüm getirenler",
  no_conversions: "Trafik var, dönüşüm yok",
} as const satisfies Record<QuickId, string>;

export function pathOf(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.host}${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
}

/** Why this page is on the list and what it is worth, in one sentence. */
export function explainRow(row: OpportunityRow): string {
  return t(
    "Ortalama {position}. sıra; {impressions} gösterim, {clicks} tıklama ölçüldü. Hesaplanabilen aramalarda 30 güne ölçekli en fazla +{gain} tıklama (üst sınır); gerçekleşme sözü değildir.",
    {
      position: formatDecimal(row.position),
      impressions: formatCount(row.impressions),
      clicks: formatCount(row.clicks),
      gain: formatCount(row.gainPerMonth),
    },
  );
}

/** The Analytics side of a row, worded; null when Analytics has no row for it. */
export function valueText(row: OpportunityRow): string | null {
  if (!row.ga4) return null;
  const sessions =
    row.ga4.sessions === null ? "–" : formatCount(row.ga4.sessions);
  switch (row.value) {
    case "converts":
      return t("{events} anahtar olay · dönüşen oturum oranı {rate}", {
        events:
          row.ga4.keyEvents === null ? "–" : formatCount(row.ga4.keyEvents),
        rate:
          row.ga4.sessionKeyEventRate === null
            ? "–"
            : formatPercent(row.ga4.sessionKeyEventRate),
      });
    case "no_conversions":
      return t("{sessions} oturum, hiç dönüşüm yok", { sessions });
    case "too_little_traffic":
      return t("{sessions} oturum; değerini söylemek için az", { sessions });
    default:
      return t("{sessions} oturum", { sessions });
  }
}

export function quickCounts(rows: OpportunityRow[]): Record<QuickId, number> {
  return {
    converts: rows.filter((row) => row.value === "converts").length,
    no_conversions: rows.filter((row) => row.value === "no_conversions").length,
  };
}

/**
 * Chips worth showing: one that holds nothing or holds every row narrows
 * nothing, and a chip reading "45" beside a list of 45 is noise.
 */
export function usefulChips(
  counts: Record<QuickId, number>,
  total: number,
): QuickId[] {
  const ids: QuickId[] = ["converts", "no_conversions"];
  return ids.filter((id) => counts[id] > 0 && counts[id] < total);
}

/**
 * Work bar and quick chip combine with AND. A bar selects every page with a
 * gain from that work, the same pages its count and sum are over.
 */
export function applyFilters(
  rows: OpportunityRow[],
  work: WorkKind | null,
  quick: QuickId | null,
): OpportunityRow[] {
  return rows.filter(
    (row) =>
      (work === null || row.gainByWork[work] > 0) &&
      (quick === null || row.value === quick),
  );
}

/** Monthly impressions, for the "demand" fact in the detail panel. */
export function monthlyImpressions(row: OpportunityRow, days: number): number {
  return perMonth(row.impressions, days);
}
