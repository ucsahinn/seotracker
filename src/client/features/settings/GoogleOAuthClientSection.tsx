import { Skeleton } from "@/client/components/Skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { CopyButton } from "@/client/components/CopyButton";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import {
  clearGoogleOAuthClient,
  saveGoogleOAuthClient,
} from "@/serverFunctions/googleOAuthClient";
import { getLocale, t } from "@/shared/i18n";
import { fillParts } from "./fillParts";
import { SectionHeaderRow } from "./SectionBadge";
import {
  activeCredentialNote,
  activeGoogleCredential,
  oauthClientBadge,
  unreadableBadge,
} from "./sectionStatus";
import {
  googleOAuthClientStatusOptions,
  googleServiceAccountStatusOptions,
} from "./settingsQueries";
import { useOrigin } from "./useOrigin";
import { CLIENT_ID_SUFFIX, clientIdProblem } from "./googleClientId";

const CONSOLE_URL = "https://console.cloud.google.com/apis/credentials";
const STATUS_KEY = googleOAuthClientStatusOptions().queryKey;

/**
 * Where the Google OAuth client is entered.
 *
 * These credentials used to live in the environment, which meant editing a
 * file and recreating the container to change them. They belong to this
 * install, so this is where they are set — the secret goes to the server, is
 * encrypted there, and never comes back.
 */
