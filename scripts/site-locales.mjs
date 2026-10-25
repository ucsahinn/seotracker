/**
 * Everything the two site builders share about languages: where each
 * language's guide sources live, where its pages are written, the URL slug of
 * every Turkish guide page in each language, the chrome strings of the docs
 * shell, and the flag menu that switches between editions. Turkish is the
 * primary language (x-default); the others mirror it.
 *
 * Turkish and English are defined here. Every other language is read from
 * `scripts/site-i18n.<lang>.json` (slugs, group titles, chrome strings,
 * months) so a translator can add an edition without touching the builders.
 * An edition is built only when its guide folder `docs/kb/<lang>/` or its
 * home table `scripts/site-home.<lang>.json` exists.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Turkish guide slug -> English URL slug. Keys are the kb file names. */
export const enSlugs = {
  "kurulum-windows": "install-windows",
  "kurulum-docker": "install-docker",
  "google-baglantisi": "google-connection",
  "pagespeed-anahtari": "pagespeed-key",
  projeler: "projects",
  panel: "dashboard",
  "arama-performansi": "search-performance",
  "siralama-takibi": "rank-tracking",
  firsatlar: "opportunities",
  "kayitli-kelimeler": "saved-keywords",
  analytics: "analytics",
  "site-denetimi": "site-audit",
  "dizin-durumu": "index-status",
  raporlar: "reports",
  "proje-bilgisi": "project-context",
  ayarlar: "settings",
  yardim: "help",
  "denetim-kurallari": "audit-rules",
  "ajan-kurulumu": "agent-setup",
  "sorun-giderme": "troubleshooting",
  "surum-notlari": "release-notes",
};

/** Navigation groups of the guide, in reading order, with their titles per language. */
export const groups = [
  {
    key: "Başlangıç",
    title: { tr: "Başlangıç", en: "Getting started" },
    slugs: [
      "kurulum-windows",
      "kurulum-docker",
      "google-baglantisi",
      "pagespeed-anahtari",
    ],
  },
  {
    key: "Ekranlar",
    title: { tr: "Ekranlar", en: "Screens" },
    slugs: [
      "projeler",
      "panel",
      "arama-performansi",
      "siralama-takibi",
      "firsatlar",
      "kayitli-kelimeler",
      "analytics",
      "site-denetimi",
      "dizin-durumu",
      "raporlar",
      "proje-bilgisi",
      "ayarlar",
    ],
  },
  {
    key: "Başvuru",
    title: { tr: "Yardım ve başvuru", en: "Help and reference" },
    slugs: [
      "yardim",
      "denetim-kurallari",
      "ajan-kurulumu",
      "sorun-giderme",
      "surum-notlari",
    ],
  },
];

// "23 Ekim 2026" as each language writes a date; the ISO form stays in metadata.
const dateFormats = {
  dmy: (d, m, y) => `${d} ${m} ${y}`,
  mdy: (d, m, y) => `${m} ${d}, ${y}`,
  "dmy.": (d, m, y) => `${d}. ${m} ${y}`,
  "dmy-de": (d, m, y) => `${d} de ${m} de ${y}`,
};

