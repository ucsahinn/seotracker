---
title: Installation sous Windows
description: Installez l'application sous Windows avec un seul fichier : premier lancement, mise à jour, désinstallation, sauvegarde et port. Ni Docker ni terminal.
kind: nasil-yapilir
updated: 2026-10-22
---

L'interface de l'application est en turc. Ce guide donne chaque nom de bouton et d'écran en turc, suivi de sa traduction française entre parenthèses.

À la fin de cette page, l'application sera installée et ouverte dans votre navigateur. Comptez deux minutes. Elle s'installe pour votre seul compte utilisateur, sans droits d'administrateur. Une autorisation n'est demandée qu'une fois, si le composant Visual C++ est absent.

## Ce qu'il vous faut

- Windows 10 ou 11 (64 bits).
- Environ 350 Mo d'espace libre. Le fichier d'installation fait 81 Mo et l'application installée 290 Mo.
- Un navigateur tel qu'Edge, Chrome ou Firefox.
- Ni Docker, ni Node, ni terminal (fenêtre de commandes) ne sont nécessaires.
- Le moteur de l'application a besoin du paquet Visual C++ de Microsoft. S'il manque, l'installation l'ajoute et demande une fois l'autorisation d'un administrateur. Le dossier d'installation est `%LOCALAPPDATA%\Programs\seowatcher`.

## Étapes

### Première installation

1. Téléchargez le fichier **seowatcher-setup.exe** depuis la page des versions sur GitHub. L'adresse permanente est : `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Double-cliquez sur le fichier.
3. Si Windows affiche « Windows a protégé votre ordinateur », cliquez sur **Informations complémentaires**, puis sur **Exécuter quand même** (sur un Windows en turc : « Daha fazla bilgi », « Yine de çalıştır »). Le fichier n'est pas encore signé, donc Windows ne connaît pas l'éditeur. Cet avertissement est normal.
4. Si vous le souhaitez, comparez le résumé SHA-256 du fichier (son empreinte) avec le fichier `SHA256SUMS.txt` de la page des versions.
5. Sur la page d'accueil, cliquez sur **Sonraki** (Suivant).
6. À la question « Pour qui installer ? », choisissez **Yalnızca ben** (Moi seul). C'est le choix recommandé : l'installation se fait uniquement pour votre compte. L'option **Tüm kullanıcılar** (Tous les utilisateurs) demande une autorisation d'administrateur.
7. Regardez les deux options : **Windows açılınca seowatcher'ı başlat** (Lancer seowatcher au démarrage de Windows) et **Masaüstüne kısayol ekle** (Ajouter un raccourci sur le Bureau). La première est cochée par défaut. Décochez-la si vous ne voulez pas que l'application démarre en arrière-plan. Cliquez ensuite sur **Sonraki** (Suivant).
8. Cliquez sur **Kur** (Installer).
9. Sur la dernière page, une case **seowatcher'ı şimdi başlat** (Lancer seowatcher maintenant) est présente. Laissez-la cochée et cliquez sur **Bitti** (Terminé). L'application s'ouvre.
10. Patientez. Le premier lancement dure 20 à 30 secondes. Le texte de l'icône dans la barre des tâches devient tour à tour « Anahtarlar hazırlanıyor » (Préparation des clés), « Veritabanı güncelleniyor » (Mise à jour de la base de données) et « Sunucu başlatılıyor » (Démarrage du serveur). Si l'icône n'est pas visible, cliquez sur la flèche ^ de la barre des tâches. Quand tout est prêt, votre navigateur s'ouvre tout seul. Si l'application démarre automatiquement avec Windows, le navigateur ne s'ouvre pas : une bulle « seowatcher hazır » (seowatcher est prêt) apparaît à la place.
11. L'adresse `http://127.0.0.1:3001` s'ouvre toute seule dans le navigateur. Dans cette adresse, 127.0.0.1 désigne votre ordinateur lui-même et 3001 est le numéro de port.

