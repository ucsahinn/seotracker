import { UNKEYED_LIGHTHOUSE_PAGE_CAP } from "@/shared/audit-limits";
import { Skeleton } from "@/client/components/Skeleton";
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
import { t } from "@/shared/i18n";
import { fillParts } from "./fillParts";
import { PageSpeedKeyTest } from "./PageSpeedKeyTest";
import { SectionHeaderRow } from "./SectionBadge";
import { pageSpeedBadge, unreadableBadge } from "./sectionStatus";
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
  const [keyRevision, setKeyRevision] = React.useState(0);
  const [key, setKey] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [confirmingClear, setConfirmingClear] = React.useState(false);

  const statusQuery = useQuery(pageSpeedKeyStatusOptions());
  const status = statusQuery.data;
  const stored = status?.source === "settings";
  const fromEnvironment = status?.source === "environment";
  const showForm =
    !statusQuery.isPending && (editing || (!statusQuery.isError && !stored));

  const save = useMutation({
    mutationFn: () => savePageSpeedKey({ data: { key } }),
    onSuccess: async () => {
      setKey("");
      setKeyRevision((value) => value + 1);
      setEditing(false);
      await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
      toast.success(t("PageSpeed anahtarı kaydedildi"));
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t(
            "PageSpeed anahtarı kaydedilemedi. Anahtarı kontrol edip tekrar deneyin.",
          ),
        ),
      ),
  });

  const clear = useMutation({
    mutationFn: () => clearPageSpeedKey(),
    onSuccess: async () => {
      setKey("");
      setKeyRevision((value) => value + 1);
      setEditing(false);
      setConfirmingClear(false);
      await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
      toast.success(t("PageSpeed anahtarı silindi"));
    },
    onError: (error) => {
      setConfirmingClear(false);
      toast.error(
        getStandardErrorMessage(
          error,
          t("PageSpeed anahtarı silinemedi. Tekrar deneyin."),
        ),
      );
    },
  });

  const canSave = key.trim().length > 0 && !save.isPending;

  return (
    <section id="hiz-olcumu" className="scroll-mt-16 space-y-3">
      <SectionHeaderRow
        badge={statusQuery.isError ? unreadableBadge() : pageSpeedBadge(status)}
      >
        <h2 className="text-base font-semibold">{t("Hız ölçümü")}</h2>
      </SectionHeaderRow>

      <p className="text-sm text-muted">
        {t(
          "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.",
          { count: UNKEYED_LIGHTHOUSE_PAGE_CAP },
        )}{" "}
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

      {statusQuery.isPending ? <Skeleton variant="form" rows={1} /> : null}

      {statusQuery.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          {t("Anahtar durumu okunamadı.")}{" "}
          <button
            type="button"
            className="link"
            onClick={() => void statusQuery.refetch()}
          >
            {t("Tekrar dene")}
          </button>
        </p>
      ) : null}

      {fromEnvironment ? (
        <div className="alert alert-info items-start text-sm">
          <div className="space-y-1">
            <p className="font-medium">{t("Ortam değişkeninden geliyor")}</p>
            <p className="text-muted">
              {fillParts(
                t(
                  "{name} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.",
                ),
                { name: <code>PAGESPEED_API_KEY</code> },
              )}
            </p>
          </div>
        </div>
      ) : null}

      {(stored && !editing) || fromEnvironment ? (
        <PageSpeedKeyTest
          key={`${keyRevision}:${status?.updatedAt ?? status?.source}`}
        />
      ) : null}

      {stored && !editing ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-base-300 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-success" />
            {/* The key itself never leaves the server, so there is nothing to
                show here but the fact that one is stored. */}
            <span className="truncate text-sm">{t("Anahtar kayıtlı")}</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setEditing(true)}
            >
              {t("Değiştir")}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost text-[var(--ink-error)]"
              disabled={clear.isPending}
              onClick={() => setConfirmingClear(true)}
            >
              {t("Sil")}
            </button>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (canSave) save.mutate();
          }}
        >
          <label className="block w-full space-y-1.5">
            <span className="block text-sm font-medium">
              {t("API anahtarı")}
            </span>
            <span className="block text-xs text-muted">
              {t(
                "Google Cloud Console → Credentials → Create credentials → API key. Önce aynı projede PageSpeed Insights API'sini etkinleştirin, yoksa anahtar 403 hatası verir.",
              )}
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
              {t("Kaydet")}
            </button>
            {editing ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setKey("");
                  setKeyRevision((value) => value + 1);
                  setEditing(false);
                }}
              >
                {t("Vazgeç")}
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
      {confirmingClear ? (
        <ConfirmDeleteModal
          title={t("PageSpeed anahtarı silinsin mi?")}
          detail={t(
            "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.",
          )}
          confirmLabel={t("Anahtarı sil")}
          isPending={clear.isPending}
          onClose={() => setConfirmingClear(false)}
          onConfirm={() => clear.mutate()}
        />
      ) : null}
    </section>
  );
}
