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
const dateParts = Object.fromEntries(
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(now)
    .map(({ type, value }) => [type, value]),
);
const year = dateParts.year;
const month = dateParts.month;
const day = dateParts.day;
const iso = `${year}-${month}-${day}`;
const trDate = `${Number(day)} ${months[Number(month) - 1]} ${year}`;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function edit(file, fn) {
  const p = path.join(root, file);
  const before = fs.readFileSync(p, "utf8");
  const after = fn(before);
  if (after === before) {
    console.log("unchanged", file);
    return;
  }
  fs.writeFileSync(p, after);
  console.log("ok", file);
}

if (prev !== next) {
  edit("package.json", (s) =>
    s.replace(`"version": "${prev}"`, `"version": "${next}"`),
  );
  edit("README.md", (s) => s.replaceAll(prev, next));
} else {
  console.log(
    `package.json already ${next}; finishing the remaining version files`,
  );
}

/*
 * Update the editable homepage source, not its generated HTML. The source may
 * lag package.json (for example after a partial version bump), so discover its
 * current version instead of requiring it to equal `prev`.
 */
edit("scripts/site-home.tr.html", (s) => {
  const match = /"softwareVersion": "(\d+\.\d+\.\d+) Alpha"/.exec(s);
  if (!match)
    throw new Error("scripts/site-home.tr.html: softwareVersion missing");
  const sitePrev = match[1];
  return s
    .replace(match[0], `"softwareVersion": "${next} Alpha"`)
    .replace(
      new RegExp(
        `releases/download/v${esc(sitePrev)}/seowatcher-setup-${esc(sitePrev)}\\.exe`,
        "g",
      ),
      `releases/download/v${next}/seowatcher-setup-${next}.exe`,
    )
    .replace(
      new RegExp(
        `${esc(sitePrev)} Alpha, \\d+ [A-Za-zÇĞİÖŞÜçğıöşü]+ \\d{4}`,
        "g",
      ),
      `${next} Alpha, ${trDate}`,
    )
    .replace(`site.js?v=${sitePrev}`, `site.js?v=${next}`)
    .replace(
      /"datePublished": "\d{4}-\d{2}-\d{2}"/,
      `"datePublished": "${iso}"`,
    );
});
const changelog = path.join(root, "CHANGELOG.md");
const log = fs.readFileSync(changelog, "utf8");
if (!log.includes(`## [${next}]`)) {
  const latest = /^## \[\d+\.\d+\.\d+\].*$/m.exec(log);
  if (!latest)
    throw new Error("CHANGELOG.md: no previous release heading found");
  fs.writeFileSync(
    changelog,
    log.replace(
      latest[0],
      `## [${next}] Alpha — ${iso}\n\n### Düzeltmeler\n\n- (bu sürümün notları)\n\n${latest[0]}`,
    ),
  );
  console.log("ok CHANGELOG.md (stub added; fill it in)");
}
console.log(`${prev} -> ${next}`);
