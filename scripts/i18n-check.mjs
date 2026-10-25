/**
 * Checks the English catalogs against the code that calls t(), and checks
 * the other locale catalogs for key coverage and placeholder integrity.
 *
 *   node scripts/i18n-check.mjs              # whole app
 *   node scripts/i18n-check.mjs --area app   # one catalog file's folders
 *   node scripts/i18n-check.mjs --require-complete-locales
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
const CATALOG_ROOT = "src/shared/i18n";
const SECONDARY_LOCALES = ["de", "fr", "it", "pt"];

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
  const requireCompleteLocales = argv.includes("--require-complete-locales");
  if (index === -1) return { area: null, requireCompleteLocales };
  const raw = (argv[index + 1] ?? "").replace(/\.ts$/, "");
  if (!(raw in AREAS)) {
    console.error(
      `Unknown area "${raw}". One of: ${Object.keys(AREAS).join(", ")}`,
    );
    process.exit(2);
  }
  return { area: raw, requireCompleteLocales };
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

async function loadCatalogs(locale = "en") {
  const catalogs = {};
  const dir = path.join(ROOT, CATALOG_ROOT, locale);
  const names =
    locale === "en"
      ? Object.keys(AREAS)
      : fs
          .readdirSync(dir, { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
          .map((entry) => entry.name.slice(0, -3));
  for (const area of names) {
    const file = path.join(dir, `${area}.ts`);
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
      throw new Error(
        `${CATALOG_ROOT}/${locale}/${area}.ts exports no catalog`,
      );
    catalogs[area] = catalog;
  }
  return catalogs;
}

function mergeCatalogs(catalogs) {
  const merged = new Map();
  const conflicts = [];
  for (const [owner, catalog] of Object.entries(catalogs)) {
    for (const [key, value] of Object.entries(catalog)) {
      const previous = merged.get(key);
      if (
        previous &&
        JSON.stringify(previous.value) !== JSON.stringify(value)
      ) {
        conflicts.push(`${key}  (${previous.owner}.ts vs ${owner}.ts)`);
      }
      merged.set(key, { value, owner });
    }
  }
  return { merged, conflicts };
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
  const { area, requireCompleteLocales } = parseArgs(process.argv.slice(2));
  const catalogs = await loadCatalogs();
  const { merged, conflicts } = mergeCatalogs(catalogs);
  const localeCatalogs = {};
  for (const locale of SECONDARY_LOCALES) {
    localeCatalogs[locale] = mergeCatalogs(await loadCatalogs(locale));
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

  const localeMismatches = [];
  const obsoleteLocaleEntries = [];
  const coverage = [];
  for (const [
    locale,
    { merged: catalog, conflicts: localeConflicts },
  ] of Object.entries(localeCatalogs)) {
    conflicts.push(
      ...localeConflicts.map((conflict) => `${locale}: ${conflict}`),
    );
    let translated = 0;
    for (const [key, { value }] of catalog) {
      const source = merged.get(key)?.value;
      if (source === undefined) {
        obsoleteLocaleEntries.push(`${locale}: ${short(key)}`);
        continue;
      }
      translated += 1;
      const expected = placeholders(key);
      const sourceForms =
        typeof source === "string" ? [source] : [source.one, source.other];
      const forms =
        typeof value === "string" ? [value] : [value.one, value.other];
      if (
        sourceForms.some((form) => !sameSet(placeholders(form), expected)) ||
        forms.some((form) => !sameSet(placeholders(form), expected)) ||
        (typeof value !== "string" && !expected.includes("count"))
      ) {
        localeMismatches.push(`${locale}: ${short(key)}`);
      }
    }
    const total = merged.size;
    coverage.push(
      `${locale} ${translated}/${total} (${((translated / total) * 100).toFixed(1)}%)`,
    );
    if (requireCompleteLocales && translated !== total) {
      localeMismatches.push(
        `${locale}: ${total - translated} entries have no translation`,
      );
    }
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
  section("Locale key or placeholder mismatch (error)", localeMismatches);
  section("Obsolete locale entries (warning)", obsoleteLocaleEntries);
  console.log(`Locale coverage: ${coverage.join(" · ")}`);
  console.log(
    `\nmissing ${missing.length}, placeholder ${mismatches.length}, conflict ${conflicts.length}, unused ${unused.length}, untranslated ${untranslated.length}`,
  );
  if (
    missing.length +
      mismatches.length +
      conflicts.length +
      localeMismatches.length >
    0
  ) {
    process.exitCode = 1;
  }
}

await main();
