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

/**
 * A guide page (`kb/<slug>.md`) is published on the website, where it is
 * illustrated and easier to read; a repository document opens on GitHub.
 */
export function docsUrl(file: (typeof DOCS)[keyof typeof DOCS]): string {
  const kb = /^kb\/(.+)\.md$/.exec(file);
  return kb
    ? `${SITE_URL}/docs/${kb[1]}/`
    : `${REPO_URL}/blob/main/docs/${file}`;
}

export const DOCS_INDEX_URL = `${SITE_URL}/docs/`;
