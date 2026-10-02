/**
 * The `createdBy` the app stamps on a report it builds itself (the audit
 * download). The MCP client label is stripped to [A-Za-z0-9._+- ], so a client
 * can never produce a value containing ":" -- this one cannot be forged.
 */
export const APP_REPORT_CREATOR = "app:site-audit";

/** What the app stamped before this constant existed; still treated as the audit download. */
export const LEGACY_APP_REPORT_CREATOR = "seotracker";
