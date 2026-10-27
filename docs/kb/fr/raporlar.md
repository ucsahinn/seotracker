---
title: Rapports et modèles
description: Chaque rapport que vous téléchargez depuis un audit ou depuis les performances de recherche, ou que votre assistant écrit, est un seul fichier HTML. Vous l'ouvrez sur un téléphone, l'imprimez ou l'envoyez par e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Vous trouvez ici comment obtenir un rapport, à qui l'envoyer et comment le répéter avec un modèle.

L'écran **Rapports** garde tous les rapports faits pour ce projet dans une seule liste. Un rapport naît de trois façons. Le bouton **Télécharger le rapport** de l'écran **Audit du site** produit le rapport de l'audit. Le bouton **Télécharger le rapport** de l'écran **Performances de recherche** produit un rapport de la vue affichée. Votre assistant d'IA peut aussi faire des recherches et enregistrer ses résultats sous forme de rapport. Chaque rapport est un seul fichier HTML sans script (code qui s'exécute dans la page), sans ressource externe ni police intégrée. Il s'ouvre donc sur un téléphone, s'imprime en PDF et s'envoie par e-mail. L'application n'a pas d'éditeur pour écrire un rapport à la main : c'est l'application ou l'assistant qui l'écrit.

## Ce que l'écran affiche

**Barre du haut.** Les boutons **Actualiser**, **Copier l'invite du rapport** et **Modèles**. **Copier l'invite du rapport** place dans le presse-papiers un texte que vous collez dans votre assistant. S'il n'y a pas encore de rapport, ce bouton est dans la carte de l'état vide.

**Tuiles de synthèse.** Il y en a trois.

- **Dernier rapport** : depuis combien de temps le dernier rapport a été écrit ou mis à jour. Le lien en dessous ouvre le rapport.
- **Ces 7 derniers jours** : le nombre de rapports écrits ou mis à jour sur cette durée.
- **Total** : tous les rapports. En dessous, on voit combien sont des rapports d'audit, combien viennent d'une compétence et combien d'un modèle.

**Rapports par type.** Un graphique en anneau répartit les rapports par type. Un clic sur un type réduit la liste aux rapports de ce type. Un nouveau clic retire le filtre.

**Comment ça marche ?** Une courte explication, repliée au départ. Elle explique la différence entre les rapports écrits par l'agent et le rapport d'audit du site.

**Filtres.** Tous, 7 derniers jours, Écrit avec un modèle, Écrit avec une compétence. À côté se trouve la zone **Rechercher des rapports**.

**Tableau.** Il a les colonnes **Rapports**, **Type**, **Créé** et **Taille**. Cliquez sur un en-tête pour trier. **Type** dit d'où vient le rapport. Par exemple, « Rapport d'audit du site » est fait par l'application elle-même. Ce que l'assistant écrit porte des noms comme « Audit SEO », « Comparaison de périodes », « Revue des baisses de trafic », « Rapport SEO », « Note de coaching » ou « Configuration du projet ». Un rapport dont le type n'est pas connu indique « Non spécifié ». Pour les rapports écrits avec un modèle, le nom du modèle apparaît. La liste montre les 100 derniers rapports. S'il y en a davantage, une note en dessous le dit.

**Page du rapport.** Le rapport s'ouvre dans son propre cadre isolé. Boutons : **Télécharger au format HTML**, **Enregistrer au format PDF (imprimer)**, **Ouvrir dans un nouvel onglet**. Le menu **Plus d'actions** contient **Copier le lien**. Le lien ne fonctionne que sur cette installation, personne ne peut y accéder de l'extérieur. La page indique aussi qui a créé le rapport, son type, sa date de création et de mise à jour et sa taille.

**Modèles de rapport.** Vous y accédez par le bouton **Modèles**. Un modèle est une recette enregistrée qui dit à votre assistant comment écrire le rapport : qui le lira, quelles sections il aura et dans quelle langue il sera écrit. Il y a trois champs :

- **Nom** : 80 caractères au plus, unique dans le projet.
- **Description** : 200 caractères au plus. Une phrase qui dit quand l'utiliser.
- **Instruction** : 3 000 caractères au plus.

Un projet peut avoir 10 modèles au plus. Supprimer un modèle ne supprime pas les rapports qui en sont issus.

## Les rapports propres à l'application

**Rapport d'audit du site.** Produit par **Télécharger le rapport** dans le détail de l'audit. Si l'audit s'est arrêté à mi-chemin, « (partiel) » est ajouté au titre du rapport. Par exemple « Audit du site exemple.fr (partiel) ». La couverture d'un tel rapport porte l'avertissement « Le rapport est peut-être incomplet. » et la raison : l'audit s'est arrêté sur une erreur, il est toujours en cours ou aucune page n'a pu être explorée. Un rapport partiel n'a pas de sections de score. Si l'exploration s'est arrêtée prématurément en raison de la limite de débit du site, la couverture indique « Audit incomplet, aucun score attribué ». Si peu de vérifications ont été mesurées, le score s'écrit « Score provisoire » avec la couverture des mesures. Le résumé du rapport indique aussi la situation. C'est ainsi qu'un assistant qui lit la liste des rapports sait qu'un rapport est incomplet.

