---
title: Suivi des classements
description: Position moyenne de vos recherches sur Google, celles qui montent ou baissent et l'évolution des groupes de positions, même au-delà de la limite de 16 mois de Google, car les données sont conservées sur cet ordinateur.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Vous voyez ici comment vos recherches montent et baissent au fil du temps, et quel mouvement compte le plus. Google Search Console limite l'historique à 16 mois. Elle n'indique pas non plus à quelle position se trouvait une recherche tel jour.

L'application récupère ces données jour par jour et les conserve sur cet ordinateur. L'archive grandit chaque fois que vous ouvrez l'écran. Avec le temps, vous remontez plus loin que Google ne le montre.

## Ce que l'écran affiche

**Période.** Les choix sont 30 jours, 90 jours (par défaut), 6 mois, 16 mois et Toute l'archive. La plage choisie reste dans la barre d'adresse. Elle se termine trois jours avant aujourd'hui. Une ligne en haut dit quelles dates sont affichées.

**Ligne d'état de l'archive.** Elle indique les dates que l'archive couvre. À chaque ouverture, l'écran comble auprès de Google les jours manquants. Si une note dit que des jours ont été ajoutés lors de cette visite, de nouveaux jours sont entrés dans l'archive. Si elle dit que les jours restants seront renseignés à la prochaine ouverture, le travail continue à la visite suivante.

**Hausses et baisses.** Deux courtes listes : **Plus fortes hausses** et **Plus fortes baisses**. Chaque ligne donne la recherche, l'ancienne et la nouvelle position comme « Position 6,2 → 4,1 », les impressions et le nombre de places gagnées ou perdues. Les listes ne sont pas triées par le seul mouvement. Le mouvement est multiplié par les impressions. Une requête très recherchée qui a gagné deux places passe avant une requête rarement recherchée qui en a gagné quatre. Un clic sur une ligne ouvre l'historique de cette recherche sous le tableau. Les recherches sans données sur la période précédente n'entrent pas dans ces listes. Si aucune comparaison n'est possible, une note à la place de la section en donne la raison.

**Distribution des positions.** Quatre barres montrent combien de vos recherches se trouvent dans les groupes 1-3, 4-10, 11-20 et 21+, selon la position moyenne. À côté de chaque barre figurent le nombre de recherches et leur part. Le nombre tout à droite indique combien de recherches sont entrées dans ce groupe ou en sont sorties depuis la période précédente, avec une flèche et un signe. Dans les trois premiers groupes, une hausse est une bonne nouvelle. Dans le groupe 21+, c'est une mauvaise nouvelle. Un clic sur une barre réduit le tableau à ce groupe. Un nouveau clic retire le filtre.

**Zone de recherche et filtres.** La zone **Requêtes de recherche** réduit la liste. En dessous, il y a deux groupes de filtres.

- **Modifier les filtres** : **En hausse** et **En baisse** montrent les recherches qui ont bougé d'au moins une demi-position par rapport à la période précédente. **Maintenant dans le top 10** et **Sorties du top 10** sont ici aussi.
- **Filtres rapides** : **Impressions élevées** et **Aucun clic**. Impressions élevées, c'est le quart de la liste le plus affiché. Il n'y a pas de nombre fixe, car un nombre fixe sélectionnerait toutes les lignes sur une courte plage.

Un filtre qui ne réduit pas vraiment la liste n'est pas affiché. Un bouton qui ne sélectionnerait aucune ligne, ou toutes, ne dit rien.

**Tableau.** Les colonnes sont **Requête**, **Position moyenne**, **Modifier**, **Impressions**, **Clics** et parfois **Jour**. Cliquez sur un en-tête pour trier. Le tri initial se fait par impressions. La cellule **Position moyenne** a une petite ligne à gauche. Elle montre la position semaine par semaine sur la plage. Si la ligne monte, la position s'améliore. Sur un petit écran, la ligne est masquée. Une position en première page est écrite en vert, en deuxième page en jaune. La couleur ne porte jamais seule l'information, car le nombre est toujours écrit. La cellule **Modifier** indique « 2,4 places gagnées », « 1,1 places perdues » ou « Aucun changement ». Pour une recherche sans données sur la période précédente, elle indique « Aucune donnée dans la période précédente ». La colonne **Jour** n'apparaît que si certaines recherches manquaient certains jours. Une recherche qui n'apparaît que 3 jours sur 90 est rarement recherchée. Le menu de la ligne propose trois options : **Copier le mot-clé**, **Ajouter aux mots-clés enregistrés**, **Rechercher dans Performances de recherche**. Le tableau est découpé en pages de 25, 50 ou 100 lignes.

