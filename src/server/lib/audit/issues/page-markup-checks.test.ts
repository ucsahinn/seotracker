/**
 * The HTML checks, end to end from markup: the analyzer reads the page, the
 * reporters judge it. Each check fires on a bad page and stays silent on the
 * ordinary page below.
 */
import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/server/lib/audit/page-analyzer";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import { makeCrawledPage } from "@/server/lib/audit/issues/page-test-fixtures";
import { HTML_CHECK_ISSUES } from "@/shared/audit-issues/html-checks";

const CHECKS = new Set<string>(Object.keys(HTML_CHECK_ISSUES));

const BODY_TEXT =
  "Every wallet is cut from vegetable tanned leather and stitched by hand in our workshop. ".repeat(
    8,
  );

const GOOD_HEAD = `<title>Handmade Leather Wallets | Acme</title>
<link rel="canonical" href="https://example.com/wallets">
<meta name="robots" content="index, follow">`;

const GOOD_BODY = `<h1>Handmade leather wallets</h1>
<p>${BODY_TEXT}</p>
<img src="https://example.com/w.jpg" alt="Wallet" width="400" height="300">
<img src="/w2.jpg" alt="Wallet" width="400" height="300">
<form action="/subscribe"><input name="e" aria-label="E-mail"></form>
<a href="https://example.com/about">About us</a>
<a href="https://other.example/">A friend</a>`;

const canonicalHead = (href: string) =>
  `<title>Handmade Leather Wallets | Acme</title><link rel="canonical" href="${href}">`;

function checksFor(
  input: {
    head?: string;
    body?: string;
    url?: string;
    isIndexable?: boolean;
    xRobotsTag?: string | null;
  } = {},
): string[] {
  const url = input.url ?? "https://example.com/wallets";
  const analysis = analyzeHtml(
    `<!doctype html><html lang="en"><head>${input.head ?? GOOD_HEAD}</head><body>${input.body ?? GOOD_BODY}</body></html>`,
    url,
    200,
    100,
  );
  const page = makeCrawledPage({
    url,
    title: analysis.title,
    firstH1: analysis.h1s.find(Boolean) ?? null,
    wordCount: analysis.wordCount,
    links: analysis.links,
    signals: analysis.signals,
    canonicalUrl: url,
    isIndexable: input.isIndexable ?? true,
    xRobotsTag: input.xRobotsTag ?? null,
  });
  return runPageReporters(page)
    .map((issue) => issue.issueType)
    .filter((type) => CHECKS.has(type));
}

