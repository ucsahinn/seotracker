/**
 * Checks the English catalogs against the code that calls t().
 *
 *   node scripts/i18n-check.mjs              # whole app
 *   node scripts/i18n-check.mjs --area app   # one catalog file's folders
 *
 * Errors (exit 1):
 *   - missing:     t("…") with a literal Turkish key that has no English entry,
 *                  or t(`…${x}…`): a key built at runtime is never in a catalog
 *   - placeholder: a key and its English use different {placeholders}, or a
 *                  plural entry whose key has no {count}
 *   - conflict:    the same key with different English in two area files
 * Warnings:
 *   - unused:      an English entry whose key no longer appears in src, either
 *                  inside t() or as a plain string literal (module-level label
 *                  maps keep the Turkish and call t(map[key]) at render time)
 * Report:
 *   - untranslated: Turkish-looking text (ç ğ ı ö ş ü İ ...) in .ts/.tsx under
 *                  src/client and src/routes (or the area's folders with
 *                  --area) that is not inside t(). A literal that is already a
 *                  catalog key counts as translated: it is a label-map value
 *                  translated where it renders. Mark a line `// i18n-ignore`
 *                  (on it or the line above) for text that must stay Turkish,
 *                  such as a language's own name or a Turkish-only regex.
 *
 * The catalogs are TypeScript; they are transpiled with the project's own
 * `typescript` package and evaluated, so a syntax error there fails here too.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_DIR = "src/shared/i18n/en";

/*
 * Which folders each catalog file owns. A file belongs to the area with the
 * longest matching prefix, so src/shared/audit-issues is audit's even though
 * src/shared is shared's.
 */
const AREAS = {
  audit: [
    "src/client/features/audit",
    "src/client/features/lighthouse",
    "src/shared/audit-issues",
  ],
  shared: ["src/shared"],
  server: [
    "src/server",
    "src/serverFunctions",
    "src/lib",
    "src/middleware",
    "src/db",
    "src/server.ts",
    "src/start.ts",
    "src/audit-worker.ts",
  ],
  search: [
    "src/client/features/search-performance",
    "src/client/features/rankings",
    "src/client/features/opportunities",
  ],
  analytics: [
    "src/client/features/analytics",
    "src/client/features/ga4",
    "src/client/features/gsc",
    "src/client/features/integrations",
    "src/client/features/dashboard",
  ],
  settings: [
    "src/client/features/settings",
    "src/client/features/support",
    "src/client/features/ai-mcp",
    "src/client/features/quotas",
  ],
  app: [
    "src/routes",
    "src/client/components",
    "src/client/lib",
    "src/client/layout",
    "src/client/navigation",
    "src/client/tanstack-db",
    "src/client/features/projects",
    "src/client/features/reports",
    "src/client/features/saved-keywords",
  ],
};

const UNTRANSLATED_SCOPE = ["src/client", "src/routes"];
const TURKISH = /[çğıöşüÇĞİÖŞÜ]/;
const PLACEHOLDER = /\{(\w+)\}/g;

function parseArgs(argv) {
  const index = argv.indexOf("--area");
  if (index === -1) return { area: null };
  const raw = (argv[index + 1] ?? "").replace(/\.ts$/, "");
  if (!(raw in AREAS)) {
    console.error(
      `Unknown area "${raw}". One of: ${Object.keys(AREAS).join(", ")}`,
    );
    process.exit(2);
  }
  return { area: raw };
}

const rel = (file) => path.relative(ROOT, file).split(path.sep).join("/");

const under = (file, prefix) =>
  file === prefix || file.startsWith(`${prefix}/`);

function areaOf(file) {
  let best = null;
  let bestLength = -1;
  for (const [area, prefixes] of Object.entries(AREAS)) {
    for (const prefix of prefixes) {
      if (under(file, prefix) && prefix.length > bestLength) {
        best = area;
        bestLength = prefix.length;
      }
    }
  }
  return best;
}

function listSourceFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["__mocks__", "test-support", "node_modules"].includes(entry.name)) {
        continue;
      }
      out.push(...listSourceFiles(full));
    } else if (
      /\.tsx?$/.test(entry.name) &&
      !/\.test\.tsx?$/.test(entry.name) &&
      !entry.name.endsWith(".d.ts") &&
      entry.name !== "routeTree.gen.ts" &&
      entry.name !== "test-setup.ts"
    ) {
      out.push(full);
    }
  }
  return out;
}

async function loadCatalogs() {
  const catalogs = {};
  for (const area of Object.keys(AREAS)) {
    const file = path.join(ROOT, CATALOG_DIR, `${area}.ts`);
    const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    });
    const url = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
    const module = await import(url);
    const catalog = Object.values(module).find(
      (value) => value && typeof value === "object",
    );
    if (!catalog)
      throw new Error(`${CATALOG_DIR}/${area}.ts exports no catalog`);
    catalogs[area] = catalog;
  }
  return catalogs;
}

function isIgnored(source, node) {
  const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
  const lines = source.text.split("\n");
  return [lines[line], lines[line - 1]].some((text) =>
    text?.includes("i18n-ignore"),
  );
}

function isTCall(node) {
  return (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "t"
  );
}

