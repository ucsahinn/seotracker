/**
 * Fixtures for the HTML markup checks (`shared/audit-issues/html-checks.ts`):
 * canonicals written in the wrong shape or place, robots tags that disagree,
 * a meta refresh, copy that should not have shipped, and pages that carry
 * more than they should. Each page is otherwise healthy, so the audit has
 * one thing to say about it -- two where the markup honestly states two.
 *
 * Not here: `mixed-content-media`, `form-action-http` and
 * `internal-http-links` only fire on an https page, and the harness serves
 * this site over plain http (see NEEDS_HTTPS in `scripts/run-audit.ts`).
 */
import type { Fixture, FixtureContext } from "./types";
import { htmlResponse, renderPage } from "../lib";
import { article } from "./helpers";

const SECTIONS = [
  {
    h2: "What this page is for",
    body: "The page is otherwise healthy: one h1, a title, a description, a described image and enough text to clear the thin-content threshold. Only the defect named in the summary is injected, so the audit has exactly one thing to say about it. The remaining words keep the word count comfortably above the floor and give a reader something to scan while the crawler does its work.",
  },
  {
    h2: "The fix",
    body: "The fix is described in the lesson above. Apply it once in the template that generates these pages and every page built from that template is put right together, which is usually faster than editing pages one at a time.",
  },
];

const CAT = "Markup & content";

interface Spec {
  path: string;
  category?: string;
  name: string;
  summary: string;
  lesson: string;
  metaDescription: string;
  expected: Fixture["expectedIssues"];
  title?: string;
  h1?: string;
  robotsMeta?: string;
  inSitemap?: boolean;
  headExtra?: (ctx: FixtureContext) => string;
  /** Replaces the default article sections. */
  sections?: typeof SECTIONS;
  /** Markup appended after the article body. */
  extraBody?: (ctx: FixtureContext) => string;
}

function build(spec: Spec): Fixture {
  const fixture: Fixture = {
    path: spec.path,
    category: spec.category ?? CAT,
    name: spec.name,
    summary: spec.summary,
    lesson: spec.lesson,
    expectedIssues: spec.expected,
    inSitemap: spec.inSitemap,
    handler: (ctx) =>
      htmlResponse(
        renderPage({
          fixture,
          title: spec.title ?? `${spec.name} | badseo.dev`,
          metaDescription: spec.metaDescription,
          robotsMeta: spec.robotsMeta,
          headExtra: spec.headExtra?.(ctx),
          bodyHtml: `${article({
            h1: spec.h1 ?? spec.name,
            lede: spec.summary,
            sections: spec.sections ?? SECTIONS,
          })}
${spec.extraBody?.(ctx) ?? ""}`,
        }),
      ),
  };
  return fixture;
}

/* About 123,000 characters: past the 100,000 line the check draws. */
const INLINE_STATE = `window.__BADSEO_STATE__ = ${JSON.stringify({
  products: Array.from({ length: 4000 }, (_, i) => ({
    id: i,
    sku: `SKU-${String(i).padStart(6, "0")}`,
  })),
})};`;

