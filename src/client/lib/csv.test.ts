import { describe, expect, it, vi } from "vitest";
import { buildCsv, downloadCsv } from "./csv";

describe("downloadCsv", () => {
  it("starts the file with a UTF-8 BOM so Excel reads Turkish text", async () => {
    let blob: Blob | undefined;
    vi.stubGlobal("URL", {
      createObjectURL: (value: Blob) => {
        blob = value;
        return "blob:test";
      },
      revokeObjectURL: () => {},
    });
    vi.stubGlobal("document", {
      createElement: () => ({ click: () => {} }),
    });

    downloadCsv("x.csv", '"ş"');

    const bytes = new Uint8Array(await blob!.arrayBuffer());
    expect(Array.from(bytes.slice(0, 3))).toEqual([0xef, 0xbb, 0xbf]);
    vi.unstubAllGlobals();
  });
});

describe("buildCsv", () => {
  it("rounds decimal numbers to at most two places", () => {
    const csv = buildCsv(
      ["Page", "Traffic", "Keywords"],
      [["/tools", 1250.321954, 4]],
    );

    expect(csv).toContain('"1250.32"');
    expect(csv).toContain('"4"');
  });

  it("keeps formula-injection protection for string cells", () => {
    const csv = buildCsv(["Value"], [['=HYPERLINK("evil")']]);

    expect(csv).toContain('"\'=HYPERLINK(""evil"")"');
  });
});
