import { isDeepEqual } from "remeda";
import {
  formatCount,
  formatDate,
  formatDateTime,
  formatPercent,
} from "@/shared/format";
import { getLocale, t } from "@/shared/i18n";
import { escapeHtml, hostOf } from "./reportFormat";
import { appendixSection, issuesSection } from "./reportIssueSections";
import { indexSection, sitemapSection } from "./reportIndexSections";
import {
  countSeverities,
  describePages,
  groupIssues,
  isReliable,
} from "./reportModel";
import { coverSection, statusNote } from "./reportCoverSection";
import { methodSection } from "./reportMethodSection";
import { pagesSection } from "./reportPagesSection";
import {
  overviewSection,
  tocSection,
  type ReportContext,
} from "./reportSections";
import { speedSection } from "./reportSpeedSection";
import { STYLES } from "./reportStyles";
import { buildAuditBreakdown } from "@/shared/auditBreakdown";
import { auditStanding } from "@/shared/auditStanding";
import { pageKey, rankTodos, todoInputs } from "@/shared/auditTodo";
import { factsSection } from "./reportFactsSection";
import { passedAppendix, scoreSection } from "./reportScoreSection";
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
 * Text is in the request's language (`t`), and dates go through
 * `@/shared/format`, the app's one formatting module (it also reads SQLite's timezone-less stamps as UTC, which a local
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

/* Turkish source labels, shown through t() in the table of contents. */
const TOC_ITEMS = [
  { href: "puanlar", label: "1. Puan dağılımı ve kontroller" },
  { href: "anlik-veri", label: "2. Anlık veri" },
  { href: "genel", label: "3. Genel görünüm" },
  { href: "sorunlar", label: "4. Sorunlar" },
  { href: "hiz", label: "5. Hız ölçümü" },
  { href: "dizin", label: "6. Google dizin durumu" },
  { href: "sitemap", label: "7. Site haritası" },
  { href: "yontem", label: "8. Yöntem ve sınırlar" },
  { href: "ek-adresler", label: "Ek A. Kalan etkilenen adresler" },
  { href: "sayfalar", label: "Ek B. Taranan sayfalar" },
  { href: "gecen-kontroller", label: "Ek C. Geçen ve ölçülemeyen kontroller" },
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
  // The screenshot is tens of kilobytes of one picture: it goes before any list.
  if (caps.screenshot) return { ...caps, screenshot: false };
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
    screenshot: false,
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
    (item) =>
      (item.href !== "ek-adresler" || appendix) &&
      // The score sections are left out of an incomplete audit.
      (ctx.reliable ||
        (item.href !== "puanlar" && item.href !== "gecen-kontroller")),
  );
  return `${coverSection(ctx)}
  ${tocSection(toc, groups)}
  ${scoreSection(ctx)}
  ${factsSection(ctx, caps.screenshot)}
  ${overviewSection(ctx)}
  ${issuesSection(groups, caps, ctx.groups.length - groups.length, ctx.reliable)}
  ${speedSection(input, caps.speed)}
  ${indexSection(input)}
  ${sitemapSection(input, groups)}
  ${methodSection(input, caps)}
  ${appendix}
  ${pagesSection(input, caps.pages)}
  ${passedAppendix(ctx)}`;
}

