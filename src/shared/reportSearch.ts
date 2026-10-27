/** Literal substring pattern for SQLite GLOB, including Latin case pairs.
 * Turkish I/İ deliberately stays distinct in every UI language. */
export function reportSearchPattern(value: string): string {
  const pattern = Array.from(value, (char) => {
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
  }).join("");
  return "*" + pattern + "*";
}
