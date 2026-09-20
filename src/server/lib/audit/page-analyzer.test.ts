/**
 * Parity tests for the streaming (htmlparser2) page analyzer against a
 * cheerio/DOM reference implementation — the exact logic the analyzer
 * replaced. Cheerio stays as a devDependency for this test only.
 */
import * as cheerio from "cheerio";
import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/server/lib/audit/page-analyzer";
import { normalizeUrl, isSameOrigin } from "@/server/lib/audit/url-utils";
import type { PageAnalysis, PageLink } from "@/server/lib/audit/types";

/** The previous cheerio implementation, verbatim (minus passthrough fields). */
function analyzeHtmlWithCheerio(html: string, pageUrl: string): PageAnalysis {
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').first().attr("content")?.trim() ?? "";
  const canonical = $('link[rel="canonical"]').first().attr("href") ?? null;
  const robotsMeta = $('meta[name="robots"]').first().attr("content") ?? null;
  const googlebotMeta =
    $('meta[name="googlebot"]').first().attr("content") ?? null;
  const ogTitle =
    $('meta[property="og:title"]').first().attr("content") ?? null;
  const ogDescription =
    $('meta[property="og:description"]').first().attr("content") ?? null;
  const ogImage =
    $('meta[property="og:image"]').first().attr("content") ?? null;

  /*
   * The one place the streaming analyzer deliberately improves on the DOM
   * implementation it replaced, so the reference has to be taught the same
   * rule: an image inside a heading contributes its alt text. The original
   * used a bare $(el).text(), which treats <h1><img alt="Acme"></h1> as an
   * empty heading.
   */
  const h1s: string[] = [];
  $("h1").each((_, heading) => {
    const clone = $(heading).clone();
    clone.find("img").each((_index, img) => {
      $(img).replaceWith($("<span>").text($(img).attr("alt") ?? ""));
    });
    h1s.push(clone.text().replace(/\s+/g, " ").trim());
  });

  const headingOrder: number[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const tag =
      "tagName" in el && typeof el.tagName === "string"
        ? el.tagName.toLowerCase()
        : null;
    if (tag) {
      const level = parseInt(tag.charAt(1), 10);
      if (!isNaN(level)) headingOrder.push(level);
    }
  });

  const bodyClone = $("body").clone();
  bodyClone.find("script, style, noscript, svg").remove();
  const bodyText = bodyClone.text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  const images: Array<{ src: string | null; alt: string | null }> = [];
  $("img").each((_, el) => {
    images.push({
      src: $(el).attr("src") ?? null,
      alt: $(el).attr("alt") ?? null,
    });
  });

  const linksByTarget = new Map<string, PageLink>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    if (/^(javascript:|mailto:|tel:|#)/.test(href)) return;
    const resolved = normalizeUrl(href, pageUrl);
    if (!resolved) return;
    if (linksByTarget.has(resolved)) return;
    const anchor = $(el).text().replace(/\s+/g, " ").trim().slice(0, 200);
    const rel = $(el).attr("rel")?.toLowerCase() ?? "";
    linksByTarget.set(resolved, {
      targetUrl: resolved,
      anchor: anchor || null,
      isInternal: isSameOrigin(resolved, pageUrl),
      isNofollow: rel.split(/\s+/).includes("nofollow"),
    });
  });

  let hasStructuredData = false;
  $('script[type="application/ld+json"]').each(() => {
    hasStructuredData = true;
  });

  const hreflangAlternates: PageAnalysis["hreflangAlternates"] = [];
  $('link[rel="alternate"][hreflang]').each((_, el) => {
    const hreflang = $(el).attr("hreflang");
    if (hreflang) {
      hreflangAlternates.push({ hreflang, href: $(el).attr("href") ?? "" });
    }
  });

  return {
    url: pageUrl,
    statusCode: 200,
    redirectUrl: null,
    responseTimeMs: 0,
    title,
    metaDescription,
    canonical,
    robotsMeta,
    googlebotMeta,
    ogTitle,
    ogDescription,
    ogImage,
    h1s,
    headingOrder,
    wordCount,
    bodyText,
    images,
    links: Array.from(linksByTarget.values()),
    hasStructuredData,
    hreflangAlternates,
  };
}

const PAGE_URL = "https://example.com/blog/post";

function expectParity(html: string) {
  const streamed = analyzeHtml(html, PAGE_URL, 200, 0);
  const reference = analyzeHtmlWithCheerio(html, PAGE_URL);
  expect(streamed).toEqual(reference);
}

