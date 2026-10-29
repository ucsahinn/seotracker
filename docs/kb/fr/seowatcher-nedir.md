---
title: Qu’est-ce que seowatcher ?
description: seowatcher est une application SEO gratuite et open source qui réunit Search Console, GA4, audit de site et PageSpeed sur votre propre ordinateur.
kind: kavram
updated: 2026-10-29
---

seowatcher est une application SEO gratuite, open source et sous licence MIT, qui affiche Google Search Console, Google Analytics 4, son propre robot d’exploration et PageSpeed Insights dans un seul tableau de bord. Elle fonctionne sur votre ordinateur, pas dans le cloud : un seul fichier d’installation pour Windows 10 et 11, Docker sur Mac et Linux. Sur GitHub, elle s’appelle seotracker ; c’est la même application.

## En bref

| Question                | Réponse                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| Prix                    | Gratuit. Sans abonnement, sans compte, sans carte bancaire                                             |
| Licence                 | Open source MIT, tout le code est sur GitHub                                                           |
| Plateformes             | Fichier d’installation Windows 10/11 (64 bits) ; Docker sur Mac et Linux                               |
| Sources de données      | Google Search Console, Google Analytics 4, le robot d’exploration de l’application, PageSpeed Insights |
| Audit du site           | 202 règles                                                                                             |
| Connexion IA            | Assistants comme Claude Code, Codex, Cursor et Gemini CLI via MCP ; 6 tâches prêtes à l’emploi         |
| Langues de l’interface  | Turc, anglais, allemand, français, italien, portugais                                                  |
| Utilisateurs            | Un seul utilisateur, accessible uniquement depuis votre ordinateur                                     |
| Emplacement des données | `%LOCALAPPDATA%\seowatcher` sous Windows, le volume `seotracker_data` dans Docker                      |
| Version                 | 0.8.7 Alpha, 29 octobre 2026                                                                           |
| Taille                  | Fichier d’installation 86 Mo, 313 Mo une fois installé                                                 |
| Basé sur                | open-seo (every-app)                                                                                   |

## Que fait seowatcher ?

- **Performances de recherche :** clics, impressions, taux de clics et position moyenne issus de la Search Console, par requête, page, pays et appareil. Google fournit 16 mois d’historique ; tant que l’écran Performances de recherche ou Suivi des classements est ouvert, l’application le copie aussi dans sa propre archive.
- **Opportunités :** classe les pages que Google affiche déjà selon le plafond de clics supplémentaires calculé avec les taux de clics de votre propre site, et propose un travail pour chaque page.
- **Audit du site :** contrôle votre site selon 202 règles : liens cassés, titres absents ou trop longs, pages lentes, pages que Google n’indexe pas. Chaque constat indique quoi faire.
- **État de l’indexation :** lit la fiche que Google tient pour chacune de vos pages (indexée ou non, pourquoi, dernière exploration) via l’inspection d’URL. Google limite cela à 2 000 URL par propriété et par jour.
- **Analytics :** affiche les visites, l’engagement et les événements clés de GA4 à côté des données de recherche.
- **Rapports :** enregistre des rapports HTML en un seul fichier, à ouvrir sur un téléphone, imprimer ou envoyer par e-mail.
- **Assistant IA :** via MCP, votre assistant lit vos chiffres, lance l’audit et rédige le rapport.

## Que ne fait pas seowatcher ?

- Il n’estime pas de volume de recherche : les impressions affichées viennent de Google.
- Il ne compte pas les sites qui pointent vers vous (backlinks).
- Il ne suit pas le classement des concurrents ; il lit uniquement les sites que vous ajoutez comme projets.
- Ce n’est pas un service hébergé dans le cloud ; il n’y a ni compte d’équipe ni accès multi-utilisateur.
- Il n’existe pas encore d’application mobile séparée ni d’extension de navigateur.

## Quelle différence avec la Search Console ?

La Search Console fournit les chiffres ; seowatcher les lit et en tire une liste de travail. Il montre au même endroit la page à regarder en premier, ce qui ne va pas sur votre site selon 202 règles et ce qu’Analytics a mesuré. Comme il conserve une archive sur votre ordinateur, vous pouvez avec le temps remonter au-delà de la fenêtre de 16 mois de Google. Les chiffres viennent de la même source, mais Google les publie avec environ trois jours de retard et masque les requêtes très rares ; c’est pourquoi le total des pages et le total du site peuvent différer.

## Quelle différence avec les suites SEO payantes ?

Les suites SEO payantes vendent des estimations de volume de recherche, de backlinks et de classement des concurrents, tirées de leurs propres explorations et de données achetées. seowatcher ne fait rien de cela ; il utilise uniquement les données que Google vous donne déjà en tant que propriétaire du site, plus sa propre exploration. C’est pour cela qu’il est gratuit, et aussi pour cela qu’il n’est pas conçu pour les études de marché. Il convient si vous voulez suivre, corriger et présenter la place de votre propre site dans Google.

## Pour qui ?

Pour les propriétaires de sites, les équipes de contenu et les consultants SEO indépendants qui veulent voir au même endroit les données Search Console et GA4 de leurs sites ou de ceux de leurs clients. Chaque projet garde ses propres propriétés Google, audits et rapports.

## Questions fréquentes

### Est-ce vraiment gratuit ?

Oui. C’est un projet open source sous licence MIT. Les services Google utilisés restent dans leurs limites d’utilisation gratuites.

### Où sont stockées mes données ?

Sous Windows, dans le dossier `%LOCALAPPDATA%\seowatcher` : la base de données, votre clé d’accès Google et les journaux. La désinstallation ne touche pas à ce dossier. Dans Docker, les données sont dans le volume `seotracker_data`.

### À quoi l’application se connecte-t-elle ?

À Google (Search Console, Analytics, PageSpeed), au site que vous auditez et à GitHub pour vérifier les versions. Si vous connectez un assistant IA, les données qu’il lit peuvent partir chez le fournisseur de cet assistant ; cette connexion est facultative.

### Fonctionne-t-il sur Mac ou Linux ?

Oui, avec Docker. Sous Windows, l’installation en un seul fichier est plus simple.

### Pourquoi dois-je créer un identifiant Google Cloud ?

seowatcher n’est pas un service cloud ; il fonctionne sur votre ordinateur et se connecte directement à Google. Google exige de savoir à qui appartient l’application qui se connecte. Cette démarche ne se fait qu’une fois.

### Dois-je ouvrir l’application sur Internet ?

Non. L’application ne s’ouvre que depuis votre propre ordinateur.

## Par où commencer ?

1. [Installation sous Windows](/docs/kurulum-windows/) ou [installation avec Docker](/docs/kurulum-docker/).
2. [Connexion à Google](/docs/google-baglantisi/).
3. Si vous le souhaitez, la [clé PageSpeed](/docs/pagespeed-anahtari/) et la [configuration de l’agent](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
