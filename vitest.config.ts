import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

/**
 * Two projects, because the suite tests two different things.
 *
 * `unit` is everything that runs in Node: services, repositories, the issue
 * engine, the MCP tools. `render` is the screens, and it exists because the
 * suite structurally could not see them: eight bugs fixed in one round were
 * all a screen answering a failed query with a confident empty state, and
 * nothing in 628 Node tests could catch one. The cheapest guard against that
 * class is to render the component with a rejecting query and assert the
 * empty-state copy is *not* on the page.
 */
export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    restoreMocks: true,
    clearMocks: true,
    projects: [
      {
        plugins: [tsConfigPaths()],
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
          restoreMocks: true,
          clearMocks: true,
          server: {
            deps: {
              // Processed by vitest (instead of loaded natively by node) so
              // the oauth-refresh e2e test's cloudflare:workers mock reaches
              // the real provider module.
              inline: ["@cloudflare/workers-oauth-provider"],
            },
          },
        },
      },
      {
        plugins: [tsConfigPaths()],
        test: {
          name: "render",
          // happy-dom rather than jsdom: this suite only needs a DOM to
          // mount into and assert text against, and it starts in a fraction
          // of the time.
          environment: "happy-dom",
          include: ["src/**/*.test.tsx"],
          alias: {
            // Client components import server functions for their types and
            // signatures, and those reach the workers runtime. The module
            // does not exist outside workerd, so without this every render
            // test fails at transform time on an import it never calls.
            "cloudflare:workers": new URL(
              "./src/client/__mocks__/cloudflare-workers.ts",
              import.meta.url,
            ).pathname,
          },
          setupFiles: ["src/client/test-setup.ts"],
          restoreMocks: true,
          clearMocks: true,
        },
      },
    ],
  },
});
