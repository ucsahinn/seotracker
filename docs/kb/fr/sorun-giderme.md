---
title: Dépannage
description: Problèmes fréquents par symptôme, cause et solution : port occupé, alerte Windows, erreurs Google, quota, audit bloqué, graphiques vides, assistant 401.
kind: sorun-giderme
updated: 2026-10-27
---

Si quelque chose ne fonctionne pas, regardez d’abord la carte « État de l’application » de l’écran **Aide** dans l’application. La carte regarde cette installation elle-même et contrôle la connexion et l’accès, la connexion Google, la clé PageSpeed et la base de données. Si elle dit « N éléments nécessitent votre attention », le bouton à côté vous mène au bon réglage. Les problèmes ci-dessous sont classés du plus fréquent au plus rare.

L’interface de l’application existe en six langues : turc, anglais, allemand, français, italien et portugais. La langue se choisit dans Paramètres → Apparence → Langue. Ce guide donne les boutons et les écrans sous le nom qu’ils portent dans l’interface en français. Le menu de la zone de notification de Windows n’existe qu’en turc. Là, le nom turc est suivi de sa traduction française entre parenthèses.

## La page ne s’ouvre pas

**Symptôme :** Le navigateur affiche « connexion refusée ».

**Cause :** L’application n’est pas démarrée.

**Solution :** Sous Windows, regardez l’icône dans la barre des tâches. Si l’icône n’est pas visible, cliquez sur la flèche ^ de la barre des tâches. Sinon, ouvrez seowatcher depuis le menu Démarrer. Si l’icône indique « Hata » (Erreur), faites un clic droit et choisissez **Yeniden başlat** (Redémarrer). Avec Docker, tapez `docker compose ps`. Si l’état n’est pas healthy, tapez `docker compose up -d`.

## Le numéro de port est occupé

**Symptôme :** Sous Windows, une bande jaune apparaît en haut de chaque écran de l’application : « seowatcher tourne cette fois sur 3002, car un autre programme utilise 3001 (par exemple une ancienne copie Docker). La connexion Google est configurée pour 3001 ; fermez ce programme et redémarrez seowatcher. » La connexion à Google donne une erreur. Ou bien l’icône indique « 3001 ve sonraki 9 adres numarası (port) dolu » (le port 3001 et les 9 suivants sont occupés). La même phrase figure dans la carte « État de l’application » de l’écran **Aide**. Avec Docker, « Bind for 127.0.0.1:3001 failed » s’affiche.

**Cause :** Un autre programme utilise le même numéro de port. La cause la plus fréquente est une ancienne copie Docker que vous avez lancée un jour. Docker Desktop peut la relancer tout seul au démarrage de l’ordinateur. Les adresses de redirection de Google indiquent 3001, la connexion Google ne marche donc pas tant que l’application est ouverte sur 3002.

**Solution :** Le paquet Windows choisit normalement un numéro libre entre 3002 et 3010, vous l’indique dans une bulle et dans la bande du haut, et ne l’utilise que pour ce démarrage. Fermez d’abord le programme qui occupe 3001. Si c’est une ancienne copie Docker, arrêtez le conteneur seotracker dans Docker Desktop ou lancez `docker compose stop` dans le dossier du projet. Choisissez ensuite **Yeniden başlat** (Redémarrer) dans le menu. L’application revient au 3001 et la bande disparaît. Fermer la bande ne fait que la masquer pour cet onglet ; cela ne règle rien. Si les numéros 3002 à 3010 sont tous pris, écrivez un autre numéro dans le fichier `config.json` du dossier de données. Avec Docker, placez un fichier `.env` contenant la ligne `PORT=3002` et tapez `docker compose up -d --force-recreate seotracker`. Quand le numéro change, mettez aussi à jour les adresses de redirection Google.

## L’icône indique « Windows bileşeni eksik »

**Symptôme :** L’application ne s’ouvre pas. L’icône indique « Windows bileşeni eksik » (Composant Windows manquant), ou le journal mentionne « Workers runtime failed to start » et « 0xc0000005 ».

