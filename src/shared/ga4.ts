/** Better Auth provider ID for the dedicated Google Analytics grant. */
export const GA4_OAUTH_PROVIDER_ID = "google-analytics";

export const GA4_OAUTH_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/analytics.readonly",
] as const;

/** The service-account scope; see the note on `GSC_SERVICE_ACCOUNT_SCOPE`. */
export const GA4_SERVICE_ACCOUNT_SCOPE =
  "https://www.googleapis.com/auth/analytics.readonly";

export const GA4_SELF_HOSTED_SETUP_DOCS_URL =
  "https://github.com/ucsahinn/seotracker/blob/main/docs/SELF_HOSTING_GOOGLE_ANALYTICS.md";
