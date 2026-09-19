import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { devtools } from "@tanstack/devtools-vite";
import { leanWorkerBundle } from "./vite-plugin-lean-worker-bundle";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = process.env.PORT
    ? Number(process.env.PORT)
    : env.PORT
      ? Number(env.PORT)
      : 3001;
  const showDevtools = env.VITE_SHOW_DEVTOOLS !== "false";
  const allowedHosts = [
    env.ALLOWED_HOST,
    env.BETTER_AUTH_URL ? new URL(env.BETTER_AUTH_URL).hostname : undefined,
  ].filter((host): host is string => Boolean(host));

  return {
    // Inlined into the client bundle at build time. docker-entrypoint.sh
    // fingerprints the same list to decide whether a rebuild is needed, so the
    // two must stay in sync.
    envPrefix: ["VITE_", "AUTH_MODE"],
    server: {
      allowedHosts,
      port,
    },
    preview: {
      allowedHosts,
      port,
    },

    plugins: [
      leanWorkerBundle(),
      showDevtools
        ? devtools({
            consolePiping: {
              enabled: true,
              levels: ["log", "warn", "error", "info", "debug"],
            },
          })
        : null,
      cloudflare({
        inspectorPort: false,
        viteEnvironment: { name: "ssr" },
        // The site-audit aux worker builds to dist/seotracker_audit/ and runs
        // beside the main worker in dev and preview, with the app's
        // cross-script SITE_AUDIT_WORKFLOW / AUDIT_SCRATCHPAD bindings
        // resolved against it.
        auxiliaryWorkers: [{ configPath: "./wrangler.audit.jsonc" }],
      }),
      tsConfigPaths(),
      tanstackStart(),
      viteReact(),
      tailwindcss(),
    ],
  };
});