function isConsoleCall(node) {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "console"
  );
}

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const keys = [];
  const literals = new Set();
  const turkish = [];
  const where = (node) =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;

  function visit(node, inConsole) {
    if (isConsoleCall(node)) inConsole = true;
    const first = isTCall(node) ? node.arguments[0] : undefined;
    if (
      first &&
      (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first))
    ) {
      keys.push({ key: first.text, line: where(first) });
    } else if (first && ts.isTemplateExpression(first)) {
      // A key built at runtime never matches a catalog entry.
      keys.push({
        key: first.getText(source),
        line: where(first),
        dynamic: true,
      });
    }
    const isKeyArg = (candidate) =>
      isTCall(node.parent) && node.parent.arguments[0] === candidate;

    if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      !isKeyArg(node)
    ) {
      const parent = node.parent;
      const isModuleName =
        ts.isImportDeclaration(parent) ||
        ts.isExportDeclaration(parent) ||
        ts.isLiteralTypeNode(parent);
      if (!isModuleName) {
        literals.add(node.text);
        if (TURKISH.test(node.text) && !inConsole) {
          turkish.push({ text: node.text, line: where(node), node });
        }
      }
    } else if (ts.isTemplateExpression(node) && !isKeyArg(node)) {
      const joined =
        node.head.text +
        node.templateSpans.map((span) => `{…}${span.literal.text}`).join("");
      if (TURKISH.test(joined) && !inConsole) {
        turkish.push({ text: joined, line: where(node), node });
      }
    } else if (ts.isJsxText(node)) {
      const trimmed = node.text.replace(/\s+/g, " ").trim();
      if (TURKISH.test(trimmed)) {
        turkish.push({ text: trimmed, line: where(node), node });
      }
    }
    ts.forEachChild(node, (child) => visit(child, inConsole));
  }
  visit(source, false);

  return {
    keys,
    literals,
    turkish: turkish.filter(({ node }) => !isIgnored(source, node)),
  };
}

function placeholders(text) {
  return [...text.matchAll(PLACEHOLDER)].map((match) => match[1]).sort();
}

const sameSet = (a, b) =>
  a.length === b.length && a.every((item, i) => item === b[i]);

const short = (text) => (text.length > 90 ? `${text.slice(0, 87)}...` : text);

async function main() {
  const { area } = parseArgs(process.argv.slice(2));
  const catalogs = await loadCatalogs();

  const merged = new Map();
  const conflicts = [];
  for (const [owner, catalog] of Object.entries(catalogs)) {
    for (const [key, value] of Object.entries(catalog)) {
      const previous = merged.get(key);
      if (
        previous &&
        JSON.stringify(previous.value) !== JSON.stringify(value) &&
        (!area || area === owner || area === previous.owner)
      ) {
        conflicts.push(`${key}  (${previous.owner}.ts vs ${owner}.ts)`);
      }
      merged.set(key, { value, owner });
    }
  }

  const files = listSourceFiles(path.join(ROOT, "src"))
    .map((file) => ({ file, name: rel(file) }))
    .filter(({ name }) => !under(name, "src/shared/i18n"));

  const used = new Set();
  const missing = [];
  const untranslated = [];
  for (const { file, name } of files) {
    const scan = scanFile(file);
    for (const { key, dynamic } of scan.keys) if (!dynamic) used.add(key);
    for (const literal of scan.literals) used.add(literal);

    const inArea = area ? areaOf(name) === area : true;
    if (!inArea) continue;
    for (const { key, line, dynamic } of scan.keys) {
      if (dynamic) {
        missing.push(
          `${name}:${line}  ${short(key)}  (use {placeholders}, not \${})`,
        );
      } else if (!merged.has(key)) {
        missing.push(`${name}:${line}  ${short(key)}`);
      }
    }
    const inScope = area
      ? true
      : UNTRANSLATED_SCOPE.some((prefix) => under(name, prefix));
    if (!inScope) continue;
    for (const { text, line } of scan.turkish) {
      if (merged.has(text)) continue;
      untranslated.push(`${name}:${line}  ${short(text)}`);
    }
  }

  const mismatches = [];
  const unused = [];
  for (const [key, { value, owner }] of merged) {
    if (area && owner !== area) continue;
    const expected = placeholders(key);
    const forms =
      typeof value === "string" ? [value] : [value.one, value.other];
    if (forms.some((form) => !sameSet(placeholders(form), expected))) {
      mismatches.push(`${owner}.ts  ${short(key)}`);
    }
    if (typeof value !== "string" && !expected.includes("count")) {
      mismatches.push(`${owner}.ts  ${short(key)}  (plural without {count})`);
    }
    if (!used.has(key)) unused.push(`${owner}.ts  ${short(key)}`);
  }

  const section = (title, items) => {
    if (items.length === 0) return;
    console.log(`\n${title} (${items.length})`);
    for (const item of items) console.log(`  ${item}`);
  };
  console.log(`i18n check${area ? ` --area ${area}` : ""}`);
  section("Untranslated Turkish text (not inside t())", untranslated);
  section("Unused English entries (warning)", unused);
  section("Missing English (error)", missing);
  section("Placeholder mismatch (error)", mismatches);
  section("Conflicting English for one key (error)", conflicts);
  console.log(
    `\nmissing ${missing.length}, placeholder ${mismatches.length}, conflict ${conflicts.length}, unused ${unused.length}, untranslated ${untranslated.length}`,
  );
  if (missing.length + mismatches.length + conflicts.length > 0) {
    process.exitCode = 1;
  }
}

await main();
