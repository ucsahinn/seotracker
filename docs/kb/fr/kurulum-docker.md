---
title: Installation avec Docker
description: Installez l’application avec Docker sur Mac, Linux et Windows. Une seule commande, sans fichier .env. Vos données restent dans le volume Docker.
kind: nasil-yapilir
updated: 2026-10-22
---

À la fin de ce guide, l’application tournera dans Docker (un programme qui fait tourner chaque application dans un conteneur isolé) et sera ouverte à l’adresse `http://localhost:3001`. Sous Windows, l’installation en un seul fichier est bien plus simple ; Docker s’adresse surtout aux utilisateurs de Mac et de Linux, et à ceux qui utilisent déjà Docker. Le premier démarrage prend quelques minutes, car l’application est compilée à l’intérieur du conteneur. Les suivants ne prennent que quelques secondes.

## Ce qu’il vous faut

- Docker Desktop (Mac, Windows) ou Docker Engine avec Docker Compose (Linux). Sous Windows, Docker Desktop exige que WSL 2 (le composant qui fait tourner Linux dans Windows) et la virtualisation soient activés.
- Git. Sinon, le bouton **Code → Download ZIP** de la page GitHub convient aussi.
- Environ 2 Go d’espace disque libre et 2 Go de mémoire libre pendant la première compilation.

## Étapes

1. Téléchargez le dépôt (les fichiers du projet) et placez-vous dans son dossier :

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Démarrez l’application :

```sh
docker compose up -d
```

C’est tout. Aucun fichier `.env` n’est nécessaire. La clé de chiffrement et le jeton MCP de l’agent sont générés automatiquement au premier démarrage et stockés dans le magasin de données de Docker (le volume).

3. Si vous voulez suivre la progression, tapez ceci :

```sh
docker compose logs -f
```

4. Patientez. La ligne « Building client + server » dans le journal correspond à la première compilation. Attendez que l’état passe à **healthy** dans la sortie de `docker compose ps`, puis ouvrez `http://localhost:3001` dans le navigateur.

L’étape suivante est le guide de la connexion à Google. Avec Docker, les deux adresses de redirection à donner à Google sont :

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Mise à jour

Tapez ces deux commandes :

```sh
git pull
docker compose up -d --build
```

**Paramètres → À propos** annonce la nouvelle version et affiche ces deux commandes. Vos données restent dans le volume nommé `seotracker_data`, donc la mise à jour ne les supprime pas.

### Arrêt et suppression

- Arrêter : `docker compose stop`
- Redémarrer : `docker compose up -d`
- Supprimer le conteneur en gardant les données : `docker compose down`
- Supprimer aussi les données : `docker compose down -v`. Cette commande efface définitivement la base de données, les connexions à Google et les rapports.

### Sauvegarde

Vos données sont dans le volume `seotracker_data`, au chemin `/app/.wrangler` à l’intérieur du conteneur. Pour faire une sauvegarde, tapez ces trois commandes dans l’ordre :

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Pour restaurer, utilisez `tar xzf` à la place de `tar czf` dans la même commande. Le fichier `instance-secret` du volume est la clé qui chiffre les connexions à Google. Si ce fichier manque dans la sauvegarde, l’application s’ouvre mais les connexions à Google ne reviennent pas.

### Réglages (facultatifs)

Aucun réglage n’est obligatoire. Si vous voulez en changer, placez un fichier `.env` dans le dossier du projet. Tapez ensuite `docker compose up -d --force-recreate seotracker`.

| Nom du réglage                         | À quoi il sert                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| PORT                                   | Le numéro de port, 3001 par défaut. S’il change, les adresses de redirection Google changent aussi                                   |
| ALLOWED_HOST                           | Le nom visible de l’extérieur si vous êtes derrière un autre serveur. Vide, seul localhost est accepté                               |
| AUTH_MODE                              | `local_noauth` (par défaut) ou `cloudflare_access`                                                                                   |
| BETTER_AUTH_SECRET                     | La clé de chiffrement. Laissez vide, l’application la génère. Si vous la fournissez, 32 caractères au moins, puis ne la changez plus |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Une alternative à la saisie dans l’écran Paramètres. La valeur saisie à l’écran est prioritaire                                      |
| PAGESPEED_API_KEY                      | Une alternative à la saisie dans l’écran Paramètres                                                                                  |
| MCP_TOKEN                              | Vide, il est généré au premier démarrage. Avec `off`, aucun jeton n’est demandé. Toute autre valeur est utilisée telle quelle        |

## Vérification

- Dans la sortie de `docker compose ps`, l’état doit être **healthy**. Au premier démarrage, l’atteindre peut prendre jusqu’à cinq minutes.
- La sortie de `curl.exe http://127.0.0.1:3001/api/health` (sous Windows ; `curl` sur Mac et Linux) doit commencer par "status":"ok". Vous pouvez aussi ouvrir cette adresse dans le navigateur.
- `http://localhost:3001` doit s’ouvrir dans le navigateur. Sur l’écran **Aide**, les lignes de la carte **État de l’application** doivent indiquer « OK ». Avant la connexion à Google, la ligne « Connexion Google » reste en « Attention » : c’est normal.

## Questions fréquentes

**Pourquoi le premier démarrage est-il long ?** La compilation n’a lieu qu’une fois ; les démarrages suivants la sautent.

**Où est le fichier `.env.example` ?** Il n’existe pas. Ce fichier, hérité du projet d’origine, décrivait des choses absentes de cette version. La liste complète est dans le tableau ci-dessus et dans le fichier `docs/ENVIRONMENT.md`.

**Puis-je l’ouvrir sur internet ?** L’application ne demande aucune identité. Ne l’exposez pas sans placer devant elle votre propre authentification. Si vous définissez `ALLOWED_HOST`, l’application vous avertit dans son contrôle de santé.

**Où trouver le jeton de mon agent ?** L’écran **Configuration de l’agent** affiche la commande : `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Si vous utilisez Git Bash, ajoutez `MSYS_NO_PATHCONV=1` au début.

## En cas de problème

- **« Bind for 127.0.0.1:3001 failed » s’affiche.** Le numéro de port est déjà utilisé. Placez dans le dossier du projet un fichier `.env` contenant la ligne `PORT=3002`, puis recréez le conteneur. Sous Windows, le Bloc-notes peut enregistrer le fichier sous le nom `.env.txt`. Dans PowerShell, `Set-Content -Encoding ascii .env 'PORT=3002'` est sûr.
- **L’état est « unhealthy ».** `docker compose logs --tail 50` affiche les dernières lignes. Si la mémoire s’est épuisée pendant la compilation, donnez plus de mémoire à Docker Desktop.
- **La connexion à Google indique « non configurée ».** Si `BETTER_AUTH_SECRET` fait moins de 32 caractères, Google reste désactivé. Si vous l’avez fourni, rallongez-le. Sinon, le fichier `instance-secret` du volume est peut-être abîmé.
- **La connexion à Google a sauté après une mise à jour.** `BETTER_AUTH_SECRET` a changé ou le volume a été recréé. Dans les paramètres du projet, cliquez sur **Reconnecter**.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
