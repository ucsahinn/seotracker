import { t } from "@/shared/i18n";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/client/components/Skeleton";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  getBrandTerms,
  setBrandTerms,
} from "@/serverFunctions/searchPerformance";

/**
 * The brand terms: the operator's own words for the brand, with suggestions
 * from the domain and project name. Until terms are saved the suggestions
 * stand in for them (`effectiveBrandTerms`), and the screen, the report, the
 * to-do list and MCP all say the split is unconfirmed; this is where it is
 * confirmed or corrected.
 */
export function BrandTermsEditor({
  projectId,
  onSaved,
}: {
  projectId: string;
  onSaved?: () => void;
}) {
  const queryClient = useQueryClient();
  const current = useQuery({
    queryKey: ["brandTerms", projectId],
    queryFn: () => getBrandTerms({ data: { projectId } }),
  });
  const [draft, setDraft] = React.useState<string[] | null>(null);
  const [input, setInput] = React.useState("");
  const terms = draft ?? current.data?.terms ?? [];
  const suggestions = (current.data?.suggestions ?? []).filter(
    (s) => !terms.includes(s),
  );

  const save = useMutation({
    mutationFn: (next: string[]) =>
      setBrandTerms({ data: { projectId, terms: next } }),
    onSuccess: async (result) => {
      queryClient.setQueryData(["brandTerms", projectId], result);
      setDraft(null);
      await queryClient.invalidateQueries({
        queryKey: ["searchPerformanceView", projectId],
      });
      toast.success(t("Marka adları kaydedildi"));
      onSaved?.();
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(error, t("Marka adları kaydedilemedi")),
      ),
  });

  const addTerm = (value: string) => {
    const term = value.trim().toLowerCase();
    if (term.length < 2 || terms.includes(term)) return;
    setDraft([...terms, term]);
  };

  if (current.isPending) return <Skeleton variant="form" rows={1} />;

  const dirty = draft !== null;
  // Nothing confirmed yet: the domain's suggestions stand in, and say so.
  const unconfirmed =
    !dirty &&
    (current.data?.terms.length ?? 0) === 0 &&
    (current.data?.suggestions.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-3 rounded-box border border-[var(--hairline)] p-3">
      {unconfirmed ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-field bg-base-200/60 px-3 py-2 text-sm">
          <span>
            <span className="font-medium">{t("Onaylanmadı.")}</span>{" "}
            <span className="text-muted">
              {t("Alan adından önerilen adlar: {terms}.", {
                terms: (current.data?.suggestions ?? []).join(", "),
              })}
            </span>
          </span>
          <button
            type="button"
            className="btn btn-sm"
            disabled={save.isPending}
            onClick={() => save.mutate(current.data?.suggestions ?? [])}
          >
            {t("Önerileri onayla")}
          </button>
        </div>
      ) : null}
      <p className="text-sm text-muted">
        {t(
          "Sitenizin adını ve insanların onu nasıl yazdığını girin. Bu kelimeleri içeren aramalar marka araması sayılır.",
        )}
      </p>
      {terms.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5" aria-label={t("Marka adları")}>
          {terms.map((term) => (
            <li
              key={term}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--control-border)] py-0.5 pl-3 pr-1 text-sm"
            >
              {term}
              <button
                type="button"
                className="btn btn-ghost btn-xs btn-circle"
                aria-label={t("{term} adını kaldır", { term })}
                onClick={() => setDraft(terms.filter((v) => v !== term))}
              >
                <X className="size-3" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          addTerm(input);
          setInput("");
        }}
      >
        <input
          type="text"
          className="input input-sm min-w-0 flex-1"
          maxLength={80}
          value={input}
          aria-label={t("Marka adı ekle")}
          placeholder={t("Örnek: örnek site")}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-sm"
          disabled={input.trim().length < 2}
        >
          {t("Ekle")}
        </button>
      </form>
      {suggestions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted">{t("Öneriler:")}</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-[var(--control-border)] px-2.5 py-0.5 hover:bg-base-200/60"
              onClick={() => addTerm(s)}
            >
              <Plus className="size-3" aria-hidden />
              {s}
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex justify-end gap-2">
        {dirty ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setDraft(null)}
          >
            {t("Vazgeç")}
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={!dirty || save.isPending}
          onClick={() => save.mutate(terms)}
        >
          {t("Kaydet")}
        </button>
      </div>
    </div>
  );
}
