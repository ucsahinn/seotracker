# Notes de version

Fonctionnalités, corrections et autres changements, de la version la plus récente à la plus ancienne.

## [Yayınlanmamış] — paraîtra en 0.8.0 Alpha

Modifications préparées depuis la version 0.7.1 et pas encore publiées. Le jour de la publication, ce titre est remplacé par le numéro de version et la date.

### Points forts

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
- **Score:** le score est calculé avec une pondération par catégorie.
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
- **Notifications :** les fenêtres système de Windows et du navigateur sont désactivées. Les annonces s’affichent dans la fenêtre de l’application tant qu’elle est visible et restent dans l’historique des notifications en arrière-plan. Les alertes importantes peuvent jouer le son de l’application.

### Corrections

- **Fiabilité de l’audit:** neuf causes de résultats erronés ont été corrigées après la comparaison d’audits avec des mesures sur de vrais sites.
- **Audit · téléphone:** l’écran d’audit et le rapport téléchargé ne débordent plus sur téléphone.

## [0.7.1] Alpha — 2026-10-26

### Corrections

- **Annonces :** le flux fournit désormais un texte anglais de remplacement pour les champs de langue supplémentaires attendus par la version 0.7.0.
- **Aide · Diagnostic :** les audits échoués indiquent leur étape d’arrêt, un message expurgé et les erreurs PageSpeed les plus fréquentes. Les URL des pages sont retirées des résumés exportés.

## [0.7.0] Alpha — 2026-10-25

### Fonctionnalités

- **Démarrage Windows:** Au démarrage de Windows, une fenêtre de progression affiche la préparation du serveur ; le pourcentage réel s’affiche pendant le téléchargement d’une mise à jour.
- **Notifications Windows:** Les mises à jour et les annonces en direct apparaissent dans le centre de notifications Windows si l’option est activée. Le réglage se trouve dans Paramètres → Notifications.
- **Annonces:** Les annonces sont rédigées en turc et en anglais. Les autres langues de l’interface affichent la version anglaise.

## [0.6.0] Alpha — 2026-10-24

### Fonctionnalités

- **Annonces:** Les annonces en direct apparaissent dans l’application. Préparez et publiez des messages bilingues depuis la page d’administration protégée par mot de passe.
- **Tableau de bord:** La section « Prochaines étapes » du tableau de bord propose des tâches guidées et un score de préparation basé sur les connexions Google, un audit récent, le contexte du projet et la configuration de l’agent. Ce score mesure l’état de préparation, pas les performances SEO ni les classements.
- **Rapports d’agents:** Les rapports des agents s’appuient désormais sur une liste de vérification couvrant l’audit et PageSpeed, Search Console, les opportunités, l’historique des classements, les mots-clés enregistrés, Analytics, la couverture de l’index et les sitemaps afin de proposer des améliorations prioritaires.
- **Navigation:** Le lien de marque dans la navigation sur ordinateur et mobile ouvre seowatcher.io.

### Corrections

- **Rapports d’agents:** Les consignes des rapports demandent aux agents d’indiquer les sources de données disponibles et de signaler les données manquantes.
- **Navigation:** La zone de marque dans la navigation compacte tient maintenant sans débordement.

### Sécurité

- **Annonces:** L’accès inter-origines est désactivé pour l’API d’administration ; le flux public autorise uniquement la consultation des annonces.

## [0.5.0] Alpha — 2026-10-23

### Fonctionnalités

- **Langue:** Utilisez l’interface en turc ou en anglais. La langue choisie dans Paramètres → Apparence → Langue modifie également l’affichage des nombres et des dates.
- **Notifications:** Le centre de notifications rassemble les résultats d’audit, les nouvelles versions, les problèmes de connexion Google et les mises à jour des rapports. Les sons et les alertes sur le bureau disposent de réglages distincts.
- **Notes de version:** Les notes de version ont leur propre entrée dans la barre latérale, au-dessus des notifications. Des étiquettes colorées indiquent les fonctionnalités, corrections et changements de sécurité de chaque version.
- **Paramètres Windows:** Dans Paramètres → Windows, choisissez si l’application démarre avec Windows et si les mises à jour s’installent automatiquement. L’application précise lorsqu’un réglage est limité par les droits d’administrateur.
- **Audit du site:** Suivez le temps écoulé et la progression d’un audit, puis consultez son résumé à la fin. L’application affiche aussi la progression pendant la préparation d’un rapport ou la recherche de mises à jour.
- **Aide:** Ouvrez le guide correspondant depuis le titre de n’importe quel écran.

### Corrections

- **Nouveau projet:** Sur téléphone, la liste des pays du formulaire de création de projet n’est plus tronquée. La touche Échap ferme d’abord la liste et laisse le formulaire ouvert.
- **Aide:** Les longs messages d’aide tiennent dans les petites fenêtres et les fenêtres compactes.
- **Paramètres:** Les paramètres mettent maintenant correctement en évidence la section sélectionnée. Les commandes Windows disposent de zones tactiles plus grandes.
- **État de l’index:** Les vérifications d’index simultanées utilisent plus précisément le quota quotidien. Les résultats obtenus sont conservés si une autre vérification du groupe échoue.

