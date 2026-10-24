import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Modal } from "@/client/components/Modal";
import { fillParts } from "@/client/features/settings/fillParts";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import type { SavedKeywordRow } from "@/types/keywords";
import { t } from "@/shared/i18n";

export function RemoveSavedKeywordsError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-box border border-error/30 bg-error/10 p-3 text-sm text-[var(--ink-error)]">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/**
 * What the delete modal confirms: the bulk selection, or one row's own
 * "Kelimeyi sil" -- which used to delete on click while the bulk path asked.
 */
export type RemovalTarget = "selection" | SavedKeywordRow;

export function DeleteSavedKeywordsModal({
  target,
  selectedIds,
  removal,
  onClose,
}: {
  target: RemovalTarget;
  selectedIds: string[];
  removal: {
    isPending: boolean;
    error: Error | null;
    mutate: (ids: string[]) => void;
    reset: () => void;
  };
  onClose: () => void;
}) {
  const { isPending, error, reset } = removal;
  // A failure is said here, where the operator is looking; the page's banner
  // sat behind the modal. A reopened modal starts without the old one.
  useEffect(() => reset(), [reset]);
  const keyword = target === "selection" ? undefined : target.keyword;
  const ids = target === "selection" ? selectedIds : [target.id];
  const selectedCount = ids.length;
  return (
    <Modal onClose={onClose} labelledBy="delete-keywords-title">
      <h3 id="delete-keywords-title" className="text-lg font-semibold">
        {keyword ? t("Kelime silinsin mi?") : t("Kelimeler silinsin mi?")}
      </h3>
      <p className="text-sm text-muted">
        {keyword
          ? fillParts(
              t(
                "{keyword} kalıcı olarak silinir. İsterseniz Arama performansından yeniden kaydedebilirsiniz.",
              ),
              {
                keyword: (
                  <strong className="break-words font-medium text-base-content">
                    &ldquo;{keyword}&rdquo;
                  </strong>
                ),
              },
            )
          : t(
              "Kayıtlı {count} kelime kalıcı olarak silinecek. Bu geri alınamaz.",
              { count: selectedCount },
            )}
      </p>
      {error ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          {getStandardErrorMessage(
            error,
            t("Kelimeler silinemedi. Tekrar deneyin."),
          )}
        </p>
      ) : null}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onClose}
        >
          {t("Vazgeç")}
        </button>
        <button
          type="button"
          className="btn btn-error btn-sm gap-1"
          onClick={() => removal.mutate(ids)}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="size-3 animate-spin" /> : null}
          {keyword
            ? t("Kelimeyi sil")
            : t("{count} kelimeyi sil", { count: selectedCount })}
        </button>
      </div>
    </Modal>
  );
}
