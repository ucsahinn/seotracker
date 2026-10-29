---
title: Paramètres
description: Ce que règle chaque section des Paramètres, pour ce navigateur ou toute l’installation : langue, identifiants Google, PageSpeed, limites et versions.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Les **Paramètres** regroupent les choix valables pour toute l’installation. Les réglages propres à un projet (nom, domaine, pays, langue et propriétés Google) se trouvent dans ses **Paramètres du projet**.

## Où s’applique chaque réglage

| Réglage                                | Portée              | Où                                             |
| -------------------------------------- | ------------------- | ---------------------------------------------- |
| Thème et langue                        | Ce navigateur       | **Paramètres → Apparence**                     |
| Son des notifications                  | Ce navigateur       | **Paramètres → Notifications**                 |
| Identifiants Google                    | Tous les projets    | **Paramètres → Google**, **Compte de service** |
| Clé PageSpeed                          | Tous les projets    | **Paramètres → Tests de vitesse**              |
| Compteurs de limites                   | Un projet à la fois | **Paramètres → Limites**                       |
| Nom, domaine, pays, langue             | Un projet           | **Paramètres du projet → Général**             |
| Propriétés Search Console et Analytics | Un projet           | **Paramètres du projet → Connexions**          |

## Apparence

Le thème est conservé dans ce navigateur. Pour changer de langue, choisissez-la dans la liste puis cliquez sur **Appliquer la langue** ; parcourir la liste ne modifie pas la page. Le pays et la langue d’un projet sont un autre réglage : ils fixent le marché par défaut des mots-clés enregistrés.

## Notifications

Quand l’application est ouverte, les notifications s’affichent à l’écran. Celles qui arrivent pendant que l’onglet est en arrière-plan sont conservées dans l’historique des notifications. **Son des notifications** active ou coupe le son des notifications importantes. **Écouter le son** et **Tester la notification dans l’application** permettent de les essayer.

## Identifiants Google

Un identifiant Google vaut pour tous les projets. Si un compte de service et un client OAuth sont tous deux enregistrés, le compte de service est utilisé. La procédure complète figure dans le guide [Connexion à Google](/docs/google-baglantisi/).

Pour enregistrer un compte de service, sélectionnez le fichier JSON ou utilisez **Coller le contenu JSON en le masquant**, puis cliquez sur **Enregistrer**. La clé privée n’est jamais affichée.

Le badge **Enregistré** indique seulement que l’identifiant est stocké, pas que Google accorde l’accès. Si l’identifiant ne peut pas être lu, le dernier enregistrement est conservé et l’écran propose de réessayer.

Modifier le domaine d’un projet ne change ni la propriété Google ni l’historique. Le filtre par pays de Performances de recherche se choisit indépendamment du pays du projet.

## Tests de vitesse

La clé PageSpeed est facultative. Sans clé, chaque audit tente de mesurer au plus 50 pages, et Google peut s’arrêter plus tôt ; une clé ne garantit pas non plus le succès. Le détail figure dans le guide [Clé PageSpeed](/docs/pagespeed-anahtari/).

## Limites

La section **Limites de Google et du système** affiche, pour un projet à la fois, les compteurs que l’application tient elle-même. Choisissez d’abord un projet dans **Projet dont les limites sont affichées**.

- **Inspection de l’URL (Search Console)** : requêtes envoyées par l’application pour cette propriété au cours des dernières 24 heures. L’usage fait ailleurs chez Google n’est pas compté.
- **PageSpeed** : requêtes des audits lancés au cours des dernières 24 heures.
- **GA4** : quota restant d’après la dernière réponse. La limite standard d’une propriété est une hypothèse.
- **Pages d’audit** : tirées du dernier audit terminé sur le domaine du projet.
- **Rapports et modèles** : tous les enregistrements du projet.

Un compteur ancien ou illisible n’est jamais affiché à zéro ; la ligne de synthèse indique combien de limites ont un usage inconnu.

## Windows

Cette section n’apparaît que dans la version Windows. Les préférences **Démarrer avec Windows** et **Installer les mises à jour automatiquement** sont enregistrées par l’application de la zone de notification ; la version Docker ne les propose pas.

Si l’application de la zone de notification ne répond pas, cela ne signifie pas que le réglage est désactivé : relisez-le avec **Réessayer**. Si un administrateur a verrouillé un réglage, la raison est indiquée à côté.

### Notifications Windows

Ce choix se fait dans le menu de la zone de notification : faites un clic droit sur l’icône seowatcher et activez ou désactivez **Windows bildirimleri** (Notifications Windows). Il est activé par défaut.

Quand il est activé, les audits terminés ou échoués de tous les projets et les nouvelles annonces arrivent en notifications Windows en 90 secondes environ, même navigateur fermé. Un clic sur la notification ouvre la page concernée. Plusieurs événements simultanés sont regroupés en un seul résumé.

- Au premier lancement, les événements passés ne sont pas affichés. Un redémarrage ne répète pas les événements déjà affichés.
- Les événements survenus pendant que l’option est désactivée, ou que le lanceur est arrêté, ne sont pas affichés après coup.
- Le mode Concentration ou Ne pas déranger de Windows peut masquer les notifications.
- Les notifications de nouvelle version suivent votre réglage de mise à jour.

## À propos et vérification des versions

Quand **Vérification de version dans l’application** est activée, l’application cherche une nouvelle version sur GitHub au plus une fois toutes les six heures. L’application Windows peut, indépendamment, vérifier une fois par jour ; l’installation automatique se règle dans la section **Windows**.

La date de la dernière vérification réussie indique l’âge de l’information de version. Si GitHub renvoie une limite de requêtes ou une erreur d’accès, patientez puis réessayez. Pour une erreur 404, utilisez le diagnostic de l’écran **Aide**. Si le réglage ne peut pas être lu, l’interrupteur ne peut pas être modifié.

<!-- Sources: src/routes/_app/settings/; src/client/features/settings/; src/client/features/notifications/NotificationSettings.tsx; src/client/features/quotas/SystemLimitsSection.tsx -->
