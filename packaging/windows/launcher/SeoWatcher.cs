// seowatcher Windows launcher: a tray application that runs the built worker
// under `wrangler dev` with a bundled Node runtime, so an end user installs
// one .exe and never sees Docker, pnpm or a terminal.
//
// Layout next to this executable (produced by packaging/windows/build.ps1):
//   node\node.exe                   bundled Node.js runtime
//   app\node_modules\wrangler\...   wrangler + miniflare + workerd
//   app\dist\server\wrangler.json   built main worker (+ drizzle\ migrations)
//   app\dist\seotracker_audit\...   built audit worker
//   VERSION                         package version
//
// Everything mutable lives under %LOCALAPPDATA%\seowatcher: the database and
// KV/R2 state (data\), the token encryption key (instance-secret), the MCP
// token (mcp-token), the env file handed to wrangler (server.env), config.json
// and logs\. Mirrors docker-entrypoint.sh: keys are generated once, never
// replaced, and never printed.
//
// Compiled with the .NET Framework 4.x C# compiler that ships with Windows:
//   csc /target:winexe /optimize /r:System.Windows.Forms.dll /r:System.Drawing.dll ...
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

namespace SeoWatcher
{
    internal static class Program
    {
        internal const string AppName = "seowatcher";
        internal const string MutexName = "Local\\seowatcher-launcher";
        internal const string QuitEventName = "Local\\seowatcher-quit";

        [STAThread]
        private static int Main(string[] args)
        {
            bool quit = Array.IndexOf(args, "--quit") >= 0;
            bool silent = Array.IndexOf(args, "--silent") >= 0;

            if (quit)
            {
                // Used by the uninstaller and by "Yeniden başlat": ask the
                // running instance to stop and wait for it to let go of the mutex.
                try
                {
                    using (var ev = EventWaitHandle.OpenExisting(QuitEventName))
                    {
                        ev.Set();
                    }
                }
                catch (WaitHandleCannotBeOpenedException)
                {
                    return 0;
                }
                for (int i = 0; i < 100; i++)
                {
                    bool createdNew;
                    using (var probe = new Mutex(false, MutexName, out createdNew))
                    {
                        if (createdNew) return 0;
                    }
                    Thread.Sleep(100);
                }
                return 1;
            }

            bool isFirstInstance;
            using (var mutex = new Mutex(true, MutexName, out isFirstInstance))
            {
                if (!isFirstInstance)
                {
                    // Second launch: just bring the app up in the browser.
                    var cfg = Config.Load();
                    Browser.Open("http://127.0.0.1:" + cfg.Port + "/");
                    return 0;
                }

                LauncherLog.Write("start" + (silent ? " --silent" : ""));
                foreach (var line in Diag.Summary().Split(new[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries)) LauncherLog.Write("  " + line);
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                using (var app = new TrayApp(silent))
                {
                    Application.Run(app);
                }
                return 0;
            }
        }
    }

    internal static class Paths
    {
        public static readonly string ExeDir = AppDomain.CurrentDomain.BaseDirectory.TrimEnd('\\');
        public static readonly string NodeExe = Path.Combine(ExeDir, "node", "node.exe");
        public static readonly string AppDir = Path.Combine(ExeDir, "app");
        public static readonly string WranglerJs = Path.Combine(AppDir, "node_modules", "wrangler", "bin", "wrangler.js");
        public static readonly string MainConfig = Path.Combine(AppDir, "dist", "server", "wrangler.json");
        public static readonly string AuditConfig = Path.Combine(AppDir, "dist", "seotracker_audit", "wrangler.json");
        public static readonly string VersionFile = Path.Combine(ExeDir, "VERSION");

        public static readonly string DataRoot = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Program.AppName);
        public static readonly string PersistDir = Path.Combine(DataRoot, "data");
        public static readonly string LogDir = Path.Combine(DataRoot, "logs");
        public static readonly string ServerLog = Path.Combine(LogDir, "server.log");
        public static readonly string MigrateLog = Path.Combine(LogDir, "migrate.log");
        public static readonly string LauncherLog = Path.Combine(LogDir, "launcher.log");
        public static readonly string VcRedistExe = Path.Combine(ExeDir, "redist", "VC_redist.x64.exe");
        public static readonly string WorkerdExe = Path.Combine(AppDir, "node_modules", "@cloudflare", "workerd-windows-64", "bin", "workerd.exe");
        public static readonly string InstanceSecret = Path.Combine(DataRoot, "instance-secret");
        public static readonly string McpToken = Path.Combine(DataRoot, "mcp-token");
        public static readonly string ServerEnv = Path.Combine(DataRoot, "server.env");
        public static readonly string ConfigFile = Path.Combine(DataRoot, "config.json");

        public static string Version()
        {
            try { return File.ReadAllText(VersionFile).Trim(); } catch { return "?"; }
        }
    }

    /// <summary>What the launcher knows about the machine. Written to
    /// launcher.log at every start and copied to the clipboard on request, so a
    /// bug report from a non-technical user carries the facts that matter:
    /// Windows build, CPU, and the Visual C++ runtime workerd.exe depends on.</summary>
    internal static class Diag
    {
        // workerd is built against a recent MSVC toolchain; runtimes older than
        // 14.40 have been seen to crash it with an access violation on start.
        public const int VcMinMinor = 40;

        private static Microsoft.Win32.RegistryKey Hklm64(string subKey)
        {
            return Microsoft.Win32.RegistryKey.OpenBaseKey(Microsoft.Win32.RegistryHive.LocalMachine, Microsoft.Win32.RegistryView.Registry64).OpenSubKey(subKey);
        }

