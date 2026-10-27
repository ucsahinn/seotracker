---
title: Projets
description: Projets aide à choisir un site et à compléter ses connexions. Chaque projet conserve ses propriétés Google, audits et rapports.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Projets aide à choisir un site et à compléter ses connexions. Chaque projet conserve ses propriétés Google, audits et rapports.

## Lire l’écran

Avec plusieurs projets, recherchez et triez par nom ou domaine. **Dernier ouvert** désigne le projet mémorisé par ce navigateur, pas son état SEO. L’action principale propose d’ajouter un site, de connecter Search Console ou d’ouvrir le tableau de bord selon la configuration connue. Les informations du projet ouvrent les notes ; les paramètres ouvrent la configuration.

L’archive de recherche contient les données Web stockées localement, tous appareils et pays. Les dates sont visibles. La période se termine au dernier jour enregistré, parfois ancien. Si des jours manquent, les clics sont seulement le sous-total des jours observés. Un jour absent reste un trou, jamais zéro. La variation exige deux périodes complètes. Les totaux égaux sont indiqués sans changement ; depuis zéro, les nombres précédents et actuels sont explicites. Les détails montrent le dernier jour stocké et l’heure de lecture disponible. Les anciens enregistrements ne précisent pas la preuve de finalisation.

L’audit appartient à l’hôte du site choisi. Le dernier audit terminé reste distinct d’une tentative plus récente échouée ou en cours. Une connexion enregistrée ne prouve pas une lecture Google réussie. Une source illisible n’est ni déconnectée ni un zéro mesuré : réessayez. Actualiser relit identités et données locales sans appeler Google ni lancer un audit.

## Créer et gérer

Nouveau projet demande un nom, un domaine facultatif, un pays et une langue. La création ne collecte rien. Choisissez les propriétés Google dans Paramètres → Connexions. Les paramètres généraux modifient identité et marché. Chaque projet possède une propriété Search Console et une propriété Analytics.

Archiver conserve les données ; Restaurer les rend accessibles. Le dernier projet ne peut pas être archivé. Les clics de recherche diffèrent des sessions GA4 et des totaux par requête. Les périodes différentes ne sont pas additionnées.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
