import { getLocale } from "@/shared/i18n";
import { GUIDE_LOCALES } from "./guideLocales";

/** The repository this install was cloned from; the same one the update check reads. */
export const REPO_URL = "https://github.com/ucsahinn/seotracker";

/** The product website: home page, the illustrated guide, the Windows download. */
const SITE_URL = "https://seowatcher.io";

/** A page under `docs/`. Only files that exist in the repository belong here. */
export const DOCS = {
  docker: "kb/kurulum-docker.md",
  searchConsole: "kb/google-baglantisi.md",
  analytics: "kb/analytics.md",
  pageSpeed: "kb/pagespeed-anahtari.md",
  environment: "kb/ayarlar.md",
  windows: "kb/kurulum-windows.md",
  troubleshooting: "kb/sorun-giderme.md",
} as const;

/** The website home in the interface language. */
export function siteUrl(): string {
  const locale = getLocale();
  return `${SITE_URL}${locale === "tr" ? "/" : `/${locale}/`}`;
}

/** The guide's index in the interface language. */
export function docsIndexUrl(): string {
  return `${SITE_URL}${GUIDE_LOCALES[getLocale()].base}`;
}

/** A canonical guide source name, localized to the current website edition. */
export function guideUrl(source: string): string {
  const guide = GUIDE_LOCALES[getLocale()];
  const slug = guide.slugs[source];
  return `${docsIndexUrl()}${slug ? `${slug}/` : ""}`;
}

/**
 * A guide page (`kb/<slug>.md`) is published on the website, where it is
 * illustrated and easier to read; a repository document opens on GitHub.
 * Guide pages open in the active interface language.
 */
export function docsUrl(file: (typeof DOCS)[keyof typeof DOCS]): string {
  const kb = /^kb\/(.+)\.md$/.exec(file);
  if (!kb?.[1]) return `${REPO_URL}/blob/main/docs/${file}`;
  return guideUrl(kb[1]);
}
