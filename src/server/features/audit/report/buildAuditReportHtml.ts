import { sort } from "remeda";
/*
 * The app's one formatting module, not a second copy.
 *
 * It lives under `client/` but imports nothing and touches no browser API;
 * it is the tr-TR locale rules, which the report needs for exactly the
 * reason every screen does. Its date parser also handles SQLite's
 * timezone-less stamps as UTC -- the local `new Date(...)` this file used
 * read them as local time, so the report's dates shifted with the
 * container's timezone.
 */
import { formatCount, formatDate, formatDateTime } from "@/client/lib/format";
import {
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";

/*
 * The report is one self-contained file.
 *
 * It is stored in the reports table, served by /r/<id>, and saved to disk by
 * whoever downloads it — so it has to render years later on a machine with no
 * network, no stylesheet and no font. Everything is inline: no CDN, no
 * external font, no script. The charts are SVG and CSS bars drawn from the
 * numbers, not a library.
 */

type AuditReportInput = {
  siteUrl: string;
  startedAt: string;
  completedAt: string | null;
  pagesCrawled: number;
  pages: Array<{
    url: string;
    statusCode: number | null;
    title: string | null;
    metaDescription: string | null;
    wordCount: number | null;
    responseTimeMs: number | null;
    isIndexable: boolean;
    inSitemap: boolean;
  }>;
  issues: Array<{
    issueType: string;
    severity: string | null;
    pageUrl: string | null;
  }>;
  /*
   * Score and strategy. Every page is measured twice -- mobile and desktop
   * -- so counting rows reported a 10-page sample as "20 sayfa ölçüldü",
   * and mixed two distributions into one. Mobile decides, the same way the
   * speed findings do: Google indexes mobile-first.
   */
  lighthouse: Array<{
    performanceScore: number | null;
    strategy: "mobile" | "desktop";
  }>;
};

type AuditReportDocument = {
  title: string;
  summary: string;
  html: string;
};

const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

const SEVERITY_COLOR: Record<IssueSeverity, string> = {
  critical: "#b4232a",
  warning: "#8a5a00",
  info: "#5b6472",
};

export function buildAuditReportHtml(
  input: AuditReportInput,
): AuditReportDocument {
  const host = hostOf(input.siteUrl);
  const when = formatDateTime(input.completedAt ?? input.startedAt);
  const groups = groupIssues(input.issues);
  const counts = countSeverities(groups);
  const stats = describePages(input.pages);
  const lighthouse = describeLighthouse(input.lighthouse);

  const title = `${host} site denetimi - ${formatDate(input.completedAt ?? input.startedAt)}`;
  const summary = [
    `${host} için ${formatCount(input.pagesCrawled)} sayfa tarandı.`,
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
<main>
  <header class="head">
    <p class="eyebrow">Site denetimi</p>
    <h1>${escapeHtml(host)}</h1>
    <p class="sub">${escapeHtml(when)} · ${escapeHtml(input.siteUrl)}</p>
  </header>

  <section class="cards">
    ${card("Taranan sayfa", formatCount(input.pagesCrawled))}
    ${card("Kritik sorun türü", formatCount(counts.critical), counts.critical > 0 ? "critical" : undefined)}
    ${card("Uyarı türü", formatCount(counts.warning), counts.warning > 0 ? "warning" : undefined)}
    ${card("Ortalama yanıt", stats.avgResponseMs === null ? "--" : `${formatCount(stats.avgResponseMs)} ms`)}
  </section>

  ${indexabilitySection(stats, input.pagesCrawled)}
  ${issuesSection(groups)}
  ${lighthouseSection(lighthouse)}
  ${slowestSection(input.pages)}

  <footer>
    <p>seotracker ile üretildi. Bu dosya kendi kendine yeter: açmak için
    internet bağlantısı gerekmez.</p>
  </footer>
</main>
</body>
</html>`;

  return { title: title.slice(0, 120), summary: summary.slice(0, 2500), html };
}

type IssueGroup = {
  issueType: string;
  title: string;
  severity: IssueSeverity;
  pageCount: number;
  explanation: string;
  howToFix: string;
};

function groupIssues(issues: AuditReportInput["issues"]): IssueGroup[] {
  const byType = new Map<string, { group: IssueGroup; pages: Set<string> }>();
  for (const issue of issues) {
    let entry = byType.get(issue.issueType);
    if (!entry) {
      const descriptor = getIssueDescriptor(issue.issueType);
      entry = {
        group: {
          issueType: issue.issueType,
          title: descriptor?.title ?? issue.issueType,
          // An unset severity falls back to the descriptor's, which is what
          // `resolveIssueSeverity` does with a value it does not recognise.
          severity: resolveIssueSeverity({
            issueType: issue.issueType,
            severity: issue.severity ?? "",
          }),
          pageCount: 0,
          explanation: descriptor?.explanation ?? "",
          howToFix: descriptor?.howToFix ?? "",
        },
        pages: new Set(),
      };
      byType.set(issue.issueType, entry);
    }
    if (issue.pageUrl) entry.pages.add(issue.pageUrl);
  }

  const groups = [...byType.values()].map((entry) => ({
    ...entry.group,
    pageCount: entry.pages.size,
  }));

  /*
   * Severity first, then pages. The reader of a report opens it to answer
   * "what do I fix", and a critical on two pages outranks an info on ninety
   * — the opposite of the in-app chart, which answers "where is the bulk".
   */
  return sort(
    groups,
    (a, b) =>
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
      b.pageCount - a.pageCount,
  );
}

function countSeverities(groups: IssueGroup[]) {
  return {
    total: groups.length,
    critical: groups.filter((g) => g.severity === "critical").length,
    warning: groups.filter((g) => g.severity === "warning").length,
    info: groups.filter((g) => g.severity === "info").length,
  };
}

function describePages(pages: AuditReportInput["pages"]) {
  const timed = pages.filter((page) => page.responseTimeMs !== null);
  const total = timed.reduce(
    (sum, page) => sum + (page.responseTimeMs ?? 0),
    0,
  );
  return {
    indexable: pages.filter((page) => page.isIndexable).length,
    inSitemap: pages.filter((page) => page.inSitemap).length,
    missingTitle: pages.filter((page) => !page.title).length,
    missingDescription: pages.filter((page) => !page.metaDescription).length,
    avgResponseMs: timed.length === 0 ? null : Math.round(total / timed.length),
  };
}

function describeLighthouse(rows: AuditReportInput["lighthouse"]) {
  const scored = rows.filter(
    (row) => row.strategy === "mobile" && row.performanceScore !== null,
  );
  if (scored.length === 0) return null;
  const buckets = { poor: 0, fair: 0, good: 0 };
  for (const row of scored) {
    const score = row.performanceScore ?? 0;
    if (score >= 90) buckets.good += 1;
    else if (score >= 50) buckets.fair += 1;
    else buckets.poor += 1;
  }
  return { measured: scored.length, ...buckets };
}

function card(label: string, value: string, tone?: "critical" | "warning") {
  return `<div class="card${tone ? ` card--${tone}` : ""}">
    <p class="card-label">${escapeHtml(label)}</p>
    <p class="card-value">${escapeHtml(value)}</p>
  </div>`;
}

function indexabilitySection(
  stats: ReturnType<typeof describePages>,
  crawled: number,
) {
  const rows: Array<[string, number]> = [
    ["Dizine girebilir", stats.indexable],
    ["Site haritasında", stats.inSitemap],
    ["Başlığı yok", stats.missingTitle],
    ["Meta açıklaması yok", stats.missingDescription],
  ];
  return `<section>
    <h2>Sayfa durumu</h2>
    <table class="bars">
      ${rows
        .map(
          ([label, value]) => `<tr>
        <th scope="row">${escapeHtml(label)}</th>
        <td class="bar-cell"><span class="bar" style="width:${percent(value, crawled)}%"></span></td>
        <td class="num">${formatCount(value)}</td>
      </tr>`,
        )
        .join("")}
    </table>
    <p class="note">${formatCount(crawled)} taranan sayfaya oranla.</p>
  </section>`;
}

function issuesSection(groups: IssueGroup[]) {
  if (groups.length === 0) {
    return `<section>
      <h2>Sorunlar</h2>
      <p class="empty">Bu denetimde kayıtlı sorun yok.</p>
    </section>`;
  }
  const max = Math.max(...groups.map((group) => group.pageCount), 1);
  return `<section>
    <h2>Sorunlar</h2>
    <p class="note">Önem derecesine, sonra etkilenen sayfa sayısına göre sıralı.</p>
    ${groups
      .map(
        (group) => `<article class="issue">
      <div class="issue-head">
        <span class="chip chip--${group.severity}">${SEVERITY_LABEL[group.severity]}</span>
        <h3>${escapeHtml(group.title)}</h3>
        <span class="issue-count">${formatCount(group.pageCount)} sayfa</span>
      </div>
      <div class="issue-bar"><span style="width:${percent(group.pageCount, max)}%;background:${SEVERITY_COLOR[group.severity]}"></span></div>
      ${group.explanation ? `<p>${escapeHtml(group.explanation)}</p>` : ""}
      ${group.howToFix ? `<p class="fix"><strong>Nasıl düzeltilir:</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    </article>`,
      )
      .join("")}
  </section>`;
}

function lighthouseSection(summary: ReturnType<typeof describeLighthouse>) {
  if (!summary) return "";
  const rows: Array<[string, number, string]> = [
    ["İyi (90-100)", summary.good, "#1c7a4a"],
    ["Orta (50-89)", summary.fair, "#8a5a00"],
    ["Zayıf (0-49)", summary.poor, "#b4232a"],
  ];
  return `<section>
    <h2>Hız ölçümü</h2>
    <p class="note">${formatCount(summary.measured)} sayfa mobilde ölçüldü. Ortalama tek bir sayı olarak "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.</p>
    <table class="bars">
      ${rows
        .map(
          ([label, value, color]) => `<tr>
        <th scope="row">${escapeHtml(label)}</th>
        <td class="bar-cell"><span class="bar" style="width:${percent(value, summary.measured)}%;background:${color}"></span></td>
        <td class="num">${formatCount(value)}</td>
      </tr>`,
        )
        .join("")}
    </table>
  </section>`;
}

/** The ten slowest pages, because that is a list someone can act on today. */
function slowestSection(pages: AuditReportInput["pages"]) {
  const slowest = sort(
    pages.filter((page) => page.responseTimeMs !== null),
    (a, b) => (b.responseTimeMs ?? 0) - (a.responseTimeMs ?? 0),
  ).slice(0, 10);
  if (slowest.length === 0) return "";
  return `<section>
    <h2>En yavaş sayfalar</h2>
    <table class="rows">
      <thead><tr><th>Adres</th><th class="num">Yanıt</th></tr></thead>
      <tbody>
        ${slowest
          .map(
            (page) => `<tr>
          <td class="url">${escapeHtml(page.url)}</td>
          <td class="num">${formatCount(page.responseTimeMs ?? 0)} ms</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </section>`;
}

function percent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 1000) / 10;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/*
 * Every interpolated value goes through this. Page titles, meta descriptions
 * and URLs come from crawled third-party HTML, so the report is assembling a
 * document out of somebody else's input.
 */
function escapeHtml(value: string): string {
  /*
   * Both quote styles and the slash. Every attribute in this file is
   * double-quoted today, so `'` is belt and braces -- but a single-quoted
   * one added later would be a hole nobody would think to look for, and
   * `/` closes the `</script>`-inside-a-string case the same way.
   */
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#47;");
}

const STYLES = `
:root{--ink:#16191d;--muted:#5b6472;--line:#e3e6ea;--bg:#fbfbfc;--surface:#fff;--accent:#1d3b6e}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-variant-numeric:tabular-nums}
main{max-width:860px;margin:0 auto;padding:40px 20px 64px}
.head{border-bottom:1px solid var(--line);padding-bottom:20px;margin-bottom:28px}
.eyebrow{margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
h1{margin:6px 0 4px;font-size:30px;line-height:1.15;letter-spacing:-.02em}
.sub{margin:0;color:var(--muted);font-size:13px;word-break:break-all}
h2{font-size:17px;margin:34px 0 10px;letter-spacing:-.01em}
h3{font-size:15px;margin:0;font-weight:600}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.card--critical{border-color:#e6b9bb}.card--warning{border-color:#e6d2a8}
.card-label{margin:0;font-size:12px;color:var(--muted)}
.card-value{margin:4px 0 0;font-size:24px;font-weight:600;letter-spacing:-.02em}
table{width:100%;border-collapse:collapse}
.bars th{text-align:left;font-weight:500;font-size:13px;padding:5px 12px 5px 0;white-space:nowrap;color:var(--muted)}
.bar-cell{width:100%;padding:5px 0}
.bar{display:block;height:8px;border-radius:999px;background:var(--accent);min-width:2px}
.num{text-align:right;padding-left:12px;font-size:13px;white-space:nowrap}
.note{color:var(--muted);font-size:12.5px;margin:6px 0 0}
.empty{color:var(--muted)}
.issue{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-top:10px}
.issue-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.issue-count{margin-left:auto;font-size:13px;color:var(--muted);white-space:nowrap}
.issue-bar{height:6px;background:#eef0f3;border-radius:999px;margin:10px 0;overflow:hidden}
.issue-bar span{display:block;height:100%;border-radius:999px;min-width:2px}
.issue p{margin:6px 0 0;font-size:13.5px;color:var(--muted)}
.fix{color:var(--ink)!important}
.chip{font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid currentColor;font-weight:600}
.chip--critical{color:#b4232a}.chip--warning{color:#8a5a00}.chip--info{color:#5b6472}
.rows{background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-top:8px}
.rows th{text-align:left;font-size:12px;color:var(--muted);font-weight:500;padding:9px 14px;border-bottom:1px solid var(--line)}
.rows td{padding:9px 14px;border-bottom:1px solid var(--line);font-size:13px}
.rows tr:last-child td{border-bottom:0}
.url{word-break:break-all}
footer{margin-top:40px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}
@media print{body{background:#fff}main{padding:0}.card,.issue,.rows{break-inside:avoid}}
@media (prefers-color-scheme:dark){
:root{--ink:#e8eaed;--muted:#a3abb7;--line:#2b3138;--bg:#15181c;--surface:#1b1f24;--accent:#7aa2e3}
.issue-bar{background:#262b31}
.chip--critical{color:#f0908f}.chip--warning{color:#e3bb72}.chip--info{color:#a3abb7}
}
`;
