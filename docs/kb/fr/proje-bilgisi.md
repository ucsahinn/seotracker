---
title: Infos du projet
description: Les informations du projet sont des notes locales utilisables par vous et votre assistant connecté. Un texte rempli n’est pas vérifié ; tous les assistants ne le lisent pas automatiquement.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Les informations du projet sont des notes locales utilisables par vous et votre assistant connecté. Un texte rempli n’est pas vérifié ; tous les assistants ne le lisent pas automatiquement.

## Commencer par l’objectif

Le haut de page montre les sections principales remplies et l’objectif enregistré. Ouvrez la première section vide ou utilisez le sélecteur. Présentation de l’activité, objectif actuel, positionnement et préférences rédactionnelles acceptent chacun 4 000 caractères. L’auteur et la date absolue figurent sur chaque section. Enregistrer ne transmet que les sections principales modifiées.

Concurrents et pages importantes sont des listes facultatives, pas des mesures de classement ou de conversion. Chaque liste accepte 100 entrées. Domaine/nom/note : 255/120/500 caractères ; adresse/sujet/note : 2 048/200/500. Les rôles sont vos étiquettes. Les assistants créent les sections personnalisées ; vous pouvez les modifier ou supprimer. Limites : 20 sections, titre de 120 caractères, contenu de 4 000.

## Enregistrer et actualiser

Actualiser relit notes et configuration. Une erreur en arrière-plan conserve les informations enregistrées et les brouillons avec un avertissement. Quitter avec des modifications principales ou intégrées non enregistrées déclenche un avertissement. Le serveur n’empêche pas encore l’écrasement d’une même section modifiée simultanément : comparez le texte récent avant d’enregistrer.

Le modèle destiné à l’assistant lui demande votre accord avant d’écrire. Les outils de l’application peuvent écrire immédiatement, sans accord supplémentaire imposé. Sans identité de projet résolue, le modèle reste indisponible.

Le journal de recherche affiche au maximum les 20 dernières notes de 1 000 caractères. La date suit le jour UTC du serveur. Le nettoyage au-delà de 90 jours se fait lors d’un nouvel ajout ; de vieilles notes peuvent donc rester. La liste n’est pas un historique complet.

Sources et configuration compte six signaux communs et distingue absence et lecture impossible. Les listes facultatives sont exclues. Une connexion n’est pas un test en direct, une clé PageSpeed ne garantit pas le quota, un appel d’outil de cette installation ne prouve pas la lecture de ce projet. Ce n’est pas une note SEO.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
