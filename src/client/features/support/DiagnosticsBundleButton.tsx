import { useMutation } from "@tanstack/react-query";
import { FileArchive, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { readClientLog } from "@/client/lib/clientLog";
import { buildZip } from "@/client/lib/zip";
import { downloadBlob } from "@/client/lib/download";
import { getDiagnostics } from "@/serverFunctions/diagnostics";
import { t } from "@/shared/i18n";

/**
 * One button, one archive, everything needed to diagnose this install.
 *
 * Someone else runs this on their own machine. When it misbehaves the whole
 * conversation is "what does your setup look like", asked one question at a
 * time over a day. This answers all of it at once, and the operator can read
 * every file in it before deciding to send it.
 */
export function DiagnosticsBundleButton() {
  const build = useMutation({
    mutationFn: async () => {
      const server = await getDiagnostics();
      const clientLog = readClientLog();

      const archive = buildZip([
        { name: "README.txt", content: readme(server.generatedAt) },
        { name: "diagnostics.json", content: pretty(server) },
        { name: "client-log.json", content: pretty(clientLog) },
        { name: "browser.json", content: pretty(describeBrowser()) },
        {
          name: "summary.txt",
          content: buildDiagnosticsSummary(server, clientLog.length),
        },
      ]);

      downloadBlob(
        archive,
        t("seowatcher-tanilama-{date}.zip", {
          date: server.generatedAt.slice(0, 10),
        }),
      );
    },
    onSuccess: () => toast.success(t("Tanılama paketi indirildi")),
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Paket oluşturulamadı"))),
  });

  return (
    <button
      type="button"
      className="btn btn-sm gap-1.5"
      disabled={build.isPending}
      onClick={() => build.mutate()}
    >
      {build.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <FileArchive className="size-4" />
      )}
      {t("Tanılama paketi indir")}
    </button>
  );
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

/*
 * Written to the person holding the archive, not to whoever receives it.
 * Saying plainly what is inside is the difference between a bundle someone
 * can send and one they have to audit first.
 */
function readme(generatedAt: string): string {
  return `${t(
    "seowatcher tanılama paketi\nOluşturulma: {generatedAt}\n\nİçindekiler\n  summary.txt        Tek sayfalık özet.\n  diagnostics.json   Sürüm, kurulum kontrolleri, tablo satır sayıları,\n                     projeler, bağlı Google mülkleri ve son 25 denetim.\n  client-log.json    Bu sekmede yakalanan tarayıcı hataları.\n  browser.json       Tarayıcı ve ekran bilgisi.\n\nİçinde OLMAYAN şeyler\n  Gizli değer yok: Google erişim ve yenileme anahtarları, Google erişim\n  anahtarının gizli kısmı, PageSpeed API anahtarı, ajan parolası (MCP token)\n  ve oturum çerezleri toplanmaz. Yalnızca her birinin ayarlı olup olmadığı yazar.\n  Taranan sayfaların içeriği de yok, yalnızca sayıları var.\n\nİçinde OLAN, sizi tanımlayan şeyler\n  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4\n  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden\n  önce dosyaları açıp okuyun; karar sizin.\n",
    { generatedAt },
  )}\n${t("Başarısız denetimler, hangi aşamada durduğunu ve URL/kimlik bilgileri ayıklanmış hata açıklamasını içerir. PageSpeed ölçüm hataları URL'ler çıkarılarak özetlenir.")}\n`;
}

export function buildDiagnosticsSummary(
  server: Awaited<ReturnType<typeof getDiagnostics>>,
  clientLogCount: number,
): string {
  const failing = Object.entries(server.setup.checks)
    .filter(([, check]) => check.status !== "ok")
    .map(([key, check]) => `  ${key}: ${check.status} ${check.detail ?? ""}`)
    .join("\n");

  const audits = server.audits
    .slice(0, 5)
    .map((audit) => {
      const failure = [
        audit.errorCode,
        audit.failedPhase && `phase=${audit.failedPhase}`,
        audit.errorDetail,
      ]
        .filter(Boolean)
        .join(" · ");
      const lighthouseErrors = audit.lighthouseErrors
        .map(({ count, errorMessage }) =>
          t("PageSpeed ölçüm hatası ({count}): {message}", {
            count: String(count),
            message: errorMessage,
          }),
        )
        .join("\n    ");
      return `  ${audit.startedAt}  ${audit.status.padEnd(9)} ${t("{pages} sayfa  {issues} bulgu", { pages: String(audit.pagesCrawled).padStart(5), issues: audit.issueCount })}  ${failure}${lighthouseErrors ? `\n    ${lighthouseErrors}` : ""}`;
    })
    .join("\n");

  const tables = Object.entries(server.tables)
    .map(([name, value]) => `  ${name.padEnd(26)} ${value}`)
    .join("\n");

  return `seowatcher ${server.version} Alpha · ${server.authMode}
${t("Oluşturulma: {date}", { date: server.generatedAt })}

${t("Kurulum kontrolleri")}
${failing || `  ${t("hepsi ok")}`}

${t("Tablolar")}
${tables}

${t("Projeler: {n}", { n: server.projects.length })}
${t("Search Console bağlantısı: {n}", { n: server.connections.searchConsole.length })}
${t("Analytics bağlantısı: {n}", { n: server.connections.analytics.length })}

${t("Son denetimler")}
${audits || `  ${t("yok")}`}

${t("Tarayıcıda yakalanan hata: {n}", { n: clientLogCount })}
`;
}

function describeBrowser() {
  if (typeof window === "undefined") return {};
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    // The origin the app is served from, which is how a reverse-proxy or
    // Cloudflare Access setup announces itself without being asked.
    origin: window.location.origin,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    devicePixelRatio: window.devicePixelRatio,
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
  };
}
