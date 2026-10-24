using System;

namespace SeoWatcher
{
    internal static class UpdateVersionPolicyTests
    {
        private static int Main()
        {
            Assert(
                Updater.ShouldOfferUpdate(new Version(2, 4, 3), new Version(0, 5, 0)),
                "the Alpha line must update retired 2.4.3 installs");
            Assert(
                !Updater.ShouldOfferUpdate(new Version(0, 5, 0), new Version(2, 4, 3)),
                "an Alpha install must not roll back to retired 2.4.3");
            Assert(
                !Updater.ShouldOfferUpdate(new Version(0, 5, 0), new Version(2, 5, 0)),
                "an Alpha install must not roll back to retired 2.5.0");
            Assert(
                !Updater.ShouldOfferUpdate(new Version(0, 5, 0), new Version(0, 4, 3)),
                "an older Alpha release must not be offered");
            Assert(
                Updater.ShouldOfferUpdate(new Version(0, 5, 0), new Version(0, 5, 1)),
                "ordinary newer Alpha releases must still be offered");
            Console.WriteLine("C# update version policy: 5 invariants passed.");
            return 0;
        }

        private static void Assert(bool condition, string message)
        {
            if (!condition) throw new Exception(message);
        }
    }
}
