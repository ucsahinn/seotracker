/**
 * How wide a search-result title renders, in CSS pixels.
 *
 * Google cuts titles by width, not by character count: a title of capital
 * Ws runs out of room long before one of lowercase ls. Desktop results set
 * the title in 20px Arial, and the cut lands close to 600px, so 580px is
 * where a title starts to risk an ellipsis.
 *
 * The table is Arial's advance widths for printable ASCII in 1/1000 em.
 * Letters with diacritics (ç, ğ, ş, İ...) are measured as their base letter,
 * which Arial draws at the same width; anything else counts as a digit.
 *
 * Shared so the audit check and a SERP preview cut at the same place.
 */

// Printable ASCII from space (32) to tilde (126).
const ARIAL_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278,
  278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584,
  584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556,
  833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278,
  278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222,
  500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500,
  500, 334, 260, 334, 584,
];
const DEFAULT_WIDTH = 556;
/** Dotless ı has no ASCII base letter and is drawn at the width of i's stem. */
const DOTLESS_I_WIDTH = 278;

const SERP_TITLE_FONT_PX = 20;
export const SERP_TITLE_MAX_PX = 580;

function charWidth(char: string): number {
  if (char === "ı") return DOTLESS_I_WIDTH; // i18n-ignore: a letter, not text
  const base = char.normalize("NFD").charCodeAt(0);
  return ARIAL_WIDTHS[base - 32] ?? DEFAULT_WIDTH;
}

/** Rendered width of `text` in Arial at `fontPx`, rounded to whole pixels. */
export function textPixelWidth(
  text: string,
  fontPx: number = SERP_TITLE_FONT_PX,
): number {
  let units = 0;
  for (const char of text) units += charWidth(char);
  return Math.round((units * fontPx) / 1000);
}

/** Snippet text is 14px Arial; two lines run out near 920px on desktop. */
export const SERP_DESCRIPTION_FONT_PX = 14;
export const SERP_DESCRIPTION_MAX_PX = 920;

/**
 * `text` as a result would show it: whole if it fits in `maxPx`, otherwise
 * cut at a word boundary where possible and ended with an ellipsis that
 * itself fits.
 */
export function truncateToPixels(
  text: string,
  maxPx: number,
  fontPx: number = SERP_TITLE_FONT_PX,
): { text: string; truncated: boolean } {
  const clean = text.trim().replace(/\s+/g, " ");
  if (textPixelWidth(clean, fontPx) <= maxPx) {
    return { text: clean, truncated: false };
  }
  const budget = maxPx - textPixelWidth(" ...", fontPx);
  let cut = "";
  for (const char of clean) {
    if (textPixelWidth(cut + char, fontPx) > budget) break;
    cut += char;
  }
  const lastSpace = cut.lastIndexOf(" ");
  const atWord = lastSpace > cut.length * 0.6 ? cut.slice(0, lastSpace) : cut;
  return { text: `${atWord.trimEnd()} ...`, truncated: true };
}
