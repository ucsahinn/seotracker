import { t } from "@/shared/i18n";

/**
 * Plain-language copy for Google OAuth failures, shared by the connect-surface
 * inline alert (GoogleLinkErrorAlert) and the /auth-error fallback page.
 * `code` is the `error` query param Better Auth appends on its error
 * redirects.
 *
 * `providerLabel` ("Search Console" / "Google Analytics") is set when the
 * failure came from a connect flow; without it the copy reads as a Google
 * sign-in failure. Each title is one whole sentence per case, so English can
 * order its words freely.
 */
export function googleAuthErrorCopy(
  code: string,
  providerLabel?: string,
): { title: string; description: string } {
  const notCompleted = providerLabel
    ? t("{provider} bağlantısı tamamlanmadı", { provider: providerLabel })
    : t("Google girişi tamamlanmadı");

  switch (code) {
    case "state_mismatch":
      return {
        title: notCompleted,
        description: t(
          "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.",
        ),
      };
    case "access_denied":
      return {
        title: providerLabel
          ? t("{provider} bağlantısı iptal edildi", { provider: providerLabel })
          : t("Google girişi iptal edildi"),
        description: t(
          "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.",
        ),
      };
    case "account_already_linked_to_different_user":
      return {
        title: t("Google hesabı zaten bağlı"),
        description: providerLabel
          ? t(
              'Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. {provider} mülk seçicisini açıp hesabın yanındaki "Hesabı kaldır"a basın, sonra yeniden bağlayın.',
              { provider: providerLabel },
            )
          : t(
              "Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.",
            ),
      };
    default:
      return {
        title: notCompleted,
        description: t(
          "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin. Sürerse hatanın ayrıntısı Yardım ekranındaki günlüklerde.",
        ),
      };
  }
}
