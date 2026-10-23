---
title: Dépannage
description: Problèmes fréquents par symptôme, cause et solution : port occupé, alerte Windows, erreurs Google, quota, audit bloqué, graphiques vides, assistant 401.
kind: sorun-giderme
updated: 2026-10-23
---

L'interface de l'application est en turc. Ce guide donne chaque nom de bouton et d'écran en turc, suivi de sa traduction française entre parenthèses.

Si quelque chose ne fonctionne pas, regardez d'abord la carte « Kurulumunuzun durumu » (L'état de votre installation) de l'écran **Yardım** (Aide) dans l'application. La carte contrôle la connexion et l'accès, la connexion Google, la clé PageSpeed et la base de données. Si elle dit « N şey dikkat istiyor » (N choses demandent de l'attention), le bouton à côté vous mène au bon réglage. Les problèmes ci-dessous sont classés du plus fréquent au plus rare.

## La page ne s'ouvre pas

**Symptôme :** Le navigateur affiche « connexion refusée ».

**Cause :** L'application n'est pas démarrée.

**Solution :** Sous Windows, regardez l'icône dans la barre des tâches. Si l'icône n'est pas visible, cliquez sur la flèche ^ de la barre des tâches. Sinon, ouvrez seowatcher depuis le menu Démarrer. Si l'icône indique « Hata » (Erreur), faites un clic droit et choisissez **Yeniden başlat** (Redémarrer). Avec Docker, tapez `docker compose ps`. Si l'état n'est pas healthy, tapez `docker compose up -d`.

## Le numéro de port est occupé

**Symptôme :** Sous Windows, l'icône indique « 3001 ve sonraki 9 adres numarası (port) dolu » (le port 3001 et les 9 suivants sont occupés). Avec Docker, « Bind for 127.0.0.1:3001 failed » s'affiche.

**Cause :** Un autre programme utilise le même numéro de port.

**Solution :** Le paquet Windows choisit normalement un numéro libre entre 3002 et 3010, vous l'indique dans une bulle et ne l'utilise que pour ce démarrage. Quand le 3001 est de nouveau libre, cliquez sur **Yeniden başlat** et l'application revient au 3001. Si tous sont pris, écrivez un autre numéro dans le fichier `config.json` du dossier de données. Avec Docker, placez un fichier `.env` contenant la ligne `PORT=3002` et tapez `docker compose up -d --force-recreate seotracker`. Quand le numéro change, mettez aussi à jour les adresses de redirection Google.

## L'icône indique « Windows bileşeni eksik »

**Symptôme :** L'application ne s'ouvre pas. L'icône indique « Windows bileşeni eksik » (Composant Windows manquant), ou le journal mentionne « Workers runtime failed to start » et « 0xc0000005 ».

**Cause :** Le moteur de l'application a besoin du paquet Visual C++ de Microsoft (2015-2022, 64 bits). Sur un Windows tout neuf, ce paquet est absent ou trop ancien.

**Solution :** Cliquez sur la bulle qui apparaît, ou faites un clic droit sur l'icône et choisissez **Eksik Windows bileşenini kur** (Installer le composant Windows manquant). Windows demande une fois l'autorisation d'un administrateur. À la fin de l'installation, l'application redémarre toute seule. Si vous n'avez pas le paquet, téléchargez-le sur la page de Microsoft : `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## L'autorisation d'administrateur n'a pas été donnée

**Symptôme :** Pendant l'installation, l'autorisation pour Visual C++ a été demandée, vous avez répondu **Hayır** (Non). L'installation a affiché « Microsoft Visual C++ çalışma zamanı kurulamadı » (L'environnement d'exécution Microsoft Visual C++ n'a pas pu être installé).

**Cause :** Le composant Windows nécessaire n'a pas pu être installé. Comme l'application embarque une copie des fichiers dont elle a besoin, elle démarre quand même sur la plupart des ordinateurs.

**Solution :** Si l'application a démarré, vous n'avez rien à faire. Sinon, faites un clic droit sur l'icône de la barre des tâches (si elle n'est pas visible, cliquez sur la flèche ^). Choisissez **Eksik Windows bileşenini kur** et donnez cette fois l'autorisation. Ou téléchargez et installez le composant depuis l'adresse `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## L'icône indique « Uygulamanın motoru çöktü »

**Symptôme :** L'application ne s'ouvre pas. Le journal contient « Workers runtime failed to start » et « 0xc0000005 », mais le paquet Visual C++ est installé.

