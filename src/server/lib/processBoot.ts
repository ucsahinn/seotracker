/**
 * When this process first served anything, in whole seconds.
 *
 * Read on first use, never when a module loads: the Workers runtime reports
 * the clock as 0 outside a request. A constant set at load was therefore 0,
 * and every "did this start before the process did?" test answered no.
 * `src/server.ts` calls this on each request, so the first request stamps it.
 */
let bootMs: number | null = null;

export function processBootMs(): number {
  bootMs ??= Math.floor(Date.now() / 1000) * 1000;
  return bootMs;
}
