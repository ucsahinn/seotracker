import { t } from "@/shared/i18n";

export function GooglePropertyRecovery({
  reason,
  onRetry,
}: {
  reason?: string | null;
  onRetry: () => void;
}) {
  const needsSetup =
    reason === "permission_denied" ||
    reason === "api_disabled" ||
    reason === "invalid_grant";
  return (
    <div className="flex flex-wrap items-center gap-3">
      {needsSetup ? (
        <a
          href="/settings#google"
          className="link inline-flex min-h-11 items-center"
        >
          {t("Kurulumun Google kimlik ayarları")}
        </a>
      ) : (
        <button
          type="button"
          className="btn btn-ghost min-h-11 btn-xs"
          onClick={onRetry}
        >
          {t("Tekrar dene")}
        </button>
      )}
      <a href="/help" className="link inline-flex min-h-11 items-center">
        {t("Yardım")}
      </a>
    </div>
  );
}
