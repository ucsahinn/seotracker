/**
 * Builds the English home page from the Turkish one.
 *
 *   node scripts/build-site-home.mjs extract   # list every translatable string
 *   node scripts/build-site-home.mjs build     # write site/en/index.html
 *
 * `site/index.html` is the only hand-written home page. Its markup, CSS and
 * scripts are shared by both languages; only the words differ. `extract`
 * collects every text segment and attribute of the Turkish page into
 * `scripts/site-home.en.json` (keeping translations already there), and
 * `build` writes `site/en/index.html` with each segment replaced by its
 * English entry. A Turkish string without an English entry fails the build,
 * so the two pages cannot drift apart silently.
 *
 * A "segment" is the inner HTML of a leaf element (a paragraph, heading, list
 * item, button, table cell, svg label ...), so inline tags such as <a> or
 * <strong> stay inside one translatable sentence. An inline <svg> counts as a
 * block today (BLOCK below), so an icon splits a sentence into fragments; the
 * ⟦svgN⟧ tokens only matter if that ever changes.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  hasHome,
  langMenuHtml,
  langRowHtml,
  locales,
  readableDate,
  rewriteLinks,
} from "./site-locales.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcFile = path.join(root, "site", "index.html");
// Which edition: `node scripts/build-site-home.mjs extract de` writes the
// German table; `build` without a language builds every table that is filled.
const langArg = process.argv[3];
const mapFileOf = (lang) =>
  path.join(root, "scripts", `site-home.${lang}.json`);
const outFileOf = (lang) => path.join(root, "site", lang, "index.html");
const siteUrl = "https://seowatcher.io";

const LEAF = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "li",
  "dt",
  "dd",
  "summary",
  "figcaption",
  "blockquote",
  "label",
  "button",
  "th",
  "td",
  "small",
  "cite",
  "legend",
  "text",
  "title",
  "noscript",
]);
// Opening one of these inside a leaf means the leaf is a container, not a sentence.
const BLOCK = new Set([
  ...LEAF,
  "div",
  "ul",
  "ol",
  "section",
  "article",
  "nav",
  "picture",
  "figure",
  "dl",
  "details",
  "table",
  "thead",
  "tbody",
  "tr",
  "header",
  "footer",
  "main",
  "aside",
  "form",
  "svg",
]);
const ATTRS = new Set([
  "alt",
  "aria-label",
  "title",
  "placeholder",
  "data-still-on",
  "data-still-off",
  "data-suffix",
]);
const META_CONTENT = new Set([
  "description",
  "og:title",
  "og:description",
  "twitter:title",
  "twitter:description",
  "og:image:alt",
  "twitter:image:alt",
]);
// Strings that read the same in both languages: brands, products, numbers.
const SAME = new Set([
  "seowatcher",
  "seotracker",
  "GitHub",
  "Google",
  "MIT",
  "Docker",
  "Windows",
  "macOS",
  "Linux",
  "Codex",
  "Codex (OpenAI)",
  "OpenAI",
  "Claude",
  "Claude Code",
  "Anthropic",
  "Cursor",
  "Gemini",
  "Gemini CLI",
  "Windsurf",
  "VS Code",
  "Copilot",
  "GitHub Copilot",
  "Google Search Console",
  "Search Console",
  "Google Analytics 4",
  "GA4",
  "PageSpeed Insights",
  "Lighthouse",
  "127.0.0.1:3001",
  "SHA-256",
  "MCP",
  "Cloudflare",
  "Geist",
  "x64",
]);

// JSON-LD fields whose values are vocabulary, codes or identifiers, not prose.
const SKIP_JSON_KEYS = new Set([
  "@type",
  "@context",
  "@id",
  "inLanguage",
  "priceCurrency",
  "applicationCategory",
  "operatingSystem",
  "encodingFormat",
  "fileFormat",
  "name_",
]);

// "2.3.6, 23 Ekim 2026": the release line changes every version, so it is
// translated by rule instead of by the map (and never listed by `extract`).
const TR_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const RELEASE_LINE = new RegExp(
  `^(\\d+\\.\\d+\\.\\d+), (\\d{1,2}) (${TR_MONTHS.join("|")}) (\\d{4})$`,
);
function byRule(key, locale) {
  const m = RELEASE_LINE.exec(key);
  if (!m) return null;
  const month = String(TR_MONTHS.indexOf(m[3]) + 1).padStart(2, "0");
  const day = m[2].padStart(2, "0");
  return `${m[1]}, ${readableDate(locale, `${m[4]}-${month}-${day}`)}`;
}

// The flag menu and the flag rows are generated per edition, never
// translated: they are cut out before the page is read and put back after.
const LANG_BLOCK =
  /<details class="langs">[\s\S]*?<\/details>|<nav class="langrow"[\s\S]*?<\/nav>/g;
function cutLangBlocks(html) {
  return html.replace(LANG_BLOCK, (m) =>
    m.startsWith("<details") ? "<!--LANGMENU-->" : "<!--LANGROW-->",
  );
}
function putLangBlocks(html, locale) {
  const hrefFor = (l) => `${l.base}/`;
  // The edition being built is available even before its file exists.
  const available = (l) => l.lang === locale.lang || hasHome(l);
  return html
    .replaceAll("<!--LANGMENU-->", () =>
      langMenuHtml(locale, hrefFor, { available }),
    )
    .replaceAll("<!--LANGROW-->", () =>
      langRowHtml(locale, hrefFor, { available }),
    );
}

// Links that leave the site open in a new tab. The attributes are set by
// rule on every edition, never translated: they are dropped before the page
// is read, so a translation key does not change when a link gains them, and
// added back to every external link of the built page.
const NEW_TAB = ' target="_blank" rel="noopener noreferrer"';
const dropNewTab = (html) =>
  html.replace(/\s+target="_blank"\s+rel="noopener noreferrer"/g, "");
function addNewTab(html) {
  return html.replace(/<a\b[^>]*>/g, (tag) => {
    const m = /\bhref="(https?:\/\/[^"]+)"/.exec(tag);
    if (!m || /^https?:\/\/(www\.)?seowatcher\.io(\/|$)/.test(m[1])) return tag;
    return tag.replace(m[0], () => m[0] + NEW_TAB);
  });
}

const hasLetters = (s) => /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(s);
const collapse = (s) => s.replace(/\s+/g, " ").trim();
// Text alone decides: tags and svg tokens are stripped before the brand check,
// so a logo cell whose only words are "GitHub" is copied as is.
const bareText = (key) =>
  key
    .replace(/<[^>]+>|⟦svg\d+⟧/g, "")
    .replace(/\s+/g, " ")
    .trim();
const needsTranslation = (key) =>
  hasLetters(bareText(key)) &&
  !SAME.has(bareText(key)) &&
  !RELEASE_LINE.test(key);

function tokenize(html) {
  // Comments, whole script/style elements and single tags are tokens; the
  // rest is text. Attribute values never contain ">" in this file.
  return html
    .split(
      /(<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]+>)/,
    )
    .filter((t) => t !== "");
}

function tagInfo(tok) {
  const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([\s\S]*?)(\/?)>$/.exec(tok);
  if (!m) return null;
  return {
    closing: m[1] === "/",
    name: m[2].toLowerCase(),
    attrs: m[3],
    selfClosing:
      m[4] === "/" ||
      /^(meta|link|img|br|hr|input|source|path|circle|rect|line|polyline|polygon|use|stop)$/.test(
        m[2].toLowerCase(),
      ),
  };
}

/** Finds leaf segments: [startTokenIndex, endTokenIndex] of the inner tokens. */
function findSegments(tokens) {
  const segments = [];
  let open = null;
  for (let i = 0; i < tokens.length; i += 1) {
    const tok = tokens[i];
    if (
      !tok.startsWith("<") ||
      tok.startsWith("<!--") ||
      /^<(script|style)\b/i.test(tok)
    ) {
      if (open && /^<(script|style)\b/i.test(tok)) open = null;
      continue;
    }
    const tag = tagInfo(tok);
    if (!tag || tag.selfClosing) continue;
    if (tag.closing) {
      if (open && tag.name === open.name) {
        if (i > open.start + 1)
          segments.push({ start: open.start + 1, end: i - 1, name: open.name });
        open = null;
      }
      continue;
    }
    if (BLOCK.has(tag.name)) {
      // A block inside the open leaf: the leaf was a container. Drop it and
      // let the inner block (if a leaf) start a segment of its own.
      open = LEAF.has(tag.name) ? { name: tag.name, start: i } : null;
    }
  }
  return segments;
}