export function GoogleOAuthClientSection() {
  const queryClient = useQueryClient();
  const [clientId, setClientId] = React.useState("");
  const [clientSecret, setClientSecret] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [confirmingClear, setConfirmingClear] = React.useState(false);
  // Shown only once the field was left, so the first characters of a valid id
  // are not met with an error while typing.
  const [idTouched, setIdTouched] = React.useState(false);

  const statusQuery = useQuery(googleOAuthClientStatusOptions());
  const status = statusQuery.data;
  const serviceAccountQuery = useQuery(googleServiceAccountStatusOptions());

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
    // Every Google connection card reads whether an OAuth client exists.
    await queryClient.invalidateQueries({ queryKey: ["gscConnection"] });
    await queryClient.invalidateQueries({ queryKey: ["ga4Connection"] });
  };

  const save = useMutation({
    mutationFn: () =>
      saveGoogleOAuthClient({ data: { clientId, clientSecret } }),
    onSuccess: async () => {
      setClientSecret("");
      setEditing(false);
      await invalidate();
      toast.success(t("Google erişim anahtarı kaydedildi"));
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t(
            "Google erişim anahtarı kaydedilemedi. Değerleri kontrol edip tekrar deneyin.",
          ),
        ),
      ),
  });

  const clear = useMutation({
    mutationFn: () => clearGoogleOAuthClient(),
    onSuccess: async () => {
      setClientId("");
      setClientSecret("");
      setEditing(false);
      setConfirmingClear(false);
      await invalidate();
      toast.success(t("Google erişim anahtarı silindi"));
    },
    onError: (error) => {
      setConfirmingClear(false);
      toast.error(
        getStandardErrorMessage(
          error,
          t("Google erişim anahtarı silinemedi. Tekrar deneyin."),
        ),
      );
    },
  });

  /*
   * The redirect URI Google must be given, shown rather than described.
   * `redirect_uri_mismatch` is the setup's most common failure and the only
   * input the operator cannot guess: it has to match this install's origin
   * exactly, and the app is the only thing that knows what that is.
   */
  /*
   * Both of them. The app has two callbacks -- Search Console and Analytics
   * -- and this section used to print only the Search Console one, so an
   * operator who registered exactly what the page showed got Google's
   * "Erişim engellendi / 400" the moment they tried to connect Analytics.
   * The page is the only thing that knows this install's origin, so it has
   * to name every URI Google will be sent.
   */
  const origin = useOrigin();
  const redirectUris = [
    { label: "Search Console", value: `${origin}/api/gsc/oauth/callback` },
    { label: "Analytics", value: `${origin}/api/ga4/oauth/callback` },
  ];

  const stored = status?.source === "settings";
  const fromEnvironment = status?.source === "environment";
  /*
   * The environment case used to hide the form, while the notice below said
   * "buraya bir değer kaydederseniz o kullanılır": a promise with no field to
   * keep it in. Only the loading state hides it now.
   */
  const credentialNote =
    status?.source && !serviceAccountQuery.isPending
      ? activeCredentialNote(
          "oauth",
          activeGoogleCredential(status, serviceAccountQuery.data),
        )
      : null;
  const showForm = !statusQuery.isPending && (editing || !stored);
  const idProblem = clientIdProblem(clientId);
  const canSave =
    clientId.trim() !== "" && idProblem === null && clientSecret.trim() !== "";

  return (
    <section id="google" className="scroll-mt-16 space-y-3">
      <SectionHeaderRow
        badge={
          statusQuery.isError ? unreadableBadge() : oauthClientBadge(status)
        }
      >
        <h2 className="text-base font-semibold">{t("Google bağlantısı")}</h2>
      </SectionHeaderRow>
      {credentialNote ? (
        <p className="text-xs font-medium text-muted">{credentialNote}</p>
      ) : null}

      <p className="text-sm text-muted">
        {t(
          "Uygulama Google'a sizin adınıza bağlanır. Bunun için Google'dan aldığınız erişim anahtarını (OAuth client ID) buraya girin. Gizli kısmı şifrelenir ve bir daha tarayıcıya gönderilmez. Search Console ve Analytics aynı anahtarı kullanır.",
        )}
      </p>

      <ol className="list-decimal space-y-4 pl-5 text-sm marker:text-subtle">
        <li className="pl-1">
          {fillParts(
            t("{console}'da bir OAuth client oluşturun (tür: {type})."),
            {
              console: (
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
                >
                  <span lang="en">Google Cloud Console</span>
                  <ExternalLink className="size-3" />
                </a>
              ),
              type: <span lang="en">Web application</span>,
            },
          )}
        </li>
        <li className="space-y-2 pl-1">
          <p>
            {fillParts(t("Şu iki adresi {field} alanına ekleyin."), {
              // Turkish adds Google's English name, which is what the
              // console shows; in English that name is the field itself.
              field:
                getLocale() === "en" ? (
                  <strong lang="en">Authorized redirect URIs</strong>
                ) : (
                  <>
                    {/* i18n-ignore: the Turkish branch of a locale switch */}
                    <strong>Yetkili yönlendirme adresleri</strong> (
                    <span lang="en">Authorized redirect URIs</span>)
                  </>
                ),
            })}
          </p>
          <p className="text-xs text-muted">
            {fillParts(
              t(
                "Adresler harfi harfine aynı olmalı, aksi halde Google {code} hatası verir. İkisini de ekleyin: biri Search Console, biri Analytics için.",
              ),
              { code: <code>redirect_uri_mismatch</code> },
            )}
          </p>
          <div className="space-y-2 rounded-box border border-base-300 bg-base-200/40 p-3">
            {redirectUris.map((uri) => (
              <div
                key={uri.value}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <code className="min-w-0 truncate font-mono text-sm text-muted">
                  {uri.value}
                </code>
                <CopyButton
                  value={uri.value}
                  successMessage={t("{service} yönlendirme adresi kopyalandı", {
                    service: uri.label,
                  })}
                />
              </div>
            ))}
          </div>
        </li>
        <li className="pl-1">
          {t("Kimliği ve gizli anahtarı aşağıya yazın.")}
        </li>
      </ol>

      {statusQuery.isPending ? <Skeleton variant="form" rows={2} /> : null}

      {statusQuery.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          {t("Google erişim anahtarının durumu okunamadı.")}{" "}
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
            <p className="font-medium">{t("Ortam değişkenlerinden geliyor")}</p>
            <p className="text-muted">
              {fillParts(
                t(
                  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.",
                ),
                {
                  id: <code>GOOGLE_CLIENT_ID</code>,
                  secret: <code>GOOGLE_CLIENT_SECRET</code>,
                },
              )}
            </p>
          </div>
        </div>
      ) : null}

      {stored && !editing ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-base-300 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-success" />
            <span
              className="truncate font-mono text-sm"
              title={status?.clientId ?? undefined}
            >
              {status?.clientId}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                setClientId(status?.clientId ?? "");
                setEditing(true);
              }}
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
              {t("İstemci kimliği")}
            </span>
            <span className="block text-xs text-muted">
              {t(
                "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.",
                { suffix: CLIENT_ID_SUFFIX },
              )}
            </span>
            <input
              type="text"
              autoComplete="off"
              spellCheck={false}
              className="input input-bordered w-full font-mono text-sm"
              placeholder="1234567890-abc.apps.googleusercontent.com"
              value={clientId}
              aria-invalid={idTouched && idProblem !== null}
              aria-describedby={
                idTouched && idProblem ? "client-id-problem" : undefined
              }
              onChange={(event) => setClientId(event.target.value)}
              onBlur={() => setIdTouched(true)}
            />
            {idTouched && idProblem ? (
              <span
                id="client-id-problem"
                role="alert"
                className="mt-1 block text-xs text-[var(--ink-error)]"
              >
                {idProblem}
              </span>
            ) : null}
          </label>

          <label className="block w-full space-y-1.5">
            <span className="block text-sm font-medium">
              {t("Gizli anahtar")}
            </span>
            <span className="block text-xs text-muted">
              {t(
                "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.",
              )}
            </span>
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              className="input input-bordered w-full font-mono text-sm"
              placeholder="GOCSPX-..."
              value={clientSecret}
              onChange={(event) => setClientSecret(event.target.value)}
            />
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={!canSave || save.isPending}
            >
              {t("Kaydet")}
            </button>
            {editing ? (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setEditing(false);
                  setClientSecret("");
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
          title={t("Google erişim anahtarı silinsin mi?")}
          detail={t(
            "Kimlik ve gizli anahtar bu kurulumdan silinir. Mevcut Search Console ve Analytics bağlantıları yerinde kalır ama anahtar yeniden girilene kadar çalışmaz.",
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
