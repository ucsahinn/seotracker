---
title: Connecting to Google
description: Give seowatcher read access to Search Console and GA4 with your own service account or OAuth client, then choose a property per project.
kind: nasil-yapilir
updated: 2026-10-27
---

seowatcher runs on your computer and talks to Google directly, so it needs a credential from your own Google Cloud project. You can use a service account or an OAuth client. The credential is saved once for the whole installation; each project then gets its own Search Console property and GA4 property.

## Two scopes: credential and property

| Setting                         | Where                                                   | Applies to             |
| ------------------------------- | ------------------------------------------------------- | ---------------------- |
| Service account or OAuth client | **Settings → Service account** or **Settings → Google** | The whole installation |
| Search Console and GA4 property | **Project settings → Connections**                      | One project            |

"Saved" means the credential is stored. A selected property means the project is bound to it. Neither proves that Google will return report data; you know access works when **Search performance** or **Analytics** shows data. Selecting a GA4 property does not install a tracking tag on your site.

If both a service account and an OAuth client are saved, the service account is used.

## Option 1: service account

A service account needs no sign-in flow and does not expire, which makes it the shorter route.

1. In Google Cloud Console, enable the **Google Search Console API**. For Analytics, also enable the **Google Analytics Admin API** and the **Google Analytics Data API**.
2. Create a service account and download its JSON key file.
3. In seowatcher, open **Settings → Service account**. Select the JSON file, or paste its contents into the masked field, and save. The private key is never shown again.
4. Copy the service account email address the app displays. Add it as a user in Search Console with **Full** permission, and in Google Analytics with the **Viewer** role.
5. In each project, open **Project settings → Connections** and choose the property.

## Option 2: OAuth client

1. In Google Cloud Console, create an OAuth client of type **Web application**.
2. Add both redirect URIs shown in **Settings → Google**, character for character. They are built from the address you opened the app at, for example `http://127.0.0.1:3001/api/gsc/oauth/callback` and `http://127.0.0.1:3001/api/ga4/oauth/callback`. `localhost` and `127.0.0.1` count as different addresses.
3. Save the client ID and client secret in **Settings → Google**.
4. In each project, open **Project settings → Connections**, select **Add Google account**, grant access and choose the property.

While the OAuth consent screen is in **Testing**, only the accounts listed as test users can sign in, and Google can expire the grant after seven days. Publish the consent screen or use a service account to avoid reconnecting.

## When something fails

- **Property list did not refresh.** The previous list stays visible. An empty list on its own does not prove missing access.
- **Expired grant.** Select **Reconnect** in the project's connections.
- **Access denied.** Check the account's permission on the property.
- **API disabled.** Enable the API in the Google Cloud project.
- **Rate limit.** Wait and try again.
- **Unknown error.** Select **Try again**, then check the [Help](/docs/yardim/) screen and its diagnostics bundle.

The connection card shows the date of the last successful Google read for the current credential and property, and for GA4 the property's time zone and currency. After a temporary failure it keeps that date. If there is no successful read yet, access is unverified. Opening the settings screen does not query Google.

Removing a credential from seowatcher does not revoke it at Google. A new credential does not inherit the previous one's access or quota history, so refresh the reports after switching. Changing a project's domain keeps its property binding and its stored history.
