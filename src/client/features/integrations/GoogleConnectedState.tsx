import { formatDateTime } from "@/client/lib/format";
import { FactStrip } from "@/client/components/FactStrip";
import { googleAuthErrorCopy } from "./googleAuthErrorCopy";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { t } from "@/shared/i18n";

export function GoogleConnectedState({
  property,
  detail,
  email,
  onChange,
  onDisconnect,
  disconnecting,
  canManage,
  canManageAccounts,
  disabled,
  propertyTimeZone,
  propertyCurrencyCode,
  bindingDate,
  usesServiceAccount,
  accessEvidence,
  reportHref,
  reportLabel,
}: {
  reportHref?: string;
  reportLabel?: string;
  accessEvidence?: {
    observedAt: string;
    reason: string | null;
    lastSuccessAt?: string | null;
  } | null;
  propertyTimeZone?: string | null;
  propertyCurrencyCode?: string | null;
  bindingDate?: string | null;
  usesServiceAccount?: boolean;
  property: string;
  detail?: string | null;
  email?: string | null;
  onChange: () => void;
  onDisconnect: () => void;
  disconnecting: boolean;
  canManage: boolean;
  canManageAccounts: boolean;
  disabled: boolean;
}) {
  /*
   * Disconnecting drops every screen built on this property until one is
   * picked again, and it sat one stray click away beside "change". It is
   * undoable, so a second inline click is enough -- not a typed-name modal.
   */
  const changeButton = useRef<HTMLButtonElement>(null);
  const [confirming, setConfirming] = useState(false);
  /* Search Console's own spelling of a domain property is "sc-domain:host",
     which reads as a typo to anyone who did not pick it from a list. */
  const domainProperty = property.startsWith("sc-domain:")
    ? property.slice("sc-domain:".length)
    : null;

  return (
    <div className="space-y-4">
      <FactStrip
        label={t("Bağlantılar")}
        facts={[
          {
            label: t("Mülk"),
            value: (
              <span className="break-all">
                {domainProperty ?? (property || detail)}
              </span>
            ),
          },
          {
            label: t("Durum"),
            tone: accessEvidence?.reason ? "warning" : undefined,
            value: !accessEvidence
              ? t("Veri erişimi henüz doğrulanmadı.")
              : accessEvidence.reason === null
                ? t("Son başarılı Google okuması: {date}", {
                    date: formatDateTime(accessEvidence.observedAt),
                  })
                : t("Son başarısız Google okuması: {date}", {
                    date: formatDateTime(accessEvidence.observedAt),
                  }),
          },
          ...(bindingDate
            ? [{ label: t("Seçildi"), value: formatDateTime(bindingDate) }]
            : []),
          ...(email
            ? [
                {
                  label: t("E-posta"),
                  value: <span className="break-all">{email}</span>,
                },
              ]
            : []),
          ...(detail
            ? [{ label: "ID", value: detail.replace(/^properties\//, "") }]
            : []),
          ...(usesServiceAccount !== undefined
            ? [
                {
                  label: t("Kaynak"),
                  value: usesServiceAccount
                    ? t("Kimlik yöntemi: hizmet hesabı")
                    : t("Kimlik yöntemi: Google OAuth"),
                },
              ]
            : []),
          ...(propertyTimeZone !== undefined
            ? [
                {
                  label: t("Saat dilimi"),
                  value: propertyTimeZone ?? t("Bilinmiyor"),
                },
              ]
            : []),
          ...(propertyCurrencyCode !== undefined
            ? [
                {
                  label: t("Para birimi"),
                  value: propertyCurrencyCode ?? t("Bilinmiyor"),
                },
              ]
            : []),
        ]}
        detailsLabel={t("Bağlantı ayrıntıları")}
        details={
          <>
            {domainProperty ? (
              <p>
                {t(
                  "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar.",
                )}
              </p>
            ) : null}
            <p>
              {t(
                "Bu ekran Google’dan yeni veri istemez. Buradaki okuma bilgisi kayıtlı geçmişe aittir; güncel veriyi raporda görebilirsiniz.",
              )}
            </p>
            {accessEvidence?.reason ? (
              <p>{googleAuthErrorCopy(accessEvidence.reason).description}</p>
            ) : null}
            {accessEvidence?.reason && accessEvidence.lastSuccessAt ? (
              <p>
                {t("Son başarılı Google okuması: {date}", {
                  date: formatDateTime(accessEvidence.lastSuccessAt),
                })}
              </p>
            ) : null}
          </>
        }
      />
      <div className="flex flex-wrap gap-3">
        {reportHref && reportLabel ? (
          <a href={reportHref} className="btn btn-ghost btn-sm min-h-11">
            {reportLabel}
          </a>
        ) : null}
        <a
          href="/settings#google"
          aria-label={t("Kurulumun Google kimlik ayarları")}
          className="btn btn-ghost btn-sm min-h-11 max-w-full h-auto whitespace-normal text-left"
        >
          {t("Ayarlar")}
        </a>
      </div>
      {canManage || canManageAccounts ? (
        <fieldset
          disabled={disconnecting || disabled}
          className="flex flex-wrap items-center gap-1"
        >
          <button
            type="button"
            className="btn btn-outline btn-sm border-base-300"
            ref={changeButton}
            data-google-change
            aria-label={
              canManage
                ? t("Mülkü veya hesabı değiştir")
                : t("Google hesaplarını yönet")
            }
            onClick={onChange}
          >
            {t("Değiştir")}
          </button>
          {canManage && !confirming ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-[var(--ink-error)] hover:bg-error/10"
              onClick={() => setConfirming(true)}
            >
              {t("Bağlantıyı kes")}
            </button>
          ) : null}
        </fieldset>
      ) : null}
      {canManage && confirming ? (
        <div
          role="alert"
          className="space-y-3 rounded-field border border-base-300 p-3 text-sm"
        >
          <p className="text-muted">
            {t(
              "Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır. Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.",
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-error btn-sm gap-1"
              disabled={disconnecting || disabled}
              onClick={onDisconnect}
            >
              {disconnecting ? (
                <Loader2 className="size-3 animate-spin" aria-hidden />
              ) : null}
              {disconnecting ? t("Bağlantı kesiliyor…") : t("Bağlantıyı kes")}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={disconnecting}
              // The button that opened this just unmounted; focus lands on
              // the safe choice rather than falling back to <body>.
              autoFocus
              onClick={() => {
                setConfirming(false);
                changeButton.current?.focus();
              }}
            >
              {t("Vazgeç")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
