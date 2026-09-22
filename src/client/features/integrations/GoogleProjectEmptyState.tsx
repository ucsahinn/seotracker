import type { ReactNode } from "react";
import { GoogleGlyph } from "@/client/features/gsc/GoogleGlyph";

export function GoogleProjectEmptyState({
  name,
  hasGrant,
  disabled,
  canManage,
  onChoose,
  onLink,
  children,
}: {
  name: string;
  hasGrant: boolean;
  disabled: boolean;
  canManage: boolean;
  onChoose: () => void;
  onLink: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {hasGrant
          ? `Bu projenin bağlantısını tamamlamak için bir ${name} kaynağı seçin.`
          : `Bu projenin verisini görmek için ${name} bağlayın.`}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {canManage || hasGrant ? (
          <button
            type="button"
            onClick={hasGrant ? onChoose : onLink}
            disabled={disabled}
            aria-busy={disabled}
            className="inline-flex items-center gap-2.5 rounded-field border border-base-300 bg-base-100 px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-base-200 disabled:opacity-50"
          >
            {disabled ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              !hasGrant && <GoogleGlyph className="size-[18px]" />
            )}
            {disabled
              ? "Google açılıyor…"
              : canManage
                ? hasGrant
                  ? "Kaynak seç"
                  : "Bağlan"
                : "Google hesaplarını yönet"}
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
}
