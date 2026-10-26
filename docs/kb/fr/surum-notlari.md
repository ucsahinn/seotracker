---
title: Notes de version
description: seowatcher 0.8.0 Alpha — un audit du site refait avec 201 règles, des résultats honnêtes, des tâches classées par trafic et l’interface en six langues.
updated: 2026-10-26
---

La dernière version est la **0.8.0 Alpha**, du 26 octobre 2026. Vos données sont conservées lors de la mise à jour.

Pour passer de 2.x à 0.x.x Alpha, lancez le nouvel installateur manuellement ; l’ancien outil ne reconnaît pas le numéro inférieur comme plus récent.

## 0.8.0 Alpha — 2026-10-26

- **Audit du site entièrement refait:** 201 règles examinent les pages et le site dans son ensemble, avec notamment les en-têtes de sécurité, les enregistrements d’e-mail et de domaine, l’expiration du SSL et du domaine, l’accès des robots d’IA et les résultats de Lighthouse.
- **Des résultats honnêtes:** une vérification impossible à mesurer n’est plus comptée comme « réussie », et un sondage qui n’a pas pu s’exécuter ne produit aucun constat. Quand les données manquent, l’écran le dit clairement.
- **Ordre des tâches:** les corrections sont classées selon votre trafic Search Console, et le score est pondéré par catégorie.
- **Nouvel écran et nouveau rapport:** onglets Vérifications et Instantané, aperçus de recherche et de partage, historique du score et rapport téléchargeable repensé.
- **Interface en six langues:** l’allemand, le français, l’italien et le portugais (Brésil) sont arrivés. Avec le turc et l’anglais, toute l’application est disponible en six langues.

### Audit du site

- **Vérifications à l’échelle du site:** les en-têtes de sécurité (comme HSTS), les redirections, la réponse à une page inexistante, le fichier robots.txt, les enregistrements SPF et DMARC et les dates d’expiration du certificat SSL et du domaine sont interrogés une seule fois au début de l’audit. Chacun produit un seul constat.
- **Robots d’IA:** l’audit vérifie si votre robots.txt bloque des robots d’IA comme GPTBot, ClaudeBot et PerplexityBot, et si vous avez un fichier llms.txt.
- **Résultats de Lighthouse:** quand la mesure de vitesse est activée, les audits de Lighthouse sont listés comme problèmes, chacun avec son gain estimé.
- **Liens externes et images:** en option, l’audit vérifie si les liens externes s’ouvrent et si les images sont plus lourdes que nécessaire.
- **Plus de règles:** 201 règles au total, avec des signaux de page et plus de 20 nouveaux constats. Le sens de chaque règle et la façon de la corriger sont expliqués dans le guide Règles d’audit.
- **À faire:** les points à corriger sont classés selon le trafic Search Console. Si Search Console n’est pas connecté, le classement ne tient compte que de l’effet sur le score.
- **Vérifications et Instantané:** l’onglet Vérifications liste aussi les vérifications réussies et celles qui n’ont pas pu être mesurées. L’onglet Instantané montre les informations du site mesurées pendant l’audit et, si elles existent, les Core Web Vitals.
- **Aperçus:** aperçu du résultat de recherche Google, de la carte de partage (Open Graph) et de l’affichage mobile.
- **Historique et rapport:** l’historique du score montre l’évolution entre les audits. Le rapport téléchargeable a été repensé.

### Autres fonctionnalités

- **Langue de l’interface:** choisissez l’une des six langues dans Paramètres → Apparence → Langue; les nombres et les dates suivent votre choix.
- **Aide à l’installation:** les différences entre le paquet Windows et Docker, par exemple où se trouvent les réglages et lesquels s’appliquent, sont expliquées clairement dans le guide et dans l’Aide.
- **Outils pour agents:** le nouvel outil `get_audit_summary` renvoie en un seul appel le score du site, les scores par catégorie, la liste ordonnée des tâches et l’instantané du site.
- **Guide:** la page Règles d’audit décrit les 201 règles une par une; le guide et les notes de version sont disponibles en six langues.
- **seowatcher.io · confidentialité:** sur le site web, Google Analytics 4 ne fonctionne que si un identifiant de mesure est défini et que vous choisissez Accepter; rien n’est envoyé à Google avant votre accord. La page de confidentialité existe en six langues.

### Corrections

