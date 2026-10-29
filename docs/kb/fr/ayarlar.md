---
title: Paramètres
description: Portées navigateur, installation et projet; identifiants Google, compteurs locaux et versions.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Les Paramètres regroupent les choix qui s'appliquent à ce navigateur (apparence et langue) et à toute l'installation (identifiants Google, clé PageSpeed, limites et mises à jour). Le nom, le domaine et les propriétés Google d'un projet se trouvent dans les **Paramètres du projet**. Cette page explique la portée de chaque réglage et où le modifier.

## Portée des réglages

L'apparence et la langue concernent ce navigateur. Choisissez la langue, puis appliquez-la avec le bouton. Parcourir la liste ne recharge pas la page. La langue du marché du projet est distincte.

Les identifiants Google concernent toute l'installation. Le compte de service est prioritaire. Un identifiant enregistré ou une propriété sélectionnée ne prouve pas l'accès aux données. Une erreur de lecture conserve les réglages connus et propose de réessayer. Sélectionnez le fichier JSON ou utilisez le champ de collage masqué, puis enregistrez. La clé privée n'est pas affichée.

Les réglages du projet gèrent son nom, domaine et propriété. Modifier le domaine conserve l'association Google et l'historique. Pays et langue sont les valeurs par défaut des mots-clés enregistrés; les performances de recherche ont leur propre filtre pays.

## Windows, vitesse et limites

Les réglages Windows sont confirmés par l'application de notification. Docker n'affiche aucun interrupteur. Un lanceur inaccessible signifie inconnu, pas désactivé. Réessayez; les restrictions administrateur sont expliquées.

Sans clé PageSpeed, l'application tente au plus 50 pages par audit. Google peut limiter plus tôt; la clé ne garantit pas le succès. Le test envoie une requête mobile pour example.com, hors compteur d'audit. La date est affichée; changer de clé supprime l'ancien résultat.

Choisissez le projet dans Limites. L'inspection d'URL compte les requêtes locales de la propriété sur 24 heures glissantes. PageSpeed compte les audits commencés sur cette période. Le solde GA4 date de la dernière réponse; les plafonds standards sont supposés. Les sources anciennes ou absentes restent inconnues. Les pages proviennent du dernier audit terminé du domaine; rapports et modèles couvrent tout le projet.

## Versions

Le contrôle dans l'application consulte GitHub au plus toutes les six heures. L'application Windows peut vérifier quotidiennement de manière indépendante. Son installation automatique se règle dans Windows. La date du dernier succès indique l'âge de la version connue. Attendez en cas de limite/restriction, puis réessayez; utilisez le diagnostic Aide pour une source absente. Un réglage illisible ne peut pas être modifié.

## Notifications Windows

Faites un clic droit sur l’icône seowatcher dans la zone de notification et utilisez **Windows bildirimleri** (activé par défaut). Tant que le lanceur fonctionne, les audits terminés ou échoués de tous les projets et les nouvelles annonces apparaissent en bulles Windows sous environ 90 secondes, même avec le navigateur fermé ou en arrière-plan. Un clic ouvre la page concernée ; plusieurs événements sont regroupés. Le premier lancement ignore les anciens événements ; un redémarrage ne répète pas ceux déjà reçus. Les événements reçus pendant la désactivation ne sont pas affichés ensuite. Les nouvelles versions suivent le réglage de mise à jour existant. Le mode Concentration/Ne pas déranger peut masquer les notifications. Aucune notification si le lanceur est fermé. Cette fonction est absente de Docker.
