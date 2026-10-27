import { sort } from "remeda";
import { savingsText } from "@/shared/audit-issues/details";
import type { Effort, TodoItem } from "@/shared/auditTodo";
import { AUDIT_CATEGORY_LABEL } from "@/shared/auditCategory";
import { auditScoreBand, auditScoreTier } from "@/shared/auditScore";
import {
  capVerdict,
  coverageLine,
  crawlLimitNote,
  thinCategoryLines,
} from "@/shared/auditStanding";
import {
  formatCount,
  formatDate,
  formatPercent,
  formatPoints,
  formatTime,
  parseTimestamp,
} from "@/shared/format";
import { t } from "@/shared/i18n";
import { COLORS, gauge } from "./reportCharts";
import { escapeHtml, formatMs, hostOf, truncateUrl } from "./reportFormat";
import { scoreVerdict, UNRELIABLE_NOTE, type IssueGroup } from "./reportModel";
import { chip, issueAnchor, type ReportContext } from "./reportSections";

/** How many things the cover asks the reader to do first. */
const TODO_COUNT = 3;
const LATER_COUNT = 4;
const SAMPLE_URLS = 3;

function card(label: string, value: string, tone?: "critical" | "warning") {
  return `<div class="card${tone ? ` card--${tone}` : ""}">
    <p class="card-label">${escapeHtml(label)}</p>
    <p class="card-value">${escapeHtml(value)}</p>
  </div>`;
}

function scopeText(group: IssueGroup): string {
  return group.siteLevel
    ? t("tüm site")
    : t("{count} sayfa", { count: group.pageCount });
}

/* The same rounding as the screen (`formatPoints`): "~+3,2 puan", "<0,1 puan". */
function pointsText(group: IssueGroup): string {
  return t("{points} puan", { points: formatPoints(group.points) });
}

/** The addresses that show the reader where to start, and how many more there are. */
function samplePages(group: IssueGroup): string {
  if (group.siteLevel) {
    return `<p class="todo-pages">${t("Etkilenen: tüm site")}</p>`;
  }
  const urls = [...new Set(group.rows.filter((r) => r.url).map((r) => r.url))];
  const shown = urls.slice(0, SAMPLE_URLS);
  const rest = group.pageCount - shown.length;
  return `<ul class="todo-pages">${shown
    .map((u) => `<li>${escapeHtml(truncateUrl(u, 90))}</li>`)
    .join(
      "",
    )}${rest > 0 ? `<li class="more">${t("ve {count} sayfa daha (ayrıntı sorun bölümünde)", { count: rest })}</li>` : ""}</ul>`;
}

/** Turkish source text; shown through t(). */
const EFFORT_LABEL: Record<Effort, string> = {
  S: "Küçük iş",
  M: "Orta iş",
  L: "Büyük iş",
};

function todoMeta(group: IssueGroup, todo: TodoItem): string {
  const traffic =
    todo.clicks === null
      ? ""
      : ` · ${t("{clicks} tıklama, {impressions} gösterim", {
          clicks: formatCount(todo.clicks),
          impressions: formatCount(todo.impressions ?? 0),
        })}`;
  const savings = savingsText(todo.savingsMs, todo.savingsBytes);
  const saved = savings
    ? ` · ${escapeHtml(t("Tahmini kazanç: {value}", { value: savings }))}`
    : "";
  return `${scopeText(group)} · ${pointsText(group)} · ${t(EFFORT_LABEL[todo.effort])}${saved}${traffic}`;
}

