---
title: Opportunités
description: Il vous dit sur quelle page intervenir cette semaine. Il répartit les pages en quatre groupes, leur donne un score et écrit ce qu'il faut faire pour chacune.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-22
---

Vous voyez ici sur quelle page vous devez intervenir cette semaine.

L'application associe chacune de vos pages dans Search Console à son équivalent dans Google Analytics. Puis elle donne à chaque page un score de 0 à 100. Ce score n'est pas une mesure de Google. C'est l'estimation de l'application : « cette page vaut-elle la peine d'y travailler ? ». L'écran a besoin à la fois de Search Console et d'Analytics. Si l'un des deux n'est pas connecté, un avertissement et un bouton **Bağlantıları aç** (Ouvrir les connexions) apparaissent.

## Ce que l'écran affiche

**Barre du haut.** **Dönem** (Période : 7 derniers jours, 28 derniers jours, 90 derniers jours), **Satır sayısı** (Nombre de lignes : 25, 50, 100) et **Yenile** (Actualiser).

**Cartes de synthèse.** **Listelenen** (Listées), **Analytics'te karşılığı var** (Présentes dans Analytics), **Analytics'te karşılığı yok** (Absentes d'Analytics) et **En yüksek puan** (Score le plus élevé).

**Quatre groupes.** Chaque page entre dans l'un des quatre groupes. Le nom du groupe apparaît en étiquette sur la ligne.

| Groupe                    | Ce que cela veut dire                                                                       | Que faire                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Az tıklanan** (Peu cliquées)        | Dans les 20 premières positions. Le taux de clic est inférieur à la moitié de celui de vos pages à la même position | Réécrivez le titre et la description. Le texte affiché dans la recherche n'attire pas              |
| **Yükselmeye yakın** (Proches de monter) | Position entre 4 et 20                                                                      | Développez le contenu, ajoutez des liens internes. Cela peut gagner une ou deux places             |
| **İlk sıralarda** (Aux premières places) | Dans les 3 premières positions                                                              | Préservez. Gardez la page à jour et assurez-vous qu'elle ne se dégrade pas                         |
| **Derinde kalan** (Enfouies)       | Après la 20e position                                                                       | Demandez-vous si la page répond vraiment à cette recherche. La bonne page est peut-être une autre  |

Un lien interne est un lien que vous placez, sur votre site, d'une page vers une autre.

**Filtres rapides.** **Analytics'te karşılığı olanlar** (Celles qui existent dans Analytics), **Analytics'te karşılığı yok**, **En çok gösterim alan 10** (Les 10 plus affichées).

**Carte « Fırsat nerede toplanıyor? » (Où se concentre l'opportunité ?).** Elle montre comment les impressions ou les clics se répartissent entre les groupes.

**Tableau.** Les colonnes sont : **Puan** (Score), **Sayfa** (Page), **Sıra** (Position), **Gösterim** (Impressions), **Tıklama** (Clics), **Tıklama oranı** (Taux de clic), **Oturum** (Sessions). Une session est le nombre de visites sur votre site, et elle vient d'Analytics.

**Panneau de détail.** Il s'ouvre quand vous cliquez sur une ligne. La liste « Ne yapmalı? » (Que faire ?) s'y trouve. Vous voyez aussi les trois composantes du score : **Talep** (Demande), **İş değeri** (Valeur business), **Yükselme kolaylığı** (Facilité de progression). Chacune ressort élevée, moyenne ou faible. Les boutons du bas : **Arama performansında aç** (Ouvrir dans la performance de recherche), **Adresi kopyala** (Copier l'adresse), **Sayfayı aç** (Ouvrir la page).

## Comment l'utiliser

1. Commencez par **Son 28 gün** (28 derniers jours). La ligne tout en haut est la page à regarder en premier.
2. Dans le groupe **Az tıklanan**, prenez les deux premières pages. Elles sont bien placées sur Google mais personne ne clique. Corrigez le titre et la description. C'est un travail d'une demi-heure.
3. Dans le groupe **Yükselmeye yakın**, regardez les pages au score élevé. Ajoutez une section, placez deux ou trois liens internes depuis le site.
4. Le bouton **Analytics'te karşılığı yok** isole les pages que Google affiche mais qu'Analytics ne voit pas visitées. Le plus souvent, c'est une différence d'adresse (barre oblique finale, www). Parfois, la page n'est vraiment pas cliquée.
5. Ne touchez pas plus de trois ou quatre pages par semaine.

## Comment les chiffres sont calculés

La période se termine avec le retard de trois jours de Search Console. On prend au plus 1 000 lignes de Search Console et au plus 1 000 lignes d'Analytics. Les deux listes sont associées par nom de domaine et chemin. La barre oblique à la fin de l'adresse n'est pas comptée. Si la limite de 1 000 lignes est atteinte, une note apparaît sous le tableau.

Toute page ayant plus de zéro impression est candidate. Le groupe est choisi selon la position et le taux de clic attendu. Le taux attendu est le taux de clic typique de vos pages dans la même tranche de positions. Les tranches de positions sont : 1-3, 3-5, 5-10, 10-20 et 20-50. Une tranche exige au moins trois pages ayant 10 impressions chacune. Une page en position 20 ou au-delà, dont le taux est inférieur à la moitié du taux attendu, devient « Az tıklanan ».

Le score se compose ainsi : 50 pour cent de demande, 30 pour cent de valeur business, 20 pour cent de facilité de progression. La demande repose sur les impressions. Mieux la position est bonne, plus la progression est considérée comme facile. La valeur business est le taux d'événements clés d'Analytics. Un événement clé est une action que vous jugez importante. Si aucune page n'en a, on utilise le taux d'engagement. Une page sans équivalent dans Analytics reçoit un score moyen pour la valeur business. Le score compare uniquement les pages de votre propre site entre elles.

## Questions fréquentes

**Une page à 80 est-elle deux fois plus importante qu'une page à 60 ?** Non. 80 veut dire « regardez d'abord », 60 veut dire « regardez ensuite ».

**Que veut dire « pas d'équivalent dans Analytics » ?** Le format de l'adresse peut être différent, ou la page n'a jamais été cliquée.

**Pourquoi la liste s'est-elle vidée sur 7 jours ?** Sur sept jours, la plupart des pages restent sous 10 impressions. Le taux attendu ne peut donc pas être calculé. Pour la plupart des sites, 28 jours est la bonne période.

## Limites

L'écran n'utilise ni volume de recherche ni position de concurrents. La demande, ce sont uniquement vos propres impressions. Search Console et Analytics peuvent rapporter dans des fuseaux horaires différents. Les correspondances quotidiennes peuvent donc se décaler d'un jour. Le score ne connaît pas la qualité du contenu. La décision finale est la vôtre.

<!-- Kaynaklar: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; opportunityLogic.ts; OpportunitySummary.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; src/server/features/ga4/services/SearchOpportunityService.ts; src/server/features/ga4/services/opportunityKind.ts -->
