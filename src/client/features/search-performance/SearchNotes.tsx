import { t } from "@/shared/i18n";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { SearchAnnotation } from "@/shared/searchPerformanceView";
import { formatDate } from "@/client/lib/format";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  addSearchNote,
  deleteSearchNote,
  listSearchNotes,
} from "@/serverFunctions/searchPerformance";

export const ANNOTATION_KIND_LABEL: Record<SearchAnnotation["kind"], string> = {
  googleUpdate: "Google güncellemesi",
  audit: "Site denetimi",
  note: "Not",
};

export function annotationText(annotation: SearchAnnotation): string {
  if (annotation.kind === "audit") return t("Site denetimi tamamlandı");
  return annotation.label;
}

function dateRange(annotation: SearchAnnotation): string {
  return annotation.startDate === annotation.endDate
    ? formatDate(annotation.startDate)
    : `${formatDate(annotation.startDate)} – ${formatDate(annotation.endDate)}`;
}

/**
 * The numbered list under the chart (what each marker is), and the
 * operator's own notes: "new titles went live", "site was down". Notes are
 * stored locally and never leave the machine.
 */
export function SearchNotes({
  projectId,
  marks,
  defaultDate,
  floorDate,
  lastDate,
}: {
  projectId: string;
  marks: Array<{ n: number; annotation: SearchAnnotation }>;
  defaultDate: string;
  floorDate: string;
  lastDate: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(defaultDate);
  const [note, setNote] = React.useState("");
  const noteField = React.useRef<HTMLInputElement>(null);

  const all = useQuery({
    queryKey: ["searchNotes", projectId],
    queryFn: () => listSearchNotes({ data: { projectId } }),
    enabled: open,
  });

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["searchNotes", projectId] }),
      queryClient.invalidateQueries({
        queryKey: ["searchPerformanceView", projectId],
      }),
    ]);

  const add = useMutation({
    mutationFn: () =>
      addSearchNote({ data: { projectId, date, note: note.trim() } }),
    onSuccess: async () => {
      setNote("");
      await refresh();
      toast.success(t("Not eklendi"));
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Not eklenemedi"))),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteSearchNote({ data: { projectId, id } }),
    onSuccess: async () => {
      await refresh();
      toast.success(t("Not silindi"));
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Not silinemedi"))),
  });

  const shownIds = new Set(
    marks.flatMap((m) =>
      m.annotation.kind === "note" ? [m.annotation.id] : [],
    ),
  );
  const outside = (all.data ?? []).filter((n) => !shownIds.has(n.id));

  return (
    <div className="flex flex-col gap-2">
      {/* The marker key on the left, the one action on the right; on a
          phone the action goes under the list instead of floating beside it. */}
      <div className="flex flex-col items-start gap-x-4 gap-y-2 sm:flex-row sm:flex-wrap">
        {marks.length > 0 ? (
          <ol
            className="flex min-w-0 flex-1 flex-col gap-1 self-stretch"
            aria-label={t("Grafikteki işaretler")}
          >
            {marks.map(({ n, annotation }) => (
              <li
                key={`${annotation.kind}-${n}`}
                className="flex items-start gap-2"
              >
                {/* The dashed rule the chart draws, with its number: a
                    numbered circle read as a pagination control. */}
                <span
                  className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold tabular-nums ${
                    annotation.kind === "note"
                      ? "text-[var(--ink-primary)]"
                      : "text-base-content"
                  }`}
                >
                  <span
                    aria-hidden
                    className="inline-block h-3.5 border-l border-dashed border-current opacity-70"
                  />
                  {n}
                </span>
                <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  <span className="text-base-content">
                    {annotationText(annotation)}
                  </span>
                  {annotation.kind === "audit"
                    ? null
                    : ` · ${t(ANNOTATION_KIND_LABEL[annotation.kind])}`}
                  <span className="text-muted max-sm:block">
                    <span className="max-sm:hidden"> · </span>
                    {dateRange(annotation)}
                  </span>
                </span>
                {annotation.kind === "note" ? (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-square"
                    aria-label={t("Notu sil: {note}", {
                      note: annotation.label,
                    })}
                    disabled={remove.isPending}
                    onClick={() => remove.mutate(annotation.id)}
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </button>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
        {open ? null : (
          <button
            type="button"
            className="btn btn-ghost btn-xs gap-1 max-sm:-ml-2 sm:ml-auto"
            onClick={() => {
              setOpen(true);
              window.setTimeout(() => noteField.current?.focus(), 0);
            }}
          >
            <Plus className="size-3.5" aria-hidden />
            {t("Not ekle")}
          </button>
        )}
      </div>

      {open ? (
        <form
          className="flex flex-col gap-2 rounded-field border border-[var(--hairline)] p-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            if (note.trim()) add.mutate();
          }}
        >
          <label className="flex flex-col gap-1">
            <span>{t("Tarih")}</span>
            <input
              type="date"
              className="input input-sm w-full sm:w-40"
              value={date}
              min={floorDate}
              max={lastDate}
              required
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-1 self-stretch">
            <span>{t("Not")}</span>
            <input
              ref={noteField}
              type="text"
              className="input input-sm w-full"
              maxLength={280}
              required
              placeholder={t("Örnek: Yeni sayfa başlıkları yayına alındı")}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={add.isPending || !note.trim()}
            >
              {t("Notu ekle")}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setOpen(false)}
            >
              {t("Kapat")}
            </button>
          </div>
        </form>
      ) : null}

      {open && outside.length > 0 ? (
        <details>
          <summary className="cursor-pointer">
            {t("Bu dönemin dışındaki notlar ({count})", {
              count: outside.length,
            })}
          </summary>
          <ul className="mt-1 flex flex-col gap-1">
            {outside.map((n) => (
              <li key={n.id} className="flex items-start gap-2">
                <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  {formatDate(n.date)} · {n.note}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs btn-square"
                  aria-label={t("Notu sil: {note}", { note: n.note })}
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(n.id)}
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
