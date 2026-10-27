/**
 * The app's UI languages. Turkish is the source; every other locale falls
 * back to English until its catalog includes a translated value.
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
import { deSettings } from "@/shared/i18n/de/settings";
import { deSettingsContinued } from "@/shared/i18n/de/settings-continued";
import { deShared } from "@/shared/i18n/de/shared";
import { deNotifications } from "@/shared/i18n/de/notifications";
import { deCatalog } from "@/shared/i18n/de/catalog";
import { deAudit } from "@/shared/i18n/de/audit";
import { deApp } from "@/shared/i18n/de/app";
import { deSearch } from "@/shared/i18n/de/search";
import { deAnalytics } from "@/shared/i18n/de/analytics";
import { deCards } from "@/shared/i18n/de/cards";
import { frAnalytics } from "@/shared/i18n/fr/analytics";
import { frCards } from "@/shared/i18n/fr/cards";
import { itAnalytics } from "@/shared/i18n/it/analytics";
import { itCards } from "@/shared/i18n/it/cards";
import { ptAnalytics } from "@/shared/i18n/pt/analytics";
import { ptCards } from "@/shared/i18n/pt/cards";
import { frNotifications } from "@/shared/i18n/fr/notifications";
import { frShared } from "@/shared/i18n/fr/shared";
import { frCatalog } from "@/shared/i18n/fr/catalog";
import { frAudit } from "@/shared/i18n/fr/audit";
import { frApp } from "@/shared/i18n/fr/app";
import { frSearch } from "@/shared/i18n/fr/search";
import { itApp } from "@/shared/i18n/it/app";
import { itAppContinued } from "@/shared/i18n/it/app-continued";
import { itNotifications } from "@/shared/i18n/it/notifications";
import { itShared } from "@/shared/i18n/it/shared";
import { itCatalog } from "@/shared/i18n/it/catalog";
import { itCatalogContinued } from "@/shared/i18n/it/catalog-continued";
import { itSearch } from "@/shared/i18n/it/search";
import { ptNotifications } from "@/shared/i18n/pt/notifications";
import { ptShared } from "@/shared/i18n/pt/shared";
import { ptApp } from "@/shared/i18n/pt/app";
import { ptAppContinued } from "@/shared/i18n/pt/app-continued";
import { ptCatalog } from "@/shared/i18n/pt/catalog";
import { ptCatalogContinued } from "@/shared/i18n/pt/catalog-continued";
import { ptSearch } from "@/shared/i18n/pt/search";

export const LOCALES = ["tr", "en", "de", "fr", "it", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export type CatalogValue = string | { one: string; other: string };
export type Catalog = Record<string, CatalogValue>;

const localeValues: ReadonlySet<string> = new Set(LOCALES);
function isLocale(value: string): value is Locale {
  return localeValues.has(value);
}

const catalogs: Partial<Record<Locale, Catalog>> = {
  en,
  de: {
    ...deCards,
    ...deAnalytics,
    ...deShared,
    ...deSettings,
    ...deSettingsContinued,
    ...deNotifications,
    ...deCatalog,
    ...deAudit,
    ...deApp,
    ...deSearch,
  },
  fr: {
    ...frCards,
    ...frAnalytics,
    ...frShared,
    ...frNotifications,
    ...frCatalog,
    ...frAudit,
    ...frApp,
    ...frSearch,
  },
  it: {
    ...itCards,
    ...itAnalytics,
    ...itShared,
    ...itApp,
    ...itAppContinued,
    ...itNotifications,
    ...itCatalog,
    ...itCatalogContinued,
    ...itSearch,
  },
  pt: {
    ...ptCards,
    ...ptAnalytics,
    ...ptShared,
    ...ptNotifications,
    ...ptApp,
    ...ptAppContinued,
    ...ptCatalog,
    ...ptCatalogContinued,
    ...ptSearch,
  },
};

const INTL_LOCALE: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  pt: "pt-PT",
};

/** Written by Settings -> Görünüm -> Dil, read by the server on every request. */
export const LOCALE_COOKIE = "seowatcher-lang";

