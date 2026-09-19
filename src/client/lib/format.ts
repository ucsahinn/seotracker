/**
 * Every number, date and time the operator reads, formatted in one place.
 *
 * The locale used to be whatever the browser happened to be set to, and in a
 * few files it was pinned to en-US outright, so the same audit could say
 * "Sep 19" in one card and "19.09.2026" in another. This install has one
 * operator and one language; pinning the locale here makes the whole app
 * agree, and makes a wrong format a one-line fix.
 */
const LOCALE = "tr-TR";

const numberFormatter = new Intl.NumberFormat(LOCALE);
const dayFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
});
const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** One decimal, for rates and averages that would read as noise at more. */
function formatDecimal(value: number, digits = 1): string {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(fraction: number, digits = 1): string {
  return `%${formatDecimal(fraction * 100, digits)}`;
}

/**
 * SQLite's CURRENT_TIMESTAMP has no timezone marker. Parsed as-is the browser
 * reads it as local time, which shifts a stored UTC timestamp by the offset
 * and can show yesterday's date. Treat that shape as UTC explicitly.
 */
function parse(value: string): number {
  return Date.parse(
    /^\d{4}-\d{2}-\d{2} /.test(value) ? `${value.replace(" ", "T")}Z` : value,
  );
}

function safe(value: string, formatter: Intl.DateTimeFormat): string {
  const ms = parse(value);
  return Number.isNaN(ms) ? value : formatter.format(ms);
}

/** "19 Eyl" - for dense rows where the year is obvious from context. */
export function formatDay(value: string): string {
  return safe(value, dayFormatter);
}

/** "19 Eyl 2026" */
export function formatDate(value: string): string {
  return safe(value, dateFormatter);
}

/** "19 Eyl 16:07" */
export function formatDateTime(value: string): string {
  return safe(value, dateTimeFormatter);
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

/** "3 saat önce"; "az önce" under a minute. */
export function formatRelativeTime(value: string): string {
  const then = parse(value);
  if (Number.isNaN(then)) return "";
  const diff = then - Date.now();
  const absolute = Math.abs(diff);
  const formatter = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });
  for (const [unit, ms] of RELATIVE_UNITS) {
    if (absolute >= ms) return formatter.format(Math.round(diff / ms), unit);
  }
  return "az önce";
}
