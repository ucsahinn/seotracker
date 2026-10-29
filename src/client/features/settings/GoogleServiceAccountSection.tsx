import { FactStrip } from "@/client/components/FactStrip";
import { invalidateGoogleCredentials } from "@/client/features/integrations/invalidateGoogleCredentials";
import { formatDateTime } from "@/client/lib/format";
import { Skeleton } from "@/client/components/Skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { CopyButton } from "@/client/components/CopyButton";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import {
  clearGoogleServiceAccount,
  saveGoogleServiceAccount,
} from "@/serverFunctions/googleServiceAccount";
import { t } from "@/shared/i18n";
import { fillParts } from "./fillParts";
import { SectionHeaderRow } from "./SectionBadge";
import {
  activeCredentialNote,
  activeGoogleCredential,
  serviceAccountBadge,
  unreadableBadge,
} from "./sectionStatus";
import {
  googleOAuthClientStatusOptions,
  googleServiceAccountStatusOptions,
} from "./settingsQueries";

const SERVICE_ACCOUNT_URL =
  "https://console.cloud.google.com/iam-admin/serviceaccounts";

/**
 * The shorter way to connect Google.
 *
 * The OAuth client above needs a consent screen, a test-user entry and a
 * redirect URI that has to match byte for byte — three steps that exist to
 * let a person sign in, and a self-hosted install has no person to sign in.
 * A service account skips all three: create it, download the key, paste it
 * here, then add its email to the property in Search Console the way you
 * would add a colleague.
 */
