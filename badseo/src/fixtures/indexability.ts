import type { Fixture } from "./types";
import { htmlResponse, renderPage } from "../lib";
import { article } from "./helpers";

import { indexabilityExtraFixtures } from "./indexability-extra";

const CAT = "Indexability & canonical";

// 14 — noindex via robots meta tag ----------------------------------------
const noindexMeta: Fixture = {
  path: "/index/noindex-meta",
  category: CAT,
  name: "Noindex (robots meta)",
  summary: 'Has <meta name="robots" content="noindex"> in the head.',
  lesson:
    "Noindex is often on purpose, like on a thank-you or filter page. An audit flags it so you can catch pages that were hidden from search by mistake.",
  expectedIssues: ["noindex-page", "sitemap-noindex-page"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: noindexMeta,
        title: "A page set to noindex",
        metaDescription:
          "This page can be crawled, but a robots noindex tag tells search engines to keep it out of results.",
        robotsMeta: "noindex, follow",
        bodyHtml: article({
          h1: "This page asks not to be indexed",
          lede: "Nothing is wrong with this page. It just does not want to be in Google.",
          sections: [
            {
              h2: "When noindex is right",
              body: "Some pages should not show up in search: internal search results, filter combinations, thank-you pages, staging content. A robots noindex tag is the correct way to keep them out while still letting crawlers follow their links. It is a feature, most of the time.",
            },
            {
              h2: "When it is a problem",
              body: "The same tag becomes a problem when it ends up on pages that were meant to rank. A noindex left over from a staging setup, or a template that applies it too widely, can drop a whole section of a site from search. That is why an audit reports every noindex it finds, so a person can confirm each one is on purpose.",
            },
          ],
        }),
      }),
    ),
};

// 15 — noindex via X-Robots-Tag response header ---------------------------
const noindexHeader: Fixture = {
  path: "/index/noindex-header",
  category: CAT,
  name: "Noindex (X-Robots-Tag header)",
  summary: "No robots meta tag. The noindex comes in an HTTP header instead.",
  lesson:
    "X-Robots-Tag lives in the response headers, not the HTML. A crawler has to read headers, not just the page, to catch it.",
  expectedIssues: ["noindex-page", "sitemap-noindex-page"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: noindexHeader,
        title: "Noindex set in a response header",
        metaDescription:
          "The HTML on this page looks indexable, but an X-Robots-Tag header tells search engines to skip it.",
        bodyHtml: article({
          h1: "A noindex you cannot see in the HTML",
          lede: "View the source all you want. This page's noindex is in the HTTP headers.",
          sections: [
            {
              h2: "Headers can control indexing too",
              body: "The X-Robots-Tag response header does what a robots meta tag does, but from the HTTP layer instead of the page. It is handy for files like PDFs and for setting rules at the server or CDN level. The catch is that it is invisible if you only look at the rendered HTML, which is how it can hide for months.",
            },
            {
              h2: "Why a tool has to check both",
              body: "A crawler that reads only the HTML will report this page as indexable, because nothing in the markup says otherwise. Catching a header-level rule means reading the response headers on every request. This page exists to check that an audit does that, instead of trusting the HTML.",
            },
          ],
        }),
      }),
      { headers: { "x-robots-tag": "noindex" } },
    ),
};

// 16 — canonical points to a different URL --------------------------------
const canonicalized: Fixture = {
  path: "/index/canonicalized",
  category: CAT,
  name: "Canonicalized to another URL",
  summary: "Names the homepage as its canonical, so it defers indexing to it.",
  lesson:
    "A canonical that points at another URL tells search engines to index that page instead. Fine on purpose, and a quiet way to lose rankings by mistake.",
  expectedIssues: ["canonicalized-page", "sitemap-canonicalized-page"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: canonicalized,
        title: "A page whose canonical points elsewhere",
        metaDescription:
          "This page's rel=canonical points at the homepage, telling search engines to credit that URL instead of this one.",
        canonical: `${ctx.origin}/`,
        bodyHtml: article({
          h1: "This is not the canonical page",
          lede: "This page exists, but it tells search engines to index a different URL in its place.",
          sections: [
            {
              h2: "What a cross-URL canonical does",
              body: "A rel=canonical pointing at a different address is an instruction: treat that other URL as the real one and fold the ranking signals into it. It is the right tool for syndicated copies, parameter variants, and print versions. Used on purpose, it prevents duplicate-content problems before they start.",
            },
            {
              h2: "When it goes wrong",
              body: "It becomes a real problem when a template hardcodes the homepage, or a staging domain, as the canonical for every page. Now the whole site tells search engines that none of its pages should rank on their own, and they should all defer to one URL. The pages drop out of results with no error anywhere, which is why an audit reports every canonical that points away from its own page.",
            },
          ],
        }),
      }),
    ),
};

