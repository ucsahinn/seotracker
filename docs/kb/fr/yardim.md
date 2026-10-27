---
title: Aide
description: En cas de souci, commencez ici : l'écran vérifie l'installation, donne la solution aux problèmes courants et prépare le fichier à joindre au signalement.
screen: Yardım
route: /support
updated: 2026-10-27
---

L'interface de l'application existe en six langues : turc, anglais, allemand, français, italien et portugais. La langue se choisit dans Paramètres → Apparence → Langue. Ce guide donne les boutons et les écrans sous le nom qu'ils portent dans l'interface en français. Le menu de la zone de notification de Windows n'existe qu'en turc. Là, le nom turc est suivi de sa traduction française entre parenthèses.

Si quelque chose ne va pas, regardez d'abord ici. Cet écran contrôle votre installation, dit ce qui manque et vous conduit au bon réglage.

## Ce que l'écran affiche

**Actions rapides.** Les boutons du haut :

- **Revérifier l'état** : actualise la carte ci-dessous.
- **Télécharger le paquet de diagnostic** : télécharge le fichier à joindre quand vous signalez un problème. Il ne contient aucune valeur secrète.
- **Ouvrir le guide** : ouvre le guide sur seowatcher.io.
- **seowatcher.io** : ouvre le site de l'application ; la page de téléchargement et le guide s'y trouvent.
- **Notes de version** : ouvre l’écran dédié aux notes de version (`/release-notes`).
- **Configuration de l'agent** : mène à l'écran de connexion de l'assistant.

**État de l’application.** La carte vérifie l’accès, les paramètres de connexion Google, la clé PageSpeed, l’environnement d’exécution et la base de données de cette installation. Un contrôle réussi ne garantit ni un site sans erreur ni des données Google à jour. Un réglage non lu ne vaut pas un contrôle réussi. Lisez l’avertissement puis utilisez **Revérifier l’état**. La version et l’heure du contrôle situent le résultat. **Copier le résumé** copie cet état ; **Ouvrir les connexions** mène aux connexions du projet.

**Avertissement sur le numéro de port.** Si le paquet Windows s'ouvre sur un autre numéro de port parce qu'un autre programme occupe 3001 (par exemple une ancienne copie Docker), une bande jaune apparaît en haut de chaque écran de l'application : « seowatcher tourne cette fois sur 3002, car un autre programme utilise 3001 (par exemple une ancienne copie Docker). La connexion Google est configurée pour 3001 ; fermez ce programme et redémarrez seowatcher. » La bande est là au cas où vous auriez manqué la notification de la barre des tâches. La connexion Google revient à l'adresse 3001 et échoue si vous avez ouvert l'application sur 3002. Le bouton de fermeture à droite de la bande la masque pour cet onglet. La même phrase est aussi écrite dans la carte **État de l'application**. Pour résoudre, fermez le programme qui occupe 3001, puis choisissez **Yeniden başlat** (Redémarrer) dans le menu de la zone de notification. L'application revient sur 3001 et la bande disparaît. Si aucun autre programme ne l'utilise, l'application revient de toute façon sur 3001 au prochain démarrage.

**Projets.** L'état de la connexion Search Console et Analytics de chaque projet s'affiche. **Ouvrir les connexions** vous mène aux paramètres du projet.

**Problèmes courants.** Il y a six rubriques dépliables : la page ne s'ouvre pas ou l'application ne fonctionne pas, le port est en cours d'utilisation, mon agent ne parvient pas à se connecter (401), la mesure de la vitesse s'arrête à mi-chemin (429), aucune donnée de requête et j'ai modifié un réglage et l'application ne le voit pas. Chacune dit ce qu'il faut faire et donne le lien du réglage concerné.

**Limites de Google et du système.** Avec **Afficher les limites**, vous voyez où vous en êtes par rapport aux limites quotidiennes de Google.

**Liste du bas.** Il y a des raccourcis vers les fichiers de journal et vers l'adresse de santé (`/api/health`). Avec le paquet Windows, vous ouvrez les journaux par **Günlükleri aç** (Ouvrir les journaux) dans le menu de la barre des tâches. Avec Docker, vous utilisez la commande donnée avec **Copier la commande**.

## Comment l'utiliser

1. Si quelque chose ne fonctionne pas, ouvrez d'abord cet écran et lisez l'avertissement de la carte.
2. Cliquez sur le bouton à côté de l'avertissement, il vous mène au bon réglage. Faites le réglage, revenez et cliquez sur **Revérifier l'état**.
3. Si les contrôles d’installation réussissent mais que le problème persiste, consultez **Problèmes courants** et l’écran du projet concerné.
4. Si le problème n'est toujours pas résolu, cliquez sur **Télécharger le paquet de diagnostic** et joignez le fichier au signalement sur GitHub. Avec le paquet Windows, **Sorunu bildir (GitHub)** (Signaler un problème (GitHub)), dans le menu de la barre des tâches, fait la même chose en un clic.

## Questions fréquentes

**Pourquoi la ligne « Connexion Google » est-elle jaune ?** La clé d'accès Google n'a pas encore été saisie : la ligne reste jaune tant que Google n'est pas connecté. Suivez le guide de la connexion à Google.

**La ligne « Connexion et accès » indique « utilisateur unique sans mot de passe ».** C'est normal. L'application ne s'ouvre que depuis votre propre ordinateur. Pour l'ouvrir depuis l'extérieur, vous devez placer devant elle votre propre accès protégé par mot de passe.

**Que contient le paquet de diagnostic ?** La version, les contrôles d'installation, le nombre de lignes des tables et les étapes et erreurs des 25 derniers audits. Les erreurs PageSpeed sont résumées sans URL de page. Les secrets et mots de passe sont exclus ; les noms de projets, domaines et identifiants de propriétés Google peuvent apparaître. Vérifiez les fichiers avant de les envoyer.

## Limites

Cet écran ne contrôle que l'installation elle-même. Pour trouver un problème sur votre site, regardez l'écran Audit du site ; pour voir un problème du côté de Google, regardez l'écran État de l'indexation.

## Quel écran utiliser ?

Le [Tableau de bord](/docs/panel/) résume la configuration et les données du projet sélectionné. Les [Opportunités](/docs/firsatlar/) aident à choisir des actions à partir des données Search Console. Le [Suivi du classement](/docs/siralama-takibi/) suit la position moyenne des mots-clés enregistrés dans les données Google, pas les résultats de recherche en direct. Si des données manquent, vérifiez les connexions du projet, la période et les avertissements de couverture. L’état de l’installation ne valide pas ces rapports.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
