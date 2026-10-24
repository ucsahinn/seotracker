import { AsyncLocalStorage } from "node:async_hooks";
import type { Locale } from "@/shared/i18n";

/*
 * The UI language of the request being served. `getLocale()` in
 * `@/shared/i18n` reads this store through the global symbol below; that
 * module is also bundled for the browser, so it cannot import
 * `node:async_hooks` itself. Two concurrent requests in different languages
 * each see their own locale, and so does work they start (waitUntil,
 * streamed rendering).
 */
const storage = new AsyncLocalStorage<Locale>();
(globalThis as Record<symbol, unknown>)[
  Symbol.for("seowatcher.i18n.localeScope")
] = storage;

export function runWithLocale<T>(locale: Locale, fn: () => T): T {
  return storage.run(locale, fn);
}