function segmentKey(tokens, seg, svgs) {
  let inner = tokens.slice(seg.start, seg.end + 1).join("");
  inner = inner.replace(/<svg\b[\s\S]*?<\/svg>/g, (m) => {
    svgs.push(m);
    return `⟦svg${svgs.length - 1}⟧`;
  });
  return collapse(inner);
}

function attrEntries(tok) {
  const out = [];
  const tag = tagInfo(tok);
  if (!tag || tag.closing) return out;
  const isMeta = tag.name === "meta";
  const nameMatch = /\b(?:name|property)="([^"]*)"/.exec(tag.attrs);
  for (const m of tag.attrs.matchAll(/\b([a-zA-Z-]+)="([^"]*)"/g)) {
    const [, name, value] = m;
    if (
      ATTRS.has(name) ||
      (isMeta &&
        name === "content" &&
        nameMatch &&
        META_CONTENT.has(nameMatch[1]))
    )
      if (needsTranslation(collapse(value))) out.push({ name, value });
  }
  return out;
}

/** Every translatable string of the page, in order of appearance. */
function collect(html) {
  const tokens = tokenize(html);
  const segments = findSegments(tokens);
  const inSegment = new Set();
  const keys = [];
  const seen = new Set();
  const add = (k, where) => {
    if (!needsTranslation(k) || seen.has(k)) return;
    seen.add(k);
    keys.push({ key: k, where });
  };
  for (const seg of segments) {
    for (let i = seg.start; i <= seg.end; i += 1) inSegment.add(i);
    add(segmentKey(tokens, seg, []), seg.name);
  }
  tokens.forEach((tok, i) => {
    if (tok.startsWith("<!--")) return;
    if (/^<script\b/i.test(tok)) {
      if (/application\/ld\+json/.test(tok))
        walkJson(
          JSON.parse(tok.replace(/^<script[^>]*>|<\/script>$/g, "")),
          (s) => add(collapse(s), "json-ld"),
        );
      return;
    }
    if (tok.startsWith("<")) {
      for (const a of attrEntries(tok)) add(collapse(a.value), `@${a.name}`);
      return;
    }
    if (!inSegment.has(i)) add(collapse(tok), "text");
  });
  return keys;
}

