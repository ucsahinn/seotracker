using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;

namespace SeoWatcher
{
    // Compile with SeoWatcher.cs, StartupProgress.cs and WindowsSettingsBridge.cs,
    // /main:SeoWatcher.RuntimeSafetyTests and the launcher's normal references.
    internal static class RuntimeSafetyTests
    {
        private static string root;

        private static int Main(string[] args)
        {
            if (args.Length > 0 && args[0] == "test")
            {
                File.WriteAllText(Environment.GetEnvironmentVariable("SEOWATCHER_TEST_PID"), Process.GetCurrentProcess().Id.ToString());
                if (Environment.GetEnvironmentVariable("SEOWATCHER_TEST_MODE") == "flood")
                {
                    Console.Error.Write(new string('x', 256 * 1024));
                    return 0;
                }
                Thread.Sleep(30000);
                return 0;
            }

            root = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "runtime-safety-" + Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(root);
            int failures = 0;
            try
            {
                ConfigurePaths();
                Run("P2-1 runtime writes stay outside installed code", Workspace, ref failures);
                Run("P2-2 repaired MCP token is persisted and restart-stable", TokenRepair, ref failures);
                Run("P2-3 probe drains stderr without deadlock", () => Probe("flood", false), ref failures);
                Run("P2-3 probe timeout reaps its child", () => Probe("hang", false), ref failures);
                Run("P2-3 Server.Stop cancels and reaps its preflight child", () => Probe("hang", true), ref failures);
            }
            finally { Directory.Delete(root, true); }
            return failures == 0 ? 0 : 1;
        }

        private static void ConfigurePaths()
        {
            string app = Path.Combine(root, "install", "app");
            string data = Path.Combine(root, "data");
            Directory.CreateDirectory(data);
            SetPath("AppDir", app);
            SetPath("DataRoot", data);
            SetPath("MainConfig", Path.Combine(app, "dist", "server", "wrangler.json"));
            SetPath("AuditConfig", Path.Combine(app, "dist", "seotracker_audit", "wrangler.json"));
            SetPath("ServerEnv", Path.Combine(data, "server.env"));
            SetPath("InstanceSecret", Path.Combine(data, "instance-secret"));
            SetPath("McpToken", Path.Combine(data, "mcp-token"));
            SetPath("WorkerdExe", Assembly.GetExecutingAssembly().Location);
            SetPath("LogDir", Path.Combine(data, "logs"));
            SetPath("LauncherLog", Path.Combine(data, "logs", "launcher.log"));
        }

        private static void SetPath(string name, string value)
        {
            typeof(Paths).GetField(name).SetValue(null, value);
        }

        private static void Workspace()
        {
            WriteFixture(Paths.MainConfig, "{\"main\":\"index.js\",\"assets\":{\"directory\":\"../client\"}}");
            WriteFixture(Paths.AuditConfig, "{\"main\":\"index.js\"}");
            WriteFixture(Path.Combine(Paths.AppDir, "dist", "server", "index.js"), "main bundle");
            WriteFixture(Path.Combine(Paths.AppDir, "dist", "seotracker_audit", "index.js"), "audit bundle");
            WriteFixture(Path.Combine(Paths.AppDir, "dist", "client", "index.html"), "assets");
            WriteFixture(Path.Combine(Paths.AppDir, "drizzle", "0001.sql"), "migration");
            var server = new Server();
            typeof(Server).GetMethod("WriteServerEnv", BindingFlags.Instance | BindingFlags.NonPublic)
                .Invoke(server, new object[] { "synthetic-instance-key", "synthetic-mcp-token" });
            Assert(!File.Exists(Path.Combine(Path.GetDirectoryName(Paths.AuditConfig), ".dev.vars")), "installed audit directory was written");
            string runtime = Path.Combine(Paths.DataRoot, "runtime");
            Assert(File.ReadAllText(Path.Combine(runtime, "dist", "seotracker_audit", ".dev.vars")).Contains("synthetic-instance-key"), "audit key missing");
            Assert(File.ReadAllText(Path.Combine(runtime, "dist", "server", "index.js")) == "main bundle", "main bundle missing");
            Assert(File.Exists(Path.Combine(runtime, "dist", "client", "index.html")), "relative assets missing");
            Assert(File.Exists(Path.Combine(runtime, "drizzle", "0001.sql")), "relative migrations missing");
        }

