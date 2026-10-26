/**
 * The per-page signals, read through the analyzer on small documents: the
 * public entry point the crawler calls.
 */
import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/server/lib/audit/page-analyzer";
import { simhashDistance } from "@/server/lib/audit/simhash";

const PAGE_URL = "https://example.com/p";

const wordList = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${prefix}${i}`).join(" ");

function signalsOf(head: string, body = "") {
  return analyzeHtml(
    `<!doctype html><html><head>${head}</head><body>${body}</body></html>`,
    PAGE_URL,
    200,
    0,
  ).signals;
}

describe("page signals", () => {
  it("counts elements and the deepest nesting, skipping <noscript>", () => {
    const signals = signalsOf(
      "",
      "<div><p><span>x</span></p><br></div><noscript><div><div></div></div></noscript>",
    );
    // html, head, body, div, p, span, br
    expect(signals.domNodeCount).toBe(7);
    expect(signals.domMaxDepth).toBe(5);
  });

  it("reads twitter:card, meta keywords and a viewport that blocks zoom", () => {
    const signals = signalsOf(
      '<meta name="twitter:card" content=" summary "><meta name="keywords" content="a,b"><meta name="viewport" content="width=device-width, maximum-scale=1">',
    );
    expect(signals.twitterCard).toBe("summary");
    expect(signals.metaKeywordsPresent).toBe(true);
    expect(signals.viewportZoomDisabled).toBe(true);
    expect(
      signalsOf('<meta name="viewport" content="width=device-width">')
        .viewportZoomDisabled,
    ).toBe(false);
  });

  it("counts javascript:, bare # and unprotected external new-tab links", () => {
    const signals = signalsOf(
      "",
      `<a href="javascript:void(0)">a</a><a href="#">b</a>
       <a href="https://other.com/" target="_blank">c</a>
       <a href="https://other.com/2" target="_blank" rel="noopener">d</a>
       <a href="/inside" target="_blank">e</a>`,
    );
    expect(signals.javascriptLinks).toBe(1);
    expect(signals.hashOnlyLinks).toBe(1);
    expect(signals.externalBlankWithoutNoopener).toBe(1);
  });

  it("sorts images into lazy, modern, legacy and eager-below-the-fold", () => {
    const eager = Array.from({ length: 5 }, (_, i) => `<img src="/e${i}.jpg">`);
    const signals = signalsOf(
      "",
      [
        // A logo and a 32px icon: neither format nor loading is advice there.
        '<header><img src="/brand-logo.png"><img src="/x.png" width="32" height="32"></header><main>',
        '<picture><source type="image/avif" srcset="/a.avif"><img src="/a.jpg"></picture>',
        '<img src="/b.webp">',
        '<img src="/logo.svg">',
        ...eager,
        '<img src="/l.png" loading="lazy">',
        "</main>",
      ].join(""),
    );
    expect(signals.imagesModernFormatCount).toBe(2);
    expect(signals.imagesLegacyFormatCount).toBe(6);
    expect(signals.imagesLazyCount).toBe(1);
    // Content images 4..7 are past the first three and eager; the SVG and
    // the header's logo and icon are not counted.
    expect(signals.imagesBelowFoldNotLazy).toBe(4);
  });

  it("without a <main>, counts only images sized as content as below the fold", () => {
    const unsized = Array.from(
      { length: 8 },
      (_, i) => `<img src="/u${i}.jpg">`,
    );
    const large = Array.from(
      { length: 8 },
      (_, i) => `<img src="/l${i}.jpg" width="800" height="600">`,
    );
    expect(signalsOf("", unsized.join("")).imagesBelowFoldNotLazy).toBe(0);
    expect(signalsOf("", large.join("")).imagesBelowFoldNotLazy).toBe(5);
  });

  it("reads a viewport whose settings are separated by spaces", () => {
    expect(
      signalsOf(
        '<meta name="viewport" content="width=device-width initial-scale=1 user-scalable = no">',
      ).viewportZoomDisabled,
    ).toBe(true);
  });

  it("counts form controls with no label of any kind, and duplicated ids", () => {
    const signals = signalsOf(
      "",
      `<label for="a">A</label><input id="a">
       <label>B <input></label>
       <input placeholder="Search"><input type="hidden"><input type="submit">
       <input id="lonely"><select></select>
       <div id="x"></div><span id="x"></span>`,
    );
    expect(signals.formInputsWithoutLabel).toBe(2);
    expect(signals.duplicateIds).toBe(1);
  });

  it("finds Google tag ids only in scripts that load Google's tag", () => {
    const signals = signalsOf(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=G-AB12CD34EF"></script>
       <script>window.dataLayer=[];(function(){/* GTM-K9X2PQ */})()</script>
       <script>const code = "G-RECAPTCHA"; const sku = "G-12345678";</script>`,
      "<p>Part number G-55555555</p>",
    );
    expect(signals.analyticsIds).toEqual(["G-AB12CD34EF", "GTM-K9X2PQ"]);
  });

  it("lists JSON-LD types and the properties Google lists that are missing", () => {
    const signals = signalsOf(
      `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
         {"@type":"Product","name":"Mug"},
         {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","name":"Home"}]},
         {"@type":"WebSite","name":"Shop"}]}</script>
       <script type="application/ld+json">{"@type":"Article","headline":"H","image":"/i.png","datePublished":"2026-01-01","author":"A"}</script>`,
    );
    expect(signals.jsonLdTypes).toEqual([
      "Product",
      "BreadcrumbList",
      "WebSite",
      "Article",
    ]);
    expect(signals.structuredDataGaps).toEqual([
      {
        type: "Product",
        level: "required",
        missing: ["offers/review/aggregateRating"],
      },
      {
        type: "BreadcrumbList",
        level: "required",
        missing: ["itemListElement.position"],
      },
    ]);
  });

  it("fingerprints body text and gives near-identical text a near-identical hash", () => {
    const words = Array.from({ length: 200 }, (_, i) => `word${i}`).join(" ");
    const other = Array.from({ length: 200 }, (_, i) => `term${i}`).join(" ");
    const hash = (text: string) =>
      signalsOf("", `<p>${text}</p>`).contentSimhash ?? "";
    const a = hash(`${words} Istanbul`);
    expect(a).toMatch(/^[0-9a-f]{16}$/);
    expect(simhashDistance(a, hash(`${words} Ankara`))).toBeLessThanOrEqual(3);
    expect(simhashDistance(a, hash(other))).toBeGreaterThan(10);
    expect(signalsOf("", "<p>too short</p>").contentSimhash).toBeNull();
  });

  // Shared navigation and footer used to dominate the fingerprint, so two
  // short articles on one template read as near-duplicates.
  it("fingerprints the main content, not the navigation and footer", () => {
    const chrome = (n: string) => wordList(n, 300);
    const text = (n: string) => wordList(n, 80);
    const page = (main: string, nav: string) =>
      signalsOf(
        "",
        `<nav>${nav}</nav><main><p>${main}</p></main><footer>${nav}</footer>`,
      ).contentSimhash ?? "";

    expect(
      simhashDistance(
        page(text("alpha"), chrome("menu")),
        page(text("beta"), chrome("menu")),
      ),
    ).toBeGreaterThan(10);
    expect(
      simhashDistance(
        page(text("alpha"), chrome("menu")),
        page(text("alpha"), chrome("other")),
      ),
    ).toBe(0);
  });

  it("measures the visible text against the HTML it came from", () => {
    const signals = signalsOf(
      "<style>.a{color:red}</style>",
      "<p>Hello world</p>",
    );
    expect(signals.textRatio).toBeGreaterThan(0);
    expect(signals.textRatio).toBeLessThan(0.2);
  });

  it("records breadcrumb markup and a declared feed, which are stored", () => {
    expect(
      signalsOf("", '<nav aria-label="Breadcrumb"></nav>').markup
        .hasBreadcrumbs,
    ).toBe(true);
    expect(
      signalsOf(
        '<script type="application/ld+json">{"@type":"BreadcrumbList","itemListElement":[]}</script>',
      ).markup.hasBreadcrumbs,
    ).toBe(true);
    expect(
      signalsOf(
        '<link rel="alternate" type="application/rss+xml" href="/feed">',
      ).markup.hasFeedLink,
    ).toBe(true);
    const plain = signalsOf(
      '<link rel="alternate" hreflang="en" href="/en">',
      "<nav></nav>",
    );
    expect(plain.markup.hasBreadcrumbs).toBe(false);
    expect(plain.markup.hasFeedLink).toBe(false);
  });
});
