---
title: Rapports et modèles
description: Conserver les rapports d’audit, de recherche et de votre assistant en fichiers HTML. Les ouvrir sur mobile, les imprimer ou les partager par e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Les rapports sont des documents HTML enregistrés pour ce projet. Leur ouverture ne rafraîchit pas les données Google. La date d'enregistrement n'est pas la date de mesure.

## Créer et retrouver

**Préparer un rapport de recherche** ouvre Performances de recherche. Choisissez période, appareil, pays et type de recherche, puis téléchargez le rapport. **Préparer un rapport d'audit** ouvre l'audit pour choisir une exploration. Copiez la commande de rapport pour votre assistant. Les modèles sont des consignes, pas des générateurs automatiques ni des programmations. Le rapport est enregistré avant téléchargement et reste lisible si la source est déconnectée.

Le dernier rapport mis à jour apparaît avec son résumé enregistré et les actions d'ouverture et de téléchargement. Un résumé absent ou une période non structurée est signalé. Vérifiez les dates et limites dans le document. Le titre et le HTML ne servent pas à inventer une provenance.

La recherche porte sur les titres et résumés. Les nombres par type tiennent compte de la recherche et des sept derniers jours avant le filtre de type. Cette durée compte les fichiers distincts enregistrés ou modifiés, pas les modifications ni la fraîcheur des données Google. Le nombre de résultats est distinct du total du projet.

Le serveur renvoie 25 lignes de métadonnées par page. Les rapports au-delà des 100 premiers restent accessibles et recherchables. Le tri par défaut est la dernière mise à jour, avec aussi création et titre. Recherche, type, filtre récent, tri et page restent dans l'URL pour Retour et actualisation.

Les anciens rapports Recherche et Audit partagent un marqueur de créateur. Ils indiquent **Rapport de l'application, type non enregistré** et ne sont pas tous comptés comme audits. Les compétences de l'assistant et noms de modèles enregistrés restent visibles. Le nombre de fichiers ne mesure pas le progrès SEO. La taille représente les octets HTML stockés; les métadonnées de sécurité peuvent agrandir le téléchargement.

## Lire, télécharger et récupérer

L'aperçu utilise un cadre isolé sans scripts ni réseau. Dépliez les informations de source et d'enregistrement. La langue enregistrée reste fixe; recréez volontairement le rapport depuis la source pour une autre langue ou des données actuelles.

Le HTML se lit hors ligne et se partage comme fichier. Le PDF utilise l'impression du navigateur. Si l'onglet est bloqué, autorisez les fenêtres ou ouvrez le rapport dans un nouvel onglet et imprimez. Le plein écran isole le focus du clavier et garde une sortie en haut et en bas. Le lien appartient à cette installation; envoyez le fichier.

Après 15 secondes sans aperçu, Réessayer et Ouvrir dans un nouvel onglet sont proposés. Les erreurs de document absent, d'accès, de connexion et de téléchargement ont des actions explicites. Une actualisation échouée conserve les dernières lignes avec un avertissement. Un contrôle de stockage indisponible ne prouve pas qu'il reste de la place.

## Limites des mesures

Le rapport de recherche indique période réellement résolue, comparaison, filtres et génération. Les jours suivent l'heure du Pacifique. Si Google ne donne pas de limite de finalisation, l'exclusion fondée sur un délai supposé est signalée. Avec une limite de lignes, la part non listée comprend requêtes masquées et lignes non lues. Les limites requête, page et requête×page affectent les opportunités, pas les totaux canoniques du site.

L'analyse des chevauchements affiche sa propre période et ses seuils même sans résultat. Un rapport de sept jours peut utiliser 28 jours pour cette analyse. Plusieurs pages ne prouvent ni clics perdus ni dommage SEO. Les données historiques ou d'apparence indisponibles ne deviennent pas zéro. Les listes limitées indiquent éléments affichés et observés. Le budget de requêtes concerne la vue Recherche, hors analyse supplémentaire et effets du cache.

La génération relit les données serveur. Google peut corriger le passé et la période peut être résolue à nouveau: l'égalité exacte avec un écran antérieur n'est pas garantie. Le même titre localisé peut être remplacé; changer de langue peut créer un autre document. Les titres longs respectent le stockage et portent une protection serveur contre les collisions de source et de filtres.

## Modèles et stockage

Modèle: nom 80, description 200, consignes 3 000 caractères; dix par projet. Supprimer un modèle conserve ses rapports. Effacer la recherche réaffiche les modèles masqués.

Protections: 500 000 octets par rapport, 120 caractères de titre, 2 500 de résumé, 10 000 rapports par projet et 5 Go par installation. Ce sont des limites de stockage, pas de couverture SEO. Vérifiez les dates d'exploration, de vitesse et des sources Google optionnelles dans la méthode du rapport d'audit.

## Types de source et régénération

Les nouveaux rapports natifs de performances de recherche et d’audit du site ont des types enregistrés distincts. Le titre des anciens rapports ne sert pas à déterminer leur type. L’identité de recherche utilise la propriété, les dates fixées et les filtres ; celle d’audit utilise l’identifiant d’audit. Régénérer la même source dans une autre langue met à jour le même enregistrement et peut changer sa langue. Les conflits de titre avec des rapports d’agent sont refusés ; un ancien document de même titre est conservé et le nouvel enregistrement est refusé.

Régénérez les rapports natifs depuis leur écran source ; les agents ne peuvent pas remplacer leur contenu avec `save_report`. Une source manquante ne vaut jamais zéro. La méthode d’audit précise la période de trafic GSC, la limite de lignes et la mesure CrUX mobile enregistrée disponible.

Le rapport enregistré en haut n’est pas un bilan actuel du site. Le site source est affiché si l’audit d’origine permet de le vérifier ; une différence avec le site du projet déclenche un avertissement. Sans source vérifiée, le rapport peut concerner un autre site. Les anciens rapports portent une mention de source et de date non vérifiées. **Ouvrir les audits du site** ouvre l’historique. Si un audit enregistré convient, ouvrez-le et téléchargez son rapport ; ce lien ne lance pas automatiquement un audit et ne crée pas de rapport. Les anciens fichiers sont conservés.