L'étape suivante est le guide de la connexion à Google.

### Menu de la barre des tâches

Faites un clic droit sur l'icône. Si elle n'est pas visible, cliquez sur la flèche ^ de la barre des tâches. Le menu contient ceci :

- **seowatcher'ı aç** (Ouvrir seowatcher) : ouvre l'application dans le navigateur. Un double-clic sur l'icône fait la même chose.
- **Yeniden başlat** (Redémarrer) : ferme l'application puis la rouvre. Si quelque chose se bloque, essayez-le en premier.
- **Günlükleri aç** (Ouvrir les journaux) : ouvre le dossier des journaux. Il contient `launcher.log`, `server.log` et `migrate.log`.
- **Tanı bilgisini kopyala** (Copier les informations de diagnostic) : copie dans le presse-papiers la version de Windows, le processeur, la version de Visual C++, un essai du moteur, le module en cause dans le journal des événements de Windows, les vidages de plantage et les dernières lignes du journal.
- **Sorunu bildir (GitHub)** (Signaler un problème (GitHub)) : place les mêmes informations dans le presse-papiers et ouvre sur GitHub un signalement déjà rempli. Ajoutez une phrase pour dire ce que vous faisiez, puis envoyez-le.
- **Eksik Windows bileşenini kur** (Installer le composant Windows manquant) : n'apparaît que si le paquet Visual C++ est absent. Un clic installe le paquet et redémarre l'application.
- **Kurulumu onar** (Réparer l'installation) : nettoie les fichiers temporaires, vérifie le paquet et rouvre l'application.
- **Güncelle** (Mettre à jour) : toujours présent dans le menu. Un clic consulte aussitôt GitHub ; s'il existe une nouvelle version, elle est téléchargée et installée, sinon le menu dit « Güncel » (À jour). Quand une nouvelle version a déjà été trouvée, l'entrée devient « Güncelle: X.Y.Z sürümü hazır » (Mettre à jour : la version X.Y.Z est prête) ; le numéro de version est un exemple.
- **Güncellemeleri kendiliğinden kur** (Installer les mises à jour automatiquement) : si l'option est cochée, l'application installe d'elle-même une nouvelle version dès qu'elle la trouve.
- **Veri klasörünü aç** (Ouvrir le dossier de données) : ouvre le dossier de la base de données et des clés.
- **Windows açılınca başlat** (Démarrer avec Windows) : si l'option est cochée, l'application démarre en arrière-plan à l'allumage de l'ordinateur.
- **Çıkış** (Quitter) : ferme complètement l'application. Tant qu'elle est fermée, la page ouverte dans le navigateur ne fonctionne pas.

Le menu affiche aussi une ligne d'état (« Çalışıyor: http://127.0.0.1:3001/ » (En fonctionnement : http://127.0.0.1:3001/) ou un message d'erreur) et le numéro de version.

Si vous lancez l'application une seconde fois, aucune nouvelle copie ne s'ouvre. Seule la page s'ouvre dans le navigateur.

### Mise à jour

L'application se met à jour toute seule. Deux minutes après son ouverture, puis une fois par jour, elle consulte GitHub pour connaître la dernière version. S'il y en a une nouvelle, elle la télécharge, compare l'empreinte du fichier (SHA-256) avec la valeur de la page des versions, l'installe en silence et se rouvre. Pendant ce temps, le texte de l'icône devient « Güncelleme indiriliyor » (Téléchargement de la mise à jour) et « Güncelleme kuruluyor » (Installation de la mise à jour). La section **Ayarlar → Hakkında** (Paramètres → À propos) de l'application annonce elle aussi la nouvelle version et vous renvoie vers **Güncelle** (Mettre à jour) sur l'icône.

