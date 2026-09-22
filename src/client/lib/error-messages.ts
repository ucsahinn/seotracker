import { formatNumber } from "@/client/lib/format";
import { MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import { isErrorCode, type ErrorCode } from "@/shared/error-codes";

const STANDARD_MESSAGES: Record<ErrorCode, string> = {
  UNAUTHENTICATED: "Lütfen oturum açıp tekrar deneyin.",
  AUTH_CONFIG_MISSING:
    "Kimlik doğrulama yapılandırılmamış. Kurulum adımları için docs/SELF_HOSTING_DOCKER.md dosyasına bakın.",
  FORBIDDEN: "Bu kaynağa erişiminiz yok.",
  NOT_FOUND: "İstenen kayıt bulunamadı.",
  AUDIT_CAPACITY_REACHED:
    "Denetim kapasitesi doldu. Yeni bir denetim başlatmak için eski denetimleri silin.",
  AUDIT_PAGE_LIMIT_EXCEEDED: `Bir denetim en çok ${formatNumber(MAX_AUDIT_PAGES)} sayfa tarayabilir.`,
  AUDIT_ALREADY_RUNNING:
    "Aynı anda çalışabilecek denetim sayısına ulaştınız. Birinin bitmesini bekleyin ya da silin.",
  VALIDATION_ERROR: "Girdiğiniz bilgileri kontrol edip tekrar deneyin.",
  CRAWL_TARGET_BLOCKED: "Bu adres güvenlik politikası gereği taranamaz.",
  RATE_LIMITED: "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.",
  UPSTREAM_UNAVAILABLE:
    "Veri kaynağı şu an yanıt vermiyor. Birazdan tekrar deneyin.",
  CONFLICT: "Bu istek mevcut kayıtlarla çakışıyor.",
  INTERNAL_ERROR:
    "Beklenmeyen bir hata oluştu. Konteyner günlüğüne bakıp tekrar deneyin.",
};

// Setup errors cross the wire as "CODE: detail" (see toClientError) so the
// user sees the server's specific guidance while code-driven UI (error cards,
// redirects) still keys off the code.
function splitCodedMessage(
  message: string,
): { code: ErrorCode; detail: string } | null {
  const separatorIndex = message.indexOf(": ");
  if (separatorIndex === -1) return null;
  const code = message.slice(0, separatorIndex);
  if (!isErrorCode(code)) return null;
  return { code, detail: message.slice(separatorIndex + 2) };
}

export function getStandardErrorMessage(
  error: unknown,
  fallback: string = STANDARD_MESSAGES.INTERNAL_ERROR,
): string {
  if (!(error instanceof Error)) return fallback;
  if (isErrorCode(error.message)) return STANDARD_MESSAGES[error.message];
  const coded = splitCodedMessage(error.message);
  if (coded) return coded.detail;
  if (error.message) return error.message;
  return fallback;
}

export function getErrorCode(error: unknown): ErrorCode | null {
  if (!(error instanceof Error)) return null;
  if (isErrorCode(error.message)) return error.message;
  return splitCodedMessage(error.message)?.code ?? null;
}
