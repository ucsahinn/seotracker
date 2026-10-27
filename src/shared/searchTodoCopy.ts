/**
 * The words for each Search performance finding: what it is, the evidence,
 * what to do. Shared by the screen and the printable report, so both say the
 * same thing about the same item.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { t } from "./i18n";
import type { TodoItem } from "./searchInsights";
import type { MetricChange } from "./searchPerformanceView";
import {
  formatCount,
  formatCountry,
  formatDate,
  formatDecimal,
  formatPercent,
  formatSignedPercent,
} from "./format";

/* Search Console's device names in the UI language; translated where shown. */
const DEVICE_NAME: Record<string, string> = {
  MOBILE: "Mobil",
  DESKTOP: "Bilgisayar",
  TABLET: "Tablet",
};

function deviceName(key: string): string {
  const name = DEVICE_NAME[key.toUpperCase()];
  return name ? t(name) : key;
}

/** A change worded for a tile: the text and whether it is good news. */
export type WordedDelta = {
  text: string;
  improved: boolean;
  /** Both periods exist and nothing moved: no arrow, no tint. */
  neutral?: true;
} | null;

/** Clicks and impressions: a relative change ("+6,1%"). */
export function countDelta(change: MetricChange | undefined): WordedDelta {
  if (!change || change.change === null) return null;
  if (change.relative === null) {
    // Nothing the period before: the bare count, not an infinite percentage.
    if (change.change === 0) return null;
    return {
      text: `${change.change > 0 ? "+" : "-"}${formatCount(Math.abs(change.change))}`,
      improved: change.change > 0,
    };
  }
  const text = formatSignedPercent(change.relative);
  return text === null ? null : { text, improved: change.relative > 0 };
}

/** A position move between two periods, in places, with its direction in words. */
export function positionMove(
  previous: number | null,
  current: number | null,
): string | null {
  if (previous === null || current === null) return null;
  const places = previous - current;
  if (formatDecimal(Math.abs(places)) === formatDecimal(0)) return null;
  return places > 0
    ? t("↑{value} sıra", { value: formatDecimal(places) })
    : t("↓{value} sıra", { value: formatDecimal(-places) });
}

/**
 * An estimated gain: approximate, so it carries "≈" and a thin space. "~+"
 * read as a typo or a minus sign.
 */
export function gainText(clicks: number): string {
  return t("≈ +{count} tıklama", { count: Math.round(clicks) });
}

export type TodoTarget =
  | { kind: "drill"; dimension: "query" | "page"; key: string }
  | { kind: "device"; device: string }
  | { kind: "country"; country: string }
  | { kind: "brand" }
  | null;

type TodoCopy = {
  title: string;
  evidence: string;
  action: string;
  /** The page a query should rank with, or the page the item is about. */
  page: string | null;
  target: TodoTarget;
};

/* Plain path for a page address, so a title is readable on a phone. */
export function shortPage(url: string): string {
  try {
    const parsed = new URL(url);
    const path = decodeURIComponent(parsed.pathname);
    return path === "/" ? parsed.hostname : `${path}${parsed.search}`;
  } catch {
    return url;
  }
}

