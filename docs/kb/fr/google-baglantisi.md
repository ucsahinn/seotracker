---
title: Connexion à Google
description: Obtenez une fois une clé d'accès Google, collez-la dans l'application et choisissez votre site : les données de Search Console et d'Analytics 4 arrivent.
kind: nasil-yapilir
updated: 2026-10-22
---

L'interface de l'application est disponible en turc et en anglais. La langue se choisit dans Ayarlar → Görünüm → Dil. Ce guide donne chaque nom de bouton et d'écran en turc, suivi de sa traduction française entre parenthèses.

À la fin, l'application sera connectée à Google en votre nom et lira les données de votre site. Pour cela, vous obtenez une fois une « clé d'accès Google » chez Google. Cela prend environ dix minutes et vous n'aurez plus à y revenir. Une voie plus courte, le compte de service, est décrite à la fin de la page ; elle convient à la plupart des gens.

## Ce qu'il vous faut

- Un site vérifié dans Search Console (une propriété). S'il n'est pas vérifié, l'application ne le voit pas dans la liste.
- Pour Analytics 4, au moins l'autorisation « Lecteur » sur cette propriété. C'est facultatif : Search Console seul suffit.
- Un compte Google. Google Cloud Console (la page des développeurs de Google) est gratuite et ne demande pas de carte bancaire.
- L'application ouverte. Vous y copierez les deux adresses de redirection (les adresses par lesquelles Google vous ramène dans l'application après l'autorisation).

## Étapes

