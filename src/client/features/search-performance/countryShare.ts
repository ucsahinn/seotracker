import { sort } from "remeda";

type CountryRow = { key: string; clicks: number };

type CountrySegment = {
  /** Country code, or `null` for the pooled "diğer" remainder. */
  key: string | null;
  clicks: number;
};

/**
 * Top countries by clicks plus one pooled remainder, so the ring always sums
 * to the whole. The remainder is dropped when it is empty; a country with no
 * clicks never gets a slice.
 */
export function countrySegments(
  countries: CountryRow[],
  top = 3,
): CountrySegment[] {
  const ranked = sort(
    countries.filter((row) => row.clicks > 0),
    (a, b) => b.clicks - a.clicks,
  );
  const head = ranked.slice(0, top).map((row) => ({
    key: row.key,
    clicks: row.clicks,
  }));
  const restClicks = ranked
    .slice(top)
    .reduce((sum, row) => sum + row.clicks, 0);
  return restClicks > 0 ? [...head, { key: null, clicks: restClicks }] : head;
}
