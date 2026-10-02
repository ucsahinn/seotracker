/** The repository this install was cloned from; the same one the update check reads. */
export const REPO_URL = "https://github.com/ucsahinn/seotracker";

/** A page under `docs/`. Only files that exist in the repository belong here. */
export const DOCS = {
  docker: "SELF_HOSTING_DOCKER.md",
  searchConsole: "SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md",
  analytics: "SELF_HOSTING_GOOGLE_ANALYTICS.md",
  pageSpeed: "PAGESPEED_API_KEY.md",
  environment: "ENVIRONMENT.md",
} as const;

export function docsUrl(file: (typeof DOCS)[keyof typeof DOCS]): string {
  return `${REPO_URL}/blob/main/docs/${file}`;
}

export const DOCS_INDEX_URL = `${REPO_URL}/tree/main/docs`;
