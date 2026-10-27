---
title: Tableau de bord
description: Le premier écran à l'ouverture du projet : les chiffres de recherche des 28 derniers jours, l'état de la configuration, vos tâches et le résumé du dernier audit, au même endroit.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

C'est le premier écran d'un projet. Il montre l'état actuel de votre site et ce qu'il faut faire ensuite.

Les chiffres de recherche viennent de Google Search Console. Les chiffres de visiteurs viennent de Google Analytics. Le résumé de l'audit vient de l'explorateur de site de l'application elle-même. Le bouton **Actualiser** en haut met tout à jour. Si le projet a au moins un audit, un bouton **Démarrer l'audit** apparaît à côté et vous mène à l'écran d'audit. Sous le titre figure le nom de domaine du projet.

## Ce que l'écran affiche

**Quatre cartes de chiffres.** **Clics**, **Impressions**, **CTR** et **Position moyenne** couvrent les 28 derniers jours. Chaque carte a une flèche par rapport aux 28 jours précédents. Pour la position moyenne, un petit nombre est bon, car 1 est la première place. Si le nombre baisse, c'est donc une bonne nouvelle et la flèche est colorée en conséquence. Si Search Console n'est pas connecté, la carte indique « S'affiche une fois connecté ». S'il est connecté mais qu'il n'y a eu aucune impression sur la période, la carte le dit.

**Étapes suivantes.** À côté du titre, une étiquette indique l'état de la configuration : « Configuration 4 / 6 » ou, si tout est fait, « Configuration terminée ». Six éléments sont comptés : Search Console, Analytics, un audit récent, la définition du projet, la clé PageSpeed et l'agent IA. Les mêmes six éléments figurent sur l'écran **Contexte du projet**, les deux écrans montrent donc le même nombre. Un audit récent est un audit du site même du projet, terminé dans les sept derniers jours. L'audit d'un autre site ne compte pas. Ce qui manque est listé dans la ligne « Manque dans la configuration : ... », et le lien **Compléter** à côté mène à l'écran Contexte du projet. La configuration ne dit rien du site lui-même. C'est seulement une liste de choses à faire.

L'application propose trois tâches au plus. L'ordre est le suivant :

- Si Search Console n'est pas connecté : **Connecter la Search Console** (bouton : **Connecter**). Si la clé d'accès Google n'a pas encore été saisie, un avertissement remplace cette ligne : « Clé d'accès Google manquante » avec un bouton **Saisissez la clé d'accès Google dans les Paramètres**.
- S'il n'y a aucun audit : **Lancez votre premier audit** (bouton : **Démarrer**). La liste s'arrête ici.
- Si le dernier audit a échoué : **Relancer l'audit** (bouton : **Relancer**). En dessous figurent la cause, si le défaut vient du site ou de l'application, et ce qu'il faut faire. Si un audit est en cours : **Audit en cours** (bouton : **Afficher la progression**).
- S'il y a des problèmes critiques : « N problèmes critiques » (bouton : **Afficher**).
- Si Search Console est connecté : **Examiner les opportunités** (bouton : **Ouvrir**).
- Si le dernier audit date de plus de sept jours : **Actualiser l'audit** (bouton : **Démarrer**).
- S'il y a des avertissements : « N avertissements » (bouton : **Afficher**).

Quand une tâche est faite, elle quitte la liste. Si la liste est vide, il est écrit « Rien d'urgent. L'audit est à jour et il n'y a aucun problème critique. »

**Nouveau lors du dernier audit** et **Corrigé**. Cette carte n'apparaît que lorsqu'elle a quelque chose à dire. Si le dernier audit date de plus de sept jours, elle dit combien de jours se sont écoulés depuis et propose un bouton **Démarrer l'audit**. Si des problèmes ont changé entre les deux derniers audits, deux listes apparaissent. **Nouveau lors du dernier audit** montre quels problèmes ont été vus pour la première fois, **Corrigé** lesquels ont été fermés. Si rien n'a été corrigé, la carte indique qu'aucun problème n'a été résolu. S'il n'y a ni l'un ni l'autre, la carte n'apparaît pas du tout.

