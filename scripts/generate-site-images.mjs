/** Rebuild responsive screenshots using Sharp already present in pnpm-lock.yaml.
 * Run: node scripts/generate-site-images.mjs
 * Mobile inputs preserve the existing close-up crops; PNGs supply desktop images. */
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
let entry;
try {
  entry = require.resolve("sharp");
} catch {
  const store = path.join(root, "node_modules/.pnpm");
  const packages = (await fs.readdir(store)).filter((name) =>
    name.startsWith("sharp@"),
  );
  if (packages.length !== 1)
    throw new Error(
      "Expected one installed Sharp version from the lockfile; no dependency is installed automatically.",
    );
  entry = createRequire(
    path.join(store, packages[0], "node_modules", "resolver.cjs"),
  ).resolve("sharp");
}
const sharp = (await import(pathToFileURL(entry).href)).default;
const assets = path.join(root, "site/assets");
const names = [
  "hero-dark",
  "walk-firsatlar-dark",
  "walk-denetim-dark",
  "walk-performans-dark",
  "walk-ajan-dark",
];
for (const name of names) {
  for (const mobile of [false, true]) {
    const source = path.join(assets, name + (mobile ? "-m.webp" : ".png"));
    for (const width of mobile ? [360, 560, 1000] : [560, 1120]) {
      const filename =
        name + (mobile ? "-mobile-" : "-desktop-") + width + ".webp";
      const output = path.join(assets, filename);
      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 68, effort: 6 })
        .toFile(output);
      console.log(
        filename +
          ": " +
          (await fs.stat(source)).size +
          " -> " +
          (await fs.stat(output)).size +
          " bytes",
      );
    }
  }
}
