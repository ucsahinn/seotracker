import { Pencil, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import {
  resolveTagColor,
  TAG_COLOR_KEYS,
  tagSwatchClass,
  type TagColorKey,
} from "@/shared/tag-colors";
import type { SavedKeywordTagSummary } from "@/types/keywords";
import { t } from "@/shared/i18n";

// The palette keys are English identifiers; screen readers should hear the
// colour, not the token. Turkish source text, translated where it renders.
const COLOR_LABELS: Record<TagColorKey, string> = {
  slate: "Gri",
  rose: "Pembe",
  amber: "Turuncu",
  lime: "Fıstık yeşili",
  emerald: "Yeşil",
  sky: "Mavi",
  violet: "Mor",
  fuchsia: "Fuşya",
};

export function ManageTagRow({
  tag,
  isBusy,
  onSave,
  onDelete,
  onCancel,
}: {
  tag: SavedKeywordTagSummary;
  isBusy: boolean;
  onSave: (input: { name?: string; color?: TagColorKey | null }) => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const nameId = useId();
  const colorLabelId = useId();
  const [name, setName] = useState(tag.name);
  const currentColor = resolveTagColor(tag);
  const [color, setColor] = useState<TagColorKey>(currentColor);
  const nameChanged = name.trim() !== tag.name && name.trim().length > 0;
  const colorChanged = color !== currentColor;
  const canSave = (nameChanged || colorChanged) && !isBusy;
  // Deleting a tag strips it from every keyword that carries it, with no undo,
  // so the first click only asks.
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const save = () =>
    onSave({
      name: nameChanged ? name.trim() : undefined,
      color: colorChanged ? color : undefined,
    });

  return (
    <div className="space-y-2 border-y border-base-300 bg-base-200/40 px-3 py-2.5">
      <div className="space-y-1">
        <label htmlFor={nameId} className="text-xs font-semibold text-muted">
          {t("Yeniden adlandır")}
        </label>
        <div className="flex items-center gap-1.5">
          <Pencil className="size-3 opacity-50" aria-hidden />
          <input
            id={nameId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (canSave) save();
              } else if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
              }
            }}
            className="min-w-0 flex-1 rounded-field border border-base-300 bg-base-100 px-2 py-1 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-1">
        <span id={colorLabelId} className="text-xs font-semibold text-muted">
          {t("Renk")}
        </span>
        <div
          role="group"
          aria-labelledby={colorLabelId}
          className="flex flex-wrap items-center gap-1.5"
        >
          {TAG_COLOR_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              aria-label={t(COLOR_LABELS[key])}
              aria-pressed={color === key}
              className={`size-6 rounded-full transition ${tagSwatchClass(key)} ${
                color === key
                  ? "ring-2 ring-offset-2 ring-offset-base-200 ring-base-content/40"
                  : "hover:scale-110"
              }`}
              onClick={() => setColor(key)}
            />
          ))}
        </div>
      </div>

      {confirmingDelete ? (
        <div role="alert" className="space-y-2 pt-1">
          <p className="text-xs text-muted">
            {t("Etiket kalıcı olarak silinir. Kelimelere dokunulmaz.")}
          </p>
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              className="btn btn-xs"
              onClick={() => setConfirmingDelete(false)}
              disabled={isBusy}
              autoFocus
            >
              {t("Vazgeç")}
            </button>
            <button
              type="button"
              className="btn btn-error btn-xs"
              onClick={onDelete}
              disabled={isBusy}
            >
              {t("Etiketi sil")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-[var(--ink-error)] hover:underline disabled:opacity-50"
            onClick={() => setConfirmingDelete(true)}
            disabled={isBusy}
          >
            <Trash2 className="size-3" />
            {t("Sil")}
          </button>
          <div className="flex items-center gap-1.5">
            <button type="button" className="btn btn-xs" onClick={onCancel}>
              {t("Vazgeç")}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-xs"
              disabled={!canSave}
              onClick={save}
            >
              {t("Kaydet")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
