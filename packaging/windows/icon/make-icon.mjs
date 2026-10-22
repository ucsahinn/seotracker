// Renders seowatcher.svg to a multi-size Windows .ico (PNG-compressed entries,
// valid since Windows Vista). Development helper: the generated
// seowatcher.ico is committed, so build.ps1 never needs a browser.
//
//   node make-icon.mjs [path-to-playwright-module]
//
// Playwright is not a project dependency; pass the directory of an installed
// copy (for example from an npx cache) or let it resolve from node_modules.
import { chromium } from "./resolve-playwright.mjs";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(join(here, "seowatcher.svg"), "utf8");
const sizes = [16, 24, 32, 48, 64, 128, 256];

// PLAYWRIGHT_EXECUTABLE points at a chrome-headless-shell.exe when the
// installed Playwright expects a browser build that is not downloaded.
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined,
});
const pngs = [];
for (const size of sizes) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:transparent">${svg.replace(
      /width="256" height="256"/,
      `width="${size}" height="${size}"`,
    )}</body></html>`,
  );
  const png = await page.screenshot({ omitBackground: true, type: "png" });
  pngs.push({ size, png });
  await page.close();
}
await browser.close();

// ICO container: ICONDIR + ICONDIRENTRY per image + PNG blobs.
const headerSize = 6 + 16 * pngs.length;
let offset = headerSize;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
pngs.forEach(({ size, png }, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(size === 256 ? 0 : size, entry); // 0 means 256
  header.writeUInt8(size === 256 ? 0 : size, entry + 1);
  header.writeUInt8(0, entry + 2); // palette
  header.writeUInt8(0, entry + 3); // reserved
  header.writeUInt16LE(1, entry + 4); // planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
const ico = Buffer.concat([header, ...pngs.map((p) => p.png)]);
writeFileSync(join(here, "seowatcher.ico"), ico);
// A 256px PNG for the website and the installer wizard image.
writeFileSync(join(here, "seowatcher-256.png"), pngs[pngs.length - 1].png);
console.log(`seowatcher.ico: ${pngs.length} sizes, ${ico.length} bytes`);
