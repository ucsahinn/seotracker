/**
 * Turkish → English draft translation for the admin composer.
 *
 * The model only ever sees plain sentences: emoji, list markers and line
 * breaks are cut out first and put back in place afterwards, so an
 * announcement keeps its shape even when the model would have dropped or
 * mangled a pictograph. The result is a draft the administrator reviews and
 * saves; nothing here publishes anything.
 */

/** Translates each Turkish string to English, in order. */
export type Translator = (texts: string[]) => Promise<string[]>;

export function workersAiTranslator(ai: Ai): Translator {
  return (texts) =>
    Promise.all(
      texts.map(async (text) => {
        const result = await ai.run("@cf/meta/m2m100-1.2b", {
          text,
          source_lang: "turkish",
          target_lang: "english",
        });
        // A queued (async) response has no text; treat it as a failure.
        const translated =
          "translated_text" in result ? result.translated_text?.trim() : "";
        if (!translated) throw new Error("Empty translation");
        return translated;
      }),
    );
}

// Runs of pictographs (with their joiners and variation selectors) stay as
// they are; everything between them is a piece of sentence to translate.
const EMOJI_RUN = /((?:\p{Extended_Pictographic}|‍|️)+)/u;
const HAS_LETTER = /\p{L}/u;
// A list marker or heading mark at the start of a line, kept verbatim.
const LINE_PREFIX = /^(\s*(?:[-*•>#]+\s+|\d+[.)]\s+)?)/u;

type Piece = { keep: string } | { lead: string; text: string; trail: string };

function piecesOf(line: string): Piece[] {
  const prefix = LINE_PREFIX.exec(line)?.[1] ?? "";
  const pieces: Piece[] = prefix ? [{ keep: prefix }] : [];
  for (const part of line.slice(prefix.length).split(EMOJI_RUN)) {
    if (!part) continue;
    if (EMOJI_RUN.test(part) || !HAS_LETTER.test(part)) {
      pieces.push({ keep: part });
      continue;
    }
    const lead = /^\s*/u.exec(part)?.[0] ?? "";
    const trail = /\s*$/u.exec(part)?.[0] ?? "";
    pieces.push({
      lead,
      text: part.slice(lead.length, part.length - trail.length),
      trail,
    });
  }
  return pieces;
}

/**
 * Translates every field, preserving line breaks, emoji and list markers.
 * Identical sentences are sent once.
 */
export async function translateFields(
  fields: string[],
  translate: Translator,
): Promise<string[]> {
  const split = fields.map((field) =>
    field.split("\n").map((line) => piecesOf(line)),
  );
  const unique = [
    ...new Set(
      split.flat(2).flatMap((piece) => ("text" in piece ? [piece.text] : [])),
    ),
  ];
  const translated = unique.length ? await translate(unique) : [];
  if (translated.length !== unique.length)
    throw new Error("Translation count mismatch");
  const byText = new Map(unique.map((text, i) => [text, translated[i]]));
  return split.map((lines) =>
    lines
      .map((pieces) =>
        pieces
          .map((piece) =>
            "keep" in piece
              ? piece.keep
              : piece.lead + byText.get(piece.text) + piece.trail,
          )
          .join(""),
      )
      .join("\n"),
  );
}
