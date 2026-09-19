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

  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-12 md:px-6 md:py-16 pb-24 md:pb-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Ajan kurulumu</h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-base-content/70">
          seotracker&apos;i kullanmanin en guclu yolu, zaten kullandiginiz yapay
          zeka ajani. Bir kez kurun, sonra istediginizi sorun.
        </p>

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
                  seçersiniz.
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
                <code className="font-mono text-base-content/80">{mcpUrl}</code>
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
    </div>
  );
}
