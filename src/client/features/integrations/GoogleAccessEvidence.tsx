import { formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { googleAuthErrorCopy } from "./googleAuthErrorCopy";

export function GoogleAccessEvidence({
  evidence,
}: {
  evidence?: {
    observedAt: string;
    reason: string | null;
    lastSuccessAt?: string | null;
  } | null;
}) {
  if (!evidence)
    return (
      <p className="text-sm text-muted">
        {t("Veri erişimi henüz doğrulanmadı.")}
      </p>
    );
  return (
    <div className="space-y-1 text-sm text-muted">
      <p>
        {evidence.reason === null
          ? t("Son başarılı Google okuması: {date}", {
              date: formatDateTime(evidence.observedAt),
            })
          : t("Son başarısız Google okuması: {date}", {
              date: formatDateTime(evidence.observedAt),
            })}
      </p>
      {evidence.reason ? (
        <p>{googleAuthErrorCopy(evidence.reason).description}</p>
      ) : null}
      {evidence.reason && evidence.lastSuccessAt ? (
        <p>
          {t("Son başarılı Google okuması: {date}", {
            date: formatDateTime(evidence.lastSuccessAt),
          })}
        </p>
      ) : null}
    </div>
  );
}
