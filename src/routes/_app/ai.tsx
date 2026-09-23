import { PageShell } from "@/client/components/PageShell";
import { StatusPill } from "@/client/components/StatusPill";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { getAuthMode } from "@/lib/auth-mode";
import { captureClientEvent } from "@/client/lib/observability";
import {
  agentUpdatePrompt,
  getAgentSetupPrompt,
} from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import {
  ClaudeIcon,
  GrokIcon,
  HermesIcon,
  OpenAIIcon,
  OpenClawIcon,
} from "@/client/features/ai-mcp/AgentIcons";

// The public skills shipped under .agents/skills/. Everything that needed a
// paid data provider went with the features behind it.
const SKILLS = [
  ["seo-coach", "Nerede durduğunuzu anlatır ve sıradaki adımı seçer."],
  [
    "seo-project-setup",
    "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı ortak bilgi olarak kaydeder.",
  ],
  [
    "seo-audit",
    "Bu hafta yapılacak tek bir işe odaklanan, tek sayfalık site denetimi.",
  ],
  [
    "seo-check-in",
    "Bu dönemi öncekiyle karşılaştırır: ne değişti, ne zaman değişti, önemli mi.",
  ],
  [
    "seo-triage",
    "Trafik düştüyse: gerçek mi, nerede oldu, ne zaman oldu — bir şey değiştirmeden önce.",
  ],
  [
    "seo-report",
    "Yukarıdakilerden birini Raporlar sayfanıza rapor olarak kaydeder.",
  ],
];
const AGENTS = [
  { name: "Claude Code", Icon: ClaudeIcon },
  { name: "ChatGPT", Icon: OpenAIIcon },
  { name: "Grok Bot", Icon: GrokIcon },
  { name: "Hermes", Icon: HermesIcon },
  { name: "OpenClaw", Icon: OpenClawIcon },
];

export const Route = createFileRoute("/_app/ai")({
  component: AiPage,
});