export function describeTodo(item: TodoItem): TodoCopy {
  switch (item.kind) {
    case "striking":
      return {
        title: t("“{query}” için bir basamak yükselme fırsatı", {
          query: item.query,
        }),
        evidence: t(
          "Sıra {position} · {impressions} gösterim · {clicks} tıklama",
          {
            position: formatDecimal(item.position),
            impressions: formatCount(item.impressions),
            clicks: formatCount(item.clicks),
          },
        ),
        action: t(
          "Hedef sayfayı bu sorguya göre güçlendirin: başlıkta ve ilk paragrafta sorgunun cevabını verin, ilgili sayfalarınızdan bu sayfaya bağlantı ekleyin.",
        ),
        page: item.page,
        target: { kind: "drill", dimension: "query", key: item.query },
      };
    case "snippet":
      return {
        title: t("“{query}” görülüyor ama az tıklanıyor", {
          query: item.query,
        }),
        evidence: t(
          "Tıklama oranı {ctr}; sitenizde bu sıradaki sonuçların oranı {expected} · sıra {position} · {impressions} gösterim",
          {
            ctr: formatPercent(item.ctr),
            expected: formatPercent(item.expectedCtr),
            position: formatDecimal(item.position),
            impressions: formatCount(item.impressions),
          },
        ),
        action: t(
          "Sayfa başlığını ve açıklamasını aramadaki niyete göre yeniden yazın: sorgunun kelimelerini kullanın, bir sayı, yıl ya da açık bir fayda ekleyin.",
        ),
        page: item.page,
        target: { kind: "drill", dimension: "query", key: item.query },
      };
    case "decliningQuery":
    case "decliningPage": {
      const isQuery = item.kind === "decliningQuery";
      const fell =
        item.position !== null &&
        item.previousPosition !== null &&
        item.position - item.previousPosition >= 1;
      const move = positionMove(item.previousPosition, item.position);
      return {
        title: isQuery
          ? t("“{query}” sorgusundan gelen tıklamalar düştü", {
              query: item.key,
            })
          : t("{page} sayfasının tıklamaları düştü", {
              page: shortPage(item.key),
            }),
        evidence: [
          t("{previous} → {current} tıklama", {
            previous: formatCount(item.previousClicks),
            current: formatCount(item.clicks),
          }),
          move,
        ]
          .filter(Boolean)
          .join(" · "),
        action: fell
          ? t(
              "Sıra da düştü: içeriği güncelleyin, aramadaki sorulara bugünkü cevabı verin ve sayfaya iç bağlantıları artırın.",
            )
          : t(
              "Sıra yerinde, tıklama düştü: talep azalmış ya da sonuç sayfasına yeni bir öğe gelmiş olabilir. Başlığı ve açıklamayı gözden geçirin.",
            ),
        page: isQuery ? null : item.key,
        target: {
          kind: "drill",
          dimension: isQuery ? "query" : "page",
          key: item.key,
        },
      };
    }
    case "decay":
      return {
        title: t("{page} eski gücünü kaybediyor", {
          page: shortPage(item.page),
        }),
        evidence: t(
          "Son çeyrekte {clicks} tıklama; en iyi çeyreği {peak} tıklama ({start} – {end})",
          {
            clicks: formatCount(item.clicks),
            peak: formatCount(item.peakClicks),
            start: formatDate(item.peakStartDate),
            end: formatDate(item.peakEndDate),
          },
        ),
        action: t(
          "Sayfayı tazeleyin: eskiyen bilgileri düzeltin, yeni çıkan soruları ekleyin ve güncellediğiniz tarihi sayfada gösterin.",
        ),
        page: item.page,
        target: { kind: "drill", dimension: "page", key: item.page },
      };
    case "zeroClickPage":
      return {
        title: t("{page} görünüyor ama hiç tıklanmıyor", {
          page: shortPage(item.page),
        }),
        evidence: t("{impressions} gösterim, 0 tıklama · sıra {position}", {
          impressions: formatCount(item.impressions),
          position: formatDecimal(item.position),
        }),
        action:
          item.position > 10
            ? t(
                "İkinci sayfadan sonrasında görünüyor: önce sırasını yükseltin; içeriği derinleştirin ve diğer sayfalarınızdan bağlantı verin.",
              )
            : t(
                "İlk sayfada olduğu hâlde tıklanmıyor: başlık ve açıklama aramayla örtüşmüyor olabilir, yeniden yazın.",
              ),
        page: item.page,
        target: { kind: "drill", dimension: "page", key: item.page },
      };
    case "lostQuery":
      return {
        title: t("“{query}” sorgusunda artık görünmüyorsunuz", {
          query: item.query,
        }),
        evidence: t(
          "Önceki dönemde {clicks} tıklama, {impressions} gösterim; bu dönemde gösterim yok",
          {
            clicks: formatCount(item.previousClicks),
            impressions: formatCount(item.previousImpressions),
          },
        ),
        action: t(
          "Bu sorguyu karşılayan sayfa hâlâ yayında ve dizinde mi bakın; içerik değiştiyse sorgunun cevabını sayfaya geri ekleyin.",
        ),
        page: null,
        target: { kind: "drill", dimension: "query", key: item.query },
      };
    case "deviceGap":
    case "countryGap": {
      const isDevice = item.kind === "deviceGap";
      const name = isDevice ? deviceName(item.key) : formatCountry(item.key);
      const parts = [
        item.ctr !== null && item.siteCtr !== null
          ? t("Tıklama oranı {ctr} (site geneli {site})", {
              ctr: formatPercent(item.ctr),
              site: formatPercent(item.siteCtr),
            })
          : null,
        item.position !== null && item.sitePosition !== null
          ? t("sıra {position} (site geneli {site})", {
              position: formatDecimal(item.position),
              site: formatDecimal(item.sitePosition),
            })
          : null,
        t("{impressions} gösterim", {
          impressions: formatCount(item.impressions),
        }),
      ];
      return {
        title: isDevice
          ? t("{device} aramalarında geride kalıyorsunuz", { device: name })
          : t("{country} aramalarında geride kalıyorsunuz", { country: name }),
        evidence: parts.filter(Boolean).join(" · "),
        action: isDevice
          ? t(
              "Sayfalarınızı bu cihazda açıp okunurluğu ve hızı kontrol edin; Site denetimi'ndeki hız sonuçları nereden başlanacağını gösterir.",
            )
          : t(
              "Bu ülkedeki aramalara uygun dilde ve içerikte sayfanız var mı bakın; çok dilli bir siteyse hreflang ayarlarını gözden geçirin.",
            ),
        page: null,
        target: isDevice
          ? { kind: "device", device: item.key }
          : { kind: "country", country: item.key },
      };
    }
    case "anomaly":
      return {
        title:
          item.metric === "clicks"
            ? t("{date} günü tıklamalarda olağan dışı düşüş", {
                date: formatDate(item.date),
              })
            : t("{date} günü gösterimlerde olağan dışı düşüş", {
                date: formatDate(item.date),
              }),
        evidence: t(
          "{value}; önceki haftaların aynı gününde ortası {expected}",
          {
            value: formatCount(item.value),
            expected: formatCount(Math.round(item.expected)),
          },
        ),
        action: t(
          "O gün sitede bir değişiklik, kesinti ya da Google güncellemesi oldu mu bakın; grafikteki işaretler yardımcı olur.",
        ),
        page: null,
        target: null,
      };
    case "setBrandTerms":
      if (item.suggestions.length > 0) {
        return {
          title: t("Marka adını onayla"),
          evidence: t(
            "Marka aramaları şimdilik alan adından önerilen adlarla ayrılıyor: {terms}. Onaylanana kadar bu ayrım bir tahmin.",
            { terms: item.suggestions.join(", ") },
          ),
          action: t(
            "Önerilen adlar doğruysa onaylayın; değilse markanızın adını ve yazılışlarını girin.",
          ),
          page: null,
          target: { kind: "brand" },
        };
      }
      return {
        title: t("Marka adınızı tanımlayın"),
        evidence: t(
          "Marka sorguları ayrılmadan sitenin tıklama oranı beklentisi şişer ve fırsatlar eksik çıkar.",
        ),
        action: t(
          "Marka adınızı ve yazılışlarını ekleyin; marka ve marka dışı aramalar ayrı ölçülür.",
        ),
        page: null,
        target: { kind: "brand" },
      };
  }
}