**Cause :** Le moteur de l'application (workerd) bute sur un fichier système de cet ordinateur. Au démarrage, l'application essaie le moteur seul. S'il indique « Tek başına da başlayamıyor » (Il ne peut pas démarrer seul non plus), le problème est dans l'ordinateur. S'il indique « Tek başına çalışıyor » (Il fonctionne seul), le problème est dans le dossier de données ou dans la configuration.

**Solution :** Cliquez d'abord sur **Kurulumu onar** (Réparer l'installation). Si cela ne règle rien, faites un clic droit sur l'icône et choisissez **Sorunu bildir (GitHub)** (Signaler un problème (GitHub)). Les informations de diagnostic (version de Windows, processeur, nom du module fautif, vidage de plantage) sont ajoutées automatiquement au signalement : vous n'avez qu'à l'envoyer. Les vidages de plantage se trouvent dans le dossier `%LOCALAPPDATA%\seowatcher\logs\dumps`. Si vous le souhaitez, joignez-les aussi au signalement.

## Windows indique « a protégé votre ordinateur »

**Symptôme :** Le fichier d'installation ne s'ouvre pas, un écran d'avertissement bleu apparaît.

**Cause :** Le fichier n'est pas signé. Windows affiche cet écran pour les éditeurs qu'il ne connaît pas.

**Solution :** Cliquez sur le texte **Daha fazla bilgi** (Informations complémentaires) à l'écran. Le bouton **Yine de çalıştır** (Exécuter quand même) apparaît. Si vous avez un doute, comparez le résumé SHA-256 du fichier (son empreinte) avec le fichier `SHA256SUMS.txt` de la page des versions.

## Google indique « redirect_uri_mismatch »

**Symptôme :** Quand vous cliquez sur **Bağlan** (Se connecter), Google affiche une page d'erreur.

**Cause :** L'adresse de redirection dans Google Cloud Console n'est pas strictement identique à celle de l'application.

**Solution :** Copiez les deux adresses avec le bouton de copie de **Ayarlar → Google** (Paramètres → Google). Dans Cloud Console, collez-les dans le champ d'adresse de la clé d'accès Google (le client OAuth). Localhost au lieu de 127.0.0.1, http au lieu de https, ou une barre oblique finale font la différence.

## « Google erişim anahtarı eksik »

**Symptôme :** Dans les paramètres du projet, l'onglet Bağlantılar (Connexions) affiche un avertissement jaune.

**Cause :** L'identifiant client et la clé secrète n'ont pas été saisis dans **Ayarlar → Google**. Ou, avec Docker, la clé de chiffrement fait moins de 32 caractères.

**Solution :** Faites les étapes 10 et 11 du guide de la connexion à Google. Avec Docker, si vous avez fourni `BETTER_AUTH_SECRET` à la main, rallongez-le. Si vous le laissez vide, l'application le génère elle-même.

## Google indique « access_denied »

**Symptôme :** Après l'écran d'autorisation, un avertissement « iptal edildi » (annulé) apparaît.

**Cause :** Le compte Google avec lequel vous vous êtes connecté ne figure pas dans la liste des utilisateurs de test de l'écran de consentement.

**Solution :** Dans Cloud Console, ajoutez le compte dans **OAuth izin ekranı → Test kullanıcıları** (Écran de consentement OAuth → Utilisateurs de test). Cliquez ensuite de nouveau sur **Bağlan**.

## La connexion a expiré

**Symptôme :** La carte Connexions indique « Bağlantının süresi doldu » (La connexion a expiré) et aucune donnée n'arrive.

**Cause :** Pour les applications à l'état « Test », Google peut révoquer l'autorisation au bout de sept jours. La clé de chiffrement a aussi pu changer.

**Solution :** Cliquez sur **Yeniden bağlan** (Se reconnecter) dans la carte. Si cela se répète souvent, passez l'écran de consentement en production, ou passez à un compte de service (**Ayarlar → Hizmet hesabı**, Paramètres → Compte de service).

## Pas de données de requêtes, graphiques vides

**Symptôme :** Les cartes du tableau de bord sont à zéro. Performance de recherche indique « Bu dönem için henüz veri yok » (Pas encore de données pour cette période).

**Cause :** Il y a trois possibilités. Le site est récent et Google n'affiche pas encore d'impressions. Ou Search Console a trois jours de retard et la période choisie est trop courte. Ou la mauvaise propriété a été choisie.

