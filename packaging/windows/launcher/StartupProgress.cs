using System;
using System.Drawing;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace SeoWatcher
{
    internal sealed class StartupProgressPresentation
    {
        public readonly string Message;
        public readonly int? Percent;
        public readonly bool IsError;

        private StartupProgressPresentation(string message, int? percent, bool isError)
        {
            Message = message;
            Percent = percent;
            IsError = isError;
        }

        public static StartupProgressPresentation FromStatus(string status)
        {
            status = status ?? "";
            string language = LauncherLanguage.Current;
            Match download = Regex.Match(status, "^Güncelleme indiriliyor:\\s*(.*?)\\s*\\(%(\\d{1,3})\\)$");
            if (download.Success)
            {
                int percent;
                if (Int32.TryParse(download.Groups[2].Value, out percent))
                {
                    percent = Math.Max(0, Math.Min(100, percent));
                    return new StartupProgressPresentation(
                        LauncherLanguage.Text(language, "download", download.Groups[1].Value), percent, false);
                }
            }

            Match downloadStarting = Regex.Match(status, "^Güncelleme indiriliyor:\\s*(.*)$");
            if (downloadStarting.Success)
                return new StartupProgressPresentation(
                    LauncherLanguage.Text(language, "download", downloadStarting.Groups[1].Value), null, false);

            Match installing = Regex.Match(status, "^Güncelleme kuruluyor:\\s*(.*)$");
            if (installing.Success)
                return new StartupProgressPresentation(
                    LauncherLanguage.Text(language, "install", installing.Groups[1].Value), null, false);

            if (status.StartsWith("Hata:", StringComparison.OrdinalIgnoreCase))
                return new StartupProgressPresentation(
                    LauncherLanguage.Text(language, "failed", status.Substring(5).Trim()), null, true);
            if (status.IndexOf("Veritabanı güncelleniyor", StringComparison.OrdinalIgnoreCase) >= 0)
                return new StartupProgressPresentation(LauncherLanguage.Text(language, "database"), null, false);
            if (status.IndexOf("Anahtarlar hazırlanıyor", StringComparison.OrdinalIgnoreCase) >= 0)
                return new StartupProgressPresentation(LauncherLanguage.Text(language, "keys"), null, false);
            if (status.IndexOf("Sunucu başlatılıyor", StringComparison.OrdinalIgnoreCase) >= 0)
                return new StartupProgressPresentation(LauncherLanguage.Text(language, "server"), null, false);
            if (String.IsNullOrWhiteSpace(status))
                status = LauncherLanguage.Text(language, "starting");

            return new StartupProgressPresentation(status, null, false);
        }
    }

    internal static class LauncherLanguage
    {
        public static string Current
        {
            get
            {
                string language = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.ToLowerInvariant();
                return language == "tr" || language == "en" || language == "de" ||
                    language == "fr" || language == "it" || language == "pt" ? language : "tr";
            }
        }

        public static string Text(string language, string key, params object[] values)
        {
            string value;
            switch ((language ?? "tr") + ":" + key)
            {
                case "en:starting": value = "Starting seowatcher"; break;
                case "en:keys": value = "Preparing secure settings"; break;
                case "en:database": value = "Updating the local database"; break;
                case "en:server": value = "Starting the app server"; break;
                case "en:download": value = "Downloading update: {0}"; break;
                case "en:install": value = "Installing update: {0}"; break;
                case "en:failed": value = "Could not start: {0}"; break;
                case "en:ready": value = "This window closes when seowatcher is ready"; break;
                case "en:elapsed": value = "Elapsed: {0}"; break;
                case "de:starting": value = "seowatcher wird gestartet"; break;
                case "de:keys": value = "Sichere Einstellungen werden vorbereitet"; break;
                case "de:database": value = "Lokale Datenbank wird aktualisiert"; break;
                case "de:server": value = "App-Server wird gestartet"; break;
                case "de:download": value = "Update wird heruntergeladen: {0}"; break;
                case "de:install": value = "Update wird installiert: {0}"; break;
                case "de:failed": value = "Start fehlgeschlagen: {0}"; break;
                case "de:ready": value = "Dieses Fenster schließt sich, sobald seowatcher bereit ist"; break;
                case "de:elapsed": value = "Verstrichen: {0}"; break;
                case "fr:starting": value = "Démarrage de seowatcher"; break;
                case "fr:keys": value = "Préparation des paramètres sécurisés"; break;
                case "fr:database": value = "Mise à jour de la base de données locale"; break;
                case "fr:server": value = "Démarrage du serveur de l’application"; break;
                case "fr:download": value = "Téléchargement de la mise à jour : {0}"; break;
                case "fr:install": value = "Installation de la mise à jour : {0}"; break;
                case "fr:failed": value = "Échec du démarrage : {0}"; break;
                case "fr:ready": value = "Cette fenêtre se ferme lorsque seowatcher est prêt"; break;
                case "fr:elapsed": value = "Écoulé : {0}"; break;
                case "it:starting": value = "Avvio di seowatcher"; break;
                case "it:keys": value = "Preparazione delle impostazioni sicure"; break;
                case "it:database": value = "Aggiornamento del database locale"; break;
                case "it:server": value = "Avvio del server dell’app"; break;
                case "it:download": value = "Download dell’aggiornamento: {0}"; break;
                case "it:install": value = "Installazione dell’aggiornamento: {0}"; break;
                case "it:failed": value = "Avvio non riuscito: {0}"; break;
                case "it:ready": value = "Questa finestra si chiude quando seowatcher è pronto"; break;
                case "it:elapsed": value = "Tempo trascorso: {0}"; break;
                case "pt:starting": value = "Iniciando o seowatcher"; break;
                case "pt:keys": value = "Preparando as configurações seguras"; break;
                case "pt:database": value = "Atualizando o banco de dados local"; break;
                case "pt:server": value = "Iniciando o servidor do app"; break;
                case "pt:download": value = "Baixando atualização: {0}"; break;
                case "pt:install": value = "Instalando atualização: {0}"; break;
                case "pt:failed": value = "Falha ao iniciar: {0}"; break;
                case "pt:ready": value = "Esta janela fecha quando o seowatcher estiver pronto"; break;
                case "pt:elapsed": value = "Tempo decorrido: {0}"; break;
                case "tr:starting": value = "seowatcher başlatılıyor"; break;
                case "tr:keys": value = "Güvenli ayarlar hazırlanıyor"; break;
                case "tr:database": value = "Yerel veritabanı güncelleniyor"; break;
                case "tr:server": value = "Uygulama sunucusu başlatılıyor"; break;
                case "tr:download": value = "Güncelleme indiriliyor: {0}"; break;
                case "tr:install": value = "Güncelleme kuruluyor: {0}"; break;
                case "tr:failed": value = "Uygulama başlatılamadı: {0}"; break;
                case "tr:ready": value = "seowatcher hazır olduğunda bu pencere kapanır"; break;
                case "tr:elapsed": value = "Geçen süre: {0}"; break;
                default: value = key; break;
            }
            return values == null || values.Length == 0 ? value : String.Format(CultureInfo.CurrentCulture, value, values);
        }
    }

    internal sealed class StartupProgressWindow : Form
    {
        private readonly Label stage;
        private readonly Label elapsed;
        private readonly ProgressBar progress;
        private readonly Timer timer;
        private readonly System.Diagnostics.Stopwatch watch;

        public StartupProgressWindow(string initialStatus)
        {
            Text = "seowatcher";
            StartPosition = FormStartPosition.CenterScreen;
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;
            MinimizeBox = false;
            ShowIcon = false;
            ClientSize = new Size(470, 154);

            var heading = new Label
            {
                AutoSize = true,
                Font = new Font(SystemFonts.MessageBoxFont, FontStyle.Bold),
                Location = new Point(22, 18),
                Text = LauncherLanguage.Text(LauncherLanguage.Current, "starting"),
            };
            stage = new Label
            {
                AutoEllipsis = true,
                Location = new Point(22, 52),
                Size = new Size(426, 22),
                TextAlign = ContentAlignment.MiddleLeft,
            };
            progress = new ProgressBar
            {
                Location = new Point(22, 82),
                Size = new Size(426, 18),
                Style = ProgressBarStyle.Marquee,
                MarqueeAnimationSpeed = 26,
            };
            var readyText = new Label
            {
                AutoEllipsis = true,
                Location = new Point(22, 111),
                Size = new Size(310, 20),
                Text = LauncherLanguage.Text(LauncherLanguage.Current, "ready"),
                ForeColor = SystemColors.GrayText,
            };
            elapsed = new Label
            {
                AutoSize = false,
                Location = new Point(334, 111),
                Size = new Size(114, 20),
                TextAlign = ContentAlignment.MiddleRight,
                ForeColor = SystemColors.GrayText,
            };

            Controls.Add(heading);
            Controls.Add(stage);
            Controls.Add(progress);
            Controls.Add(readyText);
            Controls.Add(elapsed);

            watch = System.Diagnostics.Stopwatch.StartNew();
            timer = new Timer { Interval = 1000 };
            timer.Tick += (sender, args) => UpdateElapsed();
            timer.Start();
            FormClosed += (sender, args) => timer.Stop();
            UpdateElapsed();
            SetStatus(initialStatus);
        }

        public void SetStatus(string status)
        {
            if (IsDisposed) return;
            if (InvokeRequired)
            {
                try { BeginInvoke(new Action<string>(SetStatus), status); } catch (InvalidOperationException) { }
                return;
            }
            var presentation = StartupProgressPresentation.FromStatus(status);
            stage.Text = presentation.Message;
            stage.ForeColor = presentation.IsError ? Color.Firebrick : SystemColors.WindowText;
            if (presentation.IsError)
            {
                progress.Style = ProgressBarStyle.Continuous;
                progress.Value = progress.Minimum;
            }
            else if (presentation.Percent.HasValue)
            {
                progress.Style = ProgressBarStyle.Continuous;
                progress.Value = Math.Max(progress.Minimum, Math.Min(progress.Maximum, presentation.Percent.Value));
            }
            else
            {
                progress.Style = ProgressBarStyle.Marquee;
                progress.MarqueeAnimationSpeed = 26;
            }
        }

        private void UpdateElapsed()
        {
            elapsed.Text = LauncherLanguage.Text(
                LauncherLanguage.Current,
                "elapsed",
                watch.Elapsed.ToString(@"m\:ss", CultureInfo.CurrentCulture));
        }
    }
}
