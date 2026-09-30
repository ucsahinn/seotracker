import { formatCount } from "@/client/lib/format";
import { capList, escapeHtml, moreLine } from "./reportFormat";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  SEVERITIES,
  SEVERITY_LABEL,
  type IssueGroup,
} from "./reportModel";
import { chip, issueAnchor } from "./reportSections";

/** Affected pages printed under each issue type; the rest go to the appendix. */
export const ISSUE_PAGE_CAP = 50;
/** Per issue type in the appendix, and across the whole appendix. */
const APPENDIX_PER_ISSUE_CAP = 500;
const APPENDIX_TOTAL_CAP = 3000;

function rowLabel(row: IssueGroup["rows"][number]): string {
  return row.siteLevel ? "Tüm site" : row.url;
}

function rowsTable(rows: IssueGroup["rows"]): string {
  const hasDetail = rows.some((row) => row.detail !== "");
  return `<table class="rows">
    <thead><tr><th>Etkilenen adres</th>${hasDetail ? "<th>Ayrıntı</th>" : ""}</tr></thead>
    <tbody>${rows
      .map(
        (row) =>
          `<tr><td class="url">${escapeHtml(rowLabel(row))}</td>${hasDetail ? `<td class="detail">${escapeHtml(row.detail)}</td>` : ""}</tr>`,
      )
      .join("")}</tbody>
  </table>`;
}

function issueArticle(group: IssueGroup): string {
  const { shown, hidden } = capList(group.rows, ISSUE_PAGE_CAP);
  const scope = group.siteLevel
    ? "Tüm siteyi ilgilendiriyor"
    : `${formatCount(group.pageCount)} sayfa`;
  return `<article class="issue" id="${issueAnchor(group.issueType)}">
    <div class="issue-head">
      ${chip(group.severity)}
      <span class="cat">${CATEGORY_LABEL[group.category]}</span>
      <h4>${escapeHtml(group.title)}</h4>
      <span class="issue-count">${escapeHtml(scope)}</span>
    </div>
    ${group.explanation ? `<p class="why">${escapeHtml(group.explanation)}</p>` : ""}
    ${group.howToFix ? `<p class="fix"><strong>Nasıl düzeltilir:</strong> ${escapeHtml(group.howToFix)}</p>` : ""}
    ${shown.length > 0 ? rowsTable(shown) : ""}
    ${moreLine(hidden, group.siteLevel ? "kayıt" : "adres")}
    ${hidden > 0 ? `<p class="note">Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.</p>` : ""}
  </article>`;
}

/** Severity, then category, then the pages-affected order the model gave. */
export function issuesSection(groups: IssueGroup[]): string {
  if (groups.length === 0) {
    return `<section id="sorunlar">
      <h2>2. Sorunlar</h2>
      <p class="empty">Bu denetimde kayıtlı sorun yok.</p>
    </section>`;
  }
  const blocks = SEVERITIES.map((severity) => {
    const inSeverity = groups.filter((g) => g.severity === severity);
    if (inSeverity.length === 0) return "";
    const categories = CATEGORY_ORDER.map((category) => {
      const items = inSeverity.filter((g) => g.category === category);
      if (items.length === 0) return "";
      return `<h3 class="cat-head">${CATEGORY_LABEL[category]} <span class="cat-n">${formatCount(items.length)} tür</span></h3>
        ${items.map(issueArticle).join("")}`;
    }).join("");
    return `<div class="sev-block sev-block--${severity}">
      <h3 class="sev-head">${SEVERITY_LABEL[severity]} <span class="cat-n">${formatCount(inSeverity.length)} sorun türü</span></h3>
      ${categories}
    </div>`;
  }).join("");
  return `<section id="sorunlar">
    <h2>2. Sorunlar</h2>
    <p class="note">Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla ${formatCount(ISSUE_PAGE_CAP)} adres yazılır.</p>
    ${blocks}
  </section>`;
}

/**
 * The addresses that did not fit under their issue, so a long list is cut
 * with a reason rather than silently. Compact on purpose: it is a lookup
 * table, not something anyone reads front to back.
 */
export function appendixSection(groups: IssueGroup[]): string {
  let budget = APPENDIX_TOTAL_CAP;
  let dropped = 0;
  const blocks: string[] = [];
  for (const group of groups) {
    const rest = group.rows.slice(ISSUE_PAGE_CAP);
    if (rest.length === 0) continue;
    const take = Math.min(rest.length, APPENDIX_PER_ISSUE_CAP, budget);
    budget -= take;
    dropped += rest.length - take;
    if (take === 0) continue;
    blocks.push(`<h4 class="ap-head">${escapeHtml(group.title)} <span class="cat-n">${formatCount(take)} / ${formatCount(rest.length)} adres</span></h4>
      <ul class="ap-list">${rest
        .slice(0, take)
        .map((row) => `<li>${escapeHtml(rowLabel(row))}</li>`)
        .join("")}</ul>`);
  }
  if (blocks.length === 0 && dropped === 0) return "";
  return `<section id="ek-adresler">
    <h2>Ek A. Kalan etkilenen adresler</h2>
    <p class="note">Sorunların altında gösterilen ilk ${formatCount(ISSUE_PAGE_CAP)} adresin ötesindekiler.</p>
    ${blocks.join("")}
    ${moreLine(dropped, "adres")}
  </section>`;
}
