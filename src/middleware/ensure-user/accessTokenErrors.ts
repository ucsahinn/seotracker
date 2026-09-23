import { errors as joseErrors } from "jose";
import { AppError } from "@/server/lib/errors";

// Maps a jwtVerify failure to the right AppError. Config mistakes (wrong
// POLICY_AUD, TEAM_DOMAIN pointing at the wrong team, unreachable JWKS) must
// surface as AUTH_CONFIG_MISSING with guidance — collapsing them into bare
// UNAUTHENTICATED puts self-hosters in a sign-in loop with no signal anywhere,
// since UNAUTHENTICATED is a non-reportable code. Token-level failures
// (expired, bad signature) stay UNAUTHENTICATED: re-authenticating fixes them.
export function classifyAccessVerificationError(error: unknown): AppError {
  if (error instanceof joseErrors.JWTExpired) {
    return new AppError("UNAUTHENTICATED");
  }

  if (error instanceof joseErrors.JWTClaimValidationFailed) {
    if (error.claim === "aud") {
      return new AppError(
        "AUTH_CONFIG_MISSING",
        "Cloudflare Access belirteci reddedildi: hedef kitle uyuşmuyor. POLICY_AUD, Access uygulamanızın AUD etiketiyle aynı değil — Zero Trust -> Access controls -> Applications -> Configure -> Additional settings yolundan kopyalayın.",
      );
    }
    if (error.claim === "iss") {
      return new AppError(
        "AUTH_CONFIG_MISSING",
        "Cloudflare Access belirteci reddedildi: veren taraf uyuşmuyor. TEAM_DOMAIN, belirteci veren Cloudflare ekibiyle aynı değil — Zero Trust ayarlarındaki ekip alan adınızla karşılaştırın.",
      );
    }
    return new AppError("UNAUTHENTICATED");
  }

  if (
    error instanceof joseErrors.JWKSNoMatchingKey ||
    error instanceof joseErrors.JWKSInvalid ||
    error instanceof joseErrors.JWKSTimeout ||
    // The caller only classifies errors thrown by jwtVerify itself, so a
    // non-jose error can only come from the remote JWKS fetch (TypeError in
    // browsers/node, plain Error like "Network connection lost" in workerd).
    !(error instanceof joseErrors.JOSEError)
  ) {
    return new AppError(
      "AUTH_CONFIG_MISSING",
      "Cloudflare Access belirteci TEAM_DOMAIN'in imza anahtarlarıyla doğrulanamadı. TEAM_DOMAIN'in ekibinizin https://<team>.cloudflareaccess.com adresi olduğundan emin olun.",
    );
  }

  return new AppError("UNAUTHENTICATED");
}