describe("analyzeHtml parity with the DOM reference", () => {
  it("matches on a full, well-formed document", () => {
    expectParity(`<!DOCTYPE html>
      <html><head>
        <title> The  Title </title>
        <meta name="description" content="  A description.  ">
        <meta name="robots" content="index, follow">
        <meta property="og:title" content="OG Title">
        <meta property="og:description" content="OG Desc">
        <meta property="og:image" content="/og.png">
        <link rel="canonical" href="https://example.com/blog/post">
        <link rel="alternate" hreflang="en" href="/en">
        <link rel="alternate" hreflang="de" href="/de">
        <script type="application/ld+json">{"@type":"Article"}</script>
      </head><body>
        <h1>Main <em>Heading</em></h1>
        <h2>Sub</h2><h3>Deep</h3><h2>Sub 2</h2>
        <p>Some visible body text with <strong>bold words</strong> here.</p>
        <script>ignored();</script>
        <style>.x{}</style>
        <svg><title>icon</title><text>svg text</text></svg>
        <noscript><img src="/ns.png"><p>noscript text</p></noscript>
        <img src="/a.png" alt="A picture">
        <img src="/b.png" alt="">
        <img src="/c.png">
        <img alt="no src">
        <a href="/relative">Relative <span>link</span></a>
        <a href="https://example.com/relative">Duplicate target</a>
        <a href="https://other.example/x" rel="NoFollow sponsored">External</a>
        <a href="mailto:x@example.com">Mail</a>
        <a href="#frag">Fragment</a>
        <a href="javascript:void(0)">JS</a>
        <a href="/empty-anchor"><img src="/img-link.png" alt=""></a>
      </body></html>`);
  });

  it("matches on documents with no head, body, or title", () => {
    expectParity(
      `<h1>Bare fragment</h1><p>Just text and a <a href="/x">link</a>.</p>`,
    );
  });

  it("matches on an empty document", () => {
    expectParity("");
  });

  it("matches on a document with only a head", () => {
    expectParity(
      `<html><head><title>Head only</title><meta name="description" content="d"></head></html>`,
    );
  });

  it("matches with duplicate metas and titles (first wins)", () => {
    expectParity(`<html><head>
      <title>First</title><title>Second</title>
      <meta name="description" content="first desc">
      <meta name="description" content="second desc">
      <link rel="canonical" href="/first"><link rel="canonical" href="/second">
      </head><body><p>text</p></body></html>`);
  });

  it("matches on unclosed and misnested tags", () => {
    expectParity(`<html><body>
      <h1>Unclosed heading
      <p>Paragraph <b>bold <i>both</b> italic?</i>
      <a href="/one">first <a href="/two">second</a>
      <div>trailing text`);
  });

  it("matches on entity-heavy content", () => {
    expectParity(`<html><head><title>A &amp; B &lt;C&gt;</title></head>
      <body><h1>Caf&eacute; &quot;menu&quot;</h1>
      <p>1 &lt; 2 &amp;&amp; 3 &gt; 2</p>
      <a href="/x?a=1&amp;b=2">Query &amp; anchor</a></body></html>`);
  });

  /*
   * Asserted directly, not just for parity: this is the one rule where the
   * streaming analyzer improves on the DOM implementation, so "both agree"
   * would not be evidence on its own. h1Count is derived from these strings,
   * and the two shapes have to land on opposite sides of it -- a wordmark
   * logo is a heading, an empty tag is not.
   */
  it("reads a heading's words from image alt text as well as text nodes", () => {
    const analysis = analyzeHtml(
      `<body><h1><img src="/logo.svg" alt="Acme"> Store</h1><h1></h1></body>`,
      PAGE_URL,
      200,
      0,
    );

    expect(analysis.h1s).toEqual(["Acme Store", ""]);
  });

  it("matches heading order across nesting", () => {
    expectParity(`<body><h3>three</h3><div><h1>one</h1><section><h2>two</h2>
      <h6>six</h6></section></div><h4>four</h4></body>`);
  });

  it("matches word counts with whitespace-heavy markup", () => {
    expectParity(`<body>
      <p>
        one
        two    three
      </p>
      <ul><li>four</li><li>five</li></ul>
    </body>`);
  });
});

describe("analyzeHtml extraction caps", () => {
  it("caps links and images per page", () => {
    const links = Array.from(
      { length: 1_100 },
      (_, i) => `<a href="/p/${i}">link ${i}</a>`,
    ).join("");
    const images = Array.from(
      { length: 1_100 },
      (_, i) => `<img src="/i/${i}.png">`,
    ).join("");
    const analysis = analyzeHtml(
      `<body>${links}${images}</body>`,
      "https://example.com/",
      200,
      100,
    );
    expect(analysis.links).toHaveLength(1_000);
    expect(analysis.images).toHaveLength(1_000);
  });
});
