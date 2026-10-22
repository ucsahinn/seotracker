/**
 * Builds the documentation pages of the website from the knowledge base.
 *
 *   node scripts/build-site-docs.mjs
 *
 * Reads every `docs/kb/*.md` (Turkish, the primary language) and every
 * `docs/kb/en/*.md` (its English edition, same file names), renders each one
 * to `site/docs/<slug>/index.html` or `site/en/docs/<english-slug>/index.html`
 * with the site's own look, writes the two guide indexes, the entries of both
 * languages into `site/sitemap.xml` (with hreflang alternates) and
 * `site/llms.txt`. The output is committed: Cloudflare Pages serves the folder
 * as is, with no build step. Rerun after editing a KB file.
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
  enSlugs,
  groups,
  locales,
  rewriteLinksToEnglish,
} from "./site-locales.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kbRoot = process.env.KB_DIR || path.join(root, "docs", "kb");
const siteDir = process.env.OUT_DIR || path.join(root, "site");
const siteUrl = "https://seowatcher.io";

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
  return s
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const external = /^https?:\/\//.test(href);
    return `<a href="${href}"${external ? ' rel="noopener"' : ""}>${t}</a>`;
  });
  return out;
}

function render(markdown, warn, locale) {
  const src = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const lines = src.split(/\r?\n/);
  const html = [];
  const toc = [];
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
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
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

const shell = fs.readFileSync(
  path.join(root, "scripts", "site-docs-shell.html"),
  "utf8",
);

const absolute = (p) => `${siteUrl}${p}`;

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
        inLanguage: ["tr", "en"],
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

// "2026-10-22" as people read it; the ISO form stays in the metadata.
function readableDate(locale, iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${Number(m[3])} ${locale.months[Number(m[2]) - 1]} ${m[1]}` : iso;
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

// hreflang links of a page: both languages when both editions exist, Turkish
// as the default for everyone else.
function alternatesHtml(slug, editions) {
  const links = [];
  for (const locale of Object.values(locales)) {
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
  const other = locale.lang === "tr" ? locales.en : locales.tr;
  const switchHref =
    slug && editions[other.lang] ? docUrl(other, slug) : docUrl(other, "");
  const replacements = {
    "{{lang}}": locale.lang,
    "{{ogLocale}}": locale.ogLocale,
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
    "{{switchHref}}": switchHref,
    "{{switchLang}}": other.lang,
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
  let out = shell;
  // Function replacements: a "$&" in a KB page must land on the page as is.
  for (const [k, v] of Object.entries(replacements))
    out = out.replaceAll(k, () => v);
  const left = /\{\{[a-zA-Z.]+\}\}/.exec(out);
  if (left)
    throw new Error(`site-docs-shell.html: unknown placeholder ${left[0]}`);
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
    if (locale.lang === "en" && !enSlugs[slug]) {
      warnings.push(
        `en/${file} has no English slug in scripts/site-locales.mjs`,
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
  const all = Object.fromEntries(
    Object.values(locales).map((l) => [l.lang, readDocs(l, warnings)]),
  );
  const known = new Set(groups.flatMap((g) => g.slugs));
  for (const slug of all.tr.keys()) {
    if (!known.has(slug))
      warnings.push(
        `${slug}.md is not in any group of scripts/site-locales.mjs`,
      );
    if (!all.en.has(slug))
      warnings.push(`${slug}.md has no English edition in docs/kb/en/`);
  }
  for (const slug of all.en.keys())
    if (!all.tr.has(slug)) warnings.push(`en/${slug}.md has no Turkish source`);

  const urls = []; // { slug, lastmod: {tr, en} }
  const bySlug = new Map();
  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8"),
  );
  for (const locale of Object.values(locales)) {
    const docs = all[locale.lang];
    const outDir = path.join(siteDir, locale.kbSub, "docs");
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });
    for (const [slug, d] of docs) {
      const editions = { tr: all.tr.has(slug), en: all.en.has(slug) };
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
        body: locale.lang === "en" ? rewriteLinksToEnglish(body) : body,
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
      const dirName = locale.lang === "en" ? enSlugs[slug] : slug;
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
    // Index page: every group with its one-line descriptions.
    const indexBody = `<h1>${locale.t.guide}</h1><p class="lede">${escapeHtml(locale.t.guideLede)}</p>${groups
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
        toc: [],
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
  }

  const homeDate =
    gitDate(path.join("site", "index.html")) || bySlug.get("").lastmod.tr;
  const entry = (loc, lastmod, alternates) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates
      .map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`,
      )
      .join("\n")}\n  </url>`;
  const homeAlternates = [
    { lang: "tr", href: `${siteUrl}/` },
    { lang: "en", href: `${siteUrl}/en/` },
    { lang: "x-default", href: `${siteUrl}/` },
  ];
  const entries = [
    entry(`${siteUrl}/`, homeDate, homeAlternates),
    entry(`${siteUrl}/en/`, homeDate, homeAlternates),
  ];
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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
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
  const llms = `# seowatcher

> seowatcher (GitHub ve uygulama içi adı: seotracker), Google Search Console, Google Analytics 4, kendi site tarayıcısı ve PageSpeed Insights verisini tek panelde toplayan ücretsiz, açık kaynaklı (MIT) bir SEO uygulamasıdır. Windows 10/11 (64 bit) için tek kurulum dosyası vardır; Mac ve Linux'ta Docker ile çalışır. Tek kullanıcılıdır, yalnızca kullanıcının kendi bilgisayarından erişilir, veri o bilgisayarda kalır. Abonelik ve hesap yoktur.
> English: seowatcher (also named seotracker) is a free, MIT-licensed, self-hosted SEO app that reads Google Search Console, Google Analytics 4, its own crawler and PageSpeed Insights. Windows 10/11 installer; Docker on macOS/Linux. Single user, localhost only, data stays on your machine. Derived from open-seo. The app's interface is Turkish; the website and this guide exist in Turkish and English.

Hızlı bilgiler: sürüm ${pkg.version}, 95 denetim kuralı, yapay zekâ asistanları için 33 MCP aracı ve 6 hazır görev, fiyat 0, lisans MIT. Arama hacmi tahmini, backlink sayımı ve rakip sıralaması yoktur. Kurulum dosyası 81 MB, kurulu hali 290 MB; Visual C++ çalışma zamanı pakete dahildir.
Quick facts: version ${pkg.version}, 95 audit rules, 33 MCP tools and 6 ready-made tasks for AI assistants, price 0, MIT license. No search-volume estimates, backlink counts or competitor rankings. Installer 81 MB, installed 290 MB; the Visual C++ runtime is bundled.

## Ana bağlantılar
- [Ana sayfa (Türkçe)](${siteUrl}/): ürün tanıtımı, ekran görüntüleri, kurulum, sık sorulanlar
- [Home page (English)](${siteUrl}/en/): product overview, screenshots, installation, FAQ
- [Kılavuz (Türkçe)](${siteUrl}/docs/): kurulumdan ilk rapora kadar her adım ve her ekran
- [Guide (English)](${siteUrl}/en/docs/): every step and every screen, from installation to the first report
- [Windows kurulum dosyası / Windows installer](https://github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe): SHA-256 özeti sürüm sayfasında
- [Sürüm sayfası / Releases](https://github.com/ucsahinn/seotracker/releases/latest)

${guideList(locales.tr)}

${guideList(locales.en)}

## Kaynak ve notlar
- [GitHub deposu ve README (Docker kurulumu)](https://github.com/ucsahinn/seotracker)
- [Sürüm notları](https://github.com/ucsahinn/seotracker/blob/main/CHANGELOG.md)
- [open-seo, temel alınan proje](https://github.com/every-app/open-seo)
`;
  fs.writeFileSync(path.join(siteDir, "llms.txt"), llms);
  console.log(
    `${all.tr.size} Turkish and ${all.en.size} English docs pages written, sitemap has ${entries.length} urls`,
  );
  for (const w of warnings) console.warn("warning:", w);
}

main();
