import { HelpTip, SettingsHeading } from "@/client/components/HelpTip";
import { Skeleton } from "@/client/components/Skeleton";
import { Spinner } from "@/client/components/Spinner";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FolderX } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { ProjectMarketFields } from "@/client/features/projects/ProjectMarketFields";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  clearLastProjectId,
  getLastProjectId,
} from "@/client/lib/active-project";
import {
  archiveProject,
  getProjects,
  updateProject,
} from "@/serverFunctions/projects";
import { fillParts } from "@/client/features/settings/fillParts";
import type { ProjectSummary } from "./types";
import { t } from "@/shared/i18n";

export function ProjectGeneralSettings({ projectId }: { projectId: string }) {
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projects = projectsQuery.data ?? [];
  const project = projects.find((entry) => entry.id === projectId) ?? null;

  /*
   * Loading, failed and not-found used to collapse into one spinner, so a
   * failed `getProjects` spun forever on the screen that sets the site
   * domain - the first step of onboarding - with refresh as the only exit.
   */
  // Only when there is nothing to show: a failed background refetch must not
  // unmount the form and discard what was typed.
  if (projectsQuery.isError && !projectsQuery.data) {
    return (
      <QueryErrorState
        error={projectsQuery.error}
        onRetry={() => void projectsQuery.refetch()}
        title={t("Proje yüklenemedi")}
      />
    );
  }

  if (projectsQuery.isPending) {
    return (
      // Shaped like the form that is coming, so the page does not jump.
      <Skeleton variant="form" rows={3} />
    );
  }

  if (!project) {
    return (
      <EmptyState
        icon={FolderX}
        title={t("Proje bulunamadı")}
        description={t("Bu proje silinmiş ya da arşivlenmiş olabilir.")}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* key resets the form's local state when switching between projects */}
      <GeneralSection key={project.id} project={project} />
      <DangerSection project={project} canArchive={projects.length > 1} />
    </div>
  );
}

function GeneralSection({ project }: { project: ProjectSummary }) {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(project.name);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const nameInput = React.useRef<HTMLInputElement>(null);
  const [domainConfirmed, setDomainConfirmed] = React.useState(false);
  const [domain, setDomain] = React.useState(project.domain ?? "");
  const [market, setMarket] = React.useState({
    locationCode: project.locationCode,
    languageCode: project.languageCode,
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateProject({
        data: {
          projectId: project.id,
          name: name.trim(),
          domain: domain.trim() || undefined,
          ...market,
        },
      }),
    onSuccess: async (saved) => {
      // The server normalizes the domain (https://www.Acme.com/ -> acme.com);
      // show what was stored so the form is not left dirty against it.
      setName(saved.name);
      setDomain(saved.domain ?? "");
      // Domain and market feed the dashboard's setup state and overview too.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["projectSetup", project.id],
        }),
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardActivation", project.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardOverview", project.id],
        }),
      ]);
      toast.success(t("Proje güncellendi"));
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Proje güncellenemedi"))),
  });

  const isDirty =
    name.trim() !== project.name ||
    (domain.trim() || "") !== (project.domain ?? "") ||
    market.locationCode !== project.locationCode ||
    market.languageCode !== project.languageCode;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (updateMutation.isPending) return;
    if (!name.trim()) {
      // Next to the field, like the create modal: a toast in the corner
      // left the operator hunting for which input it meant.
      setNameError(t("Proje adı gerekli"));
      nameInput.current?.focus();
      return;
    }
    if ((domain.trim() || "") !== (project.domain ?? "") && !domainConfirmed)
      return;
    updateMutation.mutate();
  };

  return (
    <section className="space-y-3">
      <SettingsHeading
        title={t("Temel bilgiler")}
        help={t(
          "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.",
        )}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium">
            {t("Ad")}
            <HelpTip label={t("Ad")}>
              {t(
                "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.",
              )}
            </HelpTip>
          </span>
          <input
            ref={nameInput}
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(null);
            }}
            aria-label={t("Ad")}
            maxLength={120}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={
              nameError ? "project-settings-name-error" : undefined
            }
            className={`input input-bordered w-full ${nameError ? "input-error" : ""}`}
          />
          {nameError ? (
            <span
              id="project-settings-name-error"
              role="alert"
              className="text-xs text-[var(--ink-error)]"
            >
              {nameError}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium">
            {t("Alan adı")}{" "}
            <span className="text-muted">{t("(isteğe bağlı)")}</span>
            <HelpTip label={t("Alan adı")}>
              {t(
                "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.",
              )}
            </HelpTip>
          </span>
          <input
            type="text"
            value={domain}
            onChange={(event) => {
              setDomain(event.target.value);
              setDomainConfirmed(false);
            }}
            placeholder="example.com"
            aria-label={t("Alan adı")}
            maxLength={255}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <ProjectMarketFields value={market} onChange={setMarket} />
          <span className="text-xs text-muted">
            {t(
              "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.",
            )}
          </span>
        </div>

        {(domain.trim() || "") !== (project.domain ?? "") ? (
          <p className="text-sm text-[var(--ink-warning)]">
            {t(
              "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.",
            )}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            className="link min-h-11 inline-flex items-center"
            href={`/p/${project.id}/settings/context`}
          >
            {t("Proje bilgisi")}
          </a>
          <a
            className="link min-h-11 inline-flex items-center"
            href={`/p/${project.id}/search-performance`}
          >
            {t("Marka terimlerini Arama performansında düzenleyin")}
          </a>
        </div>
        {(domain.trim() || "") !== (project.domain ?? "") ? (
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="checkbox"
              checked={domainConfirmed}
              onChange={(event) => setDomainConfirmed(event.target.checked)}
            />
            {t(
              "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.",
            )}
          </label>
        ) : null}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary btn-sm gap-1.5"
            disabled={
              updateMutation.isPending ||
              !isDirty ||
              ((domain.trim() || "") !== (project.domain ?? "") &&
                !domainConfirmed)
            }
          >
            {updateMutation.isPending ? <Spinner delay={false} /> : null}
            {updateMutation.isPending
              ? t("Kaydediliyor…")
              : t("Değişiklikleri kaydet")}
          </button>
        </div>
      </form>
    </section>
  );
}

function DangerSection({
  project,
  canArchive,
}: {
  project: ProjectSummary;
  canArchive: boolean;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = React.useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveProject({ data: { projectId: project.id } }),
    onSuccess: async () => {
      if (getLastProjectId() === project.id) clearLastProjectId();
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(t("Proje arşivlendi"));
      // Re-resolve to a remaining project via the landing redirect.
      void navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Proje arşivlenemedi"))),
  });

  return (
    <section className="space-y-3 border-t border-base-300 pt-8">
      <SettingsHeading
        title={t("Projeyi arşivle")}
        help={t(
          "Arşivlenen proje kenar çubuğundan kalkar ama hiçbir verisi silinmez. Denetimler, kelimeler ve raporlar durur, geri alınca aynen döner.",
        )}
      />

      {confirming ? (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            {fillParts(
              t(
                "{name} projesini arşivlerseniz çalışma alanınızdan kaldırılır. Daha sonra Projeler sayfasından geri alabilirsiniz.",
              ),
              {
                name: (
                  <span className="font-medium text-base-content">
                    {project.name}
                  </span>
                ),
              },
            )}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-error btn-sm"
              onClick={() => archiveMutation.mutate()}
              disabled={archiveMutation.isPending}
            >
              {t("Evet, projeyi arşivle")}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setConfirming(false)}
              disabled={archiveMutation.isPending}
            >
              {t("Vazgeç")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {canArchive
              ? t(
                  "Bu projeyi arşivleyerek çalışma alanınızdan kaldırabilirsiniz.",
                )
              : t("Tek projenizi arşivleyemezsiniz.")}
          </p>
          <button
            type="button"
            className="btn btn-outline btn-error btn-sm shrink-0"
            onClick={() => setConfirming(true)}
            disabled={!canArchive}
          >
            {t("Projeyi arşivle")}
          </button>
        </div>
      )}
    </section>
  );
}