function todoItem(group: IssueGroup, todo: TodoItem): string {
  return `<li class="todo">
    <div class="todo-head">
      <a href="#${issueAnchor(group.issueType)}" class="todo-title">${escapeHtml(group.title)}</a>
      ${chip(group.severity)}
      <span class="fix-meta">${todoMeta(group, todo)}</span>
    </div>
    ${group.howToFix ? `<p><strong>${t("Ne yapılmalı:")}</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    ${group.explanation ? `<p class="why"><strong>${t("Neden:")}</strong> ${escapeHtml(group.explanation)}</p>` : ""}
    ${samplePages(group)}
  </li>`;
}

function actionPlan(
  groups: IssueGroup[],
  todos: TodoItem[],
  reliable: boolean,
  withTraffic: boolean,
): string {
  const byType = new Map(groups.map((g) => [g.issueType, g]));
  const ranked = todos.flatMap((todo) => {
    const group = byType.get(todo.issueType);
    return group && group.points > 0 ? [{ group, todo }] : [];
  });
  if (ranked.length === 0) {
    return `<h2>${t("Bu hafta yapılacaklar")}</h2><p class="empty">${reliable ? t("Düzeltilecek kayıtlı sorun yok.") : t("Düzeltilecek sorun listesi eksik olabilir.")}</p>`;
  }
  const first = ranked.slice(0, TODO_COUNT);
  const later = ranked.slice(TODO_COUNT, TODO_COUNT + LATER_COUNT);
  return `<h2>${t("Bu hafta yapılacak {count} şey", { count: first.length })}</h2>
    <p class="note">${withTraffic ? t("Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.") : t("Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.")}</p>
    <ol class="todos">${first.map(({ group, todo }) => todoItem(group, todo)).join("")}</ol>
    ${
      later.length > 0
        ? `<h3>${t("Sonrasında")}</h3><ul class="fixlist">${later
            .map(
              ({ group: g, todo }) =>
                `<li><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a> ${chip(g.severity)} <span class="fix-meta">${todoMeta(g, todo)}</span></li>`,
            )
            .join("")}</ul>`
        : ""
    }
    <p class="note">${t("Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.")}</p>`;
}

export function statusNote(status: string | null | undefined): string {
  if (status === "failed") return t("Denetim hata verip durdu.");
  if (status === "running") return t("Denetim hâlâ çalışıyor.");
  return t("Hiç sayfa taranamadı.");
}

/*
 * The seowatcher mark (public/icon.svg), inline so the file stays
 * self-contained; ids are prefixed so they cannot meet the report's anchors.
 */
const LOGO = `<svg viewBox="0 0 256 256" aria-hidden="true" focusable="false"><defs><radialGradient id="sw-iris" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd27a"/><stop offset="0.45" stop-color="#ff8a1f"/><stop offset="1" stop-color="#d9480f"/></radialGradient><clipPath id="sw-eye"><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z"/></clipPath></defs><rect width="256" height="256" rx="48" fill="#141210"/><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z" fill="#241d19"/><g clip-path="url(#sw-eye)"><circle cx="128" cy="128" r="54" fill="url(#sw-iris)"/></g><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z" fill="none" stroke="#ff8a1f" stroke-width="12" stroke-linejoin="round"/><path d="M128 84 Q141 128 128 172 Q115 128 128 84 Z" fill="#0c0b0a"/><circle cx="148" cy="108" r="9" fill="#fff4e0"/></svg>`;

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

/**
 * The categories under the score, worst first, so page one already says
 * where the points went. A category with no data is hatched and says so; one
 * with some unmeasured checks shows its number without a verdict word.
 */
function categoryBars(ctx: ReportContext): string {
  const rows = sort(
    ctx.breakdown.categories,
    (a, b) => (a.score ?? 101) - (b.score ?? 101),
  );
  return `<ul class="catbars">${rows
    .map((c) => {
      const label = escapeHtml(t(AUDIT_CATEGORY_LABEL[c.category]));
      if (c.score === null) {
        return `<li><span>${label}</span><span class="cb-score"><span>${t("Ölçülmedi")}</span></span><span class="cb-track cb-none"></span></li>`;
      }
      const word =
        c.unknown > 0 ? t("Kısmi veri") : t(TIER_WORD[auditScoreTier(c.score)]);
      return `<li><span>${label}</span><span class="cb-score">${c.score} <span>${escapeHtml(word)}</span></span><span class="cb-track"><span class="cb-fill" style="width:${c.score}%;background:${BAND_COLOR[auditScoreBand(c.score)]}"></span></span></li>`;
    })
    .join("")}</ul>`;
}

function speedState(input: ReportContext["input"]): string {
  if (input.lighthouseMode === "none") return t("Kapalı");
  // A run that failed (quota, timeout) is a row with no score.
  const measured = input.lighthouse.filter(
    (row) => row.performanceScore !== null,
  ).length;
  if (measured > 0) {
    return measured === input.lighthouse.length
      ? t("{count} ölçüm", { count: measured })
      : t("{measured} / {total} ölçüm", {
          measured: formatCount(measured),
          total: formatCount(input.lighthouse.length),
        });
  }
  return input.lighthouse.length > 0 ? t("Ölçülemedi") : t("Yok");
}

/**
 * The verdict under the score, from the same standing as the screen: no
 * score for an incomplete audit, no tier word for a provisional one, and a
 * tier capped by critical findings or many warnings (see `auditStanding`).
 */
function coverVerdict(ctx: ReportContext): string {
  const { standing, reliable, score, counts, input } = ctx;
  const p = (text: string, cls = "verdict") =>
    `<p class="${cls}">${escapeHtml(text)}</p>`;
  const withheldCutShort =
    standing.kind === "withheld" && standing.reason === "cut-short";
  if (!reliable || withheldCutShort) {
    const why = withheldCutShort
      ? t("Tarama, sitenin istek sınırı yüzünden erken durdu.")
      : statusNote(input.status);
    return p(`${t("Eksik denetim — puan verilmedi")}. ${why}`);
  }
  if (standing.kind !== "scored" || score === null) {
    return p(scoreVerdict(score, counts.critical, reliable));
  }
  const limit = crawlLimitNote({
    pagesCrawled: input.pagesCrawled,
    maxPages: input.maxPages,
    urlsDiscovered: input.urlsDiscovered,
    sitemapUrls:
      input.siteFacts?.sitemap.onHostUrlCount ??
      input.siteFacts?.sitemap.urlCount,
  });
  const coverage = `${p(coverageLine(standing), "sub")}${limit ? p(limit, "sub") : ""}`;
  if (standing.provisional) {
    const lines = thinCategoryLines(standing, ctx.breakdown.categories, {
      lighthouse: input.lighthouse,
      speedOff: input.lighthouseMode === "none",
      googleInspected: input.insights?.googleInspected ?? null,
    });
    return `${p(
      t("Kısmi puan — ölçüm kapsamı {percent}", {
        percent: formatPercent(standing.coverage.ratio, 0),
      }),
    )}${p(t("Kontrollerin önemli bir kısmı ölçülemediği için bu puan kesin değil; derece verilmedi."), "sub")}${lines.map((line) => p(line, "sub")).join("")}${coverage}`;
  }
  const verdict =
    capVerdict(standing) ?? scoreVerdict(score, counts.critical, reliable);
  return `${p(verdict)}${coverage}`;
}

export function coverSection(ctx: ReportContext): string {
  const { input, counts, score, stats, groups, reliable, todos } = ctx;
  const when = input.completedAt ?? input.startedAt;
  const meta: Array<[string, string]> = [
    // With the year: a report is read long after the audit.
    [
      t("Denetim tarihi"),
      `${formatDate(when)}, ${formatTime(parseTimestamp(when))}`,
    ],
    [
      t("Taranan sayfa"),
      typeof input.maxPages === "number"
        ? t("{count} (üst sınır {max})", {
            count: formatCount(input.pagesCrawled),
            max: formatCount(input.maxPages),
          })
        : formatCount(input.pagesCrawled),
    ],
    [t("Hız ölçümü"), speedState(input)],
    [
      t("Google dizin verisi"),
      input.indexCoverage && input.indexCoverage.asked > 0
        ? t("Var")
        : t("Yok"),
    ],
  ];

  return `<section class="cover" id="ozet">
    <header class="masthead">
      <span class="brand">${LOGO}<span>seowatcher</span></span>
      <p class="masthead-kind">${t("Site denetim raporu")}</p>
    </header>
    <h1>${escapeHtml(hostOf(input.siteUrl))}</h1>
    <p class="sub sub--url">${escapeHtml(input.siteUrl)}</p>
    <dl class="meta">${meta
      .map(
        ([label, value]) =>
          `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`,
      )
      .join("")}</dl>
    ${reliable ? "" : `<div class="callout callout--warn"><p><strong>${t("Rapor eksik olabilir.")}</strong> ${escapeHtml(statusNote(input.status))} ${escapeHtml(t(UNRELIABLE_NOTE))}</p></div>`}
    <div class="scorebox">
      ${gauge(score, ctx.standing.kind === "scored" ? ctx.standing.tier : null)}
      <div>
        <p class="score-label">${t("Site puanı")}</p>
        ${coverVerdict(ctx)}
        <p class="sub">${
          counts.total === 0
            ? reliable
              ? t("Kayıtlı sorun yok.")
              : t("Sorun sayısı bilinmiyor.")
            : t(
                "{count} sorun türü: {critical} kritik, {warning} uyarı, {info} bilgi.",
                {
                  count: counts.total,
                  critical: formatCount(counts.critical),
                  warning: formatCount(counts.warning),
                  info: formatCount(counts.info),
                },
              )
        }</p>
        ${reliable && score !== null ? categoryBars(ctx) : ""}
      </div>
    </div>
    <div class="cards">
      ${card(t("Taranan sayfa"), formatCount(input.pagesCrawled))}
      ${card(t("Kritik sorun"), formatCount(counts.critical), counts.critical > 0 ? "critical" : undefined)}
      ${card(t("Uyarı"), formatCount(counts.warning), counts.warning > 0 ? "warning" : undefined)}
      ${card(t("Bilgi"), formatCount(counts.info))}
      ${card(t("Dizine girebilir"), `${formatCount(stats.indexable)} / ${formatCount(input.pagesCrawled)}`)}
      ${card(t("Ortalama yanıt"), formatMs(stats.avgResponseMs))}
    </div>
    ${actionPlan(groups, todos, reliable, Boolean(input.insights?.traffic))}
  </section>`;
}
