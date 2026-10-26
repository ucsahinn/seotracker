import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
import {
  capList,
  detailsHtml,
  escapeHtml,
  moreLine,
  truncateUrl,
} from "./reportFormat";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  SEVERITIES,
  SEVERITY_LABEL,
  type IssueGroup,
} from "./reportModel";
import { chip, issueAnchor } from "./reportSections";
import { DEFAULT_CAPS, type ReportCaps } from "./reportTypes";

/** Affected pages printed under each issue type; the rest go to the appendix. */
export const ISSUE_PAGE_CAP = DEFAULT_CAPS.issuePages;
/** Per issue type in the appendix. The whole-appendix cap comes from the caller. */
const APPENDIX_PER_ISSUE_CAP = 500;

/** Addresses are cut at `urlChars`; the full value is in the audit's own export. */
function rowLabel(row: IssueGroup["rows"][number], urlChars: number): string {
  return row.siteLevel ? t("Tüm site") : truncateUrl(row.url, urlChars);
}

function rowsTable(rows: IssueGroup["rows"], caps: ReportCaps): string {
  const hasDetail = rows.some((row) => row.details.length > 0);
  return `<table class="rows">
    <thead><tr><th>${t("Etkilenen adres")}</th>${hasDetail ? `<th>${t("Ayrıntı")}</th>` : ""}</tr></thead>
    <tbody>${rows
      .map(
        (row) =>
          `<tr><td class="url">${escapeHtml(rowLabel(row, caps.urlChars))}</td>${hasDetail ? `<td class="detail">${detailsHtml(row.details, caps.detailChars)}</td>` : ""}</tr>`,
      )
      .join("")}</tbody>
  </table>`;
}

function issueArticle(group: IssueGroup, caps: ReportCaps): string {
  const { shown, hidden } = capList(group.rows, caps.issuePages);
  const scope = group.siteLevel
    ? t("Tüm siteyi ilgilendiriyor")
    : t("{count} sayfa", { count: group.pageCount });
  return `<article class="issue${shown.length > 12 ? " issue--long" : ""}" id="${issueAnchor(group.issueType)}">
    <div class="issue-head">
      ${chip(group.severity)}
      <span class="cat">${t(CATEGORY_LABEL[group.category])}</span>
      <h4>${escapeHtml(group.title)}</h4>
      <span class="issue-count">${escapeHtml(scope)}</span>
    </div>
    ${group.explanation ? `<p class="why"><strong>${t("Ne demek, neden önemli:")}</strong> ${escapeHtml(group.explanation)}</p>` : ""}
    ${group.howToFix ? `<p class="fix"><strong>${t("Nasıl düzeltilir:")}</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    ${shown.length > 0 ? rowsTable(shown, caps) : ""}
    ${moreLine(hidden, group.siteLevel ? "record" : "address")}
    ${hidden > 0 ? `<p class="note">${t('Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.')}</p>` : ""}
  </article>`;
}

/** Severity, then category, then the pages-affected order the model gave. */
export function issuesSection(
  groups: IssueGroup[],
  caps: ReportCaps,
  omittedTypes: number,
  reliable: boolean,
): string {
  if (groups.length === 0) {
    return `<section id="sorunlar">
      <h2>${t("4. Sorunlar")}</h2>
      <p class="empty">${reliable ? t("Bu denetimde kayıtlı sorun yok.") : t("Sorun listesi eksik olabilir (denetim tamamlanmadı).")}</p>
    </section>`;
  }
  const blocks = SEVERITIES.map((severity) => {
    const inSeverity = groups.filter((g) => g.severity === severity);
    if (inSeverity.length === 0) return "";
    const categories = CATEGORY_ORDER.map((category) => {
      const items = inSeverity.filter((g) => g.category === category);
      if (items.length === 0) return "";
      return `<h3 class="cat-head">${t(CATEGORY_LABEL[category])} <span class="cat-n">${t("{count} tür", { count: items.length })}</span></h3>
        ${items.map((g) => issueArticle(g, caps)).join("")}`;
    }).join("");
    return `<div class="sev-block sev-block--${severity}">
      <h3 class="sev-head">${t(SEVERITY_LABEL[severity])} <span class="cat-n">${t("{count} sorun türü", { count: inSeverity.length })}</span></h3>
      ${categories}
    </div>`;
  }).join("");
  return `<section id="sorunlar">
    <h2>${t("4. Sorunlar")}</h2>
    <p class="note">${t("Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla {count} adres yazılır.", { count: caps.issuePages })}</p>
    ${blocks}
    ${moreLine(omittedTypes, "issueType")}
  </section>`;
}

/**
 * The addresses that did not fit under their issue, so a long list is cut
 * with a reason rather than silently. Compact on purpose: it is a lookup
 * table, not something anyone reads front to back.
 */
export function appendixSection(
  groups: IssueGroup[],
  caps: Pick<ReportCaps, "issuePages" | "appendix" | "urlChars">,
): string {
  let budget = caps.appendix;
  let dropped = 0;
  const blocks: string[] = [];
  for (const group of groups) {
    const rest = group.rows.slice(caps.issuePages);
    if (rest.length === 0) continue;
    const take = Math.min(rest.length, APPENDIX_PER_ISSUE_CAP, budget);
    budget -= take;
    dropped += rest.length - take;
    if (take === 0) continue;
    blocks.push(`<h4 class="ap-head">${escapeHtml(group.title)} <span class="cat-n">${t("{take} / {count} adres", { take: formatCount(take), count: rest.length })}</span></h4>
      <ul class="ap-list">${rest
        .slice(0, take)
        .map((row) => `<li>${escapeHtml(rowLabel(row, caps.urlChars))}</li>`)
        .join("")}</ul>`);
  }
  if (blocks.length === 0 && dropped === 0) return "";
  return `<section id="ek-adresler">
    <h2>${t("Ek A. Kalan etkilenen adresler")}</h2>
    <p class="note">${t("Sorunların altında gösterilen ilk {count} adresin ötesindekiler.", { count: caps.issuePages })}</p>
    ${blocks.join("")}
    ${moreLine(dropped, "address")}
  </section>`;
}
