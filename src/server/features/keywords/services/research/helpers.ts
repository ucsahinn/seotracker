/**
 * A saved keyword, in the two forms the app needs.
 *
 * `keyword` is what the operator typed and what every screen shows.
 * `key` is the folded form, used only to dedupe and to match.
 *
 * They are separate because folding destroys Turkish and the folded value
 * used to be the stored one: `String.toLowerCase` is locale-insensitive, so
 * "IŞIK" came back as "işik" -- not a word -- and "İstanbul" as "i" plus a
 * combining dot that renders with the dot floating. Searching for the
 * ordinary Turkish lowercase then found nothing.
 *
 * The fold itself is still locale-insensitive, deliberately. A Turkish fold
 * would turn "IBM" into "ıbm", and this tool audits sites in any language.
 * An imperfect match key is fine when it is only a key; it was only ever
 * harmful because it was also the answer.
 */
type NormalizedKeyword = { keyword: string; key: string };

export function normalizeKeyword(input: string): NormalizedKeyword | null {
  const keyword = input.trim().replace(/\s+/g, " ");
  if (keyword.length === 0) return null;
  return { keyword, key: keyword.toLowerCase() };
}
