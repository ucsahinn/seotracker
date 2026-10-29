---
title: État de l’indexation
description: Google a-t-il indexé chacune de vos pages, sinon pourquoi, et quand l’a-t-il explorée pour la dernière fois ? Jusqu’à 2 000 pages vérifiées par jour.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

L’audit du site dit si une page s’ouvre. Il ne dit pas si Google l’a réellement ajoutée à son index, la liste des pages qu’il peut afficher dans la recherche. L’onglet **État de l’indexation** de l’audit pose cette question à Google et conserve la réponse sur cet ordinateur.

Les réponses récentes ne sont pas redemandées. C’est important : Google accorde 2 000 vérifications par jour et par propriété (l’enregistrement de votre site dans Search Console), et l’application comme votre assistant puisent dans ce même quota.

## Ce que l’écran affiche

**L’anneau « Qu’a fait Google avec ces pages ? ».** Les pages explorées sont réparties en trois groupes :

- **Sur Google** : la page peut apparaître dans la recherche.
- **Non indexé** : Google a examiné la page sans l’ajouter à l’index.
- **En attente d’une réponse** : la page n’a pas encore été vérifiée, ou aucune réponse n’a pu être obtenue.

**Encadrés de synthèse.** Ils indiquent combien de pages ont été vérifiées, combien sont indexées, combien ne le sont pas et combien attendent. L’encadré **Pages pour lesquelles Google a choisi une autre URL canonique** compte les pages pour lesquelles Google a retenu une autre adresse principale que celle déclarée par votre balise canonical. L’encadré **Pas encore vérifié** compte les pages qui attendent leur vérification.

**Bouton « Vérifier l’état sur Google ».** Chaque clic vérifie 25 pages au plus : d’abord celles qui n’ont jamais été vérifiées, puis celles dont la réponse est la plus en retard sur son délai de renouvellement. Une fois la limite quotidienne atteinte, le message « La limite quotidienne de 2 000 URL de Google est épuisée » s’affiche. Le bouton est désactivé si Search Console n’est pas connecté, ou si le domaine audité n’appartient pas à la propriété connectée.

**Tableau.** Les colonnes sont **Page**, **État**, **Raison**, **URL canonique sélectionnée par Google** et **Dernière exploration par Google**. L’état vaut « Sur Google », « Non vérifié », « Aucune réponse », « Erreur » ou l’un des 18 états documentés par Google, traduits dans la langue de l’interface. Par exemple :

- « Détectée, actuellement non indexée »
- « Exclue par la balise « noindex » »
- « Bloquée par robots.txt »
- « Soft 404 »
- « Google ne connaît pas cette URL »

Le tableau se télécharge au format CSV.

## Comment l’utiliser

1. Une fois l’audit terminé, ouvrez l’onglet. Si le nombre de pages **En attente d’une réponse** est élevé, cliquez sur **Vérifier l’état sur Google**. Chaque clic avance de 25 pages ; sur un petit site, quelques clics suffisent.
2. Commencez par le groupe **Non indexé**. La colonne **Raison** donne l’explication de Google, qui indique le plus souvent quoi faire. « Bloquée par robots.txt » : levez le blocage. « Exclue par la balise « noindex » » : retirez la balise. « Détectée, actuellement non indexée » : il suffit généralement d’attendre.
3. Ajoutez au sitemap (plan du site) les pages importantes marquées « Google ne connaît pas cette URL », puis soumettez-le dans Search Console. Pour quelques pages essentielles, utilisez aussi « Demander l’indexation » dans Search Console.
4. Si l’encadré des URL canoniques n’est pas à zéro, consultez la colonne **URL canonique sélectionnée par Google** : Google n’a pas retenu l’adresse principale que vous avez déclarée. Corrigez votre déclaration, ou faites de l’adresse choisie par Google votre adresse principale.
5. Revenez quelques jours plus tard et cliquez de nouveau. Seules les réponses devenues anciennes sont redemandées, sans gaspiller de quota.

## Comment les chiffres sont calculés

Une page que Google déclare indexée compte dans **Sur Google**. Toute autre réponse de Google la place dans **Non indexé**. Sans réponse exploitable, la page reste **En attente d’une réponse**.

Une réponse devient ancienne après un délai, puis elle est redemandée : 14 jours pour une page indexée, 3 jours pour une page non indexée ou une erreur. Une page jamais vérifiée passe toujours en premier. La limite quotidienne se calcule sur les vérifications des 24 dernières heures. L’application ne compte que ses propres vérifications : celles que vous faites à la main dans Search Console n’entrent pas dans ce compteur, mais elles comptent dans la limite réelle de Google.

Il y a décalage d’URL canonique quand l’adresse choisie par Google diffère de celle que vous avez déclarée. Une simple différence de barre oblique finale compte aussi.

Si la dernière exploration de Google date de plus de 90 jours, l’audit signale le problème « Google n’a pas exploré cette page depuis longtemps ». Les réponses trop anciennes sont regroupées dans un seul problème : « Les réponses de Google pour certaines pages sont obsolètes ».

## Questions fréquentes

**Pourquoi le bouton est-il désactivé ?** Trois raisons possibles : Search Console n’est pas connecté, aucune page n’est à vérifier, ou le domaine audité n’appartient pas à la propriété connectée, par exemple parce que vous avez audité un autre site.

**À qui s’applique la limite de 2 000 ?** À la propriété. Deux projets rattachés à la même propriété et votre assistant partagent le même quota.

**Que faire pour une page « Détectée, actuellement non indexée » ?** Le plus souvent, rien. Sur un site récent, Google peut faire attendre plusieurs semaines. Un lien depuis des pages que Google explore souvent accélère les choses.

**Cet onglet signale-t-il de nouvelles pages à Google ?** Non, il se contente d’interroger Google. Pour signaler des pages, utilisez le sitemap et « Demander l’indexation » dans Search Console.

## Limites

Les réponses sont celles de Google, sans interprétation ; Google peut laisser certains champs vides. Au rythme de 2 000 vérifications par jour, un site de 10 000 pages demande cinq jours. L’onglet ne vérifie que les pages explorées par l’audit : les adresses qui n’en font pas partie n’apparaissent pas dans la liste.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
