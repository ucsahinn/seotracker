/**
 * Google's machine-readable answers about a URL, in Turkish.
 *
 * `coverageState` — the only one the table showed — is a free-form sentence
 * Google reserves the right to reword, and localises. These four enums say
 * the same things in values that do not move: whether robots.txt allows the
 * URL, whether a meta tag blocks indexing, how the fetch went, and whether
 * the structured data validates.
 *
 * They were parsed, written to the database, read back and shipped to the
 * client, and then rendered nowhere. The audit's own checks consume them, so
 * the signal was not lost — but the operator could never see *why* Google
 * said what it said.
 *
 * Unknown values fall through unchanged rather than disappearing: Google
 * adds enum members, and a blank cell is worse than an unfamiliar word.
 */

const ROBOTS_TXT: Record<string, string> = {
  ALLOWED: "robots.txt izin veriyor",
  DISALLOWED: "robots.txt engelliyor",
  ROBOTS_TXT_STATE_UNSPECIFIED: "Google henüz bakmadı",
};

const INDEXING: Record<string, string> = {
  INDEXING_ALLOWED: "Dizine almaya izin var",
  BLOCKED_BY_META_TAG: "noindex etiketi engelliyor",
  BLOCKED_BY_HTTP_HEADER: "X-Robots-Tag başlığı engelliyor",
  BLOCKED_BY_ROBOTS_TXT: "robots.txt engelliyor",
  INDEXING_STATE_UNSPECIFIED: "Google henüz bakmadı",
};

const PAGE_FETCH: Record<string, string> = {
  SUCCESSFUL: "Sayfa başarıyla alındı",
  SOFT_404: "Yumuşak 404 (boş sayfa 200 dönüyor)",
  BLOCKED_ROBOTS_TXT: "robots.txt engelledi",
  NOT_FOUND: "404 bulunamadı",
  ACCESS_DENIED: "401 yetkisiz",
  ACCESS_FORBIDDEN: "403 yasak",
  SERVER_ERROR: "Sunucu hatası",
  REDIRECT_ERROR: "Yönlendirme hatası",
  ACCESS_TIMEOUT: "Zaman aşımı",
  INTERNAL_CRAWL_ERROR: "Google tarafında tarama hatası",
  INVALID_URL: "Geçersiz adres",
  PAGE_FETCH_STATE_UNSPECIFIED: "Google henüz almadı",
};

const RICH_RESULTS: Record<string, string> = {
  PASS: "Zengin sonuç işaretlemesi geçerli",
  PARTIAL: "Zengin sonuç işaretlemesinde uyarı var",
  FAIL: "Zengin sonuç işaretlemesi geçersiz",
  NEUTRAL: "Zengin sonuç işaretlemesi yok",
  VERDICT_UNSPECIFIED: "Google henüz değerlendirmedi",
};

/**
 * The reasons worth reading, in the order they answer "why".
 *
 * `*_UNSPECIFIED` means Google has not looked yet, which is the same thing
 * the verdict badge beside it already says — so it is left out rather than
 * filling the tooltip with four lines of "henüz bakmadı".
 */
export function coverageReasons(row: {
  robotsTxtState: string | null;
  indexingState: string | null;
  pageFetchState: string | null;
  richResultsVerdict: string | null;
}): string[] {
  const reasons: string[] = [];
  const add = (value: string | null, table: Record<string, string>) => {
    if (!value || value.endsWith("_UNSPECIFIED")) return;
    reasons.push(table[value] ?? value);
  };

  add(row.robotsTxtState, ROBOTS_TXT);
  add(row.indexingState, INDEXING);
  add(row.pageFetchState, PAGE_FETCH);
  add(row.richResultsVerdict, RICH_RESULTS);
  return reasons;
}
