import { formatCount, formatDate, formatDateTime } from "@/client/lib/format";
import { escapeHtml, hostOf } from "./reportFormat";
import { appendixSection, issuesSection } from "./reportIssueSections";
import { indexSection, sitemapSection } from "./reportIndexSections";
import {
  countSeverities,
  describePages,
  groupIssues,
  siteScore,
} from "./reportModel";
import { pagesSection } from "./reportPagesSection";
import {
  coverSection,
  overviewSection,
  tocSection,
  type ReportContext,
} from "./reportSections";
import { speedSection } from "./reportSpeedSection";
import { STYLES } from "./reportStyles";
import type { AuditReportDocument, AuditReportInput } from "./reportTypes";

/*
 * The report is one self-contained file.
 *
 * It is stored in the reports table, served by /r/<id>, and saved to disk by
 * whoever downloads it -- so it has to render years later on a machine with no
 * network, no stylesheet and no font. Everything is inline: no CDN, no
 * external font, no script. The charts are inline SVG drawn from the numbers,
 * not a library. Print it to PDF from the browser: the stylesheet lays it out
 * for A4, one section per page, with a running header.
 *
 * Dates go through `@/client/lib/format`, the app's one formatting module
 * (tr-TR; it also reads SQLite's timezone-less stamps as UTC, which a local
 * `new Date(...)` here did not).
 */

const TOC_ITEMS = [
  { href: "genel", label: "1. Genel görünüm" },
  { href: "sorunlar", label: "2. Sorunlar" },
  { href: "hiz", label: "3. Hız ölçümü" },
  { href: "dizin", label: "4. Google dizin durumu" },
  { href: "sitemap", label: "5. Site haritası" },
  { href: "ek-adresler", label: "Ek A. Kalan etkilenen adresler" },
  { href: "sayfalar", label: "Ek B. Taranan sayfalar" },
];

export function buildAuditReportHtml(
  input: AuditReportInput,
): AuditReportDocument {
  const host = hostOf(input.siteUrl);
  const stamp = input.completedAt ?? input.startedAt;
  const groups = groupIssues(input);
  const counts = countSeverities(groups);
  const { score } = siteScore(groups, input.pagesCrawled);
  const ctx: ReportContext = {
    input,
    groups,
    counts,
    score,
    stats: describePages(input.pages),
  };

  const title = `${host} site denetimi - ${formatDate(stamp)}`;
  const summary = [
    `${host} için ${formatCount(input.pagesCrawled)} sayfa tarandı.`,
    score === null ? "" : `Site puanı ${formatCount(score)}/100.`,
    counts.total === 0
      ? "Kayıtlı sorun yok."
      : `${formatCount(counts.total)} sorun türü bulundu: ${formatCount(counts.critical)} kritik, ${formatCount(counts.warning)} uyarı, ${formatCount(counts.info)} bilgi.`,
    groups.length > 0
      ? `En çok sayfayı etkileyen: ${groups[0].title} (${formatCount(groups[0].pageCount)} sayfa).`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
<div class="running">${escapeHtml(host)} · Site denetim raporu · ${escapeHtml(formatDateTime(stamp))}</div>
<main>
  ${coverSection(ctx)}
  ${tocSection(TOC_ITEMS, groups)}
  ${overviewSection(ctx)}
  ${issuesSection(groups)}
  ${speedSection(input)}
  ${indexSection(input)}
  ${sitemapSection(input, groups)}
  ${appendixSection(groups)}
  ${pagesSection(input)}
  <footer>
    <p>seotracker ile üretildi. Bu dosya kendi kendine yeter: açmak için
    internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.</p>
  </footer>
</main>
</body>
</html>`;

  return { title: title.slice(0, 120), summary: summary.slice(0, 2500), html };
}
