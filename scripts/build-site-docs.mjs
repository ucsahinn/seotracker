/**
 * Builds the documentation pages of the website from the knowledge base.
 *
 *   node scripts/build-site-docs.mjs
 *
 * Reads every `docs/kb/*.md` (Turkish, the primary language) and every
 * `docs/kb/en/*.md` (its English edition, same file names), renders each one
 * to each language's localized guide prefix and slug, with the site's own
 * look. Previous `/docs/` routes remain as noindex refresh aliases. It writes
 * the guide indexes and all editions into `site/sitemap.xml` (with hreflang
 * alternates and the home
 * pages' screenshots), `site/llms.txt` and one Atom release feed per edition
 * (`site/feed.xml`, `site/<lang>/feed.xml`). The output is committed and the
 * folder is copied to the server as is (docs/SITE_DEPLOY.md), with no build
 * step there. Rerun after editing a KB file.
 *
 * The Markdown subset is deliberate: headings, paragraphs, ordered and
 * unordered lists (one level of nesting), tables, fenced code, inline code,
 * bold, italic, links, HTML comments (dropped). Anything else is a KB
 * authoring error and is printed as a warning. A Turkish page without an
 * English edition (or the reverse) is a warning too: the two guides are
 * meant to stay in step.
 */
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  docUrl,
  groups,
  hasGuide,
  hasHome,
  langMenuHtml,
  locales,
  readableDate,
  rewriteLinks,
  withGa4Meta,
} from "./site-locales.mjs";

// The editions that exist on disk, Turkish first.
const editionsOnDisk = Object.values(locales).filter(hasGuide);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kbRoot = process.env.KB_DIR || path.join(root, "docs", "kb");
const siteDir = process.env.OUT_DIR || path.join(root, "site");
const siteUrl = "https://seowatcher.io";
// Keep this aligned with src/shared/audit-issue-table.ts and the localized
// audit-rules guides. The guides are checked against that inventory in review.
const AUDIT_RULE_COUNT = 202;
const MCP_TOOL_COUNT = [
  ...fs
    .readFileSync(path.join(root, "src", "server", "mcp", "server.ts"), "utf8")
    .matchAll(/^\s+register\(\w+Tool\);$/gm),
].length;
if (MCP_TOOL_COUNT === 0)
  throw new Error(
    "could not find registered MCP tools in src/server/mcp/server.ts",
  );

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return { meta, body: text.slice(m[0].length) };
}

