import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { formatCount, formatDate } from "@/client/lib/format";
import { getProjectContext } from "@/serverFunctions/projectContext";
import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
  PROSE_MAX_CHARS,
  type ProjectContextSectionKey,
} from "@/types/schemas/projectContext";
import { ContextHealthCard } from "./ContextHealthCard";
import { CompetitorsSection } from "./CompetitorsSection";
import { FillWithAgentCard } from "./FillWithAgentCard";
import { KeyPagesSection } from "./KeyPagesSection";
import {
  ConfirmDeleteButton,
  EmptyListNote,
  FormActions,
  listClass,
  Provenance,
  RowActions,
  SectionHeader,
  projectContextQueryKey,
  useContextUpdate,
  type ProjectContextData,
} from "./shared";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RefreshButton } from "@/client/components/RefreshButton";
import { SECTION_HINTS, SECTION_PLACEHOLDERS } from "./sectionCopy";
import { SectionCompleteness } from "./SectionCompleteness";

export function ProjectContextPage({
  projectId,
  projectName,
  domain,
}: {
  projectId: string;
  projectName: string;
  domain?: string | null;
}) {
  const contextQuery = useQuery({
    queryKey: projectContextQueryKey(projectId),
    queryFn: () => getProjectContext({ data: { projectId } }),
    // This page exists to inspect what agents just wrote; the app-wide
    // 5-minute staleTime would show memory from before their turn as current.
    staleTime: 0,
  });

  if (contextQuery.isPending) {
    return (
      <div className="space-y-6" aria-busy>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="space-y-2">
            <div className="skeleton h-3 w-32" />
            <div className="skeleton h-20" />
          </div>
        ))}
      </div>
    );
  }

  // Not pending and no data means the first load failed. A failed background
  // refetch keeps the data, and must not unmount the form and its drafts.
  const context = contextQuery.data;
  if (!context) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          error={contextQuery.error}
          onRetry={() => void contextQuery.refetch()}
          title="Proje bilgisi yüklenemedi"
        />
      </div>
    );
  }

  return (
    // key remounts the whole page when the project switches under it, so no
    // draft, open form, or edit state can carry over to another project.
    <div key={projectId} className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-prose text-sm text-muted">
          Claude Code ve bağladığınız diğer MCP istemcilerinin bu proje hakkında
          bildikleri. Ajanlar işe başlamadan önce burayı okur, öğrendiklerini
          buraya yazar. Yanlış bir şey görürseniz kendiniz düzeltin.
        </p>
        <RefreshButton
          onRefresh={() => void contextQuery.refetch()}
          isFetching={contextQuery.isFetching}
          dataUpdatedAt={contextQuery.dataUpdatedAt}
          shortcut
        />
      </div>

      <SectionCompleteness context={context} />

      <ContextHealthCard projectId={projectId} context={context} />

      <FillWithAgentCard
        projectName={projectName}
        projectId={projectId}
        domain={domain}
        missingSections={context.missingSections}
        competitorCount={context.competitors.length}
        keyPageCount={context.keyPages.length}
      />

      <ProseSections
        projectId={projectId}
        sections={context.sections}
        missingSections={context.missingSections}
      />

      <CompetitorsSection
        projectId={projectId}
        competitors={context.competitors}
      />

      <KeyPagesSection projectId={projectId} keyPages={context.keyPages} />

      <CustomSections
        projectId={projectId}
        customSections={context.customSections}
      />

      <ResearchLog projectId={projectId} researchLog={context.researchLog} />
    </div>
  );
}

