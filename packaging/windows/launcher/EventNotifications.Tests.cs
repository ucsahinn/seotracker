using System;
using System.Collections.Generic;
using System.IO;

namespace SeoWatcher
{
    internal static class EventNotificationsTests
    {
        private static int Main()
        {
            string root = Path.Combine(Path.GetTempPath(), "seowatcher-notification-test-" + Guid.NewGuid().ToString("N"));
            typeof(Paths).GetField("DataRoot").SetValue(null, root);
            typeof(Paths).GetField("ConfigFile").SetValue(null, Path.Combine(root, "config.json"));
            try
            {
                if (!Config.Load().WindowsNotifications) throw new Exception("Notifications must default on");
                Config.Update(c => { c.WindowsNotifications = false; c.AutoUpdate = false; c.Port = 3100; });
                Config.Update(c => c.LastVersion = "1.2.3");
                var cfg = Config.Load();
                if (cfg.WindowsNotifications || cfg.AutoUpdate || cfg.Port != 3100 || cfg.LastVersion != "1.2.3") throw new Exception("Settings did not survive unrelated updates");
            }
            finally { if (Directory.Exists(root)) Directory.Delete(root, true); }
            var state = new EventNotificationState();
            var old = Feed("old");
            if (state.AcceptAnnouncements(old).Count != 0) throw new Exception("First feed must be silent");
            state = EventNotificationState.Parse(state.ToJson());
            if (state.AcceptAnnouncements(old).Count != 0) throw new Exception("Restart replayed an announcement");
            if (state.AcceptAnnouncements(Feed("old", "new")).Count != 1) throw new Exception("New event missing");
            if (state.AcceptAnnouncements(Feed("old", "new")).Count != 0) throw new Exception("Duplicate event");
            const string future = "{\"announcements\":[{\"id\":\"00000000-0000-4000-8000-000000000003\",\"publish_at\":\"2999-01-01T00:00:00Z\",\"expires_at\":null}]}";
            if (state.AcceptAnnouncements(future).Count != 0) throw new Exception("Future announcement displayed");
            if (state.AcceptAnnouncements(future.Replace("2999", "2020")).Count != 1) throw new Exception("Future announcement was marked seen before publication");
            const string expired = "{\"announcements\":[{\"id\":\"00000000-0000-4000-8000-000000000004\",\"publish_at\":\"2020-01-01T00:00:00Z\",\"expires_at\":\"2021-01-01T00:00:00Z\"}]}";
            if (state.AcceptAnnouncements(expired).Count != 0) throw new Exception("Expired announcement displayed");
            const string audit = "{\"cursor\":{\"finishedAt\":\"2026-10-28T12:00:00.000Z\",\"id\":\"a\"},\"events\":[{\"outcome\":\"failed\",\"projectName\":\"Site\",\"pagesCrawled\":3,\"issueCounts\":{\"critical\":1,\"warning\":2,\"info\":0},\"path\":\"/p/p/audit?auditId=a\"}]}";
            if (state.AcceptAudits(audit).Count != 0) throw new Exception("Audit baseline was not silent");
            state = EventNotificationState.Parse(state.ToJson());
            var auditEvents = state.AcceptAudits(audit);
            if (auditEvents.Count != 1 || auditEvents[0].Path != "/p/p/audit?auditId=a" || !auditEvents[0].Title.Contains("başarısız")) throw new Exception("Audit outcome or click target missing");
            if (!state.AuditCursor.Contains("finishedAt")) throw new Exception("Audit cursor lost on restart");
            if (EventNotificationState.Summary(new List<WindowsEvent>()).Count != 0) throw new Exception("Empty balloon");
            var events = new List<WindowsEvent> { new WindowsEvent("A", "B", "/announcements"), new WindowsEvent("C", "D", "/p/p/audit") };
            var summary = EventNotificationState.Summary(events);
            if (summary.Count != 1 || summary[0].Path != "/") throw new Exception("Events were not summarized");
            try { state.AcceptAnnouncements("{\"announcements\":[{}]}"); throw new Exception("Invalid feed accepted"); }
            catch (FormatException) { }
            Console.WriteLine("Event notification baseline, persistence, deduplication, validation and summary tests passed.");
            return 0;
        }

        private static string Feed(params string[] ids)
        {
            var rows = new List<string>();
            foreach (string id in ids) rows.Add("{\"id\":\"" + (id == "old" ? "00000000-0000-4000-8000-000000000001" : "00000000-0000-4000-8000-000000000002") + "\",\"publish_at\":\"2020-01-01T00:00:00Z\",\"expires_at\":null}");
            return "{\"announcements\":[" + string.Join(",", rows.ToArray()) + "]}";
        }
    }
}
