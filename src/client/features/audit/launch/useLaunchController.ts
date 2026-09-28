import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteAudit,
  getAuditHistory,
  startAudit,
} from "@/serverFunctions/audit";
import { getProjects } from "@/serverFunctions/projects";
import {
  DEFAULT_LAUNCH_FORM_VALUES,
  getMaxPagesLimit,
  MIN_PAGES,
  type LaunchFormValues,
} from "@/client/features/audit/launch/types";
import {
  createFormValidationErrors,
  shouldValidateFieldOnChange,
} from "@/client/lib/forms";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatNumber } from "@/client/lib/format";

function getLaunchValidationErrors(
  value: LaunchFormValues,
  shouldValidateUntouchedField: boolean,
) {
  if (value.url.trim()) {
    return null;
  }

  if (!shouldValidateUntouchedField) {
    return null;
  }

  return createFormValidationErrors({
    fields: {
      url: "Bir URL girin.",
    },
  });
}

export function useLaunchController({
  projectId,
  onAuditStarted,
}: {
  projectId: string;
  onAuditStarted: (auditId: string) => void;
}) {
  const maxPagesLimit = getMaxPagesLimit();
  const historyQuery = useQuery({
    queryKey: ["audit-history", projectId],
    queryFn: () => getAuditHistory({ data: { projectId } }),
    /*
     * A running audit's row sat on "Sürüyor" until a hard reload. The detail
     * view three clicks away polls every 3s; this list, which is where an
     * operator waits after pressing start, did not poll at all.
     */
    refetchInterval: (query) =>
      query.state.data?.some((audit) => audit.status === "running")
        ? 5_000
        : false,
  });
  // Same key the projects screen uses, so this is a cache read in practice.
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const domain =
    projectsQuery.data?.find((entry) => entry.id === projectId)?.domain ?? null;
  const { startMutation, deleteMutation } = useLaunchMutations({
    projectId,
    historyRefetch: historyQuery.refetch,
  });

  const launchForm = useForm({
    defaultValues: DEFAULT_LAUNCH_FORM_VALUES,
    validators: {
      onChange: ({ formApi, value }) =>
        getLaunchValidationErrors(
          value,
          shouldValidateFieldOnChange(formApi, "url"),
        ),
      onSubmit: ({ value }) => getLaunchValidationErrors(value, true),
    },
    onSubmit: async ({ formApi, value }) => {
      const effectiveMaxPages = commitMaxPagesInput(launchForm, maxPagesLimit);
      formApi.setErrorMap({ onSubmit: undefined });

      if (effectiveMaxPages > 500) {
        const confirmed = window.confirm(
          `${formatNumber(effectiveMaxPages)} sayfa taranacak. Bunda bir sakınca yok ama biraz zaman alabilir. Devam edilsin mi?`,
        );
        if (!confirmed) {
          return;
        }
      }

      try {
        const result = await startMutation.mutateAsync({
          projectId,
          startUrl: value.url,
          maxPages: effectiveMaxPages,
          lighthouseStrategy: value.runLighthouse ? "auto" : "none",
        });
        toast.success("Denetim başlatıldı");
        onAuditStarted(result.auditId);
      } catch (error) {
        formApi.setErrorMap({
          onSubmit: createFormValidationErrors({
            form: getStandardErrorMessage(error, "Denetim başlatılamadı"),
          }),
        });
      }
    },
  });

  /*
   * Prefill the start URL from the project's own site.
   *
   * Onboarding asks for the domain, then the dashboard's "Denetim çalıştır"
   * button dropped the operator on an empty field and asked for it again.
   * Only while the field is untouched, so it never fights someone typing,
   * and it waits for the query because the form's defaults are read once.
   */
  React.useEffect(() => {
    if (!domain) return;
    if (launchForm.getFieldMeta("url")?.isDirty) return;
    if (launchForm.getFieldValue("url")) return;
    launchForm.setFieldValue("url", domain);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- form identity is stable
  }, [domain]);

  return {
    launchForm,
    historyQuery,
    maxPagesLimit,
    commitMaxPagesInput: () => commitMaxPagesInput(launchForm, maxPagesLimit),
    deleteAudit: (auditId: string) => deleteMutation.mutate(auditId),
    /*
     * Run a past audit again with the settings it used.
     *
     * Goes through the form rather than straight to the mutation, so the URL
     * is validated the same way, the large-crawl confirmation still appears,
     * and a failure lands in the same place as one raised by the form. It
     * also leaves the form showing what is running, which is where the
     * operator looks next.
     */
    rerunAudit: (audit: {
      startUrl: string;
      pagesTotal: number;
      pagesCrawled: number;
      ranLighthouse: boolean;
    }) => {
      // `pagesTotal` is the reservation the audit was started with, which is
      // the setting being repeated. It is 0 on rows old enough to predate
      // the column, and there the pages actually crawled is the better guess.
      const pages = audit.pagesTotal || audit.pagesCrawled || MIN_PAGES;
      launchForm.setFieldValue("url", audit.startUrl);
      launchForm.setFieldValue("maxPagesInput", String(pages));
      launchForm.setFieldValue("runLighthouse", audit.ranLighthouse);
      void launchForm.handleSubmit();
    },
  };
}

function useLaunchMutations({
  projectId,
  historyRefetch,
}: {
  projectId: string;
  historyRefetch: () => Promise<unknown>;
}) {
  const queryClient = useQueryClient();
  const startMutation = useMutation({
    mutationFn: (data: {
      projectId: string;
      startUrl: string;
      maxPages: number;
      lighthouseStrategy: "auto" | "none";
    }) => startAudit({ data }),
    /*
     * Starting an audit invalidated nothing, so for the next five minutes
     * (the global staleTime) the history list, the dashboard card and the
     * freshness card all kept serving their pre-crawl answers -- including
     * the dashboard's "tarama sürüyor, sonuçlar bittiğinde görünecek",
     * which nothing was going to refetch.
     */
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["audit-history", projectId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardOverview", projectId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["auditFreshness", projectId],
        }),
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (auditId: string) =>
      deleteAudit({ data: { projectId, auditId } }),
    onSuccess: () => {
      void historyRefetch();
      toast.success("Denetim silindi");
    },
  });

  return { startMutation, deleteMutation };
}

function commitMaxPagesInput(
  launchForm: {
    state: { values: { maxPagesInput: string } };
    setFieldValue: (field: "maxPagesInput", value: string) => void;
  },
  maxPagesLimit: number,
) {
  const maxPagesInput = launchForm.state.values.maxPagesInput;
  const value = maxPagesInput ? Number.parseInt(maxPagesInput, 10) : MIN_PAGES;
  const safeValue = Number.isFinite(value)
    ? Math.max(MIN_PAGES, Math.min(maxPagesLimit, Math.round(value)))
    : MIN_PAGES;
  launchForm.setFieldValue("maxPagesInput", String(safeValue));
  return safeValue;
}