export function GoogleServiceAccountSection() {
  const queryClient = useQueryClient();
  const [keyJson, setKeyJson] = React.useState("");
  const fileInput = React.useRef<HTMLInputElement>(null);
  const secret = React.useRef("");
  const fileGeneration = React.useRef(0);
  const [hasFile, setHasFile] = React.useState(false);
  React.useEffect(
    () => () => {
      secret.current = "";
      fileGeneration.current++;
    },
    [],
  );
  const [editing, setEditing] = React.useState(false);
  const [confirmingClear, setConfirmingClear] = React.useState(false);
  const [keyError, setKeyError] = React.useState<string | null>(null);

  const statusQuery = useQuery(googleServiceAccountStatusOptions());
  const status = statusQuery.data;
  const stored = Boolean(status?.clientEmail);
  const oauthQuery = useQuery(googleOAuthClientStatusOptions());

  const invalidate = () => invalidateGoogleCredentials(queryClient);

  const save = useMutation({
    mutationFn: () =>
      saveGoogleServiceAccount({
        data: { keyJson: secret.current || keyJson },
      }),
    onSuccess: async (result) => {
      // A malformed key comes back as a value so the reason survives the trip.
      // Shown under the secret field, not toasted: the reason names what is
      // wrong with the pasted file, and it should stay beside it.
      if (!result.ok) {
        setKeyError(result.reason);
        return;
      }
      setKeyJson("");
      secret.current = "";
      fileGeneration.current++;
      setHasFile(false);
      if (fileInput.current) fileInput.current.value = "";
      setEditing(false);
      await invalidate();
      toast.success(t("Hizmet hesabı kaydedildi"));
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t("Hizmet hesabı kaydedilemedi. Tekrar deneyin."),
        ),
      ),
  });

  const clear = useMutation({
    mutationFn: () => clearGoogleServiceAccount(),
    onSuccess: async () => {
      setKeyJson("");
      secret.current = "";
      fileGeneration.current++;
      setHasFile(false);
      if (fileInput.current) fileInput.current.value = "";
      setEditing(false);
      setConfirmingClear(false);
      await invalidate();
      /*
       * Not "revoked". Deleting the key here stops this install using it,
       * but an access token already minted from it stays valid at Google
       * for up to an hour and the token cache is per worker isolate, so
       * clearing it does not reach every copy. If the key is compromised
       * rather than merely unwanted, the only thing that actually revokes
       * it is deleting it in Google Cloud - and the toast should not imply
       * otherwise.
       */
      toast.success(
        t(
          "Hizmet hesabı bu kurulumdan silindi. Anahtarı gerçekten iptal etmek için Google Cloud'dan da silin.",
        ),
      );
    },
    onError: (error) => {
      setConfirmingClear(false);
      toast.error(
        getStandardErrorMessage(
          error,
          t("Hizmet hesabı silinemedi. Tekrar deneyin."),
        ),
      );
    },
  });

  // Not while loading: the empty form flashed up before a stored account
  // replaced it.
  const showForm =
    !statusQuery.isPending && (editing || (!statusQuery.isError && !stored));

  return (
    <section id="hizmet-hesabi" className="scroll-mt-16 space-y-3">
      <SectionHeaderRow
        badge={
          statusQuery.isError ? unreadableBadge() : serviceAccountBadge(status)
        }
      >
        <h2 className="text-base font-semibold">
          {t("Hizmet hesabı (daha kısa yol)")}
        </h2>
      </SectionHeaderRow>
      {status?.updatedAt ? (
        <FactStrip
          label={t("Kaynak")}
          facts={[
            {
              label: t("Kaydedildi"),
              value: formatDateTime(status.updatedAt),
            },
          ]}
        />
      ) : null}

      {stored ? (
        <p className="text-xs font-medium text-muted">
          {statusQuery.isError
            ? t(
                "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.",
              )
            : activeCredentialNote(
                "service_account",
                activeGoogleCredential(oauthQuery.data, status),
              )}
        </p>
      ) : null}

      {statusQuery.isPending ? <Skeleton variant="form" rows={1} /> : null}

      {statusQuery.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          {t("Hizmet hesabı durumu okunamadı.")}{" "}
          <button
            type="button"
            className="link"
            onClick={() => void statusQuery.refetch()}
          >
            {t("Tekrar dene")}
          </button>
        </p>
      ) : null}

      {stored && !editing ? (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 rounded-box border border-[var(--hairline)] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-[var(--ink-success)]"
                aria-hidden
              />
              <span className="min-w-0 break-words font-mono text-sm">
                <BreakableEmail email={status?.clientEmail ?? ""} />
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <CopyButton
                value={status?.clientEmail ?? ""}
                successMessage={t("Hizmet hesabı adresi kopyalandı")}
              />
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

          {/* The step people forget: a stored key alone reaches nothing until
              the account is a user on the property. */}
          <details className="text-sm">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">
              {t("Mülk izinlerini ayarla")}
            </summary>
            <p className="max-w-prose text-sm text-muted">
              {fillParts(
                t(
                  "Bu adresi Search Console'da {path} ile mülkünüze ekleyin (yetki: {level}). Eklemeden veri gelmez. Analytics için de GA4 mülkünde {gaPath}'ne aynı adresi Görüntüleyen olarak ekleyin.",
                ),
                {
                  path: (
                    <strong>
                      {t("Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle")}
                    </strong>
                  ),
                  level: <strong>{t("Tam")}</strong>,
                  gaPath: <strong>{t("Yönetici → Erişim yönetimi")}</strong>,
                },
              )}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <code className="min-w-0 break-words font-mono text-sm text-muted">
                <BreakableEmail email={status?.clientEmail ?? ""} />
              </code>
              <CopyButton
                value={status?.clientEmail ?? ""}
                successMessage={t("Hizmet hesabı adresi kopyalandı")}
              />
            </div>
          </details>
        </div>
      ) : null}

      <ServiceAccountInstructions stored={stored} />

      {showForm ? (
        <div className="space-y-1.5">
          <label
            className="block text-sm font-medium"
            htmlFor="service-account-key"
          >
            {t("Hizmet hesabı dosyası (JSON)")}
          </label>
          <input
            ref={fileInput}
            type="file"
            accept=".json,application/json"
            className="file-input w-full"
            disabled={save.isPending}
            aria-label={t("Hizmet hesabı dosyası (JSON)")}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              const generation = ++fileGeneration.current;
              secret.current = "";
              setHasFile(false);
              setKeyJson("");
              setKeyError(null);
              if (!file) return;
              if (file.size > 100_000) {
                setKeyError(
                  t(
                    "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.",
                  ),
                );
                return;
              }
              try {
                const text = await file.text();
                if (generation !== fileGeneration.current) return;
                secret.current = text;
                setHasFile(true);
              } catch {
                if (generation === fileGeneration.current)
                  setKeyError(t("Dosya okunamadı. Dosyayı yeniden seçin."));
              }
            }}
          />
          <input
            id="service-account-key"
            type="password"
            autoComplete="off"
            spellCheck={false}
            className="input input-bordered w-full"
            disabled={save.isPending}
            value={keyJson}
            aria-label={t("JSON içeriğini gizli yapıştır")}
            placeholder={t("JSON içeriğini gizli yapıştır")}
            onChange={(event) => {
              setKeyJson(event.target.value);
              fileGeneration.current++;
              secret.current = "";
              setHasFile(false);
              setKeyError(null);
            }}
            aria-invalid={!!keyError}
            aria-describedby={
              keyError ? "service-account-key-error" : undefined
            }
          />
          {keyError ? (
            <p
              id="service-account-key-error"
              role="alert"
              className="text-xs text-[var(--ink-error)]"
            >
              {keyError}
            </p>
          ) : null}
          <div className="flex gap-2 pt-3.5">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={(!hasFile && keyJson.trim() === "") || save.isPending}
              onClick={() => save.mutate()}
            >
              {t("Kaydet")}
            </button>
            {stored || hasFile || keyJson ? (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setKeyJson("");
                  secret.current = "";
                  fileGeneration.current++;
                  setHasFile(false);
                  if (fileInput.current) fileInput.current.value = "";
                  setEditing(false);
                  setKeyError(null);
                }}
              >
                {t("Vazgeç")}
              </button>
            ) : null}
          </div>
          <p className="text-xs text-subtle">
            {t(
              "Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.",
            )}
          </p>
        </div>
      ) : null}
      {confirmingClear ? (
        <ConfirmDeleteModal
          title={t("Hizmet hesabı silinsin mi?")}
          detail={t(
            "JSON anahtarı bu kurulumdan silinir ve Search Console ile Analytics bu hesapla veri çekemez. Anahtarı Google tarafında da iptal etmek için Google Cloud'dan silmeniz gerekir.",
          )}
          confirmLabel={t("Hesabı sil")}
          isPending={clear.isPending}
          onClose={() => setConfirmingClear(false)}
          onConfirm={() => clear.mutate()}
        />
      ) : null}
    </section>
  );
}

/**
 * A service-account address is one long token. `break-all` split it every few
 * letters on a phone; this offers a line break only before "@" and after each
 * "." so it wraps at its natural seams.
 */
function BreakableEmail({ email }: { email: string }) {
  return email.split(/(?=@)|(?<=\.)/).map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <wbr /> : null}
      {part}
    </React.Fragment>
  ));
}

function ServiceAccountInstructions({ stored }: { stored: boolean }) {
  return (
    <details open={!stored}>
      <summary className="min-h-11 cursor-pointer py-3 text-sm">
        {t("Hizmet hesabı kurulum adımları")}
      </summary>
      <p className="text-sm text-muted">
        {t(
          "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.",
        )}{" "}
        <a
          href={SERVICE_ACCOUNT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        >
          {t("Hizmet hesapları")}
          <ExternalLink className="size-3" />
        </a>
      </p>
    </details>
  );
}
