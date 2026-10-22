/**
 * Everything the two site builders share about languages: where each
 * language's guide sources live, where its pages are written, the English
 * URL slug of every Turkish guide page, and the chrome strings of the docs
 * shell. Turkish is the primary language (x-default); English mirrors it.
 */

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
};

/** Navigation groups of the guide, in reading order, with their titles per language. */
export const groups = [
  {
    title: { tr: "Başlangıç", en: "Getting started" },
    slugs: [
      "kurulum-windows",
      "kurulum-docker",
      "google-baglantisi",
      "pagespeed-anahtari",
    ],
  },
  {
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
    title: { tr: "Başvuru", en: "Reference" },
    slugs: ["yardim", "denetim-kurallari", "ajan-kurulumu", "sorun-giderme"],
  },
];

export const locales = {
  tr: {
    lang: "tr",
    ogLocale: "tr_TR",
    kbSub: "",
    base: "",
    docsBase: "/docs/",
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
    t: {
      guide: "Kılavuz",
      guideTitle: "seowatcher kılavuzu: kurulum, ekranlar ve sorun giderme",
      guideDescription:
        "seowatcher kılavuzları: kurulum, her ekranın ne gösterdiği, Google bağlantısı, denetim kuralları, ajan kurulumu ve sorun giderme.",
      guideLede:
        "Kurulumdan ilk rapora kadar her adım ve her ekran için kısa, sade bir anlatım. Uygulamanın adı GitHub'da seotracker, bu sitede seowatcher; ikisi aynı şey.",
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
      skip: "İçeriğe atla",
      copy: "Kopyala",
      copied: "Kopyalandı",
      copyLabel: "Kodu kopyala",
      switchLabel: "Language",
      switchTo: "English",
      switchHref: "/en/docs/",
      notFound: "Sayfa bulunamadı",
      guideLower: "kılavuz",
      downloadWindows: "Windows için indir",
      license: "seowatcher, MIT lisansı.",
      releaseNotes: "Sürüm notları",
      switchShort: "EN",
      copyFailed: "Kopyalanamadı",
    },
  },
  en: {
    lang: "en",
    ogLocale: "en_US",
    kbSub: "en",
    base: "/en",
    docsBase: "/en/docs/",
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
    t: {
      guide: "Guide",
      guideTitle: "seowatcher guide: setup, screens and troubleshooting",
      guideDescription:
        "seowatcher guides: installation, what every screen shows, the Google connection, audit rules, agent setup and troubleshooting.",
      guideLede:
        "A short, plain walkthrough of every step and every screen, from installation to the first report. The app is called seotracker on GitHub and seowatcher on this site; they are the same thing.",
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
      switchLabel: "Dil",
      switchTo: "Türkçe",
      switchHref: "/docs/",
      notFound: "Page not found",
      guideLower: "guide",
      downloadWindows: "Download for Windows",
      license: "seowatcher, MIT license.",
      releaseNotes: "Release notes",
      switchShort: "TR",
      copyFailed: "Copy failed",
    },
  },
};

/** URL of a guide page in a language; the index when slug is empty. */
export function docUrl(locale, slug) {
  if (!slug) return locale.docsBase;
  return `${locale.docsBase}${locale.lang === "en" ? enSlugs[slug] : slug}/`;
}

/**
 * Rewrites the site-internal links of a Turkish page for the English edition:
 * "/" and "/#x" become "/en/" and "/en/#x", "/docs/<tr-slug>/" becomes
 * "/en/docs/<en-slug>/". Asset and external links are left alone.
 */
export function rewriteLinksToEnglish(html) {
  return html
    .replace(/href="\/docs\/([a-z0-9-]+)\/(#[^"]*)?"/g, (m, slug, hash) =>
      enSlugs[slug] ? `href="/en/docs/${enSlugs[slug]}/${hash || ""}"` : m,
    )
    .replace(
      /href="\/docs\/(#[^"]*)?"/g,
      (m, hash) => `href="/en/docs/${hash || ""}"`,
    )
    .replace(/href="\/(#[^"]*)?"/g, (m, hash) => `href="/en/${hash || ""}"`);
}
