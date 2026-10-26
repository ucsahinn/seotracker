import { detailLineText, type DetailLine } from "@/shared/audit-issues/details";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";

/*
 * Every interpolated value goes through this. Page titles, meta descriptions
 * and URLs come from crawled third-party HTML, so the report is assembling a
 * document out of somebody else's input.
 */
export function escapeHtml(value: string): string {
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

export function percent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 1000) / 10;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/** Anchor-safe id: ASCII letters, digits and dashes only. */
export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Cuts a list at `cap` and says how many were left out, so a table can print
 * an honest "ve N daha" line instead of pretending the list was complete.
 */
export function capList<T>(items: T[], cap: number) {
  return {
    shown: items.slice(0, cap),
    hidden: Math.max(0, items.length - cap),
  };
}

export function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

/**
 * Shortens an address in the middle, so both the host and the page it ends at
 * stay readable: a long product path is told apart by its tail, not its head.
 */
export function truncateUrl(value: string, max: number): string {
  if (value.length <= max) return value;
  const tail = Math.floor((max - 1) * 0.4);
  return `${value.slice(0, max - 1 - tail)}…${value.slice(value.length - tail)}`;
}

export function formatMs(value: number | null | undefined): string {
  return value === null || value === undefined
    ? "--"
    : `${formatCount(value)} ms`;
}

/* One whole sentence per kind of item, so each language words its own plural. */
const MORE_LINE = {
  address: "ve {count} adres daha (boyutu makul tutmak için burada kesildi).",
  page: "ve {count} sayfa daha (boyutu makul tutmak için burada kesildi).",
  record: "ve {count} kayıt daha (boyutu makul tutmak için burada kesildi).",
  issueType:
    "ve {count} sorun türü daha (boyutu makul tutmak için burada kesildi).",
};

/** "ve 12 adres daha" line used under every capped list. */
export function moreLine(hidden: number, unit: keyof typeof MORE_LINE): string {
  return hidden > 0
    ? `<p class="note">${escapeHtml(t(MORE_LINE[unit], { count: hidden }))}</p>`
    : "";
}

/** "%12" in Turkish, "12%" in English. */
export function percentText(value: number): string {
  return t("%{value}", { value: formatCount(value) });
}

/** "12 sayfa", for chart captions. */
export function pagesText(count: number): string {
  return t("{count} sayfa", { count });
}

/**
 * An issue row's details as report HTML: sentences and "etiket: değer" pairs
 * as text, address and markup lists as code, the same lines the app's issue
 * card shows (`describeIssueDetails`). Crawled data, so every piece is
 * escaped here; the whole cell stops at `maxChars` of text so a pathological
 * details blob cannot blow the report's size budget.
 */
export function detailsHtml(lines: DetailLine[], maxChars: number): string {
  let budget = maxChars;
  const take = (value: string): string | null => {
    if (budget <= 0) return null;
    const cut = truncate(value, Math.max(budget, 2));
    budget -= cut.length;
    return escapeHtml(cut);
  };
  const parts: string[] = [];
  for (const line of lines) {
    if (line.items) {
      const label = take(`${line.label ?? ""}:`);
      if (label === null) break;
      const items = line.items.flatMap((item) => {
        const value = take(item);
        return value === null ? [] : [`<li><code>${value}</code></li>`];
      });
      // Items the budget left out are counted with the ones the line did.
      const left = (line.more ?? 0) + line.items.length - items.length;
      const more =
        left > 0
          ? `<li>${escapeHtml(t("ve {count} tane daha", { count: left }))}</li>`
          : "";
      parts.push(
        `<span class="dl">${label}</span><ul class="codes">${items.join("")}${more}</ul>`,
      );
      continue;
    }
    const value = take(detailLineText(line));
    if (value === null) break;
    parts.push(`<span class="dl">${value}</span>`);
  }
  return parts.join("");
}
