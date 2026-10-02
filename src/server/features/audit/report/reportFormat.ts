import { formatCount } from "@/shared/format";

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

/** "ve 12 adres daha" line used under every capped list. */
export function moreLine(hidden: number, unit: string): string {
  return hidden > 0
    ? `<p class="note">ve ${formatCount(hidden)} ${escapeHtml(unit)} daha (boyutu makul tutmak için burada kesildi).</p>`
    : "";
}

/**
 * One line of the issue's stored details, in the same "anahtar: değer" shape
 * the app's issue card uses. Only scalars and short lists: a details blob is
 * crawled data too, so it is escaped by the caller like everything else.
 */
export function describeDetails(
  detailsJson: string | null | undefined,
): string {
  if (!detailsJson) return "";
  try {
    const parsed: unknown = JSON.parse(detailsJson);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return "";
    }
    const parts: string[] = [];
    for (const [key, value] of Object.entries(parsed)) {
      if (value === null || value === undefined) continue;
      if (Array.isArray(value)) {
        parts.push(`${key}: ${value.slice(0, 6).map(String).join(" → ")}`);
      } else if (typeof value !== "object") {
        parts.push(`${key}: ${String(value)}`);
      }
    }
    return truncate(parts.join(" · "), 200);
  } catch {
    return "";
  }
}