export function buildAuditReportHtml(
  input: AuditReportInput,
): AuditReportDocument {
  const host = hostOf(input.siteUrl);
  const stamp = input.completedAt ?? input.startedAt;
  const grouped = groupIssues(input);
  const counts = countSeverities(grouped);
  const reliable = isReliable(input);
  // The same breakdown the app scores with, so the numbers agree.
  const breakdown = buildAuditBreakdown(
    grouped.map((g) => ({
      issueType: g.issueType,
      severity: g.severity,
      pages: g.pageCount,
      siteLevel: g.siteLevel,
    })),
    {
      pagesCrawled: input.pagesCrawled,
      hasLighthouse: input.lighthouse.some((r) => r.performanceScore !== null),
      siteFacts: input.siteFacts ?? null,
      googleInspected: input.insights?.googleInspected ?? null,
      analyticsCompared: input.analyticsCompared ?? null,
    },
  );
  const gains = new Map(
    breakdown.gains.map((gain) => [gain.issueType, gain.points]),
  );
  const groups = grouped.map((group) => ({
    ...group,
    points: gains.get(group.issueType) ?? 0,
  }));
  /*
   * A failed, running or cut-short audit has no trustworthy score; do not
   * print one. A provisional one is printed without a verdict word.
   */
  const standing = auditStanding(breakdown, input.status);
  const score = reliable && standing.kind === "scored" ? standing.score : null;
  const traffic = input.insights?.traffic
    ? new Map(
        input.insights.traffic.rows.map((row) => [
          pageKey(row.url),
          { clicks: row.clicks, impressions: row.impressions },
        ]),
      )
    : null;
  const todos = rankTodos(
    todoInputs(
      input.issues.map((issue) => ({
        issueType: issue.issueType,
        severity: issue.severity ?? "",
        // Older callers pass no page id: a row with a URL is a page's.
        pageId: issue.pageId === undefined ? issue.pageUrl : issue.pageId,
        pageUrl: issue.pageUrl,
        detailsJson: issue.detailsJson,
      })),
      breakdown.gains,
    ),
    traffic,
  );
  const ctx: ReportContext = {
    input,
    groups,
    counts,
    score,
    reliable,
    stats: describePages(input.pages),
    breakdown,
    standing,
    todos,
  };

  /*
   * Titles are unique per project, and the saved report is found again by
   * title, so the whole audit id is in it: a prefix would let two audits that
   * share it overwrite each other's report. The host is what gets cut when the
   * title is too long, never the suffix.
   */
  const suffix = ` - ${formatDate(stamp)}${input.auditId ? ` · ${input.auditId}` : ""}`;
  /*
   * A report from a failed, running or empty audit says so where it is
   * listed, not only inside the document: the reports list shows the title,
   * and agents read the summary. The status of a finished audit does not
   * change, so regenerating the same audit still finds this title.
   */
  const label = reliable
    ? t("{host} site denetimi", { host })
    : t("{host} site denetimi (eksik)", { host });
  const title = `${label.slice(0, 120 - suffix.length)}${suffix}`;
  const summary = [
    reliable
      ? ""
      : t("Eksik rapor: {why} Sorun listesi tam değil.", {
          why: statusNote(input.status),
        }),
    t("{host} için {count} sayfa tarandı.", {
      host,
      count: input.pagesCrawled,
    }),
    score === null ? "" : t("Site puanı {count}/100.", { count: score }),
    standing.kind === "scored" && standing.provisional
      ? t("Kısmi puan — ölçüm kapsamı {percent}", {
          percent: formatPercent(standing.coverage.ratio, 0),
        })
      : "",
    reliable && standing.kind === "withheld" && standing.reason === "cut-short"
      ? t("Eksik denetim — puan verilmedi")
      : "",
    counts.total === 0
      ? reliable
        ? t("Kayıtlı sorun yok.")
        : t("Denetim tamamlanmadığı için sorun listesi eksik olabilir.")
      : t(
          "{count} sorun türü bulundu: {critical} kritik, {warning} uyarı, {info} bilgi.",
          {
            count: counts.total,
            critical: formatCount(counts.critical),
            warning: formatCount(counts.warning),
            info: formatCount(counts.info),
          },
        ),
    groups.length > 0
      ? t("En çok sayfayı etkileyen: {title} ({count} sayfa).", {
          title: groups[0].title,
          count: groups[0].pageCount,
        })
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
<html lang="${getLocale()}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
<div class="running">${escapeHtml(host)} · ${t("Site denetim raporu")} · ${escapeHtml(formatDateTime(stamp))}</div>
<main>
  ${main}
  <footer>
    <p>${t(
      "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.",
    )}</p>
  </footer>
</main>
</body>
</html>`;
}
