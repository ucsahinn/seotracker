import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

// Literal `new URL(..., import.meta.url)` (rather than a path helper) so
// knip sees the stub file as used. Note the cost of that: it also hides a
// stub that has gone dead. `workers-ai-provider-stub.ts` sat here invisible
// to `ci:check` long after its package left the lockfile. If a stub's
// package is gone, the alias and the file go with it.
const JUST_BASH_STUB = fileURLToPath(
  new URL("./src/server/lib/just-bash-stub.ts", import.meta.url),
);
/**
 * Dependencies that must never be reachable from the workers' eager startup
 * module graphs. The 128 MB isolate limit is shared by everything evaluated at
 * startup (production OOM bursts trace back to baseline heap, not leaks), so
 * each of these is either loaded lazily behind a dynamic import or stubbed
 * out. `generateBundle` below fails the build if one sneaks back in via a
 * static import chain.
 */
const EAGER_DENYLIST: Array<{ pattern: RegExp; expected: string }> = [
  {
    pattern: /node_modules\/just-bash\//,
    expected:
      "aliased to just-bash-stub.ts (the agent workspace bash tool is " +
      "disabled)",
  },
  {
    // The barrel (index.*) is allowed — the load hook rewrites its content to
    // re-export English only — as is en.* itself. Every other locale module
    // must stay out; if the load-hook swap ever regresses, the real barrel
    // pulls the individual locale files back in and they match here.
    pattern: /node_modules\/zod\/v4\/locales\/(?!en\.|index\.)/,
    expected:
      "replaced with an en-only barrel via the load hook below (we never " +
      "localize zod errors)",
  },
  {
    // Pre-existing boundary from the site-audit engine, guarded here too.
    pattern: /node_modules\/cheerio\//,
    expected:
      "lazy-loaded behind the page-analyzer dynamic import " +
      "(site-audit-workflow-helpers.ts)",
  },
];

/**
 * Keeps the worker's eager server bundle lean, in three parts:
 *
 * 1. A `resolve.alias` stub for a package that is pure dead weight, pulled
 *    in eagerly by a dependency that never reaches the code path needing it.
 * 2. A `load`-hook swap of zod v4's all-languages locales barrel for an
 *    en-only barrel (the barrel is imported via relative specifiers inside
 *    zod itself, and pre-enforced resolvers in this plugin stack win the
 *    resolveId race, so matching the resolved file path in `load` is the
 *    reliable seam).
 * 3. A `generateBundle` assertion that walks the static-import closure of the
 *    worker entry chunk and fails the build if any EAGER_DENYLIST module is
 *    reachable — turning "we verified the chunk by grepping a sourcemap once"
 *    into a permanent regression test.
 */
export function leanWorkerBundle(): Plugin {
  return {
    name: "lean-worker-bundle",
    config() {
      return {
        resolve: {
          alias: {
            // Rationale lives in the stub's docblock. TODO: remove the
            // just-bash workaround once `agents` stops eagerly importing it
            // (https://github.com/cloudflare/agents/issues/1673). The credit
            // used to go to @cloudflare/think, which left the lockfile;
            // `pnpm why just-bash` names the current importer.
            "just-bash": JUST_BASH_STUB,
          },
        },
      };
    },
    load(id) {
      // zod v4's core/classic entrypoints re-export the full locales barrel
      // (`export * as locales from "../locales/index.js"`, every language,
      // ~208 kB) into the eager bundle. Zod's default English error map
      // imports `../locales/en.js` directly and bypasses the barrel, so only
      // `z.locales.<lang>` consumers need it — and we never localize zod
      // errors. Serve an en-only barrel in its place so `z.locales.en` keeps
      // working and the other ~40 languages tree-shake away. (`./en.js`
      // resolves relative to the real barrel path, so no stub file needed.)
      const barrel = id.match(
        /node_modules\/zod\/v4\/locales\/index\.(js|cjs)$/,
      );
      if (barrel) {
        return `export { default as en } from "./en.${barrel[1]}";`;
      }
    },
    generateBundle(_options, bundle) {
      // Only the worker builds matter for isolate memory; the client bundle
      // never contains these packages (and the zod swap applies everywhere).
      // "ssr" is the main worker; "seotracker_audit" is the site-audit aux
      // worker, which must stay lean for the same reason it exists.
      if (!["ssr", "seotracker_audit"].includes(this.environment.name)) {
        return;
      }

      // Bundle keys are chunk fileNames already.
      const chunkAt = (fileName: string) => {
        const output = bundle[fileName];
        return output?.type === "chunk" ? output : undefined;
      };

      // Static-import closure from the entry chunks: everything here is
      // evaluated at isolate startup. Dynamic imports are excluded — landing
      // there is the point of the lazy boundaries.
      const eager = new Set<string>();
      const queue = Object.values(bundle)
        .filter((output) => output.type === "chunk" && output.isEntry)
        .map((chunk) => chunk.fileName);
      while (queue.length > 0) {
        const fileName = queue.pop();
        if (fileName === undefined || eager.has(fileName)) continue;
        eager.add(fileName);
        queue.push(...(chunkAt(fileName)?.imports ?? []));
      }

      const violations: string[] = [];
      for (const rule of EAGER_DENYLIST) {
        for (const fileName of eager) {
          const hits =
            chunkAt(fileName)?.moduleIds.filter((id) =>
              rule.pattern.test(id),
            ) ?? [];
          if (hits.length > 0) {
            violations.push(
              `${hits[0]}${hits.length > 1 ? ` (+${hits.length - 1} more modules)` : ""}\n` +
                `  reached the eager startup graph via chunk ${fileName}\n` +
                `  expected: ${rule.expected}`,
            );
          }
        }
      }

      if (violations.length > 0) {
        this.error(
          `[lean-worker-bundle] denylisted module(s) in the worker's eager ` +
            `startup graph:\n\n${violations.join("\n\n")}\n\nRestore the ` +
            `lazy/stub boundary, or update EAGER_DENYLIST in ` +
            `vite-plugin-lean-worker-bundle.ts if this is intentional.`,
        );
      }
    },
  };
}
