import { sort } from "remeda";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
import {
  capList,
  escapeHtml,
  formatMs,
  moreLine,
  truncateUrl,
} from "./reportFormat";
import type { AuditReportInput } from "./reportTypes";

function yesNo(value: boolean): string {
  return value ? t("Evet") : t("Hayır");
}

export function pagesSection(input: AuditReportInput, cap: number): string {
  if (input.pages.length === 0) {
    return `<section id="sayfalar">
      <h2>${t("Ek B. Taranan sayfalar")}</h2>
      <p class="empty">${t("Kayıtlı sayfa yok.")}</p>
    </section>`;
  }
  const issueCount = new Map<string, number>();
  for (const issue of input.issues) {
    if (!issue.pageUrl || issue.pageId === null) continue;
    issueCount.set(issue.pageUrl, (issueCount.get(issue.pageUrl) ?? 0) + 1);
  }
  // Pages with the most findings first: the ones worth opening.
  const ordered = sort(
    input.pages,
    (a, b) =>
      (issueCount.get(b.url) ?? 0) - (issueCount.get(a.url) ?? 0) ||
      a.url.localeCompare(b.url),
  );
  const { shown, hidden } = capList(ordered, cap);

  return `<section id="sayfalar">
    <h2>${t("Ek B. Taranan sayfalar")}</h2>
    <p class="note">${t('{count} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.', { count: input.pages.length })}</p>
    <table class="rows pages">
      <thead><tr><th>${t("Adres")}</th><th>${t("Durum")}</th><th class="num">${t("Derinlik")}</th><th class="num">${t("Başlık")}</th><th>${t("Dizine girer")}</th><th>${t("Haritada")}</th><th class="num">${t("Yanıt")}</th><th class="num">${t("Sorun")}</th></tr></thead>
      <tbody>${shown
        .map(
          (p) => `<tr>
        <td class="url">${escapeHtml(truncateUrl(p.url, 110))}${p.redirectUrl ? `<br><span class="detail">${escapeHtml(t("Yönlenir: {url}", { url: truncateUrl(p.redirectUrl, 90) }))}</span>` : ""}</td>
        <td>${p.statusCode === null ? "--" : formatCount(p.statusCode)}</td>
        <td class="num">${p.crawlDepth === null || p.crawlDepth === undefined ? "--" : formatCount(p.crawlDepth)}</td>
        <td class="num">${p.title ? formatCount(p.title.trim().length) : t("yok")}</td>
        <td>${yesNo(p.isIndexable)}</td>
        <td>${yesNo(p.inSitemap)}</td>
        <td class="num">${escapeHtml(formatMs(p.responseTimeMs))}</td>
        <td class="num">${formatCount(issueCount.get(p.url) ?? 0)}</td>
      </tr>`,
        )
        .join("")}</tbody>
    </table>
    ${moreLine(hidden, "page")}
  </section>`;
}
