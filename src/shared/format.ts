/**
 * Every number, date and time the operator reads, formatted in one place.
 *
 * The locale used to be whatever the browser happened to be set to, and in a
 * few files it was pinned to en-US outright, so the same audit could say
 * "Sep 19" in one card and "19.09.2026" in another. Keeping every format here
 * makes the whole app agree, and makes a wrong format a one-line fix.
 *
 * The locale follows the UI language (`getLocale()` from `@/shared/i18n`):
 * a locale-specific number/date locale. Formatters are built on first use and
 * cached per locale, because the locale is set per request on the server and
 * is not known when this module loads.
 */
import { getLocale, type Locale } from "@/shared/i18n";

const INTL_LOCALE: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  pt: "pt-PT",
};

const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

/*
 * One formatter per locale and options, built on first use. The options are
 * small literal objects, so their JSON is a stable cache key.
 */
function numberFormat(options: Intl.NumberFormatOptions = {}) {
  const locale = INTL_LOCALE[getLocale()];
  const key = `${locale}|${JSON.stringify(options)}`;
  let formatter = numberFormats.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    numberFormats.set(key, formatter);
  }
  return formatter;
}

function dateFormat(options: Intl.DateTimeFormatOptions) {
  const locale = INTL_LOCALE[getLocale()];
  const key = `${locale}|${JSON.stringify(options)}`;
  let formatter = dateFormats.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, options);
    dateFormats.set(key, formatter);
  }
  return formatter;
}

const DAY: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
const DATE: Intl.DateTimeFormatOptions = { ...DAY, year: "numeric" };
const DATE_TIME: Intl.DateTimeFormatOptions = {
  ...DAY,
  hour: "2-digit",
  minute: "2-digit",
};

export function formatNumber(value: number): string {
  return numberFormat().format(value);
}

/** Whole things: clicks, impressions, sessions, pages. */
export function formatCount(value: number): string {
  return numberFormat().format(Math.round(value));
}

