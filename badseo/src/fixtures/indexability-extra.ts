/**
 * Indexability fixtures added from a pass over Google's own documentation.
 *
 * Split from `indexability.ts` only because that file crossed the
 * line ceiling; they are the same category and land in the same list.
 */
import type { Fixture } from "./types";
import { htmlResponse, renderPage } from "../lib";
import { article } from "./helpers";

const CAT = "Indexability & canonical";

// 25 - an hreflang region code that is not ISO 3166-1 ---------------------
const hreflangInvalidCode: Fixture = {
  path: "/index/hreflang-invalid-code",
  category: CAT,
  name: "hreflang with an invalid region code",
  summary:
    "Declares en-UK and en_US. Neither is a code Google accepts, so both alternates are ignored.",
  lesson:
    "hreflang takes an ISO 639-1 language and an optional ISO 3166-1 Alpha 2 region, joined by a hyphen. The United Kingdom is GB, not UK, and the separator is never an underscore.",
  // No x-default either, which is a real second finding on this markup.
  expectedIssues: ["hreflang-invalid-code", "hreflang-missing-x-default"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangInvalidCode,
        title: "Two hreflang codes that do not exist",
        metaDescription:
          "This page declares en-UK and en_US as hreflang alternates. Google's own list of common mistakes names both shapes.",
        headExtra: [
          `<link rel="alternate" hreflang="en-UK" href="${ctx.origin}/index/hreflang-invalid-code?uk">`,
          `<link rel="alternate" hreflang="en_US" href="${ctx.origin}/index/hreflang-invalid-code?us">`,
          `<link rel="alternate" hreflang="tr" href="${ctx.origin}/index/hreflang-invalid-code">`,
        ].join("\n"),
        bodyHtml: article({
          h1: "en-UK is not a country code",
          lede: "Two of the three alternates on this page use codes Google does not recognise, so it ignores them.",
          sections: [
            {
              h2: "Where the codes come from",
              body: "The language part is ISO 639-1, two letters: en, de, tr. The optional region part is ISO 3166-1 Alpha 2, also two letters, and for the United Kingdom that is GB. UK is the internet domain, not the country code, and Google names it directly as a mistake people make. EU and UN are the other two it names; neither is a country.",
            },
            {
              h2: "And the separator",
              body: "Language and region are joined with a hyphen: en-GB. An underscore is what several templating systems produce when they reuse a locale string meant for a different system, and it makes the whole value invalid. The failure is silent: nothing errors, the alternate is simply not counted, and the cluster you thought you declared has one fewer member than you think.",
            },
          ],
        }),
      }),
    ),
};

// 26 - an hreflang set that forgets to list its own page ------------------
const hreflangNoSelf: Fixture = {
  path: "/index/hreflang-no-self",
  category: CAT,
  name: "hreflang set that omits itself",
  summary:
    "Lists the German alternate but never names this page, so the cluster is incomplete.",
  lesson:
    "Google asks every language version to list itself as well as all the others. A loop that skips the current page is the commonest way this breaks.",
  expectedIssues: ["hreflang-missing-self", "hreflang-missing-x-default"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: hreflangNoSelf,
        title: "An hreflang set with a hole in it",
        metaDescription:
          "This page declares a German alternate but never declares itself, which leaves the hreflang cluster incomplete.",
        headExtra: `<link rel="alternate" hreflang="de" href="${ctx.origin}/index/hreflang-no-x-default?lang=de">`,
        bodyHtml: article({
          h1: "The set does not include this page",
          lede: "One alternate is declared. The page declaring it is not in its own list.",
          sections: [
            {
              h2: "Why self-reference is required",
              body: "Google's documentation is explicit: each language version must list itself as well as all other language versions. The set is meant to be identical on every page in the cluster, which means every copy of it names every member, including the page carrying it. A set that names only the others is not the same set, and the cluster does not close.",
            },
            {
              h2: "How it usually happens",
              body: "A template loops over the available translations and renders a link for each one, skipping the current language because including it feels redundant. It is not redundant. The same loop with the skip removed produces the correct markup, and the version you are looking at appears in its own list.",
            },
          ],
        }),
      }),
    ),
};

// 27 - a page that tells Google not to follow its links -------------------
const nofollowPage: Fixture = {
  path: "/index/nofollow",
  category: CAT,
  name: "Indexable page with nofollow",
  summary: "Will be indexed, but every link leaving it is closed to Google.",
  lesson:
    "nofollow on a page stops Google using its links to find anything. On an indexable page that is a dead end in the crawl graph.",
  expectedIssues: ["nofollow-page"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: nofollowPage,
        title: "Indexed, but a dead end",
        metaDescription:
          "This page carries a nofollow robots directive while remaining indexable, so Google reads it and ignores every link on it.",
        headExtra: '<meta name="robots" content="index, nofollow">',
        bodyHtml: article({
          h1: "Index this, follow nothing",
          lede: "The directive says index, nofollow. Google will show this page and will not use any link on it to reach another.",
          sections: [
            {
              h2: "What nofollow does at page level",
              body: "Google's documentation puts it plainly: do not follow the links on this page, and if you do not specify the rule, Google may use those links to discover the linked pages. So a nofollow page is not just neutral, it withdraws a route. Anything reachable only from here becomes reachable only from somewhere else, or not at all.",
            },
            {
              h2: "When it is deliberate",
              body: "On a login screen, a faceted filter, or a page of user-submitted content, closing the links is often exactly right. The reason this is a warning rather than an error is that the tool cannot tell the two apart. What it can do is make sure you know the directive is there, because it is one line in a template and easy to inherit by accident.",
            },
          ],
        }),
      }),
    ),
};

