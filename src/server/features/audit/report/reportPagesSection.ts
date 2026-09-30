import { sort } from "remeda";
import { formatCount } from "@/client/lib/format";
import {
  capList,
  escapeHtml,
  formatMs,
  moreLine,
  truncate,
} from "./reportFormat";
import type { AuditReportInput } from "./reportTypes";

/** Pages in the appendix table. A 500-page crawl stays a readable file. */
const PAGES_TABLE_CAP = 300;

function yesNo(value: boolean): string {
  return value ? "Evet" : "Hayır";
}

export function pagesSection(input: AuditReportInput): string {
  if (input.pages.length === 0) {
    return `<section id="sayfalar">
      <h2>Ek B. Taranan sayfalar</h2>
      <p class="empty">Kayıtlı sayfa yok.</p>
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
  const { shown, hidden } = capList(ordered, PAGES_TABLE_CAP);

  return `<section id="sayfalar">
    <h2>Ek B. Taranan sayfalar</h2>
    <p class="note">${formatCount(input.pages.length)} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.</p>
    <table class="rows pages">
      <thead><tr><th>Adres</th><th>Durum</th><th class="num">Derinlik</th><th class="num">Başlık</th><th>Dizine girer</th><th>Haritada</th><th class="num">Yanıt</th><th class="num">Sorun</th></tr></thead>
      <tbody>${shown
        .map(
          (p) => `<tr>
        <td class="url">${escapeHtml(truncate(p.url, 110))}${p.redirectUrl ? `<br><span class="detail">Yönlenir: ${escapeHtml(truncate(p.redirectUrl, 90))}</span>` : ""}</td>
        <td>${p.statusCode === null ? "--" : formatCount(p.statusCode)}</td>
        <td class="num">${p.crawlDepth === null || p.crawlDepth === undefined ? "--" : formatCount(p.crawlDepth)}</td>
        <td class="num">${p.title ? formatCount(p.title.trim().length) : "yok"}</td>
        <td>${yesNo(p.isIndexable)}</td>
        <td>${yesNo(p.inSitemap)}</td>
        <td class="num">${escapeHtml(formatMs(p.responseTimeMs))}</td>
        <td class="num">${formatCount(issueCount.get(p.url) ?? 0)}</td>
      </tr>`,
        )
        .join("")}</tbody>
    </table>
    ${moreLine(hidden, "sayfa")}
  </section>`;
}
