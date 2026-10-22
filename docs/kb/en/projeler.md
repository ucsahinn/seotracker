---
title: Projects
description: Creating a new project, choosing the site and country, renaming, managing Google connections, and archiving and restoring a project.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

On this page you create a project, change its settings and, if needed, remove it. Every site is a project. Each project has its own Google connection, its own audits and its own reports.

## What is on the screen

**Proje seçici** (Project picker). Click the project name at the top left and your projects are listed. At the bottom are **Yeni proje** (New project) and **Projeleri yönet** (Manage projects). The gear icon next to it opens **Proje ayarları** (Project settings). When you have eight or more projects, a search box appears in the list.

**Projeler** (Projects) page. Each row shows the project's name and its site. A project with no site says "Site belirlenmemiş" (No site set). The open project carries the **Etkin** (Active) label. Click a row and that project's settings open. Archived projects sit at the bottom in the **Arşivlendi** (Archived) section. **Geri al** (Restore) brings them back.

**New project window.** It has four fields:

- **Ad** (Name): required. Only you see it. It appears in report titles and in the project picker. It does not go to Google.
- **Alan adı (isteğe bağlı)** (Domain (optional)): your site's address, like `example.com`. The `https://` and `www.` at the start are dropped automatically. Subdomains attach to the main domain: `blog.example.com` and `example.com` are the same project.
- **Ülke** (Country) and **Dil** (Language): they decide which market the keywords you save are tracked for. When you change the country, the language returns to that country's language. You can change them later.

**Project settings.** There are two tabs. The **Genel** (General) tab has the name, domain, country and language, plus the **Projeyi arşivle** (Archive project) section. The **Bağlantılar** (Connections) tab has the Search Console and Analytics cards.

## How to use it

1. In the project picker, click **Yeni proje**.
2. Type a name, enter your site's address, choose the country and language, and click **Proje oluştur** (Create project). The project opens and the Panel (Dashboard) comes up. No data is fetched yet.
3. Go to **Proje ayarları → Bağlantılar** (Project settings → Connections) and connect Search Console. The steps are in the guide for connecting to Google. Once it is connected, Panel, Arama performansı (Search performance), Fırsatlar (Opportunities) and Dizin durumu (Index status) start to fill in.
4. If you also want to connect Analytics, do it from the **Analytics** card on the same tab. You do not need a separate Google key.
5. To change the name or the site, correct the field on the **Genel** tab and click **Değişiklikleri kaydet** (Save changes). The button turns on only when something has changed.

### Changing the Google connection

On the card in the **Bağlantılar** tab, **Mülkü veya hesabı değiştir** (Change property or account) lets you choose another site (what Google calls a "property") or another Google account. **Bağlantıyı kes** (Disconnect) removes only this project's connection. Your Google account stays saved, and it does not ask for confirmation. To remove a Google account completely, use **Hesabı kaldır** (Remove account) in the selection window. The window tells you which projects will be affected.

### Archiving a project

Projects are not deleted, they are archived. The **Projeyi arşivle** button at the bottom of the **Genel** tab removes the project from the list. Audits, keywords and reports stay as they are. **Geri al** on the Projeler page brings it back exactly as it was. If you have only one project, you cannot archive it.

## How the numbers are calculated

There are no numbers on this screen. When a domain is saved, these rules apply: spaces and capital letters are cleaned up, and the address must be a real domain (an IP address, `localhost` or a made-up extension is not accepted). If the input is wrong, the warning "Geçerli bir alan adı girin, örneğin acme.com." (Enter a valid domain, for example acme.com.) appears.

## Frequently asked questions

**Can I delete a project completely?** No, you can only archive it. Its data stays, and you can restore it whenever you like.

**Can I connect two sites to one project?** No. A project has one Search Console property and one Analytics property. Open a second project for the second site.

**There is a project named "Default". What is it?** On first launch the app creates an empty project so that the screens can open. You can rename it and use it, or open a new project and archive that one.

**I chose the wrong country.** Change it on the General tab. From that moment, the rankings of the keywords you saved are tracked for the new country.

## Limits

There is no limit on the number of projects. Creating a project starts nothing. Data comes only once Google is connected. If you did not enter a domain, you type the address by hand when you start an audit.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