// 28 - page two canonicalised back to page one ----------------------------
const paginatedCanonical: Fixture = {
  path: "/index/paginated/page/2",
  category: CAT,
  name: "Paginated page canonicalised to page one",
  summary:
    "Page two declares the unparameterised URL as its canonical, so its content leaves the index.",
  lesson:
    "Google asks each page in a paginated sequence to be its own canonical. Pointing them all at page one removes everything after page one from search.",
  // Listed in the sitemap and canonicalised away: both are true, and the
  // second pair is the mistake Google names for paginated sequences.
  expectedIssues: [
    "canonicalized-page",
    "sitemap-canonicalized-page",
    "paginated-canonical-to-first-page",
  ],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: paginatedCanonical,
        title: "Page two, pretending to be page one",
        metaDescription:
          "The second page of this sequence names the first page as its canonical, which takes its own content out of the index.",
        headExtra: `<link rel="canonical" href="${ctx.origin}/index/paginated">`,
        bodyHtml: article({
          h1: "This is page two",
          lede: "The canonical on this page names page one. Everything below is therefore invisible to search.",
          sections: [
            {
              h2: "Why this is not consolidation",
              body: "Canonicalising looks like tidying: one address for one piece of content. But pages two and after are not the same content as page one, they are the next items in a list. Telling Google they are duplicates of page one does not consolidate them, it discards them, and Google's pagination guidance says so directly: do not use the first page of a paginated sequence as the canonical page.",
            },
            {
              h2: "What to do instead",
              body: "Give every page in the sequence its own canonical, pointing at itself. If you also publish a view-all page that genuinely contains everything, Google allows that page to be the canonical for the sequence, because in that case the content really is the same.",
            },
          ],
        }),
      }),
    ),
};

// 29 - no viewport, so the mobile version is the desktop one, scaled -------
const missingViewport: Fixture = {
  path: "/index/no-viewport",
  category: CAT,
  name: "No viewport meta tag",
  summary:
    "Renders at desktop width on a phone, because nothing tells the browser otherwise.",
  lesson:
    "Google indexes the mobile version of a page. Without a viewport meta tag, that version is the desktop layout shrunk to fit, which nobody can read without zooming.",
  expectedIssues: ["missing-viewport"],
  handler: () =>
    htmlResponse(
      renderPage({
        fixture: missingViewport,
        title: "A page with no viewport",
        metaDescription:
          "This page omits the viewport meta tag, so a phone renders it at desktop width and scales the whole thing down.",
        omitViewport: true,
        bodyHtml: article({
          h1: "Desktop width, on a phone",
          lede: "Nothing here tells the browser how wide the page should be, so it assumes a desktop and shrinks.",
          sections: [
            {
              h2: "What the tag actually does",
              body: "A phone browser has to guess a width before it can lay anything out, and its guess is around 980 CSS pixels, because that is what an old desktop site expects. The viewport meta tag replaces that guess with the real device width. Without it, your responsive breakpoints never fire: the browser believes it has a wide screen, renders the desktop layout, then scales the result down to fit the physical display.",
            },
            {
              h2: "Why it matters more than it looks",
              body: "Google indexes the mobile version of a page, so the version being judged is the scaled-down one. The fix is a single line and is the same line on almost every site, which is precisely why its absence is usually an accident: a template that was never finished, or a page rendered outside the normal layout.",
            },
          ],
        }),
      }),
    ),
};

// 30 - a page whose own script robots.txt will not let a crawler fetch ----
const blockedResource: Fixture = {
  path: "/index/blocked-resource",
  category: CAT,
  name: "Page depends on a blocked script",
  summary:
    "The page is crawlable; the script that fills it in is disallowed, so a crawler sees the empty shell.",
  lesson:
    "Blocking a script does not hide the page, it hides the page's content from the crawler while leaving the page itself indexable. Block the page if you want it gone.",
  expectedIssues: ["blocked-resource"],
  handler: (ctx) =>
    htmlResponse(
      renderPage({
        fixture: blockedResource,
        title: "Crawlable page, uncrawlable script",
        metaDescription:
          "This page loads a script from a directory robots.txt disallows, so a crawler renders it without whatever that script would have added.",
        headExtra: `<script src="${ctx.origin}/blocked-assets/app.js"></script>`,
        bodyHtml: article({
          h1: "The page is allowed, the script is not",
          lede: "robots.txt disallows /blocked-assets/, and this page's only script lives there.",
          sections: [
            {
              h2: "What Google actually does",
              body: "Google's JavaScript documentation is direct about it: Search will not render JavaScript from blocked files or on blocked pages. It still crawls and indexes this page, because nothing stops it. It simply never runs the script, so whatever that script was going to put on the page does not exist as far as the index is concerned.",
            },
            {
              h2: "Why this is easy to do by accident",
              body: "Nobody blocks their own application code on purpose. It happens when a rule written for something else is broader than intended, most famously the old advice to disallow a CMS internals directory that also happens to hold the bundles. The page looks fine to you, because your browser is not obeying robots.txt. Blocking a page's resources is not a way to hide the page; it only changes what Google thinks is on it.",
            },
          ],
        }),
      }),
    ),
};

export const indexabilityExtraFixtures: Fixture[] = [
  hreflangInvalidCode,
  hreflangNoSelf,
  nofollowPage,
  paginatedCanonical,
  missingViewport,
  blockedResource,
];
