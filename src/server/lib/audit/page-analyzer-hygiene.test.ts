import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/server/lib/audit/page-analyzer";

const URL_ = "https://example.com/page";

function analyze(head: string, body = "") {
  return analyzeHtml(
    `<html><head>${head}</head><body>${body}</body></html>`,
    URL_,
    200,
    10,
  );
}

describe("titleCount", () => {
  it("counts document titles and ignores an svg title", () => {
    expect(analyze("<title>A</title><title>B</title>").titleCount).toBe(2);
    expect(
      analyze("<title>A</title>", "<svg><title>icon</title></svg>").titleCount,
    ).toBe(1);
    expect(analyze("").titleCount).toBe(0);
  });

  it("keeps the first title as the page title", () => {
    expect(analyze("<title>First</title><title>Second</title>").title).toBe(
      "First",
    );
  });
});

const meta = (c: string) => `<meta name="description" content="${c}">`;

describe("metaDescriptionCount", () => {
  it("counts distinct non-empty values", () => {
    expect(analyze(meta("one") + meta("two")).metaDescriptionCount).toBe(2);
    expect(analyze(meta("same") + meta("same")).metaDescriptionCount).toBe(1);
    expect(analyze(meta("one") + meta("")).metaDescriptionCount).toBe(1);
  });
});

describe("emptyAnchorCount", () => {
  it("counts internal links with no text and no accessible name", () => {
    const body = [
      '<a href="/a"></a>',
      '<a href="/b">  </a>',
      '<a href="/c">Text</a>',
      '<a href="/d" aria-label="Cart"><i class="icon"></i></a>',
      '<a href="/e"><img src="/x.png" alt=""></a>',
      '<a href="/f"><svg></svg></a>',
      '<a href="/g" aria-hidden="true" tabindex="-1"></a>',
      '<a href="https://other.com/"></a>',
      '<a name="anchor"></a>',
    ].join("");
    expect(analyze("", body).emptyAnchorCount).toBe(2);
  });

  it("counts a repeated empty target each time", () => {
    expect(
      analyze("", '<a href="/a"></a><a href="/a"></a>').emptyAnchorCount,
    ).toBe(2);
  });
});