function walkJson(node, fn, key = "") {
  if (typeof node === "string") {
    if (
      SKIP_JSON_KEYS.has(key) ||
      /^https?:\/\//.test(node) ||
      /^[\d.]+$/.test(node)
    )
      return;
    fn(node);
  } else if (Array.isArray(node)) node.forEach((n) => walkJson(n, fn, key));
  else if (node && typeof node === "object")
    for (const [k, v] of Object.entries(node)) walkJson(v, fn, k);
}

function mapJson(node, fn, key = "", parent = null) {
  if (typeof node === "string") return fn(node, key, parent);
  if (Array.isArray(node)) return node.map((n) => mapJson(n, fn, key, parent));
  if (node && typeof node === "object")
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, mapJson(v, fn, k, node)]),
    );
  return node;
}

function readMap(lang) {
  const mapFile = mapFileOf(lang);
  return fs.existsSync(mapFile)
    ? JSON.parse(fs.readFileSync(mapFile, "utf8"))
    : {};
}

function extract(lang) {
  const html = dropNewTab(cutLangBlocks(fs.readFileSync(srcFile, "utf8")));
  const keys = collect(html);
  const old = readMap(lang);
  const next = {};
  let missing = 0;
  for (const { key } of keys) {
    next[key] = old[key] ?? "";
    if (!next[key]) missing += 1;
  }
  const stale = Object.keys(old).filter((k) => !(k in next));
  fs.writeFileSync(mapFileOf(lang), JSON.stringify(next, null, 2) + "\n");
  console.log(
    `${lang}: ${keys.length} strings, ${missing} without a translation, ${stale.length} stale entries dropped`,
  );
}