function AiPage() {
  const origin =
    typeof window === "undefined"
      ? "http://localhost:3001"
      : window.location.origin;
  const mcpUrl = `${origin}/mcp`;
  const prompt = getAgentSetupPrompt(origin);
  const [tab, setTab] = useState<"setup" | "skills">("setup");
  /*
   * Two states, and the past tense is deliberate. The integration cards say
   * "Bağlı" because a credential is sitting in a row; MCP here is stateless
   * HTTP with no session, so the only honest claim is that an agent *did*
   * reach us, and when. "Bağlandı", never "Bağlı".
   */
  const connection = useQuery({
    queryKey: ["agentConnection"],
    queryFn: () => getAgentConnection(),
  });
  const lastCallAt = connection.data?.lastCallAt ?? null;

  return (
    <PageShell width="reading">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight">
              Ajan kurulumu
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
              seotracker&apos;ı kullanmanın en güçlü yolu, zaten kullandığınız
              yapay zeka ajanı. Bir kez kurun, sonra istediğinizi sorun.
            </p>
          </div>
          {/* `aria-live` is not decoration: the operator tabs away, pastes the
              prompt into their agent, and tabs back — the query refetches on
              focus and this flips without a reload. A sighted user sees it. */}
          <div
            className="flex shrink-0 flex-col items-start gap-1 sm:items-end"
            aria-live="polite"
          >
            {connection.isPending ? (
              <div className="skeleton h-6 w-28" />
            ) : lastCallAt ? (
              <>
                <StatusPill tone="success" label="Bağlandı" />
                <span
                  className="text-xs text-muted"
                  title={formatDateTime(lastCallAt)}
                >
                  {connection.data?.clientLabel ?? "Bir ajan"} · son çağrı{" "}
                  {formatRelativeTime(lastCallAt)}
                </span>
              </>
            ) : (
              <StatusPill tone="neutral" label="Bağlanmadı" />
            )}
          </div>
        </div>

        <div role="tablist" className="tabs tabs-border mt-8 w-fit">
          {(
            [
              ["setup", "Ajanınızı kurun"],
              ["skills", "Beceriler"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`tab ${tab === id ? "tab-active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "setup" ? (
          <>
            <div className="mt-6 space-y-5">
              <section className="rounded-box border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">Ajanınızı kurun</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Kurulum istemini ajanınıza yapıştırın; seotracker&apos;ı
                  bağlayıp SEO becerilerini kuracak. Elle yapmanız gereken
                  adımlarda size yol gösterir.
                </p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {AGENTS.map(({ name, Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-1.5 text-xs text-muted"
                    >
                      <Icon className="size-4" />
                      {name}
                    </li>
                  ))}
                  <li className="text-xs text-muted">
                    ya da herhangi bir MCP istemcisi
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    value={prompt}
                    label="Kurulum istemini kopyala"
                    successMessage="Kurulum istemi kopyalandı"
                    onCopy={() => captureClientEvent("mcp:setup_prompt_copy")}
                  />
                </div>
                <p className="mt-5 border-t border-base-300 pt-4 text-sm leading-relaxed text-muted">
                  Bağlandıktan sonra ajanınızdan <code>seo-coach</code>{" "}
                  becerisini kullanmasını isteyin; sıradaki adımı birlikte
                  seçersiniz.{" "}
                  {/* Turns the grey pill from a verdict into a progress
                      marker, and says it next to the button that resolves
                      it rather than next to the badge that reports it. */}
                  {lastCallAt ? null : (
                    <>
                      Ajanınız ilk aracı çağırdığında yukarıdaki durum
                      güncellenir.
                    </>
                  )}
                </p>
              </section>

              <section className="rounded-box border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">
                  Becerilerinizi güncelleyin
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Zaten bağlı mı? Güncelleme istemini ajanınıza yapıştırın; en
                  güncel becerileri alırken bağlantı ayarlarınız ve kişisel
                  düzenlemeleriniz korunur.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    value={agentUpdatePrompt}
                    label="Güncelleme istemini kopyala"
                    successMessage="Güncelleme istemi kopyalandı"
                    onCopy={() => captureClientEvent("mcp:update_prompt_copy")}
                  />
                </div>
              </section>
            </div>

            {getAuthMode(import.meta.env.AUTH_MODE) === "cloudflare_access" ? (
              <div className="alert alert-warning mt-8 text-sm" role="alert">
                <ShieldAlert className="size-4 shrink-0" />
                <span>
                  Bu kurulum Cloudflare Access arkasında. Access uygulamanızda
                  Managed OAuth açılmadan MCP istemcileri bağlanamaz.
                </span>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-base-300 pt-5 text-xs text-muted">
              <span>
                Bu kurulumun MCP adresi:{" "}
                <code className="font-mono text-muted">{mcpUrl}</code>.{" "}
                {connection.data?.tokenConfigured ? (
                  <>
                    Bu adres{" "}
                    <code className="font-mono text-muted">MCP_TOKEN</code> ile
                    korunuyor; istemciye{" "}
                    <code className="font-mono text-muted">
                      Authorization: Bearer …
                    </code>{" "}
                    başlığını ekletin.
                  </>
                ) : (
                  <>
                    Bu adres kimlik doğrulaması istemez; makinenizdeki başka bir
                    sürecin araçları çalıştırmasını engellemek isterseniz{" "}
                    <code className="font-mono text-muted">MCP_TOKEN</code>{" "}
                    ayarlayın ve istemciye{" "}
                    <code className="font-mono text-muted">
                      Authorization: Bearer …
                    </code>{" "}
                    başlığını ekletin.
                  </>
                )}
              </span>
              <CopyButton
                value={mcpUrl}
                successMessage="MCP adresi kopyalandı"
                onCopy={() => captureClientEvent("mcp:setup_url_copy")}
              />
            </div>
          </>
        ) : (
          <section className="mt-6">
            <p className="text-sm text-muted">
              Kurulum istemi bunları kurar. Kısa bir yanıt yerine tam bir çıktı
              istediğinizde beceriyi adıyla çağırın.
            </p>
            <ul className="mt-5 space-y-3 text-sm sm:space-y-2">
              {SKILLS.map(([name, blurb]) => (
                <li
                  key={name}
                  className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                >
                  <span className="shrink-0 font-mono text-[13px] text-base-content sm:w-48">
                    /{name}
                  </span>
                  <span className="text-muted">{blurb}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