// 17 — HTML canonical conflicts with Link-header canonical ----------------
const canonicalConflict: Fixture = {
  path: "/index/canonical-conflict",
  category: CAT,
  name: "Conflicting canonical signals",
  summary: "The HTML canonical and the HTTP Link-header canonical disagree.",
  lesson:
    "When two canonical tags point at different URLs, search engines trust neither and pick their own. Declare the canonical in one place.",
  expectedIssues: [
    "canonical-conflict",
    "canonicalized-page",
    "sitemap-canonicalized-page",
  ],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: canonicalConflict,
        title: "A page with two different canonicals",
        metaDescription:
          "This page ships two canonical URLs that disagree: one in the HTML head and a different one in the HTTP Link header.",
        canonical: `${ctx.origin}/index/canonical-conflict?via=html`,
        bodyHtml: article({
          h1: "Two canonicals that disagree",
          lede: "The head names one canonical URL. The HTTP header names another. Both lose.",
          sections: [
            {
              h2: "Mixed signals",
              body: "You can set a canonical URL in the HTML head with a link tag, or in the HTTP response with a Link header. Search engines read both. When the two disagree, as they do here, the search engine cannot trust either one, so it drops them and picks a canonical on its own, which is rarely the one you wanted.",
            },
            {
              h2: "Pick one place",
              body: "Set the canonical in one place and keep it consistent. Most sites use the HTML head tag and never touch the header. If a CDN or framework is adding a Link-header canonical you did not ask for, that is usually the cause. Line it up with the head tag, or remove it, so there is one clear answer.",
            },
          ],
        }),
      }),
      {
        headers: {
          link: `<${ctx.origin}/index/canonical-conflict?via=header>; rel="canonical"`,
        },
      },
    ),
};

// 18 — canonical points at a 404 -----------------------------------------
const canonicalToBroken: Fixture = {
  path: "/index/canonical-to-broken",
  category: CAT,
  name: "Canonical to a page that 404s",
  summary: "Names a URL that returns 404 as its canonical.",
  lesson:
    "A canonical to a dead URL is a vote for a page that no longer exists. Search engines discard the directive and pick a canonical themselves.",
  expectedIssues: [
    "canonicalized-page",
    "sitemap-canonicalized-page",
    "canonical-to-broken",
  ],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: canonicalToBroken,
        title: "A page whose canonical is a dead URL",
        metaDescription:
          "The rel=canonical on this page points at a URL that returns 404, so the directive cannot be honoured.",
        canonical: `${ctx.origin}/status/not-found`,
        bodyHtml: article({
          h1: "This page votes for a URL that does not exist",
          lede: "The canonical here points at a 404. There is nothing at the other end to receive the ranking signal.",
          sections: [
            {
              h2: "What a search engine does with it",
              body: "A canonical is a hint, not a command, and a hint that points at a missing page is worthless. Google drops the directive and works out its own canonical from links, sitemaps and content similarity. The page may still rank, but under a URL you did not choose, and any consolidation you were trying to achieve does not happen.",
            },
            {
              h2: "How it happens",
              body: "Almost always through a URL that used to work. A section is restructured, a product is retired, a slug changes, and the canonical on a dozen other pages keeps pointing at the old address. Nothing errors and nothing in the content management system complains, because the tag is still perfectly valid HTML. Only a crawl that actually fetches the canonical target notices.",
            },
          ],
        }),
      }),
    ),
};