        private static void TokenRepair()
        {
            foreach (string damaged in new[] { "", "short", "abcdefghijklmnop!", "  abcdefghijklmnop  " })
            {
                File.WriteAllText(Paths.McpToken, damaged);
                string token = Secrets.EnsureMcpToken();
                Assert(token.Length >= 16 && token == File.ReadAllText(Paths.McpToken), "returned token differs from disk");
                Assert(Secrets.EnsureMcpToken() == token, "token changed across starts");
            }
            File.WriteAllText(Paths.InstanceSecret, "damaged-secret");
            try { Secrets.EnsureInstanceSecret(); throw new Exception("damaged encryption key accepted"); }
            catch (InvalidOperationException) { }
            Assert(File.ReadAllText(Paths.InstanceSecret) == "damaged-secret", "encryption key was replaced");
        }

        private static void Probe(string mode, bool cancel)
        {
            string pidFile = Path.Combine(root, "probe-pid");
            if (File.Exists(pidFile)) File.Delete(pidFile);
            Environment.SetEnvironmentVariable("SEOWATCHER_TEST_PID", pidFile);
            Environment.SetEnvironmentVariable("SEOWATCHER_TEST_MODE", mode);
            string result = null;
            Exception error = null;
            var server = new Server();
            var thread = new Thread(() =>
            {
                try
                {
                    var probe = typeof(Server).GetMethod("ProbeEngine", BindingFlags.Instance | BindingFlags.NonPublic);
                    var overload = typeof(Diag).GetMethod("WorkerdProbe", new[] { typeof(Func<bool>), typeof(int) });
                    if (cancel && probe != null) result = (string)probe.Invoke(server, new object[] { 0 });
                    else result = overload == null ? Diag.WorkerdProbe() : (string)overload.Invoke(null, new object[] { new Func<bool>(() => false), 1000 });
                }
                catch (Exception ex) { error = ex; }
            }) { IsBackground = true };
            thread.Start();
            try
            {
                if (cancel)
                {
                    var startup = Stopwatch.StartNew();
                    while (!File.Exists(pidFile) && startup.ElapsedMilliseconds < 2000) Thread.Sleep(10);
                    Assert(File.Exists(pidFile), "helper never started");
                    var stop = new Thread(server.Stop) { IsBackground = true };
                    stop.Start();
                    Assert(stop.Join(3000), "Server.Stop exceeded watchdog");
                    Assert(!IsRunning(int.Parse(File.ReadAllText(pidFile))), "Server.Stop returned before reaping probe");
                }
                Assert(thread.Join(3000), "probe exceeded watchdog");
                Assert(error == null, "probe threw: " + error);
                Assert(mode == "flood" ? result == "ok" : result != null && result.StartsWith("hata:"), "unexpected probe result");
                if (cancel) Assert(result.Contains("iptal"), "cancellation was reported as a timeout");
                Assert(File.Exists(pidFile), "helper never started");
                Assert(!IsRunning(int.Parse(File.ReadAllText(pidFile))), "probe child still running");
            }
            finally
            {
                if (File.Exists(pidFile))
                {
                    int pid = int.Parse(File.ReadAllText(pidFile));
                    try { using (var child = Process.GetProcessById(pid)) { child.Kill(); child.WaitForExit(2000); } }
                    catch (ArgumentException) { }
                }
                thread.Join(2000);
            }
        }

        private static bool IsRunning(int pid)
        {
            try { using (var child = Process.GetProcessById(pid)) { return !child.HasExited; } }
            catch (ArgumentException) { return false; }
        }

        private static void WriteFixture(string path, string value)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(path));
            File.WriteAllText(path, value);
        }

        private static void Run(string name, Action test, ref int failures)
        {
            try { test(); Console.WriteLine("PASS " + name); }
            catch (Exception ex) { failures++; Console.WriteLine("FAIL " + name + ": " + ex.GetBaseException().Message); }
        }

        private static void Assert(bool condition, string message)
        {
            if (!condition) throw new Exception(message);
        }
    }
}
