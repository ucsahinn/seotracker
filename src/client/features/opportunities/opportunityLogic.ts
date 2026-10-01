import { filter, firstBy, sort } from "remeda";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";

export type OpportunityRow = OpportunityReport["rows"][number];
export type KindId = OpportunityRow["kind"];
export type QuickId = "analytics" | "no_analytics" | "top_impressions";

/** The three kinds, cheapest work first. Copy lives here so the tiles, the ring and the panel agree. */
export const KIND_COPY = {
  ctr_gap: {
    label: "Az tıklanan",
    hint: "Sıralaması iyi ama tıklama oranı, sitenizdeki benzer sıralı sayfaların altında. Başlığı ve açıklamayı yeniden yazmaya değer.",
    color: "var(--color-primary)",
    todo: [
      "Başlığı, kullanıcının aradığı şeyi ilk kelimelerde karşılayacak biçimde yeniden yazın.",
      "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.",
      "Yayına aldıktan iki hafta sonra bu ekrana dönüp tıklama oranına bakın.",
    ],
  },
  near_miss: {
    label: "Yükselmeye yakın",
    hint: "İlk sayfaya çok yakın ya da hemen üstünde. Küçük bir iyileştirme sıra kazandırabilir.",
    color: "var(--color-warning)",
    todo: [
      "İçeriği, bu sayfanın öne çıktığı aramalara daha eksiksiz yanıt verecek şekilde güçlendirin.",
      "Sitenizdeki ilgili sayfalardan, doğal bir bağlam içinde bu sayfaya iç bağlantı verin.",
      "Başlıkta ve ilk paragrafta hedef aramayı açıkça geçirin.",
    ],
  },
  deep: {
    label: "Derinde kalan",
    hint: "20. sıranın gerisinde ama aramaya karşılık gelen bir talep var. Genişletme ya da birleştirme kararı gerekir.",
    color: "var(--color-info)",
    todo: [
      "Sayfa gerçekten bu konunun cevabı mı? Değilse hangi bölümler eksik, yazın.",
      "Aynı konuya değinen başka sayfanız varsa birleştirmeyi ve yönlendirme kurmayı düşünün.",
      "Genişletmeye değmiyorsa sayfayı bırakın; emeği daha yakın fırsatlara harcayın.",
    ],
  },
} as const satisfies Record<
  KindId,
  { label: string; hint: string; color: string; todo: readonly string[] }
>;

export const KIND_ORDER: readonly KindId[] = ["ctr_gap", "near_miss", "deep"];

export const QUICK_COPY = {
  analytics: "Analytics'te trafiği olanlar",
  no_analytics: "Analytics eşleşmesi yok",
  top_impressions: "En çok gösterim alan 10",
} as const satisfies Record<QuickId, string>;

