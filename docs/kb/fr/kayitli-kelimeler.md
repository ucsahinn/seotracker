---
title: Mots-clés enregistrés
description: Vous enregistrez ici les recherches qui comptent pour vous, vous les étiquetez et vous suivez leur position moyenne sur les 90 derniers jours. Vous pouvez les exporter en CSV ou vers Sheets.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Vous rassemblez les recherches qui comptent pour vous, vous les étiquetez et vous suivez leur position.

L'application ne vous propose aucun mot. Dans l'écran Performance de recherche ou Suivi du classement, vous choisissez **Kelime olarak kaydet** (Enregistrer comme mot-clé) dans le menu d'une ligne, et le mot arrive ici. Vous voyez ici la position moyenne de chaque mot sur les 90 derniers jours. La position vient des archives du Suivi du classement. Enregistrer ne lance aucun nouveau suivi chez Google. Cela filtre, pour ces mots, des données déjà collectées.

## Ce que l'écran affiche

**Barre du haut.** Il y a une ligne d'explication et les boutons **E-Tablolar'a aktar** (Exporter vers Sheets), **CSV indir** (Télécharger en CSV) et **Yenile** (Actualiser). En dessous, le texte « {n} kayıtlı kelime » ({n} mots-clés enregistrés).

**Carte de répartition des positions.** Les barres montrent combien de vos mots sont en position 1-3, 4-10, 11-20 et 21+. En dessous, une note : « sıralar son 90 günün ortalaması » (les positions sont la moyenne des 90 derniers jours). Un mot sans enregistrement dans les archives est compté comme « Verisi yok » (Pas de données). Si les archives sont incomplètes, vous voyez « Bilinmiyor (arşiv kesildi) » (Inconnu, archives tronquées). Les boutons **İlk 10** (Top 10) et **Sıra 11-20** (Position 11-20) réduisent le tableau à cette tranche.

**Panneau de filtres.** Sous **Sonuçları filtrele** (Filtrer les résultats), il y a les cases **İçersin** (Doit contenir) et **İçermesin** (Ne doit pas contenir). Les deux cherchent du texte à l'intérieur du mot. Pour chercher une étiquette, utilisez **Etiket ara** (Chercher une étiquette). **Tümünü temizle** (Tout effacer) remet tout à zéro. Un projet peut avoir 50 étiquettes au maximum.

**Tableau.** Les colonnes sont : **Kelime** (Mot), **Ort. sıra** (Position moy.), **Amaç** (Intention), **Etiketler** (Étiquettes), **Eklenme** (Ajout). Si la position est vide, le survol indique « Search Console bu kelime için sıra kaydetmemiş » (Search Console n'a pas enregistré de position pour ce mot). La colonne **Amaç** montre ce que veut la personne qui cherche le mot :

- Bilgi amaçlı (Informationnelle) : elle veut apprendre.
- Ticari araştırma (Recherche commerciale) : elle va comparer et choisir.
- İşlem odaklı (Transactionnelle) : elle est prête à acheter.
- Yönlendirici (De navigation) : elle cherche un site précis.
- Bilinmiyor (Inconnue) : ce n'est pas clair.

Le tableau affiche leurs formes courtes : Bilgi, Ticari, İşlem, Gezinme et un point d'interrogation. Le menu de ligne propose trois choix : **Kelimeyi kopyala** (Copier le mot), **Arama performansında ara** (Chercher dans la performance de recherche), **Kelimeyi sil** (Supprimer le mot).

**Actions groupées.** Quand vous cochez des lignes, les boutons **Kelimeleri kopyala** (Copier les mots), **Etiketleri güncelle** (Mettre à jour les étiquettes) et le bouton de suppression apparaissent en haut. Avant la suppression, l'avertissement « kalıcı olarak silinecek. Bu geri alınamaz. » (sera supprimé définitivement. C'est irréversible.) s'affiche.

**États vides.** S'il n'y a aucun mot, l'écran indique « Henüz kayıtlı kelime yok » (Aucun mot enregistré pour l'instant). Deux raccourcis apparaissent : **Sorgulara göz at** (Parcourir les requêtes) et **Sıralamayı aç** (Ouvrir le classement). Si aucun mot ne correspond au filtre, il indique « Bu filtrelere uyan kelime yok » (Aucun mot ne correspond à ces filtres).

## Comment l'utiliser

1. Dans Performance de recherche, ouvrez l'onglet **Sıra 5-20**. Marquez cinq ou dix recherches que vous jugez importantes avec **Kelime olarak kaydet**. Choisissez les recherches des pages qui rapportent de l'argent. C'est aussi utile que de choisir les recherches les plus affichées.
2. Venez ici et cochez les mots. Avec **Etiketleri güncelle**, donnez des étiquettes comme « ürün » (produit), « blog », « marka » (marque). Cela facilite la comparaison le mois prochain.
3. Une fois par mois, regardez la carte **Sıra dağılımı** (Répartition des positions). Les mots de la tranche 11-20 sont les plus proches de la première page. Retrouvez les pages de ces mots dans l'écran Opportunités.
4. Pour un rapport, cliquez sur **CSV indir** ou **E-Tablolar'a aktar**. Le fichier arrive avec les filtres que vous avez appliqués.

## Comment les chiffres sont calculés

Les mots et les étiquettes sont stockés dans la base de données de cet ordinateur. **Ort. sıra** est calculée à partir des archives du Suivi du classement, sur les 90 derniers jours. Les jours avec beaucoup d'impressions pèsent davantage dans la moyenne. La différence entre majuscules et minuscules n'est pas prise en compte.

On récupère des archives les 500 recherches les plus affichées. Si votre mot enregistré est en dehors de ces 500, sa position apparaît comme « inconnue ».

L'information d'intention est écrite si elle est arrivée à l'enregistrement du mot. Elle n'est pas calculée après coup. La liste est découpée en pages de 50, 100 ou 250.

## Questions fréquentes

**J'ai enregistré le mot, pourquoi la position est-elle vide ?** Les archives n'ont peut-être pas encore collecté de jours pour ce mot. Ouvrez l'écran Suivi du classement et attendez que les archives se remplissent. Cliquez ensuite sur **Yenile** ici.

**Quand je cherche sur Google, ma position est différente.** La position ici est la moyenne de 90 jours. On ne peut pas la comparer à une seule recherche.

**Où est la colonne du volume de recherche ?** Elle n'existe pas. L'application n'estime pas de volume. Vous voyez le nombre d'impressions dans l'écran Performance de recherche.

**Puis-je enregistrer deux fois le même mot ?** Non. Le même texte ne fait qu'un seul enregistrement.

**Si je supprime une étiquette, les mots sont-ils supprimés ?** Non. L'étiquette disparaît, les mots restent.

## Limites

Cet écran n'est pas un outil de recherche de mots-clés. Il ne propose pas de mots et n'affiche ni volume ni difficulté. L'information de position est limitée aux jours que couvrent les archives. La position des recherches rares que Google masque n'arrive jamais. Les données sont dans la base de données de cette installation, et c'est à vous d'en faire la sauvegarde.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
