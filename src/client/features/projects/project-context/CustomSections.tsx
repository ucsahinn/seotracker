import * as React from "react";
import { Pencil } from "lucide-react";
import { PROSE_MAX_CHARS } from "@/types/schemas/projectContext";
import { useDirtyDraft } from "./DraftGuard";
import {
  ConfirmDeleteButton,
  ContextSaveError,
  EmptyListNote,
  FormActions,
  Provenance,
  RowActions,
  SectionHeader,
  useContextUpdate,
  type ProjectContextData,
} from "./shared";
import { t } from "@/shared/i18n";

export function CustomSections({
  projectId,
  customSections,
}: {
  projectId: string;
  customSections: ProjectContextData["customSections"];
}) {
  const update = useContextUpdate(projectId);
  const [editingSlug, setEditingSlug] = React.useState<string | null>(null);

  return (
    <section
      id="context-custom-sections"
      tabIndex={-1}
      className="space-y-3 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <SectionHeader
        title={t("Özel bölümler")}
        hint={t(
          "Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey.",
        )}
      />

      <ContextSaveError error={update.error} />
      {customSections.length === 0 ? (
        <EmptyListNote>
          {t(
            "Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey öğrendiklerinde buraya bir bölüm ekler.",
          )}
        </EmptyListNote>
      ) : (
        <div className="space-y-3">
          {customSections.map((custom) =>
            editingSlug === custom.slug ? (
              <CustomSectionForm
                key={custom.slug}
                custom={custom}
                pending={update.isPending}
                onCancel={() => {
                  setEditingSlug(null);
                  document.getElementById("context-custom-sections")?.focus();
                }}
                onSave={(title, content, expectedContent) =>
                  update.mutate(
                    [
                      {
                        customSection: custom.slug,
                        title,
                        content,
                        expectedContent,
                      },
                    ],
                    {
                      onSuccess: () => {
                        setEditingSlug(null);
                        requestAnimationFrame(() =>
                          document
                            .getElementById("context-custom-sections")
                            ?.focus(),
                        );
                      },
                    },
                  )
                }
              />
            ) : (
              <div
                key={custom.slug}
                className="space-y-2 rounded-box border border-base-300 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 break-words">
                    <h3 className="truncate text-sm font-medium">
                      {custom.title ?? custom.slug}
                    </h3>
                    <Provenance by={custom.updatedBy} at={custom.updatedAt} />
                  </div>
                  <RowActions>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs min-h-11 min-w-11"
                      aria-label={t("{title} bölümünü düzenle", {
                        title: custom.title ?? custom.slug,
                      })}
                      onClick={() => setEditingSlug(custom.slug)}
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <ConfirmDeleteButton
                      label={t("{title} bölümünü sil", {
                        title: custom.title ?? custom.slug,
                      })}
                      pending={update.isPending}
                      onConfirm={() =>
                        update.mutate([
                          {
                            deleteCustomSection: custom.slug,
                            expectedContent: custom.content,
                          },
                        ])
                      }
                    />
                  </RowActions>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm text-muted">
                  {custom.content}
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}

function CustomSectionForm({
  custom,
  pending,
  onCancel,
  onSave,
}: {
  custom: ProjectContextData["customSections"][number];
  pending: boolean;
  onCancel: () => void;
  onSave: (title: string, content: string, expectedContent: string) => void;
}) {
  const [title, setTitle] = React.useState(custom.title ?? "");
  const [content, setContent] = React.useState(custom.content);
  const [base, setBase] = React.useState(custom.content);

  useDirtyDraft(title !== (custom.title ?? "") || content !== custom.content);

  return (
    <form
      className="space-y-2 rounded-box border border-base-300 bg-base-200/40 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (pending || !content.trim() || base !== custom.content) return;
        onSave(title.trim() || custom.slug, content, base);
      }}
    >
      {base !== custom.content ? (
        <div role="alert" className="space-y-2 text-sm">
          <p>
            {t(
              "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.",
            )}
          </p>
          <p className="whitespace-pre-wrap break-words">
            {t("Düzenleme başındaki metin")}: {base}
          </p>
          <p className="whitespace-pre-wrap break-words">
            {t("Son kayıtlı metin")}: {custom.content}
          </p>
          <button
            type="button"
            className="btn btn-sm min-h-11"
            onClick={() => setBase(custom.content)}
          >
            {t("Karşılaştırdım, birleştirilmiş taslağı kullan")}
          </button>
        </div>
      ) : null}
      <label className="block text-sm">
        {t("Bölüm başlığı")}
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={custom.slug}
          maxLength={120}
          className="input input-bordered input-sm w-full"
          aria-label={t("Bölüm başlığı")}
        />
      </label>
      <label className="block text-sm">
        {t("Bölüm içeriği")}
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={5}
          maxLength={PROSE_MAX_CHARS}
          className="textarea textarea-bordered w-full text-sm"
          aria-label={t("Bölüm içeriği")}
        />
      </label>
      <FormActions
        pending={pending}
        disabled={!content.trim() || base !== custom.content}
        onCancel={onCancel}
      />
    </form>
  );
}
