/** Byte-bounded response body reads for robots.txt and sitemap discovery. */
export function decodeUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

/** Read at most maxBytes of a body; `truncated` when the body had more. */
export async function readBodyPrefix(
  response: Response,
  maxBytes: number,
): Promise<{ bytes: Uint8Array; truncated: boolean }> {
  if (!response.body) return { bytes: new Uint8Array(0), truncated: false };
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const room = maxBytes - total;
    chunks.push(value.subarray(0, room));
    total += Math.min(value.byteLength, room);
    if (value.byteLength > room) {
      await reader.cancel();
      truncated = true;
      break;
    }
  }
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { bytes: joined, truncated };
}

/** Read a response body up to maxBytes; null when the body exceeds it. */
async function readBodyCapped(
  response: Response,
  maxBytes: number,
): Promise<string | null> {
  const body = await readBodyPrefix(response, maxBytes);
  return body.truncated ? null : decodeUtf8(body.bytes);
}

/**
 * Read a gzipped body and return the decompressed text; null when either the
 * compressed or the decompressed bytes exceed maxBytes. A body that is not
 * gzip (some servers send Content-Encoding and fetch has already inflated it)
 * is decoded as plain text.
 */
async function readGzipBodyCapped(
  response: Response,
  maxBytes: number,
): Promise<string | null> {
  const compressed = await readBodyPrefix(response, maxBytes);
  if (compressed.truncated) return null;
  const { bytes } = compressed;
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return decodeUtf8(bytes);
  try {
    const inflated = new Blob([new Uint8Array(bytes)])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    return await readBodyCapped(new Response(inflated), maxBytes);
  } catch {
    // Corrupt gzip: report it as "not a sitemap" rather than a network fault.
    return "";
  }
}

/**
 * A sitemap's text: gunzipped when the URL ends in .gz or the content type
 * says gzip (a valid .xml.gz is often served as application/gzip), capped at
 * maxBytes both compressed and decompressed. Null when over the cap.
 */
export function readSitemapBody(
  response: Response,
  url: string,
  maxBytes: number,
): Promise<string | null> {
  const gzipped =
    /\.gz$/i.test(new URL(url).pathname) ||
    (response.headers.get("content-type") ?? "").toLowerCase().includes("gzip");
  return gzipped
    ? readGzipBodyCapped(response, maxBytes)
    : readBodyCapped(response, maxBytes);
}

export function isProbablySitemapXml(
  contentType: string | null,
  body: string,
): boolean {
  if (contentType?.toLowerCase().includes("xml")) {
    return true;
  }

  const trimmed = body.trimStart().toLowerCase();
  return (
    trimmed.startsWith("<?xml") ||
    trimmed.startsWith("<urlset") ||
    trimmed.startsWith("<sitemapindex")
  );
}
