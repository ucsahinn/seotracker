import { formatDate } from "@/client/lib/format";
import {
  ConfirmDeleteButton,
  ContextSaveError,
  EmptyListNote,
  listClass,
  Provenance,
  RowActions,
  SectionHeader,
  useContextUpdate,
  type ProjectContextData,
} from "./shared";
import { t } from "@/shared/i18n";

export function ResearchLog({
  projectId,
  researchLog,
  hasMore,
}: {
  projectId: string;
  hasMore: boolean;
  researchLog: ProjectContextData["researchLog"];
}) {
  const update = useContextUpdate(projectId);

  return (
    <section
      tabIndex={-1}
      className="space-y-3 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <SectionHeader
        title={t("Araştırma günlüğü")}
        hint={t(
          "Son doksan gündeki en yeni yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler.",
        )}
      />

      {hasMore ? (
        <p role="status" className="text-sm text-muted">
          {t("Bu zaman aralığında gösterilmeyen daha eski kayıtlar var.")}
        </p>
      ) : null}
      <ContextSaveError error={update.error} />
      {researchLog.length === 0 ? (
        <EmptyListNote>
          {t(
            "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.",
          )}
        </EmptyListNote>
      ) : (
        <ul className={listClass}>
          {researchLog.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start justify-between gap-3 p-3"
            >
              <div className="min-w-0 space-y-0.5">
                <p className="break-words text-sm text-muted">
                  {entry.summary}
                </p>
                <div className="flex flex-wrap items-baseline gap-x-2 text-xs text-muted">
                  <span>{formatDate(entry.entryDate)}</span>
                  <Provenance by={entry.createdBy} />
                </div>
              </div>
              <RowActions>
                <ConfirmDeleteButton
                  label={t("{date} tarihli kaydı sil", {
                    date: formatDate(entry.entryDate),
                  })}
                  pending={update.isPending}
                  onConfirm={() =>
                    update.mutate([{ removeResearchLog: [entry.id] }])
                  }
                />
              </RowActions>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
