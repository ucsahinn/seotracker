using System;
using System.IO;

namespace SeoWatcher
{
    // Compile with the launcher sources, /main:SeoWatcher.StorePackageTests and
    // the launcher's normal references. Runs without a package: only the copy
    // of the previous install's data is exercised, between two temp folders.
    internal static class StorePackageTests
    {
        private static string root;

        private static int Main()
        {
            root = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "store-package-" + Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(root);
            typeof(Paths).GetField("LogDir").SetValue(null, Path.Combine(root, "logs"));
            typeof(Paths).GetField("LauncherLog").SetValue(null, Path.Combine(root, "logs", "launcher.log"));
            int failures = 0;
            try
            {
                Run("adopts the database and keys and leaves the old folder as it was", Adopts, ref failures);
                Run("keeps an existing package database", KeepsExisting, ref failures);
                Run("repeats a copy that was interrupted", RepeatsInterrupted, ref failures);
                Run("does nothing when the old install has no database", NothingToAdopt, ref failures);
            }
            finally { Directory.Delete(root, true); }
            return failures == 0 ? 0 : 1;
        }

        private static string Legacy(string name)
        {
            string legacy = Path.Combine(root, name, "legacy");
            Write(Path.Combine(legacy, "data", "v3", "d1", "db.sqlite"), "old database");
            Write(Path.Combine(legacy, "mcp-token"), "old token");
            Write(Path.Combine(legacy, "instance-secret"), "old secret");
            Write(Path.Combine(legacy, "logs", "launcher.log"), "old log");
            return legacy;
        }

        private static void Adopts()
        {
            string legacy = Legacy("adopts");
            string target = Path.Combine(root, "adopts", "package");
            DateTime before = File.GetLastWriteTimeUtc(Path.Combine(legacy, "logs", "launcher.log"));

            Assert(StorePackage.AdoptData(legacy, target) == null, "adoption reported a failure");

            Assert(File.ReadAllText(Path.Combine(target, "data", "v3", "d1", "db.sqlite")) == "old database", "database not copied");
            Assert(File.ReadAllText(Path.Combine(target, "mcp-token")) == "old token", "token not copied");
            Assert(File.ReadAllText(Path.Combine(target, "instance-secret")) == "old secret", "secret not copied");
            Assert(!Directory.Exists(Path.Combine(target, "logs")), "logs must not be adopted");
            Assert(!Directory.Exists(Path.Combine(target, "data.adopting")), "staging folder left behind");
            Assert(File.ReadAllText(Path.Combine(legacy, "data", "v3", "d1", "db.sqlite")) == "old database", "old database changed");
            Assert(File.GetLastWriteTimeUtc(Path.Combine(legacy, "logs", "launcher.log")) == before, "old folder was written to");
        }

        private static void KeepsExisting()
        {
            string legacy = Legacy("keeps");
            string target = Path.Combine(root, "keeps", "package");
            Write(Path.Combine(target, "data", "v3", "d1", "db.sqlite"), "package database");
            Write(Path.Combine(target, "mcp-token"), "package token");

            Assert(StorePackage.AdoptData(legacy, target) == null, "adoption reported a failure");

            Assert(File.ReadAllText(Path.Combine(target, "data", "v3", "d1", "db.sqlite")) == "package database", "package database overwritten");
            Assert(File.ReadAllText(Path.Combine(target, "mcp-token")) == "package token", "package token overwritten");
        }

        private static void RepeatsInterrupted()
        {
            string legacy = Legacy("repeats");
            string target = Path.Combine(root, "repeats", "package");
            // What a copy cut off half way leaves: a partial staging folder and
            // keys from that attempt, but no database under its final name.
            Write(Path.Combine(target, "data.adopting", "v3", "partial"), "half");
            Write(Path.Combine(target, "mcp-token"), "token of the failed attempt");

            Assert(StorePackage.AdoptData(legacy, target) == null, "adoption reported a failure");

            Assert(File.ReadAllText(Path.Combine(target, "data", "v3", "d1", "db.sqlite")) == "old database", "database not copied on retry");
            Assert(!File.Exists(Path.Combine(target, "data", "v3", "partial")), "partial copy survived");
            Assert(File.ReadAllText(Path.Combine(target, "mcp-token")) == "old token", "keys of the old install must replace the failed attempt's");
        }

        private static void NothingToAdopt()
        {
            string legacy = Path.Combine(root, "nothing", "legacy");
            Write(Path.Combine(legacy, "mcp-token"), "token without a database");
            string target = Path.Combine(root, "nothing", "package");

            Assert(StorePackage.AdoptData(legacy, target) == null, "adoption reported a failure");

            Assert(!Directory.Exists(target), "package folder created for nothing");
        }

        private static void Write(string path, string text)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(path));
            File.WriteAllText(path, text);
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