**Historique d'une recherche.** Un clic sur une ligne ouvre la courbe de position jour par jour de cette recherche. Sur la courbe, le haut est une meilleure position. En la survolant, vous lisez la position, les clics et les impressions du jour. Le lien **Ouvrir dans Performances de recherche** montre la même recherche sur l'autre écran.

**États vides.** Si Search Console n'est pas connecté, un bouton **Connecter la Search Console** apparaît. Si l'archive est vide, il est écrit « Les mots-clés avec lesquels les internautes vous recherchent ne sont pas encore visibles » et un bouton **Ouvrir Performances de recherche** apparaît. La liste est limitée aux 100 recherches les plus affichées. S'il y en a davantage, une note en dessous le dit.

## Comment l'utiliser

1. À la première ouverture de l'écran, attendez que la ligne d'état de l'archive indique que des jours ont été ajoutés.
2. Le premier remplissage remonte jusqu'à 480 jours. Cela peut prendre quelques visites.
3. Regardez **Hausses et baisses**. La baisse en tête est le mouvement qui nuit le plus à votre trafic.
4. Regardez les barres de **Distribution des positions**. Si le groupe 21+ a une hausse en rouge à côté, des recherches glissent au-delà de la page deux.
5. Si vous cherchez une baisse, appuyez sur le filtre **En baisse**. Puis utilisez **Impressions élevées** pour écarter les moins importantes.
6. Cliquez sur la recherche du haut. Sur le graphique d'historique, lisez le jour où la baisse a commencé.
7. Marquez les recherches à suivre avec **Ajouter aux mots-clés enregistrés**.

## Comment les chiffres sont calculés

L'archive n'est remplie qu'avec des données que Google a rendues définitives. À chaque ouverture, les trois derniers jours sont récupérés de nouveau, car Google peut corriger ces jours plus tard. Ainsi les jours corrigés sont réécrits dans l'archive. L'ouverture de l'écran consomme du quota Search Console. Si l'écran est rouvert dans les 15 minutes qui suivent le dernier remplissage, il réutilise donc le même résultat.

Les clics et les impressions sont des totaux. Dans la **Position moyenne**, les jours qui ont plus d'impressions pèsent davantage. **Jour** est le nombre de jours avec des données.

Nous calculons l'évolution ainsi : nous retranchons la position de cette période de la position moyenne de la période précédente. Si le résultat est positif, vous avez monté. La période précédente a la même durée et se termine juste avant celle-ci. La comparaison n'est faite que pour les recherches qui ont des données dans les deux périodes. Une recherche qui bouge de moins d'une demi-position n'est comptée ni « en hausse » ni « en baisse ».

La liste des hausses et des baisses est triée selon l'écart de position multiplié par les impressions. Chaque liste compte cinq lignes au plus.

Les groupes de positions sont coupés sur la position arrondie. 3,4 compte comme « autour de la troisième », 3,5 comme « autour de la quatrième ». C'est pourquoi une recherche à 3,4 se trouve dans le groupe 1-3 et une à 3,5 dans le groupe 4-10.

La liste récupère les 100 recherches les plus affichées.

## Questions fréquentes

**Pourquoi est-ce différent du chiffre de Search Console ?** L'archive ne garde que les jours définitifs et remonte jusqu'à trois jours avant aujourd'hui. Si vous avez choisi dans Search Console une plage qui inclut aujourd'hui, les chiffres ne concordent pas.

**La recherche est dans la liste mais son historique de position est vide.** La recherche est peut-être apparue peu de jours. Vous le voyez dans la colonne **Jour**.

**Pourquoi est-il écrit que l'évolution ne peut pas être affichée ?** L'archive n'a aucun enregistrement de ces recherches sur la période précédente. Choisissez une plage plus courte ou attendez que l'archive se remplisse.

**Pourquoi l'archive reste-t-elle sur le même jour ?** L'application ne récupère pas de données en arrière-plan. Ouvrez l'écran et attendez la note indiquant que des jours ont été ajoutés.

**Puis-je voir la position de mon concurrent ?** Non. Search Console ne donne que les données de votre propre site.

**Que veut dire la position 1,0 ?** Vous étiez en première position à chaque impression pendant toute la période. Si vous étiez tombé 3e un jour, la moyenne dépasserait 1.

## Limites

L'archive ne contient que les jours que cette installation a vus. Si vous venez d'installer, la première ouverture remonte à 480 jours au plus. Les recherches rares que Google masque n'entrent pas non plus dans l'archive. Si l'archive est supprimée, l'historique disparaît. Supprimer le stockage de données Docker ou le dossier de données en est un exemple. Faire des sauvegardes vous revient.

<!-- Sources : src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; PositionSparkline.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; positionBands.ts; rankingMoves.ts; src/shared/positionBands.ts; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
