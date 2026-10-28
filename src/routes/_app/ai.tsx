import { ManualAgentConnection } from "@/client/features/ai-mcp/ManualAgentConnection";
import { useAgentVerification } from "@/client/features/ai-mcp/useAgentVerification";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { StatusPill } from "@/client/components/StatusPill";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { getAuthMode } from "@/lib/auth-mode";
import { captureClientEvent } from "@/client/lib/observability";
import { agentUpdatePrompt } from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/components/CopyButton";
import { fillParts } from "@/client/features/settings/fillParts";
import {
  ConnectAgentCard,
  InstallCard,
} from "@/client/features/ai-mcp/SetupCards";
import { t } from "@/shared/i18n";

// The public skills shipped under .agents/skills/. Everything that needed a
// paid data provider went with the features behind it.
// Blurbs and tab labels are Turkish source text, translated where they render.
const SKILLS = [
  ["seo-coach", "Nerede durduğunuzu anlatır ve sıradaki adımı seçer."],
  [
    "seo-project-setup",
    "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.",
  ],
  [
    "seo-audit",
    "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.",
  ],
  [
    "seo-check-in",
    "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.",
  ],
  [
    "seo-triage",
    "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?",
  ],
  [
    "seo-report",
    "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.",
  ],
];
const AI_TABS = [
  { id: "setup", label: "Ajanınızı kurun" },
  { id: "skills", label: "Beceriler" },
] as const;

export const Route = createFileRoute("/_app/ai")({
  component: AiPage,
});