        public static string OsDescription()
        {
            try
            {
                using (var key = Hklm64(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                {
                    if (key == null) return Environment.OSVersion.VersionString;
                    string name = key.GetValue("ProductName") as string ?? "Windows";
                    string display = key.GetValue("DisplayVersion") as string ?? key.GetValue("ReleaseId") as string ?? "";
                    string build = key.GetValue("CurrentBuild") as string ?? "";
                    // Windows 11 still reports "Windows 10" here; the build number tells.
                    int b;
                    if (int.TryParse(build, out b) && b >= 22000) name = name.Replace("Windows 10", "Windows 11");
                    object ubr = key.GetValue("UBR");
                    return name + " " + display + " (" + build + (ubr != null ? "." + ubr : "") + ")";
                }
            }
            catch { return Environment.OSVersion.VersionString; }
        }

        public static int OsBuild()
        {
            try
            {
                using (var key = Hklm64(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                {
                    int b;
                    if (key != null && int.TryParse(key.GetValue("CurrentBuild") as string, out b)) return b;
                }
            }
            catch { }
            return 0;
        }

        public static string CpuName()
        {
            try
            {
                using (var key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(@"HARDWARE\DESCRIPTION\System\CentralProcessor\0"))
                {
                    return key == null ? "?" : ((key.GetValue("ProcessorNameString") as string) ?? "?").Trim();
                }
            }
            catch { return "?"; }
        }

        /// <summary>Installed Visual C++ 2015-2022 x64 runtime, or null.</summary>
        public static Version VcRuntime()
        {
            try
            {
                using (var key = Hklm64(@"SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64"))
                {
                    if (key == null) return null;
                    object installed = key.GetValue("Installed");
                    if (installed == null || Convert.ToInt32(installed) == 0) return null;
                    int major = Convert.ToInt32(key.GetValue("Major") ?? 0);
                    int minor = Convert.ToInt32(key.GetValue("Minor") ?? 0);
                    int bld = Convert.ToInt32(key.GetValue("Bld") ?? 0);
                    return new Version(major, minor, bld);
                }
            }
            catch { return null; }
        }

        public static bool VcRuntimeDllsPresent()
        {
            string sys = Environment.GetFolderPath(Environment.SpecialFolder.System);
            return File.Exists(Path.Combine(sys, "vcruntime140.dll"))
                && File.Exists(Path.Combine(sys, "vcruntime140_1.dll"))
                && File.Exists(Path.Combine(sys, "msvcp140.dll"));
        }

        /// <summary>null when the runtime looks fine, otherwise one plain sentence.</summary>
        public static string VcRuntimeProblem()
        {
            var v = VcRuntime();
            if (v == null || !VcRuntimeDllsPresent()) return "Microsoft Visual C++ çalışma zamanı (2015-2022, x64) kurulu değil.";
            if (v.Major < 14 || (v.Major == 14 && v.Minor < VcMinMinor)) return "Microsoft Visual C++ çalışma zamanı eski (" + v + "); en az 14." + VcMinMinor + " gerekir.";
            return null;
        }

        [DllImport("kernel32.dll")]
        private static extern bool IsProcessorFeaturePresent(int feature);
        [DllImport("kernel32.dll")]
        private static extern uint GetSystemDEPPolicy();

        /// <summary>Instruction sets workerd's prebuilt binary needs (SSE4.2 and
        /// CLMUL at least). Windows reports the newer flags only from 10 2004 on;
        /// "?" means the OS could not say, not that the CPU lacks it.</summary>
        private static string Flag(int id, string name)
        {
            try { return name + "=" + (IsProcessorFeaturePresent(id) ? "evet" : "?"); } catch { return name + "=?"; }
        }

        public static string CpuFeatures()
        {
            return Flag(36, "SSSE3") + " " + Flag(37, "SSE4.1") + " " + Flag(38, "SSE4.2") + " " + Flag(39, "AVX") + " " + Flag(40, "AVX2");
        }

        public static string DepPolicy()
        {
            try { return new[] { "AlwaysOff", "AlwaysOn", "OptIn", "OptOut" }[GetSystemDEPPolicy()]; } catch { return "?"; }
        }

        public static string Edition()
        {
            try
            {
                using (var key = Hklm64(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                {
                    return key == null ? "?" : ((key.GetValue("InstallationType") as string) ?? "?") + ", " + ((key.GetValue("EditionID") as string) ?? "?");
                }
            }
            catch { return "?"; }
        }

        /// <summary>The VC++ runtime DLLs shipped next to workerd.exe (loaded first).</summary>
        public static string EngineLocalDlls()
        {
            string dir = Path.GetDirectoryName(Paths.WorkerdExe);
            var parts = new List<string>();
            foreach (var name in new[] { "vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll" })
            {
                string p = Path.Combine(dir, name);
                try { parts.Add(name + "=" + (File.Exists(p) ? FileVersionInfo.GetVersionInfo(p).FileVersion : "yok")); }
                catch { parts.Add(name + "=?"); }
            }
            return string.Join(" ", parts);
        }

        /// <summary>File versions of the three DLLs workerd.exe imports from the VC++ runtime.</summary>
        public static string RuntimeDlls()
        {
            string sys = Environment.GetFolderPath(Environment.SpecialFolder.System);
            var parts = new List<string>();
            foreach (var name in new[] { "vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll", "ucrtbase.dll" })
            {
                string p = Path.Combine(sys, name);
                try { parts.Add(name + "=" + (File.Exists(p) ? FileVersionInfo.GetVersionInfo(p).FileVersion : "yok")); }
                catch { parts.Add(name + "=?"); }
            }
            return string.Join(" ", parts);
        }

        public static bool IsAscii(string text)
        {
            foreach (char c in text) if (c > 127) return false;
            return true;
        }

        // A one-service worker whose test() handler runs under `workerd test`:
        // exercises the binary, V8 and module loading without wrangler, sockets or
        // the data directory. Written next to the data so the path stays short.
        private const string ProbeConfig =
            "using Workerd = import \"/workerd/workerd.capnp\";\n"
            + "const config :Workerd.Config = (\n"
            + "  services = [ (name = \"probe\", worker = (\n"
            + "    modules = [(name = \"probe.js\", esModule = \"export default { async test() { if (1 + 1 !== 2) throw new Error('math'); } };\")],\n"
            + "    compatibilityDate = \"2026-01-01\"\n"
            + "  )) ]\n"
            + ");\n";

        /// <summary>Runs the engine on its own, outside wrangler, with a minimal
        /// worker. If this crashes too, the machine cannot run the engine at all; if
        /// it passes, the crash comes from the configuration, the data directory or
        /// the environment wrangler sets up. Returns "ok" or "hata: <detail>".</summary>
        public static string WorkerdProbe()
        {
            if (!File.Exists(Paths.WorkerdExe)) return "hata: workerd.exe bulunamadı";
            try
            {
                Directory.CreateDirectory(Paths.DataRoot);
                string cfg = Path.Combine(Paths.DataRoot, "probe.capnp");
                File.WriteAllText(cfg, ProbeConfig, new UTF8Encoding(false));
                var psi = new ProcessStartInfo(Paths.WorkerdExe, "test \"" + cfg + "\"")
                {
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                };
                using (var p = Process.Start(psi))
                {
                    string stdout = p.StandardOutput.ReadToEnd().Trim();
                    string stderr = p.StandardError.ReadToEnd().Trim();
                    if (!p.WaitForExit(20000)) { try { p.Kill(); } catch { } return "hata: 20 saniyede yanıt vermedi"; }
                    if (p.ExitCode == 0) return "ok";
                    string detail = (stderr.Length > 0 ? stderr : stdout).Replace("\r", " ").Replace("\n", " ");
                    if (detail.Length > 300) detail = detail.Substring(detail.Length - 300);
                    return "hata: çıkış kodu 0x" + p.ExitCode.ToString("X8") + (detail.Length > 0 ? " " + detail : "");
                }
            }
            catch (Exception ex)
            {
                return "hata: " + ex.Message;
            }
        }

        public static readonly string DumpDir = Path.Combine(Paths.LogDir, "dumps");

        /// <summary>Asks Windows Error Reporting for a minidump whenever workerd.exe
        /// crashes. The per-user LocalDumps key needs no administrator; the dump
        /// names the faulting module, which the stack in server.log does not.</summary>
        public static void EnableEngineDumps()
        {
            try
            {
                Directory.CreateDirectory(DumpDir);
                using (var key = Registry.CurrentUser.CreateSubKey(@"Software\Microsoft\Windows\Windows Error Reporting\LocalDumps\workerd.exe"))
                {
                    key.SetValue("DumpFolder", DumpDir, RegistryValueKind.ExpandString);
                    key.SetValue("DumpType", 1, RegistryValueKind.DWord);
                    key.SetValue("DumpCount", 3, RegistryValueKind.DWord);
                }
            }
            catch (Exception ex) { LauncherLog.Write("dumps: " + ex.Message); }
        }

        public static string Dumps()
        {
            try
            {
                if (!Directory.Exists(DumpDir)) return "yok";
                var files = Directory.GetFiles(DumpDir, "*.dmp");
                if (files.Length == 0) return "yok";
                var parts = new List<string>();
                foreach (var f in files) parts.Add(Path.GetFileName(f) + " (" + new FileInfo(f).Length / 1024 + " KB)");
                return string.Join(", ", parts);
            }
            catch { return "?"; }
        }

        /// <summary>"Application Error" events for workerd.exe or node.exe, newest
        /// first: Windows writes the faulting module name and offset there.</summary>
        public static string FaultingModules()
        {
            var found = new List<string>();
            try
            {
                var log = new EventLog("Application");
                int count = log.Entries.Count;
                for (int i = count - 1; i >= 0 && i >= count - 400 && found.Count < 3; i--)
                {
                    EventLogEntry e;
                    try { e = log.Entries[i]; } catch { continue; }
                    if (e.Source != "Application Error") continue;
                    string msg = e.Message ?? "";
                    if (msg.IndexOf("workerd.exe", StringComparison.OrdinalIgnoreCase) < 0 && msg.IndexOf("node.exe", StringComparison.OrdinalIgnoreCase) < 0) continue;
                    var mod = System.Text.RegularExpressions.Regex.Match(msg, @"(?:Faulting module name|Hatalı modül adı)\s*:\s*([^,\r\n]+)");
                    var code = System.Text.RegularExpressions.Regex.Match(msg, @"(?:Exception code|Özel durum kodu)\s*:\s*(0x[0-9a-fA-F]+)");
                    var app = System.Text.RegularExpressions.Regex.Match(msg, @"(?:Faulting application name|Hatalı uygulama adı)\s*:\s*([^,\r\n]+)");
                    found.Add(e.TimeGenerated.ToString("yyyy-MM-dd HH:mm") + " " + (app.Success ? app.Groups[1].Value.Trim() : "?")
                        + " -> modül " + (mod.Success ? mod.Groups[1].Value.Trim() : "?") + (code.Success ? " kod " + code.Groups[1].Value : ""));
                }
            }
            catch (Exception ex) { return "okunamadı: " + ex.Message; }
            return found.Count == 0 ? "kayıt yok" : string.Join(" | ", found);
        }

        /// <summary>Copies of the VC++ runtime DLLs on PATH outside System32: an old
        /// copy there can be loaded instead of the current one.</summary>
        public static string StrayRuntimeDlls()
        {
            var hits = new List<string>();
            try
            {
                string sys = Environment.GetFolderPath(Environment.SpecialFolder.System);
                foreach (var dir in (Environment.GetEnvironmentVariable("PATH") ?? "").Split(';'))
                {
                    string d = dir.Trim();
                    if (d.Length == 0 || string.Equals(d.TrimEnd('\\'), sys, StringComparison.OrdinalIgnoreCase)) continue;
                    foreach (var name in new[] { "vcruntime140.dll", "msvcp140.dll", "vcruntime140_1.dll" })
                    {
                        string p = Path.Combine(d, name);
                        if (File.Exists(p))
                        {
                            string ver = "?";
                            try { ver = FileVersionInfo.GetVersionInfo(p).FileVersion; } catch { }
                            hits.Add(p + " (" + ver + ")");
                        }
                    }
                }
            }
            catch { }
            return hits.Count == 0 ? "yok" : string.Join("; ", hits);
        }

        public static string Summary()
        {
            var v = VcRuntime();
            return "seowatcher " + Paths.Version() + "\r\n"
                + "Windows: " + OsDescription() + (Environment.Is64BitOperatingSystem ? " x64" : " x86") + "\r\n"
                + "CPU: " + CpuName() + "\r\n"
                + "Sürüm türü: " + Edition() + ", DEP: " + DepPolicy() + ", .NET: " + Environment.Version + "\r\n"
                + "CPU özellikleri: " + CpuFeatures() + "\r\n"
                + "Visual C++ çalışma zamanı: " + (v == null ? "yok" : v.ToString()) + (VcRuntimeDllsPresent() ? "" : " (DLL eksik)") + "\r\n"
                + "Sistem DLL'leri: " + RuntimeDlls() + "\r\n"
                + "Motor yanındaki DLL'ler: " + EngineLocalDlls() + "\r\n"
                + "Kurulum: " + Paths.ExeDir + (IsAscii(Paths.ExeDir) ? "" : " (yolda ASCII dışı karakter var)") + "\r\n"
                + "Veri: " + Paths.DataRoot + (IsAscii(Paths.DataRoot) ? "" : " (yolda ASCII dışı karakter var)");
        }

        /// <summary>Everything a bug report needs, ready for the clipboard.</summary>
        public static string Report()
        {
            var sb = new System.Text.StringBuilder();
            sb.AppendLine(Summary());
            sb.AppendLine("Motor denemesi (workerd test): " + WorkerdProbe());
            sb.AppendLine("Windows olay günlüğü (hatalı modül): " + FaultingModules());
            sb.AppendLine("Çökme dökümleri: " + Dumps() + (Directory.Exists(DumpDir) ? " (" + DumpDir + ")" : ""));
            sb.AppendLine("PATH üzerinde başka vcruntime/msvcp kopyası: " + StrayRuntimeDlls());
            if (Server.LastCommand != null) sb.AppendLine("Son komut: " + Server.LastCommand);
            sb.AppendLine();
            foreach (var log in new[] { Paths.LauncherLog, Paths.MigrateLog, Paths.ServerLog })
            {
                sb.AppendLine("---- " + Path.GetFileName(log) + " (son 40 satır)");
                try
                {
                    var lines = File.ReadAllLines(log);
                    for (int i = Math.Max(0, lines.Length - 40); i < lines.Length; i++) sb.AppendLine(lines[i]);
                }
                catch { sb.AppendLine("(okunamadı)"); }
                sb.AppendLine();
            }
            return sb.ToString();
        }
    }

    /// <summary>launcher.log: what the tray app itself did, separate from the
    /// server's own output. A start after it passes 1 MB truncates it.</summary>
    internal static class LauncherLog
    {
        private static readonly object gate = new object();

        public static void Write(string line)
        {
            lock (gate)
            {
                try
                {
                    Directory.CreateDirectory(Paths.LogDir);
                    var info = new FileInfo(Paths.LauncherLog);
                    if (info.Exists && info.Length > 1024 * 1024) info.Delete();
                    File.AppendAllText(Paths.LauncherLog, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + line + "\r\n", new UTF8Encoding(false));
                }
                catch { }
            }
        }
    }

    /// <summary>config.json: only the port for now. Hand-written JSON on purpose:
    /// no serializer dependency, one integer field.</summary>
    internal sealed class Config
    {
        public int Port = 3001;
        // Download and install a newer release by itself (verified by SHA-256).
        public bool AutoUpdate = true;

        public static Config Load()
        {
            var cfg = new Config();
            try
            {
                if (File.Exists(Paths.ConfigFile))
                {
                    string text = File.ReadAllText(Paths.ConfigFile);
                    var m = System.Text.RegularExpressions.Regex.Match(text, "\"port\"\\s*:\\s*(\\d+)");
                    int port;
                    if (m.Success && int.TryParse(m.Groups[1].Value, out port) && port > 0 && port < 65536)
                    {
                        cfg.Port = port;
                    }
                    var a = System.Text.RegularExpressions.Regex.Match(text, "\"autoUpdate\"\\s*:\\s*(true|false)");
                    if (a.Success) cfg.AutoUpdate = a.Groups[1].Value == "true";
                }
            }
            catch { }
            return cfg;
        }

        public void Save()
        {
            Directory.CreateDirectory(Paths.DataRoot);
            File.WriteAllText(Paths.ConfigFile, "{\n  \"port\": " + Port + ",\n  \"autoUpdate\": " + (AutoUpdate ? "true" : "false") + "\n}\n", new UTF8Encoding(false));
        }
    }

    internal static class Browser
    {
        public static void Open(string url)
        {
            try
            {
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch { }
        }
    }

    /// <summary>Keeps the install current without a package manager: asks
    /// GitHub for the latest release, downloads the installer next to the data,
    /// checks it against the published SHA256SUMS.txt and runs it silently. The
    /// installer stops this instance, replaces the files and starts the new
    /// launcher itself (see seowatcher.iss, the skipifnotsilent [Run] entry).</summary>
    internal static class Updater
    {
        public const string Repo = "ucsahinn/seotracker";
        public static readonly string UpdateDir = Path.Combine(Paths.DataRoot, "updates");

        public static Version Current()
        {
            Version v;
            return Version.TryParse(Paths.Version(), out v) ? v : new Version(0, 0, 0);
        }

        private static string Get(string url, int timeoutMs)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var req = (HttpWebRequest)WebRequest.Create(url);
            req.UserAgent = "seowatcher/" + Paths.Version();
            req.Accept = "application/vnd.github+json, text/plain, */*";
            req.Timeout = timeoutMs;
            req.AllowAutoRedirect = true;
            using (var resp = (HttpWebResponse)req.GetResponse())
            using (var reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        /// <summary>Latest release tag as a Version, or null when offline or unchanged.</summary>
        public static Version CheckLatest()
        {
            try
            {
                string json = Get("https://api.github.com/repos/" + Repo + "/releases/latest", 10000);
                var m = System.Text.RegularExpressions.Regex.Match(json, "\"tag_name\"\\s*:\\s*\"v?([0-9][0-9.]*)\"");
                Version v;
                if (m.Success && Version.TryParse(m.Groups[1].Value, out v))
                {
                    LauncherLog.Write("update: latest " + v + ", installed " + Current());
                    return v;
                }
                LauncherLog.Write("update: could not read tag_name");
            }
            catch (Exception ex)
            {
                LauncherLog.Write("update: check failed: " + ex.Message);
            }
            return null;
        }

        /// <summary>Downloads seowatcher-setup-X.exe and verifies it. Returns the path.</summary>
        public static string Download(Version v, Action<string> status)
        {
            string name = "seowatcher-setup-" + v + ".exe";
            string baseUrl = "https://github.com/" + Repo + "/releases/download/v" + v + "/";
            Directory.CreateDirectory(UpdateDir);
            string file = Path.Combine(UpdateDir, name);
            status("Güncelleme indiriliyor: " + v);
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            using (var client = new WebClient())
            {
                client.Headers[HttpRequestHeader.UserAgent] = "seowatcher/" + Paths.Version();
                client.DownloadFile(baseUrl + name, file);
            }
            string sums = Get(baseUrl + "SHA256SUMS.txt", 15000);
            var m = System.Text.RegularExpressions.Regex.Match(sums, "([0-9a-fA-F]{64})\\s+\\*?" + System.Text.RegularExpressions.Regex.Escape(name));
            if (!m.Success) throw new InvalidOperationException("SHA256SUMS.txt içinde " + name + " yok");
            string actual;
            using (var sha = SHA256.Create())
            using (var stream = File.OpenRead(file))
            {
                actual = BitConverter.ToString(sha.ComputeHash(stream)).Replace("-", "").ToLowerInvariant();
            }
            if (actual != m.Groups[1].Value.ToLowerInvariant())
            {
                try { File.Delete(file); } catch { }
                throw new InvalidOperationException("İndirilen dosyanın SHA-256 özeti tutmuyor");
            }
            LauncherLog.Write("update: downloaded and verified " + file);
            return file;
        }

        /// <summary>Starts the installer. It quits this instance itself.</summary>
        public static void Install(string file)
        {
            LauncherLog.Write("update: installing " + file);
            Process.Start(new ProcessStartInfo(file, "/SILENT /NORESTART /SUPPRESSMSGBOXES") { UseShellExecute = true });
        }

        public static void Cleanup()
        {
            try
            {
                if (!Directory.Exists(UpdateDir)) return;
                foreach (var f in Directory.GetFiles(UpdateDir, "seowatcher-setup-*.exe"))
                {
                    if (f.EndsWith("seowatcher-setup-" + Paths.Version() + ".exe", StringComparison.OrdinalIgnoreCase)) File.Delete(f);
                }
            }
            catch { }
        }
    }

    /// <summary>"Kurulumu onar": the cheap, safe things that fix most stuck
    /// installs: drop wrangler's scratch files, confirm the package is whole,
    /// then the normal start path re-runs migrations and the preflight.</summary>
    internal static class Repair
    {
        /// <summary>Returns a problem description, or null when the package is complete.</summary>
        public static string Run()
        {
            foreach (var cfg in new[] { Paths.MainConfig, Paths.AuditConfig })
            {
                try
                {
                    string scratch = Path.Combine(Path.GetDirectoryName(cfg), ".wrangler");
                    if (Directory.Exists(scratch)) Directory.Delete(scratch, true);
                }
                catch (Exception ex) { LauncherLog.Write("repair: " + ex.Message); }
            }
            var missing = new List<string>();
            foreach (var f in new[] { Paths.NodeExe, Paths.WranglerJs, Paths.MainConfig, Paths.AuditConfig })
            {
                if (!File.Exists(f)) missing.Add(Path.GetFileName(f));
            }
            LauncherLog.Write("repair: scratch cleared, missing files: " + (missing.Count == 0 ? "none" : string.Join(", ", missing)));
            return missing.Count == 0 ? null : "Kurulum eksik (" + string.Join(", ", missing) + "). Kurulum dosyasını yeniden çalıştırın.";
        }
    }

    internal static class Secrets
    {
        /// <summary>Generate once, keep forever. The instance secret encrypts the
        /// stored Google tokens: replacing it would make them unreadable, so an
        /// existing file is never touched, and a damaged one stops the launcher.</summary>
        public static string EnsureInstanceSecret()
        {
            Directory.CreateDirectory(Paths.DataRoot);
            if (!File.Exists(Paths.InstanceSecret))
            {
                WriteAtomically(Paths.InstanceSecret, Convert.ToBase64String(RandomBytes(32)));
            }
            string value = File.ReadAllText(Paths.InstanceSecret).Trim();
            if (value.Length < 32 || !System.Text.RegularExpressions.Regex.IsMatch(value, "^[A-Za-z0-9+/=]+$"))
            {
                throw new InvalidOperationException(
                    Paths.InstanceSecret + " dosyası geçerli bir şifreleme anahtarı değil. " +
                    "Yedekten geri yükleyin; Google hiç bağlanmadıysa dosyayı silip yeniden başlatın.");
            }
            return value;
        }

        /// <summary>The MCP token guards nothing stored, so a short or empty file
        /// is simply regenerated.</summary>
        public static string EnsureMcpToken()
        {
            Directory.CreateDirectory(Paths.DataRoot);
            string value = File.Exists(Paths.McpToken) ? File.ReadAllText(Paths.McpToken).Trim() : "";
            if (value.Length < 16)
            {
                value = Convert.ToBase64String(RandomBytes(24)).Replace("+", "").Replace("/", "").Replace("=", "");
                WriteAtomically(Paths.McpToken, value);
            }
            return value;
        }

        private static byte[] RandomBytes(int count)
        {
            var bytes = new byte[count];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(bytes);
            }
            return bytes;
        }

        private static void WriteAtomically(string path, string content)
        {
            string tmp = path + "." + Guid.NewGuid().ToString("N") + ".tmp";
            File.WriteAllText(tmp, content, new UTF8Encoding(false));
            if (File.Exists(path))
            {
                File.Delete(tmp);
                return;
            }
            File.Move(tmp, path);
        }
    }

    /// <summary>A Windows job object with KILL_ON_JOB_CLOSE: every process
    /// started inside it (node, workerd, esbuild) dies when the launcher does,
    /// however the launcher ends. No orphaned servers on port 3001.</summary>
    internal sealed class KillOnCloseJob : IDisposable
    {
        private IntPtr handle;

        public KillOnCloseJob()
        {
            handle = CreateJobObject(IntPtr.Zero, null);
            if (handle == IntPtr.Zero) throw new InvalidOperationException("CreateJobObject failed");

            var info = new JOBOBJECT_EXTENDED_LIMIT_INFORMATION();
            info.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
            int length = Marshal.SizeOf(typeof(JOBOBJECT_EXTENDED_LIMIT_INFORMATION));
            IntPtr ptr = Marshal.AllocHGlobal(length);
            try
            {
                Marshal.StructureToPtr(info, ptr, false);
                if (!SetInformationJobObject(handle, JobObjectExtendedLimitInformation, ptr, (uint)length))
                {
                    throw new InvalidOperationException("SetInformationJobObject failed");
                }
            }
            finally
            {
                Marshal.FreeHGlobal(ptr);
            }
        }

        public void Add(Process process)
        {
            AssignProcessToJobObject(handle, process.Handle);
        }

        public void KillAll()
        {
            if (handle != IntPtr.Zero) TerminateJobObject(handle, 0);
        }

        public void Dispose()
        {
            if (handle != IntPtr.Zero)
            {
                CloseHandle(handle);
                handle = IntPtr.Zero;
            }
        }

        private const int JobObjectExtendedLimitInformation = 9;
        private const uint JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 0x2000;

        [StructLayout(LayoutKind.Sequential)]
        private struct JOBOBJECT_BASIC_LIMIT_INFORMATION
        {
            public long PerProcessUserTimeLimit;
            public long PerJobUserTimeLimit;
            public uint LimitFlags;
            public UIntPtr MinimumWorkingSetSize;
            public UIntPtr MaximumWorkingSetSize;
            public uint ActiveProcessLimit;
            public UIntPtr Affinity;
            public uint PriorityClass;
            public uint SchedulingClass;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct IO_COUNTERS
        {
            public ulong ReadOperationCount, WriteOperationCount, OtherOperationCount;
            public ulong ReadTransferCount, WriteTransferCount, OtherTransferCount;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct JOBOBJECT_EXTENDED_LIMIT_INFORMATION
        {
            public JOBOBJECT_BASIC_LIMIT_INFORMATION BasicLimitInformation;
            public IO_COUNTERS IoInfo;
            public UIntPtr ProcessMemoryLimit;
            public UIntPtr JobMemoryLimit;
            public UIntPtr PeakProcessMemoryUsed;
            public UIntPtr PeakJobMemoryUsed;
        }

        [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
        private static extern IntPtr CreateJobObject(IntPtr attributes, string name);

        [DllImport("kernel32.dll")]
        private static extern bool SetInformationJobObject(IntPtr job, int infoClass, IntPtr info, uint length);

        [DllImport("kernel32.dll")]
        private static extern bool AssignProcessToJobObject(IntPtr job, IntPtr process);

        [DllImport("kernel32.dll")]
        private static extern bool TerminateJobObject(IntPtr job, uint exitCode);

        [DllImport("kernel32.dll")]
        private static extern bool CloseHandle(IntPtr handle);
    }

    /// <summary>Starts, watches and stops the server. Runs on a worker thread;
    /// reports back through events marshalled to the UI by TrayApp.</summary>
    internal sealed class Server
    {
        public event Action<string> Status;
        public event Action<string> Ready;
        public event Action<string> Failed;

        private readonly object gate = new object();
        private KillOnCloseJob job;
        private Process process;
        private StreamWriter log;
        private volatile bool stopping;
        // Set when wrangler's output shows workerd (the Workers runtime) dying
        // before it listens. On a clean Windows install this is almost always
        // a missing or outdated Visual C++ 2015-2022 runtime.
        private volatile bool runtimeCrashed;
        public const string VcRedistUrl = "https://aka.ms/vs/17/release/vc_redist.x64.exe";
        // Prefix of every failure the bundled Visual C++ package can fix; the
        // tray app recognises it and offers to install that package.
        public const string RuntimeCrashMessage = "Windows bileşeni eksik: ";
        // Prefix of a crash the Visual C++ package cannot explain; the tray app
        // offers a one-click GitHub report with the diagnostics attached.
        public const string EngineCrashMessage = "Uygulamanın motoru çöktü: ";
        public static volatile string LastCommand;

        public int Port { get; private set; }

        public void Start(Config cfg)
        {
            stopping = false;
            var thread = new Thread(() => Run(cfg)) { IsBackground = true, Name = "seowatcher-server" };
            thread.Start();
        }

        public void Stop()
        {
            stopping = true;
            lock (gate)
            {
                if (job != null)
                {
                    job.KillAll();
                    job.Dispose();
                    job = null;
                }
                process = null;
                if (log != null)
                {
                    try { log.Flush(); log.Dispose(); } catch { }
                    log = null;
                }
            }
        }

        private void Run(Config cfg)
        {
            try
            {
                Directory.CreateDirectory(Paths.PersistDir);
                Directory.CreateDirectory(Paths.LogDir);
                TrimLog(Paths.ServerLog, 5 * 1024 * 1024);

                if (!File.Exists(Paths.NodeExe)) throw new FileNotFoundException("Node çalışma zamanı bulunamadı", Paths.NodeExe);
                if (!File.Exists(Paths.WranglerJs)) throw new FileNotFoundException("wrangler bulunamadı", Paths.WranglerJs);
                if (!File.Exists(Paths.MainConfig)) throw new FileNotFoundException("Uygulama paketi bulunamadı", Paths.MainConfig);

                // Preflight: the two things a clean machine most often lacks.
                int build = Diag.OsBuild();
                if (build > 0 && build < 17763) throw new InvalidOperationException("Bu Windows sürümü çok eski (yapı " + build + "). Windows 10 1809, Windows 11 ya da Windows Server 2019 ve üstü gerekir.");
                string vcProblem = Diag.VcRuntimeProblem();
                bool engineHasOwnCrt = File.Exists(Path.Combine(Path.GetDirectoryName(Paths.WorkerdExe), "vcruntime140.dll"));
                if (vcProblem != null)
                {
                    LauncherLog.Write("preflight: " + vcProblem + (engineHasOwnCrt ? " (motor kendi kopyasını taşıyor, devam)" : ""));
                    if (!engineHasOwnCrt) throw new InvalidOperationException(RuntimeCrashMessage + vcProblem);
                }
                Diag.EnableEngineDumps();
                string probe = Diag.WorkerdProbe();
                LauncherLog.Write("preflight: workerd " + probe);
                if (!probe.StartsWith("ok"))
                {
                    throw new InvalidOperationException(EngineCrashMessage + "motor tek başına da başlayamıyor (" + probe + "). Menüden Sorunu bildir deyin; tanı bilgisi kayda eklenir.");
                }

                Emit(Status, "Anahtarlar hazırlanıyor");
                string secret = Secrets.EnsureInstanceSecret();
                string token = Secrets.EnsureMcpToken();
                WriteServerEnv(secret, token);

                Port = ChoosePort(cfg);

                Emit(Status, "Veritabanı güncelleniyor");
                int migrateExit = RunAndWait(
                    "\"" + Paths.WranglerJs + "\" d1 migrations apply DB --local" +
                    " -c \"" + Paths.MainConfig + "\"" +
                    " --persist-to \"" + Paths.PersistDir + "\"",
                    Paths.MigrateLog);
                if (migrateExit != 0)
                {
                    throw new InvalidOperationException("Veritabanı güncellemesi başarısız (çıkış kodu " + migrateExit + "). Günlük: " + Paths.MigrateLog);
                }

                runtimeCrashed = false;
                Emit(Status, "Sunucu başlatılıyor");
                lock (gate)
                {
                    if (stopping) return;
                    job = new KillOnCloseJob();
                    log = new StreamWriter(new FileStream(Paths.ServerLog, FileMode.Append, FileAccess.Write, FileShare.Read), new UTF8Encoding(false));
                    log.AutoFlush = true;
                    log.WriteLine("---- " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " seowatcher " + Paths.Version() + " starting on port " + Port);

                    process = StartNode(
                        "\"" + Paths.WranglerJs + "\" dev" +
                        " -c \"" + Paths.MainConfig + "\"" +
                        " -c \"" + Paths.AuditConfig + "\"" +
                        " --ip 127.0.0.1 --port " + Port +
                        " --persist-to \"" + Paths.PersistDir + "\"" +
                        " --env-file \"" + Paths.ServerEnv + "\"" +
                        " --show-interactive-dev-session=false --log-level info",
                        line =>
                        {
                            if (line == null) return;
                            SafeLog(line);
                            if (line.Contains("0xc0000005") || line.Contains("Workers runtime failed to start")) runtimeCrashed = true;
                        });
                    job.Add(process);
                }

                string url = "http://127.0.0.1:" + Port + "/";
                var deadline = DateTime.UtcNow.AddSeconds(120);
                while (DateTime.UtcNow < deadline)
                {
                    if (stopping) return;
                    Process p;
                    lock (gate) { p = process; }
                    if (p == null || p.HasExited)
                    {
                        Thread.Sleep(300); // let the last stderr lines land before deciding why
                        if (runtimeCrashed)
                        {
                            string after = Diag.WorkerdProbe();
                            LauncherLog.Write("workerd probe after crash: " + after);
                            LauncherLog.Write("event log: " + Diag.FaultingModules());
                            LauncherLog.Write("dumps: " + Diag.Dumps());
                            string vc = Diag.VcRuntimeProblem();
                            if (vc != null) throw new InvalidOperationException(RuntimeCrashMessage + vc);
                            throw new InvalidOperationException(EngineCrashMessage + (after.StartsWith("ok")
                                ? "motor tek başına çalışıyor, sorun veri klasöründe ya da yapılandırmada. Önce Kurulumu onar deyin; düzelmezse Sorunu bildir."
                                : "motor bu bilgisayarda tek başına da başlayamıyor (" + after + "). Menüden Sorunu bildir deyin."));
                        }
                        throw new InvalidOperationException("Sunucu beklenmedik şekilde kapandı. Günlük: " + Paths.ServerLog);
                    }
                    if (Health(url))
                    {
                        Emit(Ready, url);
                        return;
                    }
                    Thread.Sleep(1000);
                }
                throw new TimeoutException("Sunucu 120 saniyede yanıt vermedi. Günlük: " + Paths.ServerLog);
            }
            catch (Exception ex)
            {
                SafeLog("launcher error: " + ex.Message);
                LauncherLog.Write("error: " + ex.Message);
                Emit(Failed, ex.Message);
            }
        }

        private void WriteServerEnv(string secret, string token)
        {
            var sb = new StringBuilder();
            sb.Append("AUTH_MODE=local_noauth\n");
            sb.Append("BETTER_AUTH_SECRET=").Append(secret).Append('\n');
            sb.Append("MCP_TOKEN=").Append(token).Append('\n');
            File.WriteAllText(Paths.ServerEnv, sb.ToString(), new UTF8Encoding(false));
        }

        /// <summary>The configured port, unless another program holds it; then
        /// the next free one up to +9, saved so the next start is stable.</summary>
        private static int ChoosePort(Config cfg)
        {
            for (int candidate = cfg.Port; candidate < cfg.Port + 10; candidate++)
            {
                if (PortFree(candidate))
                {
                    if (candidate != cfg.Port)
                    {
                        cfg.Port = candidate;
                        cfg.Save();
                    }
                    return candidate;
                }
            }
            throw new InvalidOperationException("Port " + cfg.Port + " ve sonraki 9 port dolu. config.json içindeki port değerini değiştirin.");
        }

        private static bool PortFree(int port)
        {
            try
            {
                var listener = new TcpListener(IPAddress.Loopback, port);
                listener.Start();
                listener.Stop();
                return true;
            }
            catch (SocketException)
            {
                return false;
            }
        }

        private static bool Health(string baseUrl)
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(baseUrl + "api/health");
                request.Timeout = 3000;
                request.Proxy = null;
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    return (int)response.StatusCode == 200;
                }
            }
            catch
            {
                return false;
            }
        }

        private static Process StartNode(string arguments, Action<string> onLine)
        {
            return StartNode(arguments, onLine, null);
        }

        private static Process StartNode(string arguments, Action<string> onLine, string wranglerLogLevel)
        {
            var psi = new ProcessStartInfo(Paths.NodeExe, arguments)
            {
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                WorkingDirectory = Paths.AppDir,
                StandardOutputEncoding = Encoding.UTF8,
                StandardErrorEncoding = Encoding.UTF8,
            };
            psi.EnvironmentVariables["WRANGLER_SEND_METRICS"] = "false";
            LastCommand = "\"" + psi.FileName + "\" " + psi.Arguments;
            // Plain text in the log files: no ANSI colour, no spinners.
            psi.EnvironmentVariables["NO_COLOR"] = "1";
            psi.EnvironmentVariables["FORCE_COLOR"] = "0";
            psi.EnvironmentVariables["CI"] = "1";
            if (wranglerLogLevel != null) psi.EnvironmentVariables["WRANGLER_LOG"] = wranglerLogLevel;
            var p = new Process { StartInfo = psi };
            p.OutputDataReceived += (s, e) => onLine(e.Data);
            p.ErrorDataReceived += (s, e) => onLine(e.Data);
            p.Start();
            p.BeginOutputReadLine();
            p.BeginErrorReadLine();
            return p;
        }

        private int RunAndWait(string arguments, string logPath)
        {
            TrimLog(logPath, 1024 * 1024);
            using (var writer = new StreamWriter(new FileStream(logPath, FileMode.Append, FileAccess.Write, FileShare.Read), new UTF8Encoding(false)))
            {
                writer.AutoFlush = true;
                writer.WriteLine("---- " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                // "error": the migration command otherwise re-prints the whole
                // migration table after every file, about a megabyte per run.
                var p = StartNode(arguments, line => { if (line != null) { lock (writer) writer.WriteLine(line); } }, "error");
                p.WaitForExit();
                return p.ExitCode;
            }
        }

        private static readonly System.Text.RegularExpressions.Regex AnsiEscape =
            new System.Text.RegularExpressions.Regex("\u001b\\[[0-9;?]*[A-Za-z]", System.Text.RegularExpressions.RegexOptions.Compiled);

        private void SafeLog(string line)
        {
            lock (gate)
            {
                if (log == null) return;
                // wrangler colours some lines regardless of NO_COLOR; the log is a file.
                try { log.WriteLine(AnsiEscape.Replace(line, "")); } catch { }
            }
        }

        private static void TrimLog(string path, long maxBytes)
        {
            try
            {
                var info = new FileInfo(path);
                if (info.Exists && info.Length > maxBytes) info.Delete();
            }
            catch { }
        }

        private static void Emit(Action<string> handler, string value)
        {
            var h = handler;
            if (h != null) h(value);
        }
    }

    internal sealed class TrayApp : ApplicationContext
    {
        private readonly NotifyIcon tray;
        private readonly ToolStripMenuItem openItem;
        private readonly ToolStripMenuItem statusItem;
        private readonly ToolStripMenuItem autostartItem;
        private readonly ToolStripMenuItem autoUpdateItem;
        private readonly ToolStripMenuItem updateItem;
        private readonly System.Threading.Timer updateTimer;
        private Version available;
        private bool updating;
        private readonly Server server = new Server();
        private readonly Config config = Config.Load();
        private readonly EventWaitHandle quitEvent;
        private readonly bool silent;
        private bool openedOnce;
        private string url;

        public TrayApp(bool silent)
        {
            this.silent = silent;

            var menu = new ContextMenuStrip();
            openItem = new ToolStripMenuItem("seowatcher'ı aç", null, (s, e) => OpenApp());
            openItem.Font = new Font(openItem.Font, FontStyle.Bold);
            statusItem = new ToolStripMenuItem("Başlatılıyor…") { Enabled = false };
            autostartItem = new ToolStripMenuItem("Windows ile başlat", null, (s, e) => ToggleAutostart());
            autostartItem.Checked = Autostart.IsEnabled();
            autoUpdateItem = new ToolStripMenuItem("Güncellemeleri kendiliğinden kur", null, (s, e) => ToggleAutoUpdate()) { Checked = config.AutoUpdate };
            updateItem = new ToolStripMenuItem("Güncelleme var", null, (s, e) => StartUpdate()) { Visible = false };

            menu.Items.Add(openItem);
            menu.Items.Add(statusItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(new ToolStripMenuItem("Yeniden başlat", null, (s, e) => Restart()));
            menu.Items.Add(new ToolStripMenuItem("Günlükleri aç", null, (s, e) => OpenFolder(Paths.LogDir)));
            menu.Items.Add(new ToolStripMenuItem("Veri klasörünü aç", null, (s, e) => OpenFolder(Paths.DataRoot)));
            menu.Items.Add(new ToolStripMenuItem("Tanı bilgisini kopyala", null, (s, e) => CopyDiagnostics()));
            menu.Items.Add(new ToolStripMenuItem("Sorunu bildir (GitHub)", null, (s, e) => ReportIssue()));
            fixItem = new ToolStripMenuItem("Eksik Windows bileşenini kur", null, (s, e) => InstallVcRedist()) { Visible = false };
            menu.Items.Add(fixItem);
            menu.Items.Add(new ToolStripMenuItem("Kurulumu onar", null, (s, e) => RepairInstall()));
            menu.Items.Add(updateItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(autostartItem);
            menu.Items.Add(autoUpdateItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(new ToolStripMenuItem("seowatcher " + Paths.Version()) { Enabled = false });
            menu.Items.Add(new ToolStripMenuItem("Çıkış", null, (s, e) => Quit()));

            tray = new NotifyIcon
            {
                Icon = LoadIcon(),
                Text = "seowatcher: başlatılıyor",
                ContextMenuStrip = menu,
                Visible = true,
            };
            tray.DoubleClick += (s, e) => OpenApp();
            tray.BalloonTipClicked += (s, e) => OnBalloonClicked();

            server.Status += s => Invoke(() => SetStatus(s));
            server.Ready += u => Invoke(() => OnReady(u));
            server.Failed += m => Invoke(() => OnFailed(m));

            bool createdNew;
            quitEvent = new EventWaitHandle(false, EventResetMode.ManualReset, Program.QuitEventName, out createdNew);
            ThreadPool.RegisterWaitForSingleObject(quitEvent, (state, timedOut) => Invoke(Quit), null, -1, true);

            server.Start(config);
            Updater.Cleanup();
            // First check two minutes after start (the server comes first), then daily.
            updateTimer = new System.Threading.Timer(_ => CheckForUpdate(), null, TimeSpan.FromMinutes(2), TimeSpan.FromHours(24));
        }

        private void CheckForUpdate()
        {
            var latest = Updater.CheckLatest();
            if (latest == null || latest <= Updater.Current()) return;
            Invoke(() =>
            {
                available = latest;
                updateItem.Text = "Güncelle: " + latest + " sürümü hazır";
                updateItem.Visible = true;
                if (config.AutoUpdate) StartUpdate();
                else tray.ShowBalloonTip(10000, "Yeni sürüm: seowatcher " + latest, "Kurmak için bu baloncuğa tıklayın ya da menüden Güncelle deyin.", ToolTipIcon.Info);
            });
        }

        private void StartUpdate()
        {
            if (updating || available == null) return;
            updating = true;
            var v = available;
            updateItem.Enabled = false;
            var worker = new Thread(() =>
            {
                try
                {
                    string file = Updater.Download(v, msg => Invoke(() => SetStatus(msg)));
                    Invoke(() => SetStatus("Güncelleme kuruluyor: " + v));
                    Updater.Install(file);
                }
                catch (Exception ex)
                {
                    LauncherLog.Write("update: failed: " + ex.Message);
                    Invoke(() =>
                    {
                        updating = false;
                        updateItem.Enabled = true;
                        SetStatus(url != null ? "Çalışıyor: " + url : "Hata: güncelleme indirilemedi");
                        tray.ShowBalloonTip(10000, "Güncelleme yapılamadı", ex.Message + " Daha sonra menüden tekrar deneyin.", ToolTipIcon.Warning);
                    });
                }
            }) { IsBackground = true };
            worker.Start();
        }

        private void ToggleAutoUpdate()
        {
            config.AutoUpdate = !config.AutoUpdate;
            autoUpdateItem.Checked = config.AutoUpdate;
            try { config.Save(); } catch (Exception ex) { LauncherLog.Write("config: " + ex.Message); }
        }

        private void RepairInstall()
        {
            LauncherLog.Write("repair requested");
            SetStatus("Onarılıyor");
            server.Stop();
            string problem = Repair.Run();
            if (problem != null)
            {
                SetStatus("Hata: " + problem);
                tray.ShowBalloonTip(15000, "Kurulum eksik", problem, ToolTipIcon.Error);
                Browser.Open("https://github.com/" + Updater.Repo + "/releases/latest");
                return;
            }
            openedOnce = true;
            url = null;
            server.Start(Config.Load());
        }

        private static Icon LoadIcon()
        {
            try
            {
                var icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
                if (icon != null) return icon;
            }
            catch { }
            return SystemIcons.Application;
        }

        private void Invoke(Action action)
        {
            try
            {
                if (tray.ContextMenuStrip.IsHandleCreated)
                {
                    tray.ContextMenuStrip.BeginInvoke(action);
                }
                else
                {
                    action();
                }
            }
            catch { }
        }

        private void SetStatus(string text)
        {
            statusItem.Text = text;
            tray.Text = Truncate("seowatcher: " + text, 63);
        }

        private void OnReady(string readyUrl)
        {
            url = readyUrl;
            SetStatus("Çalışıyor: " + readyUrl);
            if (!openedOnce && !silent)
            {
                openedOnce = true;
                OpenApp();
            }
            else if (!openedOnce)
            {
                openedOnce = true;
                tray.ShowBalloonTip(4000, "seowatcher hazır", readyUrl + " adresinde çalışıyor. Simgeye çift tıklayarak açın.", ToolTipIcon.Info);
            }
        }

        private void OnFailed(string message)
        {
            SetStatus("Hata: " + message);
            needsVcRedist = message.StartsWith(Server.RuntimeCrashMessage, StringComparison.Ordinal);
            needsReport = message.StartsWith(Server.EngineCrashMessage, StringComparison.Ordinal);
            fixItem.Visible = needsVcRedist;
            if (needsVcRedist)
            {
                tray.ShowBalloonTip(20000, "seowatcher için bir Windows bileşeni gerekiyor",
                    message + "\nBu baloncuğa tıklayın; paket kurulur, sonra uygulama kendiliğinden yeniden başlar.", ToolTipIcon.Warning);
            }
            else if (needsReport)
            {
                tray.ShowBalloonTip(20000, "seowatcher başlatılamadı",
                    message + "\nBu baloncuğa tıklayın: tanı bilgisi panoya kopyalanır ve GitHub'da hazır bir sorun kaydı açılır.", ToolTipIcon.Error);
            }
            else
            {
                tray.ShowBalloonTip(15000, "seowatcher başlatılamadı", message, ToolTipIcon.Error);
            }
        }

        // A failure the bundled Visual C++ package can fix: clicking the balloon
        // installs it. Any other balloon opens the app as before.
        private bool needsVcRedist;
        private bool needsReport;
        private ToolStripMenuItem fixItem;
        private void OnBalloonClicked()
        {
            if (needsVcRedist) InstallVcRedist();
            else if (needsReport) ReportIssue();
            else if (available != null && !updating) StartUpdate();
            else OpenApp();
        }

        /// <summary>Runs the bundled VC_redist.x64.exe elevated (one UAC prompt)
        /// and restarts the server when it finishes. Falls back to Microsoft's
        /// download page when the package is not beside the launcher.</summary>
        private void InstallVcRedist()
        {
            if (!File.Exists(Paths.VcRedistExe))
            {
                LauncherLog.Write("vcredist: bundled package missing, opening " + Server.VcRedistUrl);
                Browser.Open(Server.VcRedistUrl);
                return;
            }
            try
            {
                LauncherLog.Write("vcredist: installing " + Paths.VcRedistExe);
                SetStatus("Windows bileşeni kuruluyor");
                var psi = new ProcessStartInfo(Paths.VcRedistExe, "/install /passive /norestart") { UseShellExecute = true, Verb = "runas" };
                var p = Process.Start(psi);
                var worker = new Thread(() =>
                {
                    p.WaitForExit();
                    LauncherLog.Write("vcredist: exit code " + p.ExitCode);
                    Invoke(() =>
                    {
                        fixItem.Visible = false;
                        needsVcRedist = false;
                        Restart();
                    });
                }) { IsBackground = true };
                worker.Start();
            }
            catch (Exception ex)
            {
                // Typically the UAC prompt was declined (Win32Exception 1223).
                LauncherLog.Write("vcredist: " + ex.Message);
                SetStatus("Hata: Windows bileşeni kurulamadı. Menüden tekrar deneyin.");
                tray.ShowBalloonTip(10000, "Kurulum iptal edildi", "Yönetici izni verilmedi. Menüdeki \"Eksik Windows bileşenini kur\" ile yeniden deneyebilirsiniz.", ToolTipIcon.Warning);
            }
        }

        /// <summary>Opens a GitHub issue form with the diagnostics in the body (and
        /// on the clipboard, in case the URL is too long for the browser).</summary>
        private void ReportIssue()
        {
            string report = Diag.Report();
            try { Clipboard.SetText(report); } catch { }
            string body = "Aşağıdaki tanı bilgisi uygulamanın \"Sorunu bildir\" menüsünden geldi. Ne yapmaya çalıştığınızı bir cümleyle ekleyin.\n\n```\n" + report + "\n```\n";
            if (body.Length > 6000) body = body.Substring(0, 6000) + "\n```\n(kısaltıldı; tamamı panoda)\n";
            string title = "seowatcher " + Paths.Version() + ": " + (statusItem.Text.Length > 80 ? statusItem.Text.Substring(0, 80) : statusItem.Text);
            Browser.Open("https://github.com/" + Updater.Repo + "/issues/new?title=" + Uri.EscapeDataString(title) + "&body=" + Uri.EscapeDataString(body));
        }

        private void CopyDiagnostics()
        {
            try
            {
                Clipboard.SetText(Diag.Report());
                tray.ShowBalloonTip(5000, "Kopyalandı", "Tanı bilgisi panoya kopyalandı. GitHub'daki sorun kaydına yapıştırabilirsiniz.", ToolTipIcon.Info);
            }
            catch (Exception ex)
            {
                LauncherLog.Write("diag: " + ex.Message);
            }
        }

        private void OpenApp()
        {
            Browser.Open(url ?? ("http://127.0.0.1:" + config.Port + "/"));
        }

        private void Restart()
        {
            LauncherLog.Write("restart");
            SetStatus("Yeniden başlatılıyor");
            server.Stop();
            openedOnce = true;
            url = null;
            server.Start(Config.Load());
        }

        private void ToggleAutostart()
        {
            bool enable = !Autostart.IsEnabled();
            Autostart.Set(enable);
            autostartItem.Checked = Autostart.IsEnabled();
        }

        private static void OpenFolder(string path)
        {
            try
            {
                Directory.CreateDirectory(path);
                Process.Start(new ProcessStartInfo("explorer.exe", "\"" + path + "\"") { UseShellExecute = true });
            }
            catch { }
        }

        private void Quit()
        {
            try { if (updateTimer != null) updateTimer.Dispose(); } catch { }
            tray.Visible = false;
            server.Stop();
            ExitThread();
        }

        private static string Truncate(string s, int max)
        {
            return s.Length <= max ? s : s.Substring(0, max - 1) + "…";
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                server.Stop();
                tray.Dispose();
                quitEvent.Dispose();
            }
            base.Dispose(disposing);
        }
    }

    internal static class Autostart
    {
        private const string RunKey = "Software\\Microsoft\\Windows\\CurrentVersion\\Run";

        public static bool IsEnabled()
        {
            using (var key = Registry.CurrentUser.OpenSubKey(RunKey, false))
            {
                return key != null && key.GetValue(Program.AppName) != null;
            }
        }

        public static void Set(bool enabled)
        {
            using (var key = Registry.CurrentUser.CreateSubKey(RunKey))
            {
                if (key == null) return;
                if (enabled)
                {
                    key.SetValue(Program.AppName, "\"" + Application.ExecutablePath + "\" --silent");
                }
                else
                {
                    key.DeleteValue(Program.AppName, false);
                }
            }
        }
    }
}
