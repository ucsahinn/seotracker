import { sort } from "remeda";
import { formatCount, formatDecimal } from "@/shared/format";
import { t } from "@/shared/i18n";
import {
  barChart,
  chartSummary,
  COLORS,
  columnChart,
  figure,
  stackedBars,
} from "./reportCharts";
import {
  capList,
  escapeHtml,
  moreLine,
  pagesText,
  percent,
  percentText,
  truncate,
  truncateUrl,
} from "./reportFormat";
import { LIGHTHOUSE_CHECKS_PER_PAGE } from "@/shared/audit-limits";
import { lighthouseBand } from "@/shared/lighthouse";
import { describeLighthouse } from "./reportModel";
import type { AuditReportInput, ReportLighthouse } from "./reportTypes";

/* Turkish source text, shown through t(). */
const BAND_LABEL = { good: "İyi", fair: "Orta", poor: "Zayıf" };
const BAND_WORD = { good: "iyi", fair: "orta", poor: "zayıf" };
const BAND_COLOR = {
  good: COLORS.good,
  fair: COLORS.warning,
  poor: COLORS.critical,
};

type Metric = "lcpMs" | "cls" | "inpMs";

/*
 * Google's published Core Web Vitals thresholds: "good" up to the first
 * number, "poor" beyond the second. The report labels with them so the word
 * matches what PageSpeed Insights would print.
 */
const THRESHOLDS: Record<Metric, { good: number; poor: number }> = {
  lcpMs: { good: 2500, poor: 4000 },
  cls: { good: 0.1, poor: 0.25 },
  inpMs: { good: 200, poor: 500 },
};

function formatMetric(metric: Metric, value: number | null | undefined) {
  if (value === null || value === undefined) return "--";
  const band = t(
    BAND_WORD[
      value <= THRESHOLDS[metric].good
        ? "good"
        : value <= THRESHOLDS[metric].poor
          ? "fair"
          : "poor"
    ],
  );
  const text =
    metric === "cls" ? formatDecimal(value, 2) : `${formatCount(value)} ms`;
  return `${text} (${band})`;
}

function scoreCell(score: number | null | undefined): string {
  if (score === null || score === undefined) return "--";
  return `${formatCount(score)} (${t(BAND_LABEL[lighthouseBand(score)])})`;
}

function average(values: Array<number | null | undefined>): number | null {
  const present = values.filter((v): v is number => typeof v === "number");
  if (present.length === 0) return null;
  return Math.round(present.reduce((s, v) => s + v, 0) / present.length);
}

function worstList(
  rows: Array<ReportLighthouse & { url: string }>,
  metric: Metric,
  label: string,
): string {
  const worst = sort(
    rows.filter((r) => r[metric] !== null && r[metric] !== undefined),
    (a, b) => (b[metric] ?? 0) - (a[metric] ?? 0),
  ).slice(0, 5);
  if (worst.length === 0) {
    return `<div><h4>${label}</h4><p class="note">${t("Bu metrik ölçülmedi.")}</p></div>`;
  }
  return `<div><h4>${t("{metric}: en kötü 5", { metric: label })}</h4><table class="rows"><tbody>${worst
    .map(
      (r) =>
        `<tr><td class="url">${escapeHtml(truncateUrl(r.url, 70))}</td><td class="num">${escapeHtml(formatMetric(metric, r[metric]))}</td></tr>`,
    )
    .join("")}</tbody></table></div>`;
}

/* Turkish source text, shown through t(). */
const VITAL_INFO: Array<{ metric: Metric; name: string; plain: string }> = [
  {
    metric: "lcpMs",
    name: "LCP (en büyük içerik)",
    plain:
      "Sayfanın ana görselinin ya da başlığının ekranda belirmesi ne kadar sürdü. 2,5 saniye altı iyi.",
  },
  {
    metric: "cls",
    name: "CLS (görsel kayma)",
    plain:
      "Sayfa yüklenirken içerik ne kadar yer değiştirdi; yanlış tıklamaya yol açan kayma. 0,1 altı iyi.",
  },
  {
    metric: "inpMs",
    name: "INP (tepki süresi)",
    plain:
      "Bir tıklamaya ya da dokunmaya sayfa ne kadar çabuk karşılık verdi. 200 ms altı iyi.",
  },
];

