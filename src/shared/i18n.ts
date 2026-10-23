/**
 * The app's two UI languages: Turkish (the source) and English.
 *
 * The Turkish string is the key, so code keeps reading in Turkish:
 * `t("Kaydet")`, `t("{count} sayfa", { count })`. English lives in
 * `src/shared/i18n/en/<area>.ts`, one file per area of the app. A string with
 * no English entry falls back to its Turkish source; nothing ever renders a
 * key or throws. `node scripts/i18n-check.mjs` reports what is missing.
 *
 * Module-level constants (label maps, nav items) keep the Turkish and call
 * `t(map[key])` where they are shown: the locale is not known at import time.
 */
import * as React from "react";
import { en } from "@/shared/i18n/en";

export type Locale = "tr" | "en";
export type CatalogValue = string | { one: string; other: string };
export type Catalog = Record<string, CatalogValue>;

/** Written by Settings -> Görünüm -> Dil, read by the server on every request. */
export const LOCALE_COOKIE = "seowatcher-lang";

/*
 * One current locale for the whole module, not one per request.
 *
 * On the server `src/server.ts` sets it at the start of each request from the
 * cookie or Accept-Language (and to "tr" for /mcp). That is only sound because
 * this is a single-user local app: two concurrent requests in different
 * languages would share it. In the browser it starts from the `<html lang>`
 * the server rendered, before anything hydrates, so the first client render
 * says exactly what the server said.
 */
let current: Locale =
  typeof document !== "undefined" && document.documentElement.lang === "en"
    ? "en"
    : "tr";

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale): void {
  current = locale;
}

/** The locale never changes under a mounted tree: switching reloads the page. */
const subscribeNever = () => () => {};

/** React hook (client). Server and client agree, see `current` above. */
export function useLocale(): Locale {
  return React.useSyncExternalStore(subscribeNever, getLocale, getLocale);
}

const englishPlural = new Intl.PluralRules("en-US");
const countFormatters: Partial<Record<Locale, Intl.NumberFormat>> = {};

/*
 * `count` is a quantity, so a number there is grouped the way the locale
 * writes it ("1.234" / "1,234"). Every other variable is inserted as given:
 * a year or a port number must not grow a thousands separator. Format other
 * numbers with `@/shared/format` before passing them.
 */
function display(name: string, value: string | number): string {
  if (name !== "count" || typeof value !== "number") return String(value);
  const formatter = (countFormatters[current] ??= new Intl.NumberFormat(
    current === "en" ? "en-US" : "tr-TR",
  ));
  return formatter.format(value);
}

/**
 * The text for `source` in the current locale.
 *
 * `{name}` placeholders are filled from `vars`. An English value may be
 * `{ one, other }`; the form is picked by `vars.count` when it is a number,
 * and `other` otherwise. Turkish needs no plural forms.
 */
export function t(
  source: string,
  vars?: Record<string, string | number>,
): string {
  let text = source;
  if (current === "en") {
    const entry = en[source];
    if (typeof entry === "string") {
      text = entry;
    } else if (entry) {
      const count = vars?.count;
      text =
        typeof count === "number" && englishPlural.select(count) === "one"
          ? entry.one
          : entry.other;
    }
  }
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = vars[name];
    return value === undefined ? placeholder : display(name, value);
  });
}

/**
 * The locale for a request: the cookie if it names one, else the first
 * language the browser prefers (`tr*` is Turkish, anything else English).
 * No usable header at all (curl, a health check) stays Turkish, the source.
 */
export function resolveLocale(
  cookieHeader: string | null,
  acceptLanguage: string | null,
): Locale {
  for (const part of cookieHeader?.split(";") ?? []) {
    const [name, value] = part.trim().split("=");
    if (name === LOCALE_COOKIE && (value === "tr" || value === "en")) {
      return value;
    }
  }
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((entry) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        q: q ? Number(q.split("=")[1]) : 1,
      };
    })
    .filter((entry) => entry.tag && entry.tag !== "*" && entry.q > 0)
    // Highest q wins; on a tie the earlier entry, as the browser listed it.
    .reduce<{ tag: string; q: number } | null>(
      (best, entry) => (best && best.q >= entry.q ? best : entry),
      null,
    );
  if (!preferred) return "tr";
  return preferred.tag.startsWith("tr") ? "tr" : "en";
}
