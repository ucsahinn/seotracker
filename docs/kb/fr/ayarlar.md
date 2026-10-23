---
title: Paramètres
description: Vous gérez ici le thème, la clé d'accès Google, la clé PageSpeed, les limites d'utilisation et la vérification des mises à jour. C'est l'unique écran de réglages pour toute l'installation.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

Vous voyez ici où gérer la connexion à Google, la clé de vitesse et la mise à jour.

Dans l'écran **Ayarlar** (Paramètres), vous réglez ce qui concerne toute l'installation. Les réglages propres à un projet (nom, nom de domaine, propriété Search Console et Analytics) se trouvent dans la page **Proje ayarları** (Paramètres du projet) de chaque projet. Ici, vous gérez la clé d'accès nécessaire pour se connecter à Google, la clé PageSpeed, le thème et la vérification des mises à jour. À gauche, il y a les sections **Görünüm** (Apparence), **Google**, **Hizmet hesabı** (Compte de service), **Hız ölçümü** (Mesure de la vitesse), **Sınırlar** (Limites), **Hakkında** (À propos) et **Sürüm notları** (Notes de version). Le titre de chaque section porte un badge qui indique son état.

## Ce que l'écran affiche

**Görünüm.** Pour **Tema** (Thème), il y a les choix Sistem (Système), Açık (Clair) et Koyu (Sombre). Le choix est conservé dans ce navigateur. Dans un autre navigateur ou sur un autre ordinateur, vous le choisissez séparément.

**Google.** Le badge a l'une de ces trois valeurs : **Kayıtlı** (Enregistrée), **Ortamdan geliyor** (Vient de l'environnement : fournie par le fichier `.env` dans une installation Docker) ou **Eksik** (Manquante). La section affiche les deux adresses de redirection à ajouter dans Google Cloud Console (le tableau de bord développeur de Google). À côté, il y a des boutons de copie. Vous devez ajouter les deux. Si vous n'ajoutez pas l'adresse d'Analytics, seul Search Console se connecte.

Il y a deux champs : **İstemci kimliği** (Identifiant client) et **Gizli anahtar** (Clé secrète). Tous deux sont des éléments de la clé d'accès que vous obtenez de Google. Les boutons sont : **Kaydet** (Enregistrer), **Vazgeç** (Annuler), **Değiştir** (Modifier) et **Sil** (Supprimer). **Sil** coupe les connexions existantes. Vous trouvez la configuration pas à pas dans le guide de la connexion à Google.

**Hizmet hesabı (voie plus courte).** Un compte de service est un compte robot créé chez Google pour l'application. Dans le champ **JSON anahtar dosyası** (Fichier de clé JSON), vous collez le contenu du fichier téléchargé depuis Google Cloud. S'il y a un enregistrement, l'adresse e-mail du compte apparaît. L'écran indique où ajouter cette adresse :

- Search Console : « Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle » (Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur), autorisation Tam (Complète).
- Analytics : « Yönetici → Erişim yönetimi » (Administration → Gestion des accès), autorisation Görüntüleyen (Lecteur).

Le badge indique **Kayıtlı** (Enregistré) ou **Kullanılmıyor** (Inutilisé). S'il existe un compte de service enregistré, l'application le préfère à la clé d'accès Google. Le supprimer retire le compte de l'application, mais n'annule pas la clé chez Google.