export function pathOf(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

/** Why this page is on the list, in one sentence a non-specialist can act on. */
export function explainRow(row: OpportunityRow): string {
  const position = formatDecimal(row.position);
  const impressions = formatNumber(row.impressions);
  const clicks = formatNumber(row.clicks);
  const ga4 =
    row.ga4 === null
      ? ""
      : ` Analytics'te aynı dönemde ${formatNumber(row.ga4.sessions)} oturum getirmiş.`;

  if (row.kind === "ctr_gap") {
    const gap =
      row.ctrGap === null
        ? ""
        : `, sitenizde bu sıradaki sayfaların medyanından ${formatDecimal(Math.abs(row.ctrGap) * 100)} yüzde puan daha düşük`;
    return `Ortalama ${position}. sırada ${impressions} kez gösterildi ama yalnızca ${clicks} tıklama aldı (tıklama oranı ${formatPercent(row.ctr)}${gap}).${ga4}`;
  }
  if (row.kind === "near_miss" && row.position < 4) {
    return `Ortalama ${position}. sırada, yani zaten ilk sıralarda. ${impressions} gösterimden ${clicks} tıklama aldı; sıra kazanmaktan çok içeriği ve başlığı güçlü tutmak önemli.${ga4}`;
  }
  if (row.kind === "near_miss") {
    return `Ortalama ${position}. sırada; ilk sayfaya çok yakın. ${impressions} gösterimden ${clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.${ga4}`;
  }
  return `Ortalama ${position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de ${impressions} gösterim aldı. Bu sayfaya bir talep var.${ga4}`;
}

const PARTS = [
  { key: "demand", label: "Talep", weight: 50 },
  { key: "businessValue", label: "İş değeri", weight: 30 },
  { key: "reachability", label: "Yükselme kolaylığı", weight: 20 },
] as const;

function level(fraction: number): "yüksek" | "orta" | "düşük" {
  if (fraction >= 0.66) return "yüksek";
  if (fraction >= 0.33) return "orta";
  return "düşük";
}

const PART_SENTENCE = {
  demand: {
    yüksek: "Bu sayfa için arama talebi yüksek.",
    orta: "Arama talebi orta düzeyde.",
    düşük: "Arama talebi düşük.",
  },
  businessValue: {
    yüksek: "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.",
    orta: "İş değeri orta düzeyde.",
    düşük: "Ziyaretçilerin bu sayfada yaptığı işlem az.",
  },
  reachability: {
    yüksek: "İlk sıralara çok yakın; emek çabuk karşılık verir.",
    orta: "İlk sıralara makul uzaklıkta.",
    düşük: "İlk sıralardan uzak; sonuç almak zaman alır.",
  },
} as const;

/** The score split in words. Null when the service could not score the row. */
export function scoreWords(components: OpportunityRow["scoreComponents"]) {
  if (components === null) return null;
  return PARTS.map((part) => {
    const fraction = components[part.key];
    return {
      key: part.key,
      label: part.label,
      max: part.weight,
      points: fraction * part.weight,
      sentence: PART_SENTENCE[part.key][level(fraction)],
    };
  });
}

/** Rows that Analytics also saw traffic for. */
function hasAnalyticsTraffic(row: OpportunityRow): boolean {
  return row.ga4 !== null && row.ga4.sessions > 0;
}

/** Rows Search Console saw but Analytics has no record of (scored on Search Console data alone). */
function lacksAnalyticsMatch(row: OpportunityRow): boolean {
  return row.ga4 === null;
}

/** The row with the highest score, or null for an empty list. */
export function topOpportunity(rows: OpportunityRow[]): OpportunityRow | null {
  const scored = filter(rows, (row) => row.score !== null);
  return firstBy(scored, [(row) => row.score ?? 0, "desc"]) ?? null;
}

/** Page ids of the ten most-shown rows across the WHOLE set, so a kind filter cannot change what "top 10" means. */
function topImpressionPages(rows: OpportunityRow[]): Set<string> {
  const ranked = sort(rows, (a, b) => b.impressions - a.impressions);
  return new Set(ranked.slice(0, 10).map((row) => row.page));
}

export function quickCounts(rows: OpportunityRow[]): Record<QuickId, number> {
  return {
    analytics: filter(rows, hasAnalyticsTraffic).length,
    no_analytics: filter(rows, lacksAnalyticsMatch).length,
    top_impressions: Math.min(10, rows.length),
  };
}

/** Kind tile and quick chip combine with AND; both read the whole set. */
export function applyFilters(
  rows: OpportunityRow[],
  kind: KindId | null,
  quick: QuickId | null,
): OpportunityRow[] {
  const top = quick === "top_impressions" ? topImpressionPages(rows) : null;
  return rows.filter(
    (row) =>
      (kind === null || row.kind === kind) &&
      (quick !== "analytics" || hasAnalyticsTraffic(row)) &&
      (quick !== "no_analytics" || lacksAnalyticsMatch(row)) &&
      (top === null || top.has(row.page)),
  );
}

export type Metric = "impressions" | "clicks";

/** Per-kind totals for the ring. */
export function kindTotals(rows: OpportunityRow[], metric: Metric) {
  return KIND_ORDER.map((id) => ({
    key: id,
    label: KIND_COPY[id].label,
    color: KIND_COPY[id].color,
    value: rows
      .filter((row) => row.kind === id)
      .reduce((sum, row) => sum + row[metric], 0),
  }));
}
