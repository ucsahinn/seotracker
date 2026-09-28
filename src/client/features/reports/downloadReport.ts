/**
 * Saves a stored report to the reader's disk.
 *
 * Fetched in the browser rather than returned through a server function: a
 * document runs to hundreds of kilobytes, and the read path for reports
 * deliberately keeps stored HTML out of the app worker's heap. `/r/<id>` is
 * its one reader, so a download goes through it too.
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

  const href = URL.createObjectURL(await response.blob());
  try {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  } finally {
    URL.revokeObjectURL(href);
  }
}

/**
 * A filename that survives a downloads folder.
 *
 * Report titles are free text and can carry slashes, colons and quotes —
 * characters a filesystem either refuses or, on Windows, silently truncates
 * the name at. The date keeps a second download of the same report from
 * landing as "report (1)".
 */
export function reportFilename(title: string, date = new Date()): string {
  const safe = title
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
    .replace(/[.\s-]+$/, "");
  const stamp = date.toISOString().slice(0, 10);
  return `${safe || "rapor"}-${stamp}.html`;
}
