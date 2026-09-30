import { useMutation } from "@tanstack/react-query";
import { FileArchive, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { readClientLog } from "@/client/lib/clientLog";
import { buildZip } from "@/client/lib/zip";
import { downloadBlob } from "@/client/lib/download";
import { getDiagnostics } from "@/serverFunctions/diagnostics";

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
        `seotracker-tanilama-${server.generatedAt.slice(0, 10)}.zip`,
      );
    },
    onSuccess: () => toast.success("Tanılama paketi indirildi."),
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, "Paket oluşturulamadı")),
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
      Tanılama paketi indir
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
  return `seotracker tanılama paketi
Oluşturulma: ${generatedAt}

İçindekiler
  summary.txt        Tek sayfalık özet.
  diagnostics.json   Sürüm, kurulum denetimleri, tablo satır sayıları,
                     projeler, bağlı Google mülkleri ve son 25 denetim.
  client-log.json    Bu sekmede yakalanan tarayıcı hataları.
  browser.json       Tarayıcı ve ekran bilgisi.

İçinde OLMAYAN şeyler
  Hiçbir gizli değer yok: Google erişim ve yenileme jetonları, istemci
  sırrı, PageSpeed API anahtarı, MCP jetonu ve oturum çerezleri
  toplanmıyor. Yalnızca her birinin yapılandırılmış olup olmadığı yazıyor.
  Taranan sayfaların içeriği de yok, yalnızca sayıları var.

İçinde OLAN, sizi tanımlayan şeyler
  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4
  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden
  önce dosyaları açıp okuyun; karar sizin.
`;
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
    .map(
      (audit) =>
        `  ${audit.startedAt}  ${audit.status.padEnd(9)} ${String(audit.pagesCrawled).padStart(5)} sayfa  ${audit.issueCount} bulgu  ${audit.errorCode ?? ""}`,
    )
    .join("\n");

  return `seotracker ${server.version} · ${server.authMode}
Oluşturulma: ${server.generatedAt}

Kurulum denetimleri
${failing || "  hepsi ok"}

Tablolar
${Object.entries(server.tables)
  .map(([name, value]) => `  ${name.padEnd(26)} ${value}`)
  .join("\n")}

Projeler: ${server.projects.length}
Search Console bağlantısı: ${server.connections.searchConsole.length}
Analytics bağlantısı: ${server.connections.analytics.length}

Son denetimler
${audits || "  yok"}

Tarayıcıda yakalanan hata: ${clientLogCount}
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
