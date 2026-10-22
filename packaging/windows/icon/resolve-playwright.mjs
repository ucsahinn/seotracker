// Finds a Playwright installation without making it a project dependency:
// the first CLI argument, then the PLAYWRIGHT_MODULE environment variable,
// then a plain import (works when `playwright` is in node_modules).
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const candidate = process.argv[2] ?? process.env.PLAYWRIGHT_MODULE;
let mod;
if (candidate) {
  const require = createRequire(pathToFileURL(candidate + "/"));
  mod = require(require.resolve("playwright", { paths: [candidate] }));
} else {
  mod = await import("playwright");
}
export const chromium = mod.chromium;
