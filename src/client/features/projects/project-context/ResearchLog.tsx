import { formatDate } from "@/client/lib/format";
import {
  ConfirmDeleteButton,
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
}: {
  projectId: string;
  researchLog: ProjectContextData["researchLog"];
}) {
  const update = useContextUpdate(projectId);

  return (
    <section className="space-y-3">
      <SectionHeader
        title={t("Araştırma günlüğü")}
        hint={t(
          "Neye bakıldığının kaydı. Aynı araştırma iki kez yapılmasın diye tutulur.",
        )}
      />

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
                <p className="text-sm text-muted">{entry.summary}</p>
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
