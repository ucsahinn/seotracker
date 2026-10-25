import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locales, privacyUrl } from "./site-locales.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "site");
const copy = JSON.parse(
  fs.readFileSync(new URL("./site-privacy.json", import.meta.url), "utf8"),
);
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const url = (lang) => `https://seowatcher.io${privacyUrl(locales[lang])}`;
const alternates = [
  ...Object.keys(copy).map((lang) => [lang, url(lang)]),
  ["x-default", url("tr")],
];
for (const [lang, text] of Object.entries(copy)) {
  const locale = locales[lang];
  const localeDir = lang === "tr" ? "" : lang;
  const dir = path.join(site, localeDir, locale.privacySlug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(text.title)} | seowatcher</title><meta name="description" content="${escape(text.intro)}">
<link rel="canonical" href="${url(lang)}">
${alternates.map(([code, href]) => `<link rel="alternate" hreflang="${code}" href="${href}">`).join("\n")}
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/consent.css?v=1"><script src="/assets/consent.js?v=2" defer></script>
</head><body data-privacy-page><main><a href="${lang === "tr" ? "/" : `/${lang}/`}">seowatcher · ${escape(text.home)}</a><h1>${escape(text.title)}</h1><p>${escape(text.intro)}</p>
${text.sections.map(([title, paragraph]) => `<section><h2>${escape(title)}</h2><p>${escape(paragraph)}</p></section>`).join("\n")}
<p><a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy</a> · <a href="https://policies.google.com/technologies/cookies" rel="noopener noreferrer" target="_blank">Google Cookies</a> · <a href="https://github.com/ucsahinn" rel="noopener noreferrer" target="_blank">GitHub / ucsahinn</a></p>
<nav aria-label="Language">${Object.keys(copy)
      .map(
        (code) =>
          `<a href="${privacyUrl(locales[code])}" lang="${code}" hreflang="${code}"${lang === code ? ' aria-current="page"' : ""}>${code.toUpperCase()}</a>`,
      )
      .join(" ")}</nav></main><footer></footer></body></html>\n`,
  );
  if (locale.privacySlug !== "privacy") {
    const legacyDir = path.join(site, localeDir, "privacy");
    fs.mkdirSync(legacyDir, { recursive: true });
    const target = privacyUrl(locale);
    fs.writeFileSync(
      path.join(legacyDir, "index.html"),
      `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="${url(lang)}"><meta http-equiv="refresh" content="0;url=${target}"><title>${escape(text.title)} | seowatcher</title></head><body><a href="${target}">${escape(text.title)}</a></body></html>\n`,
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
      `  <url><loc>${url(lang)}</loc>${alternates.map(([code, href]) => `<xhtml:link rel="alternate" hreflang="${code}" href="${href}" />`).join("")}</url>`,
  )
  .join("\n");
sitemap = sitemap.replace("</urlset>", `${entries}\n</urlset>`);
fs.writeFileSync(sitemapFile, sitemap);
console.log(
  "Privacy pages written: tr, en, de, fr, it, pt; sitemap includes 6 policy URLs.",
);
