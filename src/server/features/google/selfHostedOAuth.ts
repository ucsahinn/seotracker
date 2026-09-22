import { symmetricEncrypt } from "better-auth/crypto";
import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { decodeJwt } from "jose";
import { z } from "zod";
import { db } from "@/db";
import { account } from "@/db/schema";
import { getAuth } from "@/lib/auth";
import { getAuthMode } from "@/lib/auth-mode";
import { resolveCloudflareAccessContext } from "@/middleware/ensure-user/cloudflareAccess";
import { resolveLocalNoAuthContext } from "@/middleware/ensure-user/delegated";
import { AppError } from "@/server/lib/errors";
import {
  createOAuthState,
  verifyOAuthState,
  type OAuthState,
} from "@/server/features/google/selfHostedOAuthState";
import { captureServerError } from "@/server/lib/observability";
import { getPublicOrigin } from "@/server/mcp/public-origin";
import { GA4_OAUTH_PROVIDER_ID, GA4_OAUTH_SCOPES } from "@/shared/ga4";
import { GSC_OAUTH_PROVIDER_ID, GSC_OAUTH_SCOPES } from "@/shared/gsc";
import {
  getGoogleOAuthClientConfig,
  hasSelfHostedGoogleOAuthConfig,
} from "./oauth-config";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export type SelfHostedGoogleOAuthIntegration = {
  providerId: string;
  stateNamespace: string;
  displayName: string;
  callbackPath: `/${string}`;
  scopes: readonly string[];
};

type SelfHostedGoogleUser = {
  userId: string;
  userEmail: string;
};

export const GSC_INTEGRATION: SelfHostedGoogleOAuthIntegration = {
  providerId: GSC_OAUTH_PROVIDER_ID,
  // Preserve the state-signing namespace used by the original GSC flow so a
  // deployment does not invalidate an authorization already in progress.
  stateNamespace: "gsc",
  displayName: "Search Console",
  callbackPath: "/api/gsc/oauth/callback",
  scopes: GSC_OAUTH_SCOPES,
};

export const GA4_INTEGRATION: SelfHostedGoogleOAuthIntegration = {
  providerId: GA4_OAUTH_PROVIDER_ID,
  stateNamespace: "ga4",
  displayName: "Google Analytics",
  callbackPath: "/api/ga4/oauth/callback",
  scopes: GA4_OAUTH_SCOPES,
};

const googleTokenResponseSchema = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  token_type: z.string().optional(),
});

const googleIdTokenSchema = z.object({ sub: z.string().min(1) });
type GoogleTokenResponse = z.infer<typeof googleTokenResponseSchema>;

/*
 * Send the operator back into the app carrying the reason.
 *
 * `google_link_error` is the marker `googleLinkError.ts` reads at module
 * init, and `error` is the code `googleAuthErrorCopy` turns into a Turkish
 * sentence. Nothing on the server ever set either one, so the whole alert
 * path was unreachable: declining at Google's consent screen redirected back
 * with `?error=access_denied`, which this file answered by dropping the
 * parameter and returning the operator to the integrations page as though
 * nothing had happened.
 *
 * `fallbackPath` is used when the state did not verify, because then there
 * is no `callbackPath` to trust. `/` bounces to the default project, and the
 * capture runs before the router does, so the alert survives that hop.
 */
function redirectWithLinkError(
  integration: SelfHostedGoogleOAuthIntegration,
  code: string,
  callbackPath = "/",
): Response {
  const target = new URL(callbackPath, "http://placeholder.invalid");
  target.searchParams.set("google_link_error", integration.stateNamespace);
  target.searchParams.set("error", code);
  return new Response(null, {
    status: 303,
    headers: { Location: `${target.pathname}${target.search}` },
  });
}

function getRedirectUri(
  publicOrigin: string,
  integration: SelfHostedGoogleOAuthIntegration,
) {
  return `${publicOrigin}${integration.callbackPath}`;
}

function getGoogleAccountId(tokens: GoogleTokenResponse) {
  if (!tokens.id_token) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Google did not return an ID token.",
    );
  }
  return googleIdTokenSchema.parse(decodeJwt(tokens.id_token)).sub;
}

