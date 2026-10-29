---
title: Tableau de bord
description: Le tableau de bord résume un projet : trafic de recherche, étapes suivantes étayées, dernier audit du site et trafic organique Analytics.
screen: Panel
route: /p/<proje>
updated: 2026-10-28
---

Le tableau de bord est le premier écran d’un projet. Chaque carte indique sa source et sa période, et renvoie à l’écran qui donne le détail.

## Actualiser et heure des données

**Actualiser** relit les sources connectées, l’état de la configuration et les réglages Google. Si une lecture échoue, un avertissement d’actualisation partielle remplace la confirmation et les données en cache restent affichées.

« Données reçues » indique l’heure à laquelle les données sont arrivées dans l’application, pas le dernier jour mesuré par la source. Ce jour figure dans la période de chaque carte.

## Résumé de recherche

Le résumé couvre les 28 derniers jours de Search Console : recherche Web, tous appareils, tous pays. Les dates suivent l’heure du Pacifique, celle de Google.

Les derniers jours que Google n’a pas encore finalisés n’entrent pas dans les totaux. La ligne **Périmètre des données Search Console** indique les jours en **Données définitives**, ceux en **Données provisoires** et le nombre de jours exclus. Si Google ne fournit pas de date de complétude, la ligne l’indique : « Google n’a pas indiqué de date de complétude ; les jours récents sont exclus. »

Les quatre indicateurs :

- **Clics** : clics depuis la recherche Google vers votre site.
- **Impressions** : nombre d’affichages de votre site dans les résultats Google.
- **CTR** : part des impressions qui ont donné un clic.
- **Position moyenne** : moyenne pondérée par les impressions. Plus elle est basse, mieux c’est.

Chaque indicateur ouvre **Performances de recherche** avec le même périmètre. L’évolution se calcule par rapport à la période précédente de même durée :

- si la période précédente est à zéro, la hausse s’affiche en valeur absolue plutôt qu’en pourcentage ;
- sans période précédente, l’indicateur affiche **Sans comparaison**.

Google masque certaines requêtes pour protéger la vie privée ; quand la liste atteint la limite de lignes, la carte le signale aussi.

**Tendance des clics** trace les clics quotidiens. La ligne pâle représente la période précédente.

## Étapes suivantes

Cette carte propose au plus trois tâches, chacune fondée sur une preuve mesurée : un problème de connexion, des constats d’audit, des tâches de recherche issues de Search Console ou un audit trop ancien. Une connexion configurée ne suffit pas à créer une tâche. « Aucune tâche prioritaire dans le périmètre mesuré. » ne vaut que pour les sources mesurées : un problème non mesuré peut exister.

Le compteur du titre, par exemple **Configuration 4 / 6**, reprend les six étapes de l’écran Contexte du projet. Les étapes manquantes et illisibles sont présentées séparément. Un audit devient ancien exactement sept jours après son lancement ; la carte propose alors **Actualiser l’audit**.

En bas, **Préférences de configuration** est une liste facultative, repliée par défaut ; ce n’est pas une seconde note. Les étapes reportées avec **Passer pour l’instant** restent récupérables.

## Requêtes pouvant gagner une tranche de positions

Cette carte retient les requêtes qui ont assez d’impressions et dont la position moyenne arrondie se situe entre 4 et 20. Elle affiche les quatre meilleures, mais compte toutes les requêtes admissibles.

L’estimation est un plafond : les clics supplémentaires que la requête pourrait gagner en montant d’une tranche de positions. Ce n’est pas du trafic mesuré. Si aucune estimation n’est calculable, la carte n’affiche pas zéro. Elle précise aussi si les requêtes de marque ont été séparées.

N’additionnez pas cette estimation au total de l’écran **Opportunités**, qui calcule par page et sur une autre période.

## Carte Audit du site

Le tableau de bord ne retient que les audits du domaine du projet ; un audit plus récent d’un autre site est ignoré. Si le projet n’a pas de domaine, la carte renvoie aux paramètres du projet.

La carte indique l’adresse de départ du dernier audit terminé, sa date, les contrôles mesurés et l’éventuelle limite de pages. Une tentative en cours ou échouée est présentée à part.

La carte affiche trois nombres différents, à ne pas additionner :

- le nombre de pages touchées ;
- le nombre de types de contrôles en échec ;
- les couples page–contrôle par gravité : une page qui échoue à trois contrôles compte pour trois couples.

Les notes d’information restent hors de la barre des problèmes critiques et des avertissements. La phrase d’appréciation ne porte que sur le périmètre exploré : une exploration arrêtée par la limite de pages ou mesurée en partie ne permet pas de juger tout le site.

**Nouveau lors du dernier audit** et **Corrigé** n’apparaissent que si deux audits sont comparables : même adresse de départ, mêmes réglages, ensembles de pages compatibles. Seuls les contrôles mesurés dans les deux audits sont comparés, et une exploration plus restreinte ou illisible ne compte pas comme une correction. Si la comparaison est impossible, la carte en donne la raison. Un clic sur une page ouvre les problèmes de ce même audit pour cette page.

## Trafic organique

Cette carte vient de Google Analytics : sessions organiques, utilisateurs actifs, taux d’engagement et événements clés. Les dates réelles et le fuseau horaire de la propriété y figurent.

Une session n’est pas un clic Search Console : le trafic organique d’Analytics inclut aussi les autres moteurs de recherche.

Une mesure restreinte ou inconnue ne signifie jamais zéro trafic ; les autres mesures lisibles restent affichées. La carte explique l’échantillonnage, les seuils de confidentialité et les restrictions d’accès, et masque alors les comparaisons peu fiables.

**Revenus organiques** et **Transactions** s’affichent si des ventes réelles ont été mesurées dans l’une des deux périodes. Sans aucune vente, la carte indique que le suivi des ventes n’est pas confirmé. Si la devise est inconnue, le montant n’est pas présenté comme une somme d’argent. Si les sessions sont inconnues, vérifiez les avertissements de source de l’écran Analytics, les droits d’accès et la balise Analytics du site.

## Interpréter peu de données

Si la période de comparaison compte peu de clics, le résumé donne d’abord les clics et impressions réels, avant tout pourcentage. Sur de petits volumes, pourcentages et moyennes ne prouvent à eux seuls ni croissance ni perte.

Une liste de requêtes vide ne signifie pas qu’aucune requête ne se trouve entre les positions 4 et 20 : le seuil d’impressions s’adapte à la période et les requêtes de marque sont exclues.

## Ce que le tableau de bord ne montre pas

Ni volume de recherche, ni backlinks, ni classement des concurrents : seowatcher ne dispose pas de ces données. Pour comparer un chiffre avec l’interface de Google, choisissez la même période et les mêmes filtres.

<!-- Sources: src/client/features/dashboard/; src/shared/projectSetup.ts; src/shared/panelAudit.ts -->
