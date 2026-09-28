/**
 * A ZIP archive, stored rather than compressed.
 *
 * Written by hand instead of pulling in a compression library, because the
 * one thing this builds is a handful of small text files that a person will
 * open once. Store-only ZIP is a short, fixed format -- local header, data,
 * central directory, end record -- with no deflate to get wrong, and every
 * unzip tool reads it.
 *
 * Deliberately no streaming and no ZIP64: the bundle is kilobytes. If it
 * ever needs to carry something large, that is the moment to take the
 * dependency rather than to grow this.
 */

type ZipEntry = { name: string; content: string };

const encoder = new TextEncoder();

export function buildZip(entries: ZipEntry[]): Blob {
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const data = encoder.encode(entry.content);
    const crc = crc32(data);

    const local = new Uint8Array(30 + name.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true); // local file header
    view.setUint16(4, 20, true); // version needed
    // Bit 11: the name is UTF-8. Without it a tool reads the bytes as
    // CP437 and a Turkish filename comes out mangled.
    view.setUint16(6, 0x0800, true);
    view.setUint16(8, 0, true); // stored, no compression
    view.setUint16(10, 0, true); // time
    view.setUint16(12, 0x21, true); // date: 1980-01-01, fixed
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true); // compressed size
    view.setUint32(22, data.length, true); // uncompressed size
    view.setUint16(26, name.length, true);
    view.setUint16(28, 0, true); // extra length
    local.set(name, 30);

    const entryHeader = new Uint8Array(46 + name.length);
    const entryView = new DataView(entryHeader.buffer);
    entryView.setUint32(0, 0x02014b50, true); // central directory header
    entryView.setUint16(4, 20, true); // version made by
    entryView.setUint16(6, 20, true); // version needed
    entryView.setUint16(8, 0x0800, true);
    entryView.setUint16(10, 0, true);
    entryView.setUint16(12, 0, true);
    entryView.setUint16(14, 0x21, true);
    entryView.setUint32(16, crc, true);
    entryView.setUint32(20, data.length, true);
    entryView.setUint32(24, data.length, true);
    entryView.setUint16(28, name.length, true);
    entryView.setUint32(42, offset, true); // local header offset
    entryHeader.set(name, 46);

    parts.push(local, data);
    central.push(entryHeader);
    offset += local.length + data.length;
  }

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true); // end of central directory
  endView.setUint16(8, entries.length, true); // entries on this disk
  endView.setUint16(10, entries.length, true); // entries total
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true); // central directory offset

  /*
   * Copied into one buffer rather than handed to Blob as a list of views.
   * `Uint8Array<ArrayBufferLike>` is not a `BlobPart` under this
   * tsconfig -- the shared-memory case is not a blob part -- and one
   * allocation for a kilobyte archive is not worth an assertion to dodge.
   */
  const total = offset + centralSize + end.length;
  const bytes = new Uint8Array(total);
  let at = 0;
  for (const part of [...parts, ...central, end]) {
    bytes.set(part, at);
    at += part.length;
  }
  return new Blob([bytes], { type: "application/zip" });
}

/*
 * Table built once on first use. A ZIP with a wrong CRC opens in some tools
 * and is refused by others, which is the worst of both: it looks fine until
 * the person you sent it to cannot read it.
 */
let table: Uint32Array | null = null;

function crcTable(): Uint32Array {
  if (table) return table;
  const next = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let value = i;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    next[i] = value >>> 0;
  }
  table = next;
  return next;
}

export function crc32(bytes: Uint8Array): number {
  const lookup = crcTable();
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = lookup[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