**Cause :** Le moteur de l’application a besoin du paquet Visual C++ de Microsoft (2015-2022, 64 bits). Sur un Windows tout neuf, ce paquet est absent ou trop ancien.

**Solution :** Cliquez sur la bulle qui apparaît, ou faites un clic droit sur l’icône et choisissez **Eksik Windows bileşenini kur** (Installer le composant Windows manquant). Windows demande une fois l’autorisation d’un administrateur. À la fin de l’installation, l’application redémarre toute seule. Si vous n’avez pas le paquet, téléchargez-le sur la page de Microsoft : `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## L’autorisation d’administrateur n’a pas été donnée

**Symptôme :** Pendant l’installation, l’autorisation pour Visual C++ a été demandée, vous avez répondu **Non**. L’installation a affiché « Microsoft Visual C++ çalışma zamanı kurulamadı » (L’environnement d’exécution Microsoft Visual C++ n’a pas pu être installé).

**Cause :** Le composant Windows nécessaire n’a pas pu être installé. Comme l’application embarque une copie des fichiers dont elle a besoin, elle démarre quand même sur la plupart des ordinateurs.

**Solution :** Si l’application a démarré, vous n’avez rien à faire. Sinon, faites un clic droit sur l’icône de la barre des tâches (si elle n’est pas visible, cliquez sur la flèche ^). Choisissez **Eksik Windows bileşenini kur** et donnez cette fois l’autorisation. Ou téléchargez et installez le composant depuis l’adresse `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## L’icône indique « Uygulamanın motoru çöktü » (le moteur de l’application a planté)

**Symptôme :** L’application ne s’ouvre pas. Le journal contient « Workers runtime failed to start » et « 0xc0000005 », mais le paquet Visual C++ est installé.

**Cause :** Le moteur de l’application (workerd) bute sur un fichier système de cet ordinateur. Au démarrage, l’application essaie le moteur seul. S’il indique « Tek başına da başlayamıyor » (Il ne peut pas démarrer seul non plus), le problème est dans l’ordinateur. S’il indique « Tek başına çalışıyor » (Il fonctionne seul), le problème est dans le dossier de données ou dans la configuration.

**Solution :** Cliquez d’abord sur **Kurulumu onar** (Réparer l’installation). Si cela ne règle rien, faites un clic droit sur l’icône et choisissez **Sorunu bildir (GitHub)** (Signaler un problème (GitHub)). Les informations de diagnostic (version de Windows, processeur, nom du module fautif, vidage de plantage) sont ajoutées automatiquement au signalement : vous n’avez qu’à l’envoyer. Les vidages de plantage se trouvent dans le dossier `%LOCALAPPDATA%\seowatcher\logs\dumps`. Si vous le souhaitez, joignez-les aussi au signalement.

## Windows indique « a protégé votre ordinateur »

**Symptôme :** Le fichier d’installation ne s’ouvre pas, un écran d’avertissement bleu apparaît.

**Cause :** Le fichier n’est pas signé. Windows affiche cet écran pour les éditeurs qu’il ne connaît pas.

**Solution :** Cliquez sur le texte **Informations complémentaires** à l’écran. Le bouton **Exécuter quand même** apparaît. Si vous avez un doute, comparez le résumé SHA-256 du fichier (son empreinte) avec le fichier `SHA256SUMS.txt` de la page des versions.

## Google indique « redirect_uri_mismatch »

**Symptôme :** Quand vous cliquez sur **Connecter**, Google affiche une page d’erreur.

**Cause :** L’adresse de redirection dans Google Cloud Console n’est pas strictement identique à celle de l’application.

**Solution :** Copiez les deux adresses avec le bouton de copie de **Paramètres → Google**. Dans Cloud Console, collez-les dans le champ d’adresse de la clé d’accès Google (le client OAuth). Localhost au lieu de 127.0.0.1, http au lieu de https, ou une barre oblique finale font la différence.

## « Clé d’accès Google manquante »

**Symptôme :** Dans les paramètres du projet, l’onglet Connexions affiche un avertissement jaune.

