---
title: Rapports et modèles
description: Conserver les rapports d’audit, de recherche et de votre assistant en fichiers HTML. Les ouvrir sur mobile, les imprimer ou les partager par e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-28
---

Chaque rapport est un document HTML unique enregistré dans le projet. Ouvrir un rapport n’actualise pas les données Google, et la date d’enregistrement n’est pas la période mesurée dans le rapport.

## Trois façons de préparer un rapport

- **Préparer un rapport de recherche** ouvre Performances de recherche. Choisissez la période, l’appareil, le pays et le type de recherche, puis cliquez sur **Télécharger le rapport**.
- **Préparer un rapport d’audit** ouvre Audit du site. Choisissez un audit et téléchargez son rapport.
- **Copier l’invite du rapport** copie le texte à coller dans votre agent. L’agent examine le projet et enregistre le rapport ici.

Le rapport est enregistré avant d’être téléchargé : si le téléchargement échoue, vous pouvez le relancer depuis la liste. Les rapports enregistrés s’ouvrent même si la connexion Google est rompue.

## Modèles

Un modèle est une consigne qui indique à l’agent comment rédiger un rapport : à qui il s’adresse et de quelles sections il se compose. Un modèle ne produit pas de rapport tout seul et ne se programme pas.

- Le nom compte au plus 80 caractères, la description 200, la consigne 3 000.
- Un projet compte au plus dix modèles.
- Supprimer un modèle ne supprime pas les rapports rédigés avec lui.

## Liste des rapports

En haut de la liste, la carte **Rapport enregistré** présente le dernier rapport mis à jour : titre, résumé enregistré, date d’enregistrement, **Ouvrir le rapport** et **Télécharger au format HTML**. Cette carte ne décrit pas l’état actuel du site. Si le site d’origine du rapport peut être vérifié, la carte indique « Site source » ; s’il diffère du site du projet, un avertissement apparaît. S’il ne peut pas être vérifié, la carte signale que le rapport peut concerner un autre site.

**Rechercher des rapports** cherche dans les titres et les résumés. Les boutons de type (**Rapport de performances de recherche**, **Rapport d’audit du site**, **Rapports écrits par votre agent**, etc.) affichent le nombre de rapports restant après la recherche et le filtre **7 derniers jours**. Ce filtre retient les fichiers créés ou modifiés au cours des sept derniers jours ; il ne dit rien de la fraîcheur des données Google.

La liste se charge par pages de 25 ; utilisez **Page précédente** et **Page suivante**. Le tri par défaut suit la dernière mise à jour : un ancien rapport mis à jour remonte donc en tête. Vous pouvez aussi trier par date de création ou par titre. La recherche, le type, le filtre, le tri et la page sont conservés dans la barre d’adresse.

Si le projet n’a encore aucun rapport, la liste est remplacée par des liens pour préparer le premier. Si des rapports ne sont masqués que par un filtre, **Effacer les filtres** apparaît.

### Anciens rapports

Les documents de recherche et d’audit produits par d’anciennes versions portent le même marqueur de créateur et n’ont pas de type enregistré. Ils sont listés avec l’étiquette **Ancien rapport · source et date non vérifiées**. Leur type et leur période ne sont pas déduits du titre : vérifiez la période dans le document. L’identifiant technique ajouté au titre de ces rapports est masqué dans la liste ; le fichier enregistré n’est pas modifié.

Les nouveaux rapports ont un type enregistré. Un rapport de recherche est identifié par la propriété, les dates exactes et les filtres ; un rapport d’audit par l’identifiant de l’audit.

## Ouvrir, télécharger, imprimer

Le rapport s’ouvre dans un cadre sécurisé, sans accès réseau ni scripts. **Informations sur la source et l’enregistrement** indique le créateur, le type, la taille et les dates d’enregistrement. La taille est le nombre d’octets du HTML enregistré.

- **Télécharger au format HTML** enregistre un fichier lisible sans connexion internet.
- **Enregistrer au format PDF (imprimer)** ouvre l’impression du navigateur. Si l’onglet est bloqué, autorisez les fenêtres contextuelles, ou ouvrez le rapport avec **Ouvrir dans un nouvel onglet** et imprimez depuis cet onglet.
- Le mode plein écran affiche le rapport sur tout l’écran, avec un bouton de sortie en haut et en bas.

Le lien d’un rapport ne fonctionne que dans cette installation. Pour partager un rapport, envoyez le fichier HTML.

Si l’aperçu ne s’ouvre pas en 15 secondes, **Réessayer** et **Ouvrir dans un nouvel onglet** sont proposés. Si la liste ne peut pas être actualisée, les derniers enregistrements reçus restent affichés avec un avertissement.

## Préparer de nouveau

Un rapport garde la langue et les données de son enregistrement. Pour des données à jour ou une autre langue, préparez-le de nouveau depuis son écran source. Un rapport préparé de nouveau à partir de la même source met à jour le même enregistrement.

Les agents ne peuvent pas modifier avec `save_report` les rapports produits par l’application. Un rapport d’agent qui porte le même titre qu’un rapport existant est refusé, et l’ancien document est conservé.

**Ouvrir les audits du site** ouvre l’historique des audits, d’où vous pouvez télécharger le rapport d’un audit. Ce lien ne lance ni audit ni rapport.

## Contenu du rapport de recherche

La couverture indique la période réelle retenue, la période de comparaison, les filtres et l’heure de création. Les jours suivent l’heure du Pacifique. Si Google n’a pas fourni de limite de finalisation, le rapport précise que les derniers jours ont été exclus par hypothèse.

Les données sont relues chez Google au moment de la préparation. Comme Google peut corriger des valeurs passées, le rapport peut différer des chiffres vus plus tôt à l’écran.

- La part des clics non listés couvre à la fois les requêtes masquées par Google et les lignes au-delà de la limite.
- Les tableaux par requête, par page et par couple requête–page ont une limite de lignes : le total du site n’est pas la somme de ces tableaux.
- L’analyse des chevauchements indique sa propre période et ses seuils, même sans résultat. Dans un rapport de sept jours, elle peut s’appuyer sur 28 jours de données. Plusieurs pages sur une même requête ne prouvent pas à elles seules une perte de clics.
- Une donnée non récupérée n’est jamais présentée comme un zéro. Les listes raccourcies indiquent le nombre d’éléments observés et la part affichée.

## Contenu du rapport d’audit

La section méthode du rapport d’audit indique les dates de l’exploration, de la mesure de vitesse et des données Google facultatives. Elle précise aussi la période de trafic Search Console utilisée, la limite de lignes de la source et la mesure CrUX mobile enregistrée (données de vitesse de vrais utilisateurs). Une source manquante n’est jamais comptée comme zéro.

## Limites de stockage

- Un rapport pèse au plus 500 000 octets. Le titre compte au plus 120 caractères, le résumé 2 500.
- Un projet conserve au plus 10 000 rapports, et l’installation au plus 5 Go de rapports.

Ces limites protègent le disque ; elles ne disent rien de la réussite SEO.