- **Fiabilité de l’audit:** neuf causes de résultats erronés ont été corrigées après la comparaison d’audits avec des mesures sur de vrais sites.
- **Audit · téléphone:** l’écran d’audit et le rapport téléchargé ne débordent plus sur téléphone.

## 0.7.1 Alpha — 2026-10-26

- **Annonces:** les annonces en direct apparaissent sur l’écran Annonces de l’application. Elles sont rédigées en turc et en anglais ; les autres langues de l’interface affichent la version anglaise. Préparez et publiez les textes depuis la page d’administration protégée par mot de passe.
- **Tableau de bord:** La section « Prochaines étapes » du tableau de bord propose des tâches guidées et un score de préparation basé sur les connexions Google, un audit récent, le contexte du projet et la configuration de l’agent. Ce score mesure l’état de préparation, pas les performances SEO ni les classements.
- **Rapports d’agents:** Les rapports des agents s’appuient désormais sur une liste de vérification couvrant l’audit et PageSpeed, Search Console, les opportunités, l’historique des classements, les mots-clés enregistrés, Analytics, la couverture de l’index et les sitemaps afin de proposer des améliorations prioritaires.
- **Notifications:** Le centre de notifications rassemble les résultats d’audit, les nouvelles versions, les problèmes de connexion Google et les mises à jour des rapports. Les sons et les alertes sur le bureau disposent de réglages distincts.
- **Notifications Windows:** Les mises à jour et les annonces en direct apparaissent dans le centre de notifications Windows si l’option est activée. Le réglage se trouve dans Paramètres → Notifications.
- **Démarrage Windows:** Au démarrage de Windows, une fenêtre de progression affiche la préparation du serveur ; le pourcentage réel s’affiche pendant le téléchargement d’une mise à jour.
- **Paramètres Windows:** Dans Paramètres → Windows, choisissez si l’application démarre avec Windows et si les mises à jour s’installent automatiquement. L’application précise lorsqu’un réglage est limité par les droits d’administrateur.
- **Audit du site:** Suivez le temps écoulé et la progression d’un audit, puis consultez son résumé à la fin. L’application affiche aussi la progression pendant la préparation d’un rapport ou la recherche de mises à jour.
- **Nouveau projet:** Sur téléphone, la liste des pays du formulaire de création de projet n’est plus tronquée. La touche Échap ferme d’abord la liste et laisse le formulaire ouvert.
- **Aide · Diagnostic :** les audits échoués indiquent l’étape d’arrêt, un message expurgé et les erreurs PageSpeed les plus fréquentes. Les URL des pages sont retirées des résumés exportés.
- **Mises à jour de sécurité:** Des correctifs de sécurité ont été appliqués aux dépendances de l’application.

## 0.4.3 Alpha — 2026-10-23

- **Installation Windows:** installez l’application sous Windows avec un seul programme d’installation, sans Docker ni terminal. Il apporte les composants manquants : l’application s’ouvre dès le premier lancement, même sur un ordinateur neuf, crée les clés nécessaires, prépare sa base de données et ouvre le navigateur. Elle se gère depuis l’icône de la barre des tâches ; la désinstallation ne supprime pas vos données.
- **Mises à jour Windows:** l’entrée « Mise à jour » du menu de la barre des tâches est toujours là. Elle télécharge, vérifie et installe la nouvelle version, et affiche la vérification, le pourcentage de téléchargement et l’étape d’installation. Vous pouvez activer l’installation automatique.
- **Windows · Autoréparation:** si le serveur s’arrête de façon inattendue, l’application le relance. Les fichiers journaux ne grossissent plus.
- **Aide · Diagnostic:** la réparation de l’installation peut résoudre les problèmes de démarrage. « Signaler un problème » ouvre un ticket prérempli; le nom d’utilisateur, les noms de site et les e-mails sont masqués dans le rapport de diagnostic.
- **Première utilisation:** dans Configuration de l’agent, « Installer depuis zéro » est en haut, avec une seule carte et un seul bouton de copie pour Claude Code, Codex et les autres assistants. Les paramètres expliquent la connexion Google en trois étapes.
- **Retour d’information:** enregistrer, supprimer et se connecter indiquent ce qui se passe pendant l’attente, à la fin et en cas d’erreur. Supprimer et déconnecter demandent d’abord une confirmation.
- **Apparence:** le menu, les paramètres et les écrans de première utilisation ont été simplifiés, et plus de deux cents textes d’écran ont été réécrits en turc naturel. Le thème sombre est celui par défaut; les thèmes clair et sombre sont cohérents avec le site.
- **Guide utilisateur et site:** seowatcher.io et le guide utilisateur de 20 pages sont disponibles en six langues. Les pages de dépannage utilisent des encadrés Symptôme, Cause et Solution.
- **Connexion Google:** la fausse alerte « clé d’accès Google manquante » affichée quand seul un compte de service est connecté a été corrigée. Les erreurs venant de Google renvoient maintenant à la connexion Google.
- **Analytics:** les noms d’appareil, de canal et de pays s’affichent en turc, les montants de revenus indiquent leur devise, et les pourcentages de variation ont le même format partout.
- **Audit · Opportunités:** le débordement horizontal sur téléphone dans l’audit du site et dans Opportunités a été supprimé.