**Cause :** L’identifiant client et la clé secrète n’ont pas été saisis dans **Paramètres → Google**. Ou, avec Docker, la clé de chiffrement fait moins de 32 caractères.

**Solution :** Suivez la voie 2 (client OAuth) du guide [Connexion à Google](/docs/google-baglantisi/). Avec Docker, si vous avez fourni `BETTER_AUTH_SECRET` à la main, rallongez-le. Si vous le laissez vide, l’application le génère elle-même.

## Google indique « access_denied »

**Symptôme :** Après l’écran d’autorisation, le message « La connexion à Google a été annulée » apparaît.

**Cause :** Le compte Google avec lequel vous vous êtes connecté ne figure pas dans la liste des utilisateurs de test de l’écran de consentement.

**Solution :** Dans Cloud Console, ajoutez le compte dans **Écran de consentement OAuth → Utilisateurs tests**. Cliquez ensuite de nouveau sur **Connecter**.

## La connexion a expiré

**Symptôme :** La carte Connexions indique « La connexion a expiré » et aucune donnée n’arrive.

**Cause :** Pour les applications à l’état « Test », Google peut révoquer l’autorisation au bout de sept jours. La clé de chiffrement a aussi pu changer.

**Solution :** Cliquez sur **Reconnecter** dans la carte. Si cela se répète souvent, passez l’écran de consentement en production, ou passez à un compte de service (**Paramètres → Compte de service**).

## Pas de données de requêtes, graphiques vides

**Symptôme :** Les cartes du tableau de bord sont à zéro. Performances de recherche indique « Aucune donnée pour cette période pour l’instant ».

**Cause :** Il y a trois possibilités. Le site est récent et Google n’affiche pas encore d’impressions. Ou Search Console a trois jours de retard et la période choisie est trop courte. Ou la mauvaise propriété a été choisie.

**Solution :** Mettez la période sur **3 derniers mois**. Dans les paramètres du projet, vérifiez que la propriété est le bon site. Une propriété de domaine couvre tous les sous-domaines, une propriété à préfixe d’URL ne les couvre pas. Sur un site récent, les lignes de requêtes peuvent arriver après des semaines. Le tableau des pages se remplit plus tôt.

## Le total du tableau ne correspond pas à la carte

**Symptôme :** Quand vous additionnez les impressions du tableau des pages, le résultat est plus grand que le nombre de la carte.

**Cause :** Ce n’est pas une erreur. Google compte séparément chaque page qui apparaît pour la même recherche. La carte est le total du site.

**Solution :** Lisez le total sur la carte. Interprétez le tableau page par page.

## L’audit est resté bloqué sur « En cours »

**Symptôme :** Pas de progression depuis une demi-heure.

**Cause :** L’application a peut-être redémarré, ou le traitement a été interrompu.

**Solution :** Patientez. L’application contrôle les audits qui restent « en cours » depuis plus de 15 minutes. S’il n’y a aucun signe de vie, elle le marque « Échec » et en indique la cause. Cliquez ensuite sur **Relancer avec les mêmes paramètres**. Ne lancez pas deux audits en même temps avec la mesure de vitesse : ils se ralentissent mutuellement.

## L’audit indique « L’audit s’est arrêté avant la fin »

**Symptôme :** L’écran d’audit indique « L’audit s’est arrêté pendant la phase « exploration ». » ou « L’audit s’est arrêté avant la fin. » À la place du score, la carte affiche « Audit incomplet — aucun score attribué ».

**Cause :** L’audit s’est interrompu. L’écran dit trois choses : ce qui s’est passé, si le défaut vient de votre site ou de l’application, et ce que vous devez faire. Le titre indique la phase où il s’est arrêté : découverte des URL, exploration, mesure de vitesse ou préparation des résultats.

**Solution :** Suivez la phrase de l’écran.

