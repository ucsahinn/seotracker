---
title: Paramètres
description: Thème, clé d'accès Google, clé PageSpeed, limites d'utilisation et vérification des mises à jour : l'unique écran de réglages de toute l'installation.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Cet écran regroupe la connexion à Google, la clé de vitesse et la mise à jour.

Dans l'écran **Paramètres**, vous réglez ce qui concerne toute l'installation. Les réglages propres à un projet (nom, nom de domaine, propriété Search Console et Analytics) se trouvent dans la page **Paramètres du projet** de chaque projet. Ici, vous gérez la clé d'accès qui permet de se connecter à Google, la clé PageSpeed, le thème et la vérification des mises à jour. À gauche, il y a les sections **Apparence**, **Google**, **Compte de service**, **Tests de vitesse**, **Limites**, **À propos** et **Windows**. Le titre de chaque section porte un badge qui indique son état.

## Ce que l'écran affiche

**Apparence.** Pour **Thème**, il y a les choix Système, Clair et Sombre. Le choix est conservé dans ce navigateur. Dans un autre navigateur ou sur un autre ordinateur, vous le choisissez séparément.

**Langue.** L'application propose une interface en turc, anglais, allemand, français, italien et portugais. Dans **Paramètres → Apparence → Langue**, choisissez **Türkçe**, **English**, **Deutsch**, **Français**, **Italiano** ou **Português** ; la page se recharge dans la nouvelle langue. Chaque langue est écrite sous son propre nom, vous retrouvez donc la vôtre même si vous ne lisez pas la langue actuelle. Tant que vous ne choisissez rien, l'application suit la langue de votre navigateur. Si le navigateur ne demande aucune de ces langues, l'application s'ouvre en anglais. Si le navigateur n'indique aucune langue, elle s'ouvre en turc. Le choix est enregistré dans ce navigateur, comme le thème. Seule l'interface de l'application change. Le menu de la zone de notification de Windows reste en turc.

**Notifications.** La cloche de la barre latérale affiche les 50 derniers événements et le nombre de messages non lus. **Marquer tout comme lu** conserve l'historique. Les résultats d'audit, les nouvelles versions, les problèmes de connexion Google, les rapports et les demandes d'index apparaissent ici. Tant que l'application est ouverte, un nouvel événement apparaît dans une petite fenêtre propre à l'application. Quand l'onglet est en arrière-plan, l'événement reste seulement dans l'historique de la cloche. L'application n'envoie pas de notifications Windows ni de navigateur, pour qu'un même événement n'apparaisse jamais dans deux fenêtres superposées. Si vous regardez l'écran d'un audit, la fenêtre de fin de cet audit n'est pas affichée en plus, car l'écran montre déjà la fin. **Son des notifications** joue un court son pour les événements importants ; **Écouter le son** permet de l'essayer. **Tester la notification dans l'application** crée une notification de test et son son. Les animations visuelles suivent la préférence du système pour la réduction des animations ; le son a son propre réglage.

**Windows.** Activez ou désactivez ici le démarrage avec Windows et l'installation automatique des mises à jour. Ce sont les mêmes préférences enregistrées que dans le menu de la zone de notification. Les restrictions d'administrateur sont expliquées à côté de l'option. Les commandes sont désactivées dans les installations Docker et de développement ; les anciens lanceurs Windows demandent une mise à jour du paquet.

Si un réglage ne peut pas être enregistré, l'écran dit pourquoi et ce qu'il faut faire. Comme cette section parle à l'application de la barre des tâches, les erreurs viennent de cette application :

