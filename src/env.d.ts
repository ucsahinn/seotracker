// Custom environment variable type definitions
// These extend the auto-generated Env interface from worker-configuration.d.ts

declare namespace Cloudflare {
  interface Env {
    R2: R2Bucket;

    // Durable Object holding per-audit crawl scratch state (frontier, link
    // edges, page mirror). Bound ONLY in the audit aux worker; untyped here —
    // getAuditScratchpad narrows the stub.
    AUDIT_SCRATCHPAD: DurableObjectNamespace;

    // Service binding to the audit worker's AuditEngine entrypoint (cancel +
    // scratchpad teardown). The inline import() is required: a top-level import
    // would turn this ambient file into a module and break the global
    // augmentation.
    // oxlint-disable-next-line typescript-eslint/consistent-type-imports
    AUDIT_ENGINE: Service<typeof import("./audit-worker").default>;

    AUTH_MODE?: "cloudflare_access" | "local_noauth";
    TEAM_DOMAIN?: string;
    POLICY_AUD?: string;

    // Encrypts the stored Google OAuth tokens at rest. Must be at least 32
    // characters or the Search Console and Analytics integrations stay off.
    BETTER_AUTH_SECRET?: string;
    BETTER_AUTH_URL?: string;

    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;

    // Google PageSpeed Insights key for the audit's Lighthouse phase. Optional:
    // without it the API still answers on a much smaller keyless quota.
    PAGESPEED_API_KEY?: string;
  }
}

interface ImportMetaEnv {
  readonly AUTH_MODE?: "cloudflare_access" | "local_noauth";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}