async function upsertGrant(input: {
  integration: SelfHostedGoogleOAuthIntegration;
  user: SelfHostedGoogleUser;
  tokens: GoogleTokenResponse;
}) {
  const ctx = await getAuth().$context;
  const encrypt = (value: string) =>
    ctx.options.account?.encryptOAuthTokens
      ? symmetricEncrypt({ key: ctx.secretConfig, data: value })
      : value;
  const googleAccountId = getGoogleAccountId(input.tokens);
  const existing = await db
    .select({ id: account.id, refreshToken: account.refreshToken })
    .from(account)
    .where(
      and(
        eq(account.userId, input.user.userId),
        eq(account.providerId, input.integration.providerId),
        eq(account.accountId, googleAccountId),
      ),
    )
    .limit(1);
  const accountValues = {
    accountId: googleAccountId,
    providerId: input.integration.providerId,
    userId: input.user.userId,
    accessToken: await encrypt(input.tokens.access_token),
    refreshToken: input.tokens.refresh_token
      ? await encrypt(input.tokens.refresh_token)
      : (existing[0]?.refreshToken ?? null),
    idToken: input.tokens.id_token
      ? await encrypt(input.tokens.id_token)
      : null,
    accessTokenExpiresAt: new Date(
      Date.now() + (input.tokens.expires_in ?? 3600) * 1_000,
    ),
    refreshTokenExpiresAt: null,
    scope: input.tokens.scope
      ? input.tokens.scope.trim().split(/\s+/).join(",")
      : input.integration.scopes.join(","),
    password: null,
  };
  if (existing[0]) {
    await db
      .update(account)
      .set({ ...accountValues, updatedAt: new Date() })
      .where(eq(account.id, existing[0].id));
    return;
  }
  await db.insert(account).values({
    id: crypto.randomUUID(),
    ...accountValues,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

async function exchangeCode(input: {
  integration: SelfHostedGoogleOAuthIntegration;
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: input.code,
      client_id: input.clientId,
      client_secret: input.clientSecret,
      redirect_uri: input.redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!response.ok) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Google rejected the ${input.integration.displayName} authorization code.`,
    );
  }
  return googleTokenResponseSchema.parse(await response.json());
}

export async function createSelfHostedGoogleAuthorizationUrl(input: {
  integration: SelfHostedGoogleOAuthIntegration;
  user: SelfHostedGoogleUser;
  callbackURL: string;
  publicOrigin: string;
}) {
  const config = await getGoogleOAuthClientConfig();
  if (!config || !(await hasSelfHostedGoogleOAuthConfig(config))) {
    throw new AppError(
      "AUTH_CONFIG_MISSING",
      `${input.integration.displayName} is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and BETTER_AUTH_SECRET.`,
    );
  }
  const redirectUri = getRedirectUri(input.publicOrigin, input.integration);
  const state = await createOAuthState({
    stateNamespace: input.integration.stateNamespace,
    clientSecret: config.clientSecret,
    userId: input.user.userId,
    callbackURL: input.callbackURL,
    publicOrigin: input.publicOrigin,
  });
  const url = new URL(GOOGLE_AUTH_URL);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", input.integration.scopes.join(" "));
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "select_account consent");
  url.searchParams.set("state", state);
  return url.toString();
}

export async function handleSelfHostedGoogleOAuthCallback(input: {
  integration: SelfHostedGoogleOAuthIntegration;
  request: Request;
  user: SelfHostedGoogleUser;
  publicOrigin: string;
}) {
  const config = await getGoogleOAuthClientConfig();
  if (!config) {
    return new Response(
      `Missing ${input.integration.displayName} OAuth configuration`,
      { status: 500 },
    );
  }
  const url = new URL(input.request.url);
  const stateParam = url.searchParams.get("state");
  if (!stateParam) {
    return redirectWithLinkError(input.integration, "state_mismatch");
  }
  let state: OAuthState;
  try {
    state = await verifyOAuthState({
      state: stateParam,
      clientSecret: config.clientSecret,
      stateNamespace: input.integration.stateNamespace,
      displayName: input.integration.displayName,
    });
  } catch {
    // Ten minutes is not long when the other tab is Google Cloud Console, so
    // this is the ordinary way a first connection fails. It used to end on an
    // unstyled English sentence with nothing to click.
    return redirectWithLinkError(input.integration, "state_mismatch");
  }
  if (state.userId !== input.user.userId) {
    return new Response(
      `${input.integration.displayName} OAuth user mismatch`,
      {
        status: 403,
      },
    );
  }
  const redirectToCallback = () =>
    new Response(null, {
      status: 303,
      headers: { Location: state.callbackPath },
    });
  const googleError = url.searchParams.get("error");
  if (googleError) {
    return redirectWithLinkError(
      input.integration,
      googleError,
      state.callbackPath,
    );
  }
  const code = url.searchParams.get("code");
  if (!code) {
    return redirectWithLinkError(
      input.integration,
      "unknown",
      state.callbackPath,
    );
  }
  const tokens = await exchangeCode({
    integration: input.integration,
    code,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: getRedirectUri(input.publicOrigin, input.integration),
  });
  await upsertGrant({
    integration: input.integration,
    user: input.user,
    tokens,
  });
  return redirectToCallback();
}

export async function handleSelfHostedGoogleOAuthCallbackRequest(
  request: Request,
  integration: SelfHostedGoogleOAuthIntegration,
) {
  try {
    const authMode = getAuthMode(env.AUTH_MODE);
    const context =
      authMode === "local_noauth"
        ? await resolveLocalNoAuthContext()
        : await resolveCloudflareAccessContext(request.headers);
    return await handleSelfHostedGoogleOAuthCallback({
      integration,
      request,
      user: {
        userId: context.userId,
        userEmail: context.userEmail,
      },
      publicOrigin: getPublicOrigin(request),
    });
  } catch (error) {
    /*
     * A failure past state verification - the token exchange, or storing the
     * grant - is a server fault rather than something the operator did. It
     * still belongs in the app: a bare 400 in an empty tab gives them nothing
     * to click, and the generic branch of `googleAuthErrorCopy` says to try
     * again and where to look if it keeps failing. The detail stays in the
     * container log, which is where it is useful.
     */
    void captureServerError(error, {
      scope: "selfHostedGoogleOAuth",
      integration: integration.stateNamespace,
    });
    return redirectWithLinkError(integration, "unknown");
  }
}