- **L'application de la barre des tâches n'a pas répondu en 4 secondes.** Si l'ordinateur sort de veille, cliquez sur **Réessayer** dans quelques secondes. Si cela persiste, choisissez **Çıkış** (Quitter) dans le menu de la zone de notification et rouvrez l'application.
- **Impossible de joindre le service de réglages de l'application de la barre des tâches.** Elle s'est peut-être fermée. Rouvrez seowatcher depuis le menu Démarrer.
- **Ce réglage est verrouillé par un administrateur.** Seul l'administrateur de l'ordinateur peut le modifier. C'est normal si l'installation a été faite pour tous les utilisateurs.
- **L'application de la barre des tâches n'a pas reconnu cette requête.** Le serveur et l'application proviennent peut-être de sessions différentes. Choisissez **Çıkış** (Quitter) dans le menu et rouvrez l'application.
- **L'application de la barre des tâches a refusé la requête de réglage.** Redémarrez l'application depuis le menu. Si cela persiste, mettez à jour le paquet Windows.
- **L'application de la barre des tâches a renvoyé une réponse non reconnue.** Les versions ne correspondent peut-être pas. Mettez à jour le paquet Windows.

Si la section ne s'ouvre pas du tout et indique que les préférences Windows ne sont pas disponibles, vérifiez que l'application de la barre des tâches est en cours d'exécution.

