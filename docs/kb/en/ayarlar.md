---
title: Settings
description: Theme, Google access key, PageSpeed key, usage limits, version and update check. The one settings screen for the whole installation.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

This screen holds the settings that apply to the whole installation: the Google connection, the PageSpeed key, the theme and updates.

**Ayarlar** (Settings) covers the whole installation. Settings for a single project (name, domain, Search Console and Analytics property) are on that project's **Proje ayarları** (Project settings) page. Here you manage the access key for connecting to Google, the PageSpeed key, the theme and the update check. The sections on the left are **Görünüm** (Appearance), **Google**, **Hizmet hesabı** (Service account), **Hız ölçümü** (Speed testing), **Sınırlar** (Limits), **Hakkında** (About) and **Sürüm notları** (Release notes). Each section title has a badge showing its status.

## What is on the screen

**Görünüm** (Appearance). For **Tema** (Theme) there are the options Sistem (System), Açık (Light) and Koyu (Dark). Your choice is stored in this browser. In another browser or on another computer, you choose again.

**Google.** The badge is one of three values: **Kayıtlı** (Saved), **Ortamdan geliyor** (Comes from the environment; on a Docker installation, the value was set in the `.env` file) or **Eksik** (Missing). The section shows the two redirect addresses to add in Google Cloud Console (Google's developer console), each with a copy button. Add both: without the Analytics address, only Search Console connects.

Fields: **İstemci kimliği** (Client ID) and **Gizli anahtar** (Secret key). Both come from the access key you create at Google. Buttons: **Kaydet** (Save), **Vazgeç** (Cancel), **Değiştir** (Change) and **Sil** (Delete). **Sil** (Delete) disconnects the existing connections. The step-by-step setup is in the Google connection guide.

**Hizmet hesabı** (Service account; the shorter route). A service account is an account in Google Cloud that belongs to the app instead of a person. Paste the contents of the key file you downloaded from Google Cloud into the **JSON anahtar dosyası** (JSON key file) field. If one is saved, the account's email address is shown. Add that address in these places:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle" (Settings → Users and permissions → Add user), permission Full.
- Analytics: "Yönetici → Erişim yönetimi" (Admin → Access management), permission Viewer.

The badge says **Kayıtlı** (Saved) or **Kullanılmıyor** (Not in use). A saved service account is preferred over the Google access key. Deleting removes the account from the app but does not revoke the key in Google.

**Hız ölçümü** (Speed testing). The section has an **API anahtarı** (API key) field and an **Anahtarı test et** (Test the key) button. The test "1 ölçüm harcar" (uses 1 measurement), and you can press it once every ten seconds. The badge says **Anahtar kayıtlı** (Key saved), **Ortam anahtarı** (Environment key) or **Anahtar eksik** (Key missing). The details are in the PageSpeed key guide.

**Sınırlar** (Limits). The "Google ve sistem sınırları" (Google and system limits) cards show:

- URL Inspection (Search Console): 2,000 per day.
- PageSpeed Insights.
- GA4 (Google Analytics) daily and hourly quota units: 200,000 and 40,000 by default. Google does not publish the exact figure; it only reports how much is left.
- Audit page limit: 10,000.
- Reports per project: 10,000, templates: 10.
- Largest report: 500,000 bytes.

The status of each card is **Yeterli** (Enough), **Azalıyor** (Running low, after 70 percent), **Neredeyse doldu** (Almost full, after 90 percent) or **Bilinmiyor** (Unknown).

**Hakkında** (About). The **Sürüm** (Version) row shows the installed version (for example v2.3.0). The **Güncellemeleri kontrol et** (Check for updates) switch is on by default. When it is on, the app asks GitHub for the latest version at most once a day. The **Şimdi kontrol et** (Check now) button then appears too. If there is a new version, a **Değişiklikler** (Changes) link appears, and for Docker installations a command you can copy: `git pull && docker compose up -d --build`. For the Windows package, it points to **Güncelle** (Update) on the taskbar icon. If automatic update is on, the new version installs by itself.

**Sürüm notları** (Release notes). It lists what changed in each version.

## How to use it

1. On first setup, enter the client ID and the secret key in the **Google** section, then the PageSpeed key in the **Hız ölçümü** (Speed testing) section. When both are saved, open the project and pick the property.
2. Once a month, check the **Sınırlar** (Limits) section. The quota that shows as "Azalıyor" (Running low) is most often the URL Inspection limit.
3. If the **Hakkında** (About) section shows a new version, update; the release notes say what changed. The update check is the only connection from your computer to anywhere other than Google. If you do not want it, turn the switch off.
4. To change the Google access key (for example, after creating a new Cloud project), click **Değiştir** (Change) and paste the new values. Existing connections do not work with the new key, so choose **Yeniden bağlan** (Reconnect) in each project.

## Frequently asked questions

**Why can't I see my secret key on the screen?** The app stores it encrypted and never sends it back to the browser. The screen shows only that it is saved, and the ID.

**What if the value I gave in `.env` on Docker and the one I entered on the screen conflict?** The value entered on the screen wins. If you save a value while the badge says "Ortamdan geliyor" (Comes from the environment), that value is used from then on.

**What does the update check send?** It sends no data. It reads GitHub's public list of releases. The request is anonymous.

**Service account or Google access key?** A service account needs no consent screen and does not expire, but you must grant that account access by hand in Search Console and Analytics. For a single-person installation either works. If you often see "süresi doldu" (expired), switch to a service account.

## Limits

**Ayarlar** (Settings) does not change the port number, the data folder or network settings. Those live in `config.json` in the Windows package and in the `.env` file on Docker. There is no user or password management because the app is single-user. The quota cards are the app's own count, not Google's real counter. URL inspections you run by hand in Search Console do not show up here, but they count against Google's limit.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
