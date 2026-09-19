// Per-audit page bounds. Shared so the launch form, the input schema, and the
// server-side capacity check all read the same numbers and can't drift apart.
export const MIN_AUDIT_PAGES = 10;
export const DEFAULT_AUDIT_PAGES = 50;
export const MAX_AUDIT_PAGES = 10_000;
