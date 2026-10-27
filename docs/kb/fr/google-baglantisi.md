---
title: Connexion à Google
description: Séparer identifiants de l’installation et propriétés du projet; distinguer configuration et accès.
kind: nasil-yapilir
updated: 2026-10-27
---

## Identifiants et propriétés

Les identifiants Google des Paramètres concernent l'installation. La propriété dans Paramètres du projet → Connexions concerne un projet. Enregistré et Propriété sélectionnée confirment seulement la configuration. Vérifiez les données dans Performances de recherche ou Analytics. Analytics affiche le fuseau et la devise de la propriété. La sélection n'installe pas de suivi sur le site.

## Compte de service ou OAuth

Activez Search Console API et, pour Analytics, Admin API et Data API dans Google Cloud. Créez un compte de service et téléchargez sa clé JSON. Dans Paramètres → Compte de service, sélectionnez le fichier ou utilisez le collage masqué, puis enregistrez. La clé privée reste invisible. Ajoutez l'adresse affichée avec accès Complet dans Search Console et Lecteur dans Analytics. Choisissez ensuite la propriété du projet.

Pour OAuth, créez un client Web application. Enregistrez exactement les deux URL de retour affichées, puis l'identifiant et le secret. Autorisez le compte depuis les connexions du projet et choisissez la propriété. Un compte de service enregistré est prioritaire.

## Dépannage

Une erreur conserve l'ancienne liste; une liste vide seule ne prouve pas l'absence de droits. Reconnectez une autorisation expirée, vérifiez les droits pour un refus et le projet Cloud pour une API inactive. Attendez en cas de limite. Sinon, réessayez et consultez le diagnostic Aide. Supprimer un identifiant ici ne le révoque pas chez Google. Modifier le domaine conserve l'association et l'historique.

La fiche de connexion date la dernière lecture Google déjà observée pour les identifiants et la propriété actuels. Après un échec temporaire, elle conserve la date de la précédente lecture réussie. Sans historique, l’accès reste non vérifié. Ouvrir les paramètres ne lance aucune requête Google. Un changement d’identifiants ne transfère pas les anciennes preuves d’accès ou de quota à la nouvelle identité ; actualisez explicitement les rapports.
