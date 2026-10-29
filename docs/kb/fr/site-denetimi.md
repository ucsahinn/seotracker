---
title: Audit du site
description: Vérifier votre site avec 202 règles et traiter les problèmes par priorité. Comprendre le score, la couverture des mesures et les résultats incomplets.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-28
---

Cet écran trouve les problèmes de votre site et vous dit comment les corriger.

L'application parcourt votre site avec son propre explorateur (un programme qui ouvre les pages une à une et les lit). Elle cherche les liens cassés, les titres manquants et les pages lentes. À la fin, vous obtenez un score et une liste de problèmes classés par importance, chacun avec la façon de le corriger. Le score montre aussi combien de vérifications ont pu être mesurées. Un audit arrêté à mi-chemin n'a pas de score.

## Ce que l'écran affiche

**Carte « Démarrer un nouvel audit ».** Elle comporte ces champs.

- **Le champ d'adresse du site** : le nom de domaine de votre projet est déjà rempli.
- **Explorer jusqu'à N pages** : au moins 10, au plus 10 000, 50 par défaut. Si vous saisissez plus de 500, l'application demande une confirmation.
- **Mesurer aussi la vitesse des pages** : désactivé par défaut. Si vous l'activez, chaque page est mesurée sur téléphone et sur ordinateur. La mesure est faite par Google Lighthouse (l'outil de mesure des pages de Google). La carte indique à l'avance le temps minimal que cela prendra.
- **Vérifier aussi les liens sortants et le poids des images** : après l'exploration, elle vérifie si les liens vers d'autres sites s'ouvrent et quel poids ont vos images. 300 adresses au plus sont interrogées. Les sites qui bloquent les robots sont ignorés.

Si vous n'avez pas de clé PageSpeed (le code gratuit que Google fournit pour la mesure de vitesse), la mesure de vitesse est limitée à 50 pages. Pour tout mesurer, ajoutez une clé gratuite dans **Paramètres**. **Démarrer l'audit** lance l'audit. La section **Quotas** en dessous est repliée. Dépliez-la pour voir l'état actuel des quotas PageSpeed et d'inspection d'URL.

**Audits précédents.** La date, l'adresse, l'état, le nombre de pages et le nombre de problèmes de chaque audit sont listés. Les colonnes Critique, Avertissement et Info affichent tous les constats enregistrés, y compris ceux des pages et les contrôles du site entier ; une page peut avoir plusieurs constats. Si plusieurs sites ont été audités dans le projet, un sélecteur de site apparaît au-dessus de la liste. La densité correspond aux problèmes pour cent pages. Les courbes et les flèches de variation apparaissent uniquement si les données enregistrées confirment le même site, le même ensemble de pages, les mêmes paramètres d’exploration et les mêmes contrôles mesurés. Si les périmètres diffèrent ou sont inconnus, les nombres restent indépendants ; la variation ne peut pas être déterminée. Quand plusieurs sites sont sélectionnés, le graphique est masqué. **Afficher** sur une ligne ouvre l'audit. Le menu de la ligne propose **Relancer avec les mêmes paramètres** et **Supprimer l'audit**. Supprimer efface aussi les pages, les problèmes et les mesures de vitesse de l'audit, et ne peut pas être annulé.

**Détail de l'audit.** En haut, **Télécharger le rapport** télécharge un rapport HTML d'un seul fichier et l'enregistre dans **Rapports**. En dessous, des avertissements jaunes apparaissent au besoin (voir plus bas). Vient ensuite la carte du score.

**Carte du score.** Elle montre ceci.

- Au centre, le **Score du site** et à côté un mot d'appréciation : **Excellent**, **Bon**, **Moyenne** ou **Médiocre**.
- En dessous, la ligne de couverture : « Score fondé sur les 142 contrôles mesurés. 38 contrôles n'ont pas pu être mesurés. » Le point d'interrogation à côté explique comment le score est calculé.
- Une phrase d'appréciation. Si le score est retenu à une limite, elle en donne la raison.
- **Adresses trouvées : N, explorées : M**. Combien d'adresses l'exploration a trouvées sur le site et combien elle en a ouvertes. Si l'audit s'est arrêté à la limite de pages que vous aviez choisie, une note indique « L'audit était limité à N pages ; le site peut en compter davantage. » Le score reste valable dans ce cas.
- Des lignes pour les catégories lourdes qui n'ont pas pu être mesurées. Par exemple « Vitesse non mesuré : le quota PageSpeed était épuisé ».
- Quatre compteurs : **Problèmes critiques**, **Améliorations** (avertissements et informations), **Vérifications réussies** et **Non mesuré**.
- **Scores par catégorie** : Exploration, Contenu, Indexation, Vitesse, Sécurité, Accessibilité, Réseaux sociaux et données structurées. La plus basse est en haut. Un clic sur une catégorie ouvre l'onglet **Vérifications** sur cette catégorie. Une catégorie où rien n'a pu être mesuré indique « Non mesuré ». Une catégorie mesurée en partie indique « Données partielles ».
- **Historique du score** : les scores des derniers audits du même site. Il apparaît dès que deux audits ont un score. Les barres grises sont des scores provisoires. Les audits sans score ne figurent pas sur le graphique, et une ligne en dessous dit combien il y en a.

