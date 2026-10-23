---
title: Connecting to Google
description: To read Search Console and Analytics 4 data, get a one-time access key from Google, paste it into the app and choose your site. Step by step.
kind: nasil-yapilir
updated: 2026-10-22
---

The app's interface is in Turkish. This guide gives every button and screen name in Turkish, with its English meaning in brackets.

This guide connects the app to your Google account so it can read your site's data. For that you create a "Google access key" once; it takes about ten minutes and you never repeat it. There is also a shorter route, a service account, at the end of the guide, and it is the recommended one for most people.

## What you need

- A site verified in Search Console (a property). If it is not verified, the app cannot see it in the list.
- For Analytics 4, at least "Viewer" permission on that property. This is optional. Search Console alone is enough.
- A Google account. Google Cloud Console (Google's developer console) is free and does not ask for a card.
- The app open, so you can copy the two redirect addresses from it (the addresses Google sends you back to once you give permission).

## Steps

1. In the app, open **Ayarlar → Google** (Settings → Google). You see two addresses. One ends with `/api/gsc/oauth/callback` (Search Console), the other with `/api/ga4/oauth/callback` (Analytics). In the Windows package, the addresses start with `http://127.0.0.1:3001`. On Docker, they start with `http://localhost:3001`. Keep both addresses at hand.
2. In the browser, go to `console.cloud.google.com`. In the project picker at the top, choose **Yeni proje** (New project). Any name works, for example "seowatcher".
3. Open the **API'ler ve Hizmetler → Kitaplık** (APIs & Services → Library) page. Type **Google Search Console API** in the search box, click it and choose **Etkinleştir** (Enable). If you will connect Analytics too, do the same for the **Google Analytics Admin API** and the **Google Analytics Data API**.
4. Open the **API'ler ve Hizmetler → OAuth izin ekranı** (APIs & Services → OAuth consent screen) page. Choose **Harici** (External) as the user type. Enter any app name and your own email address in the email fields. The publishing status can stay "Test".
5. On the same page, add your own Google account under **Test kullanıcıları** (Test users). No Google review is needed.
6. On the **API'ler ve Hizmetler → Kimlik bilgileri** (APIs & Services → Credentials) page, choose **Kimlik bilgisi oluştur** (Create credentials), then choose **OAuth istemci kimliği** (OAuth client ID). This is your Google access key.
7. Choose **Web uygulaması** (Web application) as the application type.
8. Under **Yetkilendirilmiş yönlendirme URI'leri** (Authorized redirect URIs), add the two addresses from step 1. Do not put a slash at the end. Even a one-character difference causes a "redirect_uri_mismatch" error in Google (the address does not match).
9. Choose **Oluştur** (Create). Google shows a client ID and a secret key.
10. Go back to the app. In **Ayarlar → Google** (Settings → Google), paste the ID that ends with `.apps.googleusercontent.com` into the **İstemci kimliği** (Client ID) field. Paste the key that starts with `GOCSPX-` into the **Gizli anahtar** (Secret key) field.
11. Choose **Kaydet** (Save). A "Google erişim anahtarı kaydedildi" (Google access key saved) notice appears. You do not need to restart. If you paste the ID into the wrong field, the app warns you: "Kimlik .apps.googleusercontent.com ile bitmeli. Gizli anahtarı değil, istemci kimliğini yapıştırın." (The ID must end with .apps.googleusercontent.com. Paste the client ID, not the secret key.)
12. If you have no project yet, create one first with **Yeni proje** (New project). See [Projects](/docs/projeler/).
13. Go to your project: **Proje ayarları → Bağlantılar** (Project settings → Connections). On the **Google Search Console** card, choose **Bağlan** (Connect).
14. On Google's permission screen, pick the account you added as a test user and give permission. When you return to the app, a "Search Console bağlandı" (Search Console connected) notice appears.
15. From the **Mülk seç** (Choose property) list, pick your site and choose **Mülkü kaydet** (Save property). If you pick a domain property, the card says "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar." (Domain property: covers all subdomains and http/https addresses.)
16. For Analytics, on the same screen, choose **Bağlan** (Connect) on the **Google Analytics** card, give permission and pick the property. Each connection asks for its own permission; one does not cover the other.

### A shorter route: a service account

A service account is a special account that connects to Google in your place, so you need no consent screen. This route is recommended for most people; the OAuth route above is for those who prefer signing in with their own Google account.

1. Go to `console.cloud.google.com` and open **IAM & Admin → Service Accounts** (in a Turkish console: **IAM ve Yönetici → Hizmet hesapları**). Make sure the same Cloud project has the APIs from step 3 enabled.
2. Click **Create service account**. Give it a name, for example "seowatcher". Skip the role steps and click **Done**.
3. On the new account's row, open **Keys → Add key → Create new key**, choose **JSON** and confirm. A file downloads. Keep it private.
4. In seowatcher, open **Ayarlar → Hizmet hesabı** (Settings → Service account). Paste the contents of the whole file and save. The screen shows the service account's email address. Copy it.
5. In Search Console, open **Settings → Users and permissions → Add user**. Enter that email address and choose the permission **Full**.
6. For Analytics, in Google Analytics open the property's **Admin → Access management**. Add the same email address as **Viewer**.

If a service account is saved, the app prefers it. The "Şu an kullanılan" (Currently in use) line on the **Ayarlar** (Settings) screen tells you which one is active.

## Check

- On the **Proje ayarları → Bağlantılar** (Project settings → Connections) cards, the badge should say **Bağlı** (Connected).
- The four number cards on the **Panel** (Dashboard) screen should fill in within a few seconds. On a new site the numbers can be zero, which is not a connection error.
- The badge in **Ayarlar → Google** (Settings → Google) should say **Kayıtlı** (Saved).

## Frequently asked questions

**Where is the secret key stored?** In the database on this computer, encrypted. The encryption key is the `instance-secret` file (in the data folder on Windows, in the data volume on Docker) and is never sent to the browser.

**Can I use the same access key in more than one project?** Yes. One per installation is enough. Each project picks its own property.

**The connection dropped after a few days.** For apps in "Test" status, Google can expire the permission after seven days. The card then says "Bağlantının süresi doldu" (The connection has expired). Choosing **Yeniden bağlan** (Reconnect) fixes it for now. The lasting fix is to move the consent screen to "Production" or to switch to a service account.

**What permissions does it ask for?** Read-only for Search Console (`webmasters.readonly`) and read-only for Analytics (`analytics.readonly`). The app cannot change anything in Google.

## If something goes wrong

- **Google says "redirect_uri_mismatch".** The redirect address in Cloud Console is not exactly the same as the one in the app. Use the copy button on the **Ayarlar** (Settings) screen. Any of these causes the error: http instead of https, 127.0.0.1 instead of localhost, or a slash at the end.
- **A "Google erişim anahtarı eksik" (Google access key missing) warning appears.** Steps 10 and 11 were skipped, or saving failed. On the **Ayarlar** (Settings) screen, the badge should say **Kayıtlı** (Saved).
- **Google says "access_denied".** The account you signed in with is not in the test users list on the consent screen. Add the account to the list, or pick the right account.
- **The property list is empty.** This account has no verified site in Search Console and no Analytics permission. Verify the site first.
- **It says "Bağlantısı tamamlanmadı" (Connection not completed) and "state_mismatch".** You opened the permission screen in two tabs, or you waited more than ten minutes. Start again in a single tab. If cookies (small files that sites store in your browser) are turned off, turn them on.
- **It says "Google hesabı zaten bağlı" (Google account already connected).** The account is already linked to another record. Remove the old one with **Hesabı kaldır** (Remove account) in the property picker and connect again.
- **The connections dropped after an update.** The encryption key changed (on Docker, `BETTER_AUTH_SECRET` was added or the data volume was recreated). Choose **Yeniden bağlan** (Reconnect) on the cards.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
