import type { ReactNode } from "react";
import { Spinner } from "@/client/components/Spinner";
import { GoogleGlyph } from "@/client/features/gsc/GoogleGlyph";
import { t } from "@/shared/i18n";

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
          ? t(
              "Bu projenin bağlantısını tamamlamak için bir {name} mülkü seçin.",
              {
                name,
              },
            )
          : t("Bu projenin verisini görmek için {name} bağlayın.", { name })}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {canManage || hasGrant ? (
          <button
            type="button"
            onClick={hasGrant ? onChoose : onLink}
            disabled={disabled}
            aria-busy={disabled}
            className="btn btn-sm min-h-11 gap-2.5"
          >
            {disabled ? (
              <Spinner delay={false} />
            ) : (
              !hasGrant && <GoogleGlyph className="size-[18px]" />
            )}
            {disabled
              ? t("Google açılıyor…")
              : canManage
                ? hasGrant
                  ? t("Mülk seç")
                  : t("Bağlan")
                : t("Google hesaplarını yönet")}
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
}