function slugify(s) {
  return (
    s
      .toLowerCase()
      // é -> e, ä -> a: strip combining marks so French, German, Italian and
      // Portuguese headings keep whole words in their anchors.
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ß/g, "ss")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    // A link that leaves the site opens in a new tab; the site's own pages,
    // anchors and language switches stay in this one.
    const external =
      /^https?:\/\//.test(href) &&
      !/^https?:\/\/(www\.)?seowatcher\.io(\/|$)/.test(href);
    return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${t}</a>`;
  });
  return out;
}

function render(markdown, warn, locale) {
  const src = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const lines = src.split(/\r?\n/);
  const html = [];
  const toc = [];
  const usedIds = new Set(["main"]);
  let i = 0;
  const para = [];
  const calloutLabels = Object.keys(locale.callouts).join("|");
  const calloutRe = new RegExp(`^<strong>(${calloutLabels}):<\\/strong>`);
  const flushPara = () => {
    if (para.length) {
      const text = inline(para.join(" "));
      // Troubleshooting entries open with a bold label; each kind gets its own
      // callout so a reader can scan symptom, cause and fix at a glance.
      const kind = calloutRe.exec(text);
      const cls = kind
        ? ` class="callout callout-${locale.callouts[kind[1]]}"`
        : "";
      html.push(`<p${cls}>${text}</p>`);
      para.length = 0;
    }
  };
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      flushPara();
      i += 1;
      continue;
    }
    const h = /^(#{1,4})\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      // The page title is already the H1; body headings start at H2.
      const level = Math.max(2, h[1].length);
      const text = h[2].trim();
      const baseId = slugify(text) || "section";
      let id = baseId;
      let occurrence = 2;
      while (usedIds.has(id)) id = baseId + "-" + occurrence++;
      usedIds.add(id);
      if (level === 2) toc.push({ id, text });
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i += 1;
      continue;
    }
    if (/^```/.test(line)) {
      flushPara();
      const code = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      html.push(
        `<div class="code"><pre><code>${escapeHtml(code.join("\n"))}</code></pre></div>`,
      );
      continue;
    }
    if (/^\|/.test(line)) {
      flushPara();
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(lines[i]);
        i += 1;
      }
      const cells = (r) =>
        r
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      html.push(
        `<div class="tw"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body
          .map(
            (r) =>
              `<tr>${r
                .map((c) =>
                  /^[\d.,%\s+-]+$/.test(c) && /\d/.test(c)
                    ? `<td class="num">${inline(c)}</td>`
                    : `<td>${inline(c)}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}</tbody></table></div>`,
      );
      continue;
    }
    const li = /^(\s*)([-*]|\d+\.)\s+(.+)$/.exec(line);
    if (li) {
      flushPara();
      const ordered = /\d/.test(li[2]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (i < lines.length) {
        const m = /^(\s*)([-*]|\d+\.)\s+(.+)$/.exec(lines[i]);
        if (!m) {
          // Continuation line of the previous item (indented text).
          if (/^\s{2,}\S/.test(lines[i]) && items.length) {
            items[items.length - 1].text += " " + lines[i].trim();
            i += 1;
            continue;
          }
          break;
        }
        const depth = m[1].length >= 2 ? 1 : 0;
        if (depth === 0 && /\d/.test(m[2]) !== ordered) break;
        items.push({ depth, text: m[3].trim() });
        i += 1;
      }
      let out = `<${tag}>`;
      let open = false;
      for (let k = 0; k < items.length; k += 1) {
        const it = items[k];
        if (it.depth === 0) {
          if (open) {
            out += "</ul></li>";
            open = false;
          } else if (k > 0) out += "</li>";
          out += `<li>${inline(it.text)}`;
        } else {
          if (!open) {
            out += "<ul>";
            open = true;
          }
          out += `<li>${inline(it.text)}</li>`;
        }
      }
      if (open) out += "</ul>";
      if (items.length) out += "</li>";
      out += `</${tag}>`;
      html.push(out);
      continue;
    }
    if (/^>/.test(line)) {
      flushPara();
      const q = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        q.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      html.push(`<blockquote><p>${inline(q.join(" "))}</p></blockquote>`);
      continue;
    }
    if (/^<\w/.test(line)) {
      warn(`raw HTML dropped: ${line.slice(0, 60)}`);
      i += 1;
      continue;
    }
    para.push(line.trim());
    i += 1;
  }
  flushPara();
  return { html: html.join("\n"), toc };
}

const pkg = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);
const shell = fs.readFileSync(
  path.join(root, "scripts", "site-docs-shell.html"),
  "utf8",
);

const absolute = (p) => `${siteUrl}${p}`;

function legacyGuideRedirect(locale, target) {
  const canonical = absolute(target);
  return `<!doctype html>
<html lang="${locale.lang}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(locale.t.guide)} | seowatcher</title>
</head>
<body><p><a href="${target}">${escapeHtml(locale.t.guide)}</a></p></body>
</html>
`;
}

// One alias table drives both fallback HTML and exact-match HTTP redirects.
const guideAliases = new Map();
function writeLegacyGuideAliases(locale, docs) {
  const aliases = new Map();
  const add = (alias, target) => {
    if (alias !== target) aliases.set(alias, target);
  };
  add(locale.base + "/docs/", docUrl(locale, ""));
  for (const slug of docs.keys()) {
    const canonicalSlug = locale.slugs?.[slug] ?? slug;
    for (const oldSlug of new Set([
      canonicalSlug,
      ...(locale.legacySlugs?.[slug] ?? []),
    ])) {
      add(locale.base + "/docs/" + oldSlug + "/", docUrl(locale, slug));
      add(locale.docsBase + oldSlug + "/", docUrl(locale, slug));
    }
  }
  for (const [alias, target] of aliases) {
    const dir = path.join(siteDir, alias);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "index.html"),
      legacyGuideRedirect(locale, target),
    );
    guideAliases.set(alias, target);
  }
}