export const locales = {
  tr: {
    lang: "tr",
    name: "Türkçe",
    ogLocale: "tr_TR",
    kbSub: "",
    base: "",
    docsBase: "/docs/",
    privacySlug: "gizlilik",
    dateOrder: "dmy",
    months: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    callouts: { Belirti: "belirti", Sebep: "sebep", Çözüm: "cozum" },
    slugs: null,
    t: {
      guide: "Kılavuz",
      guideTitle: "seowatcher kılavuzu: kurulum, ekranlar ve sorun giderme",
      guideDescription:
        "seowatcher kılavuzu: kurulum, her ekranın ne gösterdiği, Google'a bağlanma, denetim kuralları, ajan kurulumu ve sorun giderme.",
      guideLede:
        "Kurulumdan ilk rapora kadar her adım ve her ekran anlatılır. Uygulamanın adı bu sitede seowatcher, GitHub'da seotracker'dır. İkisi aynı uygulamadır.",
      screenSuffix: " ekranı",
      titleSuffix: " | seowatcher kılavuzu",
      onThisPage: "Bu sayfada",
      prevNext: "Önceki ve sonraki sayfa",
      prev: "Önceki",
      next: "Sonraki",
      updated: "Son güncelleme",
      reportIssue: "Bir hata görürseniz",
      reportLink: "GitHub'da bildirin",
      siteNav: "Site",
      home: "Ana sayfa",
      download: "İndir",
      skip: "İçeriğe geç",
      copy: "Kopyala",
      copied: "Kopyalandı",
      copyLabel: "Kodu kopyala",
      language: "Dil",
      notFound: "Sayfa bulunamadı",
      guideLower: "kılavuz",
      downloadWindows: "Windows için indir",
      license: "seowatcher, MIT lisansı.",
      releaseNotes: "Sürüm notları",
      copyFailed: "Kopyalanamadı",
      free: "Ücretsiz",
    },
  },
  en: {
    lang: "en",
    name: "English",
    ogLocale: "en_US",
    kbSub: "en",
    base: "/en",
    docsBase: "/en/docs/",
    privacySlug: "privacy",
    dateOrder: "mdy",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    callouts: { Symptom: "belirti", Cause: "sebep", Fix: "cozum" },
    slugs: enSlugs,
    t: {
      guide: "Guide",
      guideTitle: "seowatcher guide: setup, screens and troubleshooting",
      guideDescription:
        "seowatcher guides: installation, what every screen shows, the Google connection, audit rules, agent setup and troubleshooting.",
      guideLede:
        "A short, plain walkthrough of every step and every screen, from installation to the first report. The app is called seowatcher here and seotracker on GitHub; they are the same thing.",
      screenSuffix: " screen",
      titleSuffix: " | seowatcher guide",
      onThisPage: "On this page",
      prevNext: "Previous and next page",
      prev: "Previous",
      next: "Next",
      updated: "Last updated",
      reportIssue: "Spotted a mistake?",
      reportLink: "Report it on GitHub",
      siteNav: "Site",
      home: "Home",
      download: "Download",
      skip: "Skip to content",
      copy: "Copy",
      copied: "Copied",
      copyLabel: "Copy code",
      language: "Language",
      notFound: "Page not found",
      guideLower: "guide",
      downloadWindows: "Download for Windows",
      license: "seowatcher, MIT license.",
      releaseNotes: "Release notes",
      copyFailed: "Copy failed",
      free: "Free",
    },
  },
};

// Chrome strings added after the tables above went out for translation. An
// edition's own value wins; English fills the gap until a translator adds one
// to `site-i18n.<lang>.json`.
const lateT = {
  tr: {
    starWhy:
      "Bir yıldız, başkalarının da bu ücretsiz aracı bulmasına yardım eder.",
    starLink: "GitHub'da yıldız verin",
  },
  en: {
    starWhy: "A star helps other people find a free tool.",
    starLink: "Star it on GitHub",
  },
};
for (const [lang, t] of Object.entries(lateT))
  locales[lang].t = { ...t, ...locales[lang].t };

// The translated editions: one JSON per language, written by the translator.
for (const file of fs.readdirSync(path.join(root, "scripts"))) {
  const m = /^site-i18n\.([a-z]{2})\.json$/.exec(file);
  if (!m || locales[m[1]]) continue;
  const data = JSON.parse(
    fs.readFileSync(path.join(root, "scripts", file), "utf8"),
  );
  const lang = m[1];
  const slugs = data.slugs || {};
  for (const slug of Object.keys(enSlugs))
    if (!slugs[slug]) throw new Error(`${file}: no slug for ${slug}`);
  for (const g of groups)
    if (!data.groups?.[g.key])
      throw new Error(`${file}: no group title for ${g.key}`);
  if (!/^[a-z0-9-]+$/.test(data.privacySlug || ""))
    throw new Error(`${file}: no valid localized privacy slug`);
  if (new Set(Object.values(slugs)).size !== Object.keys(slugs).length)
    throw new Error(`${file}: guide slugs must be unique`);
  const t = { ...locales.en.t, ...data.t };
  for (const k of ["switchLabel", "switchTo", "switchHref", "switchShort"])
    delete t[k];
  if (!data.t?.language) t.language = data.t?.switchLabel || t.language;

  locales[lang] = {
    lang,
    name: data.name || lang.toUpperCase(),
    ogLocale: data.ogLocale || `${lang}_${lang.toUpperCase()}`,
    kbSub: lang,
    base: `/${lang}`,
    docsBase: `/${lang}/docs/`,
    privacySlug: data.privacySlug,
    dateOrder: data.dateOrder in dateFormats ? data.dateOrder : "dmy",
    months: data.months,
    callouts: data.callouts || locales.en.callouts,
    slugs,
    t,
  };
  for (const g of groups) g.title[lang] = data.groups[g.key];
}

/** Which editions of the home page and the guide exist on disk. */
export function hasHome(locale) {
  return (
    locale.lang === "tr" ||
    fs.existsSync(path.join(root, "site", locale.lang, "index.html"))
  );
}
export function hasGuide(locale) {
  return (
    locale.lang === "tr" ||
    fs.existsSync(path.join(root, "docs", "kb", locale.kbSub))
  );
}

/** "2026-10-22" as people read it in that language. */
export function readableDate(locale, iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return dateFormats[locale.dateOrder](
    Number(m[3]),
    locale.months[Number(m[2]) - 1],
    m[1],
  );
}