**Solution :** Mettez la période sur **Son 3 ay** (3 derniers mois). Dans les paramètres du projet, vérifiez que la propriété est le bon site. Une propriété de domaine couvre tous les sous-domaines, une propriété à préfixe d'URL ne les couvre pas. Sur un site récent, les lignes de requêtes peuvent arriver après des semaines. Le tableau des pages se remplit plus tôt.

## Le total du tableau ne correspond pas à la carte

**Symptôme :** Quand vous additionnez les impressions du tableau des pages, le résultat est plus grand que le nombre de la carte.

**Cause :** Ce n'est pas une erreur. Google compte séparément chaque page qui apparaît pour la même recherche. La carte est le total du site.

**Solution :** Lisez le total sur la carte. Interprétez le tableau page par page.

## L'audit est resté bloqué sur « Sürüyor » (En cours)

**Symptôme :** Pas de progression depuis une demi-heure.

**Cause :** L'application a peut-être redémarré, ou le traitement a été interrompu.

**Solution :** Patientez. L'application contrôle les audits qui restent « en cours » depuis plus de 15 minutes. S'il n'y a aucun signe de vie, elle le ferme avec « Başarısız » (Échoué) et en écrit la cause. Cliquez ensuite sur **Aynı ayarlarla yeniden başlat** (Relancer avec les mêmes réglages). Ne lancez pas deux audits en même temps avec la mesure de vitesse : ils se ralentissent mutuellement.

## L'audit indique « Engellendik » (Nous avons été bloqués)

**Symptôme :** Un avertissement jaune apparaît : « Denetim bu siteyi tamamen tarayamadı. » (L'audit n'a pas pu explorer entièrement ce site.) ou « N sayfada engellendik. » (Nous avons été bloqués sur N pages.)

**Cause :** La protection anti-bots du site (Cloudflare ou un pare-feu) a arrêté l'explorateur de site de l'application.

**Solution :** Dans le pare-feu, autorisez l'agent utilisateur nommé `seotracker-audit`, ou placez l'adresse réseau (IP) de votre ordinateur dans la liste autorisée. Si le site n'est pas le vôtre, il n'y a rien à faire. Les résultats restent limités aux pages qui ont pu être explorées.

## La mesure de vitesse est incomplète ou absente

**Symptôme :** L'onglet Vitesse est vide ou n'a que très peu de lignes. La carte de quota indique « Kota doldu » (Quota atteint), « Dakikalık sınır » (Limite par minute) ou « Anahtar yok » (Pas de clé).

**Cause :** Il n'y a pas de clé PageSpeed (au plus 50 pages sont mesurées). Ou le quota quotidien de Google est épuisé.

**Solution :** Obtenez une clé gratuite en suivant le guide de la clé PageSpeed. Si le quota quotidien est épuisé, le reste est complété demain lors d'un nouvel audit. Si la mesure de vitesse était désactivée au lancement de l'audit, elle n'est pas faite après coup pour cet audit.

## Inspection d'URL : « limite quotidienne atteinte »

**Symptôme :** Dans l'onglet État de l'index, le bouton ne fonctionne pas. « Google'ın günlük 2.000 adres sınırına ulaşıldı » (La limite quotidienne de 2 000 adresses de Google est atteinte) s'affiche.

**Cause :** Il y a un quota de 2 000 questions par jour et par propriété. L'application, votre assistant et les requêtes que vous faites à la main dans Search Console puisent dans la même réserve.

**Solution :** Continuez demain. L'application ne repose que les réponses devenues anciennes, votre quota n'est pas gaspillé.

## Le trafic localhost apparaît dans Analytics

**Symptôme :** Dans le tableau des pages d'entrée, la colonne Nom de domaine (Alan adı) indique localhost ou 127.0.0.1.

**Cause :** La copie de test de votre site charge aussi la même balise Analytics.

**Solution :** Réglez la balise pour qu'elle ne se charge que sur le vrai nom de domaine. Dans la plupart des outils, il existe une option de « contrôle du nom de domaine ». L'application n'écarte pas ces lignes toute seule. En attendant, repérez-les grâce à la colonne Nom de domaine.

## L'assistant ne peut pas se connecter (401)

**Symptôme :** Claude Code ou Codex indique « Unauthorized ».

**Cause :** Le mot de passe n'est pas envoyé, ou il est faux.