- **Une étape n’a pas terminé à temps.** En général, le site répond très lentement. Réessayez dans quelques minutes. Si cela se reproduit, lancez avec moins de pages.
- **L’audit ne tenait pas dans la mémoire**, **a dépassé le temps de processeur** ou **le résultat d’une étape dépassait la taille que l’application peut stocker.** Des pages très volumineuses ou complexes en sont la cause. Relancez avec moins de pages.
- **Une erreur est survenue lors de l’écriture des résultats dans la base de données.** Le disque est peut-être plein ou le fichier de données verrouillé par un autre programme. Vérifiez qu’il reste de la place sur le disque, redémarrez l’application puis relancez l’audit.
- **Le moteur interne d’audit de l’application a signalé une erreur.** Choisissez **Yeniden başlat** (Redémarrer) dans le menu de la zone de notification, puis relancez l’audit.
- **L’audit a été interrompu.** L’application a peut-être été fermée ou redémarrée en cours de route. Laissez l’application ouverte et relancez l’audit.
- **La clé d’installation n’est pas parvenue à la partie qui exécute les audits.** Vos clés Google et PageSpeed enregistrées n’ont pas été supprimées. Mettez l’application à jour ou redémarrez-la, puis relancez l’audit.
- **Une erreur inattendue.** Relancez l’audit. Si cela continue, téléchargez le paquet de diagnostic depuis l’écran **Aide** et signalez le problème.

Le texte brut de l’erreur n’arrive pas à l’écran. Il reste dans le paquet de diagnostic.

## L’audit indique « Score provisoire »

**Symptôme :** Il n’y a pas de mot d’appréciation à côté du score. Une ligne comme « Score provisoire — couverture des mesures 62 % » est là.

**Cause :** Une grande partie des contrôles n’a pas pu être mesurée (la part des contrôles mesurés est sous 70 pour cent, ou moins de la moitié des contrôles d’Exploration, d’Indexation, de Contenu ou de Vitesse ont été mesurés). Les lignes sous la carte donnent les raisons : le quota PageSpeed était épuisé, il n’y a pas de clé PageSpeed, la mesure de vitesse était désactivée ou les données d’index n’ont pas pu être récupérées dans Search Console.

**Solution :** Activez la mesure de vitesse, ajoutez une clé PageSpeed ou connectez Search Console, puis relancez l’audit. Le score porte sur ce qui a été mesuré. Aucun jugement, bon ou mauvais, n’a été porté sur le reste.

## L’audit indique « Audit incomplet — aucun score attribué »

**Symptôme :** Cette phrase est à la place de la carte du score. Les constats restent affichés en dessous.

**Cause :** L’audit s’est arrêté sur une erreur, il est toujours en cours ou l’exploration s’est arrêtée prématurément en raison de la limite de débit du site. La liste des problèmes est incomplète, aucun score n’a donc été calculé. Si aucune page n’a pu être explorée, la carte du score n’apparaît pas du tout.

**Solution :** Lisez la raison dans la section ci-dessus. Relancez l’audit quand la limite de débit est réinitialisée ou que le problème est réglé. Les constats valent pour les pages explorées.

## L’audit est terminé mais indique « la mesure de vitesse s’est faite sans clé »

**Symptôme :** L’audit est terminé. Un avertissement dit « La clé PageSpeed enregistrée n’a pas pu être lue ; la mesure de vitesse s’est faite sans clé. » L’onglet Vitesse compte 50 pages au plus.

**Cause :** La partie qui exécute les audits n’a pas reçu la clé d’installation qui ouvre la clé enregistrée, la mesure de vitesse s’est donc faite sans elle. Les résultats de l’exploration ne sont pas touchés.

**Solution :** Mettez l’application à jour ou redémarrez-la, puis lancez un nouvel audit. Si cela continue, enregistrez de nouveau la clé PageSpeed dans **Paramètres**.

## L’audit indique « Nous avons été bloqués »

**Symptôme :** Un avertissement jaune apparaît : « L’audit n’a pas pu explorer complètement ce site. » ou « Nous avons été bloqués sur N pages. »

**Cause :** La protection anti-bots du site (Cloudflare ou un pare-feu) a arrêté l’explorateur de site de l’application.

