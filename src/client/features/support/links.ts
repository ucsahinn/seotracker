import { getLocale } from "@/shared/i18n";

/** The repository this install was cloned from; the same one the update check reads. */
export const REPO_URL = "https://github.com/ucsahinn/seotracker";

/** The product website: home page, the illustrated guide, the Windows download. */
export const SITE_URL = "https://seowatcher.io";

/** A page under `docs/`. Only files that exist in the repository belong here. */
export const DOCS = {
  docker: "SELF_HOSTING_DOCKER.md",
  searchConsole: "SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md",
  analytics: "SELF_HOSTING_GOOGLE_ANALYTICS.md",
  pageSpeed: "PAGESPEED_API_KEY.md",
  environment: "ENVIRONMENT.md",
  windows: "kb/kurulum-windows.md",
  troubleshooting: "kb/sorun-giderme.md",
} as const;

/*
 * The English guide lives under /en/docs/ with English slugs. A copy of the
 * slugs this screen links to, from `enSlugs` in scripts/site-locales.mjs (the
 * website build), which the app does not import.
 */
const EN_SLUGS: Record<string, string> = {
  "kurulum-windows": "install-windows",
  "sorun-giderme": "troubleshooting",
};

/** The website home in the interface language. */
export function siteUrl(): string {
  return getLocale() === "en" ? `${SITE_URL}/en/` : SITE_URL;
}

/** The guide's index in the interface language. */
export function docsIndexUrl(): string {
  return getLocale() === "en" ? `${SITE_URL}/en/docs/` : `${SITE_URL}/docs/`;
}

/**
 * A guide page (`kb/<slug>.md`) is published on the website, where it is
 * illustrated and easier to read; a repository document opens on GitHub.
 * In English a guide page opens the English guide.
 */
export function docsUrl(file: (typeof DOCS)[keyof typeof DOCS]): string {
  const kb = /^kb\/(.+)\.md$/.exec(file);
  if (!kb?.[1]) return `${REPO_URL}/blob/main/docs/${file}`;
  const english = getLocale() === "en" ? EN_SLUGS[kb[1]] : undefined;
  return english
    ? `${SITE_URL}/en/docs/${english}/`
    : `${SITE_URL}/docs/${kb[1]}/`;
}