/** URL of a guide page in a language; the index when slug is empty. */
export function docUrl(locale, slug) {
  if (!slug) return locale.docsBase;
  return `${locale.docsBase}${locale.slugs ? locale.slugs[slug] : slug}/`;
}

/** URL of the privacy notice in the current edition. */
export function privacyUrl(locale) {
  return `${locale.base}/${locale.privacySlug}/`;
}

/**
 * Rewrites the site-internal links of a Turkish page for another edition:
 * "/" and "/#x" become "/<lang>/" and "/<lang>/#x", "/docs/<tr-slug>/"
 * becomes "/<lang>/docs/<slug>/". Asset and external links are left alone.
 */
export function rewriteLinks(html, locale) {
  const localizedPrivacy = html.replace(
    /href="\/privacy\/(#[^"]*)?"/g,
    (m, hash) => `href="${privacyUrl(locale)}${hash || ""}"`,
  );
  if (locale.lang === "tr") return localizedPrivacy;
  return localizedPrivacy
    .replace(/href="\/docs\/([a-z0-9-]+)\/(#[^"]*)?"/g, (m, slug, hash) =>
      locale.slugs[slug]
        ? `href="${locale.docsBase}${locale.slugs[slug]}/${hash || ""}"`
        : m,
    )
    .replace(
      /href="\/docs\/(#[^"]*)?"/g,
      (m, hash) => `href="${locale.docsBase}${hash || ""}"`,
    )
    .replace(
      /href="\/(#[^"]*)?"/g,
      (m, hash) => `href="${locale.base}/${hash || ""}"`,
    );
}
export const rewriteLinksToEnglish = (html) => rewriteLinks(html, locales.en);

/** Small flags, 20x14, drawn with a few shapes each so they stay crisp. */
export const flags = {
  tr: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#e30a17"/><circle cx="7.6" cy="7" r="3.4" fill="#fff"/><circle cx="8.4" cy="7" r="2.7" fill="#e30a17"/><polygon fill="#fff" points="12.9,5.3 13.28,6.47 14.52,6.47 13.52,7.2 13.9,8.38 12.9,7.65 11.9,8.38 12.28,7.2 11.28,6.47 12.52,6.47"/></svg>',
  en: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" stroke-width="2.6"/><path d="M0 0L20 14M20 0L0 14" stroke="#c8102e" stroke-width="0.9"/><path d="M10 0V14M0 7H20" stroke="#fff" stroke-width="4.2"/><path d="M10 0V14M0 7H20" stroke="#c8102e" stroke-width="2.6"/></svg>',
  de: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#000"/><rect y="4.67" width="20" height="4.67" fill="#dd0000"/><rect y="9.33" width="20" height="4.67" fill="#ffce00"/></svg>',
  fr: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#0055a4"/><rect x="13.33" width="6.67" height="14" fill="#ef4135"/></svg>',
  it: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#009246"/><rect x="13.33" width="6.67" height="14" fill="#ce2b37"/></svg>',
  pt: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#ff0000"/><rect width="8" height="14" fill="#006600"/><circle cx="8" cy="7" r="2.6" fill="#ffcc00"/><circle cx="8" cy="7" r="1.5" fill="#ff0000"/></svg>',
};

/** A flat row of flags with names, for the mobile menu and the footer. */
export function langRowHtml(current, hrefFor, { available } = {}) {
  const list = langOrder.filter(
    (l) => locales[l] && (!available || available(locales[l])),
  );
  const items = list
    .map((l) => {
      const loc = locales[l];
      const cur = l === current.lang ? ' aria-current="page"' : "";
      return `<a href="${hrefFor(loc)}" lang="${l}" hreflang="${l}"${cur}><span class="flag">${flags[l]}</span>${loc.name}</a>`;
    })
    .join("");
  return `<nav class="langrow" aria-label="${current.t.language}">${items}</nav>`;
}

/** Fixed order of the flag menu. */
export const langOrder = ["tr", "en", "de", "fr", "it", "pt"];

/**
 * The flag menu: the current flag as the trigger, every available edition in
 * the list. `hrefFor(locale)` gives the matching page in that language.
 */
export function langMenuHtml(current, hrefFor, { available } = {}) {
  const list = langOrder.filter(
    (l) => locales[l] && (!available || available(locales[l])),
  );
  const items = list
    .map((l) => {
      const loc = locales[l];
      const cur = l === current.lang ? ' aria-current="page"' : "";
      return `<li><a href="${hrefFor(loc)}" lang="${l}" hreflang="${l}"${cur}><span class="flag">${flags[l]}</span>${loc.name}</a></li>`;
    })
    .join("");
  return `<details class="langs"><summary aria-label="${current.lang.toUpperCase()} — ${current.t.language}: ${current.name}"><span class="flag">${flags[current.lang]}</span><span class="code">${current.lang.toUpperCase()}</span></summary><ul>${items}</ul></details>`;
}