1. Dans l'application, ouvrez **Ayarlar → Google** (Paramètres → Google). Vous voyez deux adresses. L'une se termine par `/api/gsc/oauth/callback` (Search Console), l'autre par `/api/ga4/oauth/callback` (Analytics). Avec le paquet Windows, les adresses commencent par `http://127.0.0.1:3001` ; avec Docker, par `http://localhost:3001`. Notez-les toutes les deux quelque part.
2. Dans le navigateur, allez à l'adresse `console.cloud.google.com`. Dans le sélecteur de projet en haut, choisissez **Yeni proje** (Nouveau projet). Le nom n'a pas d'importance, vous pouvez écrire « seowatcher ».
3. Ouvrez la page **API'ler ve Hizmetler → Kitaplık** (API et services → Bibliothèque). Dans la zone de recherche, tapez **Google Search Console API**, cliquez dessus et choisissez **Etkinleştir** (Activer). Si vous voulez aussi connecter Analytics, faites la même chose pour **Google Analytics Admin API** et **Google Analytics Data API**.
4. Ouvrez la page **API'ler ve Hizmetler → OAuth izin ekranı** (API et services → Écran de consentement OAuth). Comme type d'utilisateur, choisissez **Harici** (Externe). Pour le nom de l'application, mettez le nom de votre choix ; dans les champs d'e-mail, écrivez votre propre adresse. L'état de publication peut rester « Test ».
5. Sur la même page, ajoutez votre propre compte Google dans la section **Test kullanıcıları** (Utilisateurs de test). Aucune autre validation de la part de Google n'est nécessaire.
6. Sur la page **API'ler ve Hizmetler → Kimlik bilgileri** (API et services → Identifiants), cliquez sur **Kimlik bilgisi oluştur** (Créer des identifiants), puis choisissez **OAuth istemci kimliği** (ID client OAuth). C'est votre clé d'accès Google.
7. Comme type d'application, choisissez **Web uygulaması** (Application Web).
8. Dans la section **Yetkilendirilmiş yönlendirme URI'leri** (URI de redirection autorisés), ajoutez les deux adresses de l'étape 1. Ne mettez pas de barre oblique à la fin. Un seul caractère de différence provoque chez Google l'erreur « redirect_uri_mismatch » (l'adresse ne correspond pas).
9. Cliquez sur **Oluştur** (Créer). Google affiche un identifiant client et une clé secrète.
10. Revenez dans l'application. Dans **Ayarlar → Google**, collez dans le champ **İstemci kimliği** (Identifiant client) l'identifiant qui se termine par `.apps.googleusercontent.com`. Dans le champ **Gizli anahtar** (Clé secrète), collez la clé qui commence par `GOCSPX-`.
11. Cliquez sur **Kaydet** (Enregistrer). La notification « Google erişim anahtarı kaydedildi » (Clé d'accès Google enregistrée) apparaît. Aucun redémarrage n'est nécessaire. Si vous collez l'identifiant dans le mauvais champ, l'application vous prévient : « Kimlik .apps.googleusercontent.com ile bitmeli. Gizli anahtarı değil, istemci kimliğini yapıştırın. » (L'identifiant doit se terminer par .apps.googleusercontent.com. Collez l'identifiant client, pas la clé secrète.)
12. Si vous n'avez pas encore de projet, créez-en un d'abord avec **Yeni proje** (Nouveau projet). Pour le détail, voir le guide [Projets](/docs/projeler/).
13. Allez dans votre projet : **Proje ayarları → Bağlantılar** (Paramètres du projet → Connexions). Sur la carte **Google Search Console**, cliquez sur **Bağlan** (Se connecter).
14. Sur l'écran d'autorisation de Google, choisissez le compte que vous avez ajouté comme utilisateur de test et donnez votre autorisation. De retour dans l'application, la notification « Search Console bağlandı » (Search Console est connecté) apparaît.
15. Dans la liste **Mülk seç** (Choisir une propriété), choisissez votre site, puis cliquez sur **Mülkü kaydet** (Enregistrer la propriété). Si vous choisissez une propriété de domaine, la carte indique « Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar. » (Propriété de domaine : couvre tous les sous-domaines et les adresses http/https.)
16. Pour Analytics, sur le même écran, cliquez sur **Bağlan** dans la carte **Google Analytics**, donnez l'autorisation, puis choisissez la propriété. Les deux connexions demandent chacune une autorisation. L'une ne couvre pas l'autre.

### Voie plus courte : le compte de service

Un compte de service est un compte spécial qui se connecte à Google à votre place. Il ne demande ni écran de consentement ni adresse de redirection. C'est la voie recommandée pour la plupart des gens. Si vous voulez entrer dans l'application avec votre propre compte Google, suivez la voie ci-dessus.

1. Ouvrez `console.cloud.google.com`. Dans le même projet Cloud, vérifiez que les API de l'étape 3 sont activées. Allez à la page **IAM ve Yönetici → Hizmet hesapları** (IAM et administration → Comptes de service).
2. Cliquez sur **Hizmet hesabı oluştur** (Créer un compte de service). Donnez-lui un nom. Sautez les étapes de rôle et créez le compte.
3. Sur la ligne du compte, ouvrez l'onglet **Anahtarlar** (Clés). Cliquez sur **Anahtar ekle → Yeni anahtar oluştur** (Ajouter une clé → Créer une clé).
4. Comme type de clé, choisissez **JSON** et cliquez sur **Oluştur** (Créer). Un fichier est téléchargé sur votre ordinateur.
5. Dans l'application, ouvrez **Ayarlar → Hizmet hesabı** (Paramètres → Compte de service). Ouvrez le fichier téléchargé avec le Bloc-notes, collez tout son contenu dans le champ et enregistrez. L'écran affiche l'adresse e-mail du compte.
6. Dans Search Console, cliquez sur **Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle** (Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur). Saisissez cette adresse e-mail et choisissez l'autorisation **Tam** (Complète).
7. Si vous utilisez Analytics, ouvrez dans Google Analytics la section **Yönetici → Erişim yönetimi** (Administration → Gestion des accès) de la propriété. Ajoutez la même adresse e-mail avec l'autorisation **Görüntüleyen** (Lecteur).

Si un compte de service est enregistré, l'application l'utilise. La ligne « Şu an kullanılan » (Actuellement utilisé) de l'écran **Ayarlar** indique lequel est actif.

## Vérification

- Sur les cartes de **Proje ayarları → Bağlantılar**, le badge doit indiquer **Bağlı** (Connecté).
- Les quatre cartes de chiffres de l'écran **Panel** (Tableau de bord) doivent se remplir en quelques secondes. Sur un site neuf, les chiffres peuvent être à zéro. Ce n'est pas une erreur de connexion.
- Dans **Ayarlar → Google**, le badge doit indiquer **Kayıtlı** (Enregistré).

## Questions fréquentes

**Où la clé secrète est-elle stockée ?** Dans la base de données de cet ordinateur, chiffrée. La clé qui la chiffre est le fichier `instance-secret` (dans le dossier de données sous Windows, dans le volume de données avec Docker). La clé n'est pas envoyée au navigateur.

**Puis-je utiliser la même clé d'accès dans plusieurs projets ?** Oui. Une seule par installation suffit. Chaque projet choisit sa propre propriété.

**La connexion a sauté au bout de quelques jours.** Pour les applications à l'état « Test », Google peut limiter l'autorisation à sept jours. La carte indique « Bağlantının süresi doldu » (La connexion a expiré). Il suffit de cliquer sur **Yeniden bağlan** (Se reconnecter). La solution durable est de passer l'écran de consentement en « Production », ou d'utiliser un compte de service.

**Quelles autorisations demande-t-elle ?** En lecture seule uniquement : `webmasters.readonly` pour Search Console, `analytics.readonly` pour Analytics. L'application ne peut rien modifier chez Google.

## En cas de problème

- **Google affiche « redirect_uri_mismatch ».** L'adresse de redirection dans Cloud Console n'est pas strictement identique à celle de l'application. Utilisez le bouton de copie de l'écran **Ayarlar**. http au lieu de https, 127.0.0.1 au lieu de localhost, ou une barre oblique finale suffisent à provoquer l'erreur.
- **L'avertissement « Google erişim anahtarı eksik » (Clé d'accès Google manquante) s'affiche.** Les étapes 10 et 11 ont été sautées ou l'enregistrement a échoué. Dans l'écran **Ayarlar**, le badge doit indiquer **Kayıtlı**.
- **Google affiche « access_denied ».** Le compte avec lequel vous vous êtes connecté ne figure pas dans la liste des utilisateurs de test de l'écran de consentement. Ajoutez le compte à la liste ou choisissez le bon compte.
- **La liste des propriétés est vide.** Ce compte n'a pas de site vérifié dans Search Console ni d'autorisation Analytics. Vérifiez d'abord le site.
- **« Bağlantısı tamamlanmadı » (La connexion n'a pas abouti) et « state_mismatch » s'affichent.** Vous avez ouvert l'écran d'autorisation dans deux onglets, ou vous avez attendu plus de dix minutes. Recommencez depuis le début dans un seul onglet. Si les cookies du navigateur (de petits fichiers d'enregistrement) sont désactivés, activez-les.
- **« Google hesabı zaten bağlı » (Le compte Google est déjà connecté) s'affiche.** Le compte a déjà été rattaché à un autre enregistrement. Avec **Hesabı kaldır** (Retirer le compte) dans le sélecteur de propriété, retirez l'ancien puis reconnectez-vous.
- **Les connexions ont sauté après une mise à jour.** La clé de chiffrement a changé (avec Docker, `BETTER_AUTH_SECRET` a été ajouté ou le volume de données a été recréé). Sur les cartes, cliquez sur **Yeniden bağlan**.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