function ProseSections({
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

  const draftOf = (key: ProjectContextSectionKey) =>
    drafts[key] ?? stored.get(key)?.content ?? "";

  // Content is trimmed server-side, so compare trimmed values — otherwise a
  // stray newline leaves the form permanently "unsaved".
  const changed = PROJECT_CONTEXT_SECTION_KEYS.filter(
    (key) => draftOf(key).trim() !== (stored.get(key)?.content ?? ""),
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (update.isPending || changed.length === 0) return;
    update.mutate(
      changed.map((key) => ({ section: key, content: draftOf(key).trim() })),
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
              Object.entries(current).filter(
                ([key, value]) => value.trim() !== (saved.get(key) ?? ""),
              ),
            ),
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {missingSections.length === PROJECT_CONTEXT_SECTION_KEYS.length ? (
        <EmptyListNote>
          Henüz hiçbir şey yazılmamış. Elinizden geldiğince doldurun, ya da
          bağladığınız ajandan sitenizden bir taslak çıkarmasını isteyip
          doğruluğunu onaylayın.
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
                {PROJECT_CONTEXT_SECTION_LABELS[key]}
              </label>
              {section ? (
                <Provenance by={section.updatedBy} at={section.updatedAt} />
              ) : (
                <span className="badge badge-sm border-warning/30 bg-warning/10 text-[var(--ink-warning)]">
                  Boş
                </span>
              )}
            </div>
            <p className="text-xs text-muted">{SECTION_HINTS[key]}</p>
            <textarea
              id={`context-${key}`}
              value={draftOf(key)}
              onChange={(event) => {
                const value = event.target.value;
                setDrafts((current) => {
                  // A draft that matches the store is no draft at all — drop
                  // it so an edit typed and then undone doesn't pin the
                  // section against later agent writes.
                  if (value === (stored.get(key)?.content ?? "")) {
                    const { [key]: _dropped, ...rest } = current;
                    return rest;
                  }
                  return { ...current, [key]: value };
                });
              }}
              rows={4}
              maxLength={PROSE_MAX_CHARS}
              placeholder={SECTION_PLACEHOLDERS[key]}
              className="textarea textarea-bordered w-full text-sm"
            />
          </div>
        );
      })}

      <div className="flex items-center justify-end gap-3">
        {changed.length > 0 ? (
          <p className="text-xs text-muted" role="status">
            {formatCount(changed.length)} bölüm kaydedilmedi
          </p>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={update.isPending || changed.length === 0}
        >
          Değişiklikleri kaydet
        </button>
      </div>
    </form>
  );
}

function CustomSections({
  projectId,
  customSections,
}: {
  projectId: string;
  customSections: ProjectContextData["customSections"];
}) {
  const update = useContextUpdate(projectId);
  const [editingSlug, setEditingSlug] = React.useState<string | null>(null);

  return (
    <section className="space-y-3">
      <SectionHeader
        title="Özel bölümler"
        hint="Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey."
      />

      {customSections.length === 0 ? (
        <EmptyListNote>
          Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey
          öğrendiklerinde buraya bir bölüm ekler.
        </EmptyListNote>
      ) : (
        <div className="space-y-3">
          {customSections.map((custom) =>
            editingSlug === custom.slug ? (
              <CustomSectionForm
                key={custom.slug}
                custom={custom}
                pending={update.isPending}
                onCancel={() => setEditingSlug(null)}
                onSave={(title, content) =>
                  update.mutate(
                    [{ customSection: custom.slug, title, content }],
                    { onSuccess: () => setEditingSlug(null) },
                  )
                }
              />
            ) : (
              <div
                key={custom.slug}
                className="space-y-2 rounded-box border border-base-300 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">
                      {custom.title ?? custom.slug}
                    </h3>
                    <Provenance by={custom.updatedBy} at={custom.updatedAt} />
                  </div>
                  <RowActions>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs"
                      aria-label={`${custom.title ?? custom.slug} bölümünü düzenle`}
                      onClick={() => setEditingSlug(custom.slug)}
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <ConfirmDeleteButton
                      label={`${custom.title ?? custom.slug} bölümünü sil`}
                      pending={update.isPending}
                      onConfirm={() =>
                        update.mutate([{ deleteCustomSection: custom.slug }])
                      }
                    />
                  </RowActions>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted">
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
  onSave: (title: string, content: string) => void;
}) {
  const [title, setTitle] = React.useState(custom.title ?? "");
  const [content, setContent] = React.useState(custom.content);

  return (
    <form
      className="space-y-2 rounded-box border border-base-300 bg-base-200/40 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (pending || !content.trim()) return;
        onSave(title.trim() || custom.slug, content);
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={custom.slug}
        maxLength={120}
        className="input input-bordered input-sm w-full"
        aria-label="Bölüm başlığı"
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={5}
        maxLength={PROSE_MAX_CHARS}
        className="textarea textarea-bordered w-full text-sm"
        aria-label="Bölüm içeriği"
      />
      <FormActions
        pending={pending}
        disabled={!content.trim()}
        onCancel={onCancel}
      />
    </form>
  );
}

function ResearchLog({
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
        title="Araştırma günlüğü"
        hint="Neye bakıldığının kaydı, aynı araştırmanın iki kez yapılmaması için."
      />

      {researchLog.length === 0 ? (
        <EmptyListNote>
          Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya
          yazar.
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
                  label={`${formatDate(entry.entryDate)} tarihli kaydı sil`}
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
