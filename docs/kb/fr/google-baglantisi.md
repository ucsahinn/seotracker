---
title: Connexion à Google
description: Connectez Search Console et GA4 avec votre compte de service Google Cloud ou votre client OAuth, puis choisissez les propriétés de chaque projet.
kind: nasil-yapilir
updated: 2026-10-27
---

La connexion se fait en deux temps. Vous enregistrez d’abord un identifiant Google, une seule fois pour toute l’installation. Vous choisissez ensuite, dans chaque projet, une propriété Search Console et une propriété Google Analytics 4. L’identifiant peut être un compte de service (la voie la plus courte) ou un client OAuth Google.

## Identifiant et propriété

| Choix       | Portée           | Où                                    | Badge                      |
| ----------- | ---------------- | ------------------------------------- | -------------------------- |
| Identifiant | Tous les projets | **Paramètres → Google**               | **Enregistré**             |
| Propriété   | Un projet        | **Paramètres du projet → Connexions** | **Propriété sélectionnée** |

Ces badges confirment seulement l’enregistrement, pas que Google fournit des données. Vous savez que l’accès fonctionne quand des données apparaissent dans **Performances de recherche** ou **Analytics**. Choisir une propriété n’installe aucun code de suivi sur votre site.

## Voie 1 : compte de service

1. Dans Google Cloud, créez un projet et activez Search Console API, Google Analytics Admin API et Google Analytics Data API.
2. Créez un compte de service et téléchargez son fichier de clé JSON.
3. Dans seowatcher, section **Paramètres → Compte de service**, sélectionnez le fichier ou utilisez **Coller le contenu JSON en le masquant**, puis cliquez sur **Enregistrer**. La clé privée n’est jamais affichée.
4. Copiez l’adresse e-mail du compte de service affichée à l’écran.
5. Dans Search Console, ouvrez **Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur** et ajoutez cette adresse avec l’autorisation **Complète**.
6. Dans Google Analytics, sous **Administration → Gestion des accès**, ajoutez la même adresse avec le rôle Lecteur.
7. Dans seowatcher, ouvrez le projet, puis **Paramètres du projet → Connexions**. Utilisez **Choisir une propriété** et cliquez sur **Enregistrer la propriété**.

## Voie 2 : client OAuth Google

1. Dans Google Cloud, activez les mêmes API et créez un client OAuth de type « Web application ».
2. Ajoutez au client, à l’identique, les deux adresses de redirection affichées dans **Paramètres** (l’une pour Search Console, l’autre pour Analytics).
3. Saisissez l’identifiant client et le code secret dans **Paramètres**, puis enregistrez.
4. Dans **Paramètres du projet → Connexions**, autorisez l’accès avec **Ajouter un compte Google**, puis choisissez la propriété et enregistrez-la.

Si un compte de service est aussi enregistré, l’application l’utilise en priorité ; la carte OAuth indique alors « Non utilisé, un compte de service est connecté ».

## Lire la carte de connexion

La carte de connexion date la dernière lecture Google pour l’identifiant et la propriété sélectionnés : « Dernière lecture Google réussie » ou « Dernière lecture Google échouée ». Après une erreur passagère, la date de la dernière lecture réussie est conservée. Sans aucune lecture, la carte indique « L’accès aux données n’a pas encore été vérifié. » Le fuseau horaire et la devise de la propriété Analytics y figurent aussi.

Ouvrir les paramètres n’envoie aucune requête à Google. Quand vous changez d’identifiant, l’historique des lectures et des quotas n’est pas transféré au nouveau ; actualisez vous-même les rapports.

## En cas de problème

- **Liste des propriétés vide :** cela ne prouve pas à lui seul un manque de droits. En cas d’erreur de lecture, la dernière liste est conservée ; relisez-la avec **Réessayer**.
- **Connexion expirée :** renouvelez l’autorisation avec **Reconnecter**.
- **Accès refusé :** vérifiez que le compte de service ou le compte Google a des droits sur la propriété.
- **API désactivée :** activez l’API concernée dans le projet Google Cloud.
- **Limite de requêtes :** patientez, puis réessayez.
- **Erreur inconnue :** cliquez sur **Réessayer**, puis utilisez le diagnostic de l’écran **Aide**.

Supprimer un identifiant dans seowatcher ne révoque pas la clé chez Google ; faites-le dans Google Cloud. Modifier le domaine du projet ne change ni la propriété sélectionnée ni l’historique.

La liste complète des symptômes et des solutions figure dans le guide [Dépannage](/docs/sorun-giderme/).
