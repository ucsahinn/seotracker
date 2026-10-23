/**
 * Moves the product version everywhere it is written by hand:
 *
 *   node scripts/bump-version.mjs 2.3.14
 *
 * package.json, the README badge, the home page (JSON-LD softwareVersion,
 * the two release rows, the versioned download links, the script cache
 * buster) and a CHANGELOG stub for the new version if none exists. Rerun
 * the site builders afterwards (`pnpm run site:build`); the English home
 * page follows from the Turkish one.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next ?? "")) {
  console.error("usage: node scripts/bump-version.mjs x.y.z");
  process.exit(2);
}
const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const prev = pkg.version;
if (prev === next) {
  console.log(`already ${next}`);
  process.exit(0);
}
const months = [
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
const now = new Date();
const iso = now.toISOString().slice(0, 10);
const trDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function edit(file, fn) {
  const p = path.join(root, file);
  const before = fs.readFileSync(p, "utf8");
  const after = fn(before);
  if (after === before)
    throw new Error(`${file}: nothing to replace for ${prev}`);
  fs.writeFileSync(p, after);
  console.log("ok", file);
}

edit("package.json", (s) =>
  s.replace(`"version": "${prev}"`, `"version": "${next}"`),
);
edit("README.md", (s) => s.replaceAll(prev, next));
edit("site/index.html", (s) =>
  s
    .replace(`"softwareVersion": "${prev}"`, `"softwareVersion": "${next}"`)
    .replace(
      new RegExp(`${esc(prev)}, \\d+ [A-Za-zÇĞİÖŞÜçğıöşü]+ \\d{4}`, "g"),
      `${next}, ${trDate}`,
    )
    .replace(
      new RegExp(
        `releases/download/v\\d+\\.\\d+\\.\\d+/seowatcher-setup-${esc(prev)}\\.exe`,
        "g",
      ),
      `releases/download/v${next}/seowatcher-setup-${next}.exe`,
    )
    .replace(`site.js?v=${prev}`, `site.js?v=${next}`),
);
const changelog = path.join(root, "CHANGELOG.md");
const log = fs.readFileSync(changelog, "utf8");
if (!log.includes(`## [${next}]`)) {
  fs.writeFileSync(
    changelog,
    log.replace(
      `## [${prev}]`,
      `## [${next}] — ${iso}\n\n(bu sürümün notları)\n\n### Yenilikler\n\n- \n\n## [${prev}]`,
    ),
  );
  console.log("ok CHANGELOG.md (stub added; fill it in)");
}
console.log(`${prev} -> ${next}`);
