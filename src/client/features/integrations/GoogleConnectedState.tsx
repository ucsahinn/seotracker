import { Loader2 } from "lucide-react";
import { useState } from "react";

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
}: {
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
  const [confirming, setConfirming] = useState(false);
  /* Search Console's own spelling of a domain property is "sc-domain:host",
     which reads as a typo to anyone who did not pick it from a list. */
  const domainProperty = property.startsWith("sc-domain:")
    ? property.slice("sc-domain:".length)
    : null;

  return (
    <div className="space-y-4">
      <div className="min-w-0">
        <p className="break-words text-sm font-semibold">
          {domainProperty ?? (property || detail)}
        </p>
        {domainProperty ? (
          <p className="mt-1 text-xs text-muted">
            Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini
            kapsar.
          </p>
        ) : null}
        {detail ? (
          <p className="mt-1 text-xs text-muted">
            ID {detail.replace(/^properties\//, "")}
          </p>
        ) : null}
        {email ? (
          <p className="mt-1 break-all text-sm text-muted">{email}</p>
        ) : null}
      </div>
      {canManage || canManageAccounts ? (
        <fieldset
          disabled={disconnecting || disabled}
          className="flex flex-wrap items-center gap-1"
        >
          <button
            type="button"
            className="btn btn-outline btn-sm border-base-300"
            onClick={onChange}
          >
            {canManage
              ? "Mülkü veya hesabı değiştir"
              : "Google hesaplarını yönet"}
          </button>
          {canManage && !confirming ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-[var(--ink-error)] hover:bg-error/10"
              onClick={() => setConfirming(true)}
            >
              Bağlantıyı kes
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
            Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır.
            Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.
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
              {disconnecting ? "Bağlantı kesiliyor…" : "Bağlantıyı kes"}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={disconnecting}
              // The button that opened this just unmounted; focus lands on
              // the safe choice rather than falling back to <body>.
              autoFocus
              onClick={() => setConfirming(false)}
            >
              Vazgeç
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
