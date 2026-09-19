import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  clearGoogleOAuthClient,
  getGoogleOAuthClientStatus,
  saveGoogleOAuthClient,
} from "@/serverFunctions/googleOAuthClient";

const CONSOLE_URL = "https://console.cloud.google.com/apis/credentials";
const STATUS_KEY = ["googleOAuthClientStatus"] as const;

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

  const statusQuery = useQuery({
    queryKey: STATUS_KEY,
    queryFn: () => getGoogleOAuthClientStatus(),
  });
  const status = statusQuery.data;

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
      toast.success("Google istemcisi kaydedildi");
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const clear = useMutation({
    mutationFn: () => clearGoogleOAuthClient(),
    onSuccess: async () => {
      setClientId("");
      setClientSecret("");
      setEditing(false);
      await invalidate();
      toast.success("Google istemcisi silindi");
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const stored = status?.source === "settings";
  const fromEnvironment = status?.source === "environment";
  const showForm = editing || (!stored && !fromEnvironment);
  const canSave = clientId.trim() !== "" && clientSecret.trim() !== "";

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted">Google bağlantısı</h2>

      <p className="text-sm text-base-content/70">
        Search Console ve Analytics, kendi Google Cloud projenizden aldığınız
        bir OAuth istemcisiyle çalışır. Kimlik bilgilerini buraya girin; gizli
        anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.{" "}
        <a
          href={CONSOLE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        >
          Google Cloud Console
          <ExternalLink className="size-3" />
        </a>
      </p>

      {statusQuery.isPending ? <div className="skeleton h-10 w-full" /> : null}

      {fromEnvironment ? (
        <div className="alert alert-info items-start text-sm">
          <div className="space-y-1">
            <p className="font-medium">Ortam değişkenlerinden geliyor</p>
            <p className="text-base-content/70">
              <code>GOOGLE_CLIENT_ID</code> ve <code>GOOGLE_CLIENT_SECRET</code>{" "}
              ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.
            </p>
          </div>
        </div>
      ) : null}

      {stored && !editing ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-base-300 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-success" />
            <span className="truncate font-mono text-sm">
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
              Değiştir
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost text-error"
              disabled={clear.isPending}
              onClick={() => clear.mutate()}
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
            <span className="label-text text-sm">İstemci kimliği</span>
            <input
              type="text"
              autoComplete="off"
              spellCheck={false}
              className="input input-bordered w-full font-mono text-sm"
              placeholder="1234567890-abc.apps.googleusercontent.com"
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text text-sm">Gizli anahtar</span>
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
              Kaydet
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
                Vazgeç
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </section>
  );
}