// 19 — canonical points at a redirect -------------------------------------
const canonicalToRedirect: Fixture = {
  path: "/index/canonical-to-redirect",
  category: CAT,
  name: "Canonical to a redirect",
  summary: "Names a URL that 301-redirects somewhere else as its canonical.",
  lesson:
    "Google follows the redirect, but the URL you declared and the URL that gets served are not the same. Point the canonical at the final address.",
  expectedIssues: [
    "canonicalized-page",
    "sitemap-canonicalized-page",
    "canonical-to-redirect",
  ],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: canonicalToRedirect,
        title: "A page whose canonical redirects",
        metaDescription:
          "The rel=canonical on this page points at a URL that answers with a 301 instead of content.",
        canonical: `${ctx.origin}/redirect/chain-1`,
        bodyHtml: article({
          h1: "The canonical here is a signpost, not a destination",
          lede: "The URL this page declares as canonical does not serve content. It redirects.",
          sections: [
            {
              h2: "Why it is weaker than it looks",
              body: "Google will usually follow the redirect and land on the real page, so this rarely breaks outright. What it does is add an indirection that nothing needs: the address you publish, the address in the canonical, and the address that finally answers are three different strings. Every extra hop is a place for the signal to be interpreted differently than you intended.",
            },
            {
              h2: "The fix is mechanical",
              body: "Resolve the redirect yourself and put the final URL in the canonical. This is the commonest form of the mistake after a migration, when every canonical still names the pre-migration address and a blanket redirect rule quietly papers over it.",
            },
          ],
        }),
      }),
    ),
};

// 20 — canonical points at a noindexed page -------------------------------
const canonicalToNoindex: Fixture = {
  path: "/index/canonical-to-noindex",
  category: CAT,
  name: "Canonical to a noindexed page",
  summary: "Names a page that carries a robots noindex tag as its canonical.",
  lesson:
    "One page says index that one instead; the other says do not index me. The two directives cancel, and both URLs can fall out of the index.",
  expectedIssues: [
    "canonicalized-page",
    "sitemap-canonicalized-page",
    "canonical-to-noindex",
  ],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: canonicalToNoindex,
        title: "A page whose canonical is noindexed",
        metaDescription:
          "This page defers indexing to another URL, and that URL asks not to be indexed at all.",
        canonical: `${ctx.origin}/index/noindex-meta`,
        bodyHtml: article({
          h1: "Two directives that cancel each other",
          lede: "This page says index the other one. The other one says do not index me.",
          sections: [
            {
              h2: "What is left over",
              body: "Nothing useful. This page has waived its own claim to the index, and the page it handed that claim to has refused it. Google resolves the contradiction however it likes, and the common outcome is that neither URL ranks. Worse, the noindex can be read as applying to the consolidated page, taking this one down with it.",
            },
            {
              h2: "Where it comes from",
              body: "Usually two separate, individually sensible decisions made months apart: a canonical added to consolidate variants, and later a noindex added to the target to keep it out of results. Neither change is wrong on its own, and nothing connects them, so the contradiction only appears to someone who follows the canonical and reads the robots tag at the other end.",
            },
          ],
        }),
      }),
    ),
};

// 21 — hreflang set with no x-default -------------------------------------
const hreflangNoXDefault: Fixture = {
  path: "/index/hreflang-no-x-default",
  category: CAT,
  name: "hreflang without x-default",
  summary:
    "Declares language alternates but never says which one is the fallback.",
  lesson:
    "x-default is what a visitor gets when none of the declared languages match them. Without it, the search engine chooses for you.",
  expectedIssues: ["hreflang-missing-x-default"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangNoXDefault,
        title: "Language alternates with no fallback",
        metaDescription:
          "This page declares English and German alternates through hreflang, but never declares an x-default fallback version.",
        headExtra: [
          `<link rel="alternate" hreflang="en" href="${ctx.origin}/index/hreflang-no-x-default">`,
          `<link rel="alternate" hreflang="de" href="${ctx.origin}/index/hreflang-no-x-default?lang=de">`,
        ].join("\n"),
        bodyHtml: article({
          h1: "Two languages, no fallback",
          lede: "English and German are declared. Everyone else gets whatever the search engine decides.",
          sections: [
            {
              h2: "What x-default is for",
              body: "An hreflang set tells a search engine which version to show a visitor in a given language and region. x-default covers everyone the set does not: a Portuguese speaker arriving at a site that publishes only English and German. It is usually a language-selection page, or the version of the default market, and it is the only way to make that choice yourself.",
            },
            {
              h2: "Not an error, but a gap",
              body: "Leaving it out breaks nothing. Google will still serve one of the declared versions and will guess which one from the signals it has. The point of declaring x-default is that guessing stops: unmatched visitors land where you decided they should, which on a site with a real language switcher is almost always somewhere better than an arbitrary pick.",
            },
          ],
        }),
      }),
    ),
};