export const markupFixtures: Fixture[] = [
  build({
    path: "/markup/meta-refresh",
    name: "Meta refresh redirect",
    summary:
      "A meta refresh tag sends the visitor to another page after a delay.",
    lesson:
      "Google follows a meta refresh but recommends a server-side 301 instead, and a refresh that fires while someone is reading takes the page away from them.",
    metaDescription:
      "This page carries a meta refresh tag that moves the browser to another address. A server redirect does the same job properly.",
    expected: ["meta-refresh-redirect"],
    // Long enough that nobody reading the page is actually moved.
    headExtra: () =>
      '<meta http-equiv="refresh" content="86400; url=/privacy">',
  }),
  build({
    path: "/markup/canonical-relative",
    category: "Indexability & canonical",
    name: "Relative canonical address",
    summary: "The canonical tag names this page by its path, not its full URL.",
    lesson:
      "Google accepts a relative canonical but recommends an absolute one: a relative path resolves against whatever host served the page, staging included.",
    metaDescription:
      "The canonical on this page is a bare path. It resolves to the right address here, but only because of where the page happens to be served.",
    expected: ["canonical-relative"],
    headExtra: () => '<link rel="canonical" href="/markup/canonical-relative">',
  }),
  build({
    path: "/markup/canonical-fragment",
    category: "Indexability & canonical",
    name: "Canonical address with a fragment",
    summary: "The canonical URL ends in a #fragment.",
    lesson:
      "Google ignores everything after the # when it reads a canonical, so the fragment does nothing except suggest the wrong address was copied in.",
    metaDescription:
      "The canonical on this page points at itself with a #fragment on the end. Google drops the fragment, so it only adds confusion.",
    expected: ["canonical-with-fragment"],
    headExtra: (ctx) =>
      `<link rel="canonical" href="${ctx.origin}${ctx.path}#main">`,
  }),
  build({
    path: "/markup/canonical-in-body",
    category: "Indexability & canonical",
    name: "Canonical tag in the body",
    summary: "The canonical link sits in the body, not in the head.",
    lesson:
      "Google only reads rel=canonical in the head. A tag in the body, often left by a widget or a page builder, is ignored.",
    metaDescription:
      "This page declares its canonical with a link element inside the body. Google ignores canonicals that are not in the head.",
    expected: ["canonical-outside-head"],
    extraBody: (ctx) =>
      `<link rel="canonical" href="${ctx.origin}${ctx.path}">`,
  }),
  build({
    path: "/markup/robots-conflict",
    category: "Indexability & canonical",
    name: "Robots tags that disagree",
    summary: "One robots tag says follow, a second one says nofollow.",
    lesson:
      "With conflicting robots rules Google applies the most restrictive one, so the nofollow wins whatever the first tag intended.",
    metaDescription:
      "Two robots meta tags on this page contradict each other: one allows following links and one forbids it. The stricter rule wins.",
    /* Every robots tag counts for nofollow-page, as for indexability: the
       second tag's nofollow wins, so the page is reported for both. */
    expected: ["robots-meta-conflict", "nofollow-page"],
    robotsMeta: "index, follow",
    headExtra: () => '<meta name="robots" content="nofollow">',
  }),
  build({
    path: "/markup/snippet-blocked",
    category: "Indexability & canonical",
    name: "Search snippet blocked",
    summary:
      "A nosnippet rule keeps Google from showing any text under the link.",
    lesson:
      "nosnippet leaves the result as a bare blue link with no description. That is rarely what a page that wants clicks intends.",
    metaDescription:
      "This page sets nosnippet in its robots tag, so Google shows its result with no description text under the title.",
    expected: ["snippet-blocked"],
    robotsMeta: "nosnippet",
  }),
  build({
    path: "/markup/says-not-found",
    name: "Page that says it was not found",
    summary: "Answers 200, but the title says Page not found.",
    lesson:
      "A missing page should answer 404 or 410. One that answers 200 while saying it is missing is a soft 404, and Google treats it as one.",
    metaDescription:
      "This page answers with a successful status code while its title says the page could not be found, which Google reads as a soft 404.",
    expected: ["page-says-not-found"],
    title: "Page not found | badseo.dev",
    h1: "Nothing to see at this address",
  }),
  build({
    path: "/markup/lorem-ipsum",
    category: "Content quality",
    name: "Placeholder Latin left in the copy",
    summary: "A paragraph of the stock placeholder text shipped with the page.",
    lesson:
      "Placeholder text that reaches production tells readers and Google the page was never finished. Search the templates for it before launch.",
    metaDescription:
      "A paragraph of the standard Latin placeholder text was never replaced on this page and went live with the rest of the copy.",
    expected: ["lorem-ipsum-text"],
    extraBody: () =>
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
  }),
  build({
    path: "/markup/exposed-email",
    category: "Content quality",
    name: "Email address in plain text",
    summary:
      "A contact address is written out in the page and in a mailto link.",
    lesson:
      "Harvesters read plain addresses off pages as easily as people do. A contact form, or at least an obfuscated address, keeps the inbox usable.",
    metaDescription:
      "A contact address on this page is written out in full, where any scraper collecting addresses for spam lists can read it.",
    expected: ["exposed-email-address"],
    extraBody: () =>
      '<p>Questions go to <a href="mailto:press@badseo.dev">press@badseo.dev</a>.</p>',
  }),
  build({
    path: "/markup/title-mismatch",
    category: "Content quality",
    name: "Title about something else",
    summary:
      "The title promises one subject; the text on the page talks about another.",
    lesson:
      "Google rewrites titles that do not describe the page, and a searcher who clicks a promise the page does not keep goes straight back.",
    metaDescription:
      "The title of this page names a subject the page never mentions. Google tends to rewrite titles like that in its results.",
    expected: ["title-content-mismatch"],
    // None of these three words, nor their first five letters, may appear
    // anywhere in the body, the test panel included.
    title: "Vintage Bicycle Restoration | badseo.dev",
    h1: "Notes on watering houseplants",
    sections: [
      {
        h2: "How often to water",
        body: "Most houseplants want water when the top few centimetres of soil feel dry, not on a fixed schedule. Pots without drainage holes keep the roots wet for days, and that rot kills more plants than drought does. Lift the pot after watering and again a few days later; the change in weight tells you more than a calendar.",
      },
      {
        h2: "Light and season",
        body: "Plants drink less in winter, when the days are short and growth slows. A plant on a sunny sill needs more than the same plant in a dim hallway. Watch the leaves: drooping that recovers after a drink means thirst, while yellowing lower leaves usually mean too much.",
      },
    ],
  }),
  build({
    path: "/markup/organization-no-sameas",
    category: "Structured data",
    name: "Organization markup without sameAs",
    summary:
      "Organization structured data names the company but lists no official profiles.",
    lesson:
      "Google uses sameAs to connect an organization to its official profiles elsewhere. Without it, the knowledge panel has less to go on.",
    metaDescription:
      "This page carries Organization structured data with a name, address and logo, but no sameAs list of the official profiles.",
    expected: ["organization-missing-sameas"],
    headExtra: (ctx) =>
      `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "badseo.dev",
        url: `${ctx.origin}/`,
        logo: `${ctx.origin}/img/placeholder.svg`,
      })}</script>`,
  }),
  build({
    path: "/index/archive/page/2",
    category: "Indexability & canonical",
    name: "Page two of a list set to noindex",
    summary: "The second page of an archive carries a noindex robots tag.",
    lesson:
      "Google asks every page of a paginated list to be indexable. Links on a page that stays noindexed are eventually not followed, so the items only page two links to drop out.",
    metaDescription:
      "This is page two of a paginated archive, and it carries noindex, so search engines drop it and in time stop following its links.",
    // In the sitemap it would add sitemap-noindex-page as well.
    inSitemap: false,
    expected: ["noindex-page", "paginated-page-noindex"],
    robotsMeta: "noindex",
  }),
  build({
    path: "/markup/large-inline-script",
    category: "Performance",
    name: "Very large inline script",
    summary: "More than 100,000 characters of state are inlined into a script.",
    lesson:
      "Inline code is downloaded again with every page and cannot be cached on its own. Move large scripts and styles into files.",
    metaDescription:
      "This page inlines a script of more than a hundred thousand characters, which every visit downloads again and no cache can keep.",
    // The script outweighs the text by twenty to one, which low-text-ratio
    // states in its own terms.
    expected: ["large-inline-code", "low-text-ratio"],
    extraBody: () => `<script>${INLINE_STATE}</script>`,
  }),
];
