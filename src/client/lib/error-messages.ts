import { formatNumber } from "@/client/lib/format";
import { MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import { isErrorCode, type ErrorCode } from "@/shared/error-codes";
import { t } from "@/shared/i18n";

// Turkish source text; translated with t() where it is returned.
const STANDARD_MESSAGES: Record<ErrorCode, string> = {
  UNAUTHENTICATED:
    "Oturumunuz doğrulanamadı. Sayfayı yenileyip tekrar deneyin.",
  AUTH_CONFIG_MISSING:
    "Giriş ayarı eksik. Yardım ekranındaki kurulum belgelerine bakın.",
  FORBIDDEN: "Bu işlem için yetkiniz yok.",
  NOT_FOUND: "Kayıt bulunamadı.",
  AUDIT_CAPACITY_REACHED:
    "Şu an çok fazla denetim çalışıyor. Biri bitince yeniden deneyin.",
  AUDIT_PAGE_LIMIT_EXCEEDED: "Bir denetim en çok {max} sayfa tarayabilir.",
  AUDIT_ALREADY_RUNNING:
    "Aynı anda çalışabilecek denetim sayısına ulaştınız. Biri bitene kadar bekleyin ya da çalışan birini silin.",
  VALIDATION_ERROR: "Girdiğiniz bilgileri kontrol edip tekrar deneyin.",
  CRAWL_TARGET_BLOCKED: "Güvenlik nedeniyle bu adres taranamaz.",
  RATE_LIMITED: "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.",
  UPSTREAM_UNAVAILABLE:
    "Google bu isteği yanıtlamadı. Birazdan tekrar deneyin; sürerse Ayarlar'dan Google bağlantısını kontrol edin.",
  CONFLICT: "Bu, zaten var olan bir kayıtla çakışıyor.",
  INTERNAL_ERROR:
    "Bir şeyler ters gitti. Yardım ekranından tanılama paketini indirip sorunu bildirin.",
};

// Setup errors cross the wire as "CODE: detail" (see toClientError) so the
// user sees the server's specific guidance while code-driven UI (error cards,
// redirects) still keys off the code.
function standardMessage(code: ErrorCode): string {
  return t(STANDARD_MESSAGES[code], { max: formatNumber(MAX_AUDIT_PAGES) });
}

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
  fallback: string = standardMessage("INTERNAL_ERROR"),
): string {
  if (!(error instanceof Error)) return fallback;
  if (isErrorCode(error.message)) {
    // A caller's own sentence beats the generic "unexpected error" text (the
    // fallback defaults to that same text), but never replaces a code that
    // has specific copy.
    if (error.message === "INTERNAL_ERROR") return fallback;
    return standardMessage(error.message);
  }
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
