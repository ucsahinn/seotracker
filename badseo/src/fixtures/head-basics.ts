/**
 * Two head basics every page should carry and these two pages leave out:
 * the document language and the canonical address.
 *
 * Every other fixture gets both without asking: `renderDocument` writes
 * `<html lang="en">`, and the request handler adds a self-canonical to any
 * page that does not declare its own (see `withSelfCanonical`). These two are
 * the exceptions that make the absence testable.
 */
import type { Fixture } from "./types";
import { htmlResponse, renderPage } from "../lib";
import { article } from "./helpers";

const CAT = "Head tags";

const missingLang: Fixture = {
  path: "/head/missing-lang",
  category: CAT,
  name: "No language on the html tag",
  summary:
    "The <html> tag carries no lang attribute, so nothing states what language the page is written in.",
  lesson:
    "Screen readers pick a voice and pronunciation from lang, and browsers use it for translation prompts and spellcheck. Google detects the language on its own, but a declared one removes the guesswork.",
  expectedIssues: ["missing-lang"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: missingLang,
        // null leaves the attribute off entirely.
        lang: null,
        title: "A page that never says what language it is in",
        metaDescription:
          "This page leaves the lang attribute off its html tag, so a screen reader has to guess which language to read it in.",
        bodyHtml: article({
          h1: "Which language is this?",
          lede: "The html element on this page has no lang attribute.",
          sections: [
            {
              h2: "Who reads the attribute",
              body: "A screen reader uses lang to choose a voice and the right pronunciation rules, so a page in one language read out in another is unintelligible. Browsers use it to decide whether to offer a translation and which dictionary to spellcheck against. Search engines mostly work the language out from the text, which is exactly why the attribute is cheap insurance rather than a requirement.",
            },
            {
              h2: "The fix",
              body: 'Put the language on the html element once, in the template: lang="en" for English, lang="tr" for Turkish. Every page built from that template is fixed at the same time.',
            },
          ],
        }),
      }),
    ),
};

const missingCanonical: Fixture = {
  path: "/head/missing-canonical",
  category: CAT,
  name: "No canonical tag",
  summary: "An indexable page that never says which address is its main one.",
  lesson:
    "Google recommends, but does not require, a canonical on every page. Without one, a page reachable at several addresses leaves the choice of which to show entirely to Google.",
  expectedIssues: ["missing-canonical"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: missingCanonical,
        title: "A page that does not name its own address",
        metaDescription:
          "This page carries no rel=canonical tag, so when several addresses serve it Google decides which one to show.",
        bodyHtml: article({
          h1: "Which address is the real one?",
          lede: "The head of this page has no rel=canonical link.",
          sections: [
            {
              h2: "Why a page needs to say so",
              body: "The same page is often reachable at more than one address: with and without a trailing slash, with tracking parameters on the end, under www and without it. To a crawler each is a separate URL with identical content. A canonical link names the one you want shown, and without it Google picks by itself, sometimes choosing an address you never meant to publish.",
            },
            {
              h2: "The fix",
              body: 'Add a link element to the head that points at the page\'s own full address: rel="canonical" and the href you want people to land on. Most CMS platforms and SEO plugins can add it to every page with a single setting.',
            },
          ],
        }),
      }),
    ),
};

export const headBasicsFixtures: Fixture[] = [missingLang, missingCanonical];
