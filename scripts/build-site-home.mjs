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
 * <strong> stay inside one translatable sentence. Inline svg icons inside a
 * segment are replaced by ⟦svgN⟧ tokens so the translator never sees them.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rewriteLinksToEnglish } from "./site-locales.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcFile = path.join(root, "site", "index.html");
const mapFile = path.join(root, "scripts", "site-home.en.json");
const outFile = path.join(root, "site", "en", "index.html");
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
function byRule(key) {
  const m = RELEASE_LINE.exec(key);
  return m
    ? `${m[1]}, ${m[2]} ${EN_MONTHS[TR_MONTHS.indexOf(m[3])]} ${m[4]}`
    : null;
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
  hasLetters(bareText(key)) && !SAME.has(bareText(key)) && !byRule(key);

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

function mapJson(node, fn, key = "") {
  if (typeof node === "string") return fn(node, key);
  if (Array.isArray(node)) return node.map((n) => mapJson(n, fn, key));
  if (node && typeof node === "object")
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, mapJson(v, fn, k)]),
    );
  return node;
}

function readMap() {
  return fs.existsSync(mapFile)
    ? JSON.parse(fs.readFileSync(mapFile, "utf8"))
    : {};
}

function extract() {
  const html = fs.readFileSync(srcFile, "utf8");
  const keys = collect(html);
  const old = readMap();
  const next = {};
  let missing = 0;
  for (const { key } of keys) {
    next[key] = old[key] ?? "";
    if (!next[key]) missing += 1;
  }
  const stale = Object.keys(old).filter((k) => !(k in next));
  fs.writeFileSync(mapFile, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `${keys.length} strings, ${missing} without English, ${stale.length} stale entries dropped`,
  );
}

function build() {
  const html = fs.readFileSync(srcFile, "utf8");
  const map = readMap();
  const missing = [];
  const tr = (key) => {
    if (!needsTranslation(key)) return byRule(key) || key;
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
      const translated = mapJson(data, (s, key) => {
        if (key === "inLanguage") return "en";
        if (SKIP_JSON_KEYS.has(key)) return s;
        if (s.startsWith(siteUrl))
          return (
            siteUrl +
            rewriteLinksToEnglish(`href="${s.slice(siteUrl.length)}"`).slice(
              6,
              -1,
            )
          );
        if (/^https?:\/\//.test(s) || /^[\d.]+$/.test(s)) return s;
        return tr(collapse(s));
      });
      out[i] =
        `${open}${JSON.stringify(translated).replaceAll("</", "<\\/")}</script>`;
      return;
    }
    if (tok.startsWith("<")) {
      let t = tok;
      for (const a of attrEntries(tok))
        t = t.replace(
          `${a.name}="${a.value}"`,
          `${a.name}="${tr(collapse(a.value))}"`,
        );
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
  page = page
    .replace(/<html lang="tr">/, '<html lang="en">')
    .replace(/content="tr_TR"/g, 'content="en_US"')
    .replace(
      /<meta property="og:locale:alternate" content="en_US" \/>/,
      '<meta property="og:locale:alternate" content="tr_TR" />',
    )
    .replace(/href="https:\/\/seowatcher\.io\/"/g, (m, offset) =>
      // canonical and og:url point at the English page; hreflang links stay.
      /hreflang=/.test(page.slice(Math.max(0, offset - 80), offset))
        ? m
        : 'href="https://seowatcher.io/en/"',
    )
    .replace(
      /content="https:\/\/seowatcher\.io\/"/g,
      'content="https://seowatcher.io/en/"',
    );
  page = rewriteLinksToEnglish(page);
  // The language switch is the one link that goes the other way.
  page = page
    .replace(
      /href="\/en\/" lang="en" hreflang="en" data-lang-switch aria-label="[^"]*">EN</g,
      'href="/" lang="tr" hreflang="tr" data-lang-switch aria-label="Dil: Türkçe">TR<',
    )
    .replace(
      /href="\/en\/" lang="en" hreflang="en" data-lang-switch>English/g,
      'href="/" lang="tr" hreflang="tr" data-lang-switch>Türkçe',
    );
  if (missing.length) {
    console.error(
      `site/en/index.html not written: ${missing.length} strings have no English entry in scripts/site-home.en.json:`,
    );
    for (const k of missing) console.error("  " + k);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log(`site/en/index.html written (${segments.length} segments)`);
}

const mode = process.argv[2];
if (mode === "extract") extract();
else if (mode === "build") build();
else {
  console.error("usage: node scripts/build-site-home.mjs extract|build");
  process.exit(2);
}
