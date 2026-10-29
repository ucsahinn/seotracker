import * as React from "react";
import { Pencil, Plus } from "lucide-react";
import {
  KEY_PAGE_ROLES,
  type KeyPageRole,
  type ProjectContextUpdate,
} from "@/types/schemas/projectContext";
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
  type ContextKeyPage,
} from "./shared";
import { useDirtyDraft } from "./DraftGuard";
import { t } from "@/shared/i18n";

// Turkish source text, translated where it renders.
const ROLE_LABELS: Record<KeyPageRole, string> = {
  hub: "Merkez sayfa",
  spoke: "Destek sayfası",
  money: "Dönüşüm sayfası",
  other: "Diğer",
};

export function KeyPagesSection({
  projectId,
  keyPages,
}: {
  projectId: string;
  keyPages: ContextKeyPage[];
}) {
  const update = useContextUpdate(projectId);
  const [adding, setAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const save = (previousUrl: string | null, draft: KeyPageDraft) => {
    const ops: ProjectContextUpdate[] = [];
    // Key pages upsert by URL, so a retyped URL has to drop the old row before
    // the new one lands.
    if (previousUrl && previousUrl !== draft.url.trim()) {
      ops.push({ removeKeyPages: [previousUrl] });
    }
    // Send the fields even when blank: an omitted field means "keep what's
    // stored" (so agent writes merge), so clearing one from the form has to
    // send the empty string.
    ops.push({
      addKeyPages: [
        {
          url: draft.url.trim(),
          role: draft.role,
          topic: draft.topic.trim(),
          notes: draft.notes.trim(),
        },
      ],
    });
    update.mutate(ops, {
      onSuccess: () => {
        setAdding(false);
        setEditingId(null);
        requestAnimationFrame(() =>
          document.getElementById("context-key-pages")?.focus(),
        );
      },
    });
  };

  return (
    <section
      id="context-key-pages"
      tabIndex={-1}
      className="scroll-mt-6 space-y-3 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <SectionHeader
        title={t("Önemli sayfalar")}
        hint={t("Sitenin en önemli sayfaları. Tam liste olması gerekmez.")}
        action={
          <button
            type="button"
            className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
            onClick={() => setAdding(true)}
          >
            <Plus className="size-3.5" />
            {t("Sayfa ekle")}
          </button>
        }
      />

      <ContextSaveError error={update.error} />
      {adding ? (
        <div className={listClass}>
          <KeyPageForm
            pending={update.isPending}
            onCancel={() => {
              setAdding(false);
              document.getElementById("context-key-pages")?.focus();
            }}
            onSave={(draft) => save(null, draft)}
          />
        </div>
      ) : null}

      {keyPages.length === 0 ? (
        adding ? null : (
          <EmptyListNote>
            {t(
              "Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı ekleyin, ya da bir ajan son site denetiminizden bunları önersin.",
            )}
          </EmptyListNote>
        )
      ) : (
        <ul className={listClass}>
          {keyPages.map((page) =>
            editingId === page.id ? (
              <li key={page.id}>
                <KeyPageForm
                  initial={page}
                  pending={update.isPending}
                  onCancel={() => {
                    setEditingId(null);
                    document.getElementById("context-key-pages")?.focus();
                  }}
                  onSave={(draft) => save(page.url, draft)}
                />
              </li>
            ) : (
              <li
                key={page.id}
                className="flex items-start justify-between gap-3 p-3"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className="break-all text-sm font-medium"
                      title={page.url}
                    >
                      {page.url}
                    </span>
                    <span className="badge badge-ghost badge-sm shrink-0">
                      {t(ROLE_LABELS[page.role])}
                    </span>
                  </div>
                  {page.topic ? (
                    <p className="break-words text-sm text-muted">
                      {t("Hedef: {topic}", { topic: page.topic })}
                    </p>
                  ) : null}
                  {page.notes ? (
                    <p className="break-words text-sm text-muted">
                      {page.notes}
                    </p>
                  ) : null}
                  <Provenance by={page.updatedBy} at={page.updatedAt} />
                </div>
                <RowActions>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
                    aria-label={t("{url} sayfasını düzenle", { url: page.url })}
                    onClick={() => setEditingId(page.id)}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <ConfirmDeleteButton
                    label={t("{url} sayfasını kaldır", { url: page.url })}
                    pending={update.isPending}
                    onConfirm={() =>
                      update.mutate([{ removeKeyPages: [page.url] }])
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

type KeyPageDraft = {
  url: string;
  role: KeyPageRole;
  topic: string;
  notes: string;
};

function KeyPageForm({
  initial,
  pending,
  onCancel,
  onSave,
}: {
  initial?: ContextKeyPage;
  pending: boolean;
  onCancel: () => void;
  onSave: (draft: KeyPageDraft) => void;
}) {
  const [draft, setDraft] = React.useState<KeyPageDraft>({
    url: initial?.url ?? "",
    role: initial?.role ?? "other",
    topic: initial?.topic ?? "",
    notes: initial?.notes ?? "",
  });

  useDirtyDraft(
    draft.url !== (initial?.url ?? "") ||
      draft.role !== (initial?.role ?? "other") ||
      draft.topic !== (initial?.topic ?? "") ||
      draft.notes !== (initial?.notes ?? ""),
  );

  return (
    <form
      className="space-y-2 bg-base-200/40 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.url.trim() || pending) return;
        onSave(draft);
      }}
    >
      <label className="block space-y-1 text-xs text-muted">
        <span>{t("Sayfa adresi")}</span>
        <input
          autoFocus
          type="text"
          value={draft.url}
          onChange={(event) => setDraft({ ...draft, url: event.target.value })}
          placeholder="example.com/pricing"
          maxLength={2048}
          className="input input-bordered input-sm w-full"
          aria-label={t("Sayfa adresi")}
        />
        <span className="block text-xs text-muted">
          {t("En fazla {count} karakter", { count: 2048 })}
        </span>
      </label>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block space-y-1 text-xs text-muted">
          <span>{t("Sayfa rolü")}</span>
          <select
            value={draft.role}
            onChange={(event) =>
              setDraft({
                ...draft,
                role:
                  KEY_PAGE_ROLES.find((role) => role === event.target.value) ??
                  draft.role,
              })
            }
            className="select select-bordered select-sm w-full"
            aria-label={t("Sayfa rolü")}
          >
            {KEY_PAGE_ROLES.map((role) => (
              <option key={role} value={role}>
                {t(ROLE_LABELS[role])}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted">
          <span>{t("Hedef konu")}</span>
          <input
            type="text"
            value={draft.topic}
            onChange={(event) =>
              setDraft({ ...draft, topic: event.target.value })
            }
            placeholder={t("Hedef konu (isteğe bağlı)")}
            maxLength={200}
            className="input input-bordered input-sm w-full"
            aria-label={t("Hedef konu")}
          />
          <span className="block text-xs text-muted">
            {t("En fazla {count} karakter", { count: 200 })}
          </span>
        </label>
      </div>
      <label className="block space-y-1 text-xs text-muted">
        <span>{t("Sayfa notları")}</span>
        <input
          type="text"
          value={draft.notes}
          onChange={(event) =>
            setDraft({ ...draft, notes: event.target.value })
          }
          placeholder={t("Notlar (isteğe bağlı)")}
          maxLength={500}
          className="input input-bordered input-sm w-full"
          aria-label={t("Sayfa notları")}
        />
        <span className="block text-xs text-muted">
          {t("En fazla {count} karakter", { count: 500 })}
        </span>
      </label>
      <FormActions
        pending={pending}
        disabled={!draft.url.trim()}
        onCancel={onCancel}
      />
    </form>
  );
}
