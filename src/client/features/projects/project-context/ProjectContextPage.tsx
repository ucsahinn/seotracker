import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getProjectContext } from "@/serverFunctions/projectContext";
import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
} from "@/types/schemas/projectContext";
import { DraftGuard } from "./DraftGuard";
import { projectSetupOptions } from "../projectSetupQuery";
import { formatCount } from "@/shared/format";
import { ContextHealthCard } from "./ContextHealthCard";
import { CompetitorsSection } from "./CompetitorsSection";
import { FillWithAgentCard } from "./FillWithAgentCard";
import { KeyPagesSection } from "./KeyPagesSection";
import { ResearchLog } from "./ResearchLog";
import { projectContextQueryKey } from "./shared";
import { PageHeader } from "@/client/components/PageShell";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { ProseSections } from "./ProseSections";
import { CustomSections } from "./CustomSections";
import { t } from "@/shared/i18n";

export function ProjectContextPage(props: {
  projectId: string;
  projectName: string;
  domain?: string | null;
  identityReady?: boolean;
}) {
  return (
    <DraftGuard key={props.projectId}>
      <ProjectContextContent {...props} />
    </DraftGuard>
  );
}

function ProjectContextContent({
  projectId,
  projectName,
  domain,
  identityReady = true,
}: {
  projectId: string;
  projectName: string;
  domain?: string | null;
  identityReady?: boolean;
}) {
  const queryClient = useQueryClient();
  const contextQuery = useQuery({
    queryKey: projectContextQueryKey(projectId),
    queryFn: () => getProjectContext({ data: { projectId } }),
    // This page exists to inspect what agents just wrote; the app-wide
    // 5-minute staleTime would show memory from before their turn as current.
    staleTime: 0,
  });

  // The lead is the project's own name for what the page is, and the refresh
  // sits top right like every other screen. The project name is not repeated
  // here: the switcher above the menu already shows it.
  const header = (
    <PageHeader
      title={t("Proje bilgisi")}
      description={t(
        "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.",
      )}
      actions={
        contextQuery.data ? (
          <PageActions>
            <RefreshButton
              onRefresh={() => {
                void Promise.all([
                  contextQuery.refetch(),
                  queryClient.invalidateQueries({
                    queryKey: projectSetupOptions(projectId).queryKey,
                  }),
                ]);
              }}
              isFetching={contextQuery.isFetching}
              shortcut
            />
          </PageActions>
        ) : undefined
      }
    />
  );

  if (contextQuery.isPending) {
    return (
      <>
        {header}
        <div className="space-y-6" aria-busy>
          {Array.from(
            { length: PROJECT_CONTEXT_SECTION_KEYS.length },
            (_, index) => (
              <div key={index} className="space-y-2">
                <div className="skeleton h-3 w-32" />
                <div className="skeleton h-20" />
              </div>
            ),
          )}
        </div>
      </>
    );
  }

  // Not pending and no data means the first load failed. A failed background
  // refetch keeps the data, and must not unmount the form and its drafts.
  const context = contextQuery.data;
  if (!context) {
    return (
      <>
        {header}
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={contextQuery.error}
            onRetry={() => void contextQuery.refetch()}
            title={t("Proje bilgisi yüklenemedi")}
          />
        </div>
      </>
    );
  }

  return (
    // key remounts the whole page when the project switches under it, so no
    // draft, open form, or edit state can carry over to another project.
    <>
      {header}
      <div key={projectId} className="space-y-8">
        <p className="break-all text-sm text-muted">
          {projectName}
          {domain ? " · " + domain : ""}
        </p>
        {contextQuery.isError ? (
          <div
            role="status"
            className="rounded-box border border-[var(--hairline)] p-3 text-sm text-muted"
          >
            {t(
              "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.",
            )}{" "}
            <button
              className="btn btn-ghost btn-sm min-h-11"
              type="button"
              onClick={() => void contextQuery.refetch()}
            >
              {t("Yeniden dene")}
            </button>
          </div>
        ) : null}
        <section className="space-y-2 rounded-box bg-base-200/40 p-4">
          <h2 className="text-sm font-semibold">
            {t("{filled}/{total} bölüm dolu", {
              filled: formatCount(
                PROJECT_CONTEXT_SECTION_KEYS.length -
                  context.missingSections.length,
              ),
              total: formatCount(PROJECT_CONTEXT_SECTION_KEYS.length),
            })}
          </h2>
          <p className="whitespace-pre-wrap break-words text-sm">
            {context.sections.find((section) => section.key === "current_goal")
              ?.content ??
              t(
                "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.",
              )}
          </p>
          {context.missingSections[0] ? (
            <a
              className="link inline-flex min-h-11 items-center"
              href={"#context-" + context.missingSections[0]}
            >
              {t("İlk boş bölümü doldur")}
            </a>
          ) : null}
        </section>
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("Bölüme git")}</span>
          <select
            className="select select-bordered w-full"
            defaultValue=""
            onChange={(event) => {
              document.getElementById(event.target.value)?.focus();
            }}
          >
            <option value="" disabled>
              {t("Bölüm seçin")}
            </option>
            {PROJECT_CONTEXT_SECTION_KEYS.map((key) => (
              <option key={key} value={"context-" + key}>
                {t(PROJECT_CONTEXT_SECTION_LABELS[key])}
              </option>
            ))}
          </select>
        </label>
        <ProseSections
          projectId={projectId}
          sections={context.sections}
          missingSections={context.missingSections}
        />

        <details>
          <summary className="cursor-pointer py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary">
            {t("Ajanla taslak hazırla")}
          </summary>
          {identityReady ? (
            <FillWithAgentCard
              projectName={projectName}
              projectId={projectId}
              domain={domain}
              missingSections={context.missingSections}
              competitorCount={context.competitors.length}
              keyPageCount={context.keyPages.length}
            />
          ) : (
            <p role="status" className="text-sm text-muted">
              {t(
                "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.",
              )}
            </p>
          )}
        </details>
        <CompetitorsSection
          projectId={projectId}
          competitors={context.competitors}
        />

        <KeyPagesSection projectId={projectId} keyPages={context.keyPages} />

        <details>
          <summary className="cursor-pointer py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary">
            {t("Özel bölümler")}
          </summary>
          <CustomSections
            projectId={projectId}
            customSections={context.customSections}
          />
        </details>
        <details>
          <summary className="cursor-pointer py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary">
            {t("Araştırma günlüğü")}
          </summary>
          <ResearchLog
            projectId={projectId}
            researchLog={context.researchLog}
            hasMore={context.researchLogHasMore}
          />
        </details>
        <details>
          <summary className="cursor-pointer py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary">
            {t("Kaynak ve kurulum")}
          </summary>
          <ContextHealthCard projectId={projectId} context={context} />
        </details>
      </div>
    </>
  );
}