describe("HTML checks", () => {
  it("say nothing about an ordinary page", () => {
    expect(checksFor()).toEqual([]);
  });

  it("find http media, frames and form posts on an https page", () => {
    expect(
      checksFor({
        body: `${GOOD_BODY}<img src="http://cdn.example.net/a.jpg"><iframe src="http://maps.example.net/x"></iframe>`,
      }),
    ).toEqual(["mixed-content-media"]);
    expect(
      checksFor({
        body: `${GOOD_BODY}<form action="http://example.com/send"></form>`,
      }),
    ).toEqual(["form-action-http"]);
    // The same markup on a plain http page is not mixed content.
    expect(
      checksFor({
        url: "http://example.com/wallets",
        body: `${GOOD_BODY}<img src="http://cdn.example.net/a.jpg">`,
      }),
    ).not.toContain("mixed-content-media");
  });

  it("treats a quick meta refresh stub as a redirect and leaves its content alone", () => {
    const allIssues = (seconds: number) => {
      const url = "https://example.github.io/";
      const analysis = analyzeHtml(
        `<html lang="en"><head><title>Primer</title><meta http-equiv="refresh" content="${seconds};url=https://example.style/"></head><body>Redirecting to <a href="https://example.style/">example.style</a></body></html>`,
        url,
        200,
        100,
      );
      const page = makeCrawledPage({
        url,
        title: analysis.title,
        metaDescription: "",
        h1Count: 0,
        firstH1: null,
        wordCount: analysis.wordCount,
        links: analysis.links,
        signals: analysis.signals,
        canonicalUrl: null,
        canonicalCount: 0,
      });
      return runPageReporters(page).map((issue) => issue.issueType);
    };
    expect(allIssues(0)).toEqual(["meta-refresh-redirect"]);
    // A page that reloads elsewhere after half a minute is still a page.
    expect(allIssues(30)).toEqual(
      expect.arrayContaining(["meta-refresh-redirect", "missing-h1"]),
    );
  });

  it("finds a meta refresh that goes somewhere, not a plain reload", () => {
    expect(
      checksFor({
        head: `${GOOD_HEAD}<meta http-equiv="refresh" content="0; url=https://example.com/new">`,
      }),
    ).toEqual(["meta-refresh-redirect"]);
    expect(
      checksFor({
        head: `${GOOD_HEAD}<meta http-equiv="refresh" content="300">`,
      }),
    ).toEqual([]);
  });

  it("reads canonical markup: relative, with a fragment, only in the body", () => {
    expect(checksFor({ head: canonicalHead("/wallets") })).toEqual([
      "canonical-relative",
    ]);
    expect(
      checksFor({ head: canonicalHead("https://example.com/wallets#top") }),
    ).toEqual(["canonical-with-fragment"]);
    expect(checksFor({ head: canonicalHead("//example.com/wallets") })).toEqual(
      [],
    );
    expect(
      checksFor({
        head: "<title>Handmade Leather Wallets | Acme</title>",
        body: `<link rel="canonical" href="https://example.com/wallets">${GOOD_BODY}`,
      }),
    ).toEqual(["canonical-outside-head"]);
  });

  it("finds robots tags that contradict each other", () => {
    expect(
      checksFor({
        head: `${GOOD_HEAD}<meta name="robots" content="noindex">`,
        isIndexable: false,
      }),
    ).toEqual(["robots-meta-conflict"]);
    expect(
      checksFor({
        head: `${GOOD_HEAD}<meta name="robots" content="max-image-preview:large">`,
      }),
    ).toEqual([]);
  });

  it("finds a blocked snippet on an indexable page, and only Google's", () => {
    expect(
      checksFor({
        head: `${GOOD_HEAD}<meta name="googlebot" content="max-snippet: 0">`,
      }),
    ).toEqual(["snippet-blocked"]);
    expect(checksFor({ xRobotsTag: "nosnippet" })).toEqual(["snippet-blocked"]);
    expect(checksFor({ xRobotsTag: "bingbot: nosnippet" })).toEqual([]);
    expect(checksFor({ xRobotsTag: "max-snippet: 160" })).toEqual([]);
  });

  it("finds a 200 page that says it does not exist, not an article about 404s", () => {
    expect(
      checksFor({
        head: "<title>Sayfa bulunamadı | Acme</title>",
        body: `<h1>Hata</h1><p>${BODY_TEXT}</p>`,
      }),
    ).toContain("page-says-not-found");
    expect(
      checksFor({
        head: "<title>How to fix 404 not found errors | Acme</title>",
        body: `<h1>How to fix 404 not found errors</h1><p>${BODY_TEXT}</p>`,
      }),
    ).toEqual([]);
  });

  it("finds placeholder text and exposed addresses, not file names", () => {
    expect(
      checksFor({
        body: `${GOOD_BODY}<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
      }),
    ).toEqual(["lorem-ipsum-text"]);
    expect(
      checksFor({
        body: `${GOOD_BODY}<p>Write to <a href="mailto:Shop@Acme.example">us</a></p>`,
      }),
    ).toEqual(["exposed-email-address"]);
    expect(
      checksFor({
        body: `${GOOD_BODY}<img src="/logo@2x.png" alt="logo@2x.png">`,
      }),
    ).toEqual([]);
  });

  it("reads an address that runs into the next word without taking the word", () => {
    const analysis = analyzeHtml(
      `<!doctype html><html lang="en"><head>${GOOD_HEAD}</head><body>${GOOD_BODY}<p>Email us at lifekit@npr.org</p><a href="/plus">Support public media</a><p>Write to shortwave@npr.org.Listen to every episode. Or INFO@ACME.COM.</p></body></html>`,
      "https://example.com/wallets",
      200,
      100,
    );
    expect(analysis.signals.markup.emailAddresses).toEqual([
      "lifekit@npr.org",
      "shortwave@npr.org",
      "info@acme.com",
    ]);
  });

  it("finds a title whose topic words appear nowhere on the page", () => {
    expect(
      checksFor({
        head: "<title>Cheap Flights Istanbul Berlin | Acme</title>",
      }),
    ).toEqual(["title-content-mismatch"]);
    // A Turkish suffix still matches its stem.
    expect(
      checksFor({
        head: "<title>Ankara'da Kiralık Daireler | Acme</title>",
        body: `<h1>Kiralık daire</h1><p>Ankara merkezde ${BODY_TEXT}</p>`,
      }),
    ).toEqual([]);
  });

  it("finds an Organization without sameAs", () => {
    const org = (extra: string) =>
      `${GOOD_HEAD}<script type="application/ld+json">{"@type":"Organization","name":"Acme","url":"https://example.com","logo":"https://example.com/l.png"${extra}}</script>`;
    expect(checksFor({ head: org("") })).toEqual([
      "organization-missing-sameas",
    ]);
    expect(
      checksFor({
        head: org(',"sameAs":["https://www.linkedin.com/company/acme"]'),
      }),
    ).toEqual([]);
  });

  it("finds a noindexed second page of a list, never the first", () => {
    const noindex = `<title>Handmade Leather Wallets | Acme</title><meta name="robots" content="noindex">`;
    expect(
      checksFor({
        head: noindex,
        url: "https://example.com/wallets/page/2",
        isIndexable: false,
      }),
    ).toEqual(["paginated-page-noindex"]);
    expect(
      checksFor({
        head: noindex,
        url: "https://example.com/wallets?p=2",
        isIndexable: false,
      }),
    ).toEqual([]);
  });

  it("finds internal links to http on an https site", () => {
    expect(
      checksFor({
        body: `${GOOD_BODY}<a href="http://www.example.com/contact">Contact</a>`,
      }),
    ).toEqual(["internal-http-links"]);
  });

  it("finds a page carrying over 100 KB of inline code", () => {
    const big = "x".repeat(120_000);
    expect(
      checksFor({ body: `${GOOD_BODY}<script>var a="${big}";</script>` }),
    ).toEqual(["large-inline-code"]);
    // JSON data is not code.
    expect(
      checksFor({
        body: `${GOOD_BODY}<script type="application/json">"${big}"</script>`,
      }),
    ).toEqual([]);
  });
});