**Tendance des clics.** Une courbe des clics quotidiens des 28 derniers jours. Elle donne le total, l'évolution par rapport à la période précédente et le jour le plus fort. S'il y a moins de quatre jours de données, aucune courbe n'est tracée. Le lien sous le graphique ouvre l'écran **Performances de recherche**.

**Requêtes proches du top trois.** Les recherches dont la position moyenne est entre 4 et 20 et qui ont assez d'impressions sont ici. La carte dit combien de clics en plus elles pourraient apporter ensemble si chacune montait d'un cran. C'est un plafond. Chaque ligne montre la position de la recherche et le gain possible. Un clic sur une ligne ouvre cette recherche dans l'écran Performances de recherche. **Afficher tout** ouvre l'onglet Opportunités de classement de l'écran Performances de recherche. Si aucune recherche n'a assez d'impressions, la carte le dit.

**Carte Audit du site.** Elle montre combien de pages ont été explorées et à quelle date, les problèmes les plus fréquents et les pages qui ont le plus de problèmes. Pendant qu'un audit tourne, elle indique que l'audit est en cours et que les résultats apparaîtront à la fin, et la carte se met à jour toutes les cinq secondes. Si l'audit n'a pas pu se terminer, elle dit qu'il n'y a donc aucun résultat. Si aucun problème n'a été trouvé, elle dit que votre site semble en bonne santé. Sous les problèmes, une barre montre les niveaux de gravité. Le point d'interrogation explique les trois niveaux : les problèmes critiques peuvent empêcher une page d'apparaître dans la recherche, les avertissements érodent le classement avec le temps, les informations sont de petites améliorations. Un clic sur la barre ou sur l'une des étiquettes en dessous mène à la liste des problèmes. Tout en bas, la liste **Pages avec le plus de problèmes**. S'il n'y a aucun audit, cette carte n'apparaît pas, car « Étapes suivantes » propose déjà le premier audit. **Détails** ouvre l'onglet des pages présentant des problèmes de l'audit.

**Carte du trafic organique.** Elle apparaît si Google Analytics est connecté. Pour les visiteurs venus de la recherche, elle montre les **Sessions**, les **Utilisateurs actifs**, le **Taux d'engagement** et l'**Événements clés**. Si le site mesure des ventes, le chiffre d'affaires organique et les **Transactions** s'y ajoutent. En haut de la carte, **Rapports** ouvre l'écran Analytics et **Gérer** les réglages de connexion Analytics. Une note en bas dit qu'Analytics a 1 jour de retard et Search Console 3 jours. C'est pourquoi les jours de cette carte diffèrent des tuiles de clics du haut. Si Analytics n'est pas connecté, une invitation à le connecter prend la place de la carte. Si vous la fermez, elle ne revient pas.

Si la carte ne peut pas lire les données, elle affiche une phrase qui donne la cause et la solution, et propose deux boutons : **Réparer la connexion** (ouvre les réglages Analytics) et **Réessayer**. Les causes principales sont les suivantes :

- La connexion a expiré ou a été révoquée. Reconnectez-la dans **Paramètres**.
- Le compte connecté n'accède plus à la propriété. Donnez au compte ou au compte de service au moins le rôle Lecteur sur la propriété.
- La propriété a été supprimée ou déplacée. Choisissez-la de nouveau dans **Paramètres**.
- Aucune propriété Analytics n'est connectée à ce projet. Choisissez-en une dans **Paramètres**.
- Le quota de rapports est épuisé. Le quota se renouvelle chaque heure et chaque jour, réessayez plus tard.
- La Google Analytics Data API est désactivée dans votre projet Google Cloud. Activez « Google Analytics Data API » dans la Google Cloud Console.
- Google est injoignable. Vérifiez la connexion internet de cet ordinateur.
- Google ne répond pas pour le moment. Réessayez dans un instant.

