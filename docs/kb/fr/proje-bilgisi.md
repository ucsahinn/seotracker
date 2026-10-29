---
title: Contexte du projet
description: Conserver les objectifs et les notes du projet en local pour vous et votre assistant connecté. Comprendre leur portée et leurs limites.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Le contexte du projet rassemble vos notes sur un site : activité, objectif, positionnement, consignes de rédaction. L’application les stocke sur cet ordinateur sans les vérifier. Un assistant connecté peut les lire et les modifier via MCP, mais seulement s’il appelle l’outil prévu à cet effet.

## Sections et limites

Les quatre sections principales sont **Présentation de l’activité**, **Objectif actuel**, **Positionnement** et **Préférences de rédaction**. Chacune accepte 4 000 caractères et indique l’auteur et la date de la dernière modification. Le haut de page montre les sections remplies et l’objectif enregistré. **Remplir la première section vide** et le sélecteur de section vous y conduisent. **Enregistrer les modifications** n’envoie que les sections principales modifiées.

**Concurrents** et **Pages clés** sont des listes facultatives que vous tenez vous-même. Elles ne mesurent ni classement ni conversion.

| Liste                   | Entrées | Limites des champs                             |
| ----------------------- | ------- | ---------------------------------------------- |
| Concurrents             | 100     | Domaine 255, nom 120, notes 500 caractères     |
| Pages clés              | 100     | Adresse 2 048, sujet 200, notes 500 caractères |
| Sections personnalisées | 20      | Titre 120, contenu 4 000 caractères            |

Le rôle d’une page clé est une étiquette pour votre propre usage. Les sections personnalisées sont créées par un assistant ; vous pouvez les modifier ou les supprimer.

## Travailler avec un assistant

**Préparer un brouillon avec l’agent** fournit une invite à copier. Elle demande à l’assistant d’obtenir votre accord avant d’enregistrer. Cet accord ne figure que dans l’invite : les outils de l’application écrivent dès qu’ils sont appelés. L’invite devient disponible une fois l’identité du projet chargée.

Si une section change ailleurs pendant que vous la modifiez, par exemple parce qu’un assistant l’a enregistrée, l’application refuse tout votre enregistrement et conserve votre brouillon. Elle affiche alors le **Texte au début de la modification**, le **Dernier texte enregistré** et votre brouillon. Fusionnez-les, puis enregistrez de nouveau. Les assistants bénéficient de la même protection en envoyant `expectedContent` ; les anciens clients qui ne l’envoient pas fonctionnent toujours.

## Journal de recherche

Le **Journal de recherche** affiche les 20 notes les plus récentes des 90 derniers jours. Chaque note compte 1 000 caractères au plus et porte la date du jour UTC du serveur. Les notes plus anciennes sortent de la vue, même sans nouvel ajout, et un message signale les notes de la période qui ne sont pas affichées. Le journal montre l’activité récente ; ce n’est pas un historique complet.

## Source et installation

**Source et installation** compte six signaux de configuration communs à tout le projet. Il distingue un signal absent d’un signal illisible et ignore les listes facultatives. Ce n’est pas une note SEO : une connexion enregistrée ne prouve pas que Google répond, une clé PageSpeed ne garantit pas le quota, et un appel d’outil enregistré ne prouve pas que l’assistant a lu ce projet.

**Actualiser** relit les notes et la configuration. Si une lecture en arrière-plan échoue, l’écran conserve les informations enregistrées et vos brouillons, avec un avertissement. Si vous quittez la page avec des modifications non enregistrées, l’application demande confirmation.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
