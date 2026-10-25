# Notes de version

Fonctionnalités, corrections et autres changements, de la version la plus récente à la plus ancienne.

## [0.7.0] Alpha — 2026-10-25

### Fonctionnalités

- Au démarrage de Windows, une fenêtre de progression affiche la préparation du serveur ; le pourcentage réel s’affiche pendant le téléchargement d’une mise à jour.
- Les mises à jour et les annonces en direct apparaissent dans le centre de notifications Windows si l’option est activée. Le réglage se trouve dans Paramètres → Notifications.
- Les annonces en direct peuvent être rédigées en six langues et affichées dans la langue d’interface sélectionnée.

## [0.6.0] Alpha — 2026-10-24

### Fonctionnalités

- Les annonces en direct apparaissent dans l’application. Préparez et publiez des messages bilingues depuis la page d’administration protégée par mot de passe.
- La section « Prochaines étapes » du tableau de bord propose des tâches guidées et un score de préparation basé sur les connexions Google, un audit récent, le contexte du projet et la configuration de l’agent. Ce score mesure l’état de préparation, pas les performances SEO ni les classements.
- Les rapports des agents s’appuient désormais sur une liste de vérification couvrant l’audit et PageSpeed, Search Console, les opportunités, l’historique des classements, les mots-clés enregistrés, Analytics, la couverture de l’index et les sitemaps afin de proposer des améliorations prioritaires.
- Le lien de marque dans la navigation sur ordinateur et mobile ouvre seowatcher.io.

### Corrections

- Les consignes des rapports demandent aux agents d’indiquer les sources de données disponibles et de signaler les données manquantes.
- La zone de marque dans la navigation compacte tient maintenant sans débordement.

### Sécurité

- L’accès inter-origines est désactivé pour l’API d’administration ; le flux public autorise uniquement la consultation des annonces.

## [0.5.0] Alpha — 2026-10-23

### Fonctionnalités

- Utilisez l’interface en turc ou en anglais. La langue choisie dans Paramètres → Apparence → Langue modifie également l’affichage des nombres et des dates.
- Le centre de notifications rassemble les résultats d’audit, les nouvelles versions, les problèmes de connexion Google et les mises à jour des rapports. Les sons et les alertes sur le bureau disposent de réglages distincts.
- Les notes de version ont leur propre entrée dans la barre latérale, au-dessus des notifications. Des étiquettes colorées indiquent les fonctionnalités, corrections et changements de sécurité de chaque version.
- Dans Paramètres → Windows, choisissez si l’application démarre avec Windows et si les mises à jour s’installent automatiquement. L’application précise lorsqu’un réglage est limité par les droits d’administrateur.
- Suivez le temps écoulé et la progression d’un audit, puis consultez son résumé à la fin. L’application affiche aussi la progression pendant la préparation d’un rapport ou la recherche de mises à jour.
- Ouvrez le guide correspondant depuis le titre de n’importe quel écran.

### Corrections

- Sur téléphone, la liste des pays du formulaire de création de projet n’est plus tronquée. La touche Échap ferme d’abord la liste et laisse le formulaire ouvert.
- Les longs messages d’aide tiennent dans les petites fenêtres et les fenêtres compactes.
- Les paramètres mettent maintenant correctement en évidence la section sélectionnée. Les commandes Windows disposent de zones tactiles plus grandes.
- Les vérifications d’index simultanées utilisent plus précisément le quota quotidien. Les résultats obtenus sont conservés si une autre vérification du groupe échoue.

### Sécurité

- Des correctifs de sécurité ont été appliqués aux dépendances de l’application.

### Avant la mise à jour

Lors du premier passage de la version 2.x à la série Alpha 0.x, lancez manuellement le nouveau programme d’installation Windows. L’ancien outil de mise à jour ne considère pas un numéro de version inférieur comme plus récent. Vos données et vos connexions Google sont conservées.