Si la carte n'a aucune session organique, elle indique qu'aucun trafic de recherche organique n'a été enregistré sur cette plage. Rien n'est cassé. Il n'y a pas eu de visites issues de la recherche sur cette période.

**Configurez votre espace de travail.** Tout en bas, les étapes de configuration à faire sont dans une boîte repliée. Les étapes : ajouter votre site, ajouter vos autres sites, connecter votre agent IA, connecter Search Console et décrire le projet. Il est écrit « N étapes restantes. Tout est facultatif ». Vous repoussez une étape avec **Passer pour l'instant**. Les étapes repoussées et terminées sont comptées sous la boîte, et **Rétablir** les remet. Quand tout est fait, la boîte disparaît.

## Comment l'utiliser

1. Ouvrez-le une fois par semaine et regardez les flèches des quatre cartes.
2. Faites la première tâche de la boîte **Étapes suivantes**. Si la boîte est vide, rien n'est urgent.
3. Si l'étiquette de configuration montre un manque, cliquez sur **Compléter**. Les éléments manquants se règlent vite.
4. Si le dernier audit date de plus de sept jours, cliquez sur **Démarrer l'audit**.
5. Revoyez le titre et la description des pages de la carte **Requêtes proches du top trois**. Le gain le plus facile est souvent là.
6. Si la carte **Nouveau lors du dernier audit** et **Corrigé** apparaît, donnez la priorité aux problèmes vus pour la première fois. Vous voyez le changement d'une semaine d'un coup d'œil.

## Comment les chiffres sont calculés

Les quatre cartes viennent d'un seul rapport Search Console. Google fournit les données avec trois jours de retard. La plage de 28 jours se termine donc non pas aujourd'hui mais trois jours avant. La période précédente, ce sont les 28 jours juste avant cette plage. Si la période précédente est à zéro, aucune flèche n'est affichée.

Dans la position moyenne, les recherches qui ont beaucoup d'impressions pèsent davantage. Ces quatre nombres sont les vrais totaux du site. Si vous additionnez les lignes du tableau de l'écran **Performances de recherche**, vous obtenez un nombre plus grand, car Google compte séparément chaque page qui apparaît pour la même recherche.

Le gain de la carte **Requêtes proches du top trois** est un plafond. Ce sont les clics en plus que chaque recherche obtiendrait si elle montait d'un cran. Le même calcul sert dans l'écran Opportunités. Les deux écrans donnent le même chiffre.

L'étiquette de configuration est un nombre, pas un pourcentage ni un score. Elle montre combien des six éléments sont faits.

## Questions fréquentes

**Pourquoi n'y a-t-il pas de données pour aujourd'hui ?** Google n'a pas encore fourni les trois derniers jours. Ce n'est pas une panne.

**La position moyenne a augmenté. Est-ce bon ?** Non. Passer de 3 à 7 est une baisse. C'est pourquoi la flèche devient rouge.

**La carte d'audit montre-t-elle ce que Google voit ?** Non. Elle montre ce qu'a trouvé l'exploration de l'application elle-même. Les pages que Google a indexées se voient dans l'onglet **État de l'indexation** de l'écran d'audit.

**Il n'y a pas de carte de trafic organique.** Google Analytics n'est pas connecté dans les réglages du projet, ou vous avez fermé la carte. Le connecter est facultatif.

**Pourquoi la configuration indique-t-elle 5 / 6 alors que je croyais tout avoir fait ?** La ligne « Manque dans la configuration » dit quel élément manque. Le plus souvent, c'est une clé PageSpeed ou un audit des sept derniers jours.

**La carte Analytics affiche une erreur.** La phrase de la carte donne la cause. Le plus souvent, renouveler la connexion dans **Paramètres** suffit.

## Limites

Le tableau de bord n'affiche ni volume de recherche, ni backlinks (liens vers vous venant d'autres sites), ni position des concurrents. Ces données ne sont pas dans l'application. Search Console masque les requêtes très rarement recherchées. Pour le détail, passez à l'écran concerné.

<!-- Sources : src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
