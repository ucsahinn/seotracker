/**
 * Fixtures for five later checks: broken JSON-LD, a repeated h1, a canonical
 * that leaves the host, images without reserved space, and an hreflang
 * alternate that answers 404.
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

const badJsonLd: Fixture = {
  path: "/structured/invalid-json",
  category: "Structured data",
  name: "JSON-LD block that does not parse",
  summary: "The ld+json block has a trailing comma, so it is not valid JSON.",
  lesson:
    "A structured data block that cannot be parsed is ignored whole. The usual cause is a trailing comma or an unescaped quote left by hand editing or a template.",
  expectedIssues: ["structured-data-invalid-json"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: badJsonLd,
        title: "A page whose structured data is broken",
        metaDescription:
          "This page carries a JSON-LD block with a trailing comma, so Google cannot read the markup it was meant to provide.",
        headExtra:
          '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Broken",}</script>',
        bodyHtml: article({
          h1: "Structured data that cannot be read",
          lede: "The JSON-LD in the head ends with a comma no parser accepts.",
          sections: SECTIONS,
        }),
      }),
    ),
};

const DUP_H1 = "One heading shared by two pages";

function duplicateH1(path: string, slug: string): Fixture {
  const fixture: Fixture = {
    path,
    category: "On-page",
    name: `Duplicate h1 (${slug})`,
    summary: "Two different pages open with the same h1 text.",
    lesson:
      "The h1 tells readers and Google what a page is about. When two pages share it, nothing tells them apart. Logo-as-h1 templates are the usual cause.",
    expectedIssues: ["duplicate-h1"],
    handler: () =>
      htmlResponse(
        renderPage({
          fixture,
          title: `Duplicate heading page ${slug}`,
          metaDescription: `Page ${slug} of two that share an h1 but differ in title, description and body text, so only the heading collides.`,
          bodyHtml: article({
            h1: DUP_H1,
            lede: `This is page ${slug}; its title and text differ, its h1 does not.`,
            sections: [
              {
                h2: `Notes specific to page ${slug}`,
                body: `Everything below the heading is unique to page ${slug}, which is why only the h1 is reported. ${slug === "a" ? "Alpha alpha alpha." : "Bravo bravo bravo."} The surrounding text is long enough to avoid the thin-content check and to keep the body different between the two pages, so the duplicate-content check stays quiet while the heading check does its job.`,
              },
              {
                h2: "The fix",
                body: "Give every page an h1 that names its own topic. If the site name sits in an h1 on every page, move it to a plain element and make the page heading the h1.",
              },
            ],
          }),
        }),
      ),
  };
  return fixture;
}

const canonicalCrossHost: Fixture = {
  path: "/index/canonical-other-host",
  category: "Indexability & canonical",
  name: "Canonical on another host",
  summary: "The canonical names a different domain, not this page's own site.",
  lesson:
    "A canonical on another host tells Google the main copy lives elsewhere. Right for syndicated content, a mistake when a template carries the wrong site address.",
  expectedIssues: [
    "canonical-cross-host-or-http",
    "canonicalized-page",
    "sitemap-canonicalized-page",
  ],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: canonicalCrossHost,
        title: "A page that points its canonical at someone else",
        metaDescription:
          "This page's canonical names another domain entirely, so it asks Google to treat a different site as the main copy.",
        canonical: "http://www.example.org/original-article",
        bodyHtml: article({
          h1: "Whose page is this?",
          lede: "The canonical link leaves this site.",
          sections: SECTIONS,
        }),
      }),
    ),
};

const imagesMissingDimensions: Fixture = {
  path: "/content/images-missing-dimensions",
  category: "Content",
  name: "Images without width and height",
  summary: "Three images carry alt text but no width or height.",
  lesson:
    "Without width and height the browser cannot reserve space before an image loads, so the text below jumps when it arrives.",
  expectedIssues: ["images-missing-dimensions"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: imagesMissingDimensions,
        title: "A page whose images shift the layout",
        metaDescription:
          "This page has three images with no width or height, so the browser cannot hold their space while they load.",
        bodyHtml: `${article({
          h1: "Images that arrive without a reserved place",
          lede: "Three photographs below have no width or height.",
          sections: SECTIONS,
        })}
<img src="/img/photo-1.jpg" alt="First photograph of the workshop">
<img src="/img/photo-2.jpg" alt="Second photograph of the workshop">
<img src="/img/photo-3.jpg" alt="Third photograph of the workshop">`,
      }),
    ),
};

const hreflangTargetBroken: Fixture = {
  path: "/index/hreflang-target-broken",
  category: "Indexability & canonical",
  name: "hreflang alternate that answers 404",
  summary: "The German alternate points at a page that does not exist.",
  lesson:
    "An alternate that errors, redirects or is noindexed cannot serve as a language version, so the declaration is wasted.",
  expectedIssues: ["hreflang-target-broken"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangTargetBroken,
        title: "An hreflang set with a dead alternate",
        metaDescription:
          "This page names a German alternate that returns a 404, so the language pairing points at nothing.",
        headExtra: [
          `<link rel="alternate" hreflang="en" href="${ctx.origin}/index/hreflang-target-broken">`,
          `<link rel="alternate" hreflang="de" href="${ctx.origin}/status/not-found">`,
          `<link rel="alternate" hreflang="x-default" href="${ctx.origin}/index/hreflang-target-broken">`,
        ].join("\n"),
        bodyHtml: article({
          h1: "The German version is gone",
          lede: "The alternate named in the head answers 404.",
          sections: SECTIONS,
        }),
      }),
    ),
};

export const auditExtraFixtures: Fixture[] = [
  badJsonLd,
  duplicateH1("/on-page/duplicate-h1-a", "a"),
  duplicateH1("/on-page/duplicate-h1-b", "b"),
  canonicalCrossHost,
  imagesMissingDimensions,
  hreflangTargetBroken,
];