/** Good / needs-work / poor counts per vital, as one stacked bar each. */
function vitalsChart(rows: Array<ReportLighthouse>): string {
  const bars = VITAL_INFO.flatMap(({ metric, name }) => {
    const values = rows.flatMap((r) => {
      const v = r[metric];
      return typeof v === "number" ? [v] : [];
    });
    if (values.length === 0) return [];
    const limit = THRESHOLDS[metric];
    return [
      {
        // The abbreviation before the gloss: "LCP (en büyük içerik)" -> "LCP".
        label: name.split(" ")[0],
        parts: [
          {
            value: values.filter((v) => v <= limit.good).length,
            color: COLORS.good,
            tag: t("İ"),
          },
          {
            value: values.filter((v) => v > limit.good && v <= limit.poor)
              .length,
            color: COLORS.warning,
            tag: t("O"),
          },
          {
            value: values.filter((v) => v > limit.poor).length,
            color: COLORS.critical,
            tag: t("Z"),
          },
        ],
      },
    ];
  });
  if (bars.length === 0) return "";
  const caption = `${bars
    .map(
      (b) =>
        `${b.label}: ${b.parts.map((p, i) => `${formatCount(p.value)} ${t([BAND_WORD.good, BAND_WORD.fair, BAND_WORD.poor][i])}`).join(", ")}`,
    )
    .join(
      "; ",
    )}. ${t("İ iyi, O orta, Z zayıf; her sayfa yalnızca ölçülen metrikte sayılır.")}`;
  return figure(
    t("Temel Web Verileri: sayfaların dağılımı (mobil)"),
    stackedBars(bars),
    caption,
    t("Her metrik için iyi, orta ve zayıf sayfa sayısı"),
  );
}