**Hız ölçümü.** Il y a le champ **API anahtarı** (Clé API) et le bouton **Anahtarı test et** (Tester la clé). Le test « consomme 1 mesure ». Vous pouvez cliquer dessus toutes les dix secondes. Le badge indique **Anahtar kayıtlı** (Clé enregistrée), **Ortam anahtarı** (Clé d'environnement) ou **Anahtar eksik** (Clé manquante). Vous trouvez le détail dans le guide de la clé PageSpeed.

**Sınırlar.** Les cartes « Google ve sistem sınırları » (Limites de Google et du système) contiennent :

- Inspection d'URL (Search Console) : 2 000 par jour.
- PageSpeed Insights.
- Unités de quota quotidiennes et horaires de GA4 (Google Analytics) : 200 000 et 40 000 par défaut. Google ne communique pas ce nombre, il dit seulement ce qu'il reste.
- Limite de pages d'audit : 10 000.
- Rapports par projet : 10 000, modèles : 10.
- Plus gros rapport : 500 000 octets.

L'état de chaque carte est **Yeterli** (Suffisant), **Azalıyor** (En baisse, au-delà de 70 pour cent), **Neredeyse doldu** (Presque plein, au-delà de 90 pour cent) ou **Bilinmiyor** (Inconnu).

**Hakkında.** La ligne **Sürüm** (Version) affiche la version (comme v2.3.0). L'interrupteur **Güncellemeleri kontrol et** (Vérifier les mises à jour) est activé par défaut. Quand il est activé, l'application demande à GitHub la dernière version au plus une fois par jour. Dans ce cas, le bouton **Şimdi kontrol et** (Vérifier maintenant) apparaît aussi. S'il y a une nouvelle version, le lien **Değişiklikler** (Modifications) apparaît. Pour les installations Docker, la commande à copier apparaît aussi : `git pull && docker compose up -d --build`. Avec le paquet Windows, l'écran vous renvoie vers **Güncelle** (Mettre à jour) sur l'icône de la barre des tâches. Si la mise à jour automatique est activée, la nouvelle version s'installe toute seule.

**Sürüm notları.** Cette section liste ce qui a changé dans chaque version.

## Comment l'utiliser

1. À la première installation, saisissez d'abord l'identifiant client et la clé secrète dans la section **Google**. Saisissez ensuite la clé PageSpeed dans la section **Hız ölçümü**. Une fois les deux enregistrées, vous passez au projet et choisissez la propriété.
2. Une fois par mois, regardez la section **Sınırlar**. Le quota que vous voyez « Azalıyor » est le plus souvent la limite de l'inspection d'URL.
3. Si une nouvelle version apparaît dans **Hakkında**, mettez à jour. Les notes de version disent ce qui a changé. La vérification des mises à jour est la seule connexion de votre ordinateur qui sort vers autre chose que Google. Si vous n'en voulez pas, désactivez l'interrupteur.
4. Si vous devez changer la clé d'accès Google (par exemple pour un nouveau projet Cloud), cliquez sur **Değiştir** et collez les nouvelles valeurs. Les connexions existantes ne fonctionnent pas avec la nouvelle clé. Dans les projets, il faut **Yeniden bağlan** (Se reconnecter).

## Questions fréquentes

**Pourquoi ne puis-je pas voir ma clé secrète à l'écran ?** L'application la stocke chiffrée et ne la renvoie pas au navigateur. L'écran n'indique que le fait qu'elle est enregistrée, et l'identifiant.

**Et si la valeur donnée par `.env` dans Docker et celle saisie à l'écran se contredisent ?** Celle de l'écran l'emporte. Si vous enregistrez une valeur alors que le badge indique « Ortamdan geliyor », c'est désormais celle-ci qui est utilisée.

**Qu'envoie la vérification des mises à jour ?** Elle n'envoie aucune donnée. Elle lit la liste publique des versions de GitHub. La requête est anonyme.

**Compte de service ou clé d'accès Google ?** Le compte de service ne vous fait pas passer par l'écran de consentement et il n'expire pas. En contrepartie, vous devez donner à la main l'autorisation à ce compte dans Search Console et Analytics. Pour une installation à une seule personne, les deux conviennent. Si vous voyez souvent « süresi doldu » (expiré), passez au compte de service.

## Limites

L'écran Paramètres ne modifie ni le numéro de port, ni le dossier de données, ni les réglages réseau. Ceux-ci se trouvent dans `config.json` pour le paquet Windows et dans le fichier `.env` pour Docker. Il n'y a pas de gestion d'utilisateurs ni de mots de passe : l'application est monoutilisateur. Les cartes de quota ne sont pas le vrai compteur de Google, mais le comptage de l'application elle-même. Les inspections d'URL que vous faites à la main dans Search Console n'apparaissent pas ici, mais elles consomment la limite de Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
