import { getIssueDescriptor } from "@/shared/audit-issues";
import type { AuditCheck } from "@/shared/auditBreakdown";
import { AUDIT_CATEGORY_LABEL } from "@/shared/auditCategory";
import { auditScoreBand, auditScoreTier } from "@/shared/auditScore";
import { formatCount, formatDate, formatPoints } from "@/shared/format";
import { t } from "@/shared/i18n";
import { barChart, COLORS, columnChart, figure } from "./reportCharts";
import { escapeHtml } from "./reportFormat";
import { chip, type ReportContext } from "./reportSections";

/*
 * The score broken down: the three counters, one score per category with
 * what it costs, the score over the last audits, and what changed since the
 * previous one. The appendix at the end lists every check that passed or
 * could not be measured, so a clean category is visible, not just absent.
 */

/** Turkish source text; shown through t(). */
const TIER_WORD = {
  excellent: "Mükemmel",
  good: "İyi",
  fair: "Orta",
  poor: "Zayıf",
} as const;

const BAND_COLOR = {
  good: COLORS.good,
  fair: COLORS.warning,
  poor: COLORS.critical,
};

const titleOf = (issueType: string) => {
  const descriptor = getIssueDescriptor(issueType);
  return descriptor ? t(descriptor.title) : issueType;
};

function counterCards(ctx: ReportContext): string {
  const { counters } = ctx.breakdown;
  const card = (label: string, value: number, hint: string, tone = "") =>
    `<div class="card${tone}"><p class="card-label">${escapeHtml(label)}</p><p class="card-value">${formatCount(value)}</p><p class="card-label">${escapeHtml(hint)}</p></div>`;
  return `<div class="cards cards--4">
    ${card(t("Kritik sorun"), counters.errors, t("Kritik kontrol"), counters.errors > 0 ? " card--critical" : "")}
    ${card(t("İyileştirme"), counters.opportunities, t("Uyarı ve bilgi"), counters.opportunities > 0 ? " card--warning" : "")}
    ${card(t("Geçen kontrol"), counters.passed, t("Temiz çıkan"))}
    ${card(t("Ölçülmedi"), counters.unknown, t("Veri toplanamadı"))}
  </div>`;
}

function categoryFigure(ctx: ReportContext): string {
  const data = ctx.breakdown.categories.map((c) => ({
    label: t(AUDIT_CATEGORY_LABEL[c.category]),
    value: c.score ?? 0,
    color:
      c.score === null ? COLORS.muted : BAND_COLOR[auditScoreBand(c.score)],
    display:
      c.score === null
        ? t("Ölçülmedi")
        : `${c.score} · ${c.unknown > 0 ? t("Kısmi veri") : t(TIER_WORD[auditScoreTier(c.score)])}`,
  }));
  return figure(
    t("Kategori puanları"),
    barChart(data, 34),
    data.map((d) => `${d.label}: ${d.display}`).join("; "),
    t("Kategori başına 100 üzerinden puan"),
  );
}

function categoryTable(ctx: ReportContext): string {
  return `<table class="rows">
    <thead><tr><th>${t("Kategori")}</th><th class="num">${t("Puan")}</th><th class="num">${t("Geçti")}</th><th class="num">${t("Sorunlu")}</th><th class="num">${t("Ölçülmedi")}</th><th class="num">${t("Puan etkisi")}</th></tr></thead>
    <tbody>${ctx.breakdown.categories
      .map(
        (c) => `<tr><td>${escapeHtml(t(AUDIT_CATEGORY_LABEL[c.category]))}</td>
        <td class="num">${c.score === null ? "--" : c.score}</td>
        <td class="num">${formatCount(c.passed)}</td>
        <td class="num">${formatCount(c.failed)}</td>
        <td class="num">${formatCount(c.unknown)}</td>
        <td class="num">${c.impact > 0 ? `−${formatPoints(c.impact, false)}` : "0"}</td></tr>`,
      )
      .join("")}</tbody>
  </table>
  <p class="note">${t("Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.")}</p>`;
}