function writeHttpRedirects() {
  const aliases = new Map(guideAliases);
  for (const locale of editionsOnDisk) {
    if (locale.privacySlug !== "privacy")
      aliases.set(
        locale.base + "/privacy/",
        locale.base + "/" + locale.privacySlug + "/",
      );
  }
  const rules = new Map();
  for (const [alias, target] of aliases) {
    if (aliases.has(target))
      throw new Error("Redirect targets another alias: " + alias);
    for (const url of [alias.slice(0, -1), alias, alias + "index.html"]) {
      if (!/^\/[a-z0-9/.-]+$/.test(url) || !/^\/[a-z0-9/-]+\/$/.test(target))
        throw new Error("Unsafe nginx redirect: " + url);
      if (rules.has(url)) throw new Error("Duplicate redirect: " + url);
      rules.set(url, target);
    }
  }
  const output =
    process.env.REDIRECTS_FILE ||
    path.join(root, "packaging/site/seowatcher-redirects.conf");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(
    output,
    "# Generated by site:build. Include inside the seowatcher.io HTTPS server block.\n" +
      [...rules]
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(
          ([alias, target]) => `location = ${alias} { return 301 ${target}; }`,
        )
        .join("\n") +
      "\n",
  );
  console.log(
    `HTTP redirects written: ${aliases.size} aliases, ${rules.size} exact locations`,
  );
}

