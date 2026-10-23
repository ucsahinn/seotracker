---
title: Aide
description: Si quelque chose ne va pas, regardez d'abord ici. L'écran contrôle votre installation, montre la solution aux problèmes courants et prépare le fichier à joindre quand vous signalez un problème.
screen: Yardım
route: /support
updated: 2026-10-22
---

L'interface de l'application est en turc. Ce guide donne chaque nom de bouton et d'écran en turc, suivi de sa traduction française entre parenthèses.

Si quelque chose ne va pas, regardez d'abord ici. Cet écran contrôle votre installation, dit ce qui manque et vous conduit au bon réglage.

## Ce que l'écran affiche

**Actions rapides.** Les boutons du haut :

- **Durumu yeniden kontrol et** (Revérifier l'état) : actualise la carte ci-dessous.
- **Tanılama paketi indir** (Télécharger le paquet de diagnostic) : télécharge le fichier à joindre quand vous signalez un problème. Il ne contient aucune valeur secrète.
- **Kılavuzu aç** (Ouvrir le guide) : ouvre le guide sur seowatcher.io.
- **seowatcher.io** : ouvre le site de l'application ; la page de téléchargement et le guide s'y trouvent.
- **Sürüm notları** (Notes de version) : mène aux notes de version dans Ayarlar.
- **Kurulum istemini kopyala** (Copier la consigne d'installation) : copie le texte d'installation à coller dans votre assistant IA (« ajan » dans l'application).
- **Ajan kurulumu** (Installation de l'assistant) : mène à l'écran de connexion de l'assistant.

**L'état de votre installation (« Kurulumunuzun durumu »).** La carte vérifie quatre choses : **Giriş ve erişim** (Connexion et accès), **Google girişi** (Connexion Google), **PageSpeed anahtarı** (Clé PageSpeed), **Veritabanı** (Base de données). En haut, elle indique « Her şey yolunda. » (Tout va bien.) ou « N şey dikkat istiyor. » (N choses demandent de l'attention.). En dessous, on voit la ligne de version (« Sürüm X, güncel. » (Version X, à jour.) ou « yeni sürüm Y var » (une nouvelle version Y existe)) et l'heure de la dernière vérification. Le bouton à côté d'une ligne en difficulté vous mène au réglage concerné : **Ayarları aç** (Ouvrir les paramètres) ou **Anahtar gir** (Saisir la clé). **Özeti kopyala** (Copier le résumé) copie le texte de la carte dans le presse-papiers.

**Projets.** L'état de la connexion Search Console et Analytics de chaque projet s'affiche. **Bağlantıları aç** (Ouvrir les connexions) vous mène aux paramètres du projet.

**Problèmes courants.** Il y a cinq rubriques dépliables : la page ne s'ouvre pas, le numéro de port est occupé, l'assistant ne peut pas se connecter (401), la limite PageSpeed, pas de données de requêtes. Chacune dit ce qu'il faut faire et donne le lien du réglage concerné.

**Limites de Google et du système.** Avec **Sınırları göster** (Afficher les limites), vous voyez où vous en êtes par rapport aux limites quotidiennes de Google.

**Liste du bas.** Il y a des raccourcis vers les fichiers de journal et vers l'adresse de santé (`/api/health`). Avec le paquet Windows, vous ouvrez les journaux par **Günlükleri aç** (Ouvrir les journaux) dans le menu de la barre des tâches. Avec Docker, vous utilisez la commande donnée avec **Komutu kopyala** (Copier la commande).

## Comment l'utiliser

1. Si quelque chose ne fonctionne pas, ouvrez d'abord cet écran et lisez l'avertissement de la carte.
2. Cliquez sur le bouton à côté de l'avertissement, il vous mène au bon réglage. Faites le réglage, revenez et cliquez sur **Durumu yeniden kontrol et**.
3. Si la carte dit « Her şey yolunda. » mais que le problème persiste, regardez les rubriques **Sık sorunlar** (Problèmes courants).
4. Si le problème n'est toujours pas résolu, cliquez sur **Tanılama paketi indir** et joignez le fichier au signalement sur GitHub. Avec le paquet Windows, **Sorunu bildir (GitHub)** (Signaler un problème (GitHub)), dans le menu de la barre des tâches, fait la même chose en un clic.

## Questions fréquentes

**Pourquoi la ligne « Google girişi » est-elle jaune ?** La clé d'accès Google n'a pas encore été saisie : la ligne reste jaune tant que Google n'est pas connecté. Suivez le guide de la connexion à Google.

**La ligne « Giriş ve erişim » indique « parolasız tek kullanıcı » (utilisateur unique sans mot de passe).** C'est normal. L'application ne s'ouvre que depuis votre propre ordinateur. Pour l'ouvrir depuis l'extérieur, vous devez placer devant elle votre propre accès protégé par mot de passe.

**Que contient le paquet de diagnostic ?** La version, les contrôles d'installation, le nombre de lignes des tables et le résumé des derniers audits. Il n'y a ni clé Google, ni mot de passe, ni donnée personnelle.

## Limites

Cet écran ne contrôle que l'installation elle-même. Pour trouver un problème sur votre site, regardez l'écran Audit du site ; pour voir un problème du côté de Google, regardez l'écran État de l'index.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
