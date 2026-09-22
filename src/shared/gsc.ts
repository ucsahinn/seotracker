/** Better Auth providerId for the incremental Google Search Console connection.
 *  Kept in `shared` so both server (auth config, GSC client) and client (connect
 *  button) can reference it without importing the server-only auth config. */
export const GSC_OAUTH_PROVIDER_ID = "google-search-console";

export const GSC_OAUTH_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/webmasters.readonly",
] as const;

/**
 * What a service account asks for.
 *
 * Deliberately narrower than the OAuth scopes above: `openid`, `email` and
 * `profile` describe a signed-in person, and a service account is not one.
 * Asking for them makes Google refuse the assertion. `webmasters.readonly`
 * also covers URL Inspection.
 */
export const GSC_SERVICE_ACCOUNT_SCOPE =
  "https://www.googleapis.com/auth/webmasters.readonly";

export const GSC_SELF_HOSTED_SETUP_DOCS_URL =
  "https://github.com/ucsahinn/seotracker/blob/main/docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md";
