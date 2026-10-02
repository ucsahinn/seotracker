import { sort } from "remeda";
import { formatCount } from "@/shared/format";
import {
  barChart,
  chartSummary,
  columnChart,
  COLORS,
  donutChart,
  figure,
  stackedBars,
  type ChartDatum,
} from "./reportCharts";
import { escapeHtml, percent, slug } from "./reportFormat";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  SEVERITY_LABEL,
  SEVERITIES,
  depthBuckets,
  responseBuckets,
  statusBuckets,
  titleLengthBuckets,
  type describePages,
  type IssueGroup,
} from "./reportModel";
import type { AuditReportInput } from "./reportTypes";

export type ReportContext = {
  input: AuditReportInput;
  groups: IssueGroup[];
  counts: { total: number; critical: number; warning: number; info: number };
  score: number | null;
  /** False when the findings are not a complete picture (see `isReliable`). */
  reliable: boolean;
  stats: ReturnType<typeof describePages>;
};

const SEVERITY_COLOR = {
  critical: COLORS.critical,
  warning: COLORS.warning,
  info: COLORS.info,
};
const SEVERITY_TAG = { critical: "K", warning: "U", info: "B" };

export function issueAnchor(issueType: string): string {
  return `sorun-${slug(issueType)}`;
}

export function chip(severity: keyof typeof SEVERITY_LABEL): string {
  return `<span class="chip chip--${severity}">${SEVERITY_LABEL[severity]}</span>`;
}

type TocItem = { href: string; label: string };

export function tocSection(items: TocItem[], groups: IssueGroup[]): string {
  const issueLinks = groups.length
    ? `<p class="toc-sub">Sorun türleri</p><ul class="toc-issues">${groups
        .map(
          (g) =>
            `<li><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a> <span class="toc-n">${formatCount(g.pageCount)}</span></li>`,
        )
        .join("")}</ul>`
    : "";
  return `<nav class="toc" aria-label="İçindekiler">
    <h2>İçindekiler</h2>
    <ol>${items.map((i) => `<li><a href="#${i.href}">${escapeHtml(i.label)}</a></li>`).join("")}</ol>
    ${issueLinks}
  </nav>`;
}

function severityDonut(ctx: ReportContext): string {
  const { counts } = ctx;
  if (counts.total === 0) {
    return `<p class="empty">${ctx.reliable ? "Kayıtlı sorun yok." : "Sorun sayısı bilinmiyor."}</p>`;
  }
  const data: ChartDatum[] = SEVERITIES.map((s) => ({
    label: `${SEVERITY_LABEL[s]} sorun türü`,
    value: counts[s],
    color: SEVERITY_COLOR[s],
  }));
  return figure(
    "Önem derecesine göre sorun türleri",
    donutChart(data, formatCount(counts.total), "tür"),
    chartSummary(data),
    "Önem derecesine göre sorun türü dağılımı",
  );
}

function categoryChart(ctx: ReportContext): string {
  if (ctx.groups.length === 0) return "";
  const rows = CATEGORY_ORDER.map((category) => {
    const inCategory = ctx.groups.filter((g) => g.category === category);
    return {
      label: CATEGORY_LABEL[category],
      parts: SEVERITIES.map((s) => ({
        value: inCategory.filter((g) => g.severity === s).length,
        color: SEVERITY_COLOR[s],
        tag: SEVERITY_TAG[s],
      })),
    };
  }).filter((row) => row.parts.some((p) => p.value > 0));
  const caption = `${rows
    .map(
      (r) =>
        `${r.label}: ${r.parts.map((p, i) => `${formatCount(p.value)} ${SEVERITY_LABEL[SEVERITIES[i]].toLowerCase()}`).join(", ")}`,
    )
    .join("; ")}. K kritik, U uyarı, B bilgi.`;
  return figure(
    "Kategoriye göre sorun türleri",
    stackedBars(rows),
    caption,
    "Kategori ve önem derecesine göre sorun türü sayısı",
  );
}

function topIssuesChart(ctx: ReportContext): string {
  const top = sort(ctx.groups, (a, b) => b.pageCount - a.pageCount).slice(
    0,
    10,
  );
  if (top.length === 0) return "";
  const data = top.map((g) => ({
    label: `${SEVERITY_TAG[g.severity]} · ${g.title}`,
    value: g.pageCount,
    color: SEVERITY_COLOR[g.severity],
  }));
  return figure(
    "En çok sayfayı etkileyen 10 sorun türü",
    barChart(data, 42),
    `${chartSummary(data, " sayfa")}. K kritik, U uyarı, B bilgi.`,
    "Etkilenen sayfa sayısına göre ilk on sorun türü",
  );
}

function statusFigure(ctx: ReportContext): string {
  const pages = ctx.input.pages;
  if (pages.length === 0) return "";
  const colors = [
    COLORS.good,
    COLORS.accent,
    COLORS.warning,
    COLORS.critical,
    COLORS.muted,
  ];
  const data = statusBuckets(pages).map((b, i) => ({ ...b, color: colors[i] }));
  return figure(
    "HTTP durum kodları",
    donutChart(data, formatCount(pages.length), "sayfa"),
    chartSummary(data),
    "Durum kodu dağılımı",
  );
}

function distributionCharts(ctx: ReportContext): string {
  const pages = ctx.input.pages;
  if (pages.length === 0) return "";
  const depth = depthBuckets(pages);
  const title = titleLengthBuckets(pages);
  const response = responseBuckets(pages);
  const hasDepth = pages.some((p) => p.crawlDepth !== undefined);
  const hasTime = pages.some((p) => p.responseTimeMs !== null);
  return `${
    hasDepth
      ? figure(
          "Tarama derinliği (ana sayfadan kaç tıklama)",
          columnChart(depth),
          chartSummary(depth, " sayfa"),
          "Tarama derinliği dağılımı",
        )
      : ""
  }
  ${figure(
    "Başlık uzunluğu (karakter)",
    columnChart(title, COLORS.accent),
    `${chartSummary(title, " sayfa")}. Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.`,
    "Sayfa başlığı uzunluğu dağılımı",
  )}
  ${
    hasTime
      ? figure(
          "Sunucu yanıt süresi",
          columnChart(response),
          chartSummary(response, " sayfa"),
          "Yanıt süresi dağılımı",
        )
      : ""
  }`;
}

function stateBars(ctx: ReportContext): string {
  const { stats, input } = ctx;
  const n = input.pagesCrawled;
  const rows: Array<[string, number]> = [
    ["Dizine girebilir", stats.indexable],
    ["Site haritasında", stats.inSitemap],
    ["Başlığı yok", stats.missingTitle],
    ["Meta açıklaması yok", stats.missingDescription],
  ];
  const data = rows.map(([label, value]) => ({
    label,
    value,
    display: `${formatCount(value)} (%${formatCount(percent(value, n))})`,
  }));
  return figure(
    "Sayfa durumu",
    barChart(data),
    `${formatCount(n)} taranan sayfaya oranla. ${data.map((d) => `${d.label}: ${d.display}`).join("; ")}.`,
    "Sayfa durumu özeti",
  );
}

export function overviewSection(ctx: ReportContext): string {
  return `<section id="genel">
    <h2>1. Genel görünüm</h2>
    <p class="note">Her grafiğin altında aynı veriler yazıyla da verilir.</p>
    <div class="grid2">
      ${severityDonut(ctx)}
      ${statusFigure(ctx)}
    </div>
    ${categoryChart(ctx)}
    ${topIssuesChart(ctx)}
    ${stateBars(ctx)}
    ${distributionCharts(ctx)}
  </section>`;
}