- Si vous ne voulez pas qu'elle s'installe toute seule, décochez **Güncellemeleri kendiliğinden kur** (Installer les mises à jour automatiquement) dans le menu. Quand une nouvelle version sortira, vous verrez alors une bulle et l'entrée **Güncelle** apparaîtra dans le menu.
- Pour mettre à jour à la main, téléchargez le nouveau fichier d'installation à la même adresse et lancez-le. L'assistant ferme lui-même l'application ouverte, remplace les fichiers et la relance.

Vos données, votre connexion à Google et vos paramètres restent tels quels.

### Déploiement en entreprise

Notes pour les équipes informatiques qui veulent installer l'application pour tous les utilisateurs d'un ordinateur, ou l'installer en silence avec un outil de déploiement (Intune, GPO, PDQ) :

- **Pour tous les utilisateurs** : lancez le fichier d'installation en tant qu'administrateur et choisissez l'option « tous les utilisateurs » dans l'assistant. L'application s'installe sous `C:\Program Files\seowatcher` (pour une installation à un seul utilisateur, le dossier est `%LOCALAPPDATA%\Programs\seowatcher`) ; les données de chaque utilisateur restent dans son propre dossier `%LOCALAPPDATA%\seowatcher`.
- **Installation silencieuse** : `seowatcher-setup.exe /VERYSILENT /NORESTART` (un seul utilisateur) ou `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (administrateur, tous les utilisateurs). Quand l'installation silencieuse se termine, l'application s'ouvre toute seule.
- **Journal d'installation** : chaque installation écrit dans le fichier `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Avec `/LOG="chemin"`, vous pouvez indiquer un autre emplacement.
- **Désinstallation silencieuse** : `unins000.exe /VERYSILENT` (dans le dossier d'installation : `%LOCALAPPDATA%\Programs\seowatcher`, ou `C:\Program Files\seowatcher` pour une installation pour tous les utilisateurs).
- **Vérification** : avant la publication de chaque version, elle est installée sur une machine Windows propre, ouverte, attendue jusqu'à ce que l'adresse de santé réponde, puis désinstallée. Une version qui échoue à ce test n'est pas publiée.

### Réparation

Si quelque chose se bloque, faites un clic droit sur l'icône et cliquez sur **Kurulumu onar** (Réparer l'installation). Si l'icône n'est pas visible, cliquez sur la flèche ^ de la barre des tâches. L'application nettoie les fichiers temporaires, vérifie que le paquet est complet, contrôle de nouveau la base de données et s'ouvre. Si un fichier manque, elle le dit et ouvre la page des versions. Il vous suffit alors de relancer le fichier d'installation.

### Désinstallation

1. Dans **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Paramètres → Applications → Applications installées) de Windows, trouvez **seowatcher**.
2. Cliquez sur **Kaldır** (Désinstaller).

Le programme de désinstallation supprime le programme, le raccourci du menu Démarrer et l'entrée « démarrer avec Windows ». Il ne touche pas au dossier de données. Si vous voulez aussi supprimer votre base de données, votre connexion à Google et vos rapports, supprimez vous-même le dossier de données.

### Où sont les données et comment les sauvegarder ?

Tout est dans un seul dossier : `%LOCALAPPDATA%\seowatcher`. Saisissez ce texte dans la barre d'adresse de l'Explorateur de fichiers. L'entrée de menu **Veri klasörünü aç** (Ouvrir le dossier de données) y mène aussi. Il contient :

- `data` : la base de données (projets, archives Search Console, audits, rapports).
- `instance-secret` : la clé qui chiffre les clés d'accès Google. Si elle est perdue, vous devez refaire la connexion à Google depuis le début.
- `mcp-token` : le mot de passe que votre assistant IA utilise pour se connecter à l'application.
- `server.env`, `config.json`, `logs`.

Pour faire une sauvegarde :

1. Fermez l'application avec **Çıkış** (Quitter).
2. Copiez le dossier entier.