function build(locale, { strict = true } = {}) {
  const lang = locale.lang;
  const html = dropNewTab(cutLangBlocks(fs.readFileSync(srcFile, "utf8")));
  const map = readMap(lang);
  const outFile = outFileOf(lang);
  const missing = [];
  const tr = (key) => {
    if (!needsTranslation(key)) return byRule(key, locale) || key;
    const v = map[key];
    if (!v) {
      missing.push(key);
      return key;
    }
    return v;
  };
  const tokens = tokenize(html);
  const segments = findSegments(tokens);
  const out = tokens.slice();
  for (const seg of segments) {
    const svgs = [];
    const key = segmentKey(tokens, seg, svgs);
    let text = tr(key).replace(/⟦svg(\d+)⟧/g, (_, n) => svgs[Number(n)]);
    // Keep the original leading/trailing whitespace so prettier's layout holds.
    const lead = /^\s*/.exec(tokens[seg.start])[0];
    const trail = /\s*$/.exec(tokens[seg.end])[0];
    out[seg.start] = lead + text + trail;
    for (let i = seg.start + 1; i <= seg.end; i += 1) out[i] = "";
  }
  const inSegment = new Set(
    segments.flatMap((s) =>
      Array.from({ length: s.end - s.start + 1 }, (_, k) => s.start + k),
    ),
  );
  tokens.forEach((tok, i) => {
    if (inSegment.has(i) || tok.startsWith("<!--")) return;
    if (/^<script\b/i.test(tok)) {
      if (!/application\/ld\+json/.test(tok)) return;
      const open = /^<script[^>]*>/.exec(tok)[0];
      const data = JSON.parse(tok.slice(open.length, -"</script>".length));
      const translated = mapJson(data, (s, key, parent) => {
        // The site entity lists every edition and the app speaks Turkish in
        // every edition (its interface is Turkish); the page and its FAQ are
        // in this edition's language.
        if (key === "inLanguage")
          return /^(WebSite|SoftwareApplication)$/.test(parent?.["@type"])
            ? s
            : lang;
        // The site, its publisher and the app are one entity in both languages.
        if (
          key === "url" &&
          parent &&
          /^(WebSite|Organization|SoftwareApplication)$/.test(parent["@type"])
        )
          return s;
        // Entities that are the same thing in every language keep one id;
        // everything else (the page, its breadcrumb, its FAQ) gets the
        // edition's id.
        if (
          s.startsWith(siteUrl) &&
          !/#(website|app|author|organization|logo)$/.test(s)
        )
          return (
            siteUrl +
            rewriteLinks(`href="${s.slice(siteUrl.length)}"`, locale).slice(
              6,
              -1,
            )
          );
        if (SKIP_JSON_KEYS.has(key)) return s;
        if (/^https?:\/\//.test(s) || /^[\d.]+$/.test(s)) return s;
        return tr(collapse(s));
      });
      out[i] =
        `${open}${JSON.stringify(translated).replaceAll("</", "<\\/")}</script>`;
      return;
    }
    if (tok.startsWith("<")) {
      let t = tok;
      for (const a of attrEntries(tok)) {
        // " ay" -> " months": the counter glues the suffix to the number, so
        // the leading space must survive the lookup.
        const lead = /^\s*/.exec(a.value)[0];
        const trail = /\s*$/.exec(a.value)[0];
        const value =
          lead + tr(collapse(a.value)).replace(/"/g, "&quot;") + trail;
        t = t.replace(`${a.name}="${a.value}"`, () => `${a.name}="${value}"`);
      }
      out[i] = t;
      return;
    }
    if (needsTranslation(collapse(tok))) {
      const lead = /^\s*/.exec(tok)[0];
      const trail = /\s*$/.exec(tok)[0];
      out[i] = lead + tr(collapse(tok)) + trail;
    }
  });
  let page = out.join("");
  const home = `https://seowatcher.io${locale.base}/`;
  const otherLocales = Object.values(locales)
    .filter((l) => l.lang !== lang && hasHome(l))
    .map(
      (l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`,
    )
    .join("\n    ");
  page = page
    .replace(/<html lang="tr">/, `<html lang="${lang}">`)
    .replace(/\s*<meta property="og:locale:alternate" content="[^"]*" \/>/g, "")
    .replace(
      /<meta property="og:locale" content="tr_TR" \/>/,
      `<meta property="og:locale" content="${locale.ogLocale}" />\n    ${otherLocales}`,
    )
    .replace(/href="https:\/\/seowatcher\.io\/"/g, (m, offset) =>
      // canonical and og:url point at this edition; hreflang links stay.
      /hreflang=/.test(page.slice(Math.max(0, offset - 80), offset))
        ? m
        : `href="${home}"`,
    )
    .replace(/content="https:\/\/seowatcher\.io\/"/g, `content="${home}"`);
  page = rewriteLinks(page, locale);
  // Each edition shares a card with its own words on it.
  page = page.replaceAll(
    "https://seowatcher.io/assets/og.png",
    `https://seowatcher.io/assets/og-${lang}.png`,
  );
  page = addNewTab(putLangBlocks(page, locale));
  if (!page.includes(`<details class="langs">`))
    throw new Error("language menu missing from the built page");
  if (missing.length) {
    const msg = `site/${lang}/index.html not written: ${missing.length} strings have no entry in scripts/site-home.${lang}.json`;
    if (!strict) {
      console.warn(`warning: ${msg}`);
      return false;
    }
    console.error(msg + ":");
    for (const k of missing) console.error("  " + k);
    process.exit(1);
  }
  // Checked once every string has an entry: an untranslated string is
  // reported above as missing, this catches a translation that kept the lira.
  for (const leftover of ["İçeriğe", 'data-suffix="months"', "₺"])
    if (page.includes(leftover))
      throw new Error(
        `Turkish leftover in site/${lang}/index.html: ${leftover}`,
      );
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log(`site/${lang}/index.html written (${segments.length} segments)`);
  return true;
}

/**
 * The Turkish home is hand-written, but its flag menu and flag rows are not:
 * they are regenerated on every build from the editions on disk, so a new
 * edition shows up in the Turkish menu too and the menu can never go stale.
 * Prettier formats the result so the hand-written file stays in its style.
 */
async function refreshTurkishLangBlocks() {
  const src = fs.readFileSync(srcFile, "utf8");
  const blocks = src.match(LANG_BLOCK) || [];
  if (!blocks.some((b) => b.startsWith("<details")))
    throw new Error("language menu missing from site/index.html");
  const prettier = await import("prettier");
  const options = (await prettier.resolveConfig(srcFile)) || {};
  // The same rule as the editions: every link that leaves the site gets its
  // new-tab attributes here, so the hand-written page cannot miss one.
  const next = await prettier.format(
    addNewTab(putLangBlocks(dropNewTab(cutLangBlocks(src)), locales.tr)),
    { ...options, filepath: srcFile },
  );
  if (next === src) return;
  fs.writeFileSync(srcFile, next);
  console.log("site/index.html language menu refreshed");
}

const mode = process.argv[2];
if (mode === "extract") extract(langArg || "en");
else if (mode === "build" && langArg) {
  build(locales[langArg]);
  await refreshTurkishLangBlocks();
} else if (mode === "build") {
  // Every table on disk; an unfinished one is skipped with a warning so the
  // finished editions still build.
  for (const locale of Object.values(locales)) {
    if (locale.lang === "tr" || !fs.existsSync(mapFileOf(locale.lang)))
      continue;
    build(locale, { strict: false });
  }
  // After the editions, so one written just now is already listed.
  await refreshTurkishLangBlocks();
} else {
  console.error("usage: node scripts/build-site-home.mjs extract|build");
  process.exit(2);
}
