---
title: Mots-clés enregistrés
description: Suivre vos mots-clés enregistrés avec les observations datées de l’archive Search Console locale, leur évolution de position et leur couverture.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

Vous enregistrez les requêtes qui comptent pour vous depuis **Performances de recherche** ou **Suivi des classements**. L’enregistrement ne lance aucun suivi chez Google : cet écran rapproche vos mots-clés des observations de l’archive Search Console conservée sur votre ordinateur.

## Période

Choisissez 30, 90 ou 180 jours ; 90 par défaut. L’écran indique les dates exactes de la période choisie et de la période précédente de même durée. Les dates suivent le calendrier du Pacifique de Google, avec un retard supposé de trois jours. Cette hypothèse ne garantit pas que l’archive est complète.

## Cartes du haut

- **Enregistrements correspondant aux filtres de texte et d’étiquettes** : nombre de mots-clés enregistrés retenus par les filtres.
- **Mots-clés observés** : ceux qui ont au moins une observation dans l’archive.
- **Baisses marquées** et hausses : mots-clés comparables sur les deux périodes, qui ont bougé d’au moins 0,5 position.
- **Position inconnue** : enregistrements sans observation de position sur la période.

Ces nombres ne sont ni le nombre total de requêtes du site ni un volume de recherche. Un même mot enregistré pour deux marchés compte comme deux enregistrements. Les observations, elles, couvrent toujours tous les pays et tous les appareils : le marché enregistré ne filtre pas l’archive.

Les barres **Positions 1–3**, **Positions 4–10**, **Positions 11–20** et **Positions 21 et plus** reposent sur la même base. Cliquer sur un groupe restreint le tableau à ce groupe.

Sans mot-clé comparable, la carte des mouvements affiche **Aucune comparaison** au lieu de zéro. Sans résultat correspondant, les boutons des cartes de mouvements et **Position inconnue** sont désactivés.

## Calcul de la position

- La position moyenne est pondérée par les impressions.
- La correspondance ignore la casse et les espaces répétés. La distinction turque entre I/ı et İ/i est conservée.
- Les moyennes des requêtes brutes qui correspondent au mot-clé sont combinées selon leurs impressions.
- Une position absente n’est ni une position zéro ni la preuve d’un recul.
- Un mouvement est marqué à partir de 0,5 position ; les mouvements plus petits figurent dans le détail de la ligne.
- « Aucune comparaison » diffère de « inchangé » : il manque une observation sur l’une des deux périodes.

## Liste et détail

Le tableau présente le mot-clé, la position moyenne, la variation, les impressions et les étiquettes. Sur téléphone, les mesures principales s’affichent sous le mot-clé.

Un clic sur un mot-clé ouvre les **Détails des archives** : mêmes périodes, requêtes brutes correspondantes, position précédente, nombre de jours observés et marché enregistré. La date d’ajout et l’éventuelle ancienne intention de recherche y figurent aussi ; l’intention n’est pas mesurée de nouveau.

**Afficher les observations quotidiennes des archives** ouvre le graphique quotidien. Les jours manquants y restent vides. Le clavier permet de parcourir les jours, et **Valeurs quotidiennes** donne les valeurs sous forme de texte.

Le lien **Rechercher dans Performances de recherche (période en direct)** fait autre chose : il cherche, dans Performances de recherche, les requêtes des 28 derniers jours qui contiennent ce texte. Il n’ouvre pas la même mesure que le détail des archives.

## Recherche, étiquettes et tri

- Tous les termes saisis dans la zone de recherche doivent correspondre, et aucun terme exclu ne doit apparaître. Chaque zone accepte 20 termes au plus.
- Le filtre d’étiquettes accepte 50 étiquettes sélectionnées au plus ; un mot-clé portant l’une d’elles est listé. Le nombre d’étiquettes du projet n’est pas limité à 50. Le nombre affiché à côté d’une étiquette compte ses attributions dans tout le projet.
- Le tri par défaut suit la date d’ajout. Vous pouvez aussi trier par position, mouvement, impressions ou mot-clé.
- Les filtres, le groupe de positions, la période, le tri et la page sont conservés dans la barre d’adresse. **Effacer** retire tous les filtres.

**Examiner les baisses** place en tête les baisses marquées comparables, pour les examiner. Il n’en donne pas la cause.

## Actions groupées

La sélection ne porte que sur les lignes de la page affichée. Les actions groupées sont bloquées pendant l’actualisation de la liste ou l’application d’un filtre. **Étiqueter** ajoute ou retire des étiquettes aux mots-clés sélectionnés, sans les supprimer. La suppression d’un mot-clé ou d’une étiquette demande confirmation ; supprimer une étiquette ne supprime pas les mots-clés.

## Export

**Télécharger au format CSV** et **Exporter vers Google Sheets** exportent les enregistrements filtrés et leurs mesures. Les premières colonnes sont le mot-clé, l’intention, les étiquettes et la date d’ajout. Suivent la position, la position précédente, la variation, l’état, les jours observés, les dates, la couverture, les requêtes brutes correspondantes, l’identifiant et l’instantané. Les mesures inconnues restent vides. Si les données changent pendant l’export, relancez-le.

## Données manquantes

L’écran distingue quatre situations : Search Console non connecté, archive jamais importée, archive partielle, erreur de lecture.

**Actualiser la liste** ne lit que la base locale. Pour obtenir de nouvelles données de Google, utilisez la mise à jour de l’archive dans **Suivi des classements** ; si Search Console n’est pas connecté, connectez-le d’abord.

Google ne renvoie pas certaines requêtes rares. L’absence d’observation dans l’archive ne signifie pas que votre site n’apparaît jamais dans Google.
