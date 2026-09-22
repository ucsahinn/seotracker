// Canonical schema barrel. Repositories import their tables from here and the
// `db` handle from "@/db", so a table's definition has exactly one home.
export * from "./app.schema";
export * from "./project-context.schema";
export * from "./reports.schema";
export * from "./report-templates.schema";
export * from "./audit.schema";
export * from "./better-auth-schema";
export * from "./ga4.schema";
export * from "./gsc.schema";
export * from "./gsc-history.schema";
export * from "./google-oauth.schema";
export * from "./update-check.schema";
export * from "./gsc-inspection.schema";
