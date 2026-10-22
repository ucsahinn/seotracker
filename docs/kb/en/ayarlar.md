---
title: Settings
description: Theme, Google access key, PageSpeed key, usage limits, version and update check. The one settings screen for the whole installation.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

On this page you see where to manage the Google connection, the speed key and updates.

**Ayarlar** (Settings) is the screen for everything that concerns the whole installation. Settings for each project (name, domain, Search Console and Analytics property) are on each project's **Proje ayarları** (Project settings) page. Here you manage the access key needed to connect to Google, the PageSpeed key, the theme and the update check. On the left there are the sections **Görünüm** (Appearance), **Google**, **Hizmet hesabı** (Service account), **Hız ölçümü** (Speed testing), **Sınırlar** (Limits), **Hakkında** (About) and **Sürüm notları** (Release notes). The title of each section has a badge that tells you its status.

## What is on the screen

**Görünüm** (Appearance). For **Tema** (Theme) there are the options Sistem (System), Açık (Light) and Koyu (Dark). Your choice is stored in this browser. In another browser or on another computer, you choose again.

**Google.** The badge is one of three values: **Kayıtlı** (Saved), **Ortamdan geliyor** (Comes from the environment; on a Docker installation, it was given through the `.env` file) or **Eksik** (Missing). The section shows the two redirect addresses you will add to Google Cloud Console (Google's developer panel). There are copy buttons next to them. You need to add both. If you do not add the Analytics address, only Search Console connects.

Fields: **İstemci kimliği** (Client ID) and **Gizli anahtar** (Secret key). Both are details of the access key you get from Google. Buttons: **Kaydet** (Save), **Vazgeç** (Cancel), **Değiştir** (Change) and **Sil** (Delete). **Sil** (Delete) cuts the existing connections. The step-by-step setup is in the Google connection guide.

**Hizmet hesabı** (Service account; the shorter way). A service account is a robot account created in Google for the app. In the **JSON anahtar dosyası** (JSON key file) field, you paste the contents of the file you downloaded from Google Cloud. If one is saved, the account's email address shows. The screen tells you where to add this address:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle" (Settings → Users and permissions → Add user), permission Full.
- Analytics: "Yönetici → Erişim yönetimi" (Admin → Access management), permission Viewer.

The badge says **Kayıtlı** (Saved) or **Kullanılmıyor** (Not in use). A saved service account is preferred over the Google access key. Deleting removes the account from the app, but it does not cancel the key in Google.

**Hız ölçümü** (Speed testing). There is an **API anahtarı** (API key) field and an **Anahtarı test et** (Test the key) button. The test "1 ölçüm harcar" (uses 1 measurement), and you can press it once every ten seconds. The badge says **Anahtar kayıtlı** (Key saved), **Ortam anahtarı** (Environment key) or **Anahtar eksik** (Key missing). The details are in the PageSpeed key guide.

**Sınırlar** (Limits). The "Google ve sistem sınırları" (Google and system limits) cards show the following:

- URL Inspection (Search Console): 2,000 per day.
- PageSpeed Insights.
- GA4 (Google Analytics) daily and hourly quota units: 200,000 and 40,000 by default. Google does not publish this number. It only tells you how much is left.
- Audit page limit: 10,000.
- Reports per project: 10,000, templates: 10.
- Largest report: 500,000 bytes.

The status of each card is **Yeterli** (Enough), **Azalıyor** (Running low, after 70 percent), **Neredeyse doldu** (Almost full, after 90 percent) or **Bilinmiyor** (Unknown).

**Hakkında** (About). The **Sürüm** (Version) row shows the version (like v2.3.0). The **Güncellemeleri kontrol et** (Check for updates) switch is on by default. When it is on, the app asks GitHub for the latest version at most once a day. In that case, the **Şimdi kontrol et** (Check now) button also shows. If there is a new version, a **Değişiklikler** (Changes) link appears, and for Docker installations a command to copy: `git pull && docker compose up -d --build`. For the Windows package, it points to **Güncelle** (Update) on the taskbar icon. If automatic update is on, the new version installs by itself.

**Sürüm notları** (Release notes). It lists what changed in each version.

## How to use it

1. On first setup, first enter the client ID and the secret key in the **Google** section. Then enter the PageSpeed key in the **Hız ölçümü** (Speed testing) section. When both are saved, you go to the project and pick the property.
2. Once a month, look at the **Sınırlar** (Limits) section. The quota you see as "Azalıyor" (Running low) is most often the URL Inspection limit.
3. If there is a new version in the **Hakkında** (About) section, update. The release notes tell you what changed. The update check is the only connection from your computer to anywhere other than Google. If you do not want it, turn the switch off.
4. If you need to change the Google access key (for example, a new Cloud project), click **Değiştir** (Change) and paste the new values. The existing connections do not work with the new key. In the projects, you need to choose **Yeniden bağlan** (Reconnect).

## Frequently asked questions

**Why can't I see my secret key on the screen?** The app stores it encrypted and does not send it back to the browser. The screen only shows that it is saved, and the ID.

**What if the value I gave in `.env` on Docker and the one I entered on the screen conflict?** The one entered on the screen wins. If you save a value while the badge says "Ortamdan geliyor" (Comes from the environment), that one is used from then on.

**What does the update check send?** It sends no data. It reads GitHub's public list of releases. The request is anonymous.

**Service account or Google access key?** A service account does not make you deal with the consent screen, and it does not expire. In return, you need to give that account permission by hand in Search Console and Analytics. In a single-person installation, either works. If you often see "süresi doldu" (expired), switch to a service account.

## Limits

The **Ayarlar** (Settings) screen does not change the port number, the data folder or network settings. These are in `config.json` in the Windows package and in the `.env` file on Docker. There is no user and password management, because the app is single-user. The quota cards are the app's own count, not Google's real counter. URL inspections you make by hand in Search Console do not show up here, but they use up Google's limit.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
