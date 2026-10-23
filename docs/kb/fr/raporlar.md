---
title: Rapports et modèles
description: Chaque rapport que vous téléchargez depuis un audit ou que vous faites rédiger par votre assistant est un seul fichier HTML. Vous l'ouvrez sur un téléphone, l'imprimez ou l'envoyez par e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Vous trouvez ici comment obtenir un rapport, à qui l'envoyer et comment le répéter avec un modèle.

Chaque rapport préparé pour ce projet se trouve dans une seule liste, dans l'écran **Raporlar** (Rapports). Un rapport arrive de deux façons. Le bouton **Raporu indir** (Télécharger le rapport) de l'écran Audit du site produit le rapport propre à l'application. Votre assistant IA peut aussi faire des recherches et enregistrer ses trouvailles sous forme de rapport. Chaque rapport est un seul fichier HTML. Il ne contient ni script (du code qui s'exécute dans la page), ni ressource externe, ni police intégrée. C'est pourquoi il s'ouvre sur un téléphone, s'imprime en PDF et s'envoie par e-mail. L'application n'a pas d'éditeur pour écrire un rapport à la main. Le rapport est écrit soit par l'application, soit par l'assistant.

## Ce que l'écran affiche

**Barre du haut.** Le bouton **Yeni rapor iste** (Demander un nouveau rapport) copie dans le presse-papiers un texte à coller dans votre assistant.

**Filtres.** Il y a les filtres Tümü (Tous), Son 7 gün (7 derniers jours), Şablonla yazılan (Rédigés avec un modèle) et Beceriyle yazılan (Rédigés avec une compétence). Une zone de recherche apparaît aussi.

**Tableau.** Les colonnes sont **Rapor** (Rapport), **Tür** (Type), **Oluşturulma** (Création) et **Boyut** (Taille). La colonne **Tür** indique quel travail a produit le rapport. Par exemple, « Site denetimi raporu » (Rapport d'audit du site) vient de l'application elle-même. Pour les rapports rédigés avec un modèle, vous voyez le nom du modèle.

**Page du rapport.** Le rapport s'ouvre dans son propre cadre sécurisé. Il y a trois boutons : **HTML olarak indir** (Télécharger en HTML), copier le lien et imprimer. Le lien ne s'ouvre que sur cette installation, personne ne peut y accéder de l'extérieur.

**Modèles de rapport.** Vous y accédez par le menu ou par l'écran Rapports. Un modèle est une recette enregistrée qui explique à votre assistant comment rédiger le rapport. Vous dites qui lira le rapport, quelles sections il contiendra et dans quelle langue il sera écrit. Il y a trois champs :

- **Ad** (Nom) fait 80 caractères au plus et doit être unique dans le projet.
- **Açıklama** (Description) fait 200 caractères au plus. Écrivez en une phrase quand utiliser le modèle.
- **Yönerge** (Consigne) fait 3 000 caractères au plus.

Un projet peut avoir 10 modèles au plus. Si vous supprimez un modèle, les rapports produits avec lui ne sont pas supprimés.

## Comment l'utiliser

1. Pour un premier rapport, cliquez sur **Raporu indir** dans l'écran Audit du site. Le rapport est téléchargé sur votre ordinateur et arrive dans cette liste. Il commence par la section « Bu hafta yapılacak N şey » (N choses à faire cette semaine).
2. Si vous travaillez avec un assistant, cliquez sur **Yeni rapor iste**. Collez le texte copié dans Claude Code, Codex ou Cursor. L'assistant vous demande quel rapport vous voulez, lit les données et enregistre le rapport ici.
3. Si vous voulez le même rapport chaque mois, écrivez un modèle. Dans la consigne, indiquez le lecteur (« la personne qui gère le site, ne connaît pas le SEO »), les sections, l'ordre et le ton. Quand vous demandez le modèle par son nom, l'assistant l'applique.
4. Pour partager, cliquez sur **HTML olarak indir** et envoyez le fichier. Le destinataire ouvre le fichier dans un navigateur. Copier le lien ne sert que sur le même ordinateur.
5. Ne supprimez pas les anciens rapports. À la conversation suivante, l'assistant lit le résumé du rapport précédent et compare.

## Comment les chiffres sont calculés

Le rapport d'audit est mis en page pour une impression A4. Il comprend les sections suivantes : table des matières, « Bu hafta yapılacak N şey », problèmes, mesure de vitesse, état de l'index Google et plan du site. La section sur l'état de l'index n'utilise que les réponses enregistrées et ne pose aucune nouvelle question à Google.

Les listes ont une limite : 50 adresses par problème, 300 pages, 50 lignes de vitesse, 3 000 adresses en annexe. Si le fichier dépasse 400 Ko, les listes sont raccourcies.

Un rapport peut faire 500 000 octets au plus (moins de 80 Ko est recommandé). Le titre fait 120 caractères au plus et est unique dans le projet. Le résumé fait 2 500 caractères au plus. Un second rapport avec le même titre n'est pas accepté. Un projet conserve 10 000 rapports au plus, et 5 Go d'espace au total sont réservés pour l'installation.

Côté sécurité, les fichiers qui contiennent un script, une iframe (un cadre qui intègre une autre page dans la page), un formulaire, une feuille de style externe, un gestionnaire d'événement (comme onclick), un lien javascript: ou une redirection automatique sont refusés à l'enregistrement. À l'ouverture, le rapport est aussi affiché dans un cadre isolé, sans accès au réseau. Un rapport ne peut donc rien envoyer à l'extérieur à votre insu.

## Questions fréquentes

**Qui a écrit le rapport ?** Regardez la colonne **Tür**. « Site denetimi raporu » est celui de l'application, les autres ont été écrits par l'assistant. La page du rapport montre aussi qui l'a enregistré.

**Puis-je modifier le rapport ?** Pas dans l'application. Dites à l'assistant « change cette section », et il met à jour le rapport.

**J'ai envoyé le lien, l'autre personne ne peut pas l'ouvrir.** Le lien ne fonctionne que sur cet ordinateur. Envoyez le fichier avec **HTML olarak indir**.

**À quoi faire attention en écrivant un modèle ?** Un modèle est une recette de forme, pas une source d'information. Écrivez les sections, le ton et le lecteur du rapport. N'écrivez ni chiffre ni affirmation. L'assistant prend les chiffres dans les données à chaque fois.

## Limites

Les rapports ne sont pas publiés à l'extérieur. Pour partager, vous envoyez le fichier. L'exactitude d'un rapport dépend des données lues par celui qui l'a écrit. À la fin des rapports de l'assistant, il y a une section « Bu rapor nasıl hazırlandı » (Comment ce rapport a été préparé). Vous y voyez quel outil a dit quoi. Si un chiffre vous semble douteux, suivez sa source à cet endroit.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
