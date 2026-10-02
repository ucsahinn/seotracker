import { sort } from "remeda";
import { formatCount, formatDate, formatDateTime } from "@/shared/format";
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
  return group.siteLevel ? "tüm site" : `${formatCount(group.pageCount)} sayfa`;
}

function pointsText(group: IssueGroup): string {
  return group.points < 1
    ? "+1 puandan az"
    : `+${formatCount(group.points)} puan`;
}

/** The addresses that show the reader where to start, and how many more there are. */
function samplePages(group: IssueGroup): string {
  if (group.siteLevel) return `<p class="todo-pages">Etkilenen: tüm site</p>`;
  const urls = [...new Set(group.rows.filter((r) => r.url).map((r) => r.url))];
  const shown = urls.slice(0, SAMPLE_URLS);
  const rest = group.pageCount - shown.length;
  return `<ul class="todo-pages">${shown
    .map((u) => `<li>${escapeHtml(truncateUrl(u, 90))}</li>`)
    .join(
      "",
    )}${rest > 0 ? `<li class="more">ve ${formatCount(rest)} sayfa daha (ayrıntı sorun bölümünde)</li>` : ""}</ul>`;
}

function todoItem(group: IssueGroup): string {
  return `<li class="todo">
    <div class="todo-head">
      <a href="#${issueAnchor(group.issueType)}" class="todo-title">${escapeHtml(group.title)}</a>
      ${chip(group.severity)}
      <span class="fix-meta">${scopeText(group)} · ${pointsText(group)}</span>
    </div>
    ${group.howToFix ? `<p><strong>Ne yapılmalı:</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    ${group.explanation ? `<p class="why"><strong>Neden:</strong> ${escapeHtml(group.explanation)}</p>` : ""}
    ${samplePages(group)}
  </li>`;
}

function actionPlan(groups: IssueGroup[], reliable: boolean): string {
  const ranked = sort(
    groups.filter((g) => g.points > 0),
    (a, b) => b.points - a.points,
  );
  if (ranked.length === 0) {
    return `<h2>Bu hafta yapılacaklar</h2><p class="empty">${reliable ? "Düzeltilecek kayıtlı sorun yok." : "Düzeltilecek sorun listesi eksik olabilir."}</p>`;
  }
  const first = ranked.slice(0, TODO_COUNT);
  const later = ranked.slice(TODO_COUNT, TODO_COUNT + LATER_COUNT);
  return `<h2>Bu hafta yapılacak ${formatCount(first.length)} şey</h2>
    <p class="note">Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.</p>
    <ol class="todos">${first.map(todoItem).join("")}</ol>
    ${
      later.length > 0
        ? `<h3>Sonrasında</h3><ul class="fixlist">${later
            .map(
              (g) =>
                `<li><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a> ${chip(g.severity)} <span class="fix-meta">${scopeText(g)} · ${pointsText(g)}</span></li>`,
            )
            .join("")}</ul>`
        : ""
    }
    <p class="note">Puanlar, o sorun tamamen düzeltilirse site puanına eklenecek yaklaşık değeri gösterir.</p>`;
}

export function coverSection(ctx: ReportContext): string {
  const { input, counts, score, stats, groups, reliable } = ctx;
  const when = input.completedAt ?? input.startedAt;
  const scope = [
    `${formatCount(input.pagesCrawled)} sayfa tarandı${typeof input.maxPages === "number" ? ` (üst sınır ${formatCount(input.maxPages)})` : ""}`,
    input.lighthouseMode === "none"
      ? "hız ölçümü kapalı"
      : input.lighthouse.length > 0
        ? "hız ölçümü var"
        : "hız ölçümü yok",
    input.indexCoverage && input.indexCoverage.asked > 0
      ? "Google dizin verisi var"
      : "Google dizin verisi yok",
  ].join(" · ");

  return `<section class="cover" id="ozet">
    <p class="eyebrow">Site denetim raporu</p>
    <h1>${escapeHtml(hostOf(input.siteUrl))}</h1>
    <p class="sub sub--url">${escapeHtml(input.siteUrl)}</p>
    <p class="sub">Denetim tarihi: ${escapeHtml(formatDate(when))} (${escapeHtml(formatDateTime(when))}) · Kapsam: ${escapeHtml(scope)}</p>
    ${reliable ? "" : `<div class="callout callout--warn"><p><strong>Rapor eksik olabilir.</strong> ${escapeHtml(input.status === "failed" ? "Denetim hata verip durdu." : input.status === "running" ? "Denetim hâlâ çalışıyor." : "Hiç sayfa taranamadı.")} ${escapeHtml(UNRELIABLE_NOTE)}</p></div>`}
    <div class="scorebox">
      ${gauge(score)}
      <div>
        <p class="score-label">Site puanı</p>
        <p class="verdict">${escapeHtml(scoreVerdict(score, reliable))}</p>
        <p class="sub">${counts.total === 0 ? (reliable ? "Kayıtlı sorun yok." : "Sorun sayısı bilinmiyor.") : `${formatCount(counts.total)} sorun türü: ${formatCount(counts.critical)} kritik, ${formatCount(counts.warning)} uyarı, ${formatCount(counts.info)} bilgi.`}</p>
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
    ${actionPlan(groups, reliable)}
  </section>`;
}
