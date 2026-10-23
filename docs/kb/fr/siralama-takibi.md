---
title: Suivi du classement
description: La position moyenne de vos recherches sur Google, jour après jour. Les données restent sur cet ordinateur : vous remontez au-delà des 16 mois de Google.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Vous voyez comment vos recherches montent et descendent au fil du temps. Google Search Console limite l'historique à 16 mois. Il ne montre pas non plus à quelle position se trouvait une recherche tel ou tel jour.

L'application récupère ces données jour par jour et les conserve sur cet ordinateur. Chaque fois que vous ouvrez l'écran, les archives grossissent. Avec le temps, vous remontez plus loin que ce que Google montre.

## Ce que l'écran affiche

**Plage de temps.** Les choix sont 30 gün (30 jours), 90 gün (90 jours, par défaut), 6 ay (6 mois), 16 ay (16 mois) et Arşivin tamamı (Toutes les archives). La plage est comptée jusqu'à trois jours avant aujourd'hui.

**Ligne d'état des archives.** Elle indique combien de jours et de lignes contiennent les archives. À chaque ouverture, l'écran complète auprès de Google les jours manquants. Si elle indique « Bu açılışta N gün eklendi. » (N jours ajoutés à cette ouverture.), de nouveaux jours sont arrivés. Si elle indique « Kalan günler sonraki açılışta tamamlanacak. » (Les jours restants seront complétés à la prochaine ouverture.), le travail continue à la prochaine ouverture.

La zone **Sorgu içinde ara** (Chercher dans les requêtes) réduit la liste.

**Filtres de variation.** **Yükselenler** (En hausse) et **Düşenler** (En baisse) montrent les recherches qui ont bougé d'au moins une demi-position. Il y a aussi **Şu an ilk 10'da** (Actuellement dans le top 10) et **İlk 10'dan çıkanlar** (Sortis du top 10). Deux boutons rapides s'y ajoutent : **Gösterimi yüksek** (Beaucoup d'impressions, au moins 100 impressions) et **Hiç tıklanmayan** (Jamais cliquées).

**Répartition des positions.** Les barres montrent combien de vos recherches se trouvent dans les tranches 1-3, 4-10, 11-20 et 21+.

**Hausses et baisses.** Vous voyez deux courtes listes : « En çok yükselenler » (Plus fortes hausses) et « En çok düşenler » (Plus fortes baisses).

**Tableau.** Les colonnes sont : **Sorgu** (Requête), **Ort. sıra** (Position moy.), **Değişim** (Variation), **Gösterim** (Impressions), **Tıklama** (Clics), **Gün** (Jours). La colonne **Gün** indique pendant combien de jours la recherche est apparue dans la plage choisie. Une recherche qui n'apparaît que 3 jours sur 90 est rarement recherchée. La cellule de variation indique « Yükseldi 2,4 » (En hausse de 2,4) ou « Düştü 1,1 » (En baisse de 1,1). Le menu de ligne propose trois choix : **Kelimeyi kopyala** (Copier le mot), **Kayıtlı kelimelere ekle** (Ajouter aux mots-clés enregistrés), **Arama performansında ara** (Chercher dans la performance de recherche).

**Historique d'une requête.** Un clic sur une ligne ouvre la courbe de position de cette recherche, jour par jour. Le lien **Arama performansında aç** (Ouvrir dans la performance de recherche) montre la même recherche dans l'autre écran.

**États vides.** Si les archives sont vides, l'écran indique « Henüz hangi kelimeyle arandığınız bilinmiyor » (On ne sait pas encore par quels mots vous êtes recherché) et un bouton **Arama performansını aç** (Ouvrir la performance de recherche) apparaît. La liste est limitée aux 100 recherches les plus affichées. S'il y en a davantage, une note sous la liste vous le dit.

## Comment l'utiliser

1. Quand vous ouvrez l'écran pour la première fois, attendez que la ligne des archives affiche « eklendi » (ajouté).
2. Le premier remplissage remonte jusqu'à 480 jours. Cela peut demander quelques ouvertures.
3. Si vous cherchez une baisse, cliquez sur le bouton **Düşenler**. Écartez ensuite les cas sans importance avec **Gösterimi yüksek**.
4. Cliquez sur la recherche tout en haut. Dans le graphique de l'historique, lisez le jour où la baisse a commencé.
5. Enregistrez les recherches que vous voulez suivre avec **Kayıtlı kelimelere ekle**.
6. Une fois par mois, regardez les listes « En çok yükselenler » et « En çok düşenler ». Cela suffit pour avoir une vue d'ensemble.

## Comment les chiffres sont calculés

Les archives ne se remplissent qu'avec des données que Google a confirmées. À chaque ouverture, les trois derniers jours sont récupérés de nouveau, car Google peut corriger ces jours après coup. Les jours corrigés sont ainsi réécrits dans les archives.

Les clics et les impressions sont des totaux. **Ort. sıra** donne plus de poids aux jours où il y a eu beaucoup d'impressions. **Gün** est le nombre de jours pour lesquels il existe des données.

La variation se calcule ainsi : on soustrait la position moyenne de cette période de celle de la période précédente. Si le résultat est positif, vous avez monté. La période précédente a la même durée et se termine juste avant cette période.

La liste reprend les 100 recherches les plus affichées. Dans le navigateur, elle est découpée en pages de 25, 50 ou 100.

## Questions fréquentes

**Pourquoi est-ce différent du chiffre de Search Console ?** Les archives ne gardent que les jours confirmés et vont jusqu'à trois jours en arrière. Si, dans Search Console, vous avez choisi une plage qui inclut aujourd'hui, les chiffres ne correspondent pas.

**La recherche est dans la liste, mais l'historique de position est vide.** Cette recherche est peut-être apparue peu de jours. Regardez la colonne **Gün**.

**Pourquoi les archives sont-elles bloquées sur le même jour ?** L'application ne récupère pas de données en arrière-plan. Ouvrez l'écran et attendez la note « eklendi ».

**Puis-je voir la position de mon concurrent ?** Non. Search Console ne fournit que les données de votre propre site.

**Que signifie une position de 1,0 ?** Que vous êtes apparu en première position à chaque impression pendant la période. Si vous étiez tombé un jour à la 3e position, la moyenne aurait dépassé 1.

## Limites

Les archives ne contiennent que les jours vus par cette installation. Si vous venez d'installer l'application, la première ouverture remonte au plus à 480 jours. Les recherches rares que Google masque n'entrent pas non plus dans les archives. Si les archives sont supprimées (le volume Docker ou le dossier de données, par exemple), l'historique disparaît. C'est à vous d'en faire une sauvegarde.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
