/**
 * Google's `coverageState` sentences, in Turkish.
 *
 * These are the most explanatory text on the screen - they are the reason a
 * page is not indexed - and leaving them in English put the one thing the
 * operator actually needs to read in the wrong language. The list is Google's
 * documented set; anything unrecognised falls through unchanged, so a new
 * state Google invents still shows rather than disappearing.
 */
const COVERAGE_STATE_TR: Record<string, string> = {
  "Submitted and indexed": "Site haritasında var, dizine alındı",
  "Indexed, not submitted in sitemap": "Dizine alındı, site haritasında yok",
  "Indexed; consider adding to a sitemap":
    "Dizine alındı, site haritasına eklemeyi düşünün",
  "Crawled - currently not indexed": "Tarandı, şu an dizine alınmadı",
  "Discovered - currently not indexed": "Keşfedildi, henüz taranmadı",
  "Duplicate without user-selected canonical":
    "Yinelenen içerik, canonical belirtilmemiş",
  "Duplicate, Google chose different canonical than user":
    "Yinelenen içerik, Google başka bir canonical seçti",
  "Duplicate, submitted URL not selected as canonical":
    "Yinelenen içerik, gönderilen adres canonical seçilmedi",
  "Alternate page with proper canonical tag":
    "Alternatif sayfa, canonical doğru",
  "Excluded by 'noindex' tag": "'noindex' etiketiyle dışlandı",
  "Blocked by robots.txt": "robots.txt engelliyor",
  "Blocked due to unauthorized request (401)": "401 nedeniyle engellendi",
  "Blocked due to access forbidden (403)": "403 nedeniyle engellendi",
  "Not found (404)": "Bulunamadı (404)",
  "Soft 404": "Yumuşak 404",
  "Page with redirect": "Yönlendirme yapan sayfa",
  "Server error (5xx)": "Sunucu hatası (5xx)",
  "URL is unknown to Google": "Google bu adresi bilmiyor",
};

export function coverageStateLabel(state: string | null): string | null {
  if (!state) return null;
  return COVERAGE_STATE_TR[state] ?? state;
}

/**
 * The coverage states worth raising as findings, and nothing else.
 *
 * Keyed on Google's English sentences because that is what the inspection
 * is now asked for. Anything unrecognised — a state Google adds, or a row
 * stored back when Turkish was requested — classifies as null and produces
 * no finding. Silent is the right failure here: a wrong reason for why
 * Google will not index a page sends someone to fix the wrong thing.
 */
const COVERAGE_STATE_FINDING: Record<string, CoverageFinding> = {
  "Crawled - currently not indexed": "crawled-not-indexed",
  "Discovered - currently not indexed": "discovered-not-indexed",
  "Duplicate without user-selected canonical": "duplicate-no-canonical",
  "URL is unknown to Google": "unknown-to-google",
};

type CoverageFinding =
  | "crawled-not-indexed"
  | "discovered-not-indexed"
  | "duplicate-no-canonical"
  | "unknown-to-google";

export function classifyCoverageState(
  state: string | null,
): CoverageFinding | null {
  if (!state) return null;
  return COVERAGE_STATE_FINDING[state] ?? null;
}
