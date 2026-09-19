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
  return (
    <div className="space-y-4">
      <div className="min-w-0">
        <p className="break-words text-sm font-semibold">
          {property || detail}
        </p>
        {detail ? (
          <p className="mt-1 text-xs text-base-content/50">
            ID {detail.replace(/^properties\//, "")}
          </p>
        ) : null}
        {email ? (
          <p className="mt-1 break-all text-sm text-base-content/60">{email}</p>
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
              ? "Kaynağı veya hesabı değiştir"
              : "Google hesaplarını yönet"}
          </button>
          {canManage ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              onClick={onDisconnect}
            >
              {disconnecting ? "Bağlantı kesiliyor…" : "Projeden ayır"}
            </button>
          ) : null}
        </fieldset>
      ) : null}
    </div>
  );
}
