import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: "node",
    include: ["badseo/scripts/audit.integration.test.ts"],
    testTimeout: 1_900_000,
  },
});
