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
export async function readBodyCapped(
  response: Response,
  maxBytes: number,
): Promise<string | null> {
  const body = await readBodyPrefix(response, maxBytes);
  return body.truncated ? null : decodeUtf8(body.bytes);
}
