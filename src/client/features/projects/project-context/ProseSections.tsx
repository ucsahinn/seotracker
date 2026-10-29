import { GrowingTextarea } from "./GrowingTextarea";
import * as React from "react";
import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
  PROSE_MAX_CHARS,
  type ProjectContextSectionKey,
} from "@/types/schemas/projectContext";
import { useDirtyDraft } from "./DraftGuard";
import {
  ContextSaveError,
  EmptyListNote,
  Provenance,
  useContextUpdate,
  type ProjectContextData,
} from "./shared";
import { SECTION_HINTS, SECTION_PLACEHOLDERS } from "./sectionCopy";
import { t } from "@/shared/i18n";

export function ProseSections({
  projectId,
  sections,
  missingSections,
}: {
  projectId: string;
  sections: ProjectContextData["sections"];
  missingSections: ProjectContextData["missingSections"];
}) {
  const update = useContextUpdate(projectId);
  const stored = new Map(sections.map((section) => [section.key, section]));
  // Only the fields the user actually touched are pinned locally; the rest
  // render straight from the query, so an agent's write shows up on refetch.
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});

  const bases = React.useRef<Record<string, string | null>>({});

  const draftOf = (key: ProjectContextSectionKey) =>
    drafts[key] ?? stored.get(key)?.content ?? "";

  // Content is trimmed server-side, so compare trimmed values — otherwise a
  // stray newline leaves the form permanently "unsaved".
  const changed = PROJECT_CONTEXT_SECTION_KEYS.filter(
    (key) => draftOf(key).trim() !== (stored.get(key)?.content ?? ""),
  );

  useDirtyDraft(changed.length > 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      update.isPending ||
      changed.length === 0 ||
      changed.some(
        (key) => bases.current[key] !== (stored.get(key)?.content ?? null),
      )
    )
      return;
    update.mutate(
      changed.map((key) => ({
        section: key,
        content: draftOf(key).trim(),
        expectedContent: bases.current[key],
      })),
      // Unpin every draft the save made redundant — one that now matches the
      // server — so those sections render from the query again (a pinned
      // draft would silently overwrite a later agent write on the next
      // save). Anything typed while the request was in flight still differs
      // and stays pinned instead of snapping back.
      {
        onSuccess: (context) => {
          const saved = new Map<string, string>(
            context.sections.map((section) => [section.key, section.content]),
          );
          setDrafts((current) =>
            Object.fromEntries(
              Object.entries(current).filter(([key, value]) => {
                const keep = value.trim() !== (saved.get(key) ?? "");
                if (keep && changed.some((submitted) => submitted === key))
                  bases.current[key] = saved.get(key) ?? null;
                else if (!keep) delete bases.current[key];
                return keep;
              }),
            ),
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {missingSections.length === PROJECT_CONTEXT_SECTION_KEYS.length ? (
        <EmptyListNote>
          {t(
            "Henüz boş. Kendiniz doldurabilir ya da ajanınıza sitenizden taslak çıkarttırıp onaylayabilirsiniz.",
          )}
        </EmptyListNote>
      ) : null}

      {PROJECT_CONTEXT_SECTION_KEYS.map((key) => {
        const section = stored.get(key);
        return (
          <div key={key} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <label
                htmlFor={`context-${key}`}
                className="text-sm font-medium text-base-content"
              >
                {t(PROJECT_CONTEXT_SECTION_LABELS[key])}
              </label>
              {section ? (
                <Provenance by={section.updatedBy} at={section.updatedAt} />
              ) : (
                <span className="badge badge-sm border-warning/30 bg-warning/10 text-[var(--ink-warning)]">
                  {t("Boş")}
                </span>
              )}
            </div>
            <details className="text-sm text-muted">
              <summary className="cursor-pointer py-2">
                {t("Ayrıntılar")}
              </summary>
              <p id={"hint-" + key} className="max-w-prose leading-relaxed">
                {t(SECTION_HINTS[key])}{" "}
                {t("En fazla {count} karakter", { count: PROSE_MAX_CHARS })}
              </p>
            </details>
            {key in bases.current &&
            bases.current[key] !== (section?.content ?? null) ? (
              <div
                role="alert"
                className="space-y-2 rounded-box border border-warning p-3 text-sm"
              >
                <p>
                  {t(
                    "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.",
                  )}
                </p>
                <p className="whitespace-pre-wrap break-words">
                  {t("Düzenleme başındaki metin")}: {bases.current[key] ?? "—"}
                </p>
                <p className="whitespace-pre-wrap break-words">
                  {t("Son kayıtlı metin")}: {section?.content ?? "—"}
                </p>
                <button
                  type="button"
                  className="btn btn-sm min-h-11"
                  onClick={() => {
                    bases.current[key] = section?.content ?? null;
                    setDrafts((current) => ({ ...current }));
                  }}
                >
                  {t("Karşılaştırdım, birleştirilmiş taslağı kullan")}
                </button>
              </div>
            ) : null}
            <GrowingTextarea
              id={`context-${key}`}
              aria-describedby={"hint-" + key}
              value={draftOf(key)}
              onChange={(event) => {
                const value = event.target.value;
                if (!(key in bases.current))
                  bases.current[key] = section?.content ?? null;
                setDrafts((current) => {
                  // A draft that matches the store is no draft at all — drop
                  // it so an edit typed and then undone doesn't pin the
                  // section against later agent writes.
                  if (value === (stored.get(key)?.content ?? "")) {
                    delete bases.current[key];
                    const { [key]: _dropped, ...rest } = current;
                    return rest;
                  }
                  return { ...current, [key]: value };
                });
              }}
              rows={4}
              maxLength={PROSE_MAX_CHARS}
              placeholder={t(SECTION_PLACEHOLDERS[key])}
              className="textarea textarea-bordered w-full text-sm"
            />
          </div>
        );
      })}

      <ContextSaveError error={update.error} />
      <div className="flex items-center justify-end gap-3">
        {changed.length > 0 ? (
          <p className="text-xs text-muted" role="status">
            {t("{count} bölüm kaydedilmedi", { count: changed.length })}
          </p>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary btn-sm min-h-11"
          disabled={
            update.isPending ||
            changed.length === 0 ||
            changed.some(
              (key) =>
                bases.current[key] !== (stored.get(key)?.content ?? null),
            )
          }
        >
          {t("Değişiklikleri kaydet")}
        </button>
      </div>
    </form>
  );
}
