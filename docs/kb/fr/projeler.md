---
title: Projets
description: Projets aide à choisir un site et à compléter ses connexions. Chaque projet conserve ses propriétés Google, audits et rapports.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Un projet correspond à un site. L’écran **Projets** liste vos projets et indique, pour chacun, l’étape de configuration suivante.

## Lire la liste

Avec plusieurs projets, utilisez **Rechercher un projet** et triez par nom ou par domaine. Le badge **Ouvert récemment** désigne le projet que ce navigateur a ouvert en dernier ; il ne dit rien de son état SEO.

Le bouton principal de chaque carte dépend de la configuration : **Ajouter un site**, **Connecter Search Console** ou **Ouvrir le tableau de bord**. **Contexte du projet** ouvre les notes du projet, **Paramètres** ouvre sa configuration.

## Chiffres de recherche de la carte

La carte reprend l’archive locale des données Search Console : recherche Web, tous appareils et tous pays. La période s’arrête au dernier jour enregistré, qui peut dater de plusieurs jours ; les dates sont toujours affichées.

- Un jour absent de l’archive reste un trou, jamais un zéro. S’il manque des jours, les clics affichés ne sont que le sous-total des jours observés.
- Une évolution n’est calculée qu’entre deux périodes complètes. Deux totaux égaux sont signalés comme inchangés. Après une période à zéro, les deux valeurs sont affichées en clair plutôt qu’en pourcentage.
- Si la période précédente compte moins de 20 clics, le badge donne l’écart en clics. Passer de 1 à 5 clics s’affiche « +4 clics » : sur de si petits nombres, ce n’est pas la preuve d’une forte croissance.
- Les détails indiquent le dernier jour enregistré et l’heure de lecture. Les enregistrements anciens ne précisent pas si Google avait finalisé ces jours.

Les clics de recherche ne se comparent ni aux sessions GA4 ni à la somme des lignes par requête. Ne cumulez pas des chiffres de périodes différentes.

## Audit et connexions sur la carte

L’audit affiché est celui du domaine du projet. Le dernier audit terminé est présenté séparément d’une tentative plus récente, en cours ou échouée.

Une connexion enregistrée ne prouve pas que Google a répondu. Si une source n’a pas pu être lue, elle n’est ni déconnectée ni à zéro : réessayez. **Actualiser** relit les identités et les données locales ; il n’interroge pas Google et ne lance pas d’audit.

## Créer un projet

**Nouveau projet** demande un nom, un domaine (facultatif), un pays et une langue. La création ne collecte encore aucune donnée. Choisissez ensuite les propriétés dans **Paramètres du projet → Connexions** : une propriété Search Console et une propriété Analytics par projet. La section **Général** des paramètres modifie le nom, le domaine et le marché.

## Archiver et rétablir

**Archiver le projet** le retire de la liste sans supprimer ses données. Il apparaît sous **Archivé**, d’où **Rétablir** le remet en service. Le dernier projet actif ne peut pas être archivé.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
