/**
 * Hand a blob to the browser as a download.
 *
 * Four copies of these six lines had grown: the CSV writer, this file, the
 * report download and the diagnostics bundle. They agreed on everything
 * except when to revoke the object URL, which is the one part worth getting
 * right in a single place.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * CSV downloads get a UTF-8 byte order mark: without it Excel on a tr-TR
 * machine reads the file as ANSI and shows mojibake for ç, ş, ğ, İ.
 * Only downloads; clipboard text never goes through here.
 */
export function downloadFile(content: string, filename: string, mime: string) {
  const body = mime === "text/csv" ? `﻿${content}` : content;
  downloadBlob(new Blob([body], { type: `${mime};charset=utf-8;` }), filename);
}
