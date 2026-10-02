import { getPageSpeedKeySource } from "@/server/features/lighthouse/pagespeed-config";
import {
  fetchPageSpeedReport,
  PageSpeedError,
} from "@/server/lib/audit/pagespeed";

/** A fixed, tiny, public page: the test never measures anything of the user's. */
const TEST_URL = "https://example.com/";

type PageSpeedKeyTestState =
  | "ok"
  | "no_key"
  | "invalid_key"
  | "restricted"
  | "quota_exhausted"
  | "rate_limited"
  | "network"
  | "error";

type PageSpeedKeyTestResult = {
  ok: boolean;
  state: PageSpeedKeyTestState;
  /** Turkish, fixed text: never built from Google's reply, so it cannot carry the key. */
  message: string;
};

const MESSAGES: Record<PageSpeedKeyTestState, string> = {
  ok: "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.",
  no_key:
    "Kayıtlı bir anahtar yok; test edilecek bir şey yok. Önce anahtarı kaydedin.",
  invalid_key:
    "Google anahtarı geçersiz buldu. Anahtarı Google Cloud Console'dan yeniden kopyalayıp kaydedin.",
  restricted:
    "Anahtar tanınıyor ama PageSpeed Insights için kullanılamıyor: API etkin değil ya da anahtarın kısıtlamaları buna izin vermiyor. Google Cloud Console'da API'yi etkinleştirin ve anahtar kısıtlamasını kontrol edin.",
  quota_exhausted:
    "Anahtar geçerli ama Google'ın günlük kotası dolmuş. Yarın yeniden deneyin ya da Google Cloud Console'dan kotayı kontrol edin.",
  rate_limited:
    "Anahtar geçerli ama Google dakikalık sınıra takıldı. Bir dakika bekleyip yeniden deneyin.",
  network:
    "Google'a ulaşılamadı. İnternet bağlantısını kontrol edip yeniden deneyin; anahtar hakkında bir sonuç alınamadı.",
  error:
    "Google beklenmeyen bir yanıt verdi; anahtar hakkında bir sonuç alınamadı. Birazdan yeniden deneyin.",
};

function result(state: PageSpeedKeyTestState): PageSpeedKeyTestResult {
  return { ok: state === "ok", state, message: MESSAGES[state] };
}

function classify(error: unknown): PageSpeedKeyTestState {
  if (!(error instanceof PageSpeedError)) return "error";
  if (error.quotaExhausted) return "quota_exhausted";
  if (error.rateLimited) return "rate_limited";
  if (error.status === null) return "network";
  // Google words a bad key as 400 "API key not valid" (sometimes 401); a
  // disabled API or a blocked referrer/service is a 403.
  if (error.status === 403) return "restricted";
  if (
    (error.status === 400 || error.status === 401) &&
    /api key not valid|invalid api key|key.*(invalid|expired)/i.test(
      error.message,
    )
  ) {
    return "invalid_key";
  }
  return "error";
}

/**
 * One read-only PageSpeed Insights request (mobile, a fixed tiny page) with
 * the configured key. It spends one PageSpeed request. Nothing is stored, and
 * neither the key nor any Google message is returned.
 */
async function testKey(): Promise<PageSpeedKeyTestResult> {
  if (!(await getPageSpeedKeySource())) return result("no_key");
  try {
    await fetchPageSpeedReport({ url: TEST_URL, strategy: "mobile" });
    return result("ok");
  } catch (error) {
    return result(classify(error));
  }
}

export const PageSpeedKeyTestService = { testKey };
