---
title: Projets
description: Vous créez un projet, choisissez le site et le pays, changez le nom et gérez la connexion à Google. Vous pouvez aussi archiver un projet et le restaurer.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Vous créez un projet, modifiez ses réglages et, si besoin, le retirez. Chaque site est un projet. Chaque projet a sa propre connexion à Google, ses propres audits et ses propres rapports.

## Ce que l'écran affiche

**Le sélecteur de projet.** Cliquez sur le nom du projet en haut à gauche : vos projets s'ouvrent. En bas se trouvent **Nouveau projet** et **Gérer les projets**. L'icône d'engrenage à côté ouvre **Paramètres du projet**. Si vous avez huit projets ou plus, une zone de recherche apparaît dans la liste.

**La page Projets.** Chaque ligne montre le nom du projet et son site. Un projet sans site indique « Aucun site ajouté ». Si vous avez plusieurs projets, celui qui est ouvert porte l'étiquette **Actif**. Sous chaque ligne figure un court résumé du projet : les clics des 28 derniers jours et l'évolution par rapport aux 28 précédents (avec une petite courbe), le moment du dernier audit (« Dernier audit il y a 3 jours » ou « Aucun audit pour l'instant ») et si Search Console et Analytics sont connectés. Un point plein veut dire connecté, un point vide non connecté. Le nombre de clics vient de l'archive de cet ordinateur. Si l'archive n'a pas de données de recherche, il est écrit « Aucune donnée de recherche dans l'archive ». En survolant le chiffre, vous voyez les dates qu'il couvre. Un clic sur la ligne ouvre le projet. Le bouton **Paramètres** à droite ouvre les paramètres du projet. Pour un projet sans site, ce bouton indique **Ajouter un site**. Les projets que vous avez archivés se trouvent tout en bas, dans la section **Archivé**. Cliquez sur **Rétablir** pour les remettre dans la liste.

**La fenêtre Nouveau projet.** Elle comporte quatre champs :

- **Nom** est obligatoire. Vous seul le voyez : il apparaît dans le titre des rapports et dans le sélecteur de projet. Il n'est pas envoyé à Google.
- **Nom de domaine, facultatif** est l'adresse de votre site, par exemple `example.com`. Le `https://` et le `www.` du début sont retirés automatiquement. Les sous-domaines sont rattachés au domaine principal : `blog.example.com` et `example.com` forment donc le même projet.
- **Pays** et **Langue** déterminent pour quel marché les mots-clés que vous enregistrez sont suivis. Quand vous changez le pays, la langue revient à celle de ce pays. Vous pouvez changer les deux plus tard.

**Les paramètres du projet.** Il y a deux onglets. L'onglet **Général** contient le nom, le nom de domaine, le pays, la langue et la section **Archiver le projet**. L'onglet **Connexions** contient les cartes Search Console et Analytics.

## Comment l'utiliser

1. Dans le sélecteur de projet, cliquez sur **Nouveau projet**.
2. Écrivez un nom, saisissez l'adresse de votre site, choisissez le pays et la langue, puis cliquez sur **Créer un projet**. Le projet s'ouvre et le Panel (Tableau de bord) apparaît. Aucune donnée n'est encore récupérée.
3. Passez à l'onglet **Paramètres du projet → Connexions** et connectez Search Console. Les étapes sont dans le guide de la connexion à Google. Une fois la connexion faite, Panel, Performances de recherche, Opportunités et État de l'indexation commencent à se remplir.
4. Si vous voulez aussi connecter Analytics, utilisez la carte **Analytics** du même onglet. Aucune autre clé Google n'est nécessaire.
5. Pour changer le nom ou le site, corrigez le champ dans l'onglet **Général** et cliquez sur **Enregistrer les modifications**. Le bouton ne s'active que si quelque chose a changé.

### Changer la connexion à Google

Dans la carte de l'onglet **Connexions**, cliquez sur **Modifier la propriété ou le compte**. Vous pouvez choisir un autre site (ce que Google appelle une « propriété ») ou un autre compte Google. **Déconnecter** retire uniquement la connexion de ce projet. Votre compte Google reste enregistré, et aucune confirmation n'est demandée. Pour retirer complètement un compte Google, utilisez **Supprimer le compte** dans la fenêtre de sélection. La fenêtre vous dit quels projets seront touchés.

### Archiver un projet

Les projets ne sont pas supprimés, ils sont archivés. Le bouton **Archiver le projet** en bas de l'onglet **Général** retire le projet de la liste. Les audits, les mots-clés et les rapports restent tels quels. **Rétablir** dans la page Projeler remet le projet exactement comme il était. Si vous n'avez qu'un seul projet, vous ne pouvez pas l'archiver.

## Règles du nom de domaine

Cet écran n'a pas de chiffres. À l'enregistrement du nom de domaine, ces règles s'appliquent : les espaces et les majuscules sont nettoyés, et l'adresse doit être un vrai nom de domaine (une adresse IP, `localhost` ou une extension inventée ne sont pas acceptées). Si vous saisissez une valeur incorrecte, l'avertissement « Saisissez un domaine valide, par exemple acme.com. » apparaît.

## Questions fréquentes

**Puis-je supprimer complètement un projet ?** Non, vous ne pouvez que l'archiver. Ses données restent, et vous le restaurez quand vous voulez.

**Puis-je relier deux sites à un projet ?** Non. Un projet a une propriété Search Console et une propriété Analytics. Créez un second projet pour un second site.

**Il y a un projet nommé « Default ». Qu'est-ce que c'est ?** Au premier lancement, l'application crée un projet vide pour que les écrans puissent s'ouvrir. Vous pouvez le renommer et l'utiliser. Si vous préférez, créez un nouveau projet et archivez celui-là.

**J'ai choisi le mauvais pays.** Changez-le dans l'onglet Général. Les positions des mots-clés que vous avez enregistrés seront suivies pour le nouveau pays à partir de ce moment.

## Limites

Il n'y a pas de limite au nombre de projets. Créer un projet ne lance rien. Les données n'arrivent qu'une fois Google connecté. Si vous n'avez pas saisi de nom de domaine, vous écrivez l'adresse à la main au lancement d'un audit.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
