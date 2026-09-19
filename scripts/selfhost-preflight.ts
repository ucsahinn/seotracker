/**
 * Container-start preflight for Docker self-hosting. Validates the environment
 * before migrations and the vite build so misconfiguration fails in seconds
 * with the exact fix. Run via: pnpm exec tsx scripts/selfhost-preflight.ts
 *
 * Exits non-zero on hard failures (invalid AUTH_MODE, missing auth config for
 * the selected mode). Warnings and info lines never block startup.
 */
import process from "node:process";
import {
  formatPreflightReport,
  runSelfhostPreflight,
} from "../src/lib/selfhost-preflight";

const result = runSelfhostPreflight(process.env);

console.log("--- seotracker self-host preflight ---");
console.log(formatPreflightReport(result));

if (result.failed) {
  process.exit(1);
}