**Solution :** Dans le pare-feu, autorisez l’agent utilisateur nommé `seotracker-audit`, ou placez l’adresse réseau (IP) de votre ordinateur dans la liste autorisée. Si le site n’est pas le vôtre, il n’y a rien à faire. Les résultats restent limités aux pages qui ont pu être explorées.

## La mesure de vitesse est incomplète ou absente

**Symptôme :** L’onglet Vitesse est vide ou n’a que très peu de lignes. La carte des quotas signale un quota épuisé, une limite par minute atteinte ou l’absence de clé.

**Cause :** Il n’y a pas de clé PageSpeed (au plus 50 pages sont mesurées). Ou le quota quotidien de Google est épuisé.

**Solution :** Obtenez une clé gratuite en suivant le guide de la clé PageSpeed. Si le quota quotidien est épuisé, le reste est complété demain lors d’un nouvel audit. Si la mesure de vitesse était désactivée au lancement de l’audit, elle n’est pas faite après coup pour cet audit.

## Inspection d’URL : limite quotidienne atteinte

**Symptôme :** Dans l’onglet État de l’indexation, le bouton ne fonctionne pas. Le message « La limite quotidienne de 2 000 URL de Google est épuisée » s’affiche.

**Cause :** Google accorde 2 000 vérifications par jour et par propriété. L’application, votre assistant et les requêtes que vous faites à la main dans Search Console puisent dans la même réserve.

**Solution :** La limite porte sur les 24 dernières heures : des vérifications se libèrent donc peu à peu au fil des heures ; reprenez ensuite. L’application ne redemande que les réponses devenues anciennes, sans gaspiller de quota.

## La carte ou le rapport Analytics affiche une erreur

**Symptôme :** La carte du trafic organique du Tableau de bord, ou l’écran Analytics, affiche une phrase à la place des données, avec les boutons **Réparer la connexion** et **Réessayer**.

**Cause :** La phrase donne la cause et la solution. Les cas principaux sont les suivants.

- **La connexion a expiré ou a été révoquée.** Reconnectez-la dans **Paramètres**.
- **L’accès à cette propriété a été refusé (HTTP 403).** Donnez au compte connecté ou au compte de service au moins le rôle Lecteur sur la propriété.
- **La propriété est introuvable (HTTP 404).** Elle a peut-être été supprimée ou déplacée. Choisissez-la de nouveau dans **Paramètres du projet → Connexions**.
- **Aucune propriété n’est connectée à ce projet.** Choisissez-en une dans **Paramètres du projet → Connexions**.
- **Le quota de rapports est épuisé (HTTP 429).** Le quota se renouvelle chaque heure et chaque jour. Réessayez plus tard.
- **La Google Analytics Data API est désactivée dans le projet Google Cloud.** Activez « Google Analytics Data API » dans la Google Cloud Console et réessayez.
- **Le rapport n’est pas compatible avec la propriété choisie (HTTP 400).** Vérifiez la propriété ou choisissez-en une autre.
- **Google a renvoyé une réponse invalide ou ne répond pas pour le moment.** Réessayez dans un instant.
- **Google est injoignable.** Vérifiez la connexion internet de cet ordinateur.

**Solution :** Appliquez l’action indiquée par le message. Le plus souvent, **Réparer la connexion** mène au bon réglage.

## Une requête vers Search Console affiche une erreur

**Symptôme :** Performances de recherche, Opportunités ou Suivi des classements affichent une erreur de Search Console à la place des données.

**Cause :** La phrase d’erreur indique la cause.

- **La requête a été jugée invalide (HTTP 400).** Ce n’est pas un problème de connexion. La dimension, le filtre ou le type de recherche choisi ne peut pas être utilisé sur cette propriété. Retirez les filtres.
- **L’accès à la propriété a été refusé (HTTP 401 ou 403).** Vérifiez que le compte a une autorisation vérifiée sur la propriété, ou renouvelez la connexion dans **Paramètres**.
- **La propriété est introuvable (HTTP 404).** Elle a peut-être été retirée de Search Console. Sélectionnez une propriété valide dans **Paramètres du projet → Connexions**.
- **La limite de requêtes est atteinte (HTTP 429).** Réessayez dans quelques minutes.
- **Pas de réponse à temps.** Réessayez dans un instant.
- **Ne répond pas pour le moment (autre code HTTP).** Réessayez dans un instant. Si cela continue, regardez la page d’état de Google.
- **Google est injoignable.** La phrase donne un détail à la ligne « Cause ». Si cela continue, vérifiez la connexion internet de cet ordinateur.

