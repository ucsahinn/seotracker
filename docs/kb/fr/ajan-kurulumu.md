---
title: Installation de l'assistant
description: Connecter votre assistant SEO sans exposer le jeton, vérifier un nouvel appel et utiliser les compétences pour auditer le site et rédiger un rapport.
kind: nasil-yapilir
updated: 2026-10-27
---

## Connecter l'agent

Ouvrez la configuration de l'agent. Choisissez Claude Code, Codex ou Autre et copiez les instructions. Les flèches, Début et Fin changent le choix sans copier. Le texte ne contient aucun jeton réel; l'agent utilise le secret local. L'installation complète reste une option séparée.

## Vérifier un nouvel appel

Lancez la vérification puis demandez un appel d'outil seowatcher. La page consulte le journal local toutes les cinq secondes pendant 60 secondes au maximum. Un ancien appel ne valide pas une nouvelle configuration. Onglet masqué, erreur de lecture ou annulation arrêtent la vérification. Sans nouvel appel, vérifiez l'état MCP du client et réessayez; cela ne prouve pas une panne.

Connecté et la date du dernier appel décrivent une utilisation passée, pas une session permanente. Relancez une lecture inconnue. Les outils ont une portée d'installation.

## Protéger le jeton

Préférez les instructions de configuration. Pour une configuration manuelle, placez `Authorization: Bearer <token>` uniquement dans le champ secret local du client. PowerShell copie sans affichage:

Windows : `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker : `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Collez dans le champ local, puis effacez le presse-papiers. Aucun jeton dans le chat, la sortie du terminal, une capture ou le code. Le menu Windows permet d'ouvrir le dossier de données.

## Compétences et dépannage

L'onglet Compétences décrit les processus SEO. Les instructions les installent; le texte de mise à jour les actualise. Claude Code : /seo-audit; Codex : $seo-audit. Pour 401, vérifiez l'en-tête local. Pour une connexion refusée, vérifiez l'application et l'adresse. Actualisez l'état MCP et vérifiez un nouvel appel.