// 22 — hreflang alternate that never points back --------------------------
const hreflangNoReturn: Fixture = {
  path: "/index/hreflang-no-return",
  category: CAT,
  name: "hreflang with no return tag",
  summary:
    "Declares a German alternate; that page does not declare this one back.",
  lesson:
    "hreflang only works if both pages name each other. A one-way declaration is discarded, so the pairing quietly does nothing.",
  expectedIssues: ["hreflang-no-return-tag"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangNoReturn,
        title: "An hreflang pairing that only goes one way",
        metaDescription:
          "This page names a German alternate, but that page never names this one back, so the pairing is incomplete.",
        headExtra: [
          `<link rel="alternate" hreflang="en" href="${ctx.origin}/index/hreflang-no-return">`,
          `<link rel="alternate" hreflang="de" href="${ctx.origin}/index/hreflang-return-target">`,
          `<link rel="alternate" hreflang="x-default" href="${ctx.origin}/index/hreflang-no-return">`,
        ].join("\n"),
        bodyHtml: article({
          h1: "A claim only one page is making",
          lede: "This page says the German version lives elsewhere. That page has never heard of this one.",
          sections: [
            {
              h2: "Why both sides have to agree",
              body: "An hreflang annotation is a claim about a group of pages, and a search engine will only act on it if every page in the group makes the same claim. When this page names a German alternate and the German page does not name this one back, the pairing is unconfirmed, so it is thrown away. Both pages go on ranking as unrelated documents, which is exactly what the annotation existed to prevent.",
            },
            {
              h2: "Why it is so easy to miss",
              body: "Look at either page on its own and nothing is wrong. The tags are valid, the URLs resolve, the language codes are correct. The defect exists only in the relationship between the two, so it survives every check that reads one page at a time. It usually appears when a translation is published from a template that lists alternates one-way, or when one language is migrated and the other is not.",
            },
          ],
        }),
      }),
    ),
};

// 23 — the alternate above, which declines to reciprocate -----------------
const hreflangReturnTarget: Fixture = {
  path: "/index/hreflang-return-target",
  category: CAT,
  name: "hreflang alternate that does not reciprocate",
  summary:
    "The German page named above. It only names itself, which is what breaks the pair.",
  support: true,
  expectedIssues: [],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangReturnTarget,
        title: "The German alternate that never points back",
        metaDescription:
          "This page is the target of another page's hreflang annotation, and it declares only itself in return.",
        lang: "de",
        headExtra: [
          `<link rel="alternate" hreflang="de" href="${ctx.origin}/index/hreflang-return-target">`,
          `<link rel="alternate" hreflang="x-default" href="${ctx.origin}/index/hreflang-return-target">`,
        ].join("\n"),
        bodyHtml: article({
          h1: "This page names only itself",
          lede: "Another page calls this one its German version. This page makes no such claim.",
          sections: [
            {
              h2: "Nothing here is wrong on its own",
              body: "The annotations on this page are valid. It declares a German version and a default, both pointing at itself, which is a perfectly ordinary thing for a single-language page to do. Read in isolation it passes every check, and that is the point: the missing return tag is only a defect in the context of the page that points here.",
            },
            {
              h2: "What the fix would be",
              body: "Adding one line here, naming the English page as the en alternate, completes the group and both annotations start working. Until then the audit reports the problem against the page that made the unconfirmed claim, because that is the page whose intent is not being honoured.",
            },
          ],
        }),
      }),
    ),
};

export const indexabilityFixtures: Fixture[] = [
  noindexMeta,
  noindexHeader,
  canonicalized,
  canonicalConflict,
  canonicalToBroken,
  canonicalToRedirect,
  canonicalToNoindex,
  hreflangNoXDefault,
  hreflangNoReturn,
  hreflangReturnTarget,
  ...indexabilityExtraFixtures,
];
