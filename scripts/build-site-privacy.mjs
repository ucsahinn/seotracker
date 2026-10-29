import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  locales,
  privacyUrl,
  readableDate,
  withGa4Meta,
} from "./site-locales.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "site");
// The privacy page styles itself with the consent sheet, so it is inlined
// like on the home page: styled at first paint without a blocking request.
const consentCss = fs
  .readFileSync(new URL("../site/assets/consent.css", import.meta.url), "utf8")
  .trim();
const copy = JSON.parse(
  fs.readFileSync(new URL("./site-privacy.json", import.meta.url), "utf8"),
);
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
// The policy changes when its text does: the last commit of the copy, or
// today while the copy has uncommitted edits (the coming commit's date).
function policyDate() {
  const file = "scripts/site-privacy.json";
  const today = new Date().toISOString().slice(0, 10);
  try {
    const git = (args) =>
      execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
    if (git(["status", "--porcelain", "--", file])) return today;
    const date = git(["log", "-1", "--format=%cs", "--", file]);
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today;
  } catch {
    return today;
  }
}
const updated = policyDate();
const url = (lang) => `https://seowatcher.io${privacyUrl(locales[lang])}`;
const alternates = [
  ...Object.keys(copy).map((lang) => [lang, url(lang)]),
  ["x-default", url("en")],
];
for (const [lang, text] of Object.entries(copy)) {
  const locale = locales[lang];
  const localeDir = lang === "tr" ? "" : lang;
  const dir = path.join(site, localeDir, locale.privacySlug);
  const socialTitle = escape(`${text.title} | seowatcher`);
  const socialDescription = escape(text.intro);
  const socialImage = `https://seowatcher.io/assets/${lang === "tr" ? "og.png" : `og-${lang}.png`}`;
  const otherLocales = Object.values(locales)
    .filter((other) => other.lang !== lang)
    .map(
      (other) =>
        `<meta property="og:locale:alternate" content="${other.ogLocale}">`,
    )
    .join("\n");
  // The same site entities as every other page, plus this policy page with
  // the date it shows. "</" never occurs in the data, but stays escaped.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://seowatcher.io/#website",
        url: "https://seowatcher.io/",
        name: "seowatcher",
        alternateName: ["seotracker"],
        publisher: { "@id": "https://seowatcher.io/#author" },
      },
      {
        "@type": "Organization",
        "@id": "https://seowatcher.io/#author",
        name: "seowatcher",
        url: "https://seowatcher.io/",
        logo: "https://seowatcher.io/assets/icon-256.png",
        sameAs: ["https://github.com/ucsahinn/seotracker"],
      },
      {
        "@type": "WebPage",
        "@id": `${url(lang)}#webpage`,
        url: url(lang),
        name: text.title,
        description: text.intro,
        inLanguage: lang,
        dateModified: updated,
        isPartOf: { "@id": "https://seowatcher.io/#website" },
        publisher: { "@id": "https://seowatcher.io/#author" },
      },
    ],
  }).replaceAll("</", "<\\/");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    withGa4Meta(`<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(text.title)} | seowatcher</title><meta name="description" content="${escape(text.intro)}">
<link rel="canonical" href="${url(lang)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="seowatcher">
<meta property="og:title" content="${socialTitle}"><meta property="og:description" content="${socialDescription}">
<meta property="og:url" content="${url(lang)}"><meta property="og:locale" content="${locale.ogLocale}">
${otherLocales}
<meta property="og:image" content="${socialImage}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${socialTitle}"><meta name="twitter:description" content="${socialDescription}"><meta name="twitter:image" content="${socialImage}">
${alternates.map(([code, href]) => `<link rel="alternate" hreflang="${code}" href="${href}">`).join("\n")}
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest" />
<link rel="alternate" type="application/atom+xml" title="seowatcher" href="${locale.base}/feed.xml">
<script type="application/ld+json">${jsonLd}</script>
<style data-consent-css>${consentCss}</style><meta name="ga4-id" content="" /><script src="/assets/consent.js?v=4" defer></script>
</head><body data-privacy-page><main><a href="${lang === "tr" ? "/" : `/${lang}/`}">seowatcher · ${escape(text.home)}</a><h1>${escape(text.title)}</h1><p>${escape(text.intro)}</p><p><small>${locale.t.updated}: <time datetime="${updated}">${readableDate(locale, updated)}</time></small></p>
${text.sections.map(([title, paragraph]) => `<section><h2>${escape(title)}</h2><p>${escape(paragraph)}</p></section>`).join("\n")}
<p><a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy</a> · <a href="https://policies.google.com/technologies/cookies" rel="noopener noreferrer" target="_blank">Google Cookies</a> · <a href="https://github.com/ucsahinn" rel="noopener noreferrer" target="_blank">GitHub / ucsahinn</a></p>
<nav aria-label="Language">${Object.keys(copy)
      .map(
        (code) =>
          `<a href="${privacyUrl(locales[code])}" lang="${code}" hreflang="${code}"${lang === code ? ' aria-current="page"' : ""}>${code.toUpperCase()}</a>`,
      )
      .join(" ")}</nav></main><footer></footer></body></html>\n`),
  );
  if (locale.privacySlug !== "privacy") {
    const legacyDir = path.join(site, localeDir, "privacy");
    fs.mkdirSync(legacyDir, { recursive: true });
    const target = privacyUrl(locale);
    fs.writeFileSync(
      path.join(legacyDir, "index.html"),
      `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="description" content="${escape(text.intro)}"><link rel="canonical" href="${url(lang)}"><meta http-equiv="refresh" content="0;url=${target}"><title>${escape(text.title)} | seowatcher</title></head><body><a href="${target}">${escape(text.title)}</a></body></html>\n`,
    );
  }
}
// The docs builder writes the content sitemap first; append policy pages once.
const sitemapFile = path.join(site, "sitemap.xml");
let sitemap = fs
  .readFileSync(sitemapFile, "utf8")
  .replace(/  <url>[\s\S]*?<\/url>/g, (entry) => {
    const loc = /<loc>([^<]+)<\/loc>/.exec(entry)?.[1];
    return Object.values(locales).some((locale) => url(locale.lang) === loc)
      ? ""
      : entry;
  });
const entries = Object.keys(copy)
  .map(
    (lang) =>
      `  <url><loc>${url(lang)}</loc><lastmod>${updated}</lastmod>${alternates.map(([code, href]) => `<xhtml:link rel="alternate" hreflang="${code}" href="${href}" />`).join("")}</url>`,
  )
  .join("\n");
sitemap = sitemap.replace("</urlset>", `${entries}\n</urlset>`);
fs.writeFileSync(sitemapFile, sitemap);
console.log(
  "Privacy pages written: tr, en, de, fr, it, pt; sitemap includes 6 policy URLs.",
);
