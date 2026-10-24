import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const result = spawnSync(
  process.execPath,
  [
    fileURLToPath(
      new URL("../../node_modules/vitest/vitest.mjs", import.meta.url),
    ),
    "run",
    "--config",
    "badseo/vitest.audit.config.ts",
  ],
  {
    cwd: fileURLToPath(new URL("../../", import.meta.url)),
    env: {
      ...process.env,
      BADSEO_URL: process.argv[2] ?? "http://127.0.0.1:8787",
    },
    stdio: "inherit",
  },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
