import { sort } from "remeda";
import { formatCount, formatDecimal } from "@/shared/format";
import {
  barChart,
  chartSummary,
  COLORS,
  columnChart,
  figure,
} from "./reportCharts";
import { capList, escapeHtml, moreLine, truncate } from "./reportFormat";
import { lighthouseBand } from "@/shared/lighthouse";
import { describeLighthouse } from "./reportModel";
import type { AuditReportInput, ReportLighthouse } from "./reportTypes";

/** Pages listed in the per-page speed table. */
const SPEED_TABLE_CAP = 50;

const BAND_LABEL = { good: "İyi", fair: "Orta", poor: "Zayıf" };
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
  const band =
    value <= THRESHOLDS[metric].good
      ? "iyi"
      : value <= THRESHOLDS[metric].poor
        ? "orta"
        : "zayıf";
  const text =
    metric === "cls" ? formatDecimal(value, 2) : `${formatCount(value)} ms`;
  return `${text} (${band})`;
}

function scoreCell(score: number | null | undefined): string {
  if (score === null || score === undefined) return "--";
  return `${formatCount(score)} (${BAND_LABEL[lighthouseBand(score)]})`;
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
    return `<div><h4>${label}</h4><p class="note">Bu metrik ölçülmedi.</p></div>`;
  }
  return `<div><h4>${label}: en kötü 5</h4><table class="rows"><tbody>${worst
    .map(
      (r) =>
        `<tr><td class="url">${escapeHtml(truncate(r.url, 70))}</td><td class="num">${escapeHtml(formatMetric(metric, r[metric]))}</td></tr>`,
    )
    .join("")}</tbody></table></div>`;
}

export function speedSection(input: AuditReportInput): string {
  const summary = describeLighthouse(input.lighthouse);
  if (!summary) {
    return `<section id="hiz">
      <h2>3. Hız ölçümü</h2>
      <p class="empty">Bu denetimde kayıtlı Lighthouse sonucu yok; ya hız ölçümü kapalıydı ya da ölçümler tamamlanamadı.</p>
    </section>`;
  }

  const urlById = new Map(
    input.pages.flatMap((p) => (p.id ? [[p.id, p.url] as const] : [])),
  );
  const withUrl = input.lighthouse.map((row) => ({
    ...row,
    url: (row.pageId && urlById.get(row.pageId)) || "(adres bulunamadı)",
  }));
  const mobile = withUrl.filter((r) => r.strategy === "mobile");
  const desktopByPage = new Map(
    withUrl
      .filter((r) => r.strategy === "desktop")
      .map((r) => [r.pageId ?? r.url, r]),
  );
  const failed = withUrl.filter((r) => r.errorMessage).length;

  const bands = [
    { label: "İyi (90-100)", value: summary.good, color: BAND_COLOR.good },
    { label: "Orta (50-89)", value: summary.fair, color: BAND_COLOR.fair },
    { label: "Zayıf (0-49)", value: summary.poor, color: BAND_COLOR.poor },
  ];

  const categories: Array<
    [string, (r: ReportLighthouse) => number | null | undefined]
  > = [
    ["Performans", (r) => r.performanceScore],
    ["Erişilebilirlik", (r) => r.accessibilityScore],
    ["En iyi uygulamalar", (r) => r.bestPracticesScore],
    ["SEO", (r) => r.seoScore],
  ];
  const catData = categories.flatMap(([label, pick]) => {
    const value = average(mobile.map(pick));
    return value === null
      ? []
      : [{ label: `${label} (mobil ort.)`, value, color: COLORS.accent }];
  });

  const ordered = sort(
    mobile,
    (a, b) => (a.performanceScore ?? 101) - (b.performanceScore ?? 101),
  );
  const { shown, hidden } = capList(ordered, SPEED_TABLE_CAP);
  const table = `<table class="rows">
    <thead><tr><th>Adres</th><th>Mobil puan</th><th>Masaüstü puan</th><th>LCP</th><th>CLS</th><th>INP</th></tr></thead>
    <tbody>${shown
      .map((r) => {
        const desktop = desktopByPage.get(r.pageId ?? r.url);
        return `<tr>
        <td class="url">${escapeHtml(truncate(r.url, 80))}${r.errorMessage ? `<br><span class="detail">Ölçüm hatası: ${escapeHtml(truncate(r.errorMessage, 120))}</span>` : ""}</td>
        <td class="num">${escapeHtml(scoreCell(r.performanceScore))}</td>
        <td class="num">${escapeHtml(scoreCell(desktop?.performanceScore))}</td>
        <td class="num">${escapeHtml(formatMetric("lcpMs", r.lcpMs))}</td>
        <td class="num">${escapeHtml(formatMetric("cls", r.cls))}</td>
        <td class="num">${escapeHtml(formatMetric("inpMs", r.inpMs))}</td>
      </tr>`;
      })
      .join("")}</tbody>
  </table>`;

  return `<section id="hiz">
    <h2>3. Hız ölçümü</h2>
    <p class="note">${formatCount(summary.measured)} sayfa mobilde ölçüldü${failed > 0 ? `; ${formatCount(failed)} ölçüm hata verdi` : ""}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.</p>
    <div class="grid2">
      ${figure("Mobil performans puanı dağılımı", columnChart(summary.histogram), chartSummary(summary.histogram, " sayfa"), "Lighthouse performans puanı histogramı")}
      ${figure("Puan bandı", barChart(bands), chartSummary(bands, " sayfa"), "İyi, orta, zayıf sayfa sayısı")}
    </div>
    ${catData.length > 0 ? figure("Lighthouse kategorileri", barChart(catData), chartSummary(catData), "Kategori başına mobil ortalama puan") : ""}
    <h3>Sayfa sayfa sonuçlar</h3>
    <p class="note">Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.</p>
    ${table}
    ${moreLine(hidden, "sayfa")}
    <div class="grid3">
      ${worstList(mobile, "lcpMs", "LCP")}
      ${worstList(mobile, "cls", "CLS")}
      ${worstList(mobile, "inpMs", "INP")}
    </div>
    <div class="callout">
      <p><strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX) bu denetimde saklanmadığı için rapora girmiyor. İkisi farklı çıkabilir; Google sıralamada alan verisine bakar.</p>
      <p>Eşikler Google'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).</p>
    </div>
  </section>`;
}
