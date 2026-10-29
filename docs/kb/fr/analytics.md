---
title: Comprendre les données Analytics
description: Analytics présente les visites, l’engagement et les événements clés mesurés dans votre propriété GA4.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-28
---

Le sélecteur de rapport, en haut de l’écran, donne accès à huit vues :

| Rapport                   | Contenu                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| **Pages de destination**  | Pages où commencent les visites : sessions, engagement, conversions.    |
| **Pages et écrans**       | Vues et temps passé sur chaque page.                                    |
| **Acquisition du trafic** | Provenance des visiteurs.                                               |
| **Événements clés**       | Événements comptés comme conversions et nombre de personnes concernées. |
| **E-commerce**            | Produits et revenus, si la propriété mesure l’e-commerce.               |
| **Recherche sur le site** | Ce que les visiteurs recherchent sur votre site.                        |
| **Audience**              | Appareils, pays, nouveaux visiteurs et visiteurs connus.                |
| **État des mesures**      | Lacunes dans les paramètres d’administration GA4.                       |

## Périmètre : quel trafic, quel site

Le canal par défaut est **Recherche organique**, qui inclut les moteurs de recherche autres que Google. **Tout le trafic** modifie à la fois la synthèse du haut et le rapport. Le rapport **Recherche sur le site** n’a pas de sélecteur de canal : il montre toujours les événements de résultats de recherche de tout le trafic.

Les chiffres couvrent toute la propriété GA4 : tous les noms d’hôte et tous les flux de données. Si une application mobile ou un autre site envoie des données à la même propriété, les totaux ne concernent pas seulement le site du projet.

## Période

**7 derniers jours**, **28 derniers jours** et **3 derniers mois** se terminent hier, dans le fuseau horaire de la propriété. Hier est un jour calendaire terminé, mais Google peut encore retraiter ses données. L’écran indique les dates réelles de début et de fin, la période précédente de même durée utilisée pour la comparaison et le fuseau horaire.

Un lien peut transmettre `startDate` et `endDate`, toujours ensemble. Une date de fin égale ou postérieure à aujourd’hui est ramenée à hier, et l’écran le signale.

GA4 et Search Console n’utilisent ni le même calendrier ni les mêmes mesures : des dates identiques ne garantissent pas le même intervalle de temps.

## Lire la synthèse

La synthèse du haut donne, pour le périmètre choisi, les sessions, le taux d’engagement, les événements clés et le revenu des achats.

- Un nombre d’événements clés n’est pas un nombre de clients uniques.
- Zéro événement clé peut aussi signifier qu’aucun objectif n’est défini.
- Un revenu nul ne prouve pas que le site n’est pas une boutique.
- Si la devise est inconnue, « (devise inconnue) » suit le montant.
- La durée d’engagement est un total, pas une moyenne par utilisateur.

La section dépliable **Valeurs quotidiennes** distingue les jours inconnus des jours à zéro. En cas d’échantillonnage, de seuil de confidentialité ou de restriction d’accès, les comparaisons de périodes et les recommandations affirmatives sont masquées.

Avec peu de sessions, une seule visite fait nettement varier les taux. Une variation en pourcentage ne prouve à elle seule ni réussite ni perte.

## Tableau, filtres et pagination

Le tableau affiche 50, 100 ou 200 lignes par page ; **Page précédente** et **Page suivante** donnent accès aux autres. Filtres, tri, synthèses et exports ne portent que sur les lignes de la page affichée. Cliquer sur une barre restreint le tableau à ces lignes, sans changer la synthèse du haut.

- Un utilisateur peut figurer dans plusieurs catégories : n’additionnez pas les lignes pour obtenir un nombre d’utilisateurs uniques.
- Un même chemin sur deux noms d’hôte différents donne deux lignes. Deux produits homonymes restent aussi distincts.
- Aucun graphique de répartition n’est tracé pour un revenu négatif ou inconnu.

Le filtre des **pages à fort trafic et faible conversion** est une piste d’analyse, pas une estimation de ventes perdues. Il se fonde sur la médiane d’au moins quatre lignes comptant chacune 30 sessions ou plus. De même, un terme souvent recherché sur le site ne prouve pas à lui seul qu’un contenu manque.

## Groupe d’adresses venu d’Opportunités

Depuis l’écran Opportunités, un lien ouvre Analytics sur un **Groupe d’adresses Analytics**, avec les dates de la source. Ce filtre s’exécute sur le serveur : il lit chez Google toutes les lignes de pages de destination organiques, isole le groupe, puis pagine le résultat.

Les variantes d’une adresse qui ne diffèrent que par les paramètres de requête ou la barre oblique finale sont regroupées. Les noms d’hôte différents et les chemins dont la casse diffère restent séparés. Si une limite de source ou de qualité empêche de vérifier tout le groupe, l’écran le signale ; un résultat vide ne prouve pas que le groupe n’a reçu aucun trafic. Pendant ce temps, la synthèse du haut porte toujours sur toute la propriété.

**Retirer le filtre de groupe d’adresses** supprime le filtre. La barre d’adresse, le bouton Retour et les exports conservent le périmètre du groupe.

## Résultats vides ou incertains

Si le rapport organique est vide, deux sorties sont proposées : **Afficher tout le trafic** élargit le périmètre, **État des mesures** montre les paramètres. Connecter Analytics récemment ne modifie pas les données passées.

Si une mesure n’a pas pu être lue, l’écran n’en conclut pas que la période est vide : il indique « Le trafic de cette période n’a pas pu être déterminé » et garde les chiffres lisibles. Si Google a donné la raison d’une restriction, elle figure à côté de la mesure concernée ; sinon, l’écran le précise. Il propose alors **Réessayer** ou un contrôle des mesures, jamais un changement de canal.

Si Google a tronqué les données de la période, la raison et les dates fournies par Google figurent dans la synthèse et dans les détails du rapport. Le rapport est alors considéré comme limité et n’est pas présenté comme une comparaison fiable des périodes.

Les notes de périmètre et de traitement des données sont regroupées dans **Détails des données** ; les explications générales dans **Comprendre les données Analytics**.

## État des mesures

**État des mesures** lit uniquement les paramètres d’administration GA4 et ne modifie rien dans le compte. Le résultat « Aucune lacune trouvée dans les paramètres contrôlés » ne prouve pas que la balise du site envoie réellement des données ; suivez pour cela le lien **Vérifier la collecte de données de la balise**.

Si l’inventaire n’a été lu qu’en partie, les nombres sont précédés de **Min.** Si l’interrupteur principal **Mesures améliorées** est désactivé, le nombre d’événements automatiques actifs s’affiche à zéro.

## Barre d’adresse et exports

Le rapport, le canal, les dates, la ventilation, le nombre de lignes et le numéro de page sont enregistrés dans la barre d’adresse : partager le lien ouvre la même vue. Les filtres `host` et `path` d’un lien sont exacts, ne s’appliquent qu’aux lignes affichées et ne fusionnent pas les variantes d’adresse.

**CSV** et **Exporter vers Google Sheets** exportent les lignes filtrées à l’écran, avec les nombres bruts. La colonne `ga4_scope_json` décrit la source, la propriété, les dates, le fuseau horaire, la devise, la qualité des données, la page et les filtres.

## Quota

Les valeurs de la section dépliable **Quotas et limites** sont un instantané de la dernière réponse de rapport, pas un total de la période choisie. Le plafond standard du compte est une hypothèse. **Actualiser** redemande à Google les rapports visibles, et chaque requête consomme du quota.
