/**
 * Builds the documentation pages of the website from the knowledge base.
 *
 *   node scripts/build-site-docs.mjs
 *
 * Reads every `docs/kb/*.md` (YAML frontmatter + Markdown), renders each one
 * to `site/docs/<slug>/index.html` with the site's own look, and writes the
 * index at `site/docs/index.html` plus the entries into `site/sitemap.xml`.
 * The output is committed: Cloudflare Pages serves the folder as is, with no
 * build step. Rerun after editing a KB file.
 *
 * The Markdown subset is deliberate: headings, paragraphs, ordered and
 * unordered lists (one level of nesting), tables, fenced code, inline code,
 * bold, italic, links, HTML comments (dropped). Anything else is a KB
 * authoring error and is printed as a warning.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kbDir = process.env.KB_DIR || path.join(root, "docs", "kb");
const outDir = process.env.OUT_DIR || path.join(root, "site", "docs");
const siteUrl = "https://seowatcher.io";

const groups = [
  {
    title: "Başlangıç",
    slugs: [
      "kurulum-windows",
      "kurulum-docker",
      "google-baglantisi",
      "pagespeed-anahtari",
    ],
  },
  {
    title: "Ekranlar",
    slugs: [
      "panel",
      "arama-performansi",
      "siralama-takibi",
      "firsatlar",
      "kayitli-kelimeler",
      "analytics",
      "site-denetimi",
      "dizin-durumu",
      "raporlar",
      "proje-bilgisi",
      "ayarlar",
    ],
  },
  {
    title: "Başvuru",
    slugs: ["denetim-kurallari", "ajan-kurulumu", "sorun-giderme"],
  },
];

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

function render(markdown, warn) {
  const src = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const lines = src.split(/\r?\n/);
  const html = [];
  const toc = [];
  let i = 0;
  const para = [];
  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`);
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
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
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
            (r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`,
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

function page({ title, description, body, toc, slug, updated, nav }) {
  const tocHtml = toc.length
    ? `<nav class="toc" aria-label="Bu sayfada"><p class="toc-label">Bu sayfada</p><ol>${toc
        .map((t) => `<li><a href="#${t.id}">${escapeHtml(t.text)}</a></li>`)
        .join("")}</ol></nav>`
    : "";
  return shell
    .replaceAll("{{title}}", escapeHtml(title))
    .replaceAll("{{description}}", escapeHtml(description))
    .replaceAll(
      "{{canonical}}",
      slug ? `${siteUrl}/docs/${slug}/` : `${siteUrl}/docs/`,
    )
    .replaceAll("{{updated}}", updated)
    .replace("{{nav}}", nav)
    .replace("{{toc}}", tocHtml)
    .replace("{{body}}", body);
}

function navHtml(docs, current) {
  return groups
    .map((g) => {
      const items = g.slugs
        .filter((s) => docs.has(s))
        .map((s) => {
          const d = docs.get(s);
          const cls =
            s === current ? ' class="current" aria-current="page"' : "";
          return `<li${cls}><a href="/docs/${s}/">${escapeHtml(d.meta.title)}</a></li>`;
        })
        .join("");
      return items
        ? `<p class="nav-group">${escapeHtml(g.title)}</p><ul>${items}</ul>`
        : "";
    })
    .join("");
}

function main() {
  if (!fs.existsSync(kbDir)) {
    console.error(`no ${kbDir}`);
    process.exit(1);
  }
  const docs = new Map();
  const warnings = [];
  for (const file of fs
    .readdirSync(kbDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")) {
    const slug = file.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(
      fs.readFileSync(path.join(kbDir, file), "utf8"),
    );
    if (!meta.title || !meta.description) {
      warnings.push(`${file}: frontmatter needs title and description`);
      continue;
    }
    docs.set(slug, { meta, body, file });
  }
  const known = new Set(groups.flatMap((g) => g.slugs));
  for (const slug of docs.keys())
    if (!known.has(slug))
      warnings.push(
        `${slug}.md is not in any group of scripts/build-site-docs.mjs`,
      );

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const urls = [];
  for (const [slug, d] of docs) {
    const { html, toc } = render(d.body, (w) =>
      warnings.push(`${d.file}: ${w}`),
    );
    const updated = d.meta.updated || "2026-10-22";
    const out = page({
      title: d.meta.title,
      description: d.meta.description,
      body: `<h1>${escapeHtml(d.meta.title)}</h1><p class="lede">${escapeHtml(d.meta.description)}</p>${html}`,
      toc,
      slug,
      updated,
      nav: navHtml(docs, slug),
    });
    fs.mkdirSync(path.join(outDir, slug), { recursive: true });
    fs.writeFileSync(path.join(outDir, slug, "index.html"), out);
    urls.push({ loc: `${siteUrl}/docs/${slug}/`, lastmod: updated });
  }
  // Index page: every group with its one-line descriptions.
  const indexBody = `<h1>Kılavuz</h1><p class="lede">Kurulumdan ilk rapora kadar her adım ve her ekran için kısa, sade bir anlatım. Uygulamanın adı GitHub'da seotracker, bu sitede seowatcher; ikisi aynı şey.</p>${groups
    .map((g) => {
      const items = g.slugs
        .filter((s) => docs.has(s))
        .map(
          (s) =>
            `<li><a href="/docs/${s}/">${escapeHtml(docs.get(s).meta.title)}</a><span>${escapeHtml(docs.get(s).meta.description)}</span></li>`,
        )
        .join("");
      return items
        ? `<h2 id="${slugify(g.title)}">${escapeHtml(g.title)}</h2><ul class="index">${items}</ul>`
        : "";
    })
    .join("")}`;
  fs.writeFileSync(
    path.join(outDir, "index.html"),
    page({
      title: "Kılavuz",
      description:
        "seowatcher kılavuzları: kurulum, her ekranın ne gösterdiği, Google bağlantısı, denetim kuralları, ajan kurulumu ve sorun giderme.",
      body: indexBody,
      toc: [],
      slug: "",
      updated: "2026-10-22",
      nav: navHtml(docs, ""),
    }),
  );
  urls.unshift({ loc: `${siteUrl}/docs/`, lastmod: "2026-10-22" });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>2026-10-22</lastmod>\n  </url>\n${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
  if (!process.env.OUT_DIR)
    fs.writeFileSync(path.join(root, "site", "sitemap.xml"), sitemap);
  console.log(
    `${docs.size} docs pages written to site/docs, sitemap has ${urls.length + 1} urls`,
  );
  for (const w of warnings) console.warn("warning:", w);
}

main();
