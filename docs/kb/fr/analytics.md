---
title: Analytics
description: Ce que font sur le site les visiteurs venus de la recherche : rapports Google Analytics 4, événements clés et vérification que la mesure fonctionne.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Vous voyez ici ce que font ensuite les personnes qui arrivent sur le site. Search Console vous dit ce qui se passe sur Google. Analytics vous dit ce que fait le visiteur sur le site.

Vous voyez sept rapports de votre compte Google Analytics 4. Par défaut, l'écran n'affiche que les visiteurs venus de la recherche (recherche organique). Le huitième onglet vérifie la mesure elle-même : le compteur fonctionne-t-il, un événement clé est-il défini.

## Ce que l'écran affiche

**Onglets.** **Pages de destination**, **Pages et écrans**, **Acquisition du trafic**, **Événements clés**, **E-commerce**, **Recherche sur le site**, **Audience** et **État des mesures**. Une courte question est écrite sous chaque onglet. Une page d'entrée est la première page où le visiteur arrive sur le site. Un événement clé est une action que vous jugez importante.

**Commandes.** Pour **Période**, on choisit 7 derniers jours, 28 derniers jours ou 3 derniers mois. Pour **Canal**, on choisit Organik arama (Recherche organique, par défaut) ou Tüm trafik (Tout le trafic). **Lignes** vaut 50, 100 ou 200. Dans l'onglet Audience, on choisit **Appareil**, **Pays** et **Nouveaux / connus**. Dans l'onglet Trafic, on choisit **Groupe de canaux**, **Source / support** et **Campagne**. Vos choix sont inscrits dans la barre d'adresse.

**Panneau des sessions organiques.** Dans l'onglet Pages d'entrée, il se trouve au-dessus du tableau. Une session est une visite entière. Le panneau comporte la courbe des sessions quotidiennes et les cartes **Sessions** et **Taux d'engagement**. Si le revenu est mesuré, **Revenus organiques** apparaît aussi. Toutes montrent aussi la variation par rapport à la période précédente.

**Tableau.** Les colonnes changent selon le rapport. Par exemple **Domaine**, **Page de destination**, **Page**, **Nom de l'événement**, **Canal**, **Appareil**, **Pays**, **Article**, **Terme de recherche**. Les mesures sont : **Sessions**, **Utilisateurs actifs**, **Taux d'engagement**, **Événements clés**, **Revenus**, **Vues**. Si aucun événement clé n'est défini, la valeur reste toujours à 0.

**Ligne sous le tableau.** Elle indique combien de lignes sont affichées. Si Google a échantillonné les données, « échantillonné » est ajouté ; s'il a masqué des lignes pour des raisons de confidentialité, « lignes inférieures aux seuils masquées » est ajouté.

**Filtres rapides.** **Organique uniquement**, **Engagement faible** (sous 50 pour cent), **Qui convertissent**, **Avec revenus**, **Durée d'engagement faible**, **Trafic élevé, faible conversion**.

**Cartes de synthèse.** Les onglets Événements clés, E-commerce et Recherche interne ont chacun leurs cartes de synthèse.

**Onglet État de la mesure.** Il comporte quatre cartes : **Flux de données Web**, **Événements clés**, **Dimensions personnalisées**, **Constats**. Le constat peut être l'un de ceux-ci : « Aucun flux de données Web », « Mesure améliorée désactivée », « La recherche sur site n'est pas mesurée », « Aucun événement clé configuré », « L'inventaire est peut-être incomplet ». Les sept options de la mesure améliorée apparaissent une à une : Défilements, Clics sortants, Recherche sur le site, Vidéo, Téléchargements de fichiers, Form, Changements de page. S'il n'y a aucun problème, l'écran indique « Rien ne manque dans la configuration de mesure. ».

**États vides.** S'il n'y a pas de données, l'écran indique « Aucune donnée au cours de cette période » et deux raccourcis apparaissent : **Afficher tout le trafic**, **Vérifier l'état des mesures**. Si Analytics n'est pas connecté, il indique « Google Analytics n'est pas connecté ».

## Comment l'utiliser

1. Regardez d'abord l'onglet **État des mesures**. S'il indique « Aucun événement clé configuré », les colonnes de conversion restent toujours à zéro. Définissez d'abord un événement clé dans Analytics.
2. Dans l'onglet **Pages de destination**, regardez la colonne **Domaine**. Si vous voyez localhost ou 127.0.0.1, c'est qu'un site de test sur votre propre ordinateur envoie des données. Ces lignes ne sont pas de vraies visites. L'application ne les écarte pas à votre place.
3. Si le trafic a baissé, ouvrez l'onglet **Acquisition du trafic** avec **Groupe de canaux**. Si la baisse ne concerne que la recherche, le problème est dans la recherche. Si elle touche tous les canaux, le problème est dans la mesure ou dans le site.
4. Le bouton **Trafic élevé, faible conversion** montre les endroits où Google envoie des visiteurs mais où la page ne parvient pas à les retenir. Le travail à faire se trouve dans l'écran Opportunités.

## Comment les chiffres sont calculés

La plage se termine hier, dans le fuseau horaire du compte. Analytics fournit les données avec un jour de retard. Quand « Recherche organique » est choisi, seules les visites venues de Google ou d'un autre moteur de recherche sont comptées.

Chaque rapport demande 200 lignes au maximum. L'état de la mesure lit les réglages d'Analytics et ne consomme rien du quota de rapports. Si le quota de rapports est épuisé, vous voyez l'erreur « Google Analytics reporting quota is exhausted. » (le quota de rapports d'Analytics est épuisé). Vous suivez votre quota dans la section des limites de **Paramètres**.

## Questions fréquentes

**Pourquoi le nombre de sessions diffère-t-il des clics de Search Console ?** Les deux ne comptent pas la même chose. Search Console compte les clics sur Google. Analytics compte les sessions qui arrivent sur le site. Un visiteur qui n'accepte pas les cookies n'apparaît jamais dans Analytics.

**Le nombre de lignes reste bloqué à 200.** On demande au plus 200 lignes à la fois. Raccourcissez la période ou changez la ventilation.

**Pourquoi le quota est-il épuisé ?** Un compte standard reçoit 200 000 jetons (l'unité de quota) par jour et 40 000 par heure. Chaque rapport consomme quelques jetons. Appuyer sans arrêt sur **Actualiser** épuise le quota.

## Limites

Ce qu'Analytics ne mesure pas, cet écran ne peut pas l'afficher non plus. Cela inclut les visites sans accord pour les cookies, les événements clés non définis et la mesure améliorée désactivée. L'écran n'écarte pas tout seul le trafic localhost. Analytics et Search Console rapportent dans des fuseaux horaires différents. Les correspondances quotidiennes peuvent se décaler d'un jour.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
