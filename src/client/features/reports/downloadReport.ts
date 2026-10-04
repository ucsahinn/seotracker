import { downloadBlob } from "@/client/lib/download";

/**
 * What `/r/<id>` sends as a header, less the directives a meta tag cannot carry
 * (`sandbox`, `frame-ancestors`). A downloaded file is opened from disk, where
 * no header exists, so without this a model-written report could run scripts
 * or load remote images there.
 */
const DOWNLOAD_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; form-action 'none'; base-uri 'none'";

// A file opened from disk has no HTTP charset, so without the declaration
// the Turkish text can be read as Latin-1. Harmless when the document has its
// own: both say UTF-8.
const CSP_META = `<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${DOWNLOAD_CSP}">`;

/**
 * Puts a trusted doctype and the CSP meta ahead of everything the report says.
 * The prefix is unconditional rather than found inside the document: deciding
 * where the stored HTML's own doctype or comments end means re-implementing the
 * HTML tokenizer, and any disagreement (`<!-->`, `--!>`, a `<head>` in a
 * comment) leaves executable content in front of the policy. The browser
 * ignores the report's own later doctype and merges its `<html>` attributes,
 * and the meta becomes the first child of the implied `<head>`.
 */
export function withDownloadCsp(html: string): string {
  return `<!doctype html>${CSP_META}${html}`;
}

/**
 * Saves a stored report to the reader's disk.
 *
 * Fetched in the browser rather than returned through a server function: a
 * document runs to hundreds of kilobytes, and the read path for reports
 * deliberately keeps stored HTML out of the app worker's heap. `/r/${id}` is
 * its one reader, so a download goes through it too. The bytes are saved, never
 * opened from a blob URL on the app origin.
 */
export async function downloadReport(
  reportId: string,
  filename: string,
): Promise<void> {
  const response = await fetch(`/r/${reportId}`);
  if (!response.ok) {
    // Surfaced verbatim: getStandardErrorMessage returns error.message, so
    // this string is UI copy rather than a developer note.
    throw new Error("Rapor indirilemedi.");
  }

  const html = withDownloadCsp(await response.text());
  downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), filename);
}

// Names Windows reserves, with or without an extension ("aux.report" too).
const RESERVED_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;

/**
 * A filename that survives a downloads folder.
 *
 * Report titles are free text and can carry slashes, colons, quotes and
 * control characters — things a filesystem either refuses or, on Windows,
 * silently truncates the name at. The date keeps a second download of the
 * same report from landing as "report (1)".
 */
export function reportFilename(title: string, date = new Date()): string {
  const cleaned = title
    // Controls, C1 controls, and the bidi overrides that make a name read
    // backwards ("fdp.exe" shown as "exe.pdf").
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]+/g, " ")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+/, "");
  // Cut by grapheme so an emoji is never split into a lone surrogate.
  const safe = Array.from(
    new Intl.Segmenter().segment(cleaned),
    (part) => part.segment,
  )
    .slice(0, 80)
    .join("")
    .replace(/[.\s-]+$/, "");
  const base = RESERVED_NAME.test(safe) ? `_${safe}` : safe;
  // The reader's own calendar day, as `formatDate` shows it: UTC would stamp
  // the previous day on a Turkish morning before 03:00.
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  return `${base || "rapor"}-${stamp}.html`;
}