function historyBlock(ctx: ReportContext): string {
  const history = (ctx.input.insights?.history ?? []).filter(
    (point): point is typeof point & { score: number } => point.score !== null,
  );
  // A first audit has no history: no heading over a sentence saying so.
  if (history.length < 2) return "";
  // Failed and cut-short audits have no score and are not plotted; a
  // provisional one is labelled so its number does not pass for a verdict.
  const data = history.map((point) => ({
    label: point.provisional
      ? `${formatDate(point.startedAt)} (${t("kısmi")})`
      : formatDate(point.startedAt),
    value: point.score,
  }));
  const partial = history.some((point) => point.partial)
    ? `<p class="note">${t("Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.")}</p>`
    : "";
  return `<h3>${t("Puan geçmişi")}</h3>${figure(
    t("Son {count} denetimin puanı", { count: history.length }),
    columnChart(data),
    data.map((d) => `${d.label}: ${d.value}`).join("; "),
    t("Denetim tarihine göre site puanı"),
  )}${partial}`;
}

function changesBlock(ctx: ReportContext): string {
  const changes = ctx.input.insights?.changes;
  if (!changes) return "";
  const list = (items: typeof changes.added, fixed: boolean, empty: string) =>
    items.length === 0
      ? `<p class="note">${escapeHtml(empty)}</p>`
      : `<ul class="fixlist">${items
          .map(
            (c) =>
              `<li>${escapeHtml(titleOf(c.issueType))} ${chip(c.severity)} <span class="fix-meta">${t("{count} sayfa", { count: fixed ? c.previousPages : c.pages })}</span></li>`,
          )
          .join("")}</ul>`;
  return `<h3>${t("Son denetimden bu yana")}</h3>
    <p class="note">${t("{date} tarihli denetimle karşılaştırıldı.", { date: formatDate(changes.previousStartedAt) })}${changes.partial ? ` ${t("Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.")}` : ""}</p>
    <div class="grid2">
      <div><h4>${t("Düzeltilenler ({count})", { count: changes.fixed.length })}</h4>${list(changes.fixed, true, t("Önceki denetimdeki sorunların hiçbiri tamamen gitmedi."))}</div>
      <div><h4>${t("Yeni çıkanlar ({count})", { count: changes.added.length })}</h4>${list(changes.added, false, t("Yeni bir sorun türü çıkmadı."))}</div>
    </div>`;
}

export function scoreSection(ctx: ReportContext): string {
  if (!ctx.reliable) return "";
  return `<section id="puanlar">
    <h2>${t("1. Puan dağılımı ve kontroller")}</h2>
    <p class="note">${t("Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.")}</p>
    ${counterCards(ctx)}
    ${categoryFigure(ctx)}
    ${categoryTable(ctx)}
    ${historyBlock(ctx)}
    ${changesBlock(ctx)}
  </section>`;
}

function checkList(checks: AuditCheck[]): string {
  return `<ul class="ap-list">${checks
    .map((check) => `<li>${escapeHtml(titleOf(check.issueType))}</li>`)
    .join("")}</ul>`;
}

export function passedAppendix(ctx: ReportContext): string {
  if (!ctx.reliable) return "";
  const blocks = ctx.breakdown.categories.map((category) => {
    const own = ctx.breakdown.checks.filter(
      (check) => check.category === category.category,
    );
    const passed = own.filter((check) => check.state === "passed");
    const unknown = own.filter((check) => check.state === "unknown");
    return `<h3 class="cat-head">${escapeHtml(t(AUDIT_CATEGORY_LABEL[category.category]))} <span class="cat-n">${t("{count} kontrol aşamasından geçti", { count: formatCount(passed.length) })}</span></h3>
      ${passed.length > 0 ? checkList(passed) : ""}
      ${unknown.length > 0 ? `<p class="ap-head">${t("Ölçülmedi ({count})", { count: unknown.length })}</p>${checkList(unknown)}` : ""}`;
  });
  return `<section id="gecen-kontroller">
    <h2>${t("Ek C. Geçen ve ölçülemeyen kontroller")}</h2>
    <p class="note">${t("Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.")}</p>
    ${blocks.join("")}
  </section>`;
}
