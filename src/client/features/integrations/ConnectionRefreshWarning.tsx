import { t } from "@/shared/i18n";
/** Background read failures preserve configured identities, but qualify their age. */
export function ConnectionRefreshWarning({
  isError,
  hasCached,
  onRetry,
}: {
  isError: boolean;
  hasCached: boolean;
  onRetry: () => void;
}) {
  if (!isError || !hasCached) return null;
  return (
    <p role="alert" className="mb-3 text-sm text-[var(--ink-warning)]">
      {t(
        "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.",
      )}{" "}
      <button type="button" className="link min-h-11" onClick={onRetry}>
        {t("Tekrar dene")}
      </button>
    </p>
  );
}
