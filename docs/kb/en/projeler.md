---
title: Projects
description: Creating a new project, choosing the site and country, renaming, managing Google connections, and archiving and restoring a project.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

This guide covers creating a project, changing its settings and, if needed, archiving it. Each site is a project. Each project has its own Google connection, its own audits and its own reports.

## What is on the screen

**Proje seçici** (Project picker). Click the project name at the top left to list your projects. At the bottom are **New project** and **Manage projects**. The gear icon next to it opens **Project settings**. When you have eight or more projects, a search box appears in the list.

**Projects** page. Each row shows the project's name and its site. A project with no site says "Site belirlenmemiş" (No site set). The open project carries the **Active** label. Click a row and that project's settings open. Archived projects sit at the bottom in the **Archived** section. **Restore** brings them back.

**New project window.** It has four fields:

- **Name**: required. Only you see it. It appears in report titles and in the project picker, and it is never sent to Google.
- **Alan adı (isteğe bağlı)** (Domain (optional)): your site's address, like `example.com`. The `https://` and `www.` at the start are removed automatically. Subdomains belong to the main domain: `blog.example.com` and `example.com` are the same project.
- **Country** and **Language**: they set the market for which the keywords you save are tracked. Changing the country resets the language to that country's language. You can change them later.

**Project settings.** There are two tabs. The **General** tab has the name, domain, country and language, plus the **Archive project** section. The **Connections** tab has the Search Console and Analytics cards.

## How to use it

1. In the project picker, click **Yeni proje**.
2. Type a name, enter your site's address, choose the country and language, and click **Create project**. The project opens on the **Dashboard**. No data has been fetched yet.
3. Go to **Proje ayarları → Bağlantılar** (Project settings → Connections) and connect Search Console. The steps are in the Google connection guide. Once it is connected, Panel, Arama performansı (Search performance), Fırsatlar (Opportunities) and Dizin durumu (Index status) start to fill in.
4. If you also want to connect Analytics, do it from the **Analytics** card on the same tab. You do not need a separate Google key.
5. To change the name or the site, correct the field on the **Genel** tab and click **Save changes**. The button is enabled only when something has changed.

### Changing the Google connection

On the card in the **Bağlantılar** tab, **Change property or account** lets you choose another site (what Google calls a "property") or another Google account. **Disconnect** removes only this project's connection. Your Google account stays saved, and no confirmation is asked. To remove a Google account completely, use **Remove account** in the selection window. The window tells you which projects will be affected.

### Archiving a project

Projects are archived, not deleted. The **Projeyi arşivle** button at the bottom of the **Genel** tab removes the project from the active list. Audits, keywords and reports stay as they are. **Geri al** on the Projeler page brings it back exactly as it was. If you have only one project, you cannot archive it.

## How the numbers are calculated

This screen has no numbers. When a domain is saved, spaces and capital letters are cleaned up, and the address must be a real domain (an IP address, `localhost` or an invented extension is not accepted). Invalid input shows the warning "Enter a valid domain, for example acme.com.".

## Frequently asked questions

**Can I delete a project completely?** No, you can only archive it. Its data stays, and you can restore it whenever you like.

**Can I connect two sites to one project?** No. A project has one Search Console property and one Analytics property. Open a second project for the second site.

**There is a project named "Default". What is it?** On first launch the app creates an empty project so that the screens can open. You can rename it and use it, or open a new project and archive that one.

**I chose the wrong country.** Change it on the **Genel** tab. From then on, the rankings of the keywords you saved are tracked for the new country.

## Limits

There is no limit on the number of projects. Creating a project starts nothing. Data comes only once Google is connected. If you did not enter a domain, you type the address by hand when you start an audit.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
