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
          {canManage ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              onClick={onDisconnect}
            >
              {disconnecting ? "Bağlantı kesiliyor…" : "Bağlantıyı kes"}
            </button>
          ) : null}
        </fieldset>
      ) : null}
    </div>
  );
}