**Solution :** Copiez de nouveau le mot de passe. Sous Windows, il se trouve dans le fichier `mcp-token` du dossier de données. Avec Docker, tapez `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Supprimez le caractère de fin de ligne à la fin de la valeur. Si vous ne voulez pas utiliser de terminal, ouvrez le fichier avec le Bloc-notes, sélectionnez toute la ligne et copiez-la. Ne laissez pas de saut de ligne. Dans Claude Code, tapez `/mcp` et choisissez **Reconnect**.

## Docker démarre très lentement la première fois, ou reste « unhealthy »

**Symptôme :** `docker compose ps` n'indique pas healthy, même après cinq minutes.

**Cause :** Au premier démarrage, l'application est compilée à l'intérieur du conteneur et demande environ 2 Go de mémoire. Si la mémoire ne suffit pas, la compilation échoue.

**Solution :** Tapez `docker compose logs --tail 50` et regardez les dernières lignes. S'il y a une erreur de mémoire, donnez plus de mémoire aux conteneurs dans les paramètres de Docker Desktop. Tapez ensuite `docker compose up -d --build`.

## Où sont les données et les journaux ?

Sous Windows, tout est dans le dossier `%LOCALAPPDATA%\seowatcher` : `data` (la base de données), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Quand un fichier journal devient trop gros (`server.log` 5 Mo, les autres 1 Mo), l'ancien reste à côté sous un nom comme `server.old.log` et un nouveau repart de zéro. Le dossier `logs\wrangler` contient les journaux détaillés du moteur ; les fichiers de plus de 30 jours sont supprimés automatiquement. **Günlükleri aç** (Ouvrir les journaux) et **Veri klasörünü aç** (Ouvrir le dossier de données), dans le menu de la barre des tâches, y mènent.

Avec Docker, les données sont dans le volume `seotracker_data` (`/app/.wrangler`). Vous voyez les journaux avec la commande `docker compose logs -f`.

Quand vous signalez un problème, cliquez sur le bouton **Tanılama paketi indir** (Télécharger le paquet de diagnostic) de l'écran **Yardım**. Le fichier contient la version, les contrôles d'installation et les 25 derniers audits, aucun secret. Joignez le fichier au signalement sur GitHub.

## Avertissements du lanceur

Les avertissements qui apparaissent sur l'icône de la barre des tâches et ce qu'il faut faire :

- **« Sunucu 120 saniyede yanıt vermedi » (Le serveur n'a pas répondu en 120 secondes).** Dans le menu, cliquez sur **Yeniden başlat**. Sinon, cliquez sur **Günlükleri aç** et regardez les dernières lignes de `server.log`.
- **« seowatcher yeniden başlatılıyor » (seowatcher redémarre).** Le serveur s'est arrêté tout seul et l'application le relance. Actualisez la page ouverte après quelques secondes.
- **« Sunucu 10 dakikada üç kez kapandı » (Le serveur s'est arrêté trois fois en 10 minutes).** L'application a cessé de le relancer. Cliquez sur **Kurulumu onar** et, si cela ne règle rien, sur **Sorunu bildir (GitHub)**.
- **« Kurulum eksik » (Installation incomplète).** **Kurulumu onar** remet les fichiers manquants en téléchargeant le fichier d'installation. S'il n'y a pas d'internet, la page des versions s'ouvre ; téléchargez le fichier d'installation et lancez-le.
- **« 3001 numarası dolu, 3002 kullanılıyor » (Le port 3001 est occupé, utilisation du 3002).** Un autre programme occupe le 3001. Si vous obtenez une erreur en vous connectant à Google, fermez ce programme et cliquez sur **Yeniden başlat**.
- **« Güncelleme denetlenemedi » (La mise à jour n'a pas pu être vérifiée) ou « Güncelleme yapılamadı » (La mise à jour n'a pas pu être faite).** La bulle donne la cause. Si elle dit « GitHub'a ulaşılamadı » (GitHub est inaccessible), vérifiez votre connexion internet. Si elle dit « GitHub şu an çok fazla istek alıyor » (GitHub reçoit trop de requêtes en ce moment), réessayez dans une heure. Si l'empreinte ne correspond pas, téléchargez le fichier d'installation depuis la page des versions. Dans tous les cas, la version installée continue de fonctionner.
- **« Güncelleme kurulmadı » (La mise à jour n'a pas été installée).** La fenêtre d'installation a été fermée ou l'autorisation d'administrateur n'a pas été donnée. Réessayez avec **Güncelle** dans le menu.
- **« Windows bileşeni kurulamadı » (Le composant Windows n'a pas pu être installé).** Dans le menu, cliquez sur **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
