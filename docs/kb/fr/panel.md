---
title: Tableau de bord
description: C'est le premier écran que vous voyez en ouvrant le projet. Les chiffres de recherche des 28 derniers jours, le résumé du dernier audit et vos tâches y sont réunis.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Vous y voyez l'état le plus récent de votre site et vous apprenez quoi faire ensuite. C'est le premier écran qui s'affiche quand vous ouvrez le projet.

Les chiffres de recherche viennent de l'outil Search Console de Google. Les chiffres de visiteurs viennent de Google Analytics. Le résumé de l'audit vient de l'explorateur de site propre à l'application. Le bouton **Yenile** (Actualiser), en haut, actualise le tout. **Denetimi başlat** (Lancer l'audit) vous mène à l'écran de l'audit.

## Ce que l'écran affiche

**Quatre cartes de chiffres.** Les cartes sont **Tıklama** (Clics), **Gösterim** (Impressions), **Tıklama oranı** (Taux de clic) et **Ortalama sıra** (Position moyenne). Toutes montrent les 28 derniers jours. Chaque carte porte une flèche qui compare avec les 28 jours précédents. Pour la position moyenne, un petit nombre est bon, car 1 est la première place. Une baisse est donc une bonne nouvelle, et la flèche est colorée en conséquence. Si Search Console n'est pas connecté, la carte indique « Search Console'u bağlayın » (Connectez Search Console).

**Prochaines étapes.** L'application vous propose trois tâches au maximum. Les suggestions arrivent dans cet ordre :

- Si Search Console n'est pas connecté, **Search Console'u bağla** (Connecter Search Console).
- S'il n'y a aucun audit, ou si le dernier a plus de sept jours, **Denetimi başlat** (Lancer l'audit).
- S'il y a un problème grave, **Kritik sorunları gör** (Voir les problèmes critiques).
- Ensuite, **Fırsatları aç** (Ouvrir les opportunités) et **Uyarıları gör** (Voir les avertissements).

Quand vous avez terminé une tâche, elle disparaît de la liste.

**Nouveaux problèmes du dernier audit et Düzelenler (Corrigés).** Cette zone compare les deux derniers audits. Vous voyez quel problème est apparu sur combien de pages, et lequel a diminué. S'il n'y a rien de corrigé, elle indique « Düzelen sorun yok. » (Aucun problème corrigé.).

**Tendance des clics.** Vous voyez les clics quotidiens des 28 derniers jours sous la forme d'une courbe. S'il y a moins de quatre jours de données, la courbe n'est pas tracée. Le lien **Sorguları aç** (Ouvrir les requêtes) vous mène à l'écran Performance de recherche.

**Requêtes en position 5 à 20.** Vos quatre premières recherches qui apparaissent entre la 5e et la 20e place sur Google se trouvent ici. Avec un peu d'effort, elles peuvent monter en première page ou aux premières places. **Tümünü gör** (Tout voir) ouvre la liste complète.

**Carte Audit du site.** La carte indique combien de pages ont été explorées, les trois problèmes les plus fréquents et les cinq pages les plus problématiques. Pendant un audit, la carte s'actualise toutes les cinq secondes. L'icône en point d'interrogation explique les trois niveaux de gravité :

- Critique : cela nuit directement à votre présence dans la recherche.
- Avertissement : cela érode le classement avec le temps, mais n'est pas urgent.
- Info : ce sont de petites occasions d'amélioration.

**Carte Trafic organique.** Elle apparaît si Google Analytics est connecté. Elle affiche, pour les visiteurs venus de la recherche, les chiffres **Oturum** (Sessions), **Aktif kullanıcı** (Utilisateurs actifs), **Etkileşim oranı** (Taux d'engagement) et **Anahtar olay** (Événements clés). Si votre site mesure des ventes, **Organik gelir** (Revenu organique) et **Sipariş** (Commandes) s'y ajoutent.

## Comment l'utiliser

1. Ouvrez-le une fois par semaine et regardez les flèches des quatre cartes.
2. Faites la première tâche de la zone **Sıradaki adımlar** (Prochaines étapes). Si la zone est vide, il n'y a rien d'urgent.
3. Si le dernier audit a plus de sept jours, cliquez sur **Denetimi başlat**.
4. Regardez de nouveau le titre et la description des pages de la carte **Sıra 5-20 arası sorgular** (Requêtes en position 5 à 20). Le gain le plus facile se trouve généralement ici.

## Comment les chiffres sont calculés

Les quatre cartes viennent d'un seul rapport Search Console. Google fournit les données avec trois jours de retard. C'est pourquoi la période de 28 jours ne se termine pas aujourd'hui, mais trois jours plus tôt. La période précédente correspond aux 28 jours situés juste avant cette période. Si la période précédente est à zéro, la flèche n'est pas affichée.

La position moyenne donne plus de poids aux recherches qui reçoivent beaucoup d'impressions. Ces quatre chiffres sont les vrais totaux du site. Si vous additionnez les lignes du tableau de l'écran Performance de recherche, vous obtenez davantage, car Google compte séparément chaque page qui apparaît pour la même recherche.

## Questions fréquentes

**Pourquoi n'y a-t-il pas les données d'aujourd'hui ?** Google ne fournit pas encore les trois derniers jours. Il n'y a pas de manque, patientez.

**La position moyenne a augmenté, est-ce bien ?** Non. Passer de 3 à 7, c'est reculer. C'est pourquoi la flèche devient rouge.

**La carte d'audit montre-t-elle ce que Google voit ?** Non. Elle montre ce qu'a trouvé l'exploration de l'application elle-même. Pour savoir quelle page Google a enregistrée, regardez l'onglet **Dizin durumu** (État de l'index) de l'écran d'audit.

**Il n'y a pas de carte Trafic organique.** Google Analytics n'est pas connecté dans les paramètres du projet. C'est à vous de le connecter.

## Limites

Le tableau de bord n'affiche ni volume de recherche, ni backlinks (les liens qui viennent d'autres sites vers vous), ni positions de concurrents. Ces données ne sont pas dans l'application. Les requêtes très peu recherchées sont masquées dans Search Console. Pour voir le détail, vous passez à l'écran concerné.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
