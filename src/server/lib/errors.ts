import { isErrorCode, type ErrorCode } from "@/shared/error-codes";
import {
  Ga4AdminApiError,
  Ga4DataApiError,
  Ga4MalformedResponseError,
  Ga4ReportError,
  Ga4TokenError,
} from "@/server/lib/ga4Errors";
import { GscApiError, GscTokenError } from "@/server/lib/gscErrors";
import { UpstreamNetworkError } from "@/server/lib/fetchRetry";
import { t } from "@/shared/i18n";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message ?? code);
    this.name = "AppError";
  }
}

export function asAppError(error: unknown): AppError | null {
  if (error instanceof AppError) return error;
  if (error instanceof Error && isErrorCode(error.message)) {
    return new AppError(error.message, error.message);
  }
  return null;
}

/**
 * A failure that came from Google, not from this app.
 *
 * These used to reach the client as a bare INTERNAL_ERROR, so a Google-side
 * failure told the operator the app itself was unreachable. They now cross as
 * UPSTREAM_UNAVAILABLE (or RATE_LIMITED for an exhausted quota) with a
 * sentence that says what Google answered and what to do about it: a lost
 * connection, a missing permission, a removed property and an exhausted quota
 * each need a different action, and one generic "try again" hid which.
 */
export function googleAppError(error: unknown): AppError | null {
  if (error instanceof UpstreamNetworkError) {
    return new AppError("UPSTREAM_UNAVAILABLE", unreachableCopy(error.reason));
  }
  if (error instanceof Ga4ReportError) {
    if (error.code === "validation_error") return null;
    const copy = ga4ReportCopy(error);
    return new AppError(
      error.code === "ga4_quota_exhausted"
        ? "RATE_LIMITED"
        : "UPSTREAM_UNAVAILABLE",
      copy,
    );
  }
  if (error instanceof GscApiError) {
    return new AppError(
      error.status === 429 ? "RATE_LIMITED" : "UPSTREAM_UNAVAILABLE",
      gscStatusCopy(error.status),
    );
  }
  if (
    (error instanceof Ga4DataApiError || error instanceof Ga4AdminApiError) &&
    error.status === 429
  ) {
    return new AppError("RATE_LIMITED", ga4StatusCopy(429, null));
  }
  if (error instanceof Ga4DataApiError || error instanceof Ga4AdminApiError) {
    return new AppError(
      "UPSTREAM_UNAVAILABLE",
      error.status === 0
        ? unreachableCopy(error.message.replace(/^.*?reached: /, ""))
        : ga4StatusCopy(
            error.status,
            error instanceof Ga4DataApiError ? error.upstreamReason : null,
          ),
    );
  }
  if (error instanceof GscTokenError || error instanceof Ga4TokenError) {
    // Already a translated, hand-written sentence (gscClient/ga4Client).
    return new AppError("UPSTREAM_UNAVAILABLE", error.message);
  }
  if (error instanceof Ga4MalformedResponseError) {
    return new AppError(
      "UPSTREAM_UNAVAILABLE",
      t(
        "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.",
      ),
    );
  }
  return null;
}

function unreachableCopy(reason: string): string {
  return t(
    "Google'a bağlanılamadı, birazdan tekrar deneyin. Neden: {reason}. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.",
    { reason: reason || t("bilinmiyor") },
  );
}

function gscStatusCopy(status: number): string {
  if (status === 400) {
    return t(
      "Search Console isteği geçersiz buldu (HTTP 400). Bu bir bağlantı sorunu değil; seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor.",
    );
  }
  if (status === 401 || status === 403) {
    return t(
      "Search Console bu mülke erişimi reddetti (HTTP {status}). Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da Ayarlar'dan bağlantıyı yenileyin.",
      { status: String(status) },
    );
  }
  if (status === 404) {
    return t(
      "Search Console mülkü bulunamadı (HTTP 404). Mülk Search Console'dan kaldırılmış olabilir; Ayarlar'dan yeniden seçin.",
    );
  }
  if (status === 429) {
    return t(
      "Search Console istek sınırı doldu (HTTP 429). Birkaç dakika sonra tekrar deneyin.",
    );
  }
  if (status === 504) {
    return t(
      "Search Console zamanında yanıt vermedi. Birazdan tekrar deneyin.",
    );
  }
  return t(
    "Search Console geçici olarak yanıt vermiyor (HTTP {status}). Birazdan tekrar deneyin; sürerse Google'ın durum sayfasına bakın.",
    { status: String(status) },
  );
}

