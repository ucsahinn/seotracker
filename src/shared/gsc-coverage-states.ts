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

/**
 * Google's own localized renderings, mapped back to the English sentence.
 *
 * The inspection used to be requested in Turkish, so rows stored then hold
 * Google's Turkish sentence rather than the key everything else is written
 * against. Measured on the real install: 23 of 29 stored inspections were
 * in that state, and every one of them classified as "no finding" -- so
 * four fifths of the index-coverage answers the operator had already spent
 * quota on produced nothing at all.
 *
 * Re-inspecting would fix it too, at one of the property's 2000 daily
 * inspections per URL. Mapping the sentence costs nothing and recovers
 * answers that are already paid for.
 *
 * Only sentences actually seen in stored data are listed. An unrecognised
 * one still falls through unchanged, which is the safe direction: a wrong
 * reason for why Google will not index a page sends someone to fix the
 * wrong thing.
 */
const COVERAGE_STATE_ALIASES: Record<string, string> = {
  "Keşfedildi - şu anda dizine eklenmiş değil":
    "Discovered - currently not indexed",
  "URL Google tarafından bilinmiyor": "URL is unknown to Google",
};

/** The English sentence this state is, whatever language it arrived in. */
function canonicalCoverageState(state: string | null): string | null {
  if (!state) return null;
  return COVERAGE_STATE_ALIASES[state] ?? state;
}

export function coverageStateLabel(state: string | null): string | null {
  const canonical = canonicalCoverageState(state);
  if (!canonical) return null;
  // Falls back to the sentence as stored, so a state Google invents still
  // shows rather than disappearing.
  return COVERAGE_STATE_TR[canonical] ?? canonical;
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
  const canonical = canonicalCoverageState(state);
  if (!canonical) return null;
  return COVERAGE_STATE_FINDING[canonical] ?? null;
}