### Sécurité

- **Mises à jour de sécurité:** Des correctifs de sécurité ont été appliqués aux dépendances de l’application.

### Avant la mise à jour

Lors du premier passage de la version 2.x à la série Alpha 0.x, lancez manuellement le nouveau programme d’installation Windows. L’ancien outil de mise à jour ne considère pas un numéro de version inférieur comme plus récent. Vos données et vos connexions Google sont conservées.

## [0.4.3] Alpha — 2026-10-22

Toutes les versions intermédiaires depuis la 0.3.0 sont regroupées dans cette version.

### Fonctionnalités

- **Installation Windows:** le programme d’installation apporte les composants manquants, si bien que l’application s’ouvre dès le premier lancement, même sur un ordinateur neuf. Le nom du fichier et l’assistant indiquent la version installée; la désinstallation ne supprime pas vos données.
- **Mises à jour Windows:** l’entrée « Mise à jour » du menu de la barre des tâches est toujours là. Elle télécharge, vérifie et installe la nouvelle version, et affiche la vérification, le pourcentage de téléchargement et l’étape d’installation. Vous pouvez activer l’installation automatique.
- **Windows · Autoréparation:** si le serveur s’arrête de façon inattendue, l’application le relance. Les fichiers journaux ne grossissent plus.
- **Aide · Diagnostic:** la réparation de l’installation peut résoudre les problèmes de démarrage. « Signaler un problème » ouvre un ticket prérempli; le nom d’utilisateur, les noms de site et les e-mails sont masqués dans le rapport de diagnostic.
- **Première utilisation:** dans Configuration de l’agent, « Installer depuis zéro » est en haut, avec une seule carte et un seul bouton de copie pour Claude Code, Codex et les autres assistants. Les paramètres expliquent la connexion Google en trois étapes.
- **Retour d’information:** enregistrer, supprimer et se connecter indiquent ce qui se passe pendant l’attente, à la fin et en cas d’erreur. Supprimer et déconnecter demandent d’abord une confirmation.
- **Apparence:** le menu, les paramètres et les écrans de première utilisation ont été simplifiés, et plus de deux cents textes d’écran ont été réécrits en turc naturel. Le thème sombre est celui par défaut; les thèmes clair et sombre sont cohérents avec le site.
- **Windows et Docker:** l’aide et les consignes pour agents reconnaissent les deux installations. Elles parlent de la barre des tâches sous Windows et des commandes `docker compose` avec Docker.
- **Guide utilisateur et site:** seowatcher.io et le guide utilisateur de 20 pages sont disponibles en six langues. Les pages de dépannage utilisent des encadrés Symptôme, Cause et Solution.

### Corrections

- **Audit · Opportunités:** le débordement horizontal sur téléphone dans l’audit du site et dans Opportunités a été supprimé.
- **Connexion Google:** la fausse alerte « clé d’accès Google manquante » affichée quand seul un compte de service est connecté a été corrigée. Les erreurs venant de Google renvoient maintenant à la connexion Google.
- **Analytics:** les noms d’appareil, de canal et de pays s’affichent en turc, les montants de revenus indiquent leur devise, et les pourcentages de variation ont le même format partout.
- **Site · téléchargements:** le lien de téléchargement pointe vers la bonne version. Une adresse inconnue ouvre un écran « Page introuvable » avec un lien de retour au tableau de bord, au lieu d’une page vide.

## [0.3.0] Alpha — 2026-10-21

### Fonctionnalités

- **Installation Windows:** installez l’application sous Windows avec un seul programme d’installation, sans Docker ni terminal. Au premier lancement, l’application crée les clés nécessaires, prépare sa base de données et ouvre le navigateur; vous la gérez depuis l’icône de la barre des tâches. La désinstallation ne supprime pas vos données.
- **Site:** retrouvez sur seowatcher.io les liens de téléchargement, les informations sur le produit et le guide utilisateur.
- **Guide utilisateur:** l’installation, les fonctionnalités, les compétences prêtes à l’emploi et les outils pour agents ont été réécrits, avec des captures d’écran de l’application.

### Corrections

- **Audit:** les nombres qui dépassaient de la carte de résumé des problèmes dans l’audit du site ont été corrigés.

## [0.2.1] Alpha — 2026-10-04

La version 0.2.0 a été fusionnée dans celle-ci. Elle sert surtout à corriger des erreurs; vos données sont conservées lors de la mise à jour.

### Fonctionnalités

- **Configuration de l’agent:** si vous venez de télécharger le dépôt, collez dans votre agent l’invite d’installation de l’écran Configuration de l’agent; elle vérifie tour à tour Docker, la connexion Google, la clé PageSpeed, le projet et la connexion de l’agent. Elle ne vous demande jamais de coller des secrets dans la conversation. La même invite se trouve aussi dans les actions rapides de l’Aide.

### Corrections

