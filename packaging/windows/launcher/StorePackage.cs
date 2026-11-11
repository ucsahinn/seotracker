using System;
using System.IO;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

namespace SeoWatcher
{
    /// <summary>What differs when this same executable runs from the Microsoft
    /// Store (MSIX) package instead of the Inno Setup install: where the data
    /// lives, how "start with Windows" is stored, and that the Store, not this
    /// launcher, replaces the files. Windows Runtime types are touched only in
    /// the private methods below, so an unpackaged start never loads them.</summary>
    internal static class StorePackage
    {
        /// <summary>The TaskId of the windows.startupTask extension in
        /// packaging\windows\msix\AppxManifest.xml.</summary>
        private const string StartupTaskId = "seowatcherStartup";
        private const int ErrorInsufficientBuffer = 122;

        // Windows.ApplicationModel.StartupTaskState, by value: the newer members
        // are missing from the metadata of older build machines.
        private const int StateDisabled = 0;
        private const int StateEnabled = 2;
        private const int StateEnabledByPolicy = 4;
        private const int StateUnknown = -1;

        [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
        private static extern int GetCurrentPackageFamilyName(ref uint length, StringBuilder name);

        private static readonly string familyName = ReadFamilyName();

        public static bool IsPackaged { get { return familyName != null; } }

        private static string ReadFamilyName()
        {
            try
            {
                uint length = 0;
                // Without a package this answers APPMODEL_ERROR_NO_PACKAGE.
                if (GetCurrentPackageFamilyName(ref length, null) != ErrorInsufficientBuffer) return null;
                var name = new StringBuilder((int)length);
                return GetCurrentPackageFamilyName(ref length, name) == 0 ? name.ToString() : null;
            }
            catch (Exception) { return null; }
        }

        // A packaged process that creates files under %LOCALAPPDATA% gets them
        // redirected into a private copy no other program can find by that
        // path. The package's own cache folder is a real location: the launcher,
        // node and an agent reading mcp-token from outside all see the same file.
        private static string DataRootUnder(string localAppData)
        {
            return Path.Combine(localAppData, "Packages", familyName, "LocalCache", Program.AppName);
        }

        public static string DataRoot
        {
            get { return DataRootUnder(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)); }
        }

        /// <summary>The same folder as the app and the agent prompts print it:
        /// no user name, and it expands in PowerShell, cmd and Explorer.</summary>
        public static string DataRootDisplay
        {
            get { return DataRootUnder("%LOCALAPPDATA%"); }
        }

        /// <summary>First packaged start on a machine that ran the Inno install:
        /// take over its database and keys so the user continues where they
        /// left off. The old folder is copied, never changed. The database
        /// appears under its final name last, and only its absence asks for
        /// the copy, so an interrupted copy is repeated in full. Returns null,
        /// or why it failed: the caller must not start the server then, because
        /// the server would create an empty database and end the retries.</summary>
        public static string AdoptLegacyData()
        {
            if (!IsPackaged) return null;
            string legacy = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Program.AppName);
            string target = DataRoot;
            string data = Path.Combine(target, "data");
            try
            {
                if (Directory.Exists(data) || !Directory.Exists(Path.Combine(legacy, "data"))) return null;
                Directory.CreateDirectory(target);
                // Without a database here, keys left by an earlier attempt
                // open nothing: the old install's keys replace them.
                foreach (string name in new[] { "instance-secret", "mcp-token", "config.json" })
                {
                    string from = Path.Combine(legacy, name);
                    if (File.Exists(from)) File.Copy(from, Path.Combine(target, name), true);
                }
                string staging = data + ".adopting";
                if (Directory.Exists(staging)) Directory.Delete(staging, true);
                CopyTree(Path.Combine(legacy, "data"), staging);
                Directory.Move(staging, data);
                LauncherLog.Write("store: adopted the data of the previous install");
                return null;
            }
            catch (Exception ex)
            {
                LauncherLog.Write("store: could not adopt previous data: " + ex.Message);
                return ex.Message;
            }
        }

        /// <summary>The user chose to start empty after a failed adoption: an
        /// empty database folder is what stops the copy from being tried again.</summary>
        public static void SkipLegacyData()
        {
            Directory.CreateDirectory(Path.Combine(DataRoot, "data"));
        }

        private static void CopyTree(string source, string target)
        {
            Directory.CreateDirectory(target);
            foreach (string file in Directory.GetFiles(source)) File.Copy(file, Path.Combine(target, Path.GetFileName(file)));
            foreach (string dir in Directory.GetDirectories(source)) CopyTree(dir, Path.Combine(target, Path.GetFileName(dir)));
        }

        /// <summary>A startup task starts the app without arguments, so the
        /// launcher asks Windows why it was started instead of reading --silent.</summary>
        public static bool StartedAtSignIn()
        {
            if (!IsPackaged) return false;
            try { return ActivatedByStartupTask(); }
            catch (Exception) { return false; }
        }

        public static bool StartupEnabled()
        {
            int state = SafeStartupState();
            return state == StateEnabled || state == StateEnabledByPolicy;
        }

        /// <summary>Switched off in Windows Settings or Task Manager, or fixed by
        /// policy: Windows then refuses any change the app asks for. A state
        /// that cannot be read is shown the same way, off and not clickable.</summary>
        public static bool StartupLocked()
        {
            int state = SafeStartupState();
            return state != StateEnabled && state != StateDisabled;
        }

        // Read whenever the tray menu opens: a failure there must cost the
        // user one greyed-out item, not the tray.
        private static int SafeStartupState()
        {
            try { return StartupState(); }
            catch (Exception ex)
            {
                LauncherLog.Write("store: startup task unreadable: " + ex.Message);
                return StateUnknown;
            }
        }

        public static void SetStartup(bool enabled)
        {
            if (!ChangeStartup(enabled)) throw new InvalidOperationException("Windows keeps this startup setting");
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        private static bool ActivatedByStartupTask()
        {
            var args = Windows.ApplicationModel.AppInstance.GetActivatedEventArgs();
            return args != null && args.Kind == Windows.ApplicationModel.Activation.ActivationKind.StartupTask;
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        private static int StartupState()
        {
            return (int)Wait(Windows.ApplicationModel.StartupTask.GetAsync(StartupTaskId)).State;
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        private static bool ChangeStartup(bool enabled)
        {
            var task = Wait(Windows.ApplicationModel.StartupTask.GetAsync(StartupTaskId));
            if (!enabled)
            {
                task.Disable();
                return (int)task.State == StateDisabled;
            }
            return (int)Wait(task.RequestEnableAsync()) == StateEnabled;
        }

        // These operations finish on a pool thread and need no message pump, so
        // the tray's UI thread can wait for them; GetResults rethrows a failure.
        // They answer in milliseconds: one that does not is given up on.
        private static T Wait<T>(Windows.Foundation.IAsyncOperation<T> operation)
        {
            for (int waited = 0; operation.Status == Windows.Foundation.AsyncStatus.Started; waited += 10)
            {
                if (waited >= 5000) throw new TimeoutException("Windows did not answer");
                Thread.Sleep(10);
            }
            return operation.GetResults();
        }
    }
}
