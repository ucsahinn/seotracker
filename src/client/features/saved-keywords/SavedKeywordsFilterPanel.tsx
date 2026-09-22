import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { SavedKeywordsFilterForm } from "./useSavedKeywordsFilters";

export function SavedKeywordsFilterPanel({
  form,
  activeFilterCount,
  onReset,
}: {
  form: SavedKeywordsFilterForm;
  activeFilterCount: number;
  onReset: () => void;
}) {
  return (
    <div className="space-y-3 border-b border-base-300 bg-gradient-to-b from-base-100 to-base-200/30 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Sonuçları daralt</p>
          {activeFilterCount > 0 ? (
            <span className="badge badge-xs badge-primary border-0 text-primary-content">
              {activeFilterCount} etkin
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="btn btn-xs btn-ghost gap-1"
          onClick={onReset}
          disabled={activeFilterCount === 0}
        >
          <RotateCcw className="size-3" />
          Tümünü temizle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <TermsTokenInput
          form={form}
          name="include"
          label="İçersin"
          variant="include"
          placeholder="Şunu içermeli… örn. denetim"
        />
        <TermsTokenInput
          form={form}
          name="exclude"
          label="İçermesin"
          variant="exclude"
          placeholder="Şunu içermemeli… örn. iş ilanı"
        />
      </div>

      {/* Search volume, CPC and keyword difficulty were bought data. The
          columns they filtered are gone, so a range filter over them could
          only ever return nothing. */}
    </div>
  );
}

type TermsVariant = "include" | "exclude";

const VARIANT_STYLES: Record<
  TermsVariant,
  { icon: typeof Plus; chip: string; iconBg: string }
> = {
  include: {
    icon: Plus,
    chip: "tag-chip-emerald ring-1 ring-inset",
    iconBg: "tag-chip-emerald ring-1 ring-inset",
  },
  exclude: {
    icon: Minus,
    chip: "tag-chip-rose ring-1 ring-inset",
    iconBg: "tag-chip-rose ring-1 ring-inset",
  },
};

function splitTerms(value: string): string[] {
  return value
    .split(/[,+]/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function joinTerms(terms: string[]): string {
  return terms.join(", ");
}

function TermsTokenInput({
  form,
  name,
  label,
  variant,
  placeholder,
}: {
  form: SavedKeywordsFilterForm;
  name: "include" | "exclude";
  label: string;
  variant: TermsVariant;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <div className="space-y-2 rounded-box border border-base-300 bg-base-100 p-2.5">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex size-4 items-center justify-center rounded ${styles.iconBg}`}
        >
          <Icon className="size-2.5" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
      </div>
      <form.Field name={name}>
        {(field) => {
          const terms = splitTerms(field.state.value);
          const commit = (next: string[]) => {
            field.handleChange(joinTerms([...new Set(next)]));
          };
          const addFromDraft = () => {
            const parsed = splitTerms(draft);
            if (parsed.length > 0) {
              commit([...terms, ...parsed]);
              setDraft("");
            }
          };
          const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addFromDraft();
            } else if (
              event.key === "Backspace" &&
              draft.length === 0 &&
              terms.length > 0
            ) {
              commit(terms.slice(0, -1));
            }
          };
          return (
            <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-field border border-base-300 bg-base-200/30 px-2 py-1.5 focus-within:border-primary">
              {terms.map((term) => (
                <span
                  key={term}
                  className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${styles.chip}`}
                >
                  {term}
                  <button
                    type="button"
                    className="opacity-70 hover:opacity-100"
                    aria-label={`${term} terimini kaldır`}
                    onClick={() =>
                      commit(terms.filter((existing) => existing !== term))
                    }
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addFromDraft}
                placeholder={terms.length === 0 ? placeholder : ""}
                className="min-w-[6rem] flex-1 bg-transparent text-xs outline-none placeholder:text-muted"
              />
            </div>
          );
        }}
      </form.Field>
    </div>
  );
}
