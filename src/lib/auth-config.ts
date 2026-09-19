import { env } from "cloudflare:workers";
import { genericOAuth, organization } from "better-auth/plugins";
import { baseAuthOptions } from "@/lib/auth-options";
import { orgAccessControl, orgRoles } from "@/lib/org-permissions";
import { GA4_OAUTH_PROVIDER_ID, GA4_OAUTH_SCOPES } from "@/shared/ga4";
import { GSC_OAUTH_PROVIDER_ID, GSC_OAUTH_SCOPES } from "@/shared/gsc";

export function createBaseAuthConfig() {
  return {
    ...baseAuthOptions,
    advanced: {
      ipAddress: {
        // On Cloudflare Workers the client IP arrives in CF-Connecting-IP;
        // x-forwarded-for (better-auth's default) is absent, so without this
        // getIp() returns null and rate limiting is silently skipped on every
        // /api/auth endpoint. Header lookup is case-insensitive.
        ipAddressHeaders: ["cf-connecting-ip"],
      },
      // Better Auth writes the OAuth state verification row with a 10-minute
      // expiry but sets the matching signed cookie with maxAge 300, and
      // parseGenericState checks the cookie before the row's expiresAt — so the
      // intended 10-minute window is unreachable. The GSC and GA4 providers
      // below force `select_account consent`, a two-screen Google flow, so a
      // user who takes more than 5 minutes returns with a live verification row
      // and a dead cookie and fails with "State mismatch: State not persisted
      // correctly". The row's expiresAt still enforces the real 10-minute
      // window and the state stays single-use, so this is not a weakening.
      cookies: { state: { attributes: { maxAge: 600 } } },
    },
    account: {
      // Encrypt OAuth access/refresh tokens at rest in D1. Also covers the
      // google social-login tokens; the key derives from BETTER_AUTH_SECRET.
      encryptOAuthTokens: true,
      accountLinking: {
        // Allow connecting a Google account whose email differs from the
        // logged-in user's (agency/freelancer managing a client's property).
        allowDifferentEmails: true,
      },
    },
    plugins: [
      // The workspace every project hangs off. Nobody signs up here, so the
      // single organization is created server-side for the resolved user; the
      // plugin is kept for its tables and membership lookups.
      organization({
        allowUserToCreateOrganization: false,
        ac: orgAccessControl,
        roles: orgRoles,
        disableOrganizationDeletion: true,
      }),
      genericOAuth({
        config: [
          {
            providerId: GSC_OAUTH_PROVIDER_ID,
            clientId: env.GOOGLE_CLIENT_ID?.trim() ?? "",
            clientSecret: env.GOOGLE_CLIENT_SECRET?.trim() ?? "",
            discoveryUrl:
              "https://accounts.google.com/.well-known/openid-configuration",
            scopes: [...GSC_OAUTH_SCOPES],
            accessType: "offline", // request a refresh token
            prompt: "select_account consent",
            pkce: true,
          },
          {
            providerId: GA4_OAUTH_PROVIDER_ID,
            clientId: env.GOOGLE_CLIENT_ID?.trim() ?? "",
            clientSecret: env.GOOGLE_CLIENT_SECRET?.trim() ?? "",
            discoveryUrl:
              "https://accounts.google.com/.well-known/openid-configuration",
            scopes: [...GA4_OAUTH_SCOPES],
            accessType: "offline",
            prompt: "select_account consent",
            pkce: true,
          },
        ],
      }),
    ],
  };
}