/** One decimal, for rates and averages that would read as noise at more. */
export function formatDecimal(value: number, digits = 1): string {
  return numberFormat({
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/**
 * Site-score points a fix gives back: "~+3,2", or "<0,1" below a tenth;
 * unsigned ("3,2") where the sentence already says it is a loss.
 *
 * Approximate on purpose (the tilde): a gain is exact only for that fix on
 * its own, and two fixes in one category do not simply add up. One rounding
 * for the screen and the exported report, which used to print the same gain
 * as "+0,6" and "+1 puandan az".
 */
export function formatPoints(points: number, signed = true): string {
  const tenths = Math.round(points * 10) / 10;
  if (tenths < 0.1) return `<${formatDecimal(0.1)}`;
  return signed ? `~+${formatDecimal(tenths)}` : formatDecimal(tenths);
}

/**
 * Time left on a running job, whole units: "18 sn", "3 dk", "1 sa 5 dk".
 * An estimate, so no decimals: "1,4 dk" claimed a precision it never had.
 */
export function formatRemaining(ms: number): string {
  const en = getLocale() === "en";
  const seconds = Math.max(1, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds} ${en ? "s" : "sn"}`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} ${en ? "min" : "dk"}`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const h = `${hours} ${en ? "h" : "sa"}`;
  return rest === 0 ? h : `${h} ${rest} ${en ? "min" : "dk"}`;
}

/**
 * A duration a person reads, from milliseconds.
 *
 * Lighthouse and the crawler both report milliseconds and both were
 * formatting them by hand, which is how "1.4s" ended up next to "1,4 sn" on
 * the same screen.
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${formatNumber(Math.round(ms))} ms`;
  return `${formatDecimal(ms / 1000)} ${getLocale() === "en" ? "s" : "sn"}`;
}

/**
 * A running clock, from milliseconds: "4:07", or "1:04:07" past an hour.
 * For time that ticks on screen (an audit in progress), where "4,1 dk"
 * would jump a decimal every few seconds and read as noise.
 */
export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
}

/** "16:07" - hour and minute of an epoch-ms instant, in the UI language. */
export function formatTime(ms: number): string {
  return dateFormat({ hour: "2-digit", minute: "2-digit" }).format(ms);
}

/** A byte size a person reads. Binary units, because that is what the tools report. */
/**
 * Money, in the property's own currency.
 *
 * GA4 reports revenue as a bare number and names the currency separately, so
 * a revenue column without this is a figure whose unit the reader has to
 * guess. An unknown or malformed code falls back to the plain number rather
 * than throwing: `Intl` rejects anything that is not a valid ISO 4217 code,
 * and a screen is not the place to find that out.
 *
 * The currency is the property's, whatever the UI language: Turkish lira is
 * "₺1.235" in Turkish and "₺1,235" in English. `narrowSymbol` is what keeps
 * the ₺ in en-US, which would otherwise write "TRY 1,235".
 */
export function formatMoney(value: number, currency: string | null): string {
  if (!currency) return formatDecimal(value, 2);
  try {
    return numberFormat({
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return formatDecimal(value, 2);
  }
}

/**
 * Decimal units (1 KB = 1000 bytes), matching the 500 KB report limit that
 * save_report and the seo-report skill state in the same unit.
 */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${formatDecimal(bytes / 1_000_000)} MB`;
  if (bytes >= 1000) return `${formatNumber(Math.round(bytes / 1000))} KB`;
  return `${formatNumber(Math.round(bytes))} B`;
}

/** "%3,4" in Turkish, "3.4%" in English: the sign's side is the locale's. */
export function formatPercent(fraction: number, digits = 1): string {
  return numberFormat({
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fraction);
}

/**
 * A relative change, as a delta badge shows it: "+%8,8", "-%0,4" (English
 * "+8.8%", "-0.4%").
 *
 * One rule for every delta. The dashboard said "%9" and Search performance
 * "+%8,8" for the same number, because each screen rounded and signed on its
 * own. One decimal, and an explicit sign so the text carries direction as
 * well as the arrow and the tint. `null` when the change rounds to zero at
 * that precision, so no arrow ever sits beside "%0,0".
 */
export function formatSignedPercent(fraction: number): string | null {
  if (!Number.isFinite(fraction)) return null;
  const magnitude = formatDecimal(Math.abs(fraction) * 100);
  if (magnitude === formatDecimal(0)) return null;
  return `${fraction > 0 ? "+" : "-"}${formatPercent(Math.abs(fraction))}`;
}

/**
 * SQLite's CURRENT_TIMESTAMP has no timezone marker. Parsed as-is the browser
 * reads it as local time, which shifts a stored UTC timestamp by the offset
 * and can show yesterday's date. Treat that shape as UTC explicitly.
 */
function parse(value: string): number {
  /*
   * A bare "2026-08-01" is a calendar day, not an instant. `Date.parse` reads
   * it as UTC midnight, which renders as the day before anywhere west of
   * Greenwich - so a chart axis labelled from GA4's dates was off by one for
   * half the world. Build it in local time and the day stays the day.
   */
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (day) {
    return new Date(
      Number(day[1]),
      Number(day[2]) - 1,
      Number(day[3]),
    ).getTime();
  }
  return Date.parse(
    /^\d{4}-\d{2}-\d{2} /.test(value) ? `${value.replace(" ", "T")}Z` : value,
  );
}

/**
 * Epoch ms for a stored timestamp: SQLite's zone-less "YYYY-MM-DD HH:MM:SS"
 * is read as UTC, an ISO string or a bare day as `parse` above does. NaN when
 * unparseable. Use this instead of `new Date(value)` for database columns.
 */
export function parseTimestamp(value: string): number {
  return parse(value);
}

function safe(value: string, formatter: Intl.DateTimeFormat): string {
  const ms = parse(value);
  return Number.isNaN(ms) ? value : formatter.format(ms);
}

/** "19 Eyl" - for dense rows where the year is obvious from context. */
/*
 * Search Console reports countries as ISO-3166-1 alpha-3, and `DisplayNames`
 * only speaks alpha-2 -- so the panel headed "Ülkeler" read "TUR / GBR / DEU"
 * in a Turkish UI. The map covers what a single-operator install actually
 * sees; anything outside it falls back to the code, which is still better
 * than a wrong country name.
 */
const regionNamesByLocale = new Map<string, Intl.DisplayNames>();

function regionNames(): Intl.DisplayNames {
  const locale = INTL_LOCALE[getLocale()];
  let names = regionNamesByLocale.get(locale);
  if (!names) {
    names = new Intl.DisplayNames([locale], { type: "region" });
    regionNamesByLocale.set(locale, names);
  }
  return names;
}

/** Built lazily: `Intl.supportedValuesOf` is cheap but not free. */
let alpha3ToAlpha2: Map<string, string> | null = null;

function alpha2Of(code: string): string | null {
  alpha3ToAlpha2 ??= new Map(
    Object.entries({
      TUR: "TR",
      USA: "US",
      GBR: "GB",
      DEU: "DE",
      FRA: "FR",
      NLD: "NL",
      ITA: "IT",
      ESP: "ES",
      RUS: "RU",
      UKR: "UA",
      POL: "PL",
      ROU: "RO",
      BGR: "BG",
      GRC: "GR",
      AZE: "AZ",
      KAZ: "KZ",
      UZB: "UZ",
      GEO: "GE",
      IRN: "IR",
      IRQ: "IQ",
      SAU: "SA",
      ARE: "AE",
      QAT: "QA",
      KWT: "KW",
      EGY: "EG",
      MAR: "MA",
      DZA: "DZ",
      TUN: "TN",
      ISR: "IL",
      IND: "IN",
      PAK: "PK",
      BGD: "BD",
      CHN: "CN",
      JPN: "JP",
      KOR: "KR",
      IDN: "ID",
      MYS: "MY",
      SGP: "SG",
      THA: "TH",
      VNM: "VN",
      PHL: "PH",
      AUS: "AU",
      NZL: "NZ",
      CAN: "CA",
      MEX: "MX",
      BRA: "BR",
      ARG: "AR",
      CHL: "CL",
      COL: "CO",
      ZAF: "ZA",
      NGA: "NG",
      KEN: "KE",
      SWE: "SE",
      NOR: "NO",
      DNK: "DK",
      FIN: "FI",
      CHE: "CH",
      AUT: "AT",
      BEL: "BE",
      PRT: "PT",
      IRL: "IE",
      CZE: "CZ",
      HUN: "HU",
      SVK: "SK",
      HRV: "HR",
      SRB: "RS",
      CYP: "CY",
      MKD: "MK",
      ALB: "AL",
      BIH: "BA",
      MDA: "MD",
      BLR: "BY",
      LTU: "LT",
      LVA: "LV",
      EST: "EE",
      TKM: "TM",
      KGZ: "KG",
      TJK: "TJ",
      AFG: "AF",
      LBN: "LB",
      JOR: "JO",
      SYR: "SY",
      LBY: "LY",
      SDN: "SD",
      ETH: "ET",
      TZA: "TZ",
      UGA: "UG",
      GHA: "GH",
      CIV: "CI",
      SEN: "SN",
      HKG: "HK",
      TWN: "TW",
      LUX: "LU",
      ISL: "IS",
      MLT: "MT",
      SVN: "SI",
    }),
  );
  return alpha3ToAlpha2.get(code.toUpperCase()) ?? null;
}

/** "TUR" -> "Türkiye". Falls back to the code when it is not recognised. */
export function formatCountry(code: string): string {
  const upper = code.toUpperCase();
  const alpha2 = upper.length === 2 ? upper : alpha2Of(upper);
  if (!alpha2) return upper;
  try {
    return regionNames().of(alpha2) ?? upper;
  } catch {
    return upper;
  }
}

/** The region (ISO-3166 alpha-2) in the UI language; `fallback` when the runtime has no name. */
export function formatRegionName(alpha2: string, fallback: string): string {
  try {
    return regionNames().of(alpha2) ?? fallback;
  } catch {
    return fallback;
  }
}

export function formatDay(value: string): string {
  return safe(value, dateFormat(DAY));
}

/** "Eyl 2026", for a monthly axis. */
export function formatMonth(value: string): string {
  return safe(value, dateFormat({ month: "short", year: "numeric" }));
}

/** "19 Eyl 2026" */
export function formatDate(value: string): string {
  return safe(value, dateFormat(DATE));
}

/** "19 Eyl 16:07", including the year when it differs from the current year. */
export function formatDateTime(value: string): string {
  const timestamp = parse(value);
  return safe(
    value,
    dateFormat({
      ...DATE_TIME,
      ...(new Date(timestamp).getFullYear() !== new Date().getFullYear()
        ? { year: "numeric" as const }
        : {}),
    }),
  );
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

/** Relative time, using the locale's current-moment wording under a minute. */
export function formatRelativeTime(value: string): string {
  const then = parse(value);
  if (Number.isNaN(then)) return "";
  const diff = then - Date.now();
  const absolute = Math.abs(diff);
  const formatter = new Intl.RelativeTimeFormat(INTL_LOCALE[getLocale()], {
    numeric: "auto",
  });
  for (const [unit, ms] of RELATIVE_UNITS) {
    if (absolute >= ms) return formatter.format(Math.round(diff / ms), unit);
  }
  return formatter.format(0, "second");
}

/**
 * Counts inside English text that agents read, whatever the UI language.
 *
 * Deliberately not called `formatCount`: both existed under that name, one
 * pinned to en-US and one to tr-TR, and the collision is how a number ended
 * up rendered two ways in the same product. MCP tool output and the operator
 * limit messages beside it are English by design (CLAUDE.md), so they format
 * in English.
 */
export const formatEnglishCount = (n: number) => n.toLocaleString("en-US");
