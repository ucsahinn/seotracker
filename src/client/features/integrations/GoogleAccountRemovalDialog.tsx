import { useEffect, useId, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  getGoogleAccountRemovalImpact,
  removeGoogleAccount,
} from "@/serverFunctions/googleAccounts";

export function GoogleAccountRemovalDialog({
  provider,
  accountId,
  label,
  onClose,
  onRemoved,
}: {
  provider: "gsc" | "ga4";
  accountId: string;
  label: string;
  onClose: () => void;
  onRemoved: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const queryClient = useQueryClient();
  const impact = useQuery({
    queryKey: ["googleAccountRemovalImpact", provider, accountId],
    queryFn: () =>
      getGoogleAccountRemovalImpact({ data: { provider, accountId } }),
    staleTime: 0,
    gcTime: 0,
  });
  const removal = useMutation({
    mutationFn: () =>
      removeGoogleAccount({ data: { provider, accountId, confirmed: true } }),
    onSuccess: async () => {
      const keys =
        provider === "gsc"
          ? [
              "gscConnection",
              "gscSites",
              "gscGrantStatus",
              "searchPerformance",
              "searchPerformanceTable",
              "dashboardGscReport",
              "dashboardActivation",
            ]
          : [
              "ga4Connection",
              "ga4Properties",
              "dashboardGa4Report",
              "dashboardActivation",
            ];
      await Promise.all(
        keys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
      );
      onRemoved();
    },
  });
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  const name = provider === "gsc" ? "Search Console" : "Google Analytics";
  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      className="modal"
      onCancel={(event) => {
        event.preventDefault();
        if (!removal.isPending) onClose();
      }}
    >
      <div className="modal-box max-w-md space-y-4">
        <h3 id={titleId} className="text-lg font-semibold">
          Remove Google account?
        </h3>
        <p className="break-all text-sm font-medium">{label}</p>
        <p className="text-sm text-base-content/70">
          This removes the account’s {name} connection from seotracker. You can
          reconnect it anytime.
        </p>
        {impact.isPending ? (
          <p role="status" className="text-sm text-muted">
            Checking connected projects…
          </p>
        ) : impact.isError ? (
          <div role="alert" className="text-sm">
            <p className="text-error">Bağlı projeler denetlenemedi.</p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => void impact.refetch()}
            >
              Try again
            </button>
          </div>
        ) : impact.data.projectCount > 0 ? (
          <p className="text-sm font-medium">
            This will also disconnect {name} from {impact.data.projectCount}{" "}
            project{impact.data.projectCount === 1 ? "" : "s"}.
          </p>
        ) : (
          <p className="text-sm text-muted">Hiçbir proje etkilenmeyecek.</p>
        )}
        {removal.isError ? (
          <p role="alert" className="text-sm text-error">
            {getStandardErrorMessage(removal.error)}
          </p>
        ) : null}
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            disabled={removal.isPending}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error btn-sm"
            disabled={
              !impact.isSuccess || impact.isFetching || removal.isPending
            }
            onClick={() => removal.mutate()}
          >
            {removal.isPending ? "Kaldırılıyor…" : "Hesabı kaldır"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
