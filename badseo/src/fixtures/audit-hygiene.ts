/**
 * Fixtures for the eleven page-hygiene checks: malformed head markup, link
 * text that says nothing, and awkward URLs. Each page is otherwise healthy,
 * so the audit has exactly one thing to say about it.
 */
import type { Fixture } from "./types";
import { htmlResponse, renderPage } from "../lib";
import { article } from "./helpers";

const SECTIONS = [
  {
    h2: "What this page is for",
    body: "The page is otherwise healthy: one h1, a title, a description, a self-describing image and enough text to clear the thin-content threshold. Only the defect named in the summary is injected, so the audit has exactly one thing to say about it. The remaining words are here to keep the word count comfortably above the floor and to give a reader something to scan while the crawler does its work.",
  },
  {
    h2: "The fix",
    body: "The fix is described in the lesson above. Apply it once in the template that generates these pages and every page built from the template is repaired together, which is usually faster than editing pages one at a time.",
  },
];

const CAT = "Head tags & markup";

interface Spec {
  path: string;
  category?: string;
  name: string;
  summary: string;
  lesson: string;
  expected: Fixture["expectedIssues"];
  title?: string;
  h1?: string;
  headExtra?: string;
  omitCharset?: boolean;
  /** Markup appended after the article body. */
  extraBody?: string;
}

function build(spec: Spec): Fixture {
  const fixture: Fixture = {
    path: spec.path,
    category: spec.category ?? CAT,
    name: spec.name,
    summary: spec.summary,
    lesson: spec.lesson,
    expectedIssues: spec.expected,
    handler: () =>
      htmlResponse(
        renderPage({
          fixture,
          title: spec.title ?? `${spec.name} | badseo.dev`,
          metaDescription: `This page exists to demonstrate one thing only: ${spec.summary.toLowerCase()} Everything else on it is healthy.`,
          headExtra: spec.headExtra,
          omitCharset: spec.omitCharset,
          bodyHtml: `${article({
            h1: spec.h1 ?? spec.name,
            lede: spec.summary,
            sections: SECTIONS,
          })}
${spec.extraBody ?? ""}`,
        }),
        spec.omitCharset
          ? { headers: { "content-type": "text/html" } }
          : undefined,
      ),
  };
  return fixture;
}

const manyLinks = Array.from(
  { length: 301 },
  (_, i) => `<a href="https://example.com/resource-${i}">Resource ${i}</a>`,
).join("\n");

export const auditHygieneFixtures: Fixture[] = [
  build({
    path: "/head/missing-charset",
    name: "No character encoding declared",
    summary:
      "Neither the response header nor the first bytes of the page declare a charset.",
    lesson:
      "Without a declared encoding the browser and Google guess, and a wrong guess turns letters with marks into garbage.",
    expected: ["missing-charset"],
    omitCharset: true,
  }),
  build({
    path: "/head/multiple-titles",
    name: "Two title tags",
    summary: "The head carries a second, different title element.",
    lesson:
      "A page has one title. With two, Google picks one itself, and it may not be the one you wrote.",
    expected: ["multiple-titles"],
    headExtra: "<title>A second title that disagrees with the first</title>",
  }),
  build({
    path: "/head/multiple-meta-descriptions",
    name: "Two different meta descriptions",
    summary: "The head carries a second meta description with other text.",
    lesson:
      "When a template and a plugin both write a description, Google picks whichever it likes for the search result.",
    expected: ["multiple-meta-descriptions"],
    headExtra:
      '<meta name="description" content="A second description written by a different plugin, which says something else entirely.">',
  }),
  build({
    path: "/head/placeholder-title",
    name: "Placeholder title",
    summary: "The title is the editor default, Untitled Document.",
    lesson:
      "A placeholder title is what shows up as the blue link in search, and nobody clicks it.",
    expected: ["placeholder-title"],
    title: "Untitled Document",
  }),
  build({
    path: "/on-page/h1-too-long",
    name: "A very long h1",
    summary: "The h1 runs past seventy characters.",
    lesson:
      "Google has no limit here; a headline that is a paragraph simply cannot be read at a glance.",
    expected: ["h1-too-long"],
    h1: "This heading keeps going well past the point where anyone can take it in at a single glance",
  }),
  build({
    path: "/links/empty-anchor-text",
    category: "Links",
    name: "Link with nothing inside",
    summary: "An internal link has no text, no image and no aria-label.",
    lesson:
      "Google reads a link's text to learn what it points at, and a screen reader announces just the word link.",
    expected: ["empty-anchor-text"],
    extraBody: '<p><a href="/structured/invalid-json"></a></p>',
  }),
  build({
    path: "/links/generic-anchor-text",
    category: "Links",
    name: "Links that say read more",
    summary: "Three internal links read Devamı, Click here and Read more.",
    lesson:
      "Link text tells Google and readers what is on the other side. Read more does not.",
    expected: ["generic-anchor-text"],
    extraBody:
      '<p><a href="/structured/invalid-json">Devamı</a> <a href="/privacy">Click here</a> <a href="/content/images-missing-dimensions">Read more</a></p>',
  }),
  build({
    path: "/links/internal-nofollow",
    category: "Links",
    name: "Nofollow on your own pages",
    summary: "Three links to the site's own pages carry rel=nofollow.",
    lesson:
      "nofollow tells Google not to trust a link. On your own pages it only hides them from the crawler.",
    expected: ["internal-nofollow-links"],
    extraBody:
      '<p><a rel="nofollow" href="/structured/invalid-json">First example</a> <a rel="nofollow" href="/privacy">Privacy notice</a> <a rel="nofollow" href="/content/images-missing-dimensions">Image sizing example</a></p>',
  }),
  build({
    path: "/links/too-many-links",
    category: "Links",
    name: "Over three hundred links",
    summary: "The page links to 301 different addresses.",
    lesson:
      "There is no hard limit, but a page that links to everything makes the important links hard to tell apart.",
    expected: ["too-many-links"],
    extraBody: `<div>${manyLinks}</div>`,
  }),
  build({
    path: "/urls/a-deliberately-very-long-page-address-that-keeps-going-and-going-until-it-passes-the-one-hundred-and-fifteen-character-mark",
    category: "URLs",
    name: "A very long address",
    summary: "The page address is longer than 115 characters.",
    lesson:
      "Long addresses break when shared and are cut short in search results. Keep them short and meaningful.",
    expected: ["url-too-long"],
  }),
  build({
    path: "/urls/Mixed_Case_Address",
    category: "URLs",
    name: "Uppercase and underscore in the address",
    summary: "The path contains capital letters and an underscore.",
    lesson:
      "Addresses are case sensitive, so /About and /about can be indexed as two pages. Lowercase and hyphens avoid that.",
    expected: ["url-uppercase-or-underscore"],
  }),
];
