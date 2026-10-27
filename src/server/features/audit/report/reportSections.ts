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
import {
  escapeHtml,
  pagesText,
  percent,
  percentText,
  slug,
} from "./reportFormat";
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
import type { AuditBreakdown } from "@/shared/auditBreakdown";
import type { AuditStanding } from "@/shared/auditStanding";
import type { TodoItem } from "@/shared/auditTodo";
import { getLocale, t } from "@/shared/i18n";

export type ReportContext = {
  input: AuditReportInput;
  groups: IssueGroup[];
  counts: { total: number; critical: number; warning: number; info: number };
  score: number | null;
  /** False when the findings are not a complete picture (see `isReliable`). */
  reliable: boolean;
  stats: ReturnType<typeof describePages>;
  /** Every check with its state and the per-category scores. */
  breakdown: AuditBreakdown;
  /** Whether the score is shown, provisional or capped (see `auditStanding`). */
  standing: AuditStanding;
  /** Fixes ranked by score impact and Search Console traffic. */
  todos: TodoItem[];
};

const SEVERITY_COLOR = {
  critical: COLORS.critical,
  warning: COLORS.warning,
  info: COLORS.info,
};
/* One-letter chart tags, explained by SEVERITY_LEGEND under each chart. */
function severityTag(severity: keyof typeof SEVERITY_COLOR): string {
  return {
    critical: t("K"),
    warning: t("U"),
    info: t("B"),
  }[severity];
}

const SEVERITY_LEGEND = "K kritik, U uyarı, B bilgi.";

export function issueAnchor(issueType: string): string {
  return `sorun-${slug(issueType)}`;
}

export function chip(severity: keyof typeof SEVERITY_LABEL): string {
  return `<span class="chip chip--${severity}">${t(SEVERITY_LABEL[severity])}</span>`;
}

type TocItem = { href: string; label: string };

export function tocSection(items: TocItem[], groups: IssueGroup[]): string {
  const issueLinks = groups.length
    ? `<p class="toc-sub">${t("Sorun türleri")}</p><ul class="toc-issues">${groups
        .map(
          (g) =>
            `<li><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a> <span class="toc-n">${formatCount(g.pageCount)}</span></li>`,
        )
        .join("")}</ul>`
    : "";
  return `<nav class="toc" aria-label="${t("İçindekiler")}">
    <h2>${t("İçindekiler")}</h2>
    <ol>${items.map((i) => `<li><a href="#${i.href}">${escapeHtml(t(i.label))}</a></li>`).join("")}</ol>
    ${issueLinks}
  </nav>`;
}

function severityDonut(ctx: ReportContext): string {
  const { counts } = ctx;
  if (counts.total === 0) {
    return `<p class="empty">${ctx.reliable ? t("Kayıtlı sorun yok.") : t("Sorun sayısı bilinmiyor.")}</p>`;
  }
  const data: ChartDatum[] = SEVERITIES.map((s) => ({
    label: t("{severity} sorun türü", { severity: t(SEVERITY_LABEL[s]) }),
    value: counts[s],
    color: SEVERITY_COLOR[s],
  }));
  return figure(
    t("Önem derecesine göre sorun türleri"),
    donutChart(data, formatCount(counts.total), t("tür")),
    chartSummary(data),
    t("Önem derecesine göre sorun türü dağılımı"),
  );
}

function categoryChart(ctx: ReportContext): string {
  if (ctx.groups.length === 0) return "";
  const rows = CATEGORY_ORDER.map((category) => {
    const inCategory = ctx.groups.filter((g) => g.category === category);
    return {
      label: t(CATEGORY_LABEL[category]),
      parts: SEVERITIES.map((s) => ({
        value: inCategory.filter((g) => g.severity === s).length,
        color: SEVERITY_COLOR[s],
        tag: severityTag(s),
      })),
    };
  }).filter((row) => row.parts.some((p) => p.value > 0));
  const caption = `${rows
    .map(
      (r) =>
        `${r.label}: ${r.parts.map((p, i) => `${formatCount(p.value)} ${t(SEVERITY_LABEL[SEVERITIES[i]]).toLocaleLowerCase(getLocale())}`).join(", ")}`,
    )
    .join("; ")}. ${t(SEVERITY_LEGEND)}`;
  return figure(
    t("Kategoriye göre sorun türleri"),
    stackedBars(rows),
    caption,
    t("Kategori ve önem derecesine göre sorun türü sayısı"),
  );
}

function topIssuesChart(ctx: ReportContext): string {
  const top = sort(ctx.groups, (a, b) => b.pageCount - a.pageCount).slice(
    0,
    10,
  );
  if (top.length === 0) return "";
  const data = top.map((g) => ({
    label: `${severityTag(g.severity)} · ${g.title}`,
    value: g.pageCount,
    color: SEVERITY_COLOR[g.severity],
  }));
  return figure(
    t("En çok sayfayı etkileyen 10 sorun türü"),
    barChart(data, 42),
    `${chartSummary(data, pagesText)}. ${t(SEVERITY_LEGEND)}`,
    t("Etkilenen sayfa sayısına göre ilk on sorun türü"),
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
    t("HTTP durum kodları"),
    donutChart(data, formatCount(pages.length), t("sayfa")),
    chartSummary(data),
    t("Durum kodu dağılımı"),
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
          t("Tarama derinliği (ana sayfadan kaç tıklama)"),
          columnChart(depth),
          chartSummary(depth, pagesText),
          t("Tarama derinliği dağılımı"),
        )
      : ""
  }
  ${figure(
    t("Başlık uzunluğu (karakter)"),
    columnChart(title, COLORS.accent),
    `${chartSummary(title, pagesText)}. ${t("Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.")}`,
    t("Sayfa başlığı uzunluğu dağılımı"),
  )}
  ${
    hasTime
      ? figure(
          t("Sunucu yanıt süresi"),
          columnChart(response),
          chartSummary(response, pagesText),
          t("Yanıt süresi dağılımı"),
        )
      : ""
  }`;
}

function stateBars(ctx: ReportContext): string {
  const { stats, input } = ctx;
  const n = input.pagesCrawled;
  const rows: Array<[string, number]> = [
    [t("Dizine girebilir"), stats.indexable],
    [t("Site haritasında"), stats.inSitemap],
    [t("Başlığı yok"), stats.missingTitle],
    [t("Meta açıklaması yok"), stats.missingDescription],
  ];
  const data = rows.map(([label, value]) => ({
    label,
    value,
    display: `${formatCount(value)} (${percentText(percent(value, n))})`,
  }));
  return figure(
    t("Sayfa durumu"),
    barChart(data),
    `${t("{count} taranan sayfaya oranla.", { count: n })} ${data.map((d) => `${d.label}: ${d.display}`).join("; ")}.`,
    t("Sayfa durumu özeti"),
  );
}

export function overviewSection(ctx: ReportContext): string {
  return `<section id="genel">
    <h2>${t("3. Genel görünüm")}</h2>
    <p class="note">${t("Her grafiğin altında aynı veriler yazıyla da verilir.")}</p>
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
