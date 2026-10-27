---
title: Analytics
description: Analytics présente les visites, l’engagement et les événements clés mesurés dans votre propriété GA4.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

Les liens depuis Opportunités ouvrent le même groupe d’adresses normalisées et les dates sources via `pageGroup`. Le serveur filtre les mêmes 1 000 lignes de pages de destination organiques au maximum avant la pagination de 50/100/200 lignes. Les paramètres de requête et barres obliques finales partagent un groupe ; les hôtes différents et chemins sensibles à la casse restent séparés. Une limite de source ou de qualité empêche de confirmer le groupe complet et est signalée. Un résultat vide ne prouve pas l’absence de trafic. La synthèse conserve la portée de la propriété. Le filtre peut être retiré ; l’URL, le retour arrière et les exports préservent sa portée.

Analytics présente les visites, l’engagement et les événements clés mesurés dans votre propriété GA4. Le sélecteur propose les pages de destination, les pages, l’acquisition, les événements clés, l’e-commerce, la recherche interne, l’audience et les paramètres de mesure.

## Lire le périmètre

La recherche naturelle inclut les moteurs autres que Google. Tout le trafic modifie ensemble la synthèse et le rapport. La recherche interne couvre toujours les événements de résultats mesurés sur tous les canaux, sans sélecteur de canal. Tous les hôtes et flux de la propriété sont inclus. D’autres sites ou applications peuvent contribuer aux totaux.

Les périodes de 7, 28 et 90 jours se terminent hier dans le fuseau de la propriété. Hier est un jour calendaire écoulé, sans garantie de données définitives. Les jours récents peuvent être retraités. Les dates courantes, la période précédente de même durée et le fuseau sont affichés. Les liens acceptent startDate/endDate ensemble ; une fin future est ramenée à hier avec un avertissement. GA4 et Search Console utilisent des calendriers et mesures différents. Des dates identiques ne garantissent pas le même intervalle temporel.

## Examiner résultats et lignes

La synthèse suit le périmètre choisi : sessions, taux d’engagement, événements clés et revenu d’achat. Les événements clés ne sont pas des clients uniques. Un revenu nul ne prouve pas l’absence de boutique. Une devise inconnue est signalée à côté du montant. La durée d’engagement est totale, pas une moyenne par utilisateur. Les valeurs quotidiennes distinguent les jours inconnus de zéro. Les restrictions de qualité empêchent les comparaisons ou conseils affirmatifs.

Choisissez 50, 100 ou 200 lignes par page et utilisez Précédent/Suivant. Filtres, tri, synthèses et exports couvrent uniquement la page affichée. Choisir une barre filtre le tableau sans changer la base de la synthèse. Un utilisateur peut appartenir à plusieurs catégories : ne les additionnez pas pour obtenir des utilisateurs uniques. Les chemins identiques d’hôtes distincts et les produits homonymes d’identifiants distincts restent séparés. Aucun graphique de parts de revenu n’est tracé pour des valeurs négatives ou inconnues.

Le filtre de faible conversion est une piste d’analyse sur au moins quatre pages admissibles affichées avec au moins 30 sessions chacune. Il n’estime pas des ventes perdues. Aucun événement observé ne prouve une configuration manquante. Une recherche interne fréquente ne prouve pas un manque de contenu.

## Partage, mesure et quota

Rapport, canal, dates, ventilation, taille et position de page restent dans l’URL. Le filtre exact host/path couvre seulement les lignes affichées, sans fusion de variantes d’URL. CSV et Sheets exportent les lignes filtrées avec des nombres bruts. ga4_scope_json conserve source, propriété, dates, fuseau, devise, qualité, page et filtres.

L’état de mesure lit uniquement les paramètres Admin. L’absence de lacune ne prouve pas que la balise envoie des données ; suivez les vérifications de collecte proposées. Les inventaires partiels sont précédés d’au moins. Si la mesure améliorée est désactivée, aucune sous-fonction n’est effectivement active. Aucun paramètre de compte n’est modifié.

Le quota replié présente un instantané local de la dernière réponse de rapport, pas l’usage de la période de trafic. Le plafond standard est une hypothèse. Actualiser redemande les rapports visibles et peut consommer des jetons.

Lorsque Google tronque les données de la période demandée, la synthèse Analytics et les détails du rapport indiquent la raison et les dates fournies par Google. Le rapport est considéré comme limité ; une couverture incomplète n’est pas présentée comme une comparaison fiable des périodes.