/*
 * The current locale.
 *
 * On the server each request runs inside a request-scoped store
 * (`src/server/localeScope.ts`, AsyncLocalStorage) that `src/server.ts` fills
 * from the cookie or Accept-Language, and with "tr" for /mcp. The store is
 * reached through a global symbol so this module, which the browser also
 * loads, never imports `node:async_hooks`. Outside a request (scheduled
 * handler, workflows, the audit worker) there is no store and the module
 * value below applies, which on the server stays "tr".
 *
 * In the browser there is no store: the module value starts from the
 * `<html lang>` the server rendered, before anything hydrates, so the first
 * client render says exactly what the server said.
 */
const documentLocale =
  typeof document !== "undefined" ? document.documentElement.lang : "";
let current: Locale = isLocale(documentLocale) ? documentLocale : "tr";

const LOCALE_SCOPE = Symbol.for("seowatcher.i18n.localeScope");
type LocaleScope = { getStore(): Locale | undefined };

export function getLocale(): Locale {
  const scope = (globalThis as Record<symbol, LocaleScope | undefined>)[
    LOCALE_SCOPE
  ];
  return scope?.getStore() ?? current;
}

/** Sets the fallback used where no request scope is active (the browser, tests). */
export function setLocale(locale: Locale): void {
  current = locale;
}

/** The locale never changes under a mounted tree: switching reloads the page. */
const subscribeNever = () => () => {};

/** React hook (client). Server and client agree, see `current` above. */
export function useLocale(): Locale {
  return React.useSyncExternalStore(subscribeNever, getLocale, getLocale);
}

const pluralRules: Partial<Record<Locale, Intl.PluralRules>> = {};
const countFormatters: Partial<Record<Locale, Intl.NumberFormat>> = {};

/*
 * `count` is a quantity, so a number there is grouped the way the locale
 * writes it ("1.234" / "1,234"). Every other variable is inserted as given:
 * a year or a port number must not grow a thousands separator. Format other
 * numbers with `@/shared/format` before passing them.
 */
function display(name: string, value: string | number): string {
  if (name !== "count" || typeof value !== "number") return String(value);
  const locale = getLocale();
  const formatter = (countFormatters[locale] ??= new Intl.NumberFormat(
    INTL_LOCALE[locale],
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
  if (getLocale() !== "tr") {
    const locale = getLocale();
    const entry = catalogs[locale]?.[source] ?? en[source];
    if (typeof entry === "string") {
      text = entry;
    } else if (entry) {
      const count = vars?.count;
      const rules = (pluralRules[locale] ??= new Intl.PluralRules(
        INTL_LOCALE[locale],
      ));
      text =
        typeof count === "number" && rules.select(count) === "one"
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
 * The locale for a request: the cookie if it names one, else the highest
 * quality supported browser language. With no usable preference, stay with
 * Turkish, the source; unsupported preferences fall back to English.
 */
export function resolveLocale(
  cookieHeader: string | null,
  acceptLanguage: string | null,
): Locale {
  for (const part of cookieHeader?.split(";") ?? []) {
    const [name, value] = part.trim().split("=");
    if (name === LOCALE_COOKIE && value && isLocale(value)) {
      return value;
    }
  }
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((entry, index) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        q: q ? Number(q.split("=")[1]) : 1,
        index,
      };
    })
    .filter(
      (entry) =>
        entry.tag &&
        entry.tag !== "*" &&
        Number.isFinite(entry.q) &&
        entry.q > 0 &&
        entry.q <= 1,
    );
  if (preferred.length === 0) return "tr";
  let best: { language: Locale; q: number } | null = null;
  for (const entry of preferred) {
    const language = entry.tag.split("-")[0];
    if (language && isLocale(language) && (!best || entry.q > best.q)) {
      best = { language, q: entry.q };
    }
  }
  return best?.language ?? "en";
}
