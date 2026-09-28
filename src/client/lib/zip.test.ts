import { describe, expect, it } from "vitest";
import { buildZip, crc32 } from "./zip";

const encoder = new TextEncoder();

async function bytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

function u32(data: Uint8Array, at: number): number {
  return new DataView(data.buffer, data.byteOffset).getUint32(at, true);
}

describe("crc32", () => {
  /*
   * The standard check value: CRC-32 of "123456789". A wrong table produces
   * an archive that opens in forgiving tools and is refused by strict ones,
   * which is worse than one that fails outright.
   */
  it("matches the published check value", () => {
    expect(crc32(encoder.encode("123456789"))).toBe(0xcbf43926);
  });

  it("is zero for no bytes", () => {
    expect(crc32(new Uint8Array())).toBe(0);
  });
});

describe("buildZip", () => {
  it("writes the signatures an unzip tool looks for", async () => {
    const data = await bytes(buildZip([{ name: "a.txt", content: "hello" }]));

    expect(u32(data, 0)).toBe(0x04034b50); // local header
    // End-of-central-directory is the last 22 bytes when no comment follows.
    expect(u32(data, data.length - 22)).toBe(0x06054b50);
  });

  it("records every entry in the central directory", async () => {
    const data = await bytes(
      buildZip([
        { name: "one.json", content: "{}" },
        { name: "two.txt", content: "iki" },
      ]),
    );
    const view = new DataView(data.buffer, data.byteOffset);

    expect(view.getUint16(data.length - 22 + 10, true)).toBe(2);
  });

  /*
   * Turkish filenames and Turkish content both go through this. Without the
   * UTF-8 flag a reader falls back to CP437 and "tanılama" comes out as
   * mojibake in the archive listing.
   */
  it("carries non-ASCII names and content", async () => {
    const data = await bytes(
      buildZip([{ name: "tanılama.txt", content: "şğüöçİ" }]),
    );
    const view = new DataView(data.buffer, data.byteOffset);

    expect(view.getUint16(6, true) & 0x0800).toBe(0x0800);
    // Sizes are byte counts, not character counts.
    const nameLength = view.getUint16(26, true);
    expect(nameLength).toBe(encoder.encode("tanılama.txt").length);
    expect(view.getUint32(22, true)).toBe(encoder.encode("şğüöçİ").length);
  });

  it("produces a readable archive with no entries", async () => {
    const data = await bytes(buildZip([]));

    expect(data.length).toBe(22);
    expect(u32(data, 0)).toBe(0x06054b50);
  });
});