// Structured data for a guide page: what it is, where it sits, when it changed.
// Truthful fields only: the author is the maintainer, dates come from front
// matter, and the breadcrumb mirrors the visible path (home > guide > page).
function jsonLd(locale, { title, description, slug, updated, groupTitle }) {
  const url = absolute(docUrl(locale, slug));
  const crumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "seowatcher",
      item: absolute(`${locale.base}/`),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: locale.t.guide,
      item: absolute(docUrl(locale, "")),
    },
  ];
  if (slug)
    crumbs.push({ "@type": "ListItem", position: 3, name: title, item: url });
  const main = slug
    ? {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        inLanguage: locale.lang,
        dateModified: updated,
        articleSection: groupTitle,
        about: { "@id": `${siteUrl}/#app` },
        author: { "@id": `${siteUrl}/#author` },
        publisher: { "@id": `${siteUrl}/#author` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntityOfPage: url,
      }
    : {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: title,
        description,
        url,
        inLanguage: locale.lang,
        dateModified: updated,
        about: { "@id": `${siteUrl}/#app` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "seowatcher",
        inLanguage: editionsOnDisk.map((l) => l.lang),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: "seowatcher",
        alternateName: "seotracker",
        url: `${siteUrl}/`,
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#author`,
        name: "seowatcher",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/assets/icon-256.png`,
        sameAs: ["https://github.com/ucsahinn/seotracker"],
      },
      main,
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs,
      },
    ],
  };
  // "</" cannot appear inside a script element; the data never contains it, but keep it safe.
  return `<script type="application/ld+json">${JSON.stringify(graph).replaceAll("</", "<\\/")}</script>`;
}

// Last commit date of a source file, so sitemap lastmod, the visible "Son
// güncelleme" line and dateModified all move only when the page really changed.
function gitDate(file) {
  try {
    const dirty = execFileSync("git", ["status", "--porcelain", "--", file], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    // Edited but not committed yet: the commit that follows is dated today,
    // so the page built before it already carries the right date.
    if (dirty) return new Date().toISOString().slice(0, 10);
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

// <title> under 60 characters, over 30, brand last. Screen pages say "ekranı"
// so "Panel | seowatcher" is not the whole title.
function seoTitle(locale, { title, slug, screen }) {
  if (!slug) return locale.t.guideTitle;
  return `${screen ? title + locale.t.screenSuffix : title}${locale.t.titleSuffix}`;
}

// Previous and next page in the navigation order, so a reader can walk the
// whole guide without going back to the index.
function pagerHtml(locale, docs, slug) {
  const order = groups.flatMap((g) => g.slugs.filter((s) => docs.has(s)));
  const i = order.indexOf(slug);
  if (i < 0) return "";
  const link = (s, rel, label) =>
    s
      ? `<a class="pager-${rel}" rel="${rel}" href="${docUrl(locale, s)}"><span>${label}</span><strong>${escapeHtml(docs.get(s).meta.title)}</strong></a>`
      : `<span class="pager-${rel} empty"></span>`;
  return `<nav class="pager" aria-label="${locale.t.prevNext}">${link(order[i - 1], "prev", locale.t.prev)}${link(order[i + 1], "next", locale.t.next)}</nav>`;
}

// hreflang links of a page: every language that has the page, Turkish as the
// default for everyone else.
function alternatesHtml(slug, editions) {
  const links = [];
  for (const locale of editionsOnDisk) {
    if (slug && !editions[locale.lang]) continue;
    links.push(
      `<link rel="alternate" hreflang="${locale.lang}" href="${absolute(docUrl(locale, slug))}" />`,
    );
  }
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${absolute(docUrl(locales.tr, slug))}" />`,
  );
  return links.join("\n    ");
}

function page(
  locale,
  {
    title,
    description,
    body,
    toc,
    slug,
    updated,
    nav,
    groupTitle,
    screen,
    pager = "",
    editions,
  },
) {
  const t = locale.t;
  const tocHtml = toc.length
    ? `<nav class="toc" aria-label="${t.onThisPage}"><p class="toc-label">${t.onThisPage}</p><ol>${toc
        .map((x) => `<li><a href="#${x.id}">${escapeHtml(x.text)}</a></li>`)
        .join("")}</ol></nav>`
    : "";
  const langMenu = langMenuHtml(
    locale,
    (l) => (slug && editions[l.lang] ? docUrl(l, slug) : docUrl(l, "")),
    { available: hasGuide },
  );
  const replacements = {
    "{{lang}}": locale.lang,
    "{{version}}": pkg.version,
    "{{ogLocale}}": locale.ogLocale,
    "{{ogAlternates}}": editionsOnDisk
      .filter((l) => l.lang !== locale.lang)
      .map(
        (l) =>
          `<meta property="og:locale:alternate" content="${l.ogLocale}" />`,
      )
      .join("\n    "),
    "{{ogImage}}":
      locale.lang === "tr"
        ? `${siteUrl}/assets/og.png`
        : `${siteUrl}/assets/og-${locale.lang}.png`,
    // One card per edition, so the alt describes that card, not the page.
    "{{ogImageAlt}}": escapeHtml(t.ogImageAlt),
    "{{ogType}}": slug ? "article" : "website",
    "{{pageSlug}}": slug || "index",
    "{{feed}}": `${locale.base}/feed.xml`,
    "{{releaseNotes}}": docUrl(locale, "surum-notlari"),
    "{{seotitle}}": escapeHtml(seoTitle(locale, { title, slug, screen })),
    "{{title}}": escapeHtml(title),
    "{{description}}": escapeHtml(description),
    "{{canonical}}": absolute(docUrl(locale, slug)),
    "{{alternates}}": alternatesHtml(slug, editions),
    "{{updatedText}}": readableDate(locale, updated),
    "{{updated}}": updated,
    "{{home}}": `${locale.base}/`,
    "{{homeScreens}}": `${locale.base}/#ekranlar`,
    "{{docsIndex}}": docUrl(locale, ""),
    "{{langMenu}}": langMenu,
    "{{jsonld}}": jsonLd(locale, {
      title,
      description,
      slug,
      updated,
      groupTitle,
    }),
    "{{pager}}": pager,
    "{{nav}}": nav,
    "{{toc}}": tocHtml,
    "{{body}}": body,
  };
  for (const [k, v] of Object.entries(t)) replacements[`{{t.${k}}}`] = v;
  // Chrome first, then the guard, then the content: a "{{x}}" inside a KB
  // code sample must land on the page as is, and a "$&" in a page likewise
  // (hence the function replacements).
  const content = ["{{body}}", "{{nav}}", "{{toc}}", "{{pager}}", "{{jsonld}}"];
  let out = withGa4Meta(shell);
  for (const [k, v] of Object.entries(replacements))
    if (!content.includes(k)) out = out.replaceAll(k, () => v);
  const left = /\{\{[a-zA-Z.]+\}\}/.exec(
    out.replace(/\{\{(body|nav|toc|pager|jsonld)\}\}/g, ""),
  );
  if (left)
    throw new Error(`site-docs-shell.html: unknown placeholder ${left[0]}`);
  if (!pager) out = out.replace(/[ \t]+\{\{pager\}\}/g, "{{pager}}");
  for (const k of content) out = out.replaceAll(k, () => replacements[k]);
  return out;
}

function navHtml(locale, docs, current) {
  return groups
    .map((g) => {
      const items = g.slugs
        .filter((s) => docs.has(s))
        .map((s) => {
          const d = docs.get(s);
          const cls =
            s === current ? ' class="current" aria-current="page"' : "";
          return `<li${cls}><a href="${docUrl(locale, s)}">${escapeHtml(d.meta.title)}</a></li>`;
        })
        .join("");
      return items
        ? `<p class="nav-group">${escapeHtml(g.title[locale.lang])}</p><ul>${items}</ul>`
        : "";
    })
    .join("");
}

function readDocs(locale, warnings) {
  const dir = path.join(kbRoot, locale.kbSub);
  const docs = new Map();
  if (!fs.existsSync(dir)) return docs;
  for (const file of fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")) {
    const slug = file.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(
      fs.readFileSync(path.join(dir, file), "utf8"),
    );
    if (!meta.title || !meta.description) {
      warnings.push(
        `${locale.lang}/${file}: frontmatter needs title and description`,
      );
      continue;
    }
    if (locale.slugs && !locale.slugs[slug]) {
      warnings.push(
        `${locale.lang}/${file} has no ${locale.lang} slug in scripts/site-locales.mjs`,
      );
      continue;
    }
    docs.set(slug, {
      meta,
      body,
      file,
      source: path.join("docs", "kb", locale.kbSub, file),
    });
  }
  return docs;
}

function main() {
  if (!fs.existsSync(kbRoot)) {
    console.error(`no ${kbRoot}`);
    process.exit(1);
  }
  const warnings = [];
  // The hand-written 404 page carries the same GA4 meta tag as every other page.
  const notFoundFile = path.join(siteDir, "404.html");
  const notFound = fs.existsSync(notFoundFile)
    ? fs.readFileSync(notFoundFile, "utf8")
    : "";
  if (notFound && withGa4Meta(notFound) !== notFound)
    fs.writeFileSync(notFoundFile, withGa4Meta(notFound));
  const all = Object.fromEntries(
    editionsOnDisk.map((l) => [l.lang, readDocs(l, warnings)]),
  );
  const others = editionsOnDisk.filter((l) => l.lang !== "tr");
  const known = new Set(groups.flatMap((g) => g.slugs));
  for (const slug of all.tr.keys()) {
    if (!known.has(slug))
      warnings.push(
        `${slug}.md is not in any group of scripts/site-locales.mjs`,
      );
    for (const l of others)
      if (!all[l.lang].has(slug))
        warnings.push(
          `${slug}.md has no ${l.lang} edition in docs/kb/${l.kbSub}/`,
        );
  }
  for (const l of others)
    for (const slug of all[l.lang].keys())
      if (!all.tr.has(slug))
        warnings.push(`${l.lang}/${slug}.md has no Turkish source`);

  const urls = []; // { slug, lastmod: {tr, en} }
  const bySlug = new Map();
  for (const locale of editionsOnDisk) {
    const docs = all[locale.lang];
    const outDir = path.join(siteDir, locale.kbSub, locale.docsSlug);
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });
    for (const [slug, d] of docs) {
      const editions = Object.fromEntries(
        editionsOnDisk.map((l) => [l.lang, all[l.lang].has(slug)]),
      );
      const { html, toc } = render(
        d.body,
        (w) => warnings.push(`${locale.lang}/${d.file}: ${w}`),
        locale,
      );
      const body = `<h1>${escapeHtml(d.meta.title)}</h1><p class="lede">${escapeHtml(d.meta.description)}</p>${html}`;
      const updated = gitDate(d.source) || d.meta.updated || "2026-10-22";
      const out = page(locale, {
        title: d.meta.title,
        description: d.meta.description,
        body: rewriteLinks(body, locale),
        toc,
        slug,
        updated,
        nav: navHtml(locale, docs, slug),
        groupTitle:
          groups.find((g) => g.slugs.includes(slug))?.title[locale.lang] ??
          locale.t.guide,
        screen: Boolean(d.meta.screen),
        pager: pagerHtml(locale, docs, slug),
        editions,
      });
      const dirName = locale.slugs ? locale.slugs[slug] : slug;
      fs.mkdirSync(path.join(outDir, dirName), { recursive: true });
      fs.writeFileSync(path.join(outDir, dirName, "index.html"), out);
      if (!bySlug.has(slug)) {
        bySlug.set(slug, { slug, lastmod: {} });
        urls.push(bySlug.get(slug));
      }
      bySlug.get(slug).lastmod[locale.lang] = updated;
    }
    const indexDate =
      [...docs.values()]
        .map((d) => gitDate(d.source) || d.meta.updated || "2026-10-22")
        .sort()
        .pop() || "2026-10-22";
    // Index page: every group with its one-line descriptions. Its table of
    // contents lists the groups, like a guide page lists its sections.
    const indexGroups = groups.filter((g) => g.slugs.some((s) => docs.has(s)));
    const indexBody = `<h1>${escapeHtml(locale.t.guideTitle.split(":")[0])}</h1><p class="lede">${escapeHtml(locale.t.guideLede)}</p>${groups
      .map((g) => {
        const items = g.slugs
          .filter((s) => docs.has(s))
          .map(
            (s) =>
              `<li><a href="${docUrl(locale, s)}">${escapeHtml(docs.get(s).meta.title)}</a><span>${escapeHtml(docs.get(s).meta.description)}</span></li>`,
          )
          .join("");
        return items
          ? `<h2 id="${slugify(g.title[locale.lang])}">${escapeHtml(g.title[locale.lang])}</h2><ul class="index">${items}</ul>`
          : "";
      })
      .join("")}`;
    fs.writeFileSync(
      path.join(outDir, "index.html"),
      page(locale, {
        title: locale.t.guide,
        description: locale.t.guideDescription,
        body: indexBody,
        toc: indexGroups.map((g) => ({
          id: slugify(g.title[locale.lang]),
          text: g.title[locale.lang],
        })),
        slug: "",
        updated: indexDate,
        nav: navHtml(locale, docs, ""),
        editions: { tr: true, en: true },
      }),
    );
    if (!bySlug.has("")) {
      bySlug.set("", { slug: "", lastmod: {} });
      urls.unshift(bySlug.get(""));
    }
    bySlug.get("").lastmod[locale.lang] = indexDate;
    writeLegacyGuideAliases(locale, docs);
  }
  writeHttpRedirects();

  const homeDate =
    gitDate(path.join("site", "index.html")) || bySlug.get("").lastmod.tr;
  const entry = (loc, lastmod, alternates, images = []) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n${[
      ...alternates.map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`,
      ),
      ...images.map(
        (src) =>
          `    <image:image>\n      <image:loc>${src}</image:loc>\n    </image:image>`,
      ),
    ].join("\n")}\n  </url>`;
  // The screenshots a home page shows (an <img> with alt text, so not the
  // logos or the decorative copies), each at the largest size on disk:
  // walk-x-dark-m.webp is listed as walk-x-dark.png when that file exists.
  const homeImages = (l) => {
    const file = path.join(
      siteDir,
      l.lang === "tr" ? "" : l.lang,
      "index.html",
    );
    const html = fs.readFileSync(file, "utf8");
    const srcs = new Set();
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      const src = /\ssrc="(\/assets\/[^"]+)"/.exec(tag)?.[1];
      const alt = /\salt="([^"]*)"/.exec(tag)?.[1];
      if (!src || !alt?.trim() || src.endsWith(".svg")) continue;
      const png = src.replace(/(-1x|-m1?)?\.(webp|png)$/, ".png");
      srcs.add(fs.existsSync(path.join(siteDir, png)) ? png : src);
    }
    if (!srcs.size)
      throw new Error(`no screenshots in ${path.relative(root, file)}`);
    return [...srcs].map(absolute);
  };
  const homes = Object.values(locales).filter(hasHome);
  const homeAlternates = [
    ...homes.map((l) => ({ lang: l.lang, href: `${siteUrl}${l.base}/` })),
    { lang: "x-default", href: `${siteUrl}/` },
  ];
  const entries = homes.map((l) =>
    entry(
      `${siteUrl}${l.base}/`,
      gitDate(path.join("site", l.lang === "tr" ? "" : l.lang, "index.html")) ||
        homeDate,
      homeAlternates,
      homeImages(l),
    ),
  );
  for (const u of urls) {
    const langs = Object.keys(u.lastmod);
    const alternates = langs.map((lang) => ({
      lang,
      href: absolute(docUrl(locales[lang], u.slug)),
    }));
    alternates.push({
      lang: "x-default",
      href: absolute(docUrl(locales.tr, u.slug)),
    });
    for (const lang of langs)
      entries.push(
        entry(
          absolute(docUrl(locales[lang], u.slug)),
          u.lastmod[lang],
          alternates,
        ),
      );
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(siteDir, "sitemap.xml"), sitemap);

  // llms.txt: the same facts the site states, in the plain-text shape AI
  // assistants read. The guide lists come from front matter so they cannot drift.
  const guideList = (locale) =>
    groups
      .map((g) => {
        const docs = all[locale.lang];
        const items = g.slugs
          .filter((s) => docs.has(s))
          .map(
            (s) =>
              `- [${docs.get(s).meta.title}](${absolute(docUrl(locale, s))}): ${docs.get(s).meta.description}`,
          )
          .join("\n");
        return items
          ? `## ${locale.t.guide}: ${g.title[locale.lang]}\n${items}`
          : "";
      })
      .filter(Boolean)
      .join("\n\n");
  // One sentence per edition, read from that edition's built home page, so
  // the summary is always the meta description the page itself carries.
  // site:build writes the homes first; a missing one is a build error.
  const homeSummary = (l) => {
    const file = path.join(
      siteDir,
      l.lang === "tr" ? "" : l.lang,
      "index.html",
    );
    const html = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    const m = /<meta\s+name="description"\s+content="([^"]+)"/.exec(html);
    if (!m)
      throw new Error(
        `no meta description in ${path.relative(root, file)}: build the homes first`,
      );
    return m[1]
      .replace(/\s+/g, " ")
      .trim()
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  };
  const llms = `# seowatcher

> seowatcher (GitHub ve uygulama içi adı: seotracker), Google Search Console, Google Analytics 4, kendi site tarayıcısı ve PageSpeed Insights verisini tek panelde toplayan ücretsiz, açık kaynaklı (MIT) bir SEO uygulamasıdır. Windows 10/11 (64 bit) için tek kurulum dosyası vardır; Mac ve Linux'ta Docker ile çalışır. Tek kullanıcılıdır, yalnızca kullanıcının kendi bilgisayarından erişilir, veri o bilgisayarda saklanır. Google, denetlenen siteler ve GitHub ile bağlantı kurar; isteğe bağlı yapay zekâ bağlantısı seçilen sağlayıcıya veri gönderebilir. Abonelik ve hesap yoktur.
> English: seowatcher (also named seotracker) is a free, MIT-licensed, self-hosted SEO app that reads Google Search Console, Google Analytics 4, its own crawler and PageSpeed Insights. Windows 10/11 installer; Docker on macOS/Linux. Single user, localhost only, data is stored on your machine. It connects to Google, audited sites and GitHub; optional AI integrations may send data to the selected provider. Derived from open-seo. The app's interface is available in Turkish and English; the website and this guide exist in ${editionsOnDisk.map((l) => l.name).join(", ")}.

Hızlı bilgiler: sürüm ${pkg.version} Alpha, ${AUDIT_RULE_COUNT} denetim kuralı, yapay zekâ asistanları için ${MCP_TOOL_COUNT} MCP aracı ve 6 hazır görev, fiyat 0, lisans MIT. Arama hacmi tahmini, backlink sayımı ve rakip sıralaması yoktur. Kurulum dosyası 86 MB, kurulu hali 313 MB; Visual C++ çalışma zamanı pakete dahildir.
Quick facts: version ${pkg.version} Alpha, ${AUDIT_RULE_COUNT} audit rules, ${MCP_TOOL_COUNT} MCP tools and 6 ready-made tasks for AI assistants, price 0, MIT license. No search-volume estimates, backlink counts or competitor rankings. Installer 86 MB, installed 313 MB; the Visual C++ runtime is bundled.

## Ana bağlantılar / Main links
${homes
  .map(
    (l) =>
      `- [seowatcher (${l.name})](${siteUrl}${l.base}/): ${homeSummary(l)}\n- [${l.t.guide} (${l.name})](${absolute(docUrl(l, ""))}): ${l.t.guideDescription}`,
  )
  .join("\n")}
- [Windows kurulum dosyası / Windows installer](https://github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe): SHA-256 özeti sürüm sayfasında
- [Sürüm sayfası / Releases](https://github.com/ucsahinn/seotracker/releases/latest)

${editionsOnDisk.map(guideList).join("\n\n")}

## Kaynak ve notlar
- [GitHub deposu ve README (Docker kurulumu)](https://github.com/ucsahinn/seotracker)
- [Sürüm notları](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md)
- [open-seo, temel alınan proje](https://github.com/every-app/open-seo)
`;
  fs.writeFileSync(path.join(siteDir, "llms.txt"), llms);

  // One Atom feed per edition (/feed.xml, /en/feed.xml ...) whose single
  // entry is the current release-notes page, so feed readers and answer
  // engines see a new release when the page changes. The entry id carries
  // the version: a new release is a new entry, an edit of the notes is not.
  for (const locale of editionsOnDisk) {
    const notes = all[locale.lang].get("surum-notlari");
    if (!notes) continue;
    const pageUrl = absolute(docUrl(locale, "surum-notlari"));
    const feedUrl = `${siteUrl}${locale.base}/feed.xml`;
    const updated = `${bySlug.get("surum-notlari").lastmod[locale.lang]}T00:00:00Z`;
    const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale.lang}">
  <id>${feedUrl}</id>
  <title>seowatcher: ${escapeHtml(notes.meta.title)}</title>
  <updated>${updated}</updated>
  <link rel="self" type="application/atom+xml" href="${feedUrl}" />
  <link rel="alternate" type="text/html" href="${siteUrl}${locale.base}/" />
  <author>
    <name>seowatcher</name>
    <uri>https://github.com/ucsahinn/seotracker</uri>
  </author>
  <icon>${siteUrl}/assets/icon-256.png</icon>
  <entry>
    <id>${pageUrl}#${pkg.version}</id>
    <title>${escapeHtml(notes.meta.title)}: seowatcher ${pkg.version}</title>
    <updated>${updated}</updated>
    <link rel="alternate" type="text/html" href="${pageUrl}" />
    <summary>${escapeHtml(notes.meta.description)}</summary>
  </entry>
</feed>
`;
    const dir = path.join(siteDir, locale.lang === "tr" ? "" : locale.lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "feed.xml"), feed);
  }
  console.log(
    `docs pages written: ${editionsOnDisk.map((l) => `${l.lang} ${all[l.lang].size}`).join(", ")}; sitemap has ${entries.length} urls`,
  );
  for (const w of warnings) console.warn("warning:", w);
}

main();
