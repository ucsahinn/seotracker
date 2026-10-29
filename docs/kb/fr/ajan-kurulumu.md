---
title: Configuration de l’agent
description: Connecter votre assistant SEO sans exposer le jeton, vérifier un nouvel appel et utiliser les compétences pour auditer le site et rédiger un rapport.
kind: nasil-yapilir
updated: 2026-10-27
---

Un assistant IA (agent) comme Claude Code, Codex ou Cursor se connecte à seowatcher par MCP (Model Context Protocol). Une fois connecté, il lit vos données Search Console, Analytics et d’audit dans l’application installée sur votre ordinateur, lance des audits et enregistre des rapports. Les données que l’agent lit peuvent être transmises à son fournisseur.

## Connecter l’agent

1. Dans le menu de gauche, ouvrez **Configuration de l’agent**.
2. À la question **Quel agent utilisez-vous ?**, choisissez **Claude Code**, **Codex** ou **Autre**. Les touches fléchées, Début et Fin permettent aussi de choisir.
3. Cliquez sur **Copier la commande de configuration**. Choisir un agent ne copie rien à lui seul.
4. Collez le texte copié dans votre agent.

La commande ne contient pas le jeton réel : l’agent le lit dans l’installation de votre ordinateur. Après une nouvelle installation, ou pour tout reprendre depuis le début, utilisez **Copier la commande de nouvelle installation**.

## Vérifier la connexion

Cliquez sur **Vérifier la connexion**, puis demandez à votre agent d’appeler un outil seowatcher, n’importe lequel. Pendant 60 secondes, la page cherche un nouvel appel toutes les cinq secondes. Un appel antérieur ne compte pas.

- « Nouvel appel d’outil vérifié. » : la configuration est terminée.
- « Aucun nouvel appel d’outil détecté. » : vérifiez l’état MCP dans votre agent, faites-lui appeler un outil et relancez la vérification. Ce résultat ne prouve pas que la connexion est en panne.

Passer l’onglet en arrière-plan, une erreur ou **Annuler** arrêtent l’attente.

Le badge **Appel d’outil reçu** et l’heure du dernier appel décrivent une utilisation passée, pas une session ouverte en permanence. Si l’état ne peut pas être lu, cliquez sur **Relire l’état**. Un agent connecté accède à tous les projets de cette installation, pas seulement au projet ouvert.

## Protéger le jeton

Préférez la commande de configuration toute prête. Si vous devez configurer l’agent à la main, placez le jeton uniquement dans le champ d’en-tête secret de votre client MCP : `Authorization: Bearer <jeton>`.

Pour copier le jeton dans le presse-papiers sans l’afficher, exécutez cette commande dans PowerShell.

Installation Windows :

`(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Installation Docker :

`(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Après l’avoir collé dans le champ d’en-tête, videz le presse-papiers. Ne placez jamais le jeton dans un terminal, une conversation, une capture d’écran ou du code source. Sous Windows, **Veri klasörünü aç** (Ouvrir le dossier de données) dans le menu de la zone de notification ouvre le dossier qui contient le fichier du jeton.

## Compétences

L’onglet **Compétences** liste les six processus SEO prêts à l’emploi que la commande de configuration installe dans votre agent :

| Compétence          | Rôle                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| `seo-coach`         | Fait le point sur votre situation et choisit l’étape suivante.                   |
| `seo-project-setup` | Enregistre une fois vos objectifs, vos concurrents et vos pages clés.            |
| `seo-audit`         | Audite votre site et met en avant une seule action pour la semaine.              |
| `seo-check-in`      | Compare la période à la précédente : ce qui a changé, quand, et si cela compte.  |
| `seo-triage`        | Après une baisse de trafic, vérifie qu’elle est réelle, puis trouve où et quand. |
| `seo-report`        | Enregistre le résultat d’une compétence dans l’écran Rapports.                   |

Dans Claude Code, une compétence s’appelle avec `/seo-audit` ; dans Codex, avec `$seo-audit`. Si l’agent est déjà configuré, **Copier la commande de mise à jour** actualise les compétences ; vos réglages de connexion et vos propres modifications sont conservés.

## Si la connexion échoue

- **Erreur 401 :** votre client MCP n’envoie pas l’en-tête `Authorization`. Vérifiez l’en-tête et le jeton.
- **Connexion refusée :** vérifiez que l’application est ouverte et que l’agent utilise la bonne adresse MCP. Elle figure sur la ligne **Adresse MCP de cette installation**.
- Après correction, actualisez l’état MCP dans votre agent et relancez la vérification avec un nouvel appel d’outil.

<!-- Sources: src/routes/_app/ai.tsx; src/client/features/ai-mcp/ -->