## 0.2.1 Alpha — 2026-10-04

- **Toutes vos données dans une seule application:** les données de Search Console, d’Analytics, de l’audit du site et de PageSpeed sont réunies dans une seule application, sur votre propre ordinateur. Vous pouvez consulter les problèmes du site, les pages concernées, les résultats de vitesse et l’historique des audits.
- **Suivi et rapports:** suivez les performances de recherche et le classement des mots-clés enregistrés, et repérez les pistes d’amélioration. Téléchargez et imprimez les rapports d’audit, et gardez-les dans la même liste que les rapports de vos agents. Thèmes clair et sombre, utilisation au clavier et prise en charge des lecteurs d’écran sont inclus.
- **Configuration de l’agent:** si vous venez de télécharger le dépôt, collez dans votre agent l’invite d’installation de l’écran Configuration de l’agent; elle vérifie tour à tour Docker, la connexion Google, la clé PageSpeed, le projet et la connexion de l’agent. Elle ne vous demande jamais de coller des secrets dans la conversation. La même invite se trouve aussi dans les actions rapides de l’Aide.
- **Prise en charge de Codex:** Configuration de l’agent propose des consignes distinctes pour Codex; il se connecte en une commande, installe les compétences SEO et les vérifie par un vrai appel.
- **Limites de Google et du système:** votre quota quotidien d’inspections d’URL, votre quota Analytics, le nombre de mesures de vitesse du jour et les limites de rapport apparaissent sur les écrans concernés. Seuls les chiffres réellement connus sont affichés, chacun avec sa source et son heure.
- **Vue en direct:** la progression de l’audit montre l’exploration et la mesure de vitesse avec des barres séparées et une estimation du temps restant. Si la réduction des animations est activée, aucune animation ne se joue.
- **Audit:** les audits interrompus ne bloquent plus définitivement les nouveaux audits, et les audits terminés ne remplissent plus la capacité. Un agent qui lit un audit en cours voit « audit en cours » au lieu de « aucun problème ».
- **Audit · calculs:** la profondeur des pages, la couverture du sitemap et la détection des pages orphelines sont calculées plus précisément. Des adresses d’apparence proche mais différentes (http et https, www, barre oblique finale) comptent désormais comme différentes dans la comparaison de l’adresse canonique, ce qui peut révéler de vrais écarts auparavant masqués.
- **Projets · Google:** les données d’un ancien projet ne se mélangent plus quand le compte ou la propriété Google change. Retirer un compte ne supprime que les données des projets de ce compte.
- **Paramètres · Google:** le client Google saisi dans les paramètres sert aussi au renouvellement de l’accès; le problème qui demandait de se reconnecter au bout d’environ une heure est corrigé. Les paramètres expliquent quelle connexion Google est utilisée.
- **Rapports:** un rapport téléchargé s’ouvre toujours avec ses propres règles de protection, si bien qu’une page malveillante ne peut pas s’exécuter avant elles.

## Numéros de version

seowatcher utilise des numéros 0.x Alpha jusqu’à la 1.0. Une nouvelle fonctionnalité visible augmente le deuxième numéro (0.7.1 → 0.8.0); une version qui ne contient que des corrections augmente le dernier (0.7.0 → 0.7.1). Les versions 0.0.0 à 0.4.3 ont d’abord été publiées avec des étiquettes v2.x; la correspondance figure dans le tableau au début de [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

L'historique complet se trouve dans [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) sur GitHub.