**Google.** Le badge a l'une de ces trois valeurs : **Enregistré**, **Provenant de variables d'environnement** (Vient de l'environnement : fournie par le fichier `.env` dans une installation Docker) ou **Manquant**. La section affiche les deux adresses de redirection à ajouter dans Google Cloud Console (le tableau de bord développeur de Google). À côté, il y a des boutons de copie. Vous devez ajouter les deux. Si vous n'ajoutez pas l'adresse d'Analytics, seul Search Console se connecte.

Il y a deux champs : **ID client** et **Secret client**. Tous deux sont des éléments de la clé d'accès que vous obtenez de Google. Les boutons sont : **Enregistrer**, **Annuler**, **Modifier** et **Supprimer**. **Supprimer** coupe les connexions existantes. Vous trouvez la configuration pas à pas dans le guide de la connexion à Google.

**Hizmet hesabı (voie plus courte).** Un compte de service est un compte robot créé chez Google pour l'application. Dans le champ **Fichier de clé du compte de service (JSON)**, vous collez le contenu du fichier téléchargé depuis Google Cloud. S'il y a un enregistrement, l'adresse e-mail du compte apparaît. L'écran indique où ajouter cette adresse :

- Search Console : « Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur », autorisation Tam (Complète).
- Analytics : « Administration → Gestion des accès », autorisation Görüntüleyen (Lecteur).

Le badge indique **Enregistré** ou **Non utilisé**. S'il existe un compte de service enregistré, l'application le préfère à la clé d'accès Google. Le supprimer retire le compte de l'application, mais n'annule pas la clé chez Google. Si aucun identifiant client n'est saisi dans la section **Google** mais qu'un compte de service est connecté, le badge de la section **Google** indique un neutre **Non utilisé, un compte de service est connecté** au lieu d'un **Manquant** jaune. Google fonctionne alors avec le compte de service.

**Tests de vitesse.** Il y a le champ **Clé API** et le bouton **Tester la clé**. Le test « consomme 1 mesure ». Vous pouvez cliquer dessus toutes les dix secondes. Le badge indique **Clé enregistrée**, **Provenant d'une variable d'environnement** ou **Clé manquante**. Vous trouvez le détail dans le guide de la clé PageSpeed.

**Limites.** Les cartes « Limites de Google et du système » contiennent :

- Inspection de l'URL (Search Console) : 2 000 par jour.
- PageSpeed Insights.
- Unités de quota quotidiennes et horaires de GA4 (Google Analytics) : 200 000 et 40 000 par défaut. Google ne communique pas ce nombre, il dit seulement ce qu'il reste.
- Limite de pages d'audit : 10 000.
- Rapports par projet : 10 000, modèles : 10.
- Plus gros rapport : 500 000 octets.

L'état de chaque carte est **Marge suffisante**, **Bientôt épuisé** (au-delà de 70 pour cent), **Presque épuisé** (au-delà de 90 pour cent) ou **Inconnu**.

**À propos.** La ligne **Version** affiche la version installée (comme 0.8.0 Alpha). L'interrupteur **Vérifier les mises à jour** est activé par défaut. S'il est activé, l'application demande à GitHub la dernière version toutes les six heures. Le bouton **Vérifier maintenant** apparaît alors aussi. L'application de la barre des tâches du paquet Windows fait en plus sa propre vérification, une fois par jour. S'il y a une nouvelle version, un lien **Nouveautés** apparaît et, pour les installations Docker, une commande à copier : `git pull && docker compose up -d --build`. Pour le paquet Windows, l'écran renvoie à **Güncelle** (Mettre à jour) dans le menu de l'icône de la barre des tâches (ce menu n'existe qu'en turc). Si la mise à jour automatique est activée, la nouvelle version s'installe toute seule.

La vérification indique l'un de ces cas : une nouvelle version est sortie, « Vous utilisez la dernière version. » ou un problème. Si GitHub est injoignable, l'écran indique « GitHub était injoignable lors de la dernière vérification » et donne la dernière version connue avec la date de la dernière vérification réussie. Cela veut dire qu'on n'a pas pu confirmer que votre version est à jour. Vérifiez votre connexion internet et réessayez. Si l'écran indique « Source des versions injoignable : le dépôt est introuvable ou privé (GitHub 404) », le problème ne vient pas de vous. Téléchargez le paquet de diagnostic depuis l'écran **Aide** et signalez-le. Si l'interrupteur est désactivé, l'écran indique « Les vérifications de mise à jour sont désactivées, donc aucune demande n'est envoyée à GitHub. »

**Notes de version.** Les notes de version ont une page séparée au-dessus des notifications dans le menu latéral. Les étiquettes colorées indiquent nouveautés, corrections et changements de sécurité.

## Comment l'utiliser

1. À la première installation, saisissez d'abord l'identifiant client et la clé secrète dans la section **Google**. Saisissez ensuite la clé PageSpeed dans la section **Tests de vitesse**. Une fois les deux enregistrées, vous passez au projet et choisissez la propriété.
2. Une fois par mois, regardez la section **Limites**. Le quota que vous voyez « Bientôt épuisé » est le plus souvent la limite de l'inspection d'URL.
3. Si une nouvelle version apparaît dans **À propos**, mettez à jour. Les notes de version disent ce qui a changé. La vérification des mises à jour est la seule connexion sortante de l'application vers autre chose que Google. Si vous n'en voulez pas, désactivez l'interrupteur.
4. Si vous devez changer la clé d'accès Google (par exemple pour un nouveau projet Cloud), cliquez sur **Modifier** et collez les nouvelles valeurs. Les connexions existantes ne fonctionnent pas avec la nouvelle clé. Dans les projets, il faut **Reconnecter**.

## Questions fréquentes

**Pourquoi ne puis-je pas voir ma clé secrète à l'écran ?** L'application la stocke chiffrée et ne la renvoie pas au navigateur. L'écran n'indique que le fait qu'elle est enregistrée, et l'identifiant.

**Et si la valeur donnée par `.env` dans Docker et celle saisie à l'écran se contredisent ?** Celle de l'écran l'emporte. Si vous enregistrez une valeur alors que le badge indique « Provenant de variables d'environnement », c'est désormais celle-ci qui est utilisée.

**Qu'envoie la vérification des mises à jour ?** Elle n'envoie aucune donnée. Elle lit la liste publique des versions de GitHub. La requête est anonyme.

**Compte de service ou clé d'accès Google ?** Le compte de service ne vous fait pas passer par l'écran de consentement et il n'expire pas. En contrepartie, vous devez donner à la main l'autorisation à ce compte dans Search Console et Analytics. Pour une installation à une seule personne, les deux conviennent. Si vous voyez souvent « süresi doldu » (expiré), passez au compte de service.

## Limites

L'écran Paramètres ne modifie ni le numéro de port, ni le dossier de données, ni les réglages réseau. Ceux-ci se trouvent dans `config.json` pour le paquet Windows et dans le fichier `.env` pour Docker. Il n'y a pas de gestion d'utilisateurs ni de mots de passe : l'application est monoutilisateur. Les cartes de quota ne sont pas le vrai compteur de Google, mais le comptage de l'application elle-même. Les inspections d'URL que vous faites à la main dans Search Console n'apparaissent pas ici, mais elles consomment la limite de Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
