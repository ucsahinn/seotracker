---
title: Projets
description: Vous créez un projet, choisissez le site et le pays, changez le nom et gérez la connexion à Google. Vous pouvez aussi archiver un projet et le restaurer.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Vous créez un projet, modifiez ses réglages et, si besoin, le retirez. Chaque site est un projet. Chaque projet a sa propre connexion à Google, ses propres audits et ses propres rapports.

## Ce que l'écran affiche

**Le sélecteur de projet.** Cliquez sur le nom du projet en haut à gauche : vos projets s'ouvrent. En bas se trouvent **Yeni proje** (Nouveau projet) et **Projeleri yönet** (Gérer les projets). L'icône d'engrenage à côté ouvre **Proje ayarları** (Paramètres du projet). Si vous avez huit projets ou plus, une zone de recherche apparaît dans la liste.

**La page Projeler (Projets).** Chaque ligne montre le nom du projet et son site. Un projet sans site indique « Site belirlenmemiş » (Aucun site défini). Le projet ouvert porte l'étiquette **Etkin** (Actif). Un clic sur la ligne ouvre les paramètres de ce projet. Les projets que vous avez archivés se trouvent tout en bas, dans la section **Arşivlendi** (Archivés). Cliquez sur **Geri al** (Restaurer) pour les remettre dans la liste.

**La fenêtre Nouveau projet.** Elle comporte quatre champs :

- **Ad** (Nom) est obligatoire. Vous seul le voyez : il apparaît dans le titre des rapports et dans le sélecteur de projet. Il n'est pas envoyé à Google.
- **Alan adı (isteğe bağlı)** (Nom de domaine, facultatif) est l'adresse de votre site, par exemple `example.com`. Le `https://` et le `www.` du début sont retirés automatiquement. Les sous-domaines sont rattachés au domaine principal : `blog.example.com` et `example.com` forment donc le même projet.
- **Ülke** (Pays) et **Dil** (Langue) déterminent pour quel marché les mots-clés que vous enregistrez sont suivis. Quand vous changez le pays, la langue revient à celle de ce pays. Vous pouvez changer les deux plus tard.

**Les paramètres du projet.** Il y a deux onglets. L'onglet **Genel** (Général) contient le nom, le nom de domaine, le pays, la langue et la section **Projeyi arşivle** (Archiver le projet). L'onglet **Bağlantılar** (Connexions) contient les cartes Search Console et Analytics.

## Comment l'utiliser

1. Dans le sélecteur de projet, cliquez sur **Yeni proje**.
2. Écrivez un nom, saisissez l'adresse de votre site, choisissez le pays et la langue, puis cliquez sur **Proje oluştur** (Créer le projet). Le projet s'ouvre et le Panel (Tableau de bord) apparaît. Aucune donnée n'est encore récupérée.
3. Passez à l'onglet **Proje ayarları → Bağlantılar** et connectez Search Console. Les étapes sont dans le guide de la connexion à Google. Une fois la connexion faite, Panel, Arama performansı (Performance de recherche), Fırsatlar (Opportunités) et Dizin durumu (État de l'index) commencent à se remplir.
4. Si vous voulez aussi connecter Analytics, utilisez la carte **Analytics** du même onglet. Aucune autre clé Google n'est nécessaire.
5. Pour changer le nom ou le site, corrigez le champ dans l'onglet **Genel** et cliquez sur **Değişiklikleri kaydet** (Enregistrer les modifications). Le bouton ne s'active que si quelque chose a changé.

### Changer la connexion à Google

Dans la carte de l'onglet **Bağlantılar**, cliquez sur **Mülkü veya hesabı değiştir** (Changer de propriété ou de compte). Vous pouvez choisir un autre site (ce que Google appelle une « propriété ») ou un autre compte Google. **Bağlantıyı kes** (Déconnecter) retire uniquement la connexion de ce projet. Votre compte Google reste enregistré, et aucune confirmation n'est demandée. Pour retirer complètement un compte Google, utilisez **Hesabı kaldır** (Retirer le compte) dans la fenêtre de sélection. La fenêtre vous dit quels projets seront touchés.

### Archiver un projet

Les projets ne sont pas supprimés, ils sont archivés. Le bouton **Projeyi arşivle** en bas de l'onglet **Genel** retire le projet de la liste. Les audits, les mots-clés et les rapports restent tels quels. **Geri al** dans la page Projeler remet le projet exactement comme il était. Si vous n'avez qu'un seul projet, vous ne pouvez pas l'archiver.

## Comment les chiffres sont calculés

Cet écran n'a pas de chiffres. Lors de l'enregistrement du nom de domaine, ces règles s'appliquent : les espaces et les majuscules sont nettoyés, et l'adresse doit être un vrai nom de domaine (une adresse IP, `localhost` ou une extension inventée ne sont pas acceptées). Si vous saisissez une valeur incorrecte, l'avertissement « Geçerli bir alan adı girin, örneğin acme.com. » (Saisissez un nom de domaine valide, par exemple acme.com.) apparaît.

## Questions fréquentes

**Puis-je supprimer complètement un projet ?** Non, vous ne pouvez que l'archiver. Ses données restent, et vous le restaurez quand vous voulez.

**Puis-je relier deux sites à un projet ?** Non. Un projet a une propriété Search Console et une propriété Analytics. Créez un second projet pour un second site.

**Il y a un projet nommé « Default ». Qu'est-ce que c'est ?** Au premier lancement, l'application crée un projet vide pour que les écrans puissent s'ouvrir. Vous pouvez le renommer et l'utiliser. Si vous préférez, créez un nouveau projet et archivez celui-là.

**J'ai choisi le mauvais pays.** Changez-le dans l'onglet Général. Les positions des mots-clés que vous avez enregistrés seront suivies pour le nouveau pays à partir de ce moment.

## Limites

Il n'y a pas de limite au nombre de projets. Créer un projet ne lance rien. Les données n'arrivent qu'une fois Google connecté. Si vous n'avez pas saisi de nom de domaine, vous écrivez l'adresse à la main au lancement d'un audit.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
