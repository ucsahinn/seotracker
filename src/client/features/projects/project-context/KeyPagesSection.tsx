import * as React from "react";
import { Pencil, Plus } from "lucide-react";
import {
  KEY_PAGE_ROLES,
  type KeyPageRole,
  type ProjectContextUpdate,
} from "@/types/schemas/projectContext";
import {
  ConfirmDeleteButton,
  EmptyState,
  FormActions,
  listClass,
  Provenance,
  RowActions,
  SectionHeader,
  useContextUpdate,
  type ContextKeyPage,
} from "./shared";

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
      },
    });
  };

  return (
    <section className="space-y-3">
      <SectionHeader
        title="Önemli sayfalar"
        hint="Siteyi taşıyan sayfaların kısa listesi — tam bir envanter değil."
        action={
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => setAdding(true)}
          >
            <Plus className="size-3.5" />
            Sayfa ekle
          </button>
        }
      />

      {adding ? (
        <div className={listClass}>
          <KeyPageForm
            pending={update.isPending}
            onCancel={() => setAdding(false)}
            onSave={(draft) => save(null, draft)}
          />
        </div>
      ) : null}

      {keyPages.length === 0 ? (
        adding ? null : (
          <EmptyState>
            Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı
            ekleyin, ya da bir ajan son site denetiminizden bunları önersin.
          </EmptyState>
        )
      ) : (
        <ul className={listClass}>
          {keyPages.map((page) =>
            editingId === page.id ? (
              <li key={page.id}>
                <KeyPageForm
                  initial={page}
                  pending={update.isPending}
                  onCancel={() => setEditingId(null)}
                  onSave={(draft) => save(page.url, draft)}
                />
              </li>
            ) : (
              <li
                key={page.id}
                className="flex items-start justify-between gap-3 p-3"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="truncate text-sm font-medium">
                      {page.url}
                    </span>
                    <span className="badge badge-ghost badge-sm shrink-0">
                      {ROLE_LABELS[page.role]}
                    </span>
                  </div>
                  {page.topic ? (
                    <p className="text-sm text-base-content/70">
                      Hedef: {page.topic}
                    </p>
                  ) : null}
                  {page.notes ? (
                    <p className="text-sm text-base-content/70">{page.notes}</p>
                  ) : null}
                  <Provenance by={page.updatedBy} at={page.updatedAt} />
                </div>
                <RowActions>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    aria-label={`${page.url} sayfasını düzenle`}
                    onClick={() => setEditingId(page.id)}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <ConfirmDeleteButton
                    label={`${page.url} sayfasını kaldır`}
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

  return (
    <form
      className="space-y-2 bg-base-200/40 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.url.trim() || pending) return;
        onSave(draft);
      }}
    >
      <input
        autoFocus
        type="text"
        value={draft.url}
        onChange={(event) => setDraft({ ...draft, url: event.target.value })}
        placeholder="example.com/pricing"
        maxLength={2048}
        className="input input-bordered input-sm w-full"
        aria-label="Sayfa adresi"
      />
      <div className="grid gap-2 sm:grid-cols-2">
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
          aria-label="Sayfa rolü"
        >
          {KEY_PAGE_ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={draft.topic}
          onChange={(event) =>
            setDraft({ ...draft, topic: event.target.value })
          }
          placeholder="Hedef konu (isteğe bağlı)"
          maxLength={200}
          className="input input-bordered input-sm w-full"
          aria-label="Hedef konu"
        />
      </div>
      <input
        type="text"
        value={draft.notes}
        onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
        placeholder="Notlar (isteğe bağlı)"
        maxLength={500}
        className="input input-bordered input-sm w-full"
        aria-label="Sayfa notları"
      />
      <FormActions
        pending={pending}
        disabled={!draft.url.trim()}
        onCancel={onCancel}
      />
    </form>
  );
}
