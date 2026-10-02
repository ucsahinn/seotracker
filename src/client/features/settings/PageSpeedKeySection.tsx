import { HelpTip, SettingsHeading } from "@/client/components/HelpTip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  clearPageSpeedKey,
  savePageSpeedKey,
} from "@/serverFunctions/pagespeedKey";
import { PageSpeedKeyTest } from "./PageSpeedKeyTest";
import { SectionHeaderRow } from "./SectionBadge";
import { pageSpeedBadge, UNREADABLE } from "./sectionStatus";
import { pageSpeedKeyStatusOptions } from "./settingsQueries";

const KEY_URL =
  "https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com";
const STATUS_KEY = pageSpeedKeyStatusOptions().queryKey;

/**
 * Where the PageSpeed Insights key is entered.
 *
 * It used to be `PAGESPEED_API_KEY` in the environment, which meant editing a
 * file and recreating the container -- the one remaining piece of setup that
 * could not be done from inside the app. The key goes to the server, is
 * encrypted there, and never comes back.
 */
export function PageSpeedKeySection() {
  const queryClient = useQueryClient();
  const [key, setKey] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [confirmingClear, setConfirmingClear] = React.useState(false);

  const statusQuery = useQuery(pageSpeedKeyStatusOptions());
  const status = statusQuery.data;
  const stored = status?.source === "settings";
  const fromEnvironment = status?.source === "environment";
  const showForm = !stored || editing;

  const save = useMutation({
    mutationFn: () => savePageSpeedKey({ data: { key } }),
    onSuccess: async () => {
      setKey("");
      setEditing(false);
      await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
      toast.success("PageSpeed anahtarı kaydedildi");
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const clear = useMutation({
    mutationFn: () => clearPageSpeedKey(),
    onSuccess: async () => {
      setKey("");
      setEditing(false);
      setConfirmingClear(false);
      await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
      toast.success("PageSpeed anahtarı silindi");
    },
    onError: (error) => {
      setConfirmingClear(false);
      toast.error(getStandardErrorMessage(error));
    },
  });

  const canSave = key.trim().length > 0 && !save.isPending;

  return (
    <section id="hiz-olcumu" className="scroll-mt-16 space-y-3">
      <SectionHeaderRow
        badge={statusQuery.isError ? UNREADABLE : pageSpeedBadge(status)}
      >
        <SettingsHeading
          title="Hız ölçümü"
          help="Google Cloud Console'da PageSpeed Insights API'sini etkinleştirin, 'Credentials → Create credentials → API key' ile bir anahtar alın ve buraya yapıştırın. Ücretsiz. Anahtarsız da çalışır ama Google'ın anahtarsız kotası birkaç sayfadan sonra 429 döndürür."
        />
      </SectionHeaderRow>

      <p className="text-sm text-muted">
        Denetimin Lighthouse aşaması Google PageSpeed Insights&apos;ı kullanır.
        Anahtarsız da çalışır, ama Google&apos;ın anahtarsız kotası birkaç
        sayfadan sonra "çok fazla istek" (429) hatası verir; gerçek bir sitede
        hız ölçümünün büyük kısmı boş kalır. Anahtar ücretsiz.{" "}
        <a
          href={KEY_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        >
          PageSpeed Insights API
          <ExternalLink className="size-3" />
        </a>
      </p>

      {statusQuery.isPending ? <div className="skeleton h-10 w-full" /> : null}

      {statusQuery.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          Anahtar durumu okunamadı.{" "}
          <button
            type="button"
            className="link"
            onClick={() => void statusQuery.refetch()}
          >
            Tekrar dene
          </button>
        </p>
      ) : null}

      {fromEnvironment ? (
        <div className="alert alert-info items-start text-sm">
          <div className="space-y-1">
            <p className="font-medium">Ortam değişkeninden geliyor</p>
            <p className="text-muted">
              <code>PAGESPEED_API_KEY</code> ayarlanmış. Buraya bir değer
              kaydederseniz o kullanılır.
            </p>
          </div>
        </div>
      ) : null}

      {(stored && !editing) || fromEnvironment ? <PageSpeedKeyTest /> : null}

      {stored && !editing ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-base-300 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-success" />
            {/* The key itself never leaves the server, so there is nothing to
                show here but the fact that one is stored. */}
            <span className="truncate text-sm">Anahtar kayıtlı</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setEditing(true)}
            >
              Değiştir
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost text-[var(--ink-error)]"
              disabled={clear.isPending}
              onClick={() => setConfirmingClear(true)}
            >
              Sil
            </button>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (canSave) save.mutate();
          }}
        >
          <label className="form-control w-full">
            <span className="label-text flex items-center gap-1.5 text-sm">
              API anahtarı
              <HelpTip label="API anahtarı">
                Google Cloud Console → Credentials → Create credentials → API
                key. Önce aynı projede PageSpeed Insights API&apos;sini
                etkinleştirmeniz gerekir, yoksa anahtar 403 döndürür.
              </HelpTip>
            </span>
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              className="input input-bordered w-full font-mono text-sm"
              placeholder="AIza..."
              value={key}
              onChange={(event) => setKey(event.target.value)}
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={!canSave}
            >
              Kaydet
            </button>
            {editing ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setKey("");
                  setEditing(false);
                }}
              >
                Vazgeç
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
      {confirmingClear ? (
        <ConfirmDeleteModal
          title="PageSpeed anahtarı silinsin mi?"
          detail="Anahtar bu kurulumdan silinir; hız ölçümü Google'ın anahtarsız kotasına döner ve gerçek bir sitede çoğu zaman 429 ile yarım kalır. İstediğiniz zaman yeniden girebilirsiniz."
          confirmLabel="Anahtarı sil"
          isPending={clear.isPending}
          onClose={() => setConfirmingClear(false)}
          onConfirm={() => clear.mutate()}
        />
      ) : null}
    </section>
  );
}
