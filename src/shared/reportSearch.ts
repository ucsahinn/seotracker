/** Literal substring pattern for SQLite GLOB, including Latin case pairs.
 * Turkish I/İ deliberately stays distinct in every UI language. */
/**
 * D1 refuses a LIKE or GLOB pattern longer than 50 bytes ("pattern too
 * complex"). A letter costs four bytes here ("[Aa]"), more outside ASCII, so
 * a search of thirteen letters used to fail the whole reports list.
 */
const MAX_PATTERN_BYTES = 50;
const bytes = (text: string) => new TextEncoder().encode(text).length;

/**
 * One GLOB pattern per stretch of the search text that fits D1's limit; a row
 * matches when it matches all of them. A search short enough for one pattern,
 * which is nearly every search, matches as one contiguous piece. A longer one
 * matches its pieces anywhere in the text, which can only add rows.
 */
export function reportSearchPatterns(value: string): string[] {
  const patterns: string[] = [];
  let piece = "";
  for (const token of searchTokens(value)) {
    if (piece && bytes(piece) + bytes(token) + 2 > MAX_PATTERN_BYTES) {
      patterns.push("*" + piece + "*");
      piece = "";
    }
    piece += token;
  }
  if (piece) patterns.push("*" + piece + "*");
  return patterns;
}

function searchTokens(value: string): string[] {
  return Array.from(value, (char) => {
    if (char === "[") return "[[]";
    if (char === "]") return "[]]";
    if (char === "*") return "[*]";
    if (char === "?") return "[?]";
    const lower = char === "I" ? "ı" : char === "İ" ? "i" : char.toLowerCase();
    const upper =
      lower === "i"
        ? "İ"
        : lower === "ı"
          ? "I"
          : lower === "ß"
            ? "ẞ"
            : lower.toUpperCase();
    return upper !== lower && Array.from(upper).length === 1
      ? "[" + upper + lower + "]"
      : char;
  });
}