function ga4StatusCopy(status: number, reason: string | null): string {
  if (status === 403 && reason === "SERVICE_DISABLED") {
    return t(
      'Google Analytics Data API bu Google Cloud projesinde kapalı. Google Cloud Console\'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.',
    );
  }
  if (status === 400) {
    return t(
      "Bu rapor seçili Google Analytics mülküyle uyumlu değil (HTTP 400).",
    );
  }
  if (status === 401) {
    return t(
      "Google Analytics bağlantısının süresi dolmuş ya da iptal edilmiş. Ayarlar'dan yeniden bağlayın.",
    );
  }
  if (status === 403) {
    return t(
      "Google Analytics bu mülke erişimi reddetti (HTTP 403). Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyen yetkisi verin.",
    );
  }
  if (status === 404) {
    return t(
      "Google Analytics mülkü bulunamadı (HTTP 404). Mülk silinmiş ya da taşınmış olabilir; Ayarlar'dan yeniden seçin.",
    );
  }
  if (status === 429) {
    return t(
      "Google Analytics raporlama kotası doldu (HTTP 429). Kota saatlik ve günlük yenilenir; daha sonra tekrar deneyin.",
    );
  }
  return t(
    "Google Analytics geçici olarak yanıt vermiyor (HTTP {status}{reason}). Birazdan tekrar deneyin.",
    { status: String(status), reason: reason ? `, ${reason}` : "" },
  );
}

function ga4ReportCopy(error: Ga4ReportError): string {
  if (error.code === "ga4_not_connected") {
    return t(
      "Bu projeye bağlı bir Google Analytics mülkü yok. Ayarlar'dan bir mülk seçin.",
    );
  }
  if (error.code === "ga4_malformed_response") {
    return t(
      "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.",
    );
  }
  if (error.code === "ga4_upstream_unreachable") {
    return unreachableCopy(error.message.replace(/^.*?reached: /, ""));
  }
  if (error.upstream) {
    return ga4StatusCopy(error.upstream.status, error.upstream.reason);
  }
  if (error.code === "ga4_reconnect_required") return ga4StatusCopy(401, null);
  if (error.code === "ga4_property_inaccessible") {
    return ga4StatusCopy(404, null);
  }
  if (error.code === "ga4_report_incompatible") return ga4StatusCopy(400, null);
  if (error.code === "ga4_quota_exhausted") return ga4StatusCopy(429, null);
  return t(
    "Google Analytics geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.",
  );
}

// Drizzle wraps every driver failure in a DrizzleQueryError whose message is
// "Failed query: <sql>" and keeps the driver's own message on `cause`, so the
// UNIQUE text has to be looked for on both.
export function isUniqueConstraintError(error: unknown): boolean {
  return [error, error instanceof Error ? error.cause : null].some(
    (candidate) =>
      candidate instanceof Error &&
      candidate.message.includes("UNIQUE constraint failed"),
  );
}

// Codes whose server-side message is safe and useful to show the user.
// Setup errors carry static guidance ("TEAM_DOMAIN must be a full https URL…")
// that self-hosters need to fix their deployment. CONFLICT and VALIDATION_ERROR
// are only ever thrown with hand-written sentences that tell the user what to
// change (invalid domain, reserved project name, report limits); never pass a
// caught SQL/driver error message into either code. Everything else stays
// stripped to its bare code.
const CLIENT_DETAIL_ERROR_CODES = new Set<ErrorCode>([
  "AUTH_CONFIG_MISSING",
  "CONFLICT",
  "VALIDATION_ERROR",
  // Only ever given the hand-written cause-and-fix sentences built by
  // googleAppError above; a bare code still falls back to the generic copy.
  "RATE_LIMITED",
  "UPSTREAM_UNAVAILABLE",
]);

export function toClientError(error: unknown): Error {
  const appError = asAppError(error);
  if (
    appError &&
    CLIENT_DETAIL_ERROR_CODES.has(appError.code) &&
    appError.message !== appError.code
  ) {
    return new Error(`${appError.code}: ${appError.message}`);
  }
  return new Error(appError?.code ?? "INTERNAL_ERROR");
}
