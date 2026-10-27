import * as React from "react";
import { Pencil, Plus } from "lucide-react";
import type { ProjectContextUpdate } from "@/types/schemas/projectContext";
import {
  ConfirmDeleteButton,
  ContextSaveError,
  EmptyListNote,
  FormActions,
  listClass,
  Provenance,
  RowActions,
  SectionHeader,
  useContextUpdate,
  type ContextCompetitor,
} from "./shared";
import { useDirtyDraft } from "./DraftGuard";
import { t } from "@/shared/i18n";

export function CompetitorsSection({
  projectId,
  competitors,
}: {
  projectId: string;
  competitors: ContextCompetitor[];
}) {
  const update = useContextUpdate(projectId);
  const [adding, setAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const save = (previousDomain: string | null, draft: CompetitorDraft) => {
    const ops: ProjectContextUpdate[] = [];
    // Competitors upsert by domain, so a retyped domain has to drop the old row
    // before the new one lands.
    if (previousDomain && previousDomain !== draft.domain.trim()) {
      ops.push({ removeCompetitors: [previousDomain] });
    }
    // Send the fields even when blank: an omitted field means "keep what's
    // stored" (so agent writes merge), so clearing one from the form has to
    // send the empty string.
    ops.push({
      addCompetitors: [
        {
          domain: draft.domain.trim(),
          name: draft.name.trim(),
          notes: draft.notes.trim(),
        },
      ],
    });
    update.mutate(ops, {
      onSuccess: () => {
        setAdding(false);
        setEditingId(null);
        requestAnimationFrame(() =>
          document.getElementById("context-competitors")?.focus(),
        );
      },
    });
  };

  return (
    <section
      id="context-competitors"
      tabIndex={-1}
      className="scroll-mt-6 space-y-3 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <SectionHeader
        title={t("Rakipler")}
        hint={t("Kendinizi kıyasladığınız siteler.")}
        action={
          <button
            type="button"
            className="btn btn-ghost btn-xs min-h-11 min-w-11"
            onClick={() => setAdding(true)}
          >
            <Plus className="size-3.5" />
            {t("Rakip ekle")}
          </button>
        }
      />

      <ContextSaveError error={update.error} />
      {adding ? (
        <div className={listClass}>
          <CompetitorForm
            pending={update.isPending}
            onCancel={() => {
              setAdding(false);
              document.getElementById("context-competitors")?.focus();
            }}
            onSave={(draft) => save(null, draft)}
          />
        </div>
      ) : null}

      {competitors.length === 0 ? (
        adding ? null : (
          <EmptyListNote>
            {t(
              "Henüz rakip yok. Rekabet ettiğiniz siteleri ekleyin, ya da bağladığınız ajandan bunları bulup buraya kaydetmesini isteyin.",
            )}
          </EmptyListNote>
        )
      ) : (
        <ul className={listClass}>
          {competitors.map((competitor) =>
            editingId === competitor.id ? (
              <li key={competitor.id}>
                <CompetitorForm
                  initial={competitor}
                  pending={update.isPending}
                  onCancel={() => {
                    setEditingId(null);
                    document.getElementById("context-competitors")?.focus();
                  }}
                  onSave={(draft) => save(competitor.domain, draft)}
                />
              </li>
            ) : (
              <li key={competitor.id} className="flex flex-col gap-3 p-3">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className="break-all text-sm font-medium"
                      title={competitor.domain}
                    >
                      {competitor.domain}
                    </span>
                    {competitor.name ? (
                      <span
                        className="break-all text-xs text-muted"
                        title={competitor.name}
                      >
                        {competitor.name}
                      </span>
                    ) : null}
                  </div>
                  {competitor.notes ? (
                    <p className="break-words text-sm text-muted">
                      {competitor.notes}
                    </p>
                  ) : null}
                  <Provenance
                    by={competitor.updatedBy}
                    at={competitor.updatedAt}
                  />
                </div>
                <RowActions>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs min-h-11 min-w-11"
                    aria-label={t("{domain} rakibini düzenle", {
                      domain: competitor.domain,
                    })}
                    onClick={() => setEditingId(competitor.id)}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <ConfirmDeleteButton
                    label={t("{domain} rakibini kaldır", {
                      domain: competitor.domain,
                    })}
                    pending={update.isPending}
                    onConfirm={() =>
                      update.mutate([
                        { removeCompetitors: [competitor.domain] },
                      ])
                    }
                  />
                </RowActions>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}

type CompetitorDraft = { domain: string; name: string; notes: string };

function CompetitorForm({
  initial,
  pending,
  onCancel,
  onSave,
}: {
  initial?: ContextCompetitor;
  pending: boolean;
  onCancel: () => void;
  onSave: (draft: CompetitorDraft) => void;
}) {
  const [draft, setDraft] = React.useState<CompetitorDraft>({
    domain: initial?.domain ?? "",
    name: initial?.name ?? "",
    notes: initial?.notes ?? "",
  });

  useDirtyDraft(
    draft.domain !== (initial?.domain ?? "") ||
      draft.name !== (initial?.name ?? "") ||
      draft.notes !== (initial?.notes ?? ""),
  );

  return (
    <form
      className="space-y-2 bg-base-200/40 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.domain.trim() || pending) return;
        onSave(draft);
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block space-y-1 text-xs text-muted">
          <span>{t("Rakip alan adı")}</span>
          <input
            autoFocus
            type="text"
            value={draft.domain}
            onChange={(event) =>
              setDraft({ ...draft, domain: event.target.value })
            }
            placeholder="competitor.com"
            maxLength={255}
            className="input input-bordered input-sm w-full"
            aria-label={t("Rakip alan adı")}
          />
          <span className="block text-xs text-muted">
            {t("En fazla {count} karakter", { count: 255 })}
          </span>
        </label>
        <label className="block space-y-1 text-xs text-muted">
          <span>{t("Rakip adı")}</span>
          <input
            type="text"
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
            placeholder={t("Ad (isteğe bağlı)")}
            maxLength={120}
            className="input input-bordered input-sm w-full"
            aria-label={t("Rakip adı")}
          />
          <span className="block text-xs text-muted">
            {t("En fazla {count} karakter", { count: 120 })}
          </span>
        </label>
      </div>
      <label className="block space-y-1 text-xs text-muted">
        <span>{t("Rakip notları")}</span>
        <input
          type="text"
          value={draft.notes}
          onChange={(event) =>
            setDraft({ ...draft, notes: event.target.value })
          }
          placeholder={t(
            "Neden önemliler? Örn. her karşılaştırma aramasında önde (isteğe bağlı)",
          )}
          maxLength={500}
          className="input input-bordered input-sm w-full"
          aria-label={t("Rakip notları")}
        />
        <span className="block text-xs text-muted">
          {t("En fazla {count} karakter", { count: 500 })}
        </span>
      </label>
      <FormActions
        pending={pending}
        disabled={!draft.domain.trim()}
        onCancel={onCancel}
      />
    </form>
  );
}
