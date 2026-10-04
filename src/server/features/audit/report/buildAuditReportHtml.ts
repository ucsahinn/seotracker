import { isDeepEqual } from "remeda";
import { formatCount, formatDate, formatDateTime } from "@/shared/format";
import { escapeHtml, hostOf } from "./reportFormat";
import { appendixSection, issuesSection } from "./reportIssueSections";
import { indexSection, sitemapSection } from "./reportIndexSections";
import {
  countSeverities,
  describePages,
  groupIssues,
  isReliable,
  siteScore,
} from "./reportModel";
import { coverSection } from "./reportCoverSection";
import { methodSection } from "./reportMethodSection";
import { pagesSection } from "./reportPagesSection";
import {
  overviewSection,
  tocSection,
  type ReportContext,
} from "./reportSections";
import { speedSection } from "./reportSpeedSection";
import { STYLES } from "./reportStyles";
import {
  DEFAULT_CAPS,
  type AuditReportDocument,
  type AuditReportInput,
  type ReportCaps,
} from "./reportTypes";

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
 * Dates go through `@/shared/format`, the app's one formatting module
 * (tr-TR; it also reads SQLite's timezone-less stamps as UTC, which a local
 * `new Date(...)` here did not).
 */

/*
 * The reports table refuses a document above 500 000 bytes. Every address
 * costs bytes (a "/" is five once escaped), so a 10 000-page site with long
 * URLs would be refused at save time. The builder instead halves its list
 * caps until the document is under this budget, which leaves headroom.
 */
const BYTE_BUDGET = 400_000;
/* Lists shrink to MIN_CAPS first; only then do the lean steps below start. */
const MIN_CAPS = { issuePages: 5, appendix: 0, pages: 10, speed: 10 };
const MIN_URL_CHARS = 40;
const MIN_DETAIL_CHARS = 20;

const TOC_ITEMS = [
  { href: "genel", label: "1. Genel görünüm" },
  { href: "sorunlar", label: "2. Sorunlar" },
  { href: "hiz", label: "3. Hız ölçümü" },
  { href: "dizin", label: "4. Google dizin durumu" },
  { href: "sitemap", label: "5. Site haritası" },
  { href: "yontem", label: "6. Yöntem ve sınırlar" },
  { href: "ek-adresler", label: "Ek A. Kalan etkilenen adresler" },
  { href: "sayfalar", label: "Ek B. Taranan sayfalar" },
];

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

const half = (n: number) => Math.floor(n / 2);

/*
 * One step smaller, or null when nothing is left to give. First the lists
 * halve down to MIN_CAPS. Past that the "lean" steps start: the parts that
 * have no list cap (address length, details, the number of issue types listed)
 * shrink and the lists go to zero, so a pathological audit still fits.
 */
function shrink(caps: ReportCaps): ReportCaps | null {
  const lean =
    caps.issuePages <= MIN_CAPS.issuePages &&
    caps.pages <= MIN_CAPS.pages &&
    caps.speed <= MIN_CAPS.speed &&
    caps.appendix === 0;
  const floor = lean ? 0 : undefined;
  const next: ReportCaps = {
    issuePages: Math.max(floor ?? MIN_CAPS.issuePages, half(caps.issuePages)),
    appendix: half(caps.appendix),
    pages: Math.max(floor ?? MIN_CAPS.pages, half(caps.pages)),
    speed: Math.max(floor ?? MIN_CAPS.speed, half(caps.speed)),
    urlChars: lean
      ? Math.max(MIN_URL_CHARS, half(caps.urlChars))
      : caps.urlChars,
    detailChars: lean
      ? Math.max(MIN_DETAIL_CHARS, half(caps.detailChars))
      : caps.detailChars,
    issueTypes: lean ? half(caps.issueTypes) : caps.issueTypes,
  };
  return isDeepEqual(next, caps) ? null : next;
}

function renderBody(ctx: ReportContext, caps: ReportCaps): string {
  const { input } = ctx;
  const groups = ctx.groups.slice(0, caps.issueTypes);
  // The appendix is empty unless some issue type overflows its list; a table
  // of contents entry for a section that is not there would be a dead link.
  const appendix = appendixSection(groups, caps);
  const toc = TOC_ITEMS.filter(
    (item) => item.href !== "ek-adresler" || appendix,
  );
  return `${coverSection(ctx)}
  ${tocSection(toc, groups)}
  ${overviewSection(ctx)}
  ${issuesSection(groups, caps, ctx.groups.length - groups.length, ctx.reliable)}
  ${speedSection(input, caps.speed)}
  ${indexSection(input)}
  ${sitemapSection(input, groups)}
  ${methodSection(input, caps)}
  ${appendix}
  ${pagesSection(input, caps.pages)}`;
}

export function buildAuditReportHtml(
  input: AuditReportInput,
): AuditReportDocument {
  const host = hostOf(input.siteUrl);
  const stamp = input.completedAt ?? input.startedAt;
  const groups = groupIssues(input);
  const counts = countSeverities(groups);
  const reliable = isReliable(input);
  // A failed or running audit has no trustworthy score; do not print one.
  const score = reliable ? siteScore(groups, input.pagesCrawled).score : null;
  const ctx: ReportContext = {
    input,
    groups,
    counts,
    score,
    reliable,
    stats: describePages(input.pages),
  };

  /*
   * Titles are unique per project, and the saved report is found again by
   * title, so the whole audit id is in it: a prefix would let two audits that
   * share it overwrite each other's report. The host is what gets cut when the
   * title is too long, never the suffix.
   */
  const suffix = ` - ${formatDate(stamp)}${input.auditId ? ` · ${input.auditId}` : ""}`;
  const title = `${`${host} site denetimi`.slice(0, 120 - suffix.length)}${suffix}`;
  const summary = [
    `${host} için ${formatCount(input.pagesCrawled)} sayfa tarandı.`,
    score === null ? "" : `Site puanı ${formatCount(score)}/100.`,
    counts.total === 0
      ? reliable
        ? "Kayıtlı sorun yok."
        : "Denetim tamamlanmadığı için sorun listesi eksik olabilir."
      : `${formatCount(counts.total)} sorun türü bulundu: ${formatCount(counts.critical)} kritik, ${formatCount(counts.warning)} uyarı, ${formatCount(counts.info)} bilgi.`,
    groups.length > 0
      ? `En çok sayfayı etkileyen: ${groups[0].title} (${formatCount(groups[0].pageCount)} sayfa).`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  let caps: ReportCaps = { ...DEFAULT_CAPS, issueTypes: groups.length };
  let html = "";
  for (;;) {
    html = page(title, host, stamp, renderBody(ctx, caps));
    if (byteLength(html) <= BYTE_BUDGET) break;
    const next = shrink(caps);
    if (!next) break;
    caps = next;
  }

  return { title, summary: summary.slice(0, 2500), html };
}

function page(
  title: string,
  host: string,
  stamp: string,
  main: string,
): string {
  return `<!doctype html>
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
  ${main}
  <footer>
    <p>seotracker ile üretildi. Bu dosya kendi kendine yeter: açmak için
    internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.</p>
  </footer>
</main>
</body>
</html>`;
}
