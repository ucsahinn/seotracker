---
title: Mots-clés enregistrés
description: Enregistrez les recherches qui comptent, étiquetez-les et suivez leur position moyenne sur 90 jours, avec un export en CSV ou vers Google Sheets.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Vous rassemblez les recherches qui comptent pour vous, vous les étiquetez et vous suivez leur position.

L'application ne vous propose aucun mot. Dans l'écran Performance de recherche ou Suivi du classement, vous choisissez **Enregistrer comme mot-clé** dans le menu d'une ligne, et le mot arrive ici. Vous voyez ici la position moyenne de chaque mot sur les 90 derniers jours. La position vient des archives du Suivi du classement. Enregistrer ne lance aucun nouveau suivi chez Google. Cela filtre, pour ces mots, des données déjà collectées.

## Ce que l'écran affiche

**Barre du haut.** Il y a une ligne d'explication et les boutons **Exporter vers Google Sheets**, **Télécharger au format CSV** et **Actualiser**. En dessous, le texte « N mots-clés enregistrés ».

**Carte de répartition des positions.** Les barres montrent combien de vos mots sont en position 1-3, 4-10, 11-20 et 21+. En dessous, une note : « les positions sont la moyenne des 90 derniers jours ». Un mot sans enregistrement dans les archives est compté comme « Aucune donnée ». Si les archives sont incomplètes, vous voyez « Inconnu (archive coupée) ». Les boutons **Top 10** et **Positions 11–20** réduisent le tableau à cette tranche.

**Panneau de filtres.** Sous **Filtrer les résultats**, il y a les cases **Doit contenir** et **Ne doit pas contenir**. Les deux cherchent du texte à l'intérieur du mot. Pour chercher une étiquette, utilisez **Rechercher des étiquettes**. **Tout effacer** remet tout à zéro. Un projet peut avoir 50 étiquettes au maximum.

**Tableau.** Les colonnes sont : **Mot-clé**, **Pos. moy**, **Intention**, **Étiquettes**, **Ajouté**. Si la position est vide, le survol indique « La Search Console n'a enregistré aucune position pour ce mot-clé ». La colonne **Intention** montre ce que veut la personne qui cherche le mot :

- Informationnel : elle veut apprendre.
- Recherche commerciale : elle va comparer et choisir.
- Transactionnel : elle est prête à acheter.
- Navigationnel : elle cherche un site précis.
- Inconnu : ce n'est pas clair.

Le tableau affiche leurs formes courtes : Infos, Commercial, Transactionnel, Navigationnel et un point d'interrogation. Le menu de ligne propose trois choix : **Copier le mot-clé**, **Rechercher dans Performances de recherche**, **Supprimer le mot-clé**.

**Actions groupées.** Quand vous cochez des lignes, les boutons **Copier les mots-clés**, **Mettre à jour les étiquettes** et le bouton de suppression apparaissent en haut. Avant la suppression, l'avertissement « sera supprimé définitivement. C'est irréversible. » s'affiche.

**États vides.** S'il n'y a aucun mot, l'écran indique « Aucun mot-clé enregistré pour l'instant ». Un raccourci apparaît : **Parcourir les requêtes** ; si la Search Console n'est pas encore connectée, c'est **Connecter la Search Console** à la place. Si aucun mot ne correspond au filtre, il indique « Aucun mot-clé ne correspond à ces filtres ».

## Comment l'utiliser

1. Dans Performance de recherche, ouvrez l'onglet **Opportunités de classement**. Enregistrez cinq ou dix recherches que vous jugez importantes avec **Enregistrer comme mot-clé**. Choisissez aussi les recherches des pages qui rapportent de l'argent, pas seulement les plus affichées.
2. Venez ici et cochez les mots. Avec **Mettre à jour les étiquettes**, donnez des étiquettes comme « ürün » (produit), « blog », « marka » (marque). Cela facilite la comparaison le mois prochain.
3. Une fois par mois, regardez la carte **Distribution des positions**. Les mots de la tranche 11-20 sont les plus proches de la première page. Retrouvez les pages de ces mots dans l'écran Opportunités.
4. Pour un rapport, cliquez sur **Télécharger au format CSV** ou **Exporter vers Google Sheets**. Le fichier arrive avec les filtres que vous avez appliqués.

## Comment les chiffres sont calculés

Les mots et les étiquettes sont stockés dans la base de données de cet ordinateur. **Pos. moy** est calculée à partir des archives du Suivi du classement, sur les 90 derniers jours. Les jours avec beaucoup d'impressions pèsent davantage dans la moyenne. La différence entre majuscules et minuscules n'est pas prise en compte.

On récupère des archives les 500 recherches les plus affichées. Si votre mot enregistré est en dehors de ces 500, sa position apparaît comme « inconnue ».

L'information d'intention est écrite si elle est arrivée à l'enregistrement du mot. Elle n'est pas calculée après coup. La liste est découpée en pages de 50, 100 ou 250.

## Questions fréquentes

**J'ai enregistré le mot, pourquoi la position est-elle vide ?** Les archives n'ont peut-être pas encore collecté de jours pour ce mot. Ouvrez l'écran Suivi du classement et attendez que les archives se remplissent. Cliquez ensuite sur **Actualiser** ici.

**Quand je cherche sur Google, ma position est différente.** La position ici est la moyenne de 90 jours. On ne peut pas la comparer à une seule recherche.

**Où est la colonne du volume de recherche ?** Elle n'existe pas. L'application n'estime pas de volume. Vous voyez le nombre d'impressions dans l'écran Performance de recherche.

**Puis-je enregistrer deux fois le même mot ?** Non. Le même texte ne fait qu'un seul enregistrement.

**Si je supprime une étiquette, les mots sont-ils supprimés ?** Non. L'étiquette disparaît, les mots restent.

## Limites

Cet écran n'est pas un outil de recherche de mots-clés. Il ne propose pas de mots et n'affiche ni volume ni difficulté. L'information de position est limitée aux jours que couvrent les archives. La position des recherches rares que Google masque n'arrive jamais. Les données sont dans la base de données de cette installation, et c'est à vous d'en faire la sauvegarde.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