export function speedSection(
  input: AuditReportInput,
  tableCap: number,
): string {
  const summary = describeLighthouse(input.lighthouse);
  if (!summary) {
    return `<section id="hiz">
      <h2>${t("5. Hız ölçümü")}</h2>
      <p class="empty">${input.lighthouseMode === "none" ? t("Bu denetimde hız ölçümü kapalıydı, bu yüzden sayfa hızı hakkında bir şey söylenmiyor.") : t("Bu denetimde kayıtlı Lighthouse sonucu yok: hız ölçümü kapalıydı ya da ölçümler tamamlanamadı (ör. ölçüm servisi istek sınırına takıldı). Hız ölçülmediği için bu rapor hız hakkında bir şey söylemez.")}</p>
    </section>`;
  }

  const urlById = new Map(
    input.pages.flatMap((p) => (p.id ? [[p.id, p.url] as const] : [])),
  );
  const withUrl = input.lighthouse.map((row) => ({
    ...row,
    url: (row.pageId && urlById.get(row.pageId)) || t("(adres bulunamadı)"),
  }));
  const mobile = withUrl.filter((r) => r.strategy === "mobile");
  const desktopByPage = new Map(
    withUrl
      .filter((r) => r.strategy === "desktop")
      .map((r) => [r.pageId ?? r.url, r]),
  );
  const failed = withUrl.filter((r) => r.errorMessage).length;
  const plannedPages =
    typeof input.lighthouseTotal === "number"
      ? Math.ceil(input.lighthouseTotal / LIGHTHOUSE_CHECKS_PER_PAGE)
      : 0;
  const partial = plannedPages > summary.measured;

  const bands = [
    { label: t("İyi (90-100)"), value: summary.good, color: BAND_COLOR.good },
    { label: t("Orta (50-89)"), value: summary.fair, color: BAND_COLOR.fair },
    { label: t("Zayıf (0-49)"), value: summary.poor, color: BAND_COLOR.poor },
  ];

  const categories: Array<
    [string, (r: ReportLighthouse) => number | null | undefined]
  > = [
    [t("Performans"), (r) => r.performanceScore],
    [t("Erişilebilirlik"), (r) => r.accessibilityScore],
    [t("En iyi uygulamalar"), (r) => r.bestPracticesScore],
    ["SEO", (r) => r.seoScore],
  ];
  const catData = categories.flatMap(([label, pick]) => {
    const value = average(mobile.map(pick));
    return value === null
      ? []
      : [
          {
            label: t("{category} (mobil ort.)", { category: label }),
            value,
            color: COLORS.accent,
          },
        ];
  });

  const ordered = sort(
    mobile,
    (a, b) => (a.performanceScore ?? 101) - (b.performanceScore ?? 101),
  );
  const { shown, hidden } = capList(ordered, tableCap);
  const table = `<table class="rows">
    <thead><tr><th>${t("Adres")}</th><th>${t("Mobil puan")}</th><th>${t("Masaüstü puan")}</th><th>LCP</th><th>CLS</th><th>INP</th></tr></thead>
    <tbody>${shown
      .map((r) => {
        const desktop = desktopByPage.get(r.pageId ?? r.url);
        return `<tr>
        <td class="url">${escapeHtml(truncateUrl(r.url, 80))}${r.errorMessage ? `<br><span class="detail">${escapeHtml(t("Ölçüm hatası: {error}", { error: truncate(r.errorMessage, 120) }))}</span>` : ""}</td>
        <td class="num">${escapeHtml(scoreCell(r.performanceScore))}</td>
        <td class="num">${escapeHtml(scoreCell(desktop?.performanceScore))}</td>
        <td class="num">${escapeHtml(formatMetric("lcpMs", r.lcpMs))}</td>
        <td class="num">${escapeHtml(formatMetric("cls", r.cls))}</td>
        <td class="num">${escapeHtml(formatMetric("inpMs", r.inpMs))}</td>
      </tr>`;
      })
      .join("")}</tbody>
  </table>`;

  const measured = t("{count} sayfa mobilde ölçüldü", {
    count: summary.measured,
  });
  const share =
    input.pagesCrawled > 0
      ? t(" (taranan {count} sayfanın {percent}'i)", {
          count: input.pagesCrawled,
          percent: percentText(percent(summary.measured, input.pagesCrawled)),
        })
      : "";
  const failedText =
    failed > 0 ? t("; {count} ölçüm hata verdi", { count: failed }) : "";
  const measuredLine = t(
    '<strong>{measured}</strong>{share}{failed}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.',
    { measured, share, failed: failedText },
  );
  const partialLine = t(
    "{planned} sayfanın ölçülmesi planlandı, {measured} tanesi puan verdi{failed}. Aşağıdaki dağılım yalnızca ölçülen sayfaları yansıtır; ölçülmeyenler iyi ya da kötü sayılmadı.",
    {
      planned: formatCount(plannedPages),
      measured: formatCount(summary.measured),
      failed:
        failed > 0
          ? t(
              "; kalanlar hata verdi ya da ölçüm servisinin istek sınırına takılmış olabilir",
            )
          : "",
    },
  );

  return `<section id="hiz">
    <h2>${t("5. Hız ölçümü")}</h2>
    <p class="note">${measuredLine}</p>
    ${partial ? `<div class="callout callout--warn"><p><strong>${t("Ölçüm kısmi.")}</strong> ${partialLine}</p></div>` : ""}
    <div>
      ${figure(t("Mobil performans puanı dağılımı"), columnChart(summary.histogram), chartSummary(summary.histogram, pagesText), t("Lighthouse performans puanı histogramı"))}
      ${figure(t("Puan bandı"), barChart(bands), chartSummary(bands, pagesText), t("İyi, orta, zayıf sayfa sayısı"))}
    </div>
    ${vitalsChart(mobile)}
    <dl class="vitals">${VITAL_INFO.map((v) => `<div><dt>${escapeHtml(t(v.name))}</dt><dd>${escapeHtml(t(v.plain))}</dd></div>`).join("")}</dl>
    ${catData.length > 0 ? figure(t("Lighthouse kategorileri"), barChart(catData), chartSummary(catData), t("Kategori başına mobil ortalama puan")) : ""}
    <h3>${t("Sayfa sayfa sonuçlar")}</h3>
    <p class="note">${t("Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.")}</p>
    ${table}
    ${moreLine(hidden, "page")}
    <div class="grid3">
      ${worstList(mobile, "lcpMs", "LCP")}
      ${worstList(mobile, "cls", "CLS")}
      ${worstList(mobile, "inpMs", "INP")}
    </div>
    <div class="callout">
      <p>${t("<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.")}</p>
      <p>${t('Eşikler Google\'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).')}</p>
    </div>
  </section>`;
}
