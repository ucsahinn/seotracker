import { formatDateTime } from "@/shared/format";
import { FactStrip } from "@/client/components/FactStrip";
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
    <FactStrip
      label={t("Kaynak")}
      facts={[
        {
          label: t("Durum"),
          tone: evidence.reason ? "warning" : undefined,
          value:
            evidence.reason === null
              ? t("Son başarılı Google okuması: {date}", {
                  date: formatDateTime(evidence.observedAt),
                })
              : t("Son başarısız Google okuması: {date}", {
                  date: formatDateTime(evidence.observedAt),
                }),
        },
      ]}
      detailsLabel={evidence.reason ? t("Ayrıntılar") : undefined}
      details={
        evidence.reason ? (
          <>
            <p>{googleAuthErrorCopy(evidence.reason).description}</p>
            {evidence.lastSuccessAt ? (
              <p>
                {t("Son başarılı Google okuması: {date}", {
                  date: formatDateTime(evidence.lastSuccessAt),
                })}
              </p>
            ) : null}
          </>
        ) : undefined
      }
    />
  );
}