Pour restaurer, fermez l'application, remettez le dossier à sa place et démarrez l'application. Pour déplacer vos données vers un autre ordinateur, c'est la même chose. Si vous emportez aussi le fichier `instance-secret`, les connexions à Google continuent de fonctionner.

### Changer le numéro de port

L'application utilise le numéro 3001. Si un autre programme l'occupe, elle choisit le premier numéro libre entre 3002 et 3010. Elle inscrit son choix dans le fichier `config.json`.

Si vous voulez un numéro précis :

1. Fermez l'application.
2. Ouvrez le fichier `config.json` du dossier de données avec le Bloc-notes.
3. Écrivez-y ceci :

```json
{
  "port": 3005
}
```

4. Enregistrez, puis démarrez l'application.

Quand le numéro change, mettez aussi à jour, avec le nouveau numéro, les deux adresses de redirection chez Google. Ces adresses sont expliquées dans le guide de la connexion à Google.

## Vérification

- Quand vous passez la souris sur l'icône de la barre des tâches, elle doit afficher « seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/ » (seowatcher X.Y.Z : en fonctionnement : http://127.0.0.1:3001/). Le numéro au début est celui de la version que vous avez installée ; 2.3.7 n'est qu'un exemple.
- Dans le navigateur, l'adresse `http://127.0.0.1:3001/api/health` doit afficher un texte qui commence par "status":"ok".
- Sur l'écran **Yardım** (Aide), la carte « Kurulumunuzun durumu » (L'état de votre installation) doit dire « Her şey yolunda. » (Tout va bien.). Avant la connexion à Google, la ligne « Google girişi » (Connexion Google) demande de l'attention. C'est normal.

## Questions fréquentes

**Pourquoi l'application s'ouvre-t-elle dans le navigateur ?** L'application fonctionne sur votre ordinateur comme un petit serveur. Son écran, c'est le navigateur.

**Que se passe-t-il quand j'éteins l'ordinateur ?** L'application se ferme aussi. Si **Windows açılınca başlat** (Démarrer avec Windows) est coché, elle redémarre toute seule à l'allumage suivant.

**Puis-je l'ouvrir depuis un autre ordinateur ?** Non, et c'est voulu. L'application n'écoute que l'adresse 127.0.0.1. Pour l'ouvrir sur internet, vous devez placer devant elle votre propre authentification.

**Puis-je passer de la version Docker à celle-ci ?** Oui, mais les données ne se déplacent pas toutes seules. Vous recréez les projets et vous reconnectez Google. Les archives Search Console se remplissent de nouveau au premier lancement.

**Mon antivirus a affiché un avertissement.** Comme le fichier n'est pas signé, certains antivirus donnent l'alerte. Téléchargez le fichier uniquement depuis la page des versions de GitHub et comparez son résumé SHA-256.

## En cas de problème

Si l'icône n'est pas visible, cliquez sur la flèche ^ de la barre des tâches.

- **L'icône indique « Hata: 3001 ve sonraki 9 adres numarası (port) dolu » (Erreur : le port 3001 et les 9 suivants sont occupés).** Un autre programme occupe ces numéros. Écrivez un autre numéro dans le fichier `config.json`.
- **L'icône indique « Veritabanı güncellemesi başarısız » (La mise à jour de la base de données a échoué).** Cliquez sur **Günlükleri aç** (Ouvrir les journaux) et regardez les dernières lignes de `migrate.log`. Le plus souvent, le disque est plein ou le dossier est en lecture seule.
- **L'icône indique « Sunucu beklenmedik şekilde kapandı » (Le serveur s'est arrêté de façon inattendue).** Les dernières lignes de `server.log` donnent la cause. Essayez **Yeniden başlat** (Redémarrer). Si cela ne règle rien, partagez le journal dans un signalement sur GitHub.
- **Le navigateur ne s'est pas ouvert.** Double-cliquez sur l'icône ou saisissez l'adresse à la main : `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
