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

/** Whole things: clicks, impressions, sessions, pages. */
export function formatCount(value: number): string {
  return numberFormatter.format(Math.round(value));
}

/** One decimal, for rates and averages that would read as noise at more. */
export function formatDecimal(value: number, digits = 1): string {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
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
  return `${formatDecimal(ms / 1000)} sn`;
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
 */
export function formatMoney(value: number, currency: string | null): string {
  if (!currency) return formatDecimal(value, 2);
  try {
    return new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return formatDecimal(value, 2);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${formatDecimal(bytes / (1024 * 1024))} MB`;
  if (bytes >= 1024) return `${formatNumber(Math.round(bytes / 1024))} KB`;
  return `${formatNumber(Math.round(bytes))} B`;
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
const regionNames = new Intl.DisplayNames([LOCALE], { type: "region" });

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
    return regionNames.of(alpha2) ?? upper;
  } catch {
    return upper;
  }
}

/** The region (ISO-3166 alpha-2) in Turkish; `fallback` when the runtime has no name. */
export function formatRegionName(alpha2: string, fallback: string): string {
  try {
    return regionNames.of(alpha2) ?? fallback;
  } catch {
    return fallback;
  }
}

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

/**
 * Counts inside English text that agents read, not the Turkish UI.
 *
 * Deliberately not called `formatCount`: both existed under that name, one
 * pinned to en-US and one to tr-TR, and the collision is how a number ended
 * up rendered two ways in the same product. MCP tool output and the operator
 * limit messages beside it are English by design (CLAUDE.md), so they format
 * in English.
 */
export const formatEnglishCount = (n: number) => n.toLocaleString("en-US");
