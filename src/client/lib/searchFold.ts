/**
 * Lowercases for search so that case never decides a match, in either
 * alphabet.
 *
 * `tr-TR` lowercasing turns "I" into "ı", so a plain `toLocaleLowerCase("tr-TR")`
 * on both sides missed "INFO" when typing "info", and `toLowerCase()` on both
 * sides missed "ISPARTA" against "ısparta". Folding the dotless ı to i after
 * the Turkish pass makes both agree: "INFO" and "info" meet, and so do "Işık"
 * and "ışık".
 */
export function searchFold(text: string): string {
  return text.toLocaleLowerCase("tr-TR").replace(/ı/g, "i");
}