/** Confidence in words; a chip never carries meaning in colour alone. */
export const CONFIDENCE_LABEL = {
  high: "Güven: yüksek",
  medium: "Güven: orta",
  low: "Güven: düşük",
} as const;

/**
 * The gain of the first few to-dos, with work on the same query or page
 * counted once (a striking-distance and a snippet item for one query are two
 * ways to win the same clicks).
 */
export function combinedGain(items: readonly TodoItem[]): number | null {
  const best = new Map<string, number>();
  for (const item of items) {
    if (item.estimatedClicks === null || item.estimatedClicks <= 0) continue;
    const key = todoSubject(item);
    best.set(key, Math.max(best.get(key) ?? 0, item.estimatedClicks));
  }
  if (best.size === 0) return null;
  return [...best.values()].reduce((sum, value) => sum + value, 0);
}

function todoSubject(item: TodoItem): string {
  switch (item.kind) {
    case "striking":
    case "snippet":
    case "lostQuery":
      return `q:${item.query}`;
    case "decliningQuery":
      return `q:${item.key}`;
    case "decliningPage":
      return `p:${item.key}`;
    case "decay":
    case "zeroClickPage":
      return `p:${item.page}`;
    default:
      return item.id;
  }
}

/**
 * The heading over one kind of to-do: "9 sorgu ilk üçe yakın". The list
 * groups by kind, so the explanation is said once per group instead of once
 * per row.
 */
export function todoGroupTitle(kind: TodoItem["kind"], count: number): string {
  switch (kind) {
    case "striking":
      return t("{count} sorgu ilk üçe yakın", { count });
    case "snippet":
      return t("{count} sonuç sırasına göre az tıklanıyor", { count });
    case "decliningQuery":
      return t("{count} sorgudan gelen tıklama düştü", { count });
    case "decliningPage":
      return t("{count} sayfanın tıklaması düştü", { count });
    case "decay":
      return t("{count} sayfa eski gücünü kaybediyor", { count });
    case "zeroClickPage":
      return t("{count} sayfa görünüyor ama hiç tıklanmıyor", { count });
    case "lostQuery":
      return t("{count} sorguda artık görünmüyorsunuz", { count });
    case "deviceGap":
      return t("{count} cihazda geride kalıyorsunuz", { count });
    case "countryGap":
      return t("{count} ülkede geride kalıyorsunuz", { count });
    case "anomaly":
      return t("{count} günde olağan dışı düşüş", { count });
    case "setBrandTerms":
      return t("Marka adınızı tanımlayın");
  }
}

/** What one to-do is about, as a compact row names it: the query, the page, the segment. */
export function todoSubjectLabel(item: TodoItem): string {
  switch (item.kind) {
    case "striking":
    case "snippet":
    case "lostQuery":
      return item.query;
    case "decliningQuery":
      return item.key;
    case "decliningPage":
      return shortPage(item.key);
    case "decay":
    case "zeroClickPage":
      return shortPage(item.page);
    case "deviceGap":
      return deviceName(item.key);
    case "countryGap":
      return formatCountry(item.key);
    case "anomaly":
      return item.metric === "clicks"
        ? t("{date}: tıklama", { date: formatDate(item.date) })
        : t("{date}: gösterim", { date: formatDate(item.date) });
    case "setBrandTerms":
      return item.suggestions.length > 0
        ? t("Marka adını onayla")
        : t("Marka adınızı tanımlayın");
  }
}