- **Paramètres · Google:** le client Google saisi dans les paramètres sert aussi au renouvellement de l’accès; le problème qui demandait de se reconnecter au bout d’environ une heure est corrigé. Les paramètres expliquent quelle connexion Google est utilisée.
- **Audit:** les résultats réussis précédents, mesures de vitesse comprises, sont conservés quand un audit est interrompu ou relancé.
- **Audit · calculs:** la profondeur des pages, la couverture du sitemap et la détection des pages orphelines sont calculées plus précisément. Des adresses d’apparence proche mais différentes (http et https, www, barre oblique finale) comptent désormais comme différentes dans la comparaison de l’adresse canonique, ce qui peut révéler de vrais écarts auparavant masqués.
- **Projets · Google:** les données d’un ancien projet ne se mélangent plus quand le compte ou la propriété Google change. Retirer un compte ne supprime que les données des projets de ce compte.
- **Analytics:** la carte de quota affiche l’usage exact (« 231 / 200 000 »). Les tailles de rapport utilisent la même unité partout. Les colonnes de l’historique d’audit précisent qu’elles sont « pour cent pages ».
- **Mots-clés enregistrés · CSV:** l’ordre des mots-clés enregistrés et l’ouverture dans Excel des fichiers CSV contenant des caractères turcs ont été corrigés. Plus de 500 requêtes peuvent être enregistrées d’un coup.
- **Formulaires · erreurs:** si une actualisation en arrière-plan échoue, ce que vous avez saisi dans un formulaire ouvert est conservé. Les messages d’erreur disent ce qui s’est passé et ce que vous pouvez faire ensuite.
- **Configuration de l’agent:** les consignes de connexion pour Windows et Git Bash ainsi que la commande Codex ont été corrigées. Les descriptions des outils précisent désormais que l’enregistrement de mots-clés et l’écriture des informations du projet s’exécutent sans demander de confirmation.

### Sécurité

- **Rapports:** un rapport téléchargé s’ouvre toujours avec ses propres règles de protection, si bien qu’une page malveillante ne peut pas s’exécuter avant elles.
- **Adresses analysées:** le domaine avec et sans www est vérifié séparément avant l’analyse. Un nom d’utilisateur et un mot de passe écrits dans une adresse sont refusés et masqués à l’écran.
- **Docker:** la clé de chiffrement et le mot de passe MCP sont écrits de façon sûre; une clé existante n’est jamais écrasée.

## [0.1.0] Alpha — 2026-10-02

### Fonctionnalités

- **Prise en charge de Codex:** Configuration de l’agent propose des consignes distinctes pour Codex; il se connecte en une commande, installe les compétences SEO et les vérifie par un vrai appel.
- **Limites de Google et du système:** votre quota quotidien d’inspections d’URL, votre quota Analytics, le nombre de mesures de vitesse du jour et les limites de rapport apparaissent sur les écrans concernés. Seuls les chiffres réellement connus sont affichés, chacun avec sa source et son heure.
- **Actions rapides:** les écrans principaux ont un bouton Actualiser, l’heure de la dernière mise à jour et le raccourci r.
- **Vue en direct:** la progression de l’audit montre l’exploration et la mesure de vitesse avec des barres séparées et une estimation du temps restant. Si la réduction des animations est activée, aucune animation ne se joue.
- **Aide:** la revérification de l’état, le paquet de diagnostic, la documentation et les notes de version sont réunis dans une seule barre. Les problèmes courants couvrent Docker, un port occupé, le mot de passe MCP, la limite PageSpeed et l’absence de données de requêtes.
- **Paramètres:** accès rapide entre les sections, pastille d’état sur chaque section et bouton Tester la clé pour la clé PageSpeed.

### Corrections

- **Audit:** les audits interrompus ne bloquent plus définitivement les nouveaux audits, et les audits terminés ne remplissent plus la capacité. Un agent qui lit un audit en cours voit « audit en cours » au lieu de « aucun problème ».
- **Projets · Google:** les filtres et résultats du projet précédent ne restent plus à l’écran quand vous changez de projet. Changer la propriété Search Console ou se déconnecter ne mélange plus l’historique de deux propriétés. Opportunités, Suivi du classement et Analytics ne gardent plus d’anciennes données quand la connexion Google change.
- **Mots-clés enregistrés:** la recherche avec des caractères turcs (« çay », « istanbul »), l’export et l’estimation du temps restant ont été corrigés.
- **Paramètres:** le formulaire n’est plus masqué quand le client Google vient d’une variable d’environnement, et le format de l’identifiant client Google est vérifié. Une vérification de mise à jour échouée n’affiche plus « à jour ».
- **Suppression · déconnexion:** supprimer et retirer la connexion Google, y compris supprimer des identifiants, demandent une confirmation.
- **Champ de recherche · presse-papiers:** le champ de recherche n’ajoute plus d’entrée d’historique à chaque frappe et ne perd plus de lettres. La copie dans le presse-papiers fonctionne aussi sur les adresses non sécurisées.