## [0.4.3] Alpha — 2026-10-22

### Fonctionnalités

- Le programme d’installation Windows inclut les composants manquants : l’application peut ainsi démarrer sur un ordinateur neuf.
- Téléchargez les nouvelles versions depuis « Mise à jour » dans le menu de la barre des tâches. Vous pouvez également activer l’installation automatique.
- La réparation de l’installation peut résoudre les problèmes de démarrage. Les informations personnelles sont masquées dans les rapports de diagnostic lorsque vous signalez un problème.
- Les menus, les paramètres et les écrans de première utilisation sont plus simples. Les thèmes clair et sombre sont maintenant cohérents dans l’application et sur le site.
- Le guide utilisateur est disponible en six langues.

### Corrections

- Le débordement horizontal sur téléphone dans « Audit du site » et « Opportunités » a été supprimé.
- Une fausse alerte de connexion Google lorsque l’application utilise uniquement un compte de service a été corrigée.
- L’affichage des noms d’appareil, de canal et de pays ainsi que des devises dans Analytics a été amélioré.
- Les liens de téléchargement incorrects et les écrans vides pour les adresses non reconnues ont été corrigés.

## [0.3.0] Alpha — 2026-10-21

### Fonctionnalités

- Installez l’application Windows avec un seul programme d’installation, sans Docker ni terminal.
- Retrouvez les téléchargements, les informations sur le produit et le guide utilisateur sur seowatcher.io.

### Corrections

- Les nombres ne débordent plus de la carte de résumé des problèmes dans « Audit du site ».

## [0.2.1] Alpha — 2026-10-04

### Corrections

- Un problème qui demandait de reconnecter Google environ une heure après la configuration de la connexion dans les paramètres a été corrigé.
- Les résultats déjà obtenus sont conservés lorsqu’un audit s’interrompt en cours de route ou recommence.
- Les calculs de profondeur des pages, de couverture du sitemap et de pages orphelines ont été améliorés.
- Les données de l’ancien projet ne sont plus mélangées à celles du nouveau après un changement de compte Google ou de propriété.
- L’ordre des mots-clés enregistrés a été corrigé et les fichiers CSV contenant des caractères turcs s’ouvrent correctement dans Excel.
- Le texte des formulaires ouverts est conservé lorsqu’une actualisation en arrière-plan échoue. Les erreurs indiquent plus clairement la prochaine étape utile.

### Sécurité

- Les contrôles de sécurité des rapports téléchargés et des adresses de sites analysées ont été renforcés.

## [0.2.0] Alpha — 2026-10-03

### Fonctionnalités

- L’invite de configuration sur l’écran d’installation de l’agent vérifie pas à pas une première installation et la connexion Google.

### Corrections

- L’indicateur de quota Analytics, les dimensions des rapports et les comparaisons dans l’historique des audits ont été corrigés.
- Les paramètres indiquent maintenant quelle connexion Google est utilisée.
- Les instructions de connexion de l’agent pour Windows et Git Bash ont été corrigées.

## [0.1.0] Alpha — 2026-10-02

### Fonctionnalités

- Des instructions de connexion distinctes pour Codex ont été ajoutées.
- Les limites Google et système apparaissent maintenant sur les écrans concernés. Les compteurs sans données connues sont clairement signalés.
- Un bouton Actualiser et l’heure de la dernière mise à jour ont été ajoutés aux écrans principaux.
- Les informations de diagnostic, les problèmes fréquents et les actions rapides ont été réunis dans l’écran d’aide.

### Corrections

- Un audit interrompu ne bloque plus indéfiniment le lancement d’un nouvel audit.
- Les filtres et résultats de l’ancien projet ne restent plus visibles après un changement de projet.
- La recherche de mots-clés turcs, les exports et les estimations du temps restant ont été corrigés.
- Les actions de suppression et de déconnexion Google demandent maintenant une confirmation.