**Solution :** Suivez l’étape indiquée par le message. Pour un problème de compte ou de propriété, renouveler la connexion dans **Paramètres du projet → Connexions** suffit le plus souvent.

## Le trafic localhost apparaît dans Analytics

**Symptôme :** Dans le tableau des pages d’entrée, la colonne **Domaine** indique localhost ou 127.0.0.1.

**Cause :** La copie de test de votre site charge aussi la même balise Analytics.

**Solution :** Réglez la balise pour qu’elle ne se charge que sur le vrai nom de domaine. Dans la plupart des outils, il existe une option de « contrôle du nom de domaine ». L’application n’écarte pas ces lignes toute seule. En attendant, repérez-les grâce à la colonne **Domaine**.

## L’assistant ne peut pas se connecter (401)

**Symptôme :** Claude Code ou Codex indique « Unauthorized ».

**Cause :** Le client n’envoie pas le jeton, ou le jeton est faux.

**Solution :** Sur l’écran **Configuration de l’agent**, utilisez **Copier la commande de configuration** : l’agent lit alors le jeton dans l’installation, sans l’afficher. Pour le saisir à la main, copiez-le dans le presse-papiers sans l’afficher, collez-le dans le champ d’en-tête de votre client MCP, puis videz le presse-papiers. Ne le collez jamais dans une conversation ni dans une capture d’écran.

- **Paquet Windows :** le jeton se trouve dans le fichier `%LOCALAPPDATA%\seowatcher\mcp-token` (menu : **Veri klasörünü aç**, Ouvrir le dossier de données). Dans PowerShell : `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`.
- **Docker :** dans PowerShell, `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`.

Dans Claude Code, tapez ensuite `/mcp` et choisissez **Reconnect**.

## Docker démarre très lentement la première fois, ou reste « unhealthy »

**Symptôme :** `docker compose ps` n’indique pas healthy, même après cinq minutes.

**Cause :** Au premier démarrage, l’application est compilée à l’intérieur du conteneur et demande environ 2 Go de mémoire. Si la mémoire ne suffit pas, la compilation échoue.

**Solution :** Tapez `docker compose logs --tail 50` et regardez les dernières lignes. S’il y a une erreur de mémoire, donnez plus de mémoire aux conteneurs dans les paramètres de Docker Desktop. Tapez ensuite `docker compose up -d --build`.

## Où sont les données et les journaux ?

Sous Windows, tout est dans le dossier `%LOCALAPPDATA%\seowatcher` : `data` (la base de données), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Quand un fichier journal devient trop gros (`server.log` 5 Mo, les autres 1 Mo), l’ancien reste à côté sous un nom comme `server.old.log` et un nouveau repart de zéro. Le dossier `logs\wrangler` contient les journaux détaillés du moteur ; les fichiers de plus de 30 jours sont supprimés automatiquement. **Günlükleri aç** (Ouvrir les journaux) et **Veri klasörünü aç** (Ouvrir le dossier de données), dans le menu de la barre des tâches, y mènent.

Avec Docker, les données sont dans le volume `seotracker_data` (`/app/.wrangler`). Vous voyez les journaux avec la commande `docker compose logs -f`.

Pour signaler un problème, cliquez sur **Télécharger le paquet de diagnostic** dans l’écran **Aide**. Le paquet résume l’étape et les erreurs des 25 derniers audits ; les URL des pages sont retirées des erreurs PageSpeed. Il peut contenir des noms de projets et des domaines. Vérifiez le fichier avant de le joindre à un signalement GitHub.

## Un réglage Windows ne peut pas être enregistré

**Symptôme :** Modifier une option de la section Windows dans **Paramètres** donne une erreur, ou la section indique que les préférences Windows ne sont pas disponibles.