function AiPage() {
  const origin =
    typeof window === "undefined"
      ? "http://localhost:3001"
      : window.location.origin;
  const mcpUrl = `${origin}/mcp`;
  const [tab, setTab] = useState<"setup" | "skills">("setup");
  /*
   * MCP is stateless HTTP. A recorded call, including a diagnostic client
   * such as curl, proves tool access at that time, not a completed agent
   * setup or a continuous connection. Name the observation directly.
   */
  const {
    connection,
    lastCallAt,
    isRecent,
    statusUnknown,
    verification,
    verificationOutcome,
    startVerification,
    cancelVerification,
  } = useAgentVerification();
  return (
    <PageShell width="reading">
      {/* No wrapper div: `PageShell` is `flex flex-col gap-6`, and wrapping
          the page in one child collapsed that to a single element -- so this
          file had to hand-manage the gap under the header with `mt-8`. The
          `mt-*` further down are inside the tab panels and stay; those are
          internal spacing, not the shell's. */}
      <PageHeader
        title={t("Ajan kurulumu")}
        description={t(
          "seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun.",
        )}
        actions={
          /* `aria-live` is not decoration: the operator tabs away, pastes
               the prompt into their agent, and tabs back — the query refetches
               on focus and this flips without a reload. A sighted user sees
               it. `min-w-0` because clientLabel is the client's own word for
               itself, capped at 60 characters but not guaranteed to contain a
               space. */
          <div
            className="flex min-w-0 flex-col items-start gap-1"
            aria-live="polite"
          >
            {connection.isPending ? (
              <div className="skeleton h-6 w-28" />
            ) : statusUnknown ? (
              <StatusPill tone="warning" label={t("Durum okunamadı")} />
            ) : lastCallAt ? (
              <>
                <StatusPill
                  tone={isRecent ? "success" : "warning"}
                  label={t("Araç çağrısı alındı")}
                />
                <span className="break-words text-xs text-muted">
                  {fillParts(t("{client} · son çağrı {time}"), {
                    client: connection.data?.clientLabel ?? t("Bir ajan"),
                    time: (
                      <time
                        dateTime={lastCallAt}
                        title={formatDateTime(lastCallAt)}
                      >
                        {formatRelativeTime(lastCallAt)}
                      </time>
                    ),
                  })}
                </span>
              </>
            ) : (
              /* "Bağlanmadı" alone is a plain negative past — a failed
                   attempt — on a page the operator has not used yet. "Henüz"
                   keeps the honest past tense and makes it a progress marker
                   instead of a verdict. */
              <StatusPill tone="neutral" label={t("Henüz bağlanmadı")} />
            )}
          </div>
        }
      />

      <p className="text-sm text-muted">
        {t(
          "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.",
        )}
      </p>
      {statusUnknown && !connection.isPending ? (
        <button
          type="button"
          className="btn min-h-11"
          onClick={() => void connection.refetch()}
        >
          {t("Durumu yeniden oku")}
        </button>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn min-h-11"
          disabled={statusUnknown || verificationOutcome === "waiting"}
          onClick={startVerification}
        >
          {t("Bağlantıyı doğrula")}
        </button>
        {verification ? (
          <button
            type="button"
            className="btn btn-ghost min-h-11"
            onClick={cancelVerification}
          >
            {t("Vazgeç")}
          </button>
        ) : null}
      </div>
      {verificationOutcome ? (
        <p role="status" className="text-sm text-muted">
          {connection.isError
            ? t(
                "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.",
              )
            : verificationOutcome === "verified"
              ? t("Yeni araç çağrısı doğrulandı.")
              : verificationOutcome === "timeout"
                ? t(
                    "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.",
                  )
                : t(
                    "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.",
                  )}
        </p>
      ) : null}
      <Tabs
        group="ai"
        className="w-fit"
        value={tab}
        onChange={setTab}
        items={AI_TABS.map((item) => ({ ...item, label: t(item.label) }))}
      />

      {tab === "setup" ? (
        <TabPanel group="ai" value="setup">
          {/*
           * Order follows what the page knows. Until an agent has reached this
           * install, most visitors are setting it up for the first time, and
           * the from-scratch card used to sit second, where they scrolled
           * past it into the shorter "connect" path and stalled at Google.
           * So it leads, with the page's only primary button; once an agent
           * has called in, connecting (or reconnecting) is the common errand
           * and the order flips. While the first read is in flight a
           * skeleton holds the place, so a connected operator never sees the
           * cards swap under the cursor.
           */}
          {connection.isPending ? (
            <div
              className="enter mt-6 space-y-5"
              role="status"
              aria-label={t("Kurulum adımları yükleniyor")}
            >
              <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-5">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-4/5" />
                <div className="skeleton mt-2 h-11 w-64" />
              </div>
              <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            </div>
          ) : (
            <div className="enter mt-6 space-y-5">
              {/* DOM order, not CSS `order`: keyboard and screen-reader users
                meet the cards in the same sequence as everyone else. */}

              <>
                <ConnectAgentCard
                  lead
                  onVerify={startVerification}
                  connection={connection.isError ? undefined : connection.data}
                  connected={lastCallAt !== null}
                  origin={origin}
                />
                <InstallCard lead={false} />
              </>

              <section className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-box border border-base-300 bg-base-100 p-4">
                <div className="min-w-0 flex-1 basis-72">
                  <h2 className="text-sm font-semibold">
                    {t("Becerileri güncelleyin")}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {t(
                      "Ajanınızı daha önce kurduysanız güncelleme komutunu yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve kendi düzenlemeleriniz olduğu gibi kalır.",
                    )}
                  </p>
                </div>
                <CopyButton
                  value={agentUpdatePrompt}
                  label={t("Güncelleme komutunu kopyala")}
                  successMessage={t("Güncelleme komutu kopyalandı")}
                  onCopy={() => captureClientEvent("mcp:update_prompt_copy")}
                />
              </section>
            </div>
          )}

          {getAuthMode(import.meta.env.AUTH_MODE) === "cloudflare_access" ? (
            <div className="alert alert-warning mt-8 text-sm" role="alert">
              <ShieldAlert className="size-4 shrink-0" />
              <span>
                {t(
                  "Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi için Access uygulamanızda Managed OAuth'u açın.",
                )}
              </span>
            </div>
          ) : null}

          <ManualAgentConnection
            mcpUrl={mcpUrl}
            connection={connection.isError ? undefined : connection.data}
          />
        </TabPanel>
      ) : (
        <TabPanel group="ai" value="skills" className="mt-6">
          <p className="text-sm text-muted">
            {t(
              "Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı istiyorsanız beceriyi adıyla çağırın.",
            )}
          </p>
          <ul className="mt-5 space-y-3 text-sm sm:space-y-2">
            {SKILLS.map(([name, blurb]) => (
              <li
                key={name}
                className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
              >
                <span className="flex shrink-0 items-center gap-1 sm:w-56">
                  <span className="font-mono text-sm text-base-content">
                    {name}
                  </span>
                  <CopyButton
                    iconOnly
                    value={name}
                    label={t("{name} adını kopyala", { name })}
                    successMessage={t("Beceri adı kopyalandı")}
                  />
                </span>
                <span className="text-muted">{t(blurb)}</span>
              </li>
            ))}
          </ul>
        </TabPanel>
      )}
    </PageShell>
  );
}
