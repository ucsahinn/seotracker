import { GoogleAccountRemovalDialog } from "@/client/features/integrations/GoogleAccountRemovalDialog";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Plus, Search } from "lucide-react";

type Selection = { accountId: string; propertyId: string };
type Property = {
  id: string;
  name: string;
  detail?: string;
  selectable: boolean;
};
type Account = {
  accountId: string;
  email: string | null;
  requiresReconnect: boolean;
  unavailable?: boolean;
  unavailableReason?: string | null;
  properties: Property[];
};
type SecondaryAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function accountLabel(account: Account) {
  return account.email ?? `Google hesabı · ${account.accountId.slice(-6)}`;
}

export function GooglePropertyPicker({
  provider,
  readOnly = false,
  loading,
  linking = false,
  error,
  accounts,
  selection,
  onSelect,
  onSave,
  saving,
  onRetry,
  onReconnect,
  secondaryAction,
}: {
  provider: "gsc" | "ga4";
  readOnly?: boolean;
  loading: boolean;
  linking?: boolean;
  error: boolean;
  accounts: Account[];
  selection: Selection | null;
  onSelect: (selection: Selection | null) => void;
  onSave: () => void;
  saving: boolean;
  onRetry: () => void;
  onReconnect: () => void;
  secondaryAction?: SecondaryAction;
}) {
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState<Account | null>(null);
  const [search, setSearch] = useState("");
  const panelId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const selectedAccount = accounts.find(
    (a) => a.accountId === selection?.accountId,
  );
  const selected = selectedAccount?.properties.find(
    (p) => p.id === selection?.propertyId,
  );
  const canSave =
    selected?.selectable &&
    !selectedAccount?.requiresReconnect &&
    !selectedAccount?.unavailable &&
    !loading &&
    !error;
  const query = search.trim().toLowerCase();
  const filtered = accounts
    .map((account) => ({
      ...account,
      properties: account.properties.filter((property) =>
        `${account.email ?? ""} ${property.name} ${property.detail ?? ""} ${property.id}`
          .toLowerCase()
          .includes(query),
      ),
    }))
    .filter(
      (account) =>
        !query ||
        account.properties.length > 0 ||
        accountLabel(account).toLowerCase().includes(query),
    );
  const close = () => {
    setOpen(false);
    setSearch("");
    trigger.current?.focus();
  };
  return (
    <div className="space-y-4">
      {removing ? (
        <GoogleAccountRemovalDialog
          provider={provider}
          accountId={removing.accountId}
          label={accountLabel(removing)}
          onClose={() => setRemoving(null)}
          onRemoved={() => {
            if (selection?.accountId === removing.accountId) onSelect(null);
            setRemoving(null);
          }}
        />
      ) : null}
      <div>
        <p className="mb-2 text-sm font-medium">
          {readOnly ? "Google hesaplarını yönet" : "Kaynak seç"}
        </p>
        <button
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={saving}
          className="flex w-full items-center justify-between gap-3 rounded-field border border-base-300 px-3.5 py-3 text-left text-sm hover:bg-base-200/40 disabled:opacity-50"
          onClick={() => {
            setOpen(!open);
            setSearch("");
          }}
        >
          <span className="min-w-0">
            <span className="block truncate">
              {selected?.name ?? "Bir kaynak seçin…"}
            </span>
            {selectedAccount ? (
              <span className="mt-0.5 block truncate text-xs text-muted">
                {accountLabel(selectedAccount)}
              </span>
            ) : null}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted" />
        </button>
        {open ? (
          <div
            id={panelId}
            role="region"
            aria-label="Google kaynakları"
            className="mt-2 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm"
            onKeyDown={(event) => handlePropertyKeyDown(event, close)}
          >
            <label className="flex items-center gap-2 border-b border-base-300 px-3.5 py-3">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                autoFocus
                type="search"
                aria-label="Kaynak veya hesap ara"
                placeholder="Kaynak veya hesap ara…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="min-w-0 w-full bg-transparent text-sm outline-none"
              />
            </label>
            <div className="max-h-72 overflow-y-auto overscroll-contain p-1.5">
              {loading ? (
                <p
                  role="status"
                  className="flex items-center gap-2 p-3 text-sm text-muted"
                >
                  <span className="loading loading-spinner loading-xs" />
                  Kaynaklar yükleniyor…
                </p>
              ) : error ? (
                <div role="alert" className="p-3 text-sm">
                  <p className="text-error">Kaynaklar yüklenemedi.</p>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm mt-1"
                    onClick={onRetry}
                  >
                    Tekrar dene
                  </button>
                </div>
              ) : (
                <>
                  {filtered.map((account) => (
                    <div
                      key={account.accountId}
                      className="py-1"
                      role="group"
                      aria-label={accountLabel(account)}
                    >
                      <div className="flex items-center justify-between gap-2 px-2 py-2 text-xs font-medium text-muted">
                        <span className="min-w-0 break-all">
                          {accountLabel(account)}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs shrink-0 text-error"
                          disabled={saving}
                          onClick={() => setRemoving(account)}
                          aria-label={`${accountLabel(account)} hesabını kaldır`}
                        >
                          Hesabı kaldır
                        </button>
                      </div>
                      {account.requiresReconnect ? (
                        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2 text-sm">
                          <span className="text-muted">Connection expired</span>
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs"
                            onClick={onReconnect}
                            aria-label={`Reconnect ${accountLabel(account)}`}
                            disabled={linking}
                            aria-busy={linking}
                          >
                            {linking ? "Google açılıyor…" : "Yeniden bağlan"}
                          </button>
                        </div>
                      ) : account.unavailable ? (
                        <div className="space-y-2 px-2 pb-2 text-sm">
                          {/* When the server knows why, it says why: "could
                              not load" with a retry button is useless advice
                              for something retrying will never fix. */}
                          <p className="text-muted">
                            {account.unavailableReason ??
                              "Kaynaklar yüklenemedi."}
                          </p>
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs"
                            onClick={onRetry}
                          >
                            Tekrar dene
                          </button>
                        </div>
                      ) : account.properties.length === 0 ? (
                        /* An account that can see nothing is usually an
                           account with nothing to see: the operator has not
                           created the property yet. Saying "no properties"
                           leaves them looking for a permission problem that
                           is not there. */
                        <p className="px-2 pb-3 text-sm text-muted">
                          {provider === "ga4"
                            ? "Bu hesabın görebildiği bir GA4 mülkü yok. Henüz mülk oluşturmadıysanız analytics.google.com'dan oluşturun, sonra bu hesabı ona Görüntüleyen olarak ekleyin."
                            : "Bu hesabın görebildiği bir Search Console mülkü yok. Mülkü doğruladıysanız bu hesabı search.google.com/search-console adresinden kullanıcı olarak ekleyin."}
                        </p>
                      ) : (
                        account.properties.map((property) => {
                          const chosen =
                            selection?.accountId === account.accountId &&
                            selection?.propertyId === property.id;
                          return (
                            <button
                              key={property.id}
                              data-property
                              type="button"
                              aria-pressed={chosen}
                              disabled={
                                readOnly || !property.selectable || saving
                              }
                              className={`flex w-full items-center justify-between gap-3 rounded-field px-2 py-2.5 text-left text-sm hover:bg-base-200 focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 ${chosen ? "bg-base-200" : ""}`}
                              onClick={() => {
                                onSelect({
                                  accountId: account.accountId,
                                  propertyId: property.id,
                                });
                                close();
                              }}
                            >
                              <span className="min-w-0">
                                <span className="block break-words">
                                  {property.name}
                                </span>
                                {property.detail ? (
                                  <span className="mt-0.5 block text-xs text-muted">
                                    {property.detail}
                                  </span>
                                ) : null}
                                {!property.selectable ? (
                                  <span className="block text-xs">
                                    No verified access
                                  </span>
                                ) : null}
                              </span>
                              {chosen ? (
                                <Check className="size-4 shrink-0" />
                              ) : null}
                            </button>
                          );
                        })
                      )}
                    </div>
                  ))}
                  {filtered.length === 0 ? (
                    <p className="p-3 text-sm text-muted">
                      {query
                        ? "Eşleşen kaynak veya hesap yok"
                        : "Kaynakları bulmak için bir Google hesabı ekleyin."}
                    </p>
                  ) : null}
                </>
              )}
            </div>
            <div className="border-t border-base-300 p-1.5">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-field px-2 py-2.5 text-left text-sm font-medium hover:bg-base-200"
                onClick={onReconnect}
                disabled={saving || linking}
                aria-busy={linking}
              >
                {linking ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Plus className="size-4" />
                )}
                {linking ? "Google açılıyor…" : "Google hesabı ekle"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <button
          hidden={readOnly}
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onSave}
          disabled={!canSave || saving}
        >
          {saving ? "Kaydediliyor…" : "Kaynağı kaydet"}
        </button>
        {secondaryAction ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            disabled={saving || secondaryAction.disabled}
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function handlePropertyKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  close: () => void,
) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
  }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  const buttons = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>(
      "button[data-property]:not(:disabled)",
    ),
  );
  if (!buttons.length) return;
  event.preventDefault();
  const index = buttons.findIndex(
    (button) => button === document.activeElement,
  );
  const nextIndex =
    index < 0
      ? event.key === "ArrowDown"
        ? 0
        : buttons.length - 1
      : (index + (event.key === "ArrowDown" ? 1 : buttons.length - 1)) %
        buttons.length;
  buttons[nextIndex]?.focus();
}
