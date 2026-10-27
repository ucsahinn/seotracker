import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { getGoogleLinkError } from "@/client/features/integrations/googleLinkError";
import { setDashboardStepDismissed } from "@/serverFunctions/dashboard";
import type {
  DashboardActivation,
  DashboardSetupStep,
} from "@/types/schemas/dashboard";
import { getStepStatus, setupSteps } from "./dashboardSteps";
import { DashboardSetupAction } from "./DashboardSetupAction";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";

export function DashboardOnboarding({
  projectId,
  activation,
}: {
  projectId: string;
  activation: DashboardActivation;
  /**
   * Search Console is connected and a first audit exists, which are the two
   * steps "Sıradaki adımlar" leads with. Until then this list stays folded:
   * it repeated the same asks one screen below.
   */
  firstStepsDone?: boolean;
}) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<DashboardSetupStep | null>(() =>
    getGoogleLinkError("gsc") ||
    (typeof window !== "undefined" && window.location.hash === "#connect-gsc")
      ? "gsc"
      : null,
  );
  const [open, setOpen] = useState(selected !== null);
  const dismiss = useMutation({
    mutationFn: ({
      step,
      dismissed,
    }: {
      step: DashboardSetupStep;
      dismissed: boolean;
    }) => setDashboardStepDismissed({ data: { projectId, step, dismissed } }),
    onSuccess: async (_, { step, dismissed }) => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboardActivation", projectId],
      });
      setSelected(dismissed ? null : step);
      captureClientEvent("dashboard:setup_step_defer", { step, dismissed });
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t("Tercihiniz kaydedilemedi. Tekrar deneyin."),
        ),
      ),
  });
  const steps = setupSteps;
  const remaining = steps.filter(
    (step) => getStepStatus(activation, step.id) === "todo",
  );

  const deferred = steps.filter(
    (step) => getStepStatus(activation, step.id) === "skipped",
  );

  if (remaining.length === 0 && deferred.length === 0) return null;

  return (
    <details
      aria-label={t("Kurulum listesi")}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="group/setup overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]"
    >
      <summary className="min-h-11 focus-visible:outline-offset-[-2px] flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold leading-tight">
            {t("Kurulum tercihleri")}
          </h2>
          {/* Describes what is left, not a fixed script: the old copy named
            two steps that were already done and one ("ilk denetimi
            çalıştırın") that is not in `setupSteps` at all. */}
          <span className="mt-0.5 block text-xs text-muted">
            {remaining.length === 1
              ? t("Bir adım kaldı.")
              : t("{count} adım kaldı.", {
                  count: formatCount(remaining.length),
                })}{" "}
            {t("Hepsi isteğe bağlı, istediğiniz zaman dönebilirsiniz.")}
          </span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted transition-transform motion-reduce:transition-none group-open/setup:rotate-90" />
      </summary>
      {remaining.map((item) => {
        const active = selected === item.id;
        const Icon = item.icon;
        return (
          <div key={item.id} className="border-t border-base-300">
            <button
              type="button"
              aria-expanded={active}
              aria-controls={`setup-${item.id}`}
              onClick={() => {
                setSelected(active ? null : item.id);
                if (!active)
                  captureClientEvent("dashboard:next_move_click", {
                    step: item.id,
                  });
              }}
              className={`flex w-full items-center gap-3 px-5 py-3.5 text-left ${active ? "bg-primary/5" : "hover:bg-base-200/50"}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-field bg-base-200">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  {t(item.label)}
                </span>
                <span className="mt-0.5 hidden text-xs text-muted sm:block">
                  {t(item.detail)}
                </span>
              </span>
              <ChevronRight
                className={`size-4 shrink-0 text-muted transition-transform motion-reduce:transition-none ${active ? "rotate-90" : ""}`}
              />
            </button>
            <div id={`setup-${item.id}`} hidden={!active}>
              {active && (
                <div className="space-y-5 px-5 py-5">
                  <DashboardSetupAction
                    step={item.id}
                    projectId={projectId}
                    onComplete={() => setSelected(null)}
                  />
                  <div className="border-t border-base-300 pt-3">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-muted"
                      disabled={dismiss.isPending}
                      onClick={() =>
                        dismiss.mutate({ step: item.id, dismissed: true })
                      }
                    >
                      {item.id === "project"
                        ? t("Tek proje bana yeter")
                        : t("Şimdilik geç")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {deferred.length > 0 && (
        <details className="group border-t border-base-300">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3.5 text-sm text-muted [&::-webkit-details-marker]:hidden">
            <ChevronRight className="size-4 transition-transform motion-reduce:transition-none group-open:rotate-90" />
            {t("{count} adım sonraya bırakıldı", {
              count: formatCount(deferred.length),
            })}
          </summary>
          <ul className="space-y-1 px-5 pb-4">
            {deferred.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-field bg-base-200/40 px-3 py-2"
              >
                <span className="text-sm">{t(item.label)}</span>
                <button
                  type="button"
                  aria-label={t("{step} adımını geri al", {
                    step: t(item.label),
                  })}
                  className="btn btn-ghost btn-sm shrink-0"
                  disabled={dismiss.isPending}
                  onClick={() =>
                    dismiss.mutate({ step: item.id, dismissed: false })
                  }
                >
                  <RotateCcw className="size-3.5" /> {t("Geri al")}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </details>
  );
}
