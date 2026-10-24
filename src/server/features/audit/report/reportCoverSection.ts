import { sort } from "remeda";
import { formatCount, formatDate, formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { gauge } from "./reportCharts";
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

function pointsText(group: IssueGroup): string {
  return group.points < 1
    ? t("+1 puandan az")
    : t("+{count} puan", { count: group.points });
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

function todoItem(group: IssueGroup): string {
  return `<li class="todo">
    <div class="todo-head">
      <a href="#${issueAnchor(group.issueType)}" class="todo-title">${escapeHtml(group.title)}</a>
      ${chip(group.severity)}
      <span class="fix-meta">${scopeText(group)} · ${pointsText(group)}</span>
    </div>
    ${group.howToFix ? `<p><strong>${t("Ne yapılmalı:")}</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    ${group.explanation ? `<p class="why"><strong>${t("Neden:")}</strong> ${escapeHtml(group.explanation)}</p>` : ""}
    ${samplePages(group)}
  </li>`;
}

function actionPlan(groups: IssueGroup[], reliable: boolean): string {
  const ranked = sort(
    groups.filter((g) => g.points > 0),
    (a, b) => b.points - a.points,
  );
  if (ranked.length === 0) {
    return `<h2>${t("Bu hafta yapılacaklar")}</h2><p class="empty">${reliable ? t("Düzeltilecek kayıtlı sorun yok.") : t("Düzeltilecek sorun listesi eksik olabilir.")}</p>`;
  }
  const first = ranked.slice(0, TODO_COUNT);
  const later = ranked.slice(TODO_COUNT, TODO_COUNT + LATER_COUNT);
  return `<h2>${t("Bu hafta yapılacak {count} şey", { count: first.length })}</h2>
    <p class="note">${t("Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.")}</p>
    <ol class="todos">${first.map(todoItem).join("")}</ol>
    ${
      later.length > 0
        ? `<h3>${t("Sonrasında")}</h3><ul class="fixlist">${later
            .map(
              (g) =>
                `<li><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a> ${chip(g.severity)} <span class="fix-meta">${scopeText(g)} · ${pointsText(g)}</span></li>`,
            )
            .join("")}</ul>`
        : ""
    }
    <p class="note">${t("Puanlar, o sorun tamamen düzeltilirse site puanına eklenecek yaklaşık değeri gösterir.")}</p>`;
}

function statusNote(status: string | null | undefined): string {
  if (status === "failed") return t("Denetim hata verip durdu.");
  if (status === "running") return t("Denetim hâlâ çalışıyor.");
  return t("Hiç sayfa taranamadı.");
}

export function coverSection(ctx: ReportContext): string {
  const { input, counts, score, stats, groups, reliable } = ctx;
  const when = input.completedAt ?? input.startedAt;
  const scope = [
    typeof input.maxPages === "number"
      ? t("{count} sayfa tarandı (üst sınır {max})", {
          count: input.pagesCrawled,
          max: formatCount(input.maxPages),
        })
      : t("{count} sayfa tarandı", { count: input.pagesCrawled }),
    input.lighthouseMode === "none"
      ? t("hız ölçümü kapalı")
      : input.lighthouse.length > 0
        ? t("hız ölçümü var")
        : t("hız ölçümü yok"),
    input.indexCoverage && input.indexCoverage.asked > 0
      ? t("Google dizin verisi var")
      : t("Google dizin verisi yok"),
  ].join(" · ");

  return `<section class="cover" id="ozet">
    <p class="eyebrow">${t("Site denetim raporu")}</p>
    <h1>${escapeHtml(hostOf(input.siteUrl))}</h1>
    <p class="sub sub--url">${escapeHtml(input.siteUrl)}</p>
    <p class="sub">${escapeHtml(
      t("Denetim tarihi: {date} ({dateTime}) · Kapsam: {scope}", {
        date: formatDate(when),
        dateTime: formatDateTime(when),
        scope,
      }),
    )}</p>
    ${reliable ? "" : `<div class="callout callout--warn"><p><strong>${t("Rapor eksik olabilir.")}</strong> ${escapeHtml(statusNote(input.status))} ${escapeHtml(t(UNRELIABLE_NOTE))}</p></div>`}
    <div class="scorebox">
      ${gauge(score)}
      <div>
        <p class="score-label">${t("Site puanı")}</p>
        <p class="verdict">${escapeHtml(scoreVerdict(score, reliable))}</p>
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
      </div>
    </div>
    <div class="cards">
      ${card(t("Taranan sayfa"), formatCount(input.pagesCrawled))}
      ${card(t("Kritik sorun türü"), formatCount(counts.critical), counts.critical > 0 ? "critical" : undefined)}
      ${card(t("Uyarı türü"), formatCount(counts.warning), counts.warning > 0 ? "warning" : undefined)}
      ${card(t("Bilgi türü"), formatCount(counts.info))}
      ${card(t("Dizine girebilir"), `${formatCount(stats.indexable)} / ${formatCount(input.pagesCrawled)}`)}
      ${card(t("Ortalama yanıt"), formatMs(stats.avgResponseMs))}
    </div>
    ${actionPlan(groups, reliable)}
  </section>`;
}
