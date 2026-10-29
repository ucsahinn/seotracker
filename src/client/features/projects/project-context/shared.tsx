import { formatDateTime } from "@/client/lib/format";
import { FactStrip } from "@/client/components/FactStrip";
import { useRef, useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { updateProjectContext } from "@/serverFunctions/projectContext";
import type { getProjectContext } from "@/serverFunctions/projectContext";
import type {
  ContextAuthor,
  ProjectContextUpdate,
} from "@/types/schemas/projectContext";
import { projectSetupOptions } from "../projectSetupQuery";
import { t } from "@/shared/i18n";

export type ProjectContextData = Awaited<ReturnType<typeof getProjectContext>>;
export type ContextCompetitor = ProjectContextData["competitors"][number];
export type ContextKeyPage = ProjectContextData["keyPages"][number];

export function projectContextQueryKey(projectId: string) {
  return ["projectContext", projectId];
}

function contextSaveMessage(error: unknown, fallback: string) {
  return error instanceof Error &&
    error.message.includes("context_edit_conflict")
    ? t(
        "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.",
      )
    : getStandardErrorMessage(error, fallback);
}

/**
 * Every edit on this page is a patch op against the same endpoint, so all of
 * them share one mutation. The server function returns the context as it
 * stands after the patch, which becomes the new cache entry — no refetch.
 */
export function useContextUpdate(projectId: string) {
  const queryClient = useQueryClient();
  const queryKey = projectContextQueryKey(projectId);

  return useMutation({
    mutationFn: (updates: ProjectContextUpdate[]) =>
      updateProjectContext({ data: { projectId, updates } }),
    // An in-flight refetch would overwrite the fresher setQueryData below
    // with its pre-mutation snapshot.
    onMutate: () => queryClient.cancelQueries({ queryKey }),
    onSuccess: (context) => {
      queryClient.setQueryData(queryKey, context);
      toast.success(t("Proje bilgisi güncellendi"));
    },
    onError: (error) =>
      toast.error(
        contextSaveMessage(error, t("Değişiklikleriniz kaydedilemedi")),
      ),
    // The page instantiates this mutation per section, so two concurrent
    // patches can settle out of order and the slower (earlier-snapshotted)
    // response can land in the cache last; a settle-time refetch converges
    // the page back onto the server's state.
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({
          queryKey: projectSetupOptions(projectId).queryKey,
        }),
      ]),
  });
}

// Turkish source text, translated where it renders.
const AUTHOR_LABELS: Record<ContextAuthor, string> = {
  user: "siz",
  // A legacy value: the in-app agent is gone, but old rows still carry it.
  sam: "ajan",
  mcp: "yapay zeka istemciniz",
};

function provenanceText(by: ContextAuthor, at?: string) {
  return at
    ? t("{author} güncelledi · {time}", {
        author: t(AUTHOR_LABELS[by]),
        time: formatDateTime(at),
      })
    : t("{author} ekledi", { author: t(AUTHOR_LABELS[by]) });
}

/** Who last wrote this and when, as a labelled fact (no disclosure). */
export function ProvenanceFacts({
  by,
  at,
}: {
  by: ContextAuthor;
  at?: string;
}) {
  return (
    <FactStrip
      label={t("Kaynak")}
      facts={[{ label: t("Kaynak"), value: provenanceText(by, at) }]}
    />
  );
}

export function Provenance({ by, at }: { by: ContextAuthor; at?: string }) {
  return (
    <details className="text-xs text-subtle">
      <summary className="cursor-pointer py-1">{t("Kaynak")}</summary>
      <ProvenanceFacts by={by} at={at} />
    </details>
  );
}

export function SectionHeader({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-0.5">
        <h2 className="text-base font-semibold">{title}</h2>
        {hint ? <p className="max-w-prose text-sm text-muted">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

/**
 * A one-line note under a sub-list that has nothing in it yet.
 *
 * Deliberately not `components/EmptyState`, and renamed away from that
 * name because sharing it was the problem: a caller importing `EmptyState`
 * here believed it was reaching the house component, and got the dashed
 * grey box that component's own docblock says it replaced. This is the
 * smaller thing -- no icon, no title, no action -- for a list inside a
 * section that already has all three.
 */
export function EmptyListNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-box border border-dashed border-[var(--hairline-strong)] px-4 py-3 text-sm text-muted">
      {children}
    </p>
  );
}

export const listClass =
  "divide-y divide-[var(--hairline)] overflow-hidden rounded-box border border-[var(--hairline)]";

/** Row actions and footer buttons shared by the inline competitor/page forms. */
export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex shrink-0 items-center gap-1">{children}</div>;
}

/**
 * Two-step delete: the trash icon swaps to an explicit Remove/Cancel pair, so
 * a stray click can't destroy anything and no native confirm dialog is needed.
 */
export function ConfirmDeleteButton({
  label,
  pending,
  onConfirm,
}: {
  label: string;
  pending: boolean;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnSection = useRef<HTMLElement | null>(null);

  if (confirming) {
    return (
      <>
        <button
          type="button"
          className="btn btn-error btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
          disabled={pending}
          onClick={() => {
            setConfirming(false);
            const section = returnSection.current;
            if (section) {
              section.tabIndex = -1;
              section.focus();
            }
            onConfirm();
          }}
        >
          {t("Kaldır")}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
          onClick={() => {
            setConfirming(false);
            requestAnimationFrame(() => trigger.current?.focus());
          }}
        >
          {t("Vazgeç")}
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8 text-[var(--ink-error)]"
      ref={trigger}
      aria-label={label}
      disabled={pending}
      onClick={() => {
        returnSection.current = trigger.current?.closest("section") ?? null;
        setConfirming(true);
      }}
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}

export function FormActions({
  pending,
  disabled,
  onCancel,
}: {
  pending: boolean;
  disabled: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
        onClick={onCancel}
        disabled={pending}
      >
        {t("Vazgeç")}
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
        disabled={disabled || pending}
      >
        {t("Kaydet")}
      </button>
    </div>
  );
}

/** Keep save failures next to the preserved draft, as well as the toast. */
export function ContextSaveError({ error }: { error: unknown }) {
  return error ? (
    <p role="alert" className="text-sm text-[var(--ink-error)]">
      {contextSaveMessage(
        error,
        t(
          "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.",
        ),
      )}
    </p>
  ) : null;
}
