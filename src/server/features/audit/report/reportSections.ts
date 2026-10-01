import { sort } from "remeda";
import { formatCount, formatDate, formatDateTime } from "@/shared/format";
import {
  barChart,
  chartSummary,
  columnChart,
  COLORS,
  donutChart,
  figure,
  gauge,
  stackedBars,
  type ChartDatum,
} from "./reportCharts";
import { escapeHtml, formatMs, hostOf, percent, slug } from "./reportFormat";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  SEVERITY_LABEL,
  SEVERITIES,
  depthBuckets,
  responseBuckets,
  scoreVerdict,
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

function card(label: string, value: string, tone?: "critical" | "warning") {
  return `<div class="card${tone ? ` card--${tone}` : ""}">
    <p class="card-label">${escapeHtml(label)}</p>
    <p class="card-value">${escapeHtml(value)}</p>
  </div>`;
}

export function coverSection(ctx: ReportContext): string {
  const { input, counts, score, stats, groups } = ctx;
  const when = input.completedAt ?? input.startedAt;
  const top = sort(
    groups.filter((g) => g.points > 0),
    (a, b) => b.points - a.points,
  ).slice(0, 5);
  const fixList =
    top.length === 0
      ? `<p class="empty">Düzeltilecek kayıtlı sorun yok.</p>`
      : `<ol class="fixlist">${top
          .map(
            (g) => `<li>
        <a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a>
        ${chip(g.severity)}
        <span class="fix-meta">${g.siteLevel ? "tüm site" : `${formatCount(g.pageCount)} sayfa`} · ${g.points < 1 ? "+1 puandan az" : `+${formatCount(g.points)} puan`}</span>
      </li>`,
          )
          .join("")}</ol>
      <p class="note">Puanlar, o sorun tamamen düzeltilirse site puanına eklenecek yaklaşık değeri gösterir.</p>`;

  return `<section class="cover" id="ozet">
    <p class="eyebrow">Site denetim raporu</p>
    <h1>${escapeHtml(hostOf(input.siteUrl))}</h1>
    <p class="sub">${escapeHtml(input.siteUrl)}</p>
    <p class="sub">Denetim tarihi: ${escapeHtml(formatDate(when))} (${escapeHtml(formatDateTime(when))})</p>
    <div class="scorebox">
      ${gauge(score)}
      <div>
        <p class="score-label">Site puanı</p>
        <p class="verdict">${escapeHtml(scoreVerdict(score))}</p>
      </div>
    </div>
    <div class="cards">
      ${card("Taranan sayfa", formatCount(input.pagesCrawled))}
      ${card("Kritik sorun türü", formatCount(counts.critical), counts.critical > 0 ? "critical" : undefined)}
      ${card("Uyarı türü", formatCount(counts.warning), counts.warning > 0 ? "warning" : undefined)}
      ${card("Bilgi türü", formatCount(counts.info))}
      ${card("Dizine girebilir", `${formatCount(stats.indexable)} / ${formatCount(input.pagesCrawled)}`)}
      ${card("Ortalama yanıt", formatMs(stats.avgResponseMs))}
    </div>
    <h2>Önce bunları düzeltin</h2>
    ${fixList}
  </section>`;
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
  if (counts.total === 0) return `<p class="empty">Kayıtlı sorun yok.</p>`;
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

function distributionCharts(ctx: ReportContext): string {
  const pages = ctx.input.pages;
  if (pages.length === 0) return "";
  const status = statusBuckets(pages);
  const statusColors = [
    COLORS.good,
    COLORS.accent,
    COLORS.warning,
    COLORS.critical,
    COLORS.muted,
  ];
  const statusData = status.map((b, i) => ({ ...b, color: statusColors[i] }));
  const depth = depthBuckets(pages);
  const title = titleLengthBuckets(pages);
  const response = responseBuckets(pages);
  const hasDepth = pages.some((p) => p.crawlDepth !== undefined);
  const hasTime = pages.some((p) => p.responseTimeMs !== null);
  return `${figure(
    "HTTP durum kodları",
    donutChart(statusData, formatCount(pages.length), "sayfa"),
    chartSummary(statusData),
    "Durum kodu dağılımı",
  )}
  ${
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
    `${chartSummary(title, " sayfa")}. Önerilen aralık 30-60 karakterdir.`,
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
      ${categoryChart(ctx)}
    </div>
    ${topIssuesChart(ctx)}
    ${stateBars(ctx)}
    <div class="grid2">${distributionCharts(ctx)}</div>
  </section>`;
}
