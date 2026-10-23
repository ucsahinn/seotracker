---
title: Audit du site
description: L'application parcourt votre site page par page, le contrôle selon 95 règles et classe les problèmes par ordre d'importance. À côté de chaque problème, elle écrit ce qu'il faut faire.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Cet écran trouve les problèmes de votre site et vous dit comment les corriger.

L'application parcourt votre site avec son propre explorateur (un programme qui ouvre les pages une à une et les lit). Elle cherche les liens cassés, les titres manquants et les pages lentes. À la fin, vous obtenez un score et une liste de problèmes classés par ordre d'importance. Sous chaque problème, la correction est expliquée.

## Ce que l'écran affiche

**Carte « Yeni denetim başlat » (Lancer un nouvel audit).** Elle comporte trois champs.

- **Taranacak site adresi** (Adresse du site à explorer) : le nom de domaine de votre projet est déjà rempli.
- **Kaç sayfa taransın?** (Combien de pages explorer ?) : au moins 10, au plus 10 000, 50 par défaut. Si vous saisissez un nombre supérieur à 500, l'application demande une confirmation.
- **Sayfa hızını da ölç** (Mesurer aussi la vitesse des pages) : désactivé par défaut. Si vous l'activez, chaque page est mesurée sur téléphone et sur ordinateur. La mesure est faite par Google Lighthouse (l'outil de mesure des pages de Google).

Si vous n'avez pas de clé PageSpeed (le code gratuit que Google fournit pour la mesure de vitesse), la mesure de vitesse est limitée à 50 pages au maximum. Pour tout mesurer, ajoutez une clé gratuite dans **Ayarlar** (Paramètres).

**Audits précédents.** La date, l'état, le nombre de pages et le nombre de problèmes de chaque audit sont listés. Les nombres de problèmes sont ramenés à cent pages. Vous pouvez ainsi comparer des audits de 50 et de 500 pages. **Denetimi sil** (Supprimer l'audit), dans le menu de ligne, supprime tout et est irréversible.

**Détail de l'audit.** Si l'exploration reste incomplète, un avertissement jaune apparaît. Par exemple « Denetim bu siteyi tamamen tarayamadı. » (L'audit n'a pas pu explorer entièrement ce site), souvent parce que la protection anti-bots l'a bloqué. Les résultats s'affichent quand même. **Raporu indir** (Télécharger le rapport) télécharge le rapport HTML en un seul fichier et l'enregistre dans l'écran **Raporlar** (Rapports).

**Score du site.** Vous voyez un nombre de 0 à 100. En dessous, les trois actions qui rapporteront le plus de points sont écrites avec « +N puan » (+N points).

**Deux graphiques.** L'un montre quel problème touche le plus de pages, l'autre à quel point les problèmes sont graves.

**Quatre onglets.**

- **Sorunlu sayfalar** (Pages à problèmes) : quand vous ouvrez une carte, vous voyez la cause et l'encadré **Nasıl düzeltilir?** (Comment corriger ?). Boutons : **URL'leri kopyala** (Copier les URL), **CSV indir** (Télécharger en CSV), **Sayfalar sekmesinde göster** (Afficher dans l'onglet Pages).
- **Sayfalar** (Pages) : chaque page explorée. Filtres rapides : **Dizine kapalı** (Exclue de l'index), **Yavaş** (Lente, plus d'une seconde), **Alt metni eksik** (Texte alternatif manquant), **Site haritasında yok** (Absente du plan du site).
- **Dizin durumu** (État de l'index) : la réponse de Google pour chaque page. Elle est expliquée dans un guide à part.
- **Hız** (Vitesse) : visible uniquement si la mesure de vitesse est activée.

## Comment l'utiliser

1. Au premier audit, laissez le nombre de pages à 50. Gardez la mesure de vitesse désactivée. Il se termine en une ou deux minutes.
2. Commencez par les trois actions « +N puan » de la carte de score. Ce sont celles qui rapportent le plus de points pour le moins d'effort.
3. Dans l'onglet **Sorunlu sayfalar**, terminez d'abord les problèmes critiques. Un problème critique empêche Google de voir la page.
4. Avec **URL'leri kopyala**, prenez la liste et donnez-la à la personne qui gère votre site. Vous pouvez lui transmettre tel quel l'encadré **Nasıl düzeltilir?**.
5. Après la correction, cliquez sur **Aynı ayarlarla yeniden başlat** (Relancer avec les mêmes réglages). Dans le tableau de bord, la carte « Düzelenler » (Corrigés) montre ce qui a été réglé.
6. Activez la mesure de vitesse une fois par semaine, pour les pages importantes. Chaque page prend environ dix secondes et consomme du quota Google.

## Comment les chiffres sont calculés

**Score.** Chaque problème a un poids différent : critique 40, avertissement 15, info 3. Plus un problème touche de pages, plus il retire de points. Le score part de 100 et ne descend pas sous zéro. Dès qu'il existe un seul problème, le score ne dépasse pas 99.

Les tranches de score sont les suivantes : 90 et plus, très bien ; 70 et plus, bien ; 50 et plus, moyen ; en dessous, faible.

**Exploration.** L'application ménage votre site. Elle envoie au plus deux requêtes à la fois. Si le site répond « trop de requêtes » (429), elle attend. Si l'attente totale dépasse 30 minutes, l'exploration s'arrête.

**Mesure de vitesse.** Sur un site de 212 pages, l'audit complet a duré 35 minutes. Environ 24 minutes étaient consacrées à la mesure de vitesse. Si le quota quotidien est atteint, la mesure s'arrête et les résultats obtenus jusque-là sont conservés. Un problème est signalé dans les cas suivants :

- Le contenu principal s'affiche après plus de 4 secondes (LCP).
- Le contenu se décale de plus de 0,25 (CLS).
- La réponse à un clic arrive après plus de 500 millisecondes (INP).
- Le score SEO de Lighthouse est inférieur à 90.

## Questions fréquentes

**L'audit montre-t-il ce que Google voit ?** Non. L'explorateur de l'application lit la page lui-même. La réponse de Google se trouve dans l'onglet **Dizin durumu**.

**Le score est de 98, pourquoi pas 100 ?** Un seul problème suffit à garder le score à 99 au plus.

**Que signifie l'avertissement « Engellendik » (Nous avons été bloqués) ?** La protection anti-bots de votre site a arrêté l'explorateur. Autorisez le nom « seotracker-audit » dans le pare-feu.

**La mesure de vitesse s'est arrêtée à mi-chemin.** En général, il n'y a pas de clé PageSpeed ou le quota quotidien est atteint. La carte de quota dans **Ayarlar** en donne la cause.

**Combien d'audits peuvent tourner en même temps ?** Trois au maximum. Deux audits qui mesurent la vitesse se ralentissent mutuellement.

## Limites

L'explorateur peut ne pas voir le contenu ajouté après coup par JavaScript (du code qui s'exécute dans la page). Un audit explore au plus 10 000 pages. La mesure de vitesse est une mesure de laboratoire de Google, pas des données de vrais visiteurs. L'audit ne modifie rien sur votre site. La correction, c'est à vous ou à votre assistant de la faire.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
