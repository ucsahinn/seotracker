import { hostnameOf } from "@/server/lib/host-guard";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || null;
}

function getForwardedProtocol(request: Request) {
  const protocol = firstHeaderValue(request.headers.get("x-forwarded-proto"));
  return protocol === "http" || protocol === "https" ? protocol : null;
}

/**
 * `publicHosts` has no default on purpose: X-Forwarded-Host is a proxy's to
 * set, and a caller that forgets to decide would let any client choose the
 * origin an OAuth redirect or an MCP base URL is built from. It lists the
 * names the operator configured (ALLOWED_HOST, the BETTER_AUTH_URL host); a
 * forwarded host is believed only when it is one of them, and an empty list
 * means there is no proxy.
 */
export function getPublicOrigin(
  request: Request,
  publicHosts: readonly (string | undefined)[],
) {
  const url = new URL(request.url);
  if (url.protocol === "https:") {
    return url.origin;
  }

  const protocol = getForwardedProtocol(request);
  const host = firstHeaderValue(request.headers.get("x-forwarded-host"));

  const hostname = hostnameOf(host);
  const configured = publicHosts.some(
    (name) => name && hostnameOf(name) === hostname,
  );
  if (!protocol || !hostname || !configured) {
    return url.origin;
  }

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return url.origin;
  }
}

/**
 * The names a proxy may forward. A public name is configured exactly when a
 * proxy or tunnel is in front, so without ALLOWED_HOST the list is empty.
 */
export function publicHostsOf(
  allowedHost: string | undefined,
  authUrl: string | undefined,
) {
  return allowedHost ? [allowedHost, authUrl] : [];
}

export async function getConfiguredPublicOrigin(request: Request) {
  const [allowedHost, authUrl] = await Promise.all([
    getOptionalEnvValue("ALLOWED_HOST"),
    getOptionalEnvValue("BETTER_AUTH_URL"),
  ]);
  return getPublicOrigin(request, publicHostsOf(allowedHost, authUrl));
}

export function requestWithPublicOrigin(
  request: Request,
  publicHosts: readonly (string | undefined)[],
) {
  const url = new URL(request.url);
  const publicOrigin = getPublicOrigin(request, publicHosts);

  if (url.origin === publicOrigin) {
    return request;
  }

  const publicUrl = new URL(
    `${url.pathname}${url.search}${url.hash}`,
    publicOrigin,
  );
  return new Request(publicUrl, request);
}
