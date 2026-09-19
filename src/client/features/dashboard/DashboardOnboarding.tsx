import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { getGoogleLinkError } from "@/client/features/integrations/googleLinkError";
import { setDashboardStepDismissed } from "@/serverFunctions/dashboard";
import type { DashboardActivation } from "@/server/features/dashboard/services/DashboardService";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";
import { getStepStatus, setupSteps } from "./dashboardSteps";
import { DashboardSetupAction } from "./DashboardSetupAction";

export function DashboardOnboarding({
  projectId,
  activation,
}: {
  projectId: string;
  activation: DashboardActivation;
}) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<DashboardSetupStep | null>(() =>
    getGoogleLinkError("gsc") ||
    (typeof window !== "undefined" && window.location.hash === "#connect-gsc")
      ? "gsc"
      : null,
  );
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
          "Couldn’t save your preference. Try again.",
        ),
      ),
  });
  const steps = setupSteps;
  const remaining = steps.filter(
    (step) => getStepStatus(activation, step.id) === "todo",
  );
  const completed = steps.filter(
    (step) => getStepStatus(activation, step.id) === "done",
  );
  const deferred = steps.filter(
    (step) => getStepStatus(activation, step.id) === "skipped",
  );

  if (remaining.length === 0) return null;

  return (
    <section
      aria-label="Onboarding checklist"
      className="overflow-hidden rounded-xl border border-base-300 bg-base-100"
    >
      <header className="border-b border-base-300 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold">Set up your workspace</h2>
        <p className="mt-1 text-sm text-base-content/65">
          Add your website, connect your tools, and invite your team.
        </p>
      </header>
      {remaining.map((item) => {
        const active = selected === item.id;
        const Icon = item.icon;
        return (
          <div key={item.id} className="border-b border-base-300">
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
              className={`flex w-full items-center gap-3 px-5 py-4 text-left sm:px-6 ${active ? "bg-primary/5" : "hover:bg-base-200/50"}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-base-200">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="mt-1 hidden text-xs text-base-content/65 sm:block">
                  {item.detail}
                </span>
              </span>
              {item.id === "domain" && (
                <span className="hidden text-xs text-primary sm:block">
                  Start here
                </span>
              )}
              <ChevronRight
                className={`size-4 shrink-0 text-base-content/60 transition-transform ${active ? "rotate-90" : ""}`}
              />
            </button>
            <div id={`setup-${item.id}`} hidden={!active}>
              {active && (
                <div className="space-y-5 px-5 py-5 sm:px-6">
                  <DashboardSetupAction
                    step={item.id}
                    projectId={projectId}
                    onComplete={() => setSelected(null)}
                  />
                  <div className="border-t border-base-300 pt-3">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-base-content/60"
                      disabled={dismiss.isPending}
                      onClick={() =>
                        dismiss.mutate({ step: item.id, dismissed: true })
                      }
                    >
                      {item.id === "project"
                        ? "I only need one project"
                        : "Skip for now"}
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
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm text-base-content/65 sm:px-6 [&::-webkit-details-marker]:hidden">
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
            {deferred.length} saved for later
          </summary>
          <ul className="space-y-1 px-5 pb-4 sm:px-6">
            {deferred.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-base-200/40 px-3 py-2"
              >
                <span className="text-sm">{item.label}</span>
                <button
                  type="button"
                  aria-label={`Restore ${item.label}`}
                  className="btn btn-ghost btn-sm shrink-0"
                  disabled={dismiss.isPending}
                  onClick={() =>
                    dismiss.mutate({ step: item.id, dismissed: false })
                  }
                >
                  <RotateCcw className="size-3.5" /> Restore
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
      {completed.length > 0 && (
        <details className="group border-t border-base-300">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm sm:px-6 [&::-webkit-details-marker]:hidden">
            <Check className="size-4 text-success" />
            {completed.length} completed
            <ChevronRight className="ml-auto size-4 text-base-content/60 transition-transform group-open:rotate-90" />
          </summary>
          <ul className="space-y-3 px-5 pb-5 sm:px-6">
            {completed.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 text-sm text-base-content/65"
              >
                <Check className="size-4 shrink-0 text-success" />
                {item.label}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