**Onglets.**

- **À faire (N)** : les travaux, en commençant par celui qui rapporte le plus de points. Chaque travail indique les points que vous gagnez, une étiquette « Petite tâche », « Tâche moyenne » ou « Grosse tâche » et une boîte **Comment le corriger**. Si Search Console est connecté, l'ordre tient aussi compte des clics des pages concernées.
- **Vérifications (N)** : toutes les vérifications, par catégorie. Chacune apparaît comme réussie, échouée ou non mesurée. Pour les non mesurées, la raison est écrite.
- **Instantané** : le site au-delà de ses pages. Par exemple le certificat, l'enregistrement du nom de domaine, le DNS et un aperçu du site.
- **Pages présentant des problèmes (N)** : regroupe les problèmes. Ouvrez une carte pour voir la cause, les adresses concernées et la boîte **Comment le corriger**. Vous pouvez chercher dans les adresses.
- **Pages (N)** : chaque page explorée. Filtres rapides : **Indexation bloquée**, **Lent** (plus d'une seconde), **Texte alternatif manquant**, **Absente du sitemap**.
- **État de l'indexation** : la réponse de Google pour chaque page. Elle est décrite dans un guide à part. Si le site audité n'appartient pas à la propriété Search Console du projet, cet onglet n'affiche pas de données Google et l'écran en explique la raison.
- **Vitesse (N)** : n'apparaît que si la mesure de vitesse était activée. Si certaines pages n'ont pas pu être mesurées, le nombre s'écrit « 10/12 ».

Le menu **Exporter** en haut à droite donne la liste de l'onglet ouvert en **Exporter vers Google Sheets**, **CSV** ou **JSON**. Si un filtre est actif, seules les lignes visibles partent.

## Les trois états du score

**Score complet.** Quand la plus grande part des vérifications a été mesurée, il vient avec un mot d'appréciation. Lisez le score ainsi : à partir de 90 Excellent, à partir de 70 Bon, à partir de 50 Moyenne, en dessous Mauvais.

**Score provisoire.** Si la part de vérifications mesurées tombe sous 70 pour cent, le score est provisoire. C'est aussi le cas si moins de la moitié des vérifications d'Exploration, d'Indexation, de Contenu ou de Vitesse ont été mesurées. La carte indique « Score provisoire, couverture des mesures 62 % », ne donne aucun mot d'appréciation et reste de couleur neutre. Le nombre ne reflète que les vérifications qu'on a pu voir. Aucun jugement, bon ou mauvais, n'a été porté sur le reste. Les raisons habituelles sont celles-ci : le quota PageSpeed était épuisé, il n'y a pas de clé PageSpeed, la mesure de vitesse était désactivée ou les données d'index n'ont pas pu être récupérées dans Search Console.

**Aucun score attribué.** Dans ces cas, la carte indique « Audit incomplet, aucun score attribué » à la place du score.

- L'audit s'est arrêté sur une erreur.
- L'audit est toujours en cours.
- L'exploration s'est arrêtée prématurément en raison de la limite de débit du site. La liste des problèmes est incomplète, un score ne serait qu'une supposition.
- Aucune page n'a pu être explorée. Dans ce cas, la carte du score n'apparaît pas du tout.

Les constats sont tout de même affichés et valent pour les pages explorées. Pour un score complet, relancez l'audit.

## Si l'audit s'est arrêté, ce qui est écrit

Quand un audit échoue, l'écran dit trois choses : ce qui s'est passé, si le défaut vient de votre site ou de l'application, et ce que vous devez faire. Le titre indique la phase où il s'est arrêté : **découverte des URL**, **exploration**, **mesure de vitesse** ou **préparation des résultats**.

| Ce que dit l'écran                                                                                              | Côté                    | Que faire                                                                                                 |
| --------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Une étape n'a pas terminé à temps                                                                               | Probablement votre site | Réessayez dans quelques minutes. Si cela se reproduit, lancez avec moins de pages                         |
| L'audit ne tenait pas dans la mémoire de l'application                                                          | L'application           | Relancez avec moins de pages                                                                              |
| L'audit a dépassé le temps de processeur autorisé                                                               | L'application           | Relancez avec moins de pages                                                                              |
| Une erreur est survenue lors de l'écriture des résultats dans la base de données                                | L'application           | Vérifiez qu'il reste de la place sur le disque, redémarrez l'application et relancez l'audit              |
| Le résultat d'une étape dépassait la taille que l'application peut stocker                                      | L'application           | Relancez avec moins de pages                                                                              |
| Le moteur interne d'audit de l'application a signalé une erreur                                                 | L'application           | Choisissez **Yeniden başlat** (Redémarrer) dans le menu de la zone de notification, puis relancez l'audit |
| L'audit a été interrompu                                                                                        | L'application           | Laissez l'application ouverte et relancez l'audit                                                         |
| La clé d'installation n'est pas parvenue à la partie qui exécute les audits (vos clés n'ont pas été supprimées) | L'application           | Mettez l'application à jour ou redémarrez-la, puis relancez l'audit                                       |
| L'audit s'est arrêté sur une erreur inattendue                                                                  | Non déterminé           | Relancez. Si cela continue, téléchargez le package de diagnostics depuis **Aide**                         |

Le texte brut de l'erreur n'arrive pas à l'écran. Il reste dans le package de diagnostics.

## Avertissements jaunes pendant l'exploration

- **L'audit n'a pas pu explorer complètement ce site.** La protection anti-bots de votre site a arrêté l'explorateur. Les résultats sont tout de même affichés. Autorisez « seotracker-audit » dans votre pare-feu ou essayez l'un des explorateurs de bureau que le guide propose.
- **N pages n'ont pas pu être récupérées (erreur réseau).** La connexion n'a pas pu être établie, même à la nouvelle tentative. Ces pages n'ont pas été auditées et ne sont pas comptées comme cassées. C'est souvent passager. Relancez l'audit. Si cela continue, vérifiez que le site s'ouvre depuis cet ordinateur.
- **Le site a limité le débit sur N pages.** Le site a répondu « trop de requêtes ». Ces pages n'ont pas pu être auditées. Relancez quand la limite est réinitialisée.
- **L'exploration s'est arrêtée prématurément en raison de la limite de débit du site.** L'attente demandée dépassait la durée que l'audit peut prendre. Le rapport est incomplet et n'a pas de score.
- **La clé PageSpeed enregistrée n'a pas pu être lue ; la mesure de vitesse s'est faite sans clé.** L'audit est terminé, mais la mesure de vitesse s'est faite sans clé. Les résultats de l'exploration ne sont pas touchés. La mesure de vitesse s'est limitée aux premières pages. Mettez l'application à jour ou redémarrez-la, puis lancez un nouvel audit. Si cela continue, enregistrez de nouveau la clé PageSpeed dans **Paramètres**.

## Comment l'utiliser

1. Pour le premier audit, laissez le nombre de pages à 50. Gardez la mesure de vitesse désactivée. Cela se termine en une ou deux minutes. Avec la mesure de vitesse désactivée, le score peut sortir provisoire. C'est normal.
2. Lisez la ligne de couverture sur la carte du score. Si elle indique **Score provisoire**, les lignes en dessous donnent la raison.
3. Dans l'onglet **À faire**, commencez par les trois premiers travaux. Ils rapportent le plus de points pour le moins d'effort.
4. Dans l'onglet **Pages présentant des problèmes**, finissez d'abord les problèmes critiques. Un problème critique empêche Google de voir la page.
5. Récupérez la liste avec **Exporter** et donnez-la à la personne qui gère votre site. Vous pouvez transmettre telle quelle la boîte **Comment le corriger**.
6. Après correction, cliquez sur **Relancer avec les mêmes paramètres**. Les flèches de la liste **Audits précédents** et l'**Historique du score** montrent ce qui a été corrigé.
7. Activez la mesure de vitesse une fois par semaine, pour les pages importantes. Chaque page prend environ dix secondes et consomme du quota Google.

## Comment les chiffres sont calculés

**Score.** Chaque constat retire des points à sa catégorie. Combien, cela dépend de l'importance du constat et de la part de pages touchées. Les poids sont : critique 40, avertissement 15, information 3. Le score du site est la moyenne pondérée de sept catégories. Exploration et Indexation pèsent le plus, Réseaux sociaux et données structurées le moins. Une vérification qui n'a pas pu être mesurée ne relève ni n'abaisse le score. C'est pourquoi la couverture est montrée à part.

**Plafonds.** S'il y a ne serait-ce qu'un problème, le score vaut au plus 99. S'il y a un problème critique, au plus 69. Avec 5 avertissements ou plus, au plus 89. Ainsi, une seule page bloquée à l'indexation sur un grand site ne se cache pas sous un score élevé. Si un plafond retient le score, la carte l'écrit. Le « +N points » à côté d'un travail tient compte du plafond aussi. Corriger l'unique problème critique lève tout le plafond. Corriger un avertissement pendant qu'un plafond s'applique rapporte très peu.

**Exploration.** L'application ne fatigue pas votre site. Elle envoie au plus deux requêtes à la fois. Si le site répond « trop de requêtes » (429), elle attend. Si l'attente totale dépasse 30 minutes, l'exploration s'arrête et l'audit n'a pas de score.

**Mesure de vitesse.** Sur un site de 212 pages, l'audit entier a pris 35 minutes. Environ 24 de ces minutes étaient la mesure de vitesse. Si le quota quotidien est épuisé, la mesure s'arrête, les résultats obtenus restent et le score peut être provisoire. Un problème est écrit dans ces cas :

- Le contenu principal s'affiche après plus de 4 secondes (LCP).
- Le contenu se décale de plus de 0,25 (CLS).
- La réponse à un clic prend plus de 500 millisecondes (INP).
- Le score SEO de Lighthouse est inférieur à 90.

## Questions fréquentes

**L'audit montre-t-il ce que Google voit ?** Non. L'explorateur de l'application lit la page lui-même. La réponse de Google est dans l'onglet **État de l'indexation**.

**Le score est 98, pourquoi pas 100 ?** Un seul problème suffit à garder le score à 99 ou moins.

**Pourquoi mon score reste-t-il bloqué à 69 ?** Il y a un problème critique. Le score ne peut pas dépasser 69 tant que vous ne l'avez pas corrigé. La carte le dit.

**Pourquoi est-il écrit « Score provisoire » ?** Une grande part des vérifications n'a pas pu être mesurée. La ligne de couverture et les lignes en dessous donnent la raison. Activer la mesure de vitesse ou connecter Search Console augmente en général la couverture.

**Pourquoi « Audit incomplet » au lieu d'un score ?** L'audit s'est arrêté à mi-chemin ou trop tôt. La liste des problèmes est incomplète, donc pas de score. Relancez l'audit.

**Que veut dire l'avertissement « bloqué » ?** La protection anti-bots de votre site a arrêté l'explorateur. Autorisez « seotracker-audit » dans le pare-feu.

**La mesure de vitesse s'est arrêtée en route.** En général, il n'y a pas de clé PageSpeed ou le quota quotidien est épuisé. La carte des quotas dans **Paramètres** en donne la raison.

**Combien d'audits tournent en même temps ?** Trois au plus. Deux audits qui mesurent la vitesse se ralentissent l'un l'autre.

## Limites

L'explorateur peut ne pas voir le contenu que JavaScript (le code qui s'exécute dans la page) ajoute plus tard. Un audit explore 10 000 pages au plus. La mesure de vitesse est la mesure de laboratoire de Google, pas des données de vrais visiteurs. L'audit ne change rien sur votre site. Les corrections, c'est vous ou votre assistant qui les faites.

Dans les audits précédents, **Pages explorées** correspond aux adresses réellement explorées, même pour un audit échoué, et non à la limite initiale. Les colonnes Critique et Avertissement donnent le nombre total de problèmes. **Mesure de vitesse demandée** signifie que cette option était activée au démarrage ; cela ne prouve pas que la mesure a réussi. Sur téléphone, faites défiler le tableau horizontalement pour voir les autres colonnes et actions.

<!-- Sources : src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->

L’historique indique les constats critiques, les avertissements et les informations par page ; une page peut en avoir plusieurs. Les tâches terminées affichent la limite d’exploration enregistrée ou précisent son absence. Les détails du périmètre ouvrent les contrôles mesurés et non mesurés. Les audits en échec affichent l’explication enregistrée et la prochaine étape ; une cause inconnue est signalée explicitement.
