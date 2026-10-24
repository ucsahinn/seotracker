import { t } from "@/shared/i18n";
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

/**
 * The four kinds, cheapest work first. Copy lives here so the tiles, the ring
 * and the panel agree. It stays Turkish and goes through t() where it renders.
 */
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
  top: {
    label: "İlk sıralarda",
    hint: "Zaten ilk üçte; yükselecek yer az. Tıklama oranı düşükse başlığa ve açıklamaya bakın, değilse içeriği güncel tutmak yeterli.",
    color: "var(--color-success)",
    todo: [
      "İçeriği güncel tutun; tarih, fiyat ve örnekleri yılda en az bir kez gözden geçirin.",
      "Bu sayfadan öne çıkarmak istediğiniz diğer sayfalara iç bağlantı verin.",
      "Tıklama oranı beklediğinizden düşükse başlığı ve meta açıklamayı yeniden yazın.",
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
    hint: "20. sıranın gerisinde ama bu arama için bir talep var. Sayfayı genişletip genişletmeyeceğinize ya da başka bir sayfayla birleştirip birleştirmeyeceğinize karar verin.",
    color: "color-mix(in oklab, var(--color-base-content) 45%, transparent)",
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

export const KIND_ORDER: readonly KindId[] = [
  "ctr_gap",
  "near_miss",
  "top",
  "deep",
];

// Turkish, translated with t() where the chips render.
export const QUICK_COPY = {
  analytics: "Analytics'te karşılığı olanlar",
  no_analytics: "Analytics'te karşılığı yok",
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
      : ` ${t("Analytics'te aynı dönemde {sessions} oturum getirmiş.", {
          sessions: formatNumber(row.ga4.sessions),
        })}`;

  if (row.kind === "ctr_gap") {
    const ctr = formatPercent(row.ctr);
    const sentence =
      row.ctrGap === null
        ? t(
            "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}).",
            { position, impressions, clicks, ctr },
          )
        : t(
            "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}, sitenizde bu sıradaki sayfaların ortancasından {gap} yüzde puan daha düşük).",
            {
              position,
              impressions,
              clicks,
              ctr,
              gap: formatDecimal(Math.abs(row.ctrGap) * 100),
            },
          );
    return `${sentence}${ga4}`;
  }
  if (row.kind === "top") {
    // Without a baseline (small site) the click-through cannot be judged, so
    // do not call it normal; say what is known and what to check.
    const judged =
      row.ctrGap === null
        ? t(
            "Tıklama oranını ({ctr}) kıyaslayacak kadar veri yok; düşük görünüyorsa başlığı ve açıklamayı gözden geçirin.",
            { ctr: formatPercent(row.ctr) },
          )
        : t(
            "Tıklama oranı sitenizdeki benzer sıradaki sayfalarla uyumlu; içeriği ve başlığı güçlü tutmak yeterli.",
          );
    return `${t(
      "Ortalama {position}. sırada, yani zaten ilk sıralarda. {impressions} gösterimden {clicks} tıklama aldı.",
      { position, impressions, clicks },
    )} ${judged}${ga4}`;
  }
  if (row.kind === "near_miss") {
    return `${t(
      "Ortalama {position}. sırada; ilk sayfaya çok yakın. {impressions} gösterimden {clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.",
      { position, impressions, clicks },
    )}${ga4}`;
  }
  return `${t(
    "Ortalama {position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de {impressions} gösterim aldı. Bu sayfaya bir talep var.",
    { position, impressions },
  )}${ga4}`;
}

const PARTS = [
  { key: "demand", label: "Talep", weight: 50 },
  { key: "businessValue", label: "İş değeri", weight: 30 },
  { key: "reachability", label: "Yükselme kolaylığı", weight: 20 },
] as const;

function level(fraction: number): "high" | "medium" | "low" {
  if (fraction >= 0.66) return "high";
  if (fraction >= 0.33) return "medium";
  return "low";
}

const PART_SENTENCE = {
  demand: {
    high: "Bu sayfa için arama talebi yüksek.",
    medium: "Arama talebi orta.",
    low: "Arama talebi düşük.",
  },
  businessValue: {
    high: "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.",
    medium: "İş değeri orta.",
    low: "Ziyaretçilerin bu sayfada yaptığı işlem az.",
  },
  reachability: {
    high: "İlk sıralara çok yakın; emek çabuk karşılık verir.",
    medium: "İlk sıralara makul uzaklıkta.",
    low: "İlk sıralardan uzak; sonuç almak zaman alır.",
  },
} as const;

/** The score split in words. Null when the service could not score the row. */
export function scoreWords(components: OpportunityRow["scoreComponents"]) {
  if (components === null) return null;
  return PARTS.map((part) => {
    const fraction = components[part.key];
    return {
      key: part.key,
      label: t(part.label),
      max: part.weight,
      points: fraction * part.weight,
      sentence: t(PART_SENTENCE[part.key][level(fraction)]),
    };
  });
}

/** Rows Analytics has a record for. The complement of `lacksAnalyticsMatch`, so the two chips split the list. */
function hasAnalyticsTraffic(row: OpportunityRow): boolean {
  return row.ga4 !== null;
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
    label: t(KIND_COPY[id].label),
    color: KIND_COPY[id].color,
    value: rows
      .filter((row) => row.kind === id)
      .reduce((sum, row) => sum + row[metric], 0),
  }));
}
