---
title: Connecting to Google
description: To read Search Console and Analytics 4 data, get a one-time access key from Google, paste it into the app and choose your site. Step by step.
kind: nasil-yapilir
updated: 2026-10-22
---

The app's interface comes in six languages: Turkish, English, German, French, Italian and Portuguese. This guide uses the English names; to switch, go to **Settings → Appearance → Language**.

This guide connects the app to your Google account so it can read your site's data. For that you create a "Google access key" once; it takes about ten minutes and you never repeat it. There is also a shorter route, a service account, at the end of the guide, and it is the recommended one for most people.

## What you need

- A site verified in Search Console (a property). If it is not verified, the app cannot see it in the list.
- For Analytics 4, at least "Viewer" permission on that property. This is optional. Search Console alone is enough.
- A Google account. Google Cloud Console (Google's developer console) is free and does not ask for a card.
- The app open, so you can copy the two redirect addresses from it (the addresses Google sends you back to once you give permission).

## Steps

1. In the app, open **Settings → Google**. You see two addresses. One ends with `/api/gsc/oauth/callback` (Search Console), the other with `/api/ga4/oauth/callback` (Analytics). In the Windows package, the addresses start with `http://127.0.0.1:3001`. On Docker, they start with `http://localhost:3001`. Keep both addresses at hand.
2. In the browser, go to `console.cloud.google.com`. In the project picker at the top, choose **New project**. Any name works, for example "seowatcher".
3. Open the **APIs & Services → Library** page. Type **Google Search Console API** in the search box, click it and choose **Enable**. If you will connect Analytics too, do the same for the **Google Analytics Admin API** and the **Google Analytics Data API**.
4. Open the **APIs & Services → OAuth consent screen** page. Choose **External** as the user type. Enter any app name and your own email address in the email fields. The publishing status can stay "Test".
5. On the same page, add your own Google account under **Test users**. No Google review is needed.
6. On the **APIs & Services → Credentials** page, choose **Create credentials**, then choose **OAuth client ID**. This is your Google access key.
7. Choose **Web application** as the application type.
8. Under **Authorized redirect URIs**, add the two addresses from step 1. Do not put a slash at the end. Even a one-character difference causes a "redirect_uri_mismatch" error in Google (the address does not match).
9. Choose **Create**. Google shows a client ID and a secret key.
10. Go back to the app. In **Settings → Google**, paste the ID that ends with `.apps.googleusercontent.com` into the **Client ID** field. Paste the key that starts with `GOCSPX-` into the **Client secret** field.
11. Choose **Save**. A "Google access key saved" notice appears. You do not need to restart. If you paste the ID into the wrong field, the app warns you: "The client ID must end in .apps.googleusercontent.com. Paste the OAuth client ID, not the client secret."
12. If you have no project yet, create one first with **New project**. See [Projects](/docs/projeler/).
13. Go to your project: **Project settings → Connections**. On the **Google Search Console** card, choose **Connect**.
14. On Google's permission screen, pick the account you added as a test user and give permission. When you return to the app, a "Search Console connected" notice appears.
15. From the **Choose property** list, pick your site and choose **Save property**. If you pick a domain property, the card says "Domain property: covers all subdomains and both http and https URLs."
16. For Analytics, on the same screen, choose **Connect** on the **Google Analytics** card, give permission and pick the property. Each connection asks for its own permission; one does not cover the other.

### A shorter route: a service account

A service account is a special account that connects to Google in your place, so you need no consent screen. This route is recommended for most people; the OAuth route above is for those who prefer signing in with their own Google account.

1. Go to `console.cloud.google.com` and open **IAM & Admin → Service Accounts**. Make sure the same Cloud project has the APIs from step 3 enabled.
2. Click **Create service account**. Give it a name, for example "seowatcher". Skip the role steps and click **Done**.
3. On the new account's row, open **Keys → Add key → Create new key**, choose **JSON** and confirm. A file downloads. Keep it private.
4. In seowatcher, open **Settings → Service account**. Paste the contents of the whole file and save. The screen shows the service account's email address. Copy it.
5. In Search Console, open **Settings → Users and permissions → Add user**. Enter that email address and choose the permission **Full**.
6. For Analytics, in Google Analytics open the property's **Admin → Access management**. Add the same email address as **Viewer**.

If a service account is saved, the app prefers it. The "In use" line on the **Settings** screen tells you which one is active.

## Check

- On the **Project settings → Connections** cards, the badge should say **Connected**.
- The four number cards on the **Dashboard** screen should fill in within a few seconds. On a new site the numbers can be zero, which is not a connection error.
- The badge in **Settings → Google** should say **Saved**.

## Frequently asked questions

**Where is the secret key stored?** In the database on this computer, encrypted. The encryption key is the `instance-secret` file (in the data folder on Windows, in the data volume on Docker) and is never sent to the browser.

**Can I use the same access key in more than one project?** Yes. One per installation is enough. Each project picks its own property.

**The connection dropped after a few days.** For apps in "Test" status, Google can expire the permission after seven days. The card then says "The connection has expired". Choosing **Reconnect** fixes it for now. The lasting fix is to move the consent screen to "Production" or to switch to a service account.

**What permissions does it ask for?** Read-only for Search Console (`webmasters.readonly`) and read-only for Analytics (`analytics.readonly`). The app cannot change anything in Google.

## If something goes wrong

- **Google says "redirect_uri_mismatch".** The redirect address in Cloud Console is not exactly the same as the one in the app. Use the copy button on the **Settings** screen. Any of these causes the error: http instead of https, 127.0.0.1 instead of localhost, or a slash at the end.
- **A "Google access key missing" warning appears.** Steps 10 and 11 were skipped, or saving failed. On the **Settings** screen, the badge should say **Saved**.
- **Google says "access_denied".** The account you signed in with is not in the test users list on the consent screen. Add the account to the list, or pick the right account.
- **The property list is empty.** This account has no verified site in Search Console and no Analytics permission. Verify the site first.
- **It says "connection was not completed" and "state_mismatch".** You opened the permission screen in two tabs, or you waited more than ten minutes. Start again in a single tab. If cookies (small files that sites store in your browser) are turned off, turn them on.
- **It says "Google account already linked".** The account is already linked to another record. Remove the old one with **Remove account** in the property picker and connect again.
- **The connections dropped after an update.** The encryption key changed (on Docker, `BETTER_AUTH_SECRET` was added or the data volume was recreated). Choose **Reconnect** on the cards.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
