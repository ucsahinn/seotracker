using System;

namespace SeoWatcher
{
    internal static class StartupProgressTests
    {
        private static int Main()
        {
            var migration = StartupProgressPresentation.FromStatus("Veritabanı güncelleniyor");
            Assert(migration.Percent == null, "database migrations have no known total");
            Assert(migration.Message.Length > 0, "startup stage has visible guidance");

            var download = StartupProgressPresentation.FromStatus("Güncelleme indiriliyor: 0.7.0 (%42)");
            Assert(download.Percent == 42, "update download uses its real percentage");

            var install = StartupProgressPresentation.FromStatus("Güncelleme kuruluyor: 0.7.0");
            Assert(install.Percent == null, "installer progress stays indeterminate when no total is available");

            var error = StartupProgressPresentation.FromStatus("Hata: Sunucu başlamadı");
            Assert(error.IsError, "startup errors remain visible in the progress window");

            Console.WriteLine("Startup progress: 4 invariants passed.");
            return 0;
        }

        private static void Assert(bool condition, string message)
        {
            if (!condition) throw new Exception(message);
        }
    }
}