**Cause :** Cette section parle à l’application de la barre des tâches. La phrase d’erreur dit lequel de ces cas c’est.

- **L’application de la barre des tâches n’a pas répondu en 4 secondes.** Si l’ordinateur sort de veille, cliquez sur **Réessayer** dans quelques secondes. Si cela persiste, choisissez **Çıkış** (Quitter) dans le menu de la zone de notification et rouvrez l’application.
- **Impossible de joindre le service de réglages de l’application de la barre des tâches.** Elle s’est peut-être fermée. Rouvrez seowatcher depuis le menu Démarrer.
- **Ce réglage est verrouillé par un administrateur.** Seul l’administrateur de l’ordinateur peut le modifier.
- **L’application de la barre des tâches n’a pas reconnu cette requête.** Le serveur et l’application proviennent peut-être de sessions différentes. Choisissez **Çıkış** (Quitter) dans le menu et rouvrez l’application.
- **L’application de la barre des tâches a refusé la requête de réglage.** Redémarrez l’application depuis le menu. Si cela persiste, mettez à jour le paquet Windows.
- **L’application de la barre des tâches a renvoyé une réponse non reconnue.** Les versions ne correspondent peut-être pas. Mettez à jour le paquet Windows.

**Solution :** Faites ce que demande le message. Ces options n’existent que dans le paquet Windows. Avec Docker, vous gérez le comportement au démarrage depuis votre système d’exploitation.

## Avertissements du lanceur

Les avertissements qui apparaissent sur l’icône de la barre des tâches et ce qu’il faut faire :

- **« Sunucu 120 saniyede yanıt vermedi » (Le serveur n’a pas répondu en 120 secondes).** Dans le menu, cliquez sur **Yeniden başlat**. Sinon, cliquez sur **Günlükleri aç** et regardez les dernières lignes de `server.log`.
- **« seowatcher yeniden başlatılıyor » (seowatcher redémarre).** Le serveur s’est arrêté tout seul et l’application le relance. Actualisez la page ouverte après quelques secondes.
- **« Sunucu 10 dakikada üç kez kapandı » (Le serveur s’est arrêté trois fois en 10 minutes).** L’application a cessé de le relancer. Cliquez sur **Kurulumu onar** et, si cela ne règle rien, sur **Sorunu bildir (GitHub)**.
- **« Kurulum eksik » (Installation incomplète).** **Kurulumu onar** remet les fichiers manquants en téléchargeant le fichier d’installation. S’il n’y a pas d’internet, la page des versions s’ouvre ; téléchargez le fichier d’installation et lancez-le.
- **« 3001 numarası dolu, 3002 kullanılıyor » (Le port 3001 est occupé, utilisation du 3002).** Un autre programme occupe le 3001, souvent une ancienne copie Docker. Le même avertissement apparaît aussi sous forme de bande jaune dans l’application. Si vous obtenez une erreur en vous connectant à Google, fermez ce programme et cliquez sur **Yeniden başlat**. Voir plus haut « Le numéro de port est occupé ».
- **« Güncelleme denetlenemedi » (La mise à jour n’a pas pu être vérifiée) ou « Güncelleme yapılamadı » (La mise à jour n’a pas pu être faite).** La bulle donne la cause. Si elle dit « GitHub’a ulaşılamadı » (GitHub est inaccessible), vérifiez votre connexion internet. Si elle dit « GitHub şu an çok fazla istek alıyor » (GitHub reçoit trop de requêtes en ce moment), réessayez dans une heure. Si l’empreinte ne correspond pas, téléchargez le fichier d’installation depuis la page des versions. Dans tous les cas, la version installée continue de fonctionner.
- **« Güncelleme kurulmadı » (La mise à jour n’a pas été installée).** La fenêtre d’installation a été fermée ou l’autorisation d’administrateur n’a pas été donnée. Réessayez avec **Güncelle** dans le menu.
- **« Windows bileşeni kurulamadı » (Le composant Windows n’a pas pu être installé).** Dans le menu, cliquez sur **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
