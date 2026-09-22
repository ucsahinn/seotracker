/**
 * Plain-language copy for Google OAuth failures, shared by the connect-surface
 * inline alert (GoogleLinkErrorAlert) and the /auth-error fallback page.
 * `code` is the `error` query param Better Auth appends on its error
 * redirects.
 *
 * `providerLabel` ("Search Console" / "Google Analytics") is set when the
 * failure came from a connect flow; without it the copy reads as a Google
 * sign-in failure.
 */
export function googleAuthErrorCopy(
  code: string,
  providerLabel?: string,
): { title: string; description: string } {
  const what = providerLabel ? `${providerLabel} bağlantısı` : "Google girişi";

  switch (code) {
    case "state_mismatch":
      return {
        title: `${what} tamamlanmadı`,
        description:
          "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.",
      };
    case "access_denied":
      return {
        title: `${what} iptal edildi`,
        description:
          "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.",
      };
    case "account_already_linked_to_different_user":
      return {
        title: "Google hesabı zaten bağlı",
        description: providerLabel
          ? `Bu Google hesabı başka bir kayıtta bağlı görünüyor. ${providerLabel} mülk seçicisini açıp hesabın yanındaki Hesabı kaldır ile çözün, sonra buradan yeniden bağlayın.`
          : "Bu Google hesabı başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.",
      };
    default:
      return {
        title: `${what} tamamlanmadı`,
        description:
          "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin; sürerse konteyner günlüğünde hatanın ayrıntısı olacaktır.",
      };
  }
}