**Rapport de performances de recherche.** Produit par **Télécharger le rapport** sur l'écran Performances de recherche. Il transforme la vue que vous regardez à l'écran (période, appareil, pays, type de recherche) en un document imprimable. La couverture donne les jours définitifs, la comparaison, les filtres, la date des dernières données et l'heure de création. Viennent ensuite les quatre totaux, le cadre « État des données », les travaux sous **Commencez par celles-ci**, le graphique **Dans le temps** (avec les mises à jour de Google et les notes marquées), les opportunités, les évolutions et les pages en compétition pour la même requête. Les chiffres sont les mêmes qu'à l'écran. Le reprendre avec le même site, la même plage de dates et les mêmes filtres n'ajoute pas de nouveau rapport. Il met à jour le rapport précédent de l'application. Si le rapport dépasse la limite de stockage, on vous demande de choisir une période ou un filtre plus court.

Les deux rapports sont d'abord enregistrés, puis téléchargés sur votre ordinateur. Si le téléchargement échoue pour une raison quelconque, le rapport reste dans la liste **Rapports**. Téléchargez-le de là.

## Comment l'utiliser

1. Pour un premier rapport, cliquez sur **Télécharger le rapport** sur l'écran Audit du site. Le rapport se télécharge sur votre ordinateur et apparaît aussi dans cette liste. Il commence par la section « N choses à faire cette semaine ».
2. Pour documenter votre situation de recherche, réglez la période et les filtres sur l'écran Performances de recherche, puis cliquez sur **Télécharger le rapport**.
3. Si vous travaillez avec un assistant, cliquez sur **Copier l'invite du rapport**. Collez le texte copié dans Claude Code, Codex ou Cursor. L'assistant demande quel rapport vous voulez, lit les données et enregistre le rapport ici.
4. Si vous voulez le même rapport chaque mois, écrivez un modèle. Dans l'instruction, indiquez le lecteur (« la personne qui gère le site, ne connaît pas le SEO »), les sections, l'ordre et le ton. Si vous demandez le modèle par son nom, l'assistant l'applique.
5. Pour partager, cliquez sur **Télécharger au format HTML** et envoyez le fichier. Le destinataire ouvre le fichier dans un navigateur. Un lien copié ne marche que sur le même ordinateur.
6. Ne supprimez pas les anciens rapports. À la conversation suivante, l'assistant lit le résumé du rapport précédent et compare.

## Comment les chiffres sont calculés

Le rapport d'audit est mis en page pour une impression A4. Il contient le sommaire, « N choses à faire cette semaine », les problèmes, la mesure de vitesse, l'état de l'index Google et le plan du site. La section sur l'état de l'index n'utilise que des réponses enregistrées et ne pose pas de nouvelle question à Google.

Les listes sont limitées : 50 adresses par problème, 300 pages, 50 lignes de vitesse, 3 000 adresses en annexe. Si le fichier dépasse 400 Ko, les listes sont raccourcies.

Un rapport peut faire 500 000 octets au plus (moins de 80 Ko est recommandé). Le titre fait 120 caractères au plus et est unique dans le projet. Le résumé fait 2 500 caractères au plus. Un second rapport avec le même titre n'est pas accepté. Un projet peut avoir 10 000 rapports au plus, et l'installation réserve 5 Go au total.

Par sécurité, à l'enregistrement, les fichiers qui contiennent un script, un iframe (une boîte qui intègre une page dans une autre), un formulaire, une feuille de style externe, un gestionnaire d'événement (comme onclick), un lien javascript: ou une redirection automatique sont refusés. À l'ouverture, le rapport est de plus affiché dans un cadre scellé, sans accès au réseau. Un rapport ne peut donc rien envoyer vers l'extérieur à votre insu.

## Questions fréquentes

**Qui a écrit le rapport ?** La colonne **Type** le dit. « Rapport d'audit du site » vient de l'application, tous les autres de l'assistant. La page du rapport montre aussi qui l'a enregistré.

**Le titre indique « (partiel) », que faire ?** L'audit s'est arrêté à mi-chemin. La couverture du rapport en donne la raison. Relancez l'audit et téléchargez de nouveau le rapport.

**Puis-je modifier le rapport ?** Pas dans l'application. Dites à l'assistant « change cette section », il met le rapport à jour.

**J'ai envoyé le lien, mais le destinataire ne peut pas l'ouvrir.** Le lien ne marche que sur cet ordinateur. Envoyez le fichier avec **Télécharger au format HTML**.

**À quoi faire attention en écrivant un modèle ?** Un modèle est une recette de forme, pas une source d'information. Écrivez les sections, le ton et pour qui le rapport est écrit. N'y mettez ni chiffre ni affirmation. L'assistant prend les chiffres dans les données à chaque fois.

## Limites

Les rapports ne sont jamais publiés à l'extérieur. Pour partager, vous envoyez le fichier. Un rapport n'est exact que dans la mesure des données lues par son auteur. La section « Comment ce rapport a été préparé » à la fin des rapports de l'assistant indique quel outil a fourni quelle information. Pour un chiffre dont vous doutez, remontez à sa source par là.

<!-- Sources : src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
