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
using System.Security.AccessControl;
using System.Security.Cryptography;
using System.Security.Principal;
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
        // Set by a second launch (Start menu, desktop shortcut) so the running
        // instance opens the app itself: it knows whether the server is ready.
        internal const string OpenEventName = "Local\\seowatcher-open";

        [STAThread]
        private static int Main(string[] args)
        {
            bool quit = Array.IndexOf(args, "--quit") >= 0;
            bool silent = Array.IndexOf(args, "--silent") >= 0;

            if (quit)
            {
                // Used by the installer and the uninstaller: ask the running
                // instance to stop and wait until it lets go of the mutex. It
                // stops node and workerd before releasing it, so the package
                // files are free once this returns 0.
                try
                {
                    using (var ev = EventWaitHandle.OpenExisting(QuitEventName))
                    {
                        ev.Set();
                    }
                }
                catch (Exception)
                {
                    return 0;
                }
                for (int i = 0; i < 300; i++)
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
                    // A second start at sign-in (a Run entry for all users and
                    // one for this user) must not pop up a browser.
                    if (silent) return 0;
                    // Otherwise the running instance opens the app: it waits
                    // for the server instead of showing a page that is not up.
                    try
                    {
                        using (var ev = EventWaitHandle.OpenExisting(OpenEventName))
                        {
                            ev.Set();
                            return 0;
                        }
                    }
                    catch (Exception) { }
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
        public static string RuntimeDir { get { return Path.Combine(DataRoot, "runtime"); } }
        public static string RuntimeMainConfig { get { return Path.Combine(RuntimeDir, "dist", "server", "wrangler.json"); } }
        public static string RuntimeAuditConfig { get { return Path.Combine(RuntimeDir, "dist", "seotracker_audit", "wrangler.json"); } }

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
            return WorkerdProbe(() => false, 20000);
        }

        public static string WorkerdProbe(Func<bool> cancelled, int timeoutMilliseconds)
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
                    var stdoutTask = p.StandardOutput.ReadToEndAsync();
                    var stderrTask = p.StandardError.ReadToEndAsync();
                    var elapsed = Stopwatch.StartNew();
                    while (!p.WaitForExit(50))
                    {
                        if (cancelled() || elapsed.ElapsedMilliseconds >= timeoutMilliseconds)
                        {
                            p.Kill();
                            if (!p.WaitForExit(2000)) return "hata: motor durdurulamadı";
                            return cancelled() ? "hata: motor denemesi iptal edildi" : "hata: motor denemesi zaman aşımına uğradı";
                        }
                    }
                    if (!System.Threading.Tasks.Task.WaitAll(new System.Threading.Tasks.Task[] { stdoutTask, stderrTask }, 2000))
                        return "hata: motor çıktı akışları kapanmadı";
                    string stdout = stdoutTask.Result.Trim();
                    string stderr = stderrTask.Result.Trim();
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
            return "seowatcher " + Paths.Version() + " Alpha" + "\r\n"
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

        /// <summary>Everything a bug report needs, ready for the clipboard.
        /// Nothing personal: user name, site names, e-mails, property ids and
        /// secret-looking values are masked, and only the last 25 log lines
        /// of each file are included.</summary>
        public static string Report()
        {
            var sb = new System.Text.StringBuilder();
            sb.AppendLine("Bu rapor kişisel veri içermesin diye maskelenmiştir (kullanıcı adı, site adları, e-postalar, anahtarlar). Göndermeden önce yine de göz atın.");
            sb.AppendLine();
            sb.AppendLine(Summary());
            sb.AppendLine("Motor denemesi (workerd test): " + WorkerdProbe());
            sb.AppendLine("Windows olay günlüğü (hatalı modül): " + FaultingModules());
            sb.AppendLine("Çökme dökümleri: " + Dumps());
            sb.AppendLine("PATH üzerinde başka vcruntime/msvcp kopyası: " + StrayRuntimeDlls());
            if (Server.LastCommand != null) sb.AppendLine("Son komut: " + Server.LastCommand);
            sb.AppendLine();
            foreach (var log in new[] { Paths.LauncherLog, Paths.MigrateLog, Paths.ServerLog })
            {
                sb.AppendLine("---- " + Path.GetFileName(log) + " (son 25 satır)");
                try
                {
                    // server.log is open for writing while the server runs:
                    // File.ReadAllLines would fail on the sharing mode.
                    var lines = new List<string>();
                    using (var stream = new FileStream(log, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete))
                    using (var reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        string line;
                        while ((line = reader.ReadLine()) != null)
                        {
                            lines.Add(line);
                            if (lines.Count > 25) lines.RemoveAt(0);
                        }
                    }
                    foreach (var line in lines) sb.AppendLine(line);
                }
                catch { sb.AppendLine("(okunamadı)"); }
                sb.AppendLine();
            }
            return Scrub(sb.ToString());
        }

        private static readonly string[] PublicHosts = { "127.0.0.1", "localhost", "github.com", "api.github.com", "googleapis.com", "google.com", "seowatcher.io", "microsoft.com", "cloudflare-dns.com" };

        /// <summary>The report goes to the clipboard and into a public GitHub
        /// issue, so it is scrubbed before it leaves the machine.</summary>
        /// <summary>Replaces the user's profile folder with %USERPROFILE% in any text shown outside the machine.</summary>
        public static string MaskProfile(string text)
        {
            string profile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            return string.IsNullOrEmpty(profile) || text == null ? text : text.Replace(profile, "%USERPROFILE%");
        }

        private static string R(string input, string pattern, string replacement)
        {
            return System.Text.RegularExpressions.Regex.Replace(input, pattern, replacement);
        }

        private static string Scrub(string text)
        {
            string profile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            if (!string.IsNullOrEmpty(profile)) text = text.Replace(profile, "%USERPROFILE%");
            text = R(text, @"(?i)(bearer\s+)[A-Za-z0-9_\-]{8,}", "$1<gizli>");
            text = R(text, @"(?i)\b(MCP_TOKEN|WINDOWS_SETTINGS_TOKEN|BETTER_AUTH_SECRET|GOOGLE_CLIENT_SECRET|GOOGLE_CLIENT_ID|PAGESPEED_API_KEY|CLIENT_SECRET|API_KEY|TOKEN)\s*[:=]\s*\S+", "$1=<gizli>");
            text = R(text, @"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}", "<e-posta>");
            text = R(text, @"properties/\d+", "properties/<mülk>");
            text = R(text, @"sc-domain:[^\s""',;]+", "sc-domain:<site>");
            // Host names: anything that is not a public service of the app is a user's site.
            text = System.Text.RegularExpressions.Regex.Replace(text, @"(?i)\b(?:https?://)?((?:[a-z0-9\-]+\.)+[a-z]{2,})(?=[/:\s""'),;]|$)", m =>
            {
                string host = m.Groups[1].Value.ToLowerInvariant();
                foreach (var ok in PublicHosts) if (host == ok || host.EndsWith("." + ok)) return m.Value;
                return m.Value.Replace(m.Groups[1].Value, "<site>");
            });
            // Long opaque strings (keys, ids) that survived the named patterns.
            text = R(text, @"(?<![A-Za-z0-9/+=_\-])[A-Za-z0-9_\-]{32,}(?![A-Za-z0-9/+=_\-])", "<gizli>");
            return text;
        }
    }

    /// <summary>Size limits for the three log files. A file over its limit is
    /// moved to name.old.log (replacing the previous one), so the last two
    /// generations are always there for a bug report.</summary>
    internal static class LogFile
    {
        public static string OldPath(string path)
        {
            return Path.Combine(Path.GetDirectoryName(path), Path.GetFileNameWithoutExtension(path) + ".old.log");
        }

        public static void Rotate(string path, long maxBytes)
        {
            try
            {
                var info = new FileInfo(path);
                if (!info.Exists || info.Length <= maxBytes) return;
                string old = OldPath(path);
                if (File.Exists(old)) File.Delete(old);
                File.Move(path, old);
            }
            catch { }
        }
    }

    /// <summary>launcher.log: what the tray app itself did, separate from the
    /// server's own output. Rotated at 1 MB.</summary>
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
                    LogFile.Rotate(Paths.LauncherLog, 1024 * 1024);
                    File.AppendAllText(Paths.LauncherLog, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + line + "\r\n", new UTF8Encoding(false));
                }
                catch { }
            }
        }
    }

    /// <summary>config.json: the port, the auto-update switch and the version
    /// that last ran. Hand-written JSON on purpose: no serializer dependency,
    /// three flat fields. Every change re-reads the file first, so a port the
    /// user typed in while the app runs is not overwritten.</summary>
    internal sealed class Config
    {
        public const int DefaultPort = 3001;
        public int Port = DefaultPort;
        // Download and install a newer release by itself (verified by SHA-256).
        public bool AutoUpdate = true;
        // The version that ran last; a lower one means an update just finished.
        public string LastVersion;

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
                    var v = System.Text.RegularExpressions.Regex.Match(text, "\"lastVersion\"\\s*:\\s*\"([0-9.]{1,32})\"");
                    if (v.Success) cfg.LastVersion = v.Groups[1].Value;
                }
            }
            catch { }
            return cfg;
        }

        public void Save()
        {
            Directory.CreateDirectory(Paths.DataRoot);
            string text = "{\n  \"port\": " + Port + ",\n  \"autoUpdate\": " + (AutoUpdate ? "true" : "false")
                + (LastVersion != null ? ",\n  \"lastVersion\": \"" + LastVersion + "\"" : "") + "\n}\n";
            // Written next to the file and swapped in, so a crash or a full disk
            // cannot leave a half-written config.json behind.
            string tmp = Paths.ConfigFile + ".tmp";
            File.WriteAllText(tmp, text, new UTF8Encoding(false));
            if (File.Exists(Paths.ConfigFile))
            {
                try { File.Replace(tmp, Paths.ConfigFile, null); return; }
                catch (IOException) { File.Delete(Paths.ConfigFile); }
            }
            File.Move(tmp, Paths.ConfigFile);
        }

        /// <summary>Re-reads config.json, applies one change and writes it back.</summary>
        public static Config Update(Action<Config> change)
        {
            var cfg = Load();
            change(cfg);
            cfg.Save();
            return cfg;
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
            catch (Exception ex) { LauncherLog.Write("browser: " + ex.Message); }
        }
    }

    /// <summary>A release the updater may install: the version and whether
    /// the release carries the Windows installer and SHA256SUMS.txt.</summary>
    internal sealed class Release
    {
        public Version Version;
        public bool HasInstaller;
    }

    /// <summary>A download whose content failed verification; never retried
    /// automatically, and the message says so.</summary>
    internal sealed class UpdateVerifyException : Exception
    {
        public UpdateVerifyException(string message) : base(message) { }
    }

    /// <summary>Keeps the install current without a package manager: asks
    /// GitHub for the latest release, downloads the installer next to the data,
    /// checks it against the published SHA256SUMS.txt and runs it silently. The
    /// installer stops this instance, replaces the files and starts the new
    /// launcher itself (see seowatcher.iss, the skipifnotsilent [Run] entry).
    ///
    /// Every URL is built here from the fixed repository and a parsed version
    /// number; nothing from the API response is ever fetched. Redirects may
    /// only land on GitHub's own hosts over HTTPS.</summary>
    internal static class Updater
    {
        public const string Repo = "ucsahinn/seotracker";
        public static readonly string UpdateDir = Path.Combine(Paths.DataRoot, "updates");
        private const long MaxInstallerBytes = 500L * 1024 * 1024;
        private static readonly HashSet<string> RetiredVersions = new HashSet<string>(StringComparer.Ordinal)
        {
            "2.0.0", "2.1.0", "2.2.0", "2.2.1", "2.3.0", "2.4.3", "2.5.0"
        };

        public static Version Current()
        {
            Version v;
            return Version.TryParse(Paths.Version(), out v) ? v : new Version(0, 0, 0);
        }

        public static bool ShouldOfferUpdate(Version current, Version latest)
        {
            if (current == null || latest == null) return false;
            if (current.Major == 0 && RetiredVersions.Contains(latest.ToString())) return false;
            if (current.Major >= 1 && RetiredVersions.Contains(current.ToString()) && latest.Major == 0) return true;
            return latest > current;
        }

        public static string InstallerName(Version v)
        {
            return "seowatcher-setup-" + v + ".exe";
        }

        public static string ReleasePage(Version v)
        {
            return "https://github.com/" + Repo + "/releases/" + (v == null ? "latest" : "tag/v" + v);
        }

        /// <summary>Installed by the setup program (an uninstaller sits next to
        /// the launcher), not run from a build folder. Only then may an update
        /// replace it.</summary>
        public static bool IsInstalled()
        {
            return File.Exists(Path.Combine(Paths.ExeDir, "unins000.exe"));
        }

        /// <summary>A per-user install under %LOCALAPPDATA%: the update needs
        /// no administrator, so it may run without asking.</summary>
        public static bool IsPerUserInstall()
        {
            string local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData).TrimEnd('\\') + "\\";
            return IsInstalled() && Paths.ExeDir.StartsWith(local, StringComparison.OrdinalIgnoreCase);
        }

        private static bool TrustedHost(Uri uri)
        {
            if (uri == null || uri.Scheme != Uri.UriSchemeHttps) return false;
            string host = uri.Host.ToLowerInvariant();
            return host == "github.com" || host == "api.github.com" || host.EndsWith(".githubusercontent.com");
        }

        private static HttpWebRequest Request(string url, int timeoutMs)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var req = (HttpWebRequest)WebRequest.Create(url);
            req.UserAgent = "seowatcher/" + Paths.Version();
            req.Accept = "application/vnd.github+json, application/octet-stream, text/plain, */*";
            req.Timeout = timeoutMs;
            req.ReadWriteTimeout = 60000;
            req.AllowAutoRedirect = true;
            req.MaximumAutomaticRedirections = 5;
            return req;
        }

        private static string Get(string url, int timeoutMs)
        {
            using (var resp = (HttpWebResponse)Request(url, timeoutMs).GetResponse())
            {
                if (!TrustedHost(resp.ResponseUri)) throw new UpdateVerifyException("Beklenmeyen adrese yönlendirildi: " + resp.ResponseUri.Host);
                using (var reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        /// <summary>One plain Turkish sentence for a failed request.</summary>
        public static string Describe(Exception ex)
        {
            if (ex is UpdateVerifyException) return ex.Message;
            var web = ex as WebException;
            if (web != null)
            {
                var resp = web.Response as HttpWebResponse;
                if (resp != null)
                {
                    int code = (int)resp.StatusCode;
                    if (code == 403 || code == 429) return "GitHub şu an çok fazla istek alıyor. Bir saat sonra tekrar deneyin.";
                    if (code == 404) return "Sürüm dosyası GitHub'da bulunamadı. Biraz sonra tekrar deneyin.";
                    return "GitHub beklenmedik bir yanıt verdi (" + code + "). Biraz sonra tekrar deneyin.";
                }
                if (web.Status == WebExceptionStatus.Timeout) return "GitHub zamanında yanıt vermedi. İnternet bağlantınızı kontrol edip tekrar deneyin.";
            }
            if (ex is IOException || ex is UnauthorizedAccessException) return "Güncelleme dosyası diske yazılamadı (" + ex.Message + ").";
            return "GitHub'a ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.";
        }

        /// <summary>The latest published release. Throws on network errors;
        /// Describe turns the exception into a sentence.</summary>
        public static Release CheckLatest()
        {
            string json = Get("https://api.github.com/repos/" + Repo + "/releases/latest", 15000);
            var m = System.Text.RegularExpressions.Regex.Match(json, "\"tag_name\"\\s*:\\s*\"v?([0-9]+\\.[0-9]+\\.[0-9]+)\"");
            Version v;
            if (!m.Success || !Version.TryParse(m.Groups[1].Value, out v))
            {
                throw new UpdateVerifyException("GitHub'daki son sürümün numarası okunamadı.");
            }
            // The tag can exist before the Windows job has attached the files
            // (a release without them is not one this updater can install).
            bool hasInstaller = System.Text.RegularExpressions.Regex.IsMatch(json, "\"name\"\\s*:\\s*\"" + System.Text.RegularExpressions.Regex.Escape(InstallerName(v)) + "\"");
            bool hasSums = System.Text.RegularExpressions.Regex.IsMatch(json, "\"name\"\\s*:\\s*\"SHA256SUMS\\.txt\"");
            LauncherLog.Write("update: latest " + v + ", installed " + Current() + (hasInstaller && hasSums ? "" : ", installer or SHA256SUMS.txt not attached"));
            return new Release { Version = v, HasInstaller = hasInstaller && hasSums };
        }

        public static string Sha256(string file)
        {
            using (var sha = SHA256.Create())
            using (var stream = File.OpenRead(file))
            {
                return BitConverter.ToString(sha.ComputeHash(stream)).Replace("-", "").ToLowerInvariant();
            }
        }

        /// <summary>Downloads seowatcher-setup-X.exe, verifies it against the
        /// release's SHA256SUMS.txt and returns its path. The file is written as
        /// .part and only renamed once the hash matches, so a broken or
        /// tampered download never sits under the installer's name.</summary>
        public static string Download(Version v, Action<int> progress)
        {
            string name = InstallerName(v);
            string baseUrl = "https://github.com/" + Repo + "/releases/download/v" + v + "/";
            Directory.CreateDirectory(UpdateDir);
            string file = Path.Combine(UpdateDir, name);
            string part = file + ".part";

            string sums = Get(baseUrl + "SHA256SUMS.txt", 15000);
            var m = System.Text.RegularExpressions.Regex.Match(sums, "(?im)^([0-9a-f]{64})\\s+\\*?" + System.Text.RegularExpressions.Regex.Escape(name) + "\\s*$");
            if (!m.Success) throw new UpdateVerifyException("Sürümün SHA256SUMS.txt dosyasında " + name + " yok; güncelleme kurulmadı.");
            string expected = m.Groups[1].Value.ToLowerInvariant();

            // A verified copy from an earlier attempt (the installer did not run
            // or was cancelled) is reused instead of downloading 80 MB again.
            if (File.Exists(file))
            {
                if (Sha256(file) == expected) { LauncherLog.Write("update: reusing verified " + file); return file; }
                File.Delete(file);
            }

            try
            {
                using (var resp = (HttpWebResponse)Request(baseUrl + name, 30000).GetResponse())
                {
                    if (!TrustedHost(resp.ResponseUri)) throw new UpdateVerifyException("İndirme beklenmeyen bir adrese yönlendirildi (" + resp.ResponseUri.Host + "); güncelleme kurulmadı.");
                    long total = resp.ContentLength;
                    if (total > MaxInstallerBytes) throw new UpdateVerifyException("İndirilecek dosya beklenenden çok büyük; güncelleme kurulmadı.");
                    using (var input = resp.GetResponseStream())
                    using (var output = new FileStream(part, FileMode.Create, FileAccess.Write, FileShare.None))
                    {
                        var buffer = new byte[81920];
                        long done = 0;
                        int lastPercent = -1;
                        int read;
                        while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            output.Write(buffer, 0, read);
                            done += read;
                            if (done > MaxInstallerBytes) throw new UpdateVerifyException("İndirilen dosya beklenenden çok büyük; güncelleme kurulmadı.");
                            if (total > 0)
                            {
                                int percent = (int)(done * 100 / total);
                                if (percent != lastPercent) { lastPercent = percent; progress(percent); }
                            }
                        }
                    }
                }
                if (Sha256(part) != expected)
                {
                    throw new UpdateVerifyException("İndirilen dosyanın SHA-256 özeti sürüm sayfasındakiyle tutmuyor; güncelleme kurulmadı.");
                }
                File.Move(part, file);
            }
            finally
            {
                try { if (File.Exists(part)) File.Delete(part); } catch { }
            }
            LauncherLog.Write("update: downloaded and verified " + file);
            return file;
        }

        /// <summary>Starts the installer. It stops this instance itself and
        /// starts the new version when it is done; if it exits while this
        /// instance still runs, the update did not happen.</summary>
        public static Process Install(string file)
        {
            LauncherLog.Write("update: installing " + file);
            return Process.Start(new ProcessStartInfo(file, "/SILENT /SP- /SUPPRESSMSGBOXES /NORESTART") { UseShellExecute = true });
        }

        /// <summary>Removes downloaded installers and partial downloads. Called
        /// well after start: right after an update the installer that started
        /// this instance may still be running from this folder.</summary>
        public static void Cleanup()
        {
            try
            {
                if (!Directory.Exists(UpdateDir)) return;
                foreach (var f in Directory.GetFiles(UpdateDir))
                {
                    string n = Path.GetFileName(f);
                    if (!n.StartsWith("seowatcher-setup-", StringComparison.OrdinalIgnoreCase)) continue;
                    try { File.Delete(f); } catch { }
                }
            }
            catch { }
        }
    }

    /// <summary>"Kurulumu onar": the cheap, safe things that fix most stuck
    /// installs: drop wrangler's scratch files and the engine probe, confirm
    /// the package is whole, then the normal start path re-runs the
    /// migrations and the preflight.</summary>
    internal static class Repair
    {
        /// <summary>Returns the missing package files, empty when it is complete.</summary>
        public static List<string> Run()
        {
            foreach (var cfg in new[] { Paths.RuntimeMainConfig, Paths.RuntimeAuditConfig })
            {
                try
                {
                    string scratch = Path.Combine(Path.GetDirectoryName(cfg), ".wrangler");
                    if (Directory.Exists(scratch)) Directory.Delete(scratch, true);
                }
                catch (Exception ex) { LauncherLog.Write("repair: " + ex.Message); }
            }
            try { File.Delete(Path.Combine(Paths.DataRoot, "probe.capnp")); } catch { }
            var missing = new List<string>();
            foreach (var f in new[] { Paths.NodeExe, Paths.WranglerJs, Paths.MainConfig, Paths.AuditConfig, Paths.WorkerdExe })
            {
                if (!File.Exists(f)) missing.Add(Path.GetFileName(f));
            }
            LauncherLog.Write("repair: scratch cleared, missing files: " + (missing.Count == 0 ? "none" : string.Join(", ", missing)));
            return missing;
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
                    "Veri klasöründeki instance-secret dosyası geçerli bir şifreleme anahtarı değil. " +
                    "Yedekten geri yükleyin; Google hiç bağlanmadıysa dosyayı silip Yeniden başlat deyin.");
            }
            return value;
        }

        /// <summary>The MCP token guards nothing stored, so a short or empty file
        /// is simply regenerated.</summary>
        public static string EnsureMcpToken()
        {
            Directory.CreateDirectory(Paths.DataRoot);
            string stored = File.Exists(Paths.McpToken) ? File.ReadAllText(Paths.McpToken) : "";
            string value = stored.Trim();
            // The value lands in server.env as a line: anything that is not a
            // token character (a pasted newline, a quote) is dropped first.
            value = System.Text.RegularExpressions.Regex.Replace(value, "[^A-Za-z0-9_-]", "");
            if (value.Length < 16)
            {
                value = Convert.ToBase64String(RandomBytes(24)).Replace("+", "").Replace("/", "").Replace("=", "");
            }
            if (value != stored)
            {
                string tmp = Paths.McpToken + "." + Guid.NewGuid().ToString("N") + ".tmp";
                try
                {
                    File.WriteAllText(tmp, value, new UTF8Encoding(false));
                    if (File.Exists(Paths.McpToken)) File.Replace(tmp, Paths.McpToken, null);
                    else File.Move(tmp, Paths.McpToken);
                }
                catch (Exception ex)
                {
                    throw new IOException("MCP token dosyası kaydedilemedi. Veri klasörünün yazılabilir olduğunu kontrol edip yeniden başlatın.", ex);
                }
                finally { if (File.Exists(tmp)) File.Delete(tmp); }
            }
            return File.ReadAllText(Paths.McpToken);
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

        public bool Add(Process process)
        {
            return handle != IntPtr.Zero && AssignProcessToJobObject(handle, process.Handle);
        }

        /// <summary>Terminates every process in the job and waits until they
        /// are gone (termination is asynchronous): until then node.exe and
        /// workerd.exe still hold the port and their files.</summary>
        public void KillAllAndWait(int timeoutMs)
        {
            if (handle == IntPtr.Zero) return;
            TerminateJobObject(handle, 0);
            var until = DateTime.UtcNow.AddMilliseconds(timeoutMs);
            while (DateTime.UtcNow < until)
            {
                var info = new JOBOBJECT_BASIC_ACCOUNTING_INFORMATION();
                int returned;
                if (!QueryInformationJobObject(handle, JobObjectBasicAccountingInformation, out info, Marshal.SizeOf(typeof(JOBOBJECT_BASIC_ACCOUNTING_INFORMATION)), out returned)) return;
                if (info.ActiveProcesses == 0) return;
                Thread.Sleep(50);
            }
            LauncherLog.Write("job: processes still running after " + timeoutMs + " ms");
        }

        public void Dispose()
        {
            if (handle != IntPtr.Zero)
            {
                CloseHandle(handle);
                handle = IntPtr.Zero;
            }
        }

        private const int JobObjectBasicAccountingInformation = 1;
        private const int JobObjectExtendedLimitInformation = 9;

        [StructLayout(LayoutKind.Sequential)]
        private struct JOBOBJECT_BASIC_ACCOUNTING_INFORMATION
        {
            public long TotalUserTime;
            public long TotalKernelTime;
            public long ThisPeriodTotalUserTime;
            public long ThisPeriodTotalKernelTime;
            public uint TotalPageFaultCount;
            public uint TotalProcesses;
            public uint ActiveProcesses;
            public uint TotalTerminatedProcesses;
        }

        [DllImport("kernel32.dll")]
        private static extern bool QueryInformationJobObject(IntPtr job, int infoClass, out JOBOBJECT_BASIC_ACCOUNTING_INFORMATION info, int length, out int returned);
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
    /// reports back through events marshalled to the UI by TrayApp.
    ///
    /// Every start gets a generation number and Stop moves it on, so a start
    /// that is still migrating when the user restarts can never start a
    /// second server or report a stale failure.</summary>
    internal sealed class Server
    {
        public WindowsSettingsBridge NativeSettings { get; set; }
        public event Action<string> Status;
        public event Action<string> Ready;
        public event Action<string> Failed;
        // The server answered once and then went away on its own.
        public event Action<string> Crashed;

        private readonly object gate = new object();
        private readonly object probeGate = new object();
        private int generation;
        private KillOnCloseJob job;
        private Process process;
        private StreamWriter log;
        private long logBytes;
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
        private const long ServerLogMax = 5 * 1024 * 1024;
        private static readonly TimeSpan MigrateTimeout = TimeSpan.FromMinutes(15);

        public int Port { get; private set; }
        public int ConfiguredPort { get; private set; }

        public void Start(Config cfg)
        {
            int gen;
            lock (gate) { gen = ++generation; }
            var thread = new Thread(() => Run(cfg, gen)) { IsBackground = true, Name = "seowatcher-server" };
            thread.Start();
        }

        /// <summary>Stops the server and waits (up to 10 s) until node and
        /// workerd are gone, so the port and the package files are free when
        /// this returns.</summary>
        public void Stop()
        {
            KillOnCloseJob oldJob;
            StreamWriter oldLog;
            lock (gate)
            {
                generation++;
                oldJob = job;
                job = null;
                process = null;
                oldLog = log;
                log = null;
            }
            // The probe runs before the server job exists. Wait for its
            // generation cancellation to reap it before a replacement starts.
            lock (probeGate) { }
            if (oldJob != null)
            {
                oldJob.KillAllAndWait(10000);
                oldJob.Dispose();
            }
            if (oldLog != null)
            {
                try { oldLog.Flush(); oldLog.Dispose(); } catch { }
            }
        }

        private bool IsCurrent(int gen)
        {
            lock (gate) { return gen == generation; }
        }

        private string ProbeEngine(int gen)
        {
            lock (probeGate)
            {
                if (!IsCurrent(gen)) return "hata: motor denemesi iptal edildi";
                return Diag.WorkerdProbe(() => !IsCurrent(gen), 20000);
            }
        }

        private void Run(Config cfg, int gen)
        {
            var startedAt = DateTime.UtcNow;
            try
            {
                Directory.CreateDirectory(Paths.PersistDir);
                Directory.CreateDirectory(Paths.LogDir);

                if (!File.Exists(Paths.NodeExe)) throw new FileNotFoundException("Kurulum eksik: Node çalışma zamanı bulunamadı. Menüden Kurulumu onar deyin.", Paths.NodeExe);
                if (!File.Exists(Paths.WranglerJs)) throw new FileNotFoundException("Kurulum eksik: wrangler bulunamadı. Menüden Kurulumu onar deyin.", Paths.WranglerJs);
                if (!File.Exists(Paths.MainConfig)) throw new FileNotFoundException("Kurulum eksik: uygulama paketi bulunamadı. Menüden Kurulumu onar deyin.", Paths.MainConfig);

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
                string probe = ProbeEngine(gen);
                if (!IsCurrent(gen)) return;
                LauncherLog.Write("preflight: workerd " + probe);
                if (!probe.StartsWith("ok"))
                {
                    throw new InvalidOperationException(EngineCrashMessage + "motor tek başına da başlayamıyor (" + probe + "). Menüden Sorunu bildir deyin; tanı bilgisi kayda eklenir.");
                }
                if (!IsCurrent(gen)) return;

                Emit(gen, Status, "Anahtarlar hazırlanıyor");
                string secret = Secrets.EnsureInstanceSecret();
                string token = Secrets.EnsureMcpToken();

                ConfiguredPort = cfg.Port;
                Port = ChoosePort(cfg.Port, gen);
                if (!IsCurrent(gen)) return;
                // After the port is chosen: server.env says whether this run
                // moved off the configured port, so the app can tell the
                // operator why Google sign-in fails. Rewritten on every start,
                // so a fallback line never outlives the run it describes.
                WriteServerEnv(secret, token);

                KillOnCloseJob runJob;
                lock (gate)
                {
                    if (gen != generation) return;
                    job = new KillOnCloseJob();
                    runJob = job;
                }

                Emit(gen, Status, "Veritabanı güncelleniyor");
                LauncherLog.Write("port " + Port + (Port != cfg.Port ? " (" + cfg.Port + " is taken)" : "") + ", data " + Paths.PersistDir);
                int migrateExit = RunAndWait(
                    "\"" + Paths.WranglerJs + "\" d1 migrations apply DB --local" +
                    " -c \"" + Paths.RuntimeMainConfig + "\"" +
                    " --persist-to \"" + Paths.PersistDir + "\"",
                    Paths.MigrateLog, runJob, gen);
                if (!IsCurrent(gen)) return;
                if (migrateExit == int.MinValue)
                {
                    throw new TimeoutException("Veritabanı güncellemesi " + (int)MigrateTimeout.TotalMinutes + " dakikada bitmedi. Yeniden başlat deyin; olmazsa Günlükleri aç ile migrate.log dosyasına bakın.");
                }
                if (migrateExit != 0)
                {
                    throw new InvalidOperationException("Veritabanı güncellemesi başarısız (çıkış kodu " + migrateExit + "). Yeniden başlat deyin; olmazsa Günlükleri aç ile migrate.log dosyasına bakın.");
                }

                runtimeCrashed = false;
                Emit(gen, Status, "Sunucu başlatılıyor");
                Process started;
                lock (gate)
                {
                    if (gen != generation) return;
                    LogFile.Rotate(Paths.ServerLog, ServerLogMax);
                    log = OpenServerLog();
                    log.WriteLine("---- " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " seowatcher " + Paths.Version() + " starting on port " + Port);

                    process = StartNode(
                        "\"" + Paths.WranglerJs + "\" dev" +
                        " -c \"" + Paths.RuntimeMainConfig + "\"" +
                        " -c \"" + Paths.RuntimeAuditConfig + "\"" +
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
                    started = process;
                }

                string url = "http://127.0.0.1:" + Port + "/";
                var deadline = DateTime.UtcNow.AddSeconds(120);
                bool ready = false;
                while (DateTime.UtcNow < deadline)
                {
                    if (!IsCurrent(gen)) return;
                    if (started.HasExited)
                    {
                        Thread.Sleep(300); // let the last stderr lines land before deciding why
                        if (!IsCurrent(gen)) return;
                        if (runtimeCrashed)
                        {
                            string after = ProbeEngine(gen);
                            if (!IsCurrent(gen)) return;
                            LauncherLog.Write("workerd probe after crash: " + after);
                            LauncherLog.Write("event log: " + Diag.FaultingModules());
                            LauncherLog.Write("dumps: " + Diag.Dumps());
                            string vc = Diag.VcRuntimeProblem();
                            if (vc != null) throw new InvalidOperationException(RuntimeCrashMessage + vc);
                            throw new InvalidOperationException(EngineCrashMessage + (after.StartsWith("ok")
                                ? "motor tek başına çalışıyor, sorun veri klasöründe ya da yapılandırmada. Önce Kurulumu onar deyin; düzelmezse Sorunu bildir."
                                : "motor bu bilgisayarda tek başına da başlayamıyor (" + after + "). Menüden Sorunu bildir deyin."));
                        }
                        throw new InvalidOperationException("Sunucu beklenmedik şekilde kapandı. Yeniden başlat deyin; olmazsa Günlükleri aç ile server.log dosyasına bakın.");
                    }
                    if (Health(url))
                    {
                        ready = true;
                        break;
                    }
                    Thread.Sleep(1000);
                }
                if (!ready)
                {
                    throw new TimeoutException("Sunucu 120 saniyede yanıt vermedi. Yeniden başlat deyin; olmazsa Günlükleri aç ile server.log dosyasına bakın.");
                }
                if (!IsCurrent(gen)) return;
                LauncherLog.Write("ready: " + url + " (" + Math.Round((DateTime.UtcNow - startedAt).TotalSeconds, 1) + "s after start)");
                Emit(gen, Ready, url);

                // Watch the running server: an exit nobody asked for is a crash,
                // and the tray app decides whether to start it again.
                while (!started.WaitForExit(1000))
                {
                    if (!IsCurrent(gen)) return;
                }
                Thread.Sleep(300);
                if (!IsCurrent(gen)) return;
                int code = 0;
                try { code = started.ExitCode; } catch { }
                LauncherLog.Write("server stopped by itself (exit " + code + ")");
                SafeLog("launcher: server stopped by itself (exit " + code + ")");
                Emit(gen, Crashed, "Sunucu kendiliğinden kapandı (çıkış kodu " + code + ").");
            }
            catch (Exception ex)
            {
                if (!IsCurrent(gen)) return;
                SafeLog("launcher error: " + ex.Message);
                LauncherLog.Write("error: " + ex.Message);
                Emit(gen, Failed, ex.Message);
            }
        }

        /// <summary>Opens server.log for appending; call with gate held.</summary>
        private StreamWriter OpenServerLog()
        {
            var stream = new FileStream(Paths.ServerLog, FileMode.Append, FileAccess.Write, FileShare.ReadWrite | FileShare.Delete);
            logBytes = stream.Length;
            var w = new StreamWriter(stream, new UTF8Encoding(false));
            w.AutoFlush = true;
            return w;
        }

        private void WriteServerEnv(string secret, string token)
        {
            // Preserve the built layout so bundle, asset and migration paths
            // remain relative, while Wrangler writes only in per-user storage.
            CopyRuntimeTree(Path.Combine(Paths.AppDir, "dist"), Path.Combine(Paths.RuntimeDir, "dist"));
            CopyRuntimeTree(Path.Combine(Paths.AppDir, "drizzle"), Path.Combine(Paths.RuntimeDir, "drizzle"));
            var sb = new StringBuilder();
            sb.Append("AUTH_MODE=local_noauth\n");
            sb.Append("BETTER_AUTH_SECRET=").Append(secret).Append('\n');
            sb.Append("MCP_TOKEN=").Append(token).Append('\n');
            // Lets the app tell the Windows package from Docker: Ayarlar > Hakkında
            // then describes the tray updater instead of a docker compose command.
            sb.Append("INSTALL_KIND=windows\n");
            // Only when the configured port was taken and this run fell back
            // to another one: the app shows a banner naming both numbers.
            if (Port != ConfiguredPort)
            {
                sb.Append("WINDOWS_PORT_FALLBACK=").Append(ConfiguredPort).Append("->").Append(Port).Append('\n');
            }
            if (NativeSettings != null)
            {
                sb.Append("WINDOWS_SETTINGS_PORT=").Append(NativeSettings.Port).Append('\n');
                sb.Append("WINDOWS_SETTINGS_TOKEN=").Append(NativeSettings.Token).Append('\n');
            }
            string env = sb.ToString();
            File.WriteAllText(Paths.ServerEnv, env, new UTF8Encoding(false));
            WriteAuditWorkerVars(env);
        }

        private static void CopyRuntimeTree(string source, string target)
        {
            Directory.CreateDirectory(target);
            foreach (string file in Directory.GetFiles(source))
            {
                string name = Path.GetFileName(file);
                if (name.StartsWith(".dev.vars", StringComparison.OrdinalIgnoreCase) || name.StartsWith(".env", StringComparison.OrdinalIgnoreCase)) continue;
                File.Copy(file, Path.Combine(target, name), true);
            }
            foreach (string dir in Directory.GetDirectories(source))
            {
                if (Path.GetFileName(dir) == ".wrangler") continue;
                CopyRuntimeTree(dir, Path.Combine(target, Path.GetFileName(dir)));
            }
        }

        /// <summary>`wrangler dev --env-file` reaches only the primary worker.
        /// The audit worker is a separate worker with its own bindings, and it
        /// reads the same instance key (a saved PageSpeed key is sealed with
        /// it); without a copy next to its config the audit failed at the speed
        /// phase with "No instance encryption key". Wrangler reads `.dev.vars`
        /// beside each worker's per-user config, so write one there on every start. The
        /// file holds the secrets, so it is restricted to the current user,
        /// and its contents are never logged.</summary>
        private static void WriteAuditWorkerVars(string env)
        {
            string path = Path.Combine(Path.GetDirectoryName(Paths.RuntimeAuditConfig), ".dev.vars");
            File.WriteAllText(path, env, new UTF8Encoding(false));
            try
            {
                var security = new FileSecurity();
                security.SetAccessRuleProtection(true, false);
                security.AddAccessRule(new FileSystemAccessRule(
                    WindowsIdentity.GetCurrent().User, FileSystemRights.FullControl, AccessControlType.Allow));
                new FileInfo(path).SetAccessControl(security);
            }
            catch (Exception ex)
            {
                // The workspace is inside the current user's data directory.
                LauncherLog.Write("audit worker vars: could not restrict access (" + ex.GetType().Name + ")");
            }
        }

        /// <summary>The configured port, unless another program holds it; then
        /// the next free one up to +9 for this run only. The fallback is not
        /// saved: the Google redirect addresses name the configured port, so
        /// the next start goes back to it as soon as it is free. Right after a
        /// restart or an update the previous server may still be letting go of
        /// the port, so it is given three seconds first.</summary>
        private int ChoosePort(int configured, int gen)
        {
            var until = DateTime.UtcNow.AddSeconds(3);
            while (!PortFree(configured) && DateTime.UtcNow < until && IsCurrent(gen))
            {
                Thread.Sleep(500);
            }
            for (int candidate = configured; candidate < configured + 10 && candidate < 65536; candidate++)
            {
                if (PortFree(candidate)) return candidate;
            }
            throw new InvalidOperationException(configured + " ve sonraki 9 adres numarası (port) dolu. Veri klasöründeki config.json içindeki \"port\" değerini değiştirip Yeniden başlat deyin.");
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
                WorkingDirectory = Paths.RuntimeDir,
                StandardOutputEncoding = Encoding.UTF8,
                StandardErrorEncoding = Encoding.UTF8,
            };
            psi.EnvironmentVariables["WRANGLER_SEND_METRICS"] = "false";
            // wrangler's own debug logs go next to ours (it removes files older
            // than 30 days itself) instead of the roaming profile.
            psi.EnvironmentVariables["WRANGLER_LOG_PATH"] = Path.Combine(Paths.LogDir, "wrangler");
            LastCommand = "\"" + psi.FileName + "\" " + psi.Arguments;
            // Plain text in the log files: no ANSI colour, no spinners.
            psi.EnvironmentVariables["NO_COLOR"] = "1";
            psi.EnvironmentVariables["FORCE_COLOR"] = "0";
            psi.EnvironmentVariables["CI"] = "1";
            if (wranglerLogLevel != null) psi.EnvironmentVariables["WRANGLER_LOG"] = wranglerLogLevel;
            var p = new Process { StartInfo = psi, EnableRaisingEvents = true };
            p.OutputDataReceived += (s, e) => onLine(e.Data);
            p.ErrorDataReceived += (s, e) => onLine(e.Data);
            var started = DateTime.UtcNow;
            string what = arguments.IndexOf(" dev", StringComparison.Ordinal) >= 0 ? "server" : "migrate";
            int exitLogged = 0;
            p.Exited += (s, e) =>
            {
                // Exited can fire twice when WaitForExit runs at the same time.
                if (Interlocked.Exchange(ref exitLogged, 1) != 0) return;
                try
                {
                    LauncherLog.Write(what + ": node pid " + p.Id + " exited with " + p.ExitCode + " after " + Math.Round((DateTime.UtcNow - started).TotalSeconds, 1) + "s");
                }
                catch { }
            };
            p.Start();
            LauncherLog.Write(what + ": node pid " + p.Id + " started");
            p.BeginOutputReadLine();
            p.BeginErrorReadLine();
            return p;
        }

        /// <summary>Runs one wrangler command inside the job (so Stop and a
        /// quitting launcher end it too). Returns its exit code, or
        /// int.MinValue when it ran past the timeout and was stopped.</summary>
        private int RunAndWait(string arguments, string logPath, KillOnCloseJob runJob, int gen)
        {
            LogFile.Rotate(logPath, 1024 * 1024);
            using (var writer = new StreamWriter(new FileStream(logPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite | FileShare.Delete), new UTF8Encoding(false)))
            {
                writer.AutoFlush = true;
                writer.WriteLine("---- " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                // "error": the migration command otherwise re-prints the whole
                // migration table after every file, about a megabyte per run.
                var p = StartNode(arguments, line => { if (line != null) { lock (writer) { try { writer.WriteLine(line); } catch { } } } }, "error");
                // Stop may have closed the job a moment ago: then end it here.
                if (!runJob.Add(p) && !IsCurrent(gen)) { try { p.Kill(); } catch { } }
                if (!p.WaitForExit((int)MigrateTimeout.TotalMilliseconds))
                {
                    try { p.Kill(); } catch { }
                    p.WaitForExit(5000);
                    lock (writer) { writer.WriteLine("launcher: stopped after " + MigrateTimeout.TotalMinutes + " minutes"); }
                    return int.MinValue;
                }
                p.WaitForExit(); // drains the redirected output
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
                try
                {
                    string clean = AnsiEscape.Replace(line, "");
                    log.WriteLine(clean);
                    // A server that runs for weeks logs every request: start a
                    // fresh file once this one passes the limit.
                    logBytes += clean.Length + 2;
                    if (logBytes > ServerLogMax)
                    {
                        log.Dispose();
                        LogFile.Rotate(Paths.ServerLog, ServerLogMax);
                        log = OpenServerLog();
                    }
                }
                catch { }
            }
        }

        private void Emit(int gen, Action<string> handler, string value)
        {
            if (!IsCurrent(gen)) return;
            var h = handler;
            if (h != null) h(value);
        }
    }

    internal sealed class TrayApp : ApplicationContext
    {
        private readonly NotifyIcon tray;
        // Owns a window handle on the UI thread from the start, so worker
        // threads can always marshal to it (the menu has no handle until it is
        // first opened).
        private readonly Control ui;
        private readonly ToolStripMenuItem openItem;
        private readonly ToolStripMenuItem statusItem;
        private readonly ToolStripMenuItem fixItem;
        private readonly ToolStripMenuItem updateItem;
        private readonly ToolStripMenuItem restartItem;
        private readonly ToolStripMenuItem repairItem;
        private readonly ToolStripMenuItem copyDiagItem;
        private readonly ToolStripMenuItem reportItem;
        private readonly ToolStripMenuItem autostartItem;
        private readonly ToolStripMenuItem autoUpdateItem;
        private readonly System.Threading.Timer updateTimer;
        private readonly Server server = new Server();
        private StartupProgressWindow startupProgress;
        private readonly WindowsSettingsBridge nativeSettings;
        private readonly EventWaitHandle quitEvent;
        private readonly EventWaitHandle openEvent;
        private readonly bool silent;
        private readonly Version updatedFrom;

        // Server state, as the menu and the tooltip show it.
        private string serverStatus = "Başlatılıyor…";
        private string url;
        private string failure;
        private bool openedOnce;
        private bool openWhenReady;
        private bool repairing;
        private bool preparingReport;
        private bool vcInstalling;
        private bool quitting;
        private readonly List<DateTime> crashes = new List<DateTime>();

        // Update state.
        private Version available;
        private bool checking;
        private string updatePhase;      // null, or what the update item says while busy
        private DateTime lastCheck = DateTime.MinValue;
        private Version notifiedVersion; // balloons for a found or failed update: once per version
        private bool cleanedUpdates;

        private Action balloonClick;

        public TrayApp(bool silent)
        {
            this.silent = silent;
            ui = new Control();
            ui.CreateControl();
            var handle = ui.Handle; // forces the handle now, on this thread

            var config = Config.Load();
            Version previous, current = Updater.Current();
            if (config.LastVersion != null && Version.TryParse(config.LastVersion, out previous) && previous < current) updatedFrom = previous;
            if (config.LastVersion != Paths.Version() && Paths.Version() != "?")
            {
                try { Config.Update(c => c.LastVersion = Paths.Version()); } catch (Exception ex) { LauncherLog.Write("config: " + ex.Message); }
            }

            var menu = new ContextMenuStrip { ShowItemToolTips = true };
            openItem = new ToolStripMenuItem("seowatcher'ı aç", null, (s, e) => OpenApp());
            openItem.Font = new Font(openItem.Font, FontStyle.Bold);
            statusItem = new ToolStripMenuItem(serverStatus) { Enabled = false };
            fixItem = new ToolStripMenuItem("Eksik Windows bileşenini kur", null, (s, e) => InstallVcRedist()) { Visible = false };
            updateItem = new ToolStripMenuItem("Güncelle", null, (s, e) => UpdateClicked());
            restartItem = new ToolStripMenuItem("Yeniden başlat", null, (s, e) => Restart());
            autostartItem = new ToolStripMenuItem("Windows açılınca başlat", null, (s, e) => ToggleAutostart());
            autoUpdateItem = new ToolStripMenuItem("Güncellemeleri kendiliğinden kur", null, (s, e) => ToggleAutoUpdate()) { Checked = config.AutoUpdate };
            repairItem = new ToolStripMenuItem("Kurulumu onar", null, (s, e) => RepairInstall());
            copyDiagItem = new ToolStripMenuItem("Tanı bilgisini kopyala", null, (s, e) => PrepareReport(false));
            reportItem = new ToolStripMenuItem("Sorunu bildir (GitHub)", null, (s, e) => PrepareReport(true));

            // Grouped: use the app, settings, troubleshooting, about and exit.
            menu.Items.Add(openItem);
            menu.Items.Add(statusItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(fixItem);
            menu.Items.Add(updateItem);
            menu.Items.Add(restartItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(autostartItem);
            menu.Items.Add(autoUpdateItem);
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(repairItem);
            menu.Items.Add(copyDiagItem);
            menu.Items.Add(reportItem);
            menu.Items.Add(new ToolStripMenuItem("Günlükleri aç", null, (s, e) => OpenFolder(Paths.LogDir)));
            menu.Items.Add(new ToolStripMenuItem("Veri klasörünü aç", null, (s, e) => OpenFolder(Paths.DataRoot)));
            menu.Items.Add(new ToolStripSeparator());
            menu.Items.Add(new ToolStripMenuItem("seowatcher " + Paths.Version() + " Alpha") { Enabled = false });
            menu.Items.Add(new ToolStripMenuItem("Çıkış", null, (s, e) => Quit()));
            // Settings can change outside the menu (the installer, regedit,
            // config.json): read them again every time the menu opens.
            menu.Opening += (s, e) => RefreshSettings();

            tray = new NotifyIcon
            {
                Icon = LoadIcon(),
                Text = "seowatcher " + Paths.Version() + " Alpha" + ": " + serverStatus,
                ContextMenuStrip = menu,
                Visible = true,
            };
            tray.DoubleClick += (s, e) => OpenApp();
            tray.BalloonTipClicked += (s, e) =>
            {
                var action = balloonClick;
                balloonClick = null;
                if (action != null) action(); else OpenApp();
            };

            server.Status += s => Invoke(() =>
            {
                SetServerStatus(s);
                SetStartupProgressStatus(s);
            });
            server.Ready += u => Invoke(() => OnReady(u));
            server.Failed += m => Invoke(() => OnFailed(m));
            server.Crashed += m => Invoke(() => OnCrashed(m));

            bool createdNew;
            quitEvent = new EventWaitHandle(false, EventResetMode.ManualReset, Program.QuitEventName, out createdNew);
            ThreadPool.RegisterWaitForSingleObject(quitEvent, (state, timedOut) => Invoke(Quit), null, -1, true);
            openEvent = new EventWaitHandle(false, EventResetMode.AutoReset, Program.OpenEventName, out createdNew);
            ThreadPool.RegisterWaitForSingleObject(openEvent, (state, timedOut) => Invoke(() =>
            {
                LauncherLog.Write("open requested by a second start");
                OpenApp();
            }), null, -1, false);

            Autostart.Repair();
            try
            {
                nativeSettings = new WindowsSettingsBridge(
                    () => (string)ui.Invoke(new Func<string>(ReadNativeSettings)),
                    (setting, enabled) => ui.Invoke(new Action(() => WriteNativeSetting(setting, enabled))));
                server.NativeSettings = nativeSettings;
            }
            catch (Exception) { LauncherLog.Write("Windows settings bridge unavailable"); }
            RefreshSettings();
            RefreshUpdateItem();
            if (!silent || updatedFrom != null) ShowStartupProgress(serverStatus);
            server.Start(config);
            // First check two minutes after start (the server comes first), then
            // once a day. The timer ticks hourly and compares wall-clock time, so
            // a laptop that sleeps through the night still checks daily, and a
            // check that failed (offline) is retried an hour later.
            updateTimer = new System.Threading.Timer(_ => Invoke(UpdateTick), null, TimeSpan.FromMinutes(2), TimeSpan.FromHours(1));
        }

        // ---- Balloons -------------------------------------------------------

        /// <summary>Shows a balloon. onClick runs if the user clicks this one;
        /// without it a click opens the app.</summary>
        private void Balloon(string title, string text, ToolTipIcon icon, int timeoutMs, Action onClick)
        {
            balloonClick = onClick;
            if (text.Length > 250) text = text.Substring(0, 249) + "…";
            if (title.Length > 60) title = title.Substring(0, 59) + "…";
            try { tray.ShowBalloonTip(timeoutMs, title, text, icon); } catch { }
        }

        // ---- Status ---------------------------------------------------------

        private void SetServerStatus(string text)
        {
            serverStatus = text;
            ShowStatus();
        }

        private void ShowStatus()
        {
            string text = updatePhase != null && url != null ? updatePhase : serverStatus;
            statusItem.Text = Truncate(text, 70);
            statusItem.ToolTipText = text.Length > 70 ? text : null;
            tray.Text = Truncate("seowatcher " + Paths.Version() + " Alpha" + ": " + text, 63);
        }

        private void ShowStartupProgress(string status)
        {
            if (startupProgress == null || startupProgress.IsDisposed)
            {
                startupProgress = new StartupProgressWindow(status);
                startupProgress.FormClosed += (sender, args) => startupProgress = null;
                startupProgress.Show();
            }
            else
            {
                startupProgress.SetStatus(status);
                if (!startupProgress.Visible) startupProgress.Show();
                startupProgress.BringToFront();
            }
        }

        private void SetStartupProgressStatus(string status)
        {
            if (startupProgress != null && !startupProgress.IsDisposed)
                startupProgress.SetStatus(status);
        }

        private void CloseStartupProgress()
        {
            if (startupProgress == null) return;
            var window = startupProgress;
            startupProgress = null;
            if (!window.IsDisposed) window.Close();
        }

        private void RefreshServerItems()
        {
            repairItem.Enabled = !repairing;
            repairItem.Text = repairing ? "Onarılıyor…" : "Kurulumu onar";
            restartItem.Enabled = !repairing;
            copyDiagItem.Enabled = !preparingReport;
            reportItem.Enabled = !preparingReport;
            fixItem.Enabled = !vcInstalling;
        }

        private void OnReady(string readyUrl)
        {
            url = readyUrl;
            failure = null;
            repairing = false;
            RefreshServerItems();
            SetServerStatus("Çalışıyor: " + readyUrl);
            CloseStartupProgress();
            bool portMoved = server.Port != server.ConfiguredPort;
            if (openWhenReady || (!openedOnce && !silent))
            {
                openWhenReady = false;
                openedOnce = true;
                OpenApp();
            }
            else if (!openedOnce)
            {
                openedOnce = true;
                if (updatedFrom != null)
                {
                    var v = Updater.Current();
                    Balloon("seowatcher " + Paths.Version() + " Alpha" + " sürümüne güncellendi", "Verileriniz ve ayarlarınız olduğu gibi duruyor. Yenilikleri görmek için bu baloncuğa tıklayın.", ToolTipIcon.Info, 8000,
                        () => Browser.Open(Updater.ReleasePage(v)));
                }
                else if (!portMoved)
                {
                    Balloon("seowatcher hazır", readyUrl + " adresinde çalışıyor. Açmak için simgeye çift tıklayın.", ToolTipIcon.Info, 4000, null);
                }
            }
            if (portMoved)
            {
                Balloon(server.ConfiguredPort + " numarası dolu, " + server.Port + " kullanılıyor",
                    "Başka bir program " + server.ConfiguredPort + " numarasını (port) kullanıyor. Google girişi " + server.ConfiguredPort + " için ayarlıysa o programı kapatıp Yeniden başlat deyin.",
                    ToolTipIcon.Warning, 10000, null);
            }
        }

        private void OnFailed(string message)
        {
            url = null;
            failure = message;
            repairing = false;
            openWhenReady = false;
            RefreshServerItems();
            SetServerStatus("Hata: " + message);
            SetStartupProgressStatus("Hata: " + message);
            bool needsVcRedist = message.StartsWith(Server.RuntimeCrashMessage, StringComparison.Ordinal);
            bool needsReport = message.StartsWith(Server.EngineCrashMessage, StringComparison.Ordinal);
            fixItem.Visible = needsVcRedist;
            if (needsVcRedist)
            {
                Balloon("seowatcher için bir Windows bileşeni gerekiyor",
                    message + "\nKurmak için bu baloncuğa tıklayın; uygulama sonra kendiliğinden yeniden başlar.", ToolTipIcon.Warning, 20000, InstallVcRedist);
            }
            else if (needsReport)
            {
                Balloon("seowatcher başlatılamadı",
                    message + "\nBildirmek için bu baloncuğa tıklayın: tanı bilgisi panoya kopyalanır ve GitHub'da bir sorun kaydı taslağı açılır.", ToolTipIcon.Error, 20000, () => PrepareReport(true));
            }
            else
            {
                Balloon("seowatcher başlatılamadı", message, ToolTipIcon.Error, 15000, null);
            }
        }

        /// <summary>The server ran and then stopped on its own. Up to three
        /// times in ten minutes it is started again by itself; after that it
        /// stays down and says so, instead of looping.</summary>
        private void OnCrashed(string message)
        {
            url = null;
            var now = DateTime.UtcNow;
            crashes.RemoveAll(t => now - t > TimeSpan.FromMinutes(10));
            crashes.Add(now);
            if (crashes.Count <= 3)
            {
                LauncherLog.Write("restarting after crash " + crashes.Count + "/3");
                Balloon("seowatcher yeniden başlatılıyor", "Sunucu beklenmedik şekilde kapandı ve kendiliğinden yeniden açılıyor. Açık sayfayı birkaç saniye sonra yenileyin.", ToolTipIcon.Warning, 6000, null);
                StartServer("Yeniden başlatılıyor");
                return;
            }
            OnFailed("Sunucu 10 dakikada üç kez kapandı. Kurulumu onar deyin; düzelmezse Sorunu bildir.");
        }

        // ---- Server actions ---------------------------------------------------

        private void StartServer(string status)
        {
            url = null;
            failure = null;
            fixItem.Visible = false;
            SetServerStatus(status);
            ShowStartupProgress(status);
            server.Stop();
            server.Start(Config.Load());
        }

        private void Restart()
        {
            LauncherLog.Write("restart");
            crashes.Clear();
            StartServer("Yeniden başlatılıyor");
        }

        private void RepairInstall()
        {
            if (repairing) return;
            LauncherLog.Write("repair requested");
            repairing = true;
            crashes.Clear();
            url = null;
            failure = null;
            RefreshServerItems();
            SetServerStatus("Onarılıyor");
            var worker = new Thread(() =>
            {
                server.Stop();
                var missing = Repair.Run();
                if (missing.Count == 0)
                {
                    Invoke(() => server.Start(Config.Load()));
                    return;
                }
                // Files are gone from the install folder: put the same version
                // back with its own verified installer. Data is not touched.
                string problem = "Kurulum eksik (" + string.Join(", ", missing) + ").";
                Version v = Updater.Current();
                if (Updater.IsInstalled() && v > new Version(0, 0, 0))
                {
                    try
                    {
                        Invoke(() => SetServerStatus("Onarılıyor: kurulum dosyası indiriliyor"));
                        string file = Updater.Download(v, p => Invoke(() => SetServerStatus("Onarılıyor: kurulum dosyası indiriliyor (%" + p + ")")));
                        Invoke(() => SetServerStatus("Onarılıyor: yeniden kuruluyor"));
                        var setup = Updater.Install(file);
                        WatchInstaller(setup, v);
                        return;
                    }
                    catch (Exception ex)
                    {
                        LauncherLog.Write("repair: reinstall failed: " + ex.Message);
                    }
                }
                Invoke(() =>
                {
                    repairing = false;
                    RefreshServerItems();
                    failure = problem;
                    SetServerStatus("Hata: " + problem);
                    Balloon("Kurulum eksik", problem + " Sürüm sayfası açıldı: kurulum dosyasını indirip çalıştırın. Verileriniz silinmez.", ToolTipIcon.Error, 15000, null);
                    Browser.Open(Updater.ReleasePage(null));
                });
            }) { IsBackground = true, Name = "seowatcher-repair" };
            worker.Start();
        }

        // ---- Updates ------------------------------------------------------------

        private void RefreshUpdateItem()
        {
            if (updatePhase != null) { updateItem.Text = updatePhase; updateItem.Enabled = false; }
            else if (checking) { updateItem.Text = "Kontrol ediliyor…"; updateItem.Enabled = false; }
            else if (available != null) { updateItem.Text = "Güncelle: " + available + " sürümü hazır"; updateItem.Enabled = true; }
            else { updateItem.Text = "Güncelle"; updateItem.Enabled = true; }
            ShowStatus();
        }

        private void UpdateTick()
        {
            if (!cleanedUpdates && updatePhase == null)
            {
                cleanedUpdates = true;
                new Thread(Updater.Cleanup) { IsBackground = true }.Start();
            }
            if (DateTime.UtcNow - lastCheck >= TimeSpan.FromHours(24)) CheckForUpdate(false);
        }

        /// <summary>Menu item: the same check, but it always answers, and a
        /// found update is installed right away even with auto-update off,
        /// because the user just asked for it.</summary>
        private void UpdateClicked()
        {
            if (updatePhase != null || checking) return;
            if (available != null) { StartUpdate(true); return; }
            CheckForUpdate(true);
        }

        private void CheckForUpdate(bool manual)
        {
            if (checking || updatePhase != null) return;
            checking = true;
            RefreshUpdateItem();
            new Thread(() =>
            {
                Release latest = null;
                string problem = null;
                try { latest = Updater.CheckLatest(); }
                catch (Exception ex)
                {
                    LauncherLog.Write("update: check failed: " + ex.Message);
                    problem = Updater.Describe(ex);
                }
                Invoke(() => OnChecked(latest, problem, manual));
            }) { IsBackground = true, Name = "seowatcher-update-check" }.Start();
        }

        private void OnChecked(Release latest, string problem, bool manual)
        {
            checking = false;
            if (latest == null)
            {
                RefreshUpdateItem();
                if (manual) Balloon("Güncelleme denetlenemedi", problem, ToolTipIcon.Warning, 8000, null);
                return;
            }
            lastCheck = DateTime.UtcNow;
            var current = Updater.Current();
            if (!Updater.ShouldOfferUpdate(current, latest.Version))
            {
                available = null;
                RefreshUpdateItem();
                if (manual)
                {
                    Balloon("Güncel", latest.Version == current
                        ? "seowatcher " + Paths.Version() + " Alpha" + " en son sürüm."
                        : "Kurulu sürüm (" + Paths.Version() + ") yayımlanan son sürümden (" + latest.Version + ") yeni.", ToolTipIcon.Info, 6000, null);
                }
                return;
            }
            if (!latest.HasInstaller)
            {
                // Published, but the Windows files are not attached yet.
                RefreshUpdateItem();
                if (manual) Balloon("Yeni sürüm hazırlanıyor", "seowatcher " + latest.Version + " yayımlandı ama Windows kurulum dosyası henüz eklenmedi. Biraz sonra tekrar deneyin.", ToolTipIcon.Info, 8000, null);
                lastCheck = DateTime.UtcNow - TimeSpan.FromHours(23); // look again in an hour
                return;
            }
            available = latest.Version;
            RefreshUpdateItem();
            if (manual) { StartUpdate(true); return; }
            if (Autoinstall()) { StartUpdate(false); return; }
            if (!Equals(notifiedVersion, available))
            {
                notifiedVersion = available;
                string text = Updater.IsPerUserInstall()
                    ? "Kurmak için bu baloncuğa tıklayın ya da menüden Güncelle deyin."
                    : "Bu kurulum tüm kullanıcılar için yapılmış; güncellemek yönetici izni ister. Kurmak için bu baloncuğa tıklayın.";
                var v = available;
                Balloon("Yeni sürüm: seowatcher " + v, text, ToolTipIcon.Info, 10000, () => StartUpdate(true));
            }
        }

        /// <summary>Install without asking: switched on, and an install that
        /// needs no administrator (an all-users install would raise a UAC
        /// prompt out of nowhere).</summary>
        private bool Autoinstall()
        {
            return Config.Load().AutoUpdate && Updater.IsPerUserInstall();
        }

        private void StartUpdate(bool manual)
        {
            if (updatePhase != null || available == null) return;
            if (!Updater.IsInstalled())
            {
                // A build folder, not an installed copy: there is nothing the
                // installer could replace in place.
                Browser.Open(Updater.ReleasePage(available));
                return;
            }
            var v = available;
            updatePhase = "Güncelleme indiriliyor: " + v;
            RefreshUpdateItem();
            ShowStartupProgress(updatePhase);
            var worker = new Thread(() =>
            {
                try
                {
                    string file = Updater.Download(v, p => Invoke(() =>
                    {
                        if (updatePhase == null) return;
                        updatePhase = "Güncelleme indiriliyor: " + v + " (%" + p + ")";
                        RefreshUpdateItem();
                        SetStartupProgressStatus(updatePhase);
                    }));
                    Invoke(() =>
                    {
                        updatePhase = "Güncelleme kuruluyor: " + v;
                        RefreshUpdateItem();
                        SetStartupProgressStatus(updatePhase);
                    });
                    var setup = Updater.Install(file);
                    WatchInstaller(setup, v);
                }
                catch (Exception ex)
                {
                    LauncherLog.Write("update: failed: " + ex.Message);
                    string why = ex is UpdateVerifyException
                        ? ex.Message + " Kurulum dosyasını sürüm sayfasından indirebilirsiniz."
                        : Updater.Describe(ex) + " Kurulu sürüm çalışmaya devam ediyor.";
                    Invoke(() =>
                    {
                        updatePhase = null;
                        RefreshUpdateItem();
                        if (url != null) CloseStartupProgress();
                        // An automatic attempt retries in an hour; it says so once.
                        if (manual || !Equals(notifiedVersion, v))
                        {
                            notifiedVersion = v;
                            Balloon("Güncelleme yapılamadı", why, ToolTipIcon.Warning, 10000,
                                ex is UpdateVerifyException ? (Action)(() => Browser.Open(Updater.ReleasePage(v))) : null);
                        }
                        if (!manual) lastCheck = DateTime.UtcNow - TimeSpan.FromHours(23);
                    });
                }
            }) { IsBackground = true, Name = "seowatcher-update" };
            worker.Start();
        }

        /// <summary>The installer stops this instance when it gets going. If it
        /// exits while this instance still runs, it did not install: it was
        /// cancelled, refused administrator permission, or failed.</summary>
        private void WatchInstaller(Process setup, Version v)
        {
            if (setup == null) return;
            setup.WaitForExit();
            int code = -1;
            try { code = setup.ExitCode; } catch { }
            LauncherLog.Write("update: installer exited with " + code + " while this instance still runs");
            Invoke(() =>
            {
                if (quitting) return;
                updatePhase = null;
                RefreshUpdateItem();
                if (repairing)
                {
                    repairing = false;
                    RefreshServerItems();
                    server.Start(Config.Load());
                }
                CloseStartupProgress();
                Balloon("Güncelleme kurulmadı", "Kurulum yarıda kaldı ya da iptal edildi (kod " + code + "). Menüden Güncelle ile tekrar deneyebilirsiniz; kurulu sürüm çalışmaya devam ediyor.", ToolTipIcon.Warning, 10000, null);
            });
        }

        private void ToggleAutoUpdate()
        {
            try
            {
                var cfg = Config.Update(c => c.AutoUpdate = !c.AutoUpdate);
                autoUpdateItem.Checked = cfg.AutoUpdate;
                LauncherLog.Write("auto update " + (cfg.AutoUpdate ? "on" : "off"));
                if (cfg.AutoUpdate && available != null && Updater.IsPerUserInstall()) StartUpdate(false);
            }
            catch (Exception ex)
            {
                LauncherLog.Write("config: " + ex.Message);
                Balloon("Ayar kaydedilemedi", "config.json yazılamadı: " + ex.Message, ToolTipIcon.Warning, 8000, null);
            }
        }

        // ---- Settings -------------------------------------------------------------

        private string ReadNativeSettings()
        {
            bool managed = Autostart.IsEnabledForAllUsers();
            return "{\"autostart\":" + JsonBool(managed || Autostart.IsEnabled()) +
                ",\"autostartManaged\":" + JsonBool(managed) +
                ",\"autoUpdate\":" + JsonBool(Config.Load().AutoUpdate) +
                ",\"autoUpdateManaged\":" + JsonBool(!Updater.IsPerUserInstall()) + "}";
        }

        private static string JsonBool(bool value) { return value ? "true" : "false"; }

        private void WriteNativeSetting(string setting, bool enabled)
        {
            if (setting == "autostart")
            {
                if (Autostart.IsEnabledForAllUsers()) throw new InvalidOperationException("Managed startup");
                Autostart.Set(enabled);
                if (Autostart.IsEnabled() != enabled) throw new IOException("Startup preference was not saved");
            }
            else
            {
                if (!Updater.IsPerUserInstall()) throw new InvalidOperationException("Managed updates");
                Config.Update(c => c.AutoUpdate = enabled);
                if (Config.Load().AutoUpdate != enabled) throw new IOException("Update preference was not saved");
            }
            RefreshSettings();
        }

        private void RefreshSettings()
        {
            autoUpdateItem.Checked = Config.Load().AutoUpdate;
            bool machine = Autostart.IsEnabledForAllUsers();
            autostartItem.Checked = machine || Autostart.IsEnabled();
            // Set for every user by an administrator install: only an
            // administrator can change it, so it is shown but not clickable.
            autostartItem.Enabled = !machine;
            autostartItem.ToolTipText = machine ? "Yönetici bu bilgisayardaki herkes için açtı; yalnızca yönetici kapatabilir." : null;
        }

        private void ToggleAutostart()
        {
            try
            {
                bool enable = !Autostart.IsEnabled();
                Autostart.Set(enable);
                LauncherLog.Write("autostart " + (enable ? "on" : "off"));
            }
            catch (Exception ex)
            {
                LauncherLog.Write("autostart: " + ex.Message);
                Balloon("Ayar değiştirilemedi", "Windows başlangıç kaydı yazılamadı: " + ex.Message, ToolTipIcon.Warning, 8000, null);
            }
            RefreshSettings();
        }

        // ---- Visual C++ runtime -----------------------------------------------------

        /// <summary>Runs the bundled VC_redist.x64.exe elevated (one UAC prompt)
        /// and restarts the server when it finishes. Falls back to Microsoft's
        /// download page when the package is not beside the launcher.</summary>
        private void InstallVcRedist()
        {
            if (vcInstalling) return;
            if (!File.Exists(Paths.VcRedistExe))
            {
                LauncherLog.Write("vcredist: bundled package missing, opening " + Server.VcRedistUrl);
                Browser.Open(Server.VcRedistUrl);
                Balloon("Paket bulunamadı", "Microsoft'un indirme sayfası açıldı. Paketi indirip kurduktan sonra menüden Yeniden başlat deyin.", ToolTipIcon.Info, 10000, null);
                return;
            }
            Process p;
            try
            {
                LauncherLog.Write("vcredist: installing " + Paths.VcRedistExe);
                p = Process.Start(new ProcessStartInfo(Paths.VcRedistExe, "/install /passive /norestart") { UseShellExecute = true, Verb = "runas" });
            }
            catch (Exception ex)
            {
                // Typically the UAC prompt was declined (Win32Exception 1223).
                LauncherLog.Write("vcredist: " + ex.Message);
                Balloon("Kurulum iptal edildi", "Yönetici izni verilmedi. Menüdeki \"Eksik Windows bileşenini kur\" ile yeniden deneyebilirsiniz.", ToolTipIcon.Warning, 10000, null);
                return;
            }
            vcInstalling = true;
            RefreshServerItems();
            SetServerStatus("Windows bileşeni kuruluyor");
            new Thread(() =>
            {
                int code = -1;
                try { p.WaitForExit(); code = p.ExitCode; } catch { }
                LauncherLog.Write("vcredist: exit code " + code);
                Invoke(() =>
                {
                    vcInstalling = false;
                    RefreshServerItems();
                    // 0 done, 3010 done but a reboot is wanted, 1638 a newer one is there.
                    if (code == 0 || code == 3010 || code == 1638)
                    {
                        fixItem.Visible = false;
                        Restart();
                    }
                    else
                    {
                        SetServerStatus("Hata: Windows bileşeni kurulamadı (kod " + code + ").");
                        Balloon("Windows bileşeni kurulamadı", "Kurulum kod " + code + " ile bitti. Menüdeki \"Eksik Windows bileşenini kur\" ile tekrar deneyin ya da paketi Microsoft'un sayfasından indirin.", ToolTipIcon.Warning, 12000, null);
                    }
                });
            }) { IsBackground = true }.Start();
        }

        // ---- Diagnostics ------------------------------------------------------------

        /// <summary>The report runs the engine probe and reads the event log,
        /// which can take seconds: it is built off the UI thread, then put on
        /// the clipboard (and, for a report, into a GitHub issue draft).</summary>
        private void PrepareReport(bool openIssue)
        {
            if (preparingReport) return;
            preparingReport = true;
            RefreshServerItems();
            string status = Diag.MaskProfile(serverStatus);
            new Thread(() =>
            {
                string report;
                try { report = Diag.Report(); }
                catch (Exception ex) { report = "Tanı bilgisi hazırlanamadı: " + ex.Message; }
                Invoke(() =>
                {
                    preparingReport = false;
                    RefreshServerItems();
                    bool copied = CopyToClipboard(report);
                    if (openIssue) OpenIssue(report, status, copied);
                    else if (copied) Balloon("Kopyalandı", "Tanı bilgisi panoya kopyalandı. GitHub'daki sorun kaydına Ctrl+V ile yapıştırabilirsiniz.", ToolTipIcon.Info, 5000, null);
                    else Balloon("Kopyalanamadı", "Pano şu an başka bir program tarafından kullanılıyor. Birkaç saniye sonra tekrar deneyin.", ToolTipIcon.Warning, 5000, null);
                });
            }) { IsBackground = true, Name = "seowatcher-report" }.Start();
        }

        private static bool CopyToClipboard(string text)
        {
            try
            {
                // Retries for half a second while another program holds the clipboard.
                Clipboard.SetDataObject(text, true, 5, 100);
                return true;
            }
            catch (Exception ex)
            {
                LauncherLog.Write("clipboard: " + ex.Message);
                return false;
            }
        }

        /// <summary>Opens a GitHub issue form with the diagnostics in the body (and
        /// on the clipboard, in case the URL is too long for the browser).</summary>
        private static void OpenIssue(string report, string status, bool copied)
        {
            // The whole report is on the clipboard; the URL carries only the
            // first part, because a long query string makes GitHub answer 404
            // and some browsers refuse it. The "sorun" template adds the
            // questions; a body in the URL replaces the template's own body.
            string head = report.Length > 2000 ? report.Substring(0, 2000) + (copied ? "\n(kısaltıldı; tamamı panoda, Ctrl+V ile yapıştırın)" : "\n(kısaltıldı; tamamı için menüden Tanı bilgisini kopyala deyin)") : report;
            string body = "**Ne yapmaya çalışıyordunuz?**\n(bir iki cümle)\n\n**Tanı bilgisi** (menüden kopyalandı; gözden geçirin)\n\n```\n" + head + "\n```\n";
            string title = "seowatcher " + Paths.Version() + " Alpha" + ": " + (status.Length > 80 ? status.Substring(0, 80) : status);
            Browser.Open("https://github.com/" + Updater.Repo + "/issues/new?template=sorun.md&title=" + Uri.EscapeDataString(title) + "&body=" + Uri.EscapeDataString(body));
        }

        // ---- Shell ------------------------------------------------------------------

        /// <summary>Double-click, the bold menu item and a second launch. Opens
        /// the browser once the server answers; while it is still starting, it
        /// says so and opens it when ready; after a failure it repeats why.</summary>
        private void OpenApp()
        {
            if (url != null)
            {
                Browser.Open(url);
                return;
            }
            if (failure != null)
            {
                Balloon("seowatcher çalışmıyor", failure, ToolTipIcon.Error, 10000, null);
                return;
            }
            if (!openWhenReady)
            {
                openWhenReady = true;
                Balloon("seowatcher açılıyor", "Hazır olunca tarayıcıda kendiliğinden açılacak. İlk açılış 20-30 saniye sürebilir.", ToolTipIcon.Info, 5000, null);
            }
        }

        private static Icon LoadIcon()
        {
            // The small icon at the size the taskbar uses for this DPI (16, 20,
            // 24 px...): a 32 px icon scaled down looks blurred in the tray.
            try
            {
                var small = new IntPtr[1];
                if (ExtractIconEx(Application.ExecutablePath, 0, null, small, 1) > 0 && small[0] != IntPtr.Zero)
                {
                    return Icon.FromHandle(small[0]);
                }
            }
            catch { }
            try
            {
                var icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
                if (icon != null) return icon;
            }
            catch { }
            return SystemIcons.Application;
        }

        [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
        private static extern uint ExtractIconEx(string file, int index, IntPtr[] large, IntPtr[] small, uint count);

        private void Invoke(Action action)
        {
            try
            {
                if (!ui.IsDisposed && ui.IsHandleCreated) ui.BeginInvoke(action);
            }
            catch { }
        }

        private static void OpenFolder(string path)
        {
            try
            {
                Directory.CreateDirectory(path);
                Process.Start(new ProcessStartInfo("explorer.exe", "\"" + path + "\"") { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                LauncherLog.Write("open folder: " + ex.Message);
                // Fall back to the shell's own opener.
                try { Process.Start(new ProcessStartInfo(path) { UseShellExecute = true }); } catch { }
            }
        }

        private void Quit()
        {
            if (quitting) return;
            quitting = true;
            if (nativeSettings != null) nativeSettings.Dispose();
            LauncherLog.Write("quit");
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
                if (nativeSettings != null) nativeSettings.Dispose();
                server.Stop();
                CloseStartupProgress();
                tray.Dispose();
                quitEvent.Dispose();
                openEvent.Dispose();
                ui.Dispose();
            }
            base.Dispose(disposing);
        }
    }

    /// <summary>"Windows açılınca başlat": the HKCU Run value, quoted path
    /// plus --silent (no browser at sign-in). The installer writes the same
    /// value; an all-users install writes it under HKLM instead.</summary>
    internal static class Autostart
    {
        private const string RunKey = "Software\\Microsoft\\Windows\\CurrentVersion\\Run";

        private static string Command()
        {
            return "\"" + Application.ExecutablePath + "\" --silent";
        }

        public static bool IsEnabled()
        {
            using (var key = Registry.CurrentUser.OpenSubKey(RunKey, false))
            {
                return key != null && key.GetValue(Program.AppName) != null;
            }
        }

        public static bool IsEnabledForAllUsers()
        {
            try
            {
                using (var hklm = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64))
                using (var key = hklm.OpenSubKey(RunKey, false))
                {
                    return key != null && key.GetValue(Program.AppName) != null;
                }
            }
            catch { return false; }
        }

        public static void Set(bool enabled)
        {
            using (var key = Registry.CurrentUser.CreateSubKey(RunKey))
            {
                if (key == null) return;
                if (enabled) key.SetValue(Program.AppName, Command());
                else key.DeleteValue(Program.AppName, false);
            }
        }

        /// <summary>A value left by an install in another folder would start a
        /// launcher that is not there any more: point it at this one.</summary>
        public static void Repair()
        {
            try
            {
                using (var key = Registry.CurrentUser.OpenSubKey(RunKey, true))
                {
                    if (key == null) return;
                    var value = key.GetValue(Program.AppName) as string;
                    if (value != null && !string.Equals(value, Command(), StringComparison.OrdinalIgnoreCase) && Updater.IsInstalled())
                    {
                        key.SetValue(Program.AppName, Command());
                        LauncherLog.Write("autostart: pointed the Run value at " + Application.ExecutablePath);
                    }
                }
            }
            catch (Exception ex) { LauncherLog.Write("autostart: " + ex.Message); }
        }
    }
}
